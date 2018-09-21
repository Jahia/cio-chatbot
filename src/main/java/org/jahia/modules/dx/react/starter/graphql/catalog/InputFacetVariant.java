package org.jahia.modules.dx.react.starter.graphql.catalog;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class InputFacetVariant {
	private String currentPath = "/brands";
	private List<InputVariant> selectedVariants = new ArrayList<>();
	public String getCurrentPath() {
		return currentPath;
	}
	public void setCurrentPath(String currentPath) {
		this.currentPath = currentPath;
	}
	public List<InputVariant> getSelectedVariants() {
		return selectedVariants;
	}
	public void setSelectedVariants(List<InputVariant> selectedVariants) {
		this.selectedVariants = selectedVariants;
	}
	
	public void addInputVariant(InputVariantConfig input) {
		Optional<InputVariant> opInputVariant = getInputVariant(input.getName());
		InputVariant newInputVariant;
		if(opInputVariant.isPresent()) {
			newInputVariant = opInputVariant.get();
		}else {
			newInputVariant = new InputVariant();
			newInputVariant.setName(input.getName());
			newInputVariant.setValue(new ArrayList<>());
			selectedVariants.add(newInputVariant);
		}
		newInputVariant.getValue().add(input.getValue());
	}
	
	public Optional<InputVariant> getInputVariant(String name) {
		return selectedVariants.stream().filter(element -> element.getName().equals(name)).findFirst();
	}
}
