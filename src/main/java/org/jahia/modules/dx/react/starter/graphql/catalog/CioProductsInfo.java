package org.jahia.modules.dx.react.starter.graphql.catalog;

import java.util.List;

public class CioProductsInfo {
	private String sku;
	private String vanityURL;
	private CioPrice priceInfo;
	private List<VariantsProductInfo> variantsProductInfo;

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getVanityURL() {
		return vanityURL;
	}

	public void setVanityURL(String vanityURL) {
		this.vanityURL = vanityURL;
	}

	public CioPrice getPriceInfo() {
		return priceInfo;
	}

	public void setPriceInfo(CioPrice priceInfo) {
		this.priceInfo = priceInfo;
	}

	public List<VariantsProductInfo> getVariantsProductInfo() {
		return variantsProductInfo;
	}

	public void setVariantsProductInfo(List<VariantsProductInfo> variantsProductInfo) {
		this.variantsProductInfo = variantsProductInfo;
	}
}
