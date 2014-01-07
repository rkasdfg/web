package org.bench4q.web.model.monitor;


import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

import org.bench4q.web.model.monitor.ProcessorModelChild;
@XmlRootElement(name="Processors")
public class ProcessorModel {
	
	private  List<ProcessorModelChild> processorModelList;
	
	@XmlElementWrapper(name="processors")
	@XmlElement(name="processor",type=ProcessorModelChild.class) 
	public List<ProcessorModelChild> getProcessorModelList() {
		return processorModelList;
	}

	public void setProcessorModelList(List<ProcessorModelChild> processorModelList) {
		this.processorModelList = processorModelList;
	}
}
