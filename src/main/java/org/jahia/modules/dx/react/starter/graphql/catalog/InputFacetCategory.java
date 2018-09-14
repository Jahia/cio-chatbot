package org.jahia.modules.dx.react.starter.graphql.catalog;

import java.util.ArrayList;
import java.util.List;

public class InputFacetCategory {
	private String currentPath = "/brands";
	private List<inputVariant> selectedCategories = new ArrayList<>();
	
	public String getCurrentPath() {
		return currentPath;
	}
	public void setCurrentPath(String currentPath) {
		this.currentPath = currentPath;
	}
	public List<inputVariant> getSelectedCategories() {
		return selectedCategories;
	}
	public void setSelectedCategories(List<inputVariant> selectedCategories) {
		this.selectedCategories = selectedCategories;
	}
	
	public void addInputVariant(inputVariant input) {
		selectedCategories.add(input);
	}
}
