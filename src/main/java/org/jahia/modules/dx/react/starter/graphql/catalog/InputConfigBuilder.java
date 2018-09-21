package org.jahia.modules.dx.react.starter.graphql.catalog;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.jahia.modules.dx.react.starter.assistant.config.EntityConfig;
import org.jahia.modules.dx.react.starter.assistant.config.RequestPosition;

import com.fasterxml.jackson.databind.ObjectMapper;

public class InputConfigBuilder {
	
	private final static Logger LOGGER = Logger.getLogger(InputConfigBuilder.class);
	
	private List<EntityConfig> configs;
	private InputConfig inputConfig = new InputConfig();
	private InputPriceFilter priceFilter = new InputPriceFilter();
	private String category;
	private static final String DEFAULT_QUERY_CATEGORY =  "/brands";
	private static final String VALUE = "${value}";
	private String query = "query productList($config: InputFacetConfig, $priceFilter: InputPriceFilter,$category: String!) { cioProducts(connection: \"commio01\", index: \"apparelukfull_alias_en\", category: $category, limit: ${limit}, offset: ${offset}, config: $config,priceFilter:$priceFilter) {" + 
			"	sku" + 
			"	name" + 
			"	mountedPath" + 
			"	vanityUrl" + 
			"	images{url}"+
			"	price{formattedValue}"+
			"	code}}";
	
	private String queryProductsInfo = "query productsInfo($config: InputFacetConfig,$productCodes : [String]) {"+
		 " cioProductsInfo(siteKey: \"apparel-uk\", language: \"en\", productCodes:$productCodes, config:$config){"+
			   " sku"+
			   " vanityURL"+
			"    variantsProductInfo{"+
			"      sku"+
			"      vanityURL"+
			  "    options {"+
			 "       qualifier"+
			 "       value"+
			"      }}}}";
			
	public InputConfigBuilder(List<EntityConfig> configs, int limit, int offset) {
		this.configs = configs;
		query = query.replace("${limit}", Integer.toString(limit));
		query = query.replace("${offset}", Integer.toString(offset));
		
	}

	public void addEntities(Map<String, Object> entities) {
		for (EntityConfig entityConfig : configs) {
			addEntity(entities, entityConfig);
		}
	}

	private void addEntity(Map<String, Object> entities, EntityConfig entityConfig) {
		if (entities.get(entityConfig.getEntity()) == null) {
			return;
		}

		List<String> entityValues = new ArrayList<>();
		if (entities.get(entityConfig.getEntity()) instanceof List) {
			((List<Object>) entities.get(entityConfig.getEntity())).stream()
					.forEach(value -> entityValues.add(value.toString()));
		} else {
			entityValues.add(entities.get(entityConfig.getEntity()).toString());
		}

		RequestPosition position = entityConfig.getRequestPosition();
		for (String entityValue : entityValues) {
			String value = entityConfig.getValue().replace(VALUE, entityValue);
			if (position.equals(RequestPosition.categoryUrl) && category!=null) {
				position = entityConfig.getRequestPosition2();
				value = entityConfig.getValue2().replace(VALUE, entityValue);
			}

			switch (position) {
			case categoryUrl:
				category = value;
				break;
			case configSelectedCategories:
				inputConfig.getFacets().getShopByCategory().addInputVariant(getInputVariantConfig(value));

				break;
			case configSelectedVariants:
				inputConfig.getFacets().getShopByVariants().addInputVariant(getInputVariantConfig(value));

				break;
			case search:
				if (StringUtils.isEmpty(inputConfig.getSearch())) {
					inputConfig.setSearch(value);
				} else {
					inputConfig.setSearch(inputConfig.getSearch().concat(" " + value));
				}
				break;
			case lowerBound:
				priceFilter.setLowerBound(Double.parseDouble(value));
				break;
			case upperBound:
				priceFilter.setUpperBound(Double.parseDouble(value));
				break;
			default:
				break;
			}
		}
	}
	
	private InputVariantConfig getInputVariantConfig(String value) {
		ObjectMapper om=new ObjectMapper();
		try {
			return om.readValue(value, InputVariantConfig.class);
		} catch (IOException e) {
			LOGGER.error(e);
			return null;
		}
	}
	
	public Map<String, Object> getInputVariables() {
		Map<String, Object> inputConfigs=new HashMap<>();
		inputConfigs.put("priceFilter", priceFilter);
		inputConfigs.put("config", inputConfig);
		inputConfigs.put("category", category!=null?category:DEFAULT_QUERY_CATEGORY);
		return inputConfigs;
	}
	
	public Map<String, Object> getInputProductsInfo(List<String> productCodes) {
		Map<String, Object> inputConfigs = new HashMap<>();
		inputConfigs.put("config", inputConfig);
		inputConfigs.put("productCodes", productCodes);
		
		return inputConfigs;
	}
	
	public boolean hasOneSize() {
		Optional<InputVariant> size = inputConfig.getFacets().getShopByVariants().getInputVariant("size");
		return size.isPresent()&&size.get().getValue().size()==1;
	}
	
	public String getQuery() {
		return query;
	}

	public String getQueryProductsInfo() {
		return queryProductsInfo;
	}
}
