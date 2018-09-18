package org.jahia.modules.dx.react.starter.graphql.catalog;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class InputFacetCategory {
	private String currentPath = "/brands";
	private List<InputVariant> selectedCategories = new ArrayList<>();
	
	public String getCurrentPath() {
		return currentPath;
	}
	public void setCurrentPath(String currentPath) {
		this.currentPath = currentPath;
	}
	public List<InputVariant> getSelectedCategories() {
		return selectedCategories;
	}
	public void setSelectedCategories(List<InputVariant> selectedCategories) {
		this.selectedCategories = selectedCategories;
	}
	
	public void addInputVariant(inputVariantConfig input) {
		Optional<InputVariant> opInputVariant = getInputVariant(input.getName());
		InputVariant newInputVariant;
		if(opInputVariant.isPresent()) {
			newInputVariant = opInputVariant.get();
		}else {
			newInputVariant = new InputVariant();
			newInputVariant.setName(input.getName());
			newInputVariant.setValue(new ArrayList<>());
			selectedCategories.add(newInputVariant);
		}
		newInputVariant.getValue().add(input.getValue());
	}
	
	private Optional<InputVariant> getInputVariant(String name) {
		return selectedCategories.stream().filter(element -> element.getName().equals(name)).findFirst();
	}
}
