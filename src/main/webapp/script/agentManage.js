var table;
$(document).ready(function() {
	table = new bench4q.table("Agent");
	table.loadTable();
});

function edittablerow(obj) {
	var row = obj.parentNode.parentNode;
	alert(row.rowIndex);
}

function deletetablerow(obj) {
	table.deleteTableRow(obj);
}

function addAgent() {
	$("#hostName").val(0);
	$("#port").val(0);
	$("#maxLoad").val(0);
	$("#remainLoad").val(0);
	$("#agentParam").modal('show');
}

function addAgentToDB() {
	$.post("addAgentToPool", {
		hostName : $("#hostName").val(),
		port : $("#port").val(),
		maxLoad : $("#maxLoad").val(),
		remainLoad : $("#remainLoad").val()
	}, function(data) {
		if (data == "success") {
			table.loadTable();
		}
	});
}
