
package org.jahia.modules.dx.react.starter.graphql;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;

public class GraphQLCall {
	
	private final static Logger LOGGER = Logger.getLogger(GraphQLCall.class);
	
	public static String sendPost(Map<String,Object> jsonObj) throws Exception {

		LOGGER.error("Graphql request start");
		String url = "https://demo.commerceio.jahia.com/modules/graphql/";
		URL obj = new URL(url);
		HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

		//add reuqest header
		con.setRequestMethod("POST");
		con.setRequestProperty("Content-Type", "application/json");
		
		// Send post request
		con.setDoOutput(true);
		
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		ObjectMapper om = new ObjectMapper();
		String jsonValue=om.writeValueAsString(jsonObj);
		LOGGER.info("Graphql request : " + jsonValue);
		wr.writeBytes(jsonValue);
		wr.flush();
		wr.close();
		
		int responseCode = con.getResponseCode();
		LOGGER.info("Sending 'POST' request to URL : " + url);
		LOGGER.info("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuilder response = new StringBuilder();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
		
		return response.toString();

	}

}
