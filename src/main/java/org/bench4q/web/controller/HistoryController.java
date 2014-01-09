package org.bench4q.web.controller;

import java.io.ByteArrayInputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.bench4q.web.communication.HttpRequester.HttpResponse;
import org.bench4q.web.model.monitor.ListMainModel;
import org.bench4q.web.model.monitor.MainModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HistoryController extends BaseController {

	@RequestMapping("getHistory")
	@ResponseBody List<MainModel> getHistory()
	{
		String hosts = "127.0.0.1:5556";
		String starttime = "2014-01-09-16-10-00";
		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
		String endtime = dateFormat.format(date);
		endtime = "2014-01-09-16-13-00";
		Map<String, String> params = new HashMap<String, String>();
		params.put("starttime", starttime);
		params.put("endtime", endtime);
		HttpResponse httpResponse = null;
		ListMainModel listMainModel;
		try {
			httpResponse = this.getHttpRequester().sendGet(hosts+"/Monitor/history",
					params,
					null);
			if (httpResponse == null){
				System.out.println("the response of memoryStatus is null");
				return null;
			}
			
			listMainModel = extractListMainModel(httpResponse
					.getContent());

		} catch (Exception e) {
			System.out
					.println("The response of  getting memoyStatus is wrong: "
							+ e.toString());
			return null;
		}
		return listMainModel.getHistorylist();
		
	}
	private ListMainModel extractListMainModel(String content)
			throws JAXBException {
		ListMainModel resultModel = new ListMainModel();
		Unmarshaller ummarshaller = JAXBContext.newInstance(
				resultModel.getClass()).createUnmarshaller();
		resultModel = (ListMainModel) ummarshaller
				.unmarshal(new ByteArrayInputStream(content.getBytes()));
		return resultModel;
	}
}
