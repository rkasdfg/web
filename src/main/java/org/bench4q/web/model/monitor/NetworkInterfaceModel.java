package org.bench4q.web.model.monitor;
import java.util.List;
import org.bench4q.web.model.monitor.NetworkInterfaceModelChild;
public class NetworkInterfaceModel {
	private List<NetworkInterfaceModelChild> networkList;

	public List<NetworkInterfaceModelChild> getNetworkList() {
		return networkList;
	}

	public void setNetworkList(List<NetworkInterfaceModelChild> networkList) {
		this.networkList = networkList;
	}
}
