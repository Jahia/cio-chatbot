package org.jahia.modules.dx.react.starter.graphql.queries.assistant;

import org.jahia.modules.dx.react.starter.assistant.WatsonAssistant;
import org.jahia.modules.dx.react.starter.graphql.assistant.WatsonResponse;
import org.jahia.modules.graphql.provider.dxm.DXGraphQLProvider;

import com.ibm.watson.developer_cloud.assistant.v1.model.MessageResponse;

import graphql.annotations.annotationTypes.GraphQLDescription;
import graphql.annotations.annotationTypes.GraphQLField;
import graphql.annotations.annotationTypes.GraphQLName;
import graphql.annotations.annotationTypes.GraphQLNonNull;
import graphql.annotations.annotationTypes.GraphQLTypeExtension;

@GraphQLTypeExtension(DXGraphQLProvider.Query.class)
@GraphQLDescription("Example of a GraphQL query extension")
public class WatsonQueryExtension {

	@GraphQLField
	public static WatsonResponse sendMessage(@GraphQLNonNull @GraphQLName("message") String message,
			@GraphQLDescription("id of conversation sended in the response") @GraphQLName("conversationId") String conversationId) {

		MessageResponse messageResponse = WatsonAssistant.sendMessage(message, conversationId);
		WatsonResponse response = WatsonResponse.getResponse(messageResponse);
		return response;
	}
}
