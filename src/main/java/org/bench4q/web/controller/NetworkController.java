package org.bench4q.web.controller;

import java.io.ByteArrayInputStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.bench4q.web.communication.HttpRequester.HttpResponse;
import org.bench4q.web.model.monitor.NetworkInterfaceModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class NetworkController extends BaseController {
	private String baseUrl = this.getMasterIP() + "monitorController";

	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}


	@RequestMapping("getNetworkStatus")
	@ResponseBody
	NetworkInterfaceModel getMemoryModel(){
		System.out.println("enter getNetworkStatus");
		HttpResponse httpResponse = null;
		NetworkInterfaceModel networkInterfaceModel;
		try {
			httpResponse = this.getHttpRequester().sendGet(this.masterIP+"/Monitor/Network",
					null,
					null);
			if (httpResponse == null){
				System.out.println("the response of memoryStatus is null");
				return null;
			}
			
			networkInterfaceModel = extractNetworkInterfaceModel(httpResponse
					.getContent());

		} catch (Exception e) {
			System.out
					.println("The response of  getting networkStatus is wrong: "
							+ e.toString());
			return null;
		}
		return networkInterfaceModel;
	}
	

	private NetworkInterfaceModel extractNetworkInterfaceModel(String content)
			throws JAXBException {
		NetworkInterfaceModel resultModel = new NetworkInterfaceModel();
		Unmarshaller ummarshaller = JAXBContext.newInstance(
				resultModel.getClass()).createUnmarshaller();
		resultModel = (NetworkInterfaceModel) ummarshaller
				.unmarshal(new ByteArrayInputStream(content.getBytes()));
		return resultModel;
	}
}
