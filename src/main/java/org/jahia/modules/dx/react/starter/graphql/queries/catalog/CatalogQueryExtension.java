package org.jahia.modules.dx.react.starter.graphql.queries.catalog;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.AccessDeniedException;

import org.apache.commons.lang.StringUtils;
import org.apache.unomi.api.Profile;
import org.jahia.modules.dx.react.starter.assistant.WatsonAssistant;
import org.jahia.modules.dx.react.starter.assistant.config.EntitiesConfigService;
import org.jahia.modules.dx.react.starter.graphql.GraphQLCall;
import org.jahia.modules.dx.react.starter.graphql.catalog.CioProduct;
import org.jahia.modules.dx.react.starter.graphql.catalog.InputConfigBuilder;
import org.jahia.modules.graphql.provider.dxm.DXGraphQLProvider;
import org.jahia.modules.marketingfactory.admin.ContextServerService;
import org.jahia.osgi.BundleUtils;
import org.jahia.registries.ServicesRegistry;
import org.jahia.services.content.decorator.JCRUserNode;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibm.watson.developer_cloud.assistant.v1.model.Context;
import com.ning.http.client.AsyncHttpClient;
import com.ning.http.client.Response;

import graphql.annotations.annotationTypes.GraphQLDescription;
import graphql.annotations.annotationTypes.GraphQLField;
import graphql.annotations.annotationTypes.GraphQLName;
import graphql.annotations.annotationTypes.GraphQLNonNull;
import graphql.annotations.annotationTypes.GraphQLTypeExtension;

@GraphQLTypeExtension(DXGraphQLProvider.Query.class)
@GraphQLDescription("Example of a GraphQL query extension")
public class CatalogQueryExtension {
    private static Logger logger = LoggerFactory.getLogger(CatalogQueryExtension.class);

    private static AsyncHttpClient httpClient = null;
    private static ObjectMapper om = new ObjectMapper();

    @GraphQLField
    public static List<CioProduct> getProducts(@GraphQLNonNull @GraphQLName("conversationId") String conversationId,
                                               @GraphQLName("limit") int limit, @GraphQLName("offset") int offset,
                                               @GraphQLName("profileId") String profileId) throws Exception {
        Context context = WatsonAssistant.getContext(conversationId);
        context.put("go", "false");
        InputConfigBuilder inputConfigBuilder = new InputConfigBuilder(EntitiesConfigService.getEntitiesConfigService().getConfigs(), limit, offset);
        inputConfigBuilder.addEntities(context);
        Map<String, Object> jsonObj = new HashMap<>();
        jsonObj.put("query", inputConfigBuilder.getQuery());
        jsonObj.put("variables", inputConfigBuilder.getInputVariables());
        String response = GraphQLCall.sendPost(jsonObj);
        Map<String, Map<String, List<CioProduct>>> mapValue = om.readValue(response, new TypeReference<Map<String, Map<String, List<CioProduct>>>>() {
        });
        String favoriteColor = context.get("favoriteColor")!=null?context.get("favoriteColor").toString():"";
		if (StringUtils.isNotEmpty(favoriteColor) && StringUtils.isNotEmpty(profileId)) {
			logger.info("Calling CDP with favorite color '{}' profile {} conversation {}", favoriteColor, profileId,
					conversationId);
			saveFavoriteColor(favoriteColor, profileId, om);
		}
        return mapValue.get("data").get("cioProducts");
    }

    @GraphQLField
    public static String getFavoriteColor(@GraphQLNonNull@GraphQLName("profileId") String profileId) throws Exception {
        ContextServerService contextServer = BundleUtils.getOsgiService(ContextServerService.class, null);
        logger.info("Calling CDP {}", contextServer);
        if (contextServer != null && contextServer.isAvailable("apparel-uk")) {
            JCRUserNode rootUser = ServicesRegistry.getInstance().getJahiaUserManagerService().lookupRootUser();
            if (httpClient == null) {
                httpClient = contextServer.initAsyncHttpClient(rootUser, "apparel-uk");
            }
            AsyncHttpClient.BoundRequestBuilder builder = contextServer.initAsyncRequestBuilder(rootUser, "apparel-uk", httpClient, "/cxs/profiles/" + profileId, true, true, true);
            Response execute = builder.execute().get();
            Profile profile = om.readValue(execute.getResponseBody(),Profile.class);
            return profile.getProperty("favorite_color").toString();
        }
        return null;
    }

    private static Profile saveFavoriteColor(String color, String profileId, ObjectMapper mapper) {
        ContextServerService contextServer = BundleUtils.getOsgiService(ContextServerService.class, null);
        logger.info("Calling CDP {}", contextServer);
        if (contextServer != null && contextServer.isAvailable("apparel-uk")) {
            try {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("itemType", "profile");
                jsonObject.put("itemId", profileId);
                Map<String, String> properties = new HashMap<>();
                properties.put("favorite_color", color);
                jsonObject.put("properties", properties);
                Profile profile = contextServer.executePostRequest(ServicesRegistry.getInstance().getJahiaUserManagerService().lookupRootUser(), "apparel-uk", "/cxs/profiles", jsonObject.toString(), Profile.class);
                logger.info(profile.toString());
                return profile;
            } catch (IOException | JSONException | AccessDeniedException e) {
                logger.error("Error while updating CDP", e);
            }


        }
        return null;
    }
}
