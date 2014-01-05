package org.bench4q.web.controller;

import java.io.ByteArrayInputStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.bench4q.web.communication.HttpRequester.HttpResponse;
import org.bench4q.web.model.monitor.ProcessorModel;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class ProcessorController extends BaseController {
	private String baseUrl = this.getMasterIP() + "monitorController";

	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}


	@RequestMapping("getProcessorStatus")
	@ResponseBody
	ProcessorModel getProcessorModel(){
		System.out.println("enter getMeoryStatus");
		HttpResponse httpResponse = null;
		ProcessorModel processorModel;
		try {
			httpResponse = this.getHttpRequester().sendGet(this.masterIP+"/Monitor/Processor",
					null,
					null);
			if (httpResponse == null){
				System.out.println("the response of processorStatus is null");
				return null;
			}
			
			processorModel = extractProcessorModel(httpResponse
					.getContent());

		} catch (Exception e) {
			System.out
					.println("The response of  getting processorStatus is wrong: "
							+ e.toString());
			return null;
		}
		return processorModel;
	}
	

	private ProcessorModel extractProcessorModel(String content)
			throws JAXBException {
		ProcessorModel resultModel = new ProcessorModel();
		Unmarshaller ummarshaller = JAXBContext.newInstance(
				resultModel.getClass()).createUnmarshaller();
		resultModel = (ProcessorModel) ummarshaller
				.unmarshal(new ByteArrayInputStream(content.getBytes()));
		return resultModel;
	}
}
