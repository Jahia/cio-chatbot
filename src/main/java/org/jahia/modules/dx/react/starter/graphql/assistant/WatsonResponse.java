package org.jahia.modules.dx.react.starter.graphql.assistant;

import com.ibm.watson.developer_cloud.assistant.v1.model.MessageResponse;
import graphql.annotations.annotationTypes.GraphQLField;
import graphql.annotations.annotationTypes.GraphQLName;

import java.util.List;
import java.util.stream.Collectors;

@GraphQLName("response")
public class WatsonResponse {
    private List<String> outputMessages;
    private List<String> intents;
    private List<WatsonEntity> entities;
    private String conversationId;
    private boolean search = false;
    private String emailAddress = null;

    @GraphQLField
    public List<String> getIntents() {
        return intents;
    }

    public void setIntents(List<String> intents) {
        this.intents = intents;
    }

    @GraphQLField
    public List<WatsonEntity> getEntities() {
        return entities;
    }

    public void setEntities(List<WatsonEntity> entities) {
        this.entities = entities;
    }

    @GraphQLField
    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    @GraphQLField
    public List<String> getOutputMessages() {
        return outputMessages;
    }

    public void setOutputMessages(List<String> outputMessages) {
        this.outputMessages = outputMessages;
    }

    public static WatsonResponse getResponse(MessageResponse response) {
        WatsonResponse watsonResponse = new WatsonResponse();
        watsonResponse.outputMessages = response.getOutput().getText();
        watsonResponse.intents = response.getIntents().stream().map(intent -> intent.getIntent())
                .collect(Collectors.toList());
        watsonResponse.entities = response.getEntities().stream().map(entity -> WatsonEntity.getEntity(entity))
                .collect(Collectors.toList());
        watsonResponse.conversationId = response.getContext().getConversationId();
        watsonResponse.search = response.getContext().get("go") != null
                ? Boolean.valueOf(response.getContext().get("go").toString())
                : false;
        watsonResponse.emailAddress = response.getContext().get("emailAddress") != null ? response.getContext().get("emailAddress").toString() : null;
        return watsonResponse;
    }

    @GraphQLField
    public boolean canSearch() {
        return search;
    }

    @GraphQLField
    public String emailAddress() {
        return emailAddress;
    }

    public void setSearch(boolean search) {
        this.search = search;
    }
}
