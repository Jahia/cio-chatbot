package org.jahia.modules.dx.react.starter.graphql.queries.assistant;

import com.ibm.watson.developer_cloud.assistant.v1.model.MessageResponse;
import graphql.annotations.annotationTypes.*;
import org.jahia.modules.dx.react.starter.assistant.WatsonAssistant;
import org.jahia.modules.dx.react.starter.graphql.assistant.WatsonResponse;
import org.jahia.modules.graphql.provider.dxm.DXGraphQLProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@GraphQLTypeExtension(DXGraphQLProvider.Query.class)
@GraphQLDescription("Example of a GraphQL query extension")
public class WatsonQueryExtension {

    private static Logger logger = LoggerFactory.getLogger(WatsonQueryExtension.class);
    @GraphQLField
    public static WatsonResponse sendMessage(@GraphQLNonNull @GraphQLName("message") String message,
                                             @GraphQLDescription("id of conversation sent in the response") @GraphQLName("conversationId") String conversationId,
                                             @GraphQLDescription("favoriteColor (when window.cxs (CDP profile) is available)") @GraphQLName("favoriteColor") String favoriteColor,
                                             @GraphQLDescription("ask Email if needed ") @GraphQLName("askEmail") String askEmail) {
        logger.info("ask Email "+askEmail);
        MessageResponse messageResponse = WatsonAssistant.sendMessage(message, conversationId, favoriteColor, new Boolean(askEmail));
        WatsonResponse response = WatsonResponse.getResponse(messageResponse);
        return response;
    }
}
