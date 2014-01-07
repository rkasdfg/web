package org.bench4q.web.model.monitor;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import org.bench4q.web.model.monitor.NetworkInterfaceModelChild;
@XmlRootElement(name = "NetworkInterface")
public class NetworkInterfaceModel {
	private List<NetworkInterfaceModelChild> networkList;

	public List<NetworkInterfaceModelChild> getNetworkList() {
		return networkList;
	}

	public void setNetworkList(List<NetworkInterfaceModelChild> networkList) {
		this.networkList = networkList;
	}
}
