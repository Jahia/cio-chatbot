package org.jahia.modules.dx.react.starter.graphql.catalog;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	private static final String DEFAULT_QUERY_CATEGORY =  "/brands";
	private static final String QUERY_CATEGORY = "${category}";
	private static final String VALUE = "${value}";
	private String query = "query productList($config: InputFacetConfig, $priceFilter: InputPriceFilter) { cioProducts(connection: \"commio01\", index: \"apparelukfull_alias_en\", category: \""+QUERY_CATEGORY+"\", limit: ${limit}, offset: ${offset}, config: $config,priceFilter:$priceFilter) {" + 
			"	sku" + 
			"	name" + 
			"	mountedPath" + 
			"	vanityUrl" + 
			"	images{url}"+
			"	price{formattedValue}"+
			"	code}}";

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
		if (entities.get(entityConfig.getEntity()) != null) {
			String entityValue = entities.get(entityConfig.getEntity()).toString();
			RequestPosition position = entityConfig.getRequestPosition();
			String value = entityConfig.getValue().replace(VALUE, entityValue);
			if(position.equals(RequestPosition.categoryUrl)&&!query.contains(QUERY_CATEGORY)) {
				position = entityConfig.getRequestPosition2();
				value = entityConfig.getValue2().replace(VALUE, entityValue);
			}

			switch (position) {
			case categoryUrl:
				query = query.replace(QUERY_CATEGORY, value);
				break;
			case configSelectedCategories:
				inputConfig.getFacets().getShopByCategory().addInputVariant(getInputVariant(value));
				break;
			case configSelectedVariants:
				inputConfig.getFacets().getShopByVariants().addInputVariant(getInputVariant(value));
				break;
			case search:
				if(StringUtils.isEmpty(inputConfig.getSearch())) {
					inputConfig.setSearch(value);
				}else {
					inputConfig.setSearch(inputConfig.getSearch().concat(" "+ value));
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
	
	private inputVariantConfig getInputVariant(String value) {
		ObjectMapper om=new ObjectMapper();
		try {
			return om.readValue(value, inputVariantConfig.class);
		} catch (IOException e) {
			LOGGER.error(e);
			return null;
		}
	}

	public Map<String, Object> getInputVariables() {
		Map<String, Object> inputConfigs=new HashMap<>();
		inputConfigs.put("priceFilter", priceFilter);
		inputConfigs.put("config", inputConfig);
		return inputConfigs;
	}
	
	
	
	public String getQuery() {
		if(query.contains(QUERY_CATEGORY)) {
			query = query.replace(QUERY_CATEGORY, DEFAULT_QUERY_CATEGORY);
		}
		return query;
	}
}
