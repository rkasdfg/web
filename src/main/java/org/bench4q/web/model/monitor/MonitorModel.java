package org.bench4q.web.model.monitor;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MonitorModel {
	private String hostName;
	private int port;

	@XmlElement
	public String getHostName() {
		return hostName;
	}

	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

	@XmlElement
	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

}
