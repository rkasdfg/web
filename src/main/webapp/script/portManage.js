var table;
$(document).ready(function() {
	table = new bench4q.table("Port");
	table.loadTable();
});

function edittablerow(obj) {
	var row = obj.parentNode.parentNode;
	alert(row.rowIndex);
}

function deletetablerow(obj) {
	table.deleteTableRow(obj);
}

function addPort() {
	$("#port").val(0);
	$("#portParam").modal('show');
}

function addPortToDB() {
	$.post("addPortToPool", {
		port : $("#port").val()
	}, function(data) {
		if (data == "success") {
			table.loadTable();
		}
	});
}
