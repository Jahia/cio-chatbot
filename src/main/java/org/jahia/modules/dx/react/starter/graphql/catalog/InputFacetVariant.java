package org.jahia.modules.dx.react.starter.graphql.catalog;

import java.util.ArrayList;
import java.util.List;

public class InputFacetVariant {
	private String currentPath = "/brands";
	private List<inputVariant> selectedVariants = new ArrayList<>();
	public String getCurrentPath() {
		return currentPath;
	}
	public void setCurrentPath(String currentPath) {
		this.currentPath = currentPath;
	}
	public List<inputVariant> getSelectedVariants() {
		return selectedVariants;
	}
	public void setSelectedVariants(List<inputVariant> selectedVariants) {
		this.selectedVariants = selectedVariants;
	}
	
	public void addInputVariant(inputVariant input) {
		selectedVariants.add(input);
	}
}
