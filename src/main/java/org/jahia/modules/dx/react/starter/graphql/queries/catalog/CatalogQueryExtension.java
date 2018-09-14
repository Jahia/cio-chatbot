package org.jahia.modules.dx.react.starter.graphql.queries.catalog;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jahia.modules.dx.react.starter.assistant.WatsonAssistant;
import org.jahia.modules.dx.react.starter.assistant.config.EntitiesConfigService;
import org.jahia.modules.dx.react.starter.graphql.GraphQLCall;
import org.jahia.modules.dx.react.starter.graphql.catalog.CioProduct;
import org.jahia.modules.dx.react.starter.graphql.catalog.InputConfigBuilder;
import org.jahia.modules.graphql.provider.dxm.DXGraphQLProvider;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibm.watson.developer_cloud.assistant.v1.model.Context;

import graphql.annotations.annotationTypes.GraphQLDescription;
import graphql.annotations.annotationTypes.GraphQLField;
import graphql.annotations.annotationTypes.GraphQLName;
import graphql.annotations.annotationTypes.GraphQLNonNull;
import graphql.annotations.annotationTypes.GraphQLTypeExtension;

@GraphQLTypeExtension(DXGraphQLProvider.Query.class)
@GraphQLDescription("Example of a GraphQL query extension")
public class CatalogQueryExtension {

	@GraphQLField
	public static List<CioProduct> getProducts(@GraphQLNonNull @GraphQLName("conversationId") String conversationId,@GraphQLName("limit") int limit,@GraphQLName("offset") int offset) throws Exception {
		Context context = WatsonAssistant.getContext( conversationId);
		InputConfigBuilder inputConfigBuilder = new InputConfigBuilder(EntitiesConfigService.getEntitiesConfigService().getConfigs(),limit,offset);
		inputConfigBuilder.addEntities(context);
		Map<String,Object> jsonObj=new HashMap<>();
		jsonObj.put("query", inputConfigBuilder.getQuery());
		jsonObj.put("variables", inputConfigBuilder.getInputVariables());
		String response=GraphQLCall.sendPost(jsonObj);
		ObjectMapper om =new ObjectMapper();
		
		Map<String, Map<String,List<CioProduct>>> mapValue = om.readValue(response, new TypeReference<Map<String, Map<String,List<CioProduct>>>>() {
		});
		
		return mapValue.get("data").get("cioProducts");
	}
}
