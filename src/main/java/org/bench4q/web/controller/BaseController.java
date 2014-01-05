package org.bench4q.web.controller;

import java.util.HashMap;
import java.util.Map;

import org.bench4q.web.communication.HttpRequester;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class BaseController {
	public static String SUCCESS = "success";
	public static String FAIL = "fail";
	public static String FAIL_WITH_EXCEPTION = "fail with exception";
	private HttpRequester httpRequester;
	protected final String masterIP = "127.0.0.1:5556/";
	protected final int monitorPort=5556;
	public HttpRequester getHttpRequester() {
		return httpRequester;
	}

	@Autowired
	public void setHttpRequester(HttpRequester httpRequester) {
		this.httpRequester = httpRequester;
	}

	public String getMasterIP() {
		return masterIP;
	}


	public static Map<String, String> makeParamsMap(String key, String value) {
		Map<String, String> params = new HashMap<String, String>();
		params.put(key, value);
		return params;
	}
}
