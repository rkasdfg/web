package org.bench4q.web.model.monitor;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="PhysicalDisk")
public class PhysicalDiskModel {
	private double diskReadRate;
	private double diskWriteRate;
	private double curDiskQueLength;
	public double getDiskReadRate() {
		return diskReadRate;
	}
	public void setDiskReadRate(double diskReadRate) {
		this.diskReadRate = diskReadRate;
	}
	public double getDiskWriteRate() {
		return diskWriteRate;
	}
	public void setDiskWriteRate(double diskWriteRate) {
		this.diskWriteRate = diskWriteRate;
	}
	public double getCurDiskQueLength() {
		return curDiskQueLength;
	}
	public void setCurDiskQueLength(double curDiskQueLength) {
		this.curDiskQueLength = curDiskQueLength;
	}
	
}
