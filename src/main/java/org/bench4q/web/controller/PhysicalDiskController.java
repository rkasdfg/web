package org.bench4q.web.controller;

import java.io.ByteArrayInputStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.bench4q.web.communication.HttpRequester.HttpResponse;
import org.bench4q.web.model.monitor.PhysicalDiskModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class PhysicalDiskController extends BaseController {
	private String baseUrl = this.getMasterIP() + "monitorController";

	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}


	@RequestMapping("getPhysicalDataStatus")
	@ResponseBody
	public PhysicalDiskModel getPhysicalDiskStatus(){
		
		System.out.println("enter getPhysicalDisk");
		HttpResponse httpResponse = null;
		PhysicalDiskModel physicalDiskModel;
		try {
			httpResponse = this.getHttpRequester().sendGet(this.masterIP+"/Monitor/PhysicalDisk",
					null,
					null);
			if (httpResponse == null){
				System.out.println("the response of memoryStatus is null");
				return null;
			}
			
			physicalDiskModel = extractPhysicalDiskModel(httpResponse
					.getContent());

		} catch (Exception e) {
			System.out
					.println("The response of  getting memoyStatus is wrong: "
							+ e.toString());
			return null;
		}
		System.out.println(physicalDiskModel.getDiskReadRate());
		return physicalDiskModel;
		
	}	
	
	

	private PhysicalDiskModel extractPhysicalDiskModel(String content)
			throws JAXBException {
		PhysicalDiskModel resultModel = new PhysicalDiskModel();
		Unmarshaller ummarshaller = JAXBContext.newInstance(
				resultModel.getClass()).createUnmarshaller();
		resultModel = (PhysicalDiskModel) ummarshaller
				.unmarshal(new ByteArrayInputStream(content.getBytes()));
		return resultModel;
	}
}
	
	