package org.bench4q.web.model.monitor;


import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name = "NetworkInterface")
public class NetworkInterfaceModel {
	private double kiloBytesTotalPerSecond;
	private double kiloBytesReceivedPerSecond;
	private double kiloBytesSentPerSecond;
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
}
