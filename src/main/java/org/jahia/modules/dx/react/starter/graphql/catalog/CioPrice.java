package org.jahia.modules.dx.react.starter.graphql.catalog;

import graphql.annotations.annotationTypes.GraphQLField;

public class CioPrice {
	private String currencyIso;
	private String formattedValue;
	private String priceType;
	private double value;
	
	@GraphQLField
	public String getCurrencyIso() {
		return currencyIso;
	}
	public void setCurrencyIso(String currencyIso) {
		this.currencyIso = currencyIso;
	}
	@GraphQLField
	public String getFormattedValue() {
		return formattedValue;
	}
	public void setFormattedValue(String formattedValue) {
		this.formattedValue = formattedValue;
	}
	@GraphQLField
	public String getPriceType() {
		return priceType;
	}
	public void setPriceType(String priceType) {
		this.priceType = priceType;
	}
	@GraphQLField
	public double getValue() {
		return value;
	}
	public void setValue(double value) {
		this.value = value;
	}
}
