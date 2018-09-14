package org.jahia.modules.dx.react.starter.graphql.catalog;

public class InputFacetsConfig {
	private InputFacetCategory shopByCategory = new InputFacetCategory();
	private InputFacetVariant shopByVariants = new InputFacetVariant();
	
	public InputFacetCategory getShopByCategory() {
		return shopByCategory;
	}
	public void setShopByCategory(InputFacetCategory shopByCategory) {
		this.shopByCategory = shopByCategory;
	}
	public InputFacetVariant getShopByVariants() {
		return shopByVariants;
	}
	public void setShopByVariants(InputFacetVariant shopByVariants) {
		this.shopByVariants = shopByVariants;
	}
}
