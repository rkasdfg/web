package org.bench4q.web.controller;

import java.io.ByteArrayInputStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.bench4q.web.communication.HttpRequester.HttpResponse;
import org.bench4q.web.model.monitor.MemoryModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class MemoryController extends BaseController  {
	private String baseUrl = this.getMasterIP() + "monitorController";

	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}


	@RequestMapping("getMemoryStatus")
	@ResponseBody
	MemoryModel getMemoryModel(@RequestParam String hosts){
		System.out.println("enter getMeoryStatus");
		HttpResponse httpResponse = null;
		MemoryModel memoryModel;
		try {
			httpResponse = this.getHttpRequester().sendGet(hosts+"/Monitor/Memory",
					null,
					null);
			if (httpResponse == null){
				System.out.println("the response of memoryStatus is null");
				return null;
			}
			
			memoryModel = extractMemoryModel(httpResponse
					.getContent());

		} catch (Exception e) {
			System.out
					.println("The response of  getting memoyStatus is wrong: "
							+ e.toString());
			return null;
		}
		return memoryModel;
	}
	

	private MemoryModel extractMemoryModel(String content)
			throws JAXBException {
		MemoryModel resultModel = new MemoryModel();
		Unmarshaller ummarshaller = JAXBContext.newInstance(
				resultModel.getClass()).createUnmarshaller();
		resultModel = (MemoryModel) ummarshaller
				.unmarshal(new ByteArrayInputStream(content.getBytes()));
		return resultModel;
	}
}
