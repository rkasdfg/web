package org.bench4q.web.model.monitor;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ProcessorModelChild {
	private String instance;
	private double processorTimePercent;
	private double userTimePercent;
	private double privilegedTimePercent;
	public String getInstance() {
		return instance;
	}
	public void setInstance(String instance) {
		this.instance = instance;
	}
	public double getProcessorTimePercent() {
		return processorTimePercent;
	}
	public void setProcessorTimePercent(double processorTimePercent) {
		this.processorTimePercent = processorTimePercent;
	}
	public double getUserTimePercent() {
		return userTimePercent;
	}
	public void setUserTimePercent(double userTimePercent) {
		this.userTimePercent = userTimePercent;
	}
	public double getPrivilegedTimePercent() {
		return privilegedTimePercent;
	}
	public void setPrivilegedTimePercent(double privilegedTimePercent) {
		this.privilegedTimePercent = privilegedTimePercent;
	}
}
