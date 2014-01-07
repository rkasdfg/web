package org.bench4q.web.controller;

import java.io.ByteArrayInputStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.bench4q.web.communication.HttpRequester.HttpResponse;
import org.bench4q.web.model.monitor.MainModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class MainController extends BaseController {
	private String baseUrl = this.getMasterIP() + "mainController";

	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}
	@RequestMapping("getAllStatus")
	@ResponseBody
	MainModel getMainModel(@RequestParam String hosts){
		System.out.println("enter getAllStatus");
		HttpResponse httpResponse = null;
		MainModel mainModel;
		try {
			httpResponse = this.getHttpRequester().sendGet(hosts+"/Monitor/All",
					null,
					null);
			if (httpResponse == null){
				System.out.println("the response of memoryStatus is null");
				return null;
			}
			
			mainModel = extractMainModel(httpResponse
					.getContent());

		} catch (Exception e) {
			System.out
					.println("The response of  getting memoyStatus is wrong: "
							+ e.toString());
			return null;
		}
		return mainModel;
	}
	

	private MainModel extractMainModel(String content)
			throws JAXBException {
		MainModel resultModel = new MainModel();
		Unmarshaller ummarshaller = JAXBContext.newInstance(
				resultModel.getClass()).createUnmarshaller();
		resultModel = (MainModel) ummarshaller
				.unmarshal(new ByteArrayInputStream(content.getBytes()));
		return resultModel;
	}
}
