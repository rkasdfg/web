package org.bench4q.web.model.monitor;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="Memory")
public class MemoryModel {
	private long pagesPerSecond;
	private long pagesInputPerSecond;
	private long pagesOutputPerSecond;
	private long availableKiloBytes;
	private long totalKiloBytes;
	private double memoryUsedPercent;
	public long getPagesPerSecond() {
		return pagesPerSecond;
	}
	public void setPagesPerSecond(long pagesPerSecond) {
		this.pagesPerSecond = pagesPerSecond;
	}
	public long getPagesInputPerSecond() {
		return pagesInputPerSecond;
	}
	public void setPagesInputPerSecond(long pagesInputPerSecond) {
		this.pagesInputPerSecond = pagesInputPerSecond;
	}
	public long getPagesOutputPerSecond() {
		return pagesOutputPerSecond;
	}
	public void setPagesOutputPerSecond(long pagesOutputPerSecond) {
		this.pagesOutputPerSecond = pagesOutputPerSecond;
	}
	public long getAvailableKiloBytes() {
		return availableKiloBytes;
	}
	public void setAvailableKiloBytes(long availableKiloBytes) {
		this.availableKiloBytes = availableKiloBytes;
	}
	public long getTotalKiloBytes() {
		return totalKiloBytes;
	}
	public void setTotalKiloBytes(long totalKiloBytes) {
		this.totalKiloBytes = totalKiloBytes;
	}
	public double getMemoryUsedPercent() {
		return memoryUsedPercent;
	}
	public void setMemoryUsedPercent(double memoryUsedPercent) {
		this.memoryUsedPercent = memoryUsedPercent;
	}
	
	

}
