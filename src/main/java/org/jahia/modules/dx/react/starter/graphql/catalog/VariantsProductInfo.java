package org.jahia.modules.dx.react.starter.graphql.catalog;

import java.util.List;

public class VariantsProductInfo {
	private String sku;
	private String vanityURL;
	private List<VariantOption> options;

	private int stockLevel;
	private CioPrice priceInfo;

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

	public int getStockLevel() {
		return stockLevel;
	}

	public void setStockLevel(int stockLevel) {
		this.stockLevel = stockLevel;
	}

	public CioPrice getPriceInfo() {
		return priceInfo;
	}

	public void setPriceInfo(CioPrice priceInfo) {
		this.priceInfo = priceInfo;
	}

	public List<VariantOption> getOptions() {
		return options;
	}

	public void setOptions(List<VariantOption> options) {
		this.options = options;
	}
}
