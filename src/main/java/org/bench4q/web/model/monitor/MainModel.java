package org.bench4q.web.model.monitor;



import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.bench4q.web.model.monitor.MemoryModel;
import org.bench4q.web.model.monitor.NetworkInterfaceModel;
import org.bench4q.web.model.monitor.PhysicalDiskModel;
import org.bench4q.web.model.monitor.ProcessorModel;


@XmlRootElement(name="history")
public class MainModel {
	private String date;
	private ProcessorModel processorModel;
	private MemoryModel memoryModel;
	private PhysicalDiskModel physicalDiskModel;
	private NetworkInterfaceModel networkInterfaceModel;
	@XmlElement
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	@XmlElement(name="process_info")
	public ProcessorModel getProcessorModel() {
		return processorModel;
	}
	public void setProcessorModel(ProcessorModel processorModel) {
		this.processorModel = processorModel;
	}
	@XmlElement(name="memory_info")
	public MemoryModel getMemoryModel() {
		return memoryModel;
	}
	public void setMemoryModel(MemoryModel memoryModel) {
		this.memoryModel = memoryModel;
	}
	@XmlElement(name="disk_info")
	public PhysicalDiskModel getPhysicalDiskModel() {
		return physicalDiskModel;
	}
	public void setPhysicalDiskModel(PhysicalDiskModel physicalDiskModel) {
		this.physicalDiskModel = physicalDiskModel;
	}
	@XmlElement(name="network_info")
	public NetworkInterfaceModel getNetworkInterfaceModel() {
		return networkInterfaceModel;
	}
	public void setNetworkInterfaceModel(NetworkInterfaceModel networkInterfaceModel) {
		this.networkInterfaceModel = networkInterfaceModel;
	}



}

