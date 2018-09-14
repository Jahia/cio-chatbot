package org.jahia.modules.dx.react.starter.assistant.config;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.util.ResourceUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class EntitiesConfigService {

	private final static Logger LOGGER = Logger.getLogger(EntitiesConfigService.class);
	private List<EntityConfig> configs;
	private static EntitiesConfigService entitiesConfigService = new EntitiesConfigService();

	public static EntitiesConfigService getEntitiesConfigService() {
		return entitiesConfigService;
	}

	private EntitiesConfigService() {
		init();
	}

	public void init() {
		File fileConfig = null;
		try {
			fileConfig = ResourceUtils.getFile("entitiesConfig.json");
		} catch (FileNotFoundException e) {
			LOGGER.error("entitiesConfig file not found", e);
			return;
		}

		ObjectMapper mapper = new ObjectMapper();

		try {

			Map<String, List<EntityConfig>> mapConfigs = mapper.readValue(fileConfig,
					new TypeReference<Map<String, List<EntityConfig>>>() {
					});
			configs = mapConfigs.get("configs");
		} catch (IOException e) {
			LOGGER.error("Exception in reading entitiesConfig file", e);
			return;
		}

	}

	public List<EntityConfig> getConfigs() {
		return configs;
	}

	public Optional<EntityConfig> getConfigByEnity(String entity) {
		return configs.stream().filter(entityConfig -> {
			if (entityConfig.getEntity().equalsIgnoreCase(entity)) {
				return true;
			}
			return false;
		}).findFirst();
	}

}
