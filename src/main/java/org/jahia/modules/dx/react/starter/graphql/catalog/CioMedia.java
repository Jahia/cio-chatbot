package org.jahia.modules.dx.react.starter.graphql.catalog;

import graphql.annotations.annotationTypes.GraphQLField;

public class CioMedia {
	private String altText;
	private String format;
	private String imageType;
	private String url;
	
	@GraphQLField
	public String getAltText() {
		return altText;
	}
	public void setAltText(String altText) {
		this.altText = altText;
	}
	@GraphQLField
	public String getFormat() {
		return format;
	}
	public void setFormat(String format) {
		this.format = format;
	}
	@GraphQLField
	public String getImageType() {
		return imageType;
	}
	public void setImageType(String imageType) {
		this.imageType = imageType;
	}
	@GraphQLField
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
}
