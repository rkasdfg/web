package org.bench4q.web.model.monitor;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class NetworkInterfaceModelChild {
	private double kiloBytesTotalPerSecond;
	private double kiloBytesReceivedPerSecond;
	private double kiloBytesSentPerSecond;
	private String address;
	private String instance;
	public double getKiloBytesTotalPerSecond() {
		return kiloBytesTotalPerSecond;
	}
	public void setKiloBytesTotalPerSecond(double kiloBytesTotalPerSecond) {
		this.kiloBytesTotalPerSecond = kiloBytesTotalPerSecond;
	}
	public double getKiloBytesReceivedPerSecond() {
		return kiloBytesReceivedPerSecond;
	}
	public void setKiloBytesReceivedPerSecond(double kiloBytesReceivedPerSecond) {
		this.kiloBytesReceivedPerSecond = kiloBytesReceivedPerSecond;
	}
	public double getKiloBytesSentPerSecond() {
		return kiloBytesSentPerSecond;
	}
	public void setKiloBytesSentPerSecond(double kiloBytesSentPerSecond) {
		this.kiloBytesSentPerSecond = kiloBytesSentPerSecond;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getInstance() {
		return instance;
	}
	public void setInstance(String instance) {
		this.instance = instance;
	}
}
