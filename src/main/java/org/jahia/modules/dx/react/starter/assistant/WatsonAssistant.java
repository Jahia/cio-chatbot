package org.jahia.modules.dx.react.starter.assistant;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.ibm.watson.developer_cloud.assistant.v1.Assistant;
import com.ibm.watson.developer_cloud.assistant.v1.model.Context;
import com.ibm.watson.developer_cloud.assistant.v1.model.InputData;
import com.ibm.watson.developer_cloud.assistant.v1.model.MessageOptions;
import com.ibm.watson.developer_cloud.assistant.v1.model.MessageResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WatsonAssistant {
	private static Logger logger = LoggerFactory.getLogger(WatsonAssistant.class);
	private static Assistant service = new Assistant("2018-02-16");
	private static String workspaceId = "a24131a9-a13f-441c-89f6-8ab38053de8d";
	
	private static Map<String, Context> contexts=new HashMap<>();

	public static MessageResponse sendMessage(String message, String conversationId, String favoriteColor, Boolean askEmail) {
		service.setEndPoint("https://gateway.watsonplatform.net/assistant/api");
		service.setUsernameAndPassword("ac5f123f-e25d-4f7c-9345-26b3358ea3a3", "QeDCp1vRhvio");
		InputData data = new InputData.Builder(message).build();
		Context context= contexts.get(conversationId);
		
		if (StringUtils.isNotEmpty(favoriteColor)) {
			context = context != null ? context : new Context();
			context.put("favoriteColor", favoriteColor);
		}

		logger.info("askEmail value "+askEmail);
		if (askEmail != null && askEmail) {
			context = context != null ? context : new Context();
			context.put("action", "askEmail");
			logger.info("asking for Email");
		}
		
		MessageOptions newMessageOptions = new MessageOptions.Builder().workspaceId(workspaceId)
				.input(data).context(context).build();

		MessageResponse response = service.message(newMessageOptions).execute();
		
		contexts.put(response.getContext().getConversationId(), response.getContext());
		return response;
	}
	
	public static Context getContext(String conversationId) {
		return contexts.get(conversationId);
	}
}
