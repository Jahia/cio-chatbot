package org.jahia.modules.dx.react.starter.graphql.catalog;

public class InputConfig {
	private InputFacetsConfig facets = new InputFacetsConfig();
	private String search;
	public InputFacetsConfig getFacets() {
		return facets;
	}
	public void setFacets(InputFacetsConfig facets) {
		this.facets = facets;
	}
	public String getSearch() {
		return search;
	}
	public void setSearch(String search) {
		this.search = search;
	}
}
