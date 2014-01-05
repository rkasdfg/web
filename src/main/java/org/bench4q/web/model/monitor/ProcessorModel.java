package org.bench4q.web.model.monitor;


import java.util.List;

import org.bench4q.web.model.monitor.ProcessorModelChild;

public class ProcessorModel {
	private  List<ProcessorModelChild> processorModelList;

	public List<ProcessorModelChild> getProcessorModelList() {
		return processorModelList;
	}

	public void setProcessorModelList(List<ProcessorModelChild> processorModelList) {
		this.processorModelList = processorModelList;
	}
}
