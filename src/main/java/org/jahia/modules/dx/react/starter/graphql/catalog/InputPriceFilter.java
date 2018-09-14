package org.jahia.modules.dx.react.starter.graphql.catalog;

public class InputPriceFilter {
	private double lowerBound = -1;
	private double upperBound = -1;
	
	public double getLowerBound() {
		return lowerBound;
	}
	public void setLowerBound(double lowerBound) {
		this.lowerBound = lowerBound;
	}
	public double getUpperBound() {
		return upperBound;
	}
	public void setUpperBound(double upperBound) {
		this.upperBound = upperBound;
	}
}
