package org.jahia.modules.dx.react.starter.graphql.assistant;

import com.ibm.watson.developer_cloud.assistant.v1.model.RuntimeEntity;

import graphql.annotations.annotationTypes.GraphQLField;
import graphql.annotations.annotationTypes.GraphQLName;

@GraphQLName("entity")
public class WatsonEntity {

	private String name;
	private String value;
	private double confidence;
	
	@GraphQLField
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@GraphQLField
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	@GraphQLField
	public double getConfidence() {
		return confidence;
	}
	public void setConfidence(double confidence) {
		this.confidence = confidence;
	}
	
	public static WatsonEntity getEntity(RuntimeEntity entity) {
		WatsonEntity watsonEntity = new WatsonEntity();
		watsonEntity.name = entity.getEntity();
		watsonEntity.value = entity.getValue();
		watsonEntity.confidence = entity.getConfidence();
		return watsonEntity;
	}
	
}
