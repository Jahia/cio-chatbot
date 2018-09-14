package org.jahia.modules.dx.react.starter.graphql.catalog;

import java.util.List;

import graphql.annotations.annotationTypes.GraphQLField;

public class CioProduct {
	private String code;
	private String sku;
	private String name;
	private String summary;
	private String mountedPath;
	private String vanityUrl;
	private List<CioMedia> images;
	private CioPrice price;
	
	@GraphQLField
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	@GraphQLField
	public String getSku() {
		return sku;
	}
	public void setSku(String sku) {
		this.sku = sku;
	}
	@GraphQLField
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@GraphQLField
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	@GraphQLField
	public String getMountedPath() {
		return mountedPath;
	}
	public void setMountedPath(String mountedPath) {
		this.mountedPath = mountedPath;
	}
	@GraphQLField
	public String getVanityUrl() {
		return vanityUrl;
	}
	public void setVanityUrl(String vanityUrl) {
		this.vanityUrl = vanityUrl;
	}
	@GraphQLField
	public List<CioMedia> getImages() {
		return images;
	}
	public void setImages(List<CioMedia> images) {
		this.images = images;
	}
	@GraphQLField
	public CioPrice getPrice() {
		return price;
	}
	public void setPrice(CioPrice price) {
		this.price = price;
	}
}
