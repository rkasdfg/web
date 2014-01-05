function bench4q() {
};

bench4q.table = function(type) {
	this.type = type;
};

bench4q.table.prototype.loadTable = function() {
	$('#table').dataTable().fnClearTable();
	var _currentInstance = this;
	$.ajax({
		url : "load" + _currentInstance.type + "s",
		type : "GET",
		cache : false,
		dataType : "json",
		success : function(data, status) {
			if (data != null) {
				_currentInstance.showTable(data.list);
			}
		},
		error : function(request, status, error) {
			alert("An error occurred while loading the sut data:" + error);
		}
	});
};

bench4q.table.prototype.showTable = function(objectList) {
	for ( var i = 0; i < objectList.length; i++) {
		this.addTableRow(objectList[i]);
	}
	for (i = 0; i < objectList.length; i++) {
		var node = $('#table >tbody').children("tr").eq(i);
		// 1 is the column of id;
		node.attr("id", node.children("td").eq(1).html());
	}
};

bench4q.table.prototype.addTableRow = function(jsonObject) {
	switch (this.type) {
	case "Agent":
		this.addAgentRow(jsonObject);
		break;
	case "Port":
		this.addPortRow(jsonObject);
		break;
	case "TestPlan":
		this.addTestPlanRow(jsonObject);
		break;
	default:
		break;
	}
};

bench4q.table.prototype.addTestPlanRow = function(jsonObject) {
	var html = "<a class='btn btn-danger' href='#' onClick='deletetablerow(this)'><i class='icon-trash icon-white'></i>Delete</a>"
			+ "<a class='btn btn-success' href='#' onClick='view(this)'><i class='icon-zoom-in icon-white'></i>View</a>"
			+ "<a class='btn btn-info' href='#'   onClick='downloadResult(this)'><i class='icon-edit icon-white'></i>Result</a>";
	// var name = "No Name";
	// if (jsonObject.name != "" || jsonObject.name != null)
	// name = jsonObject.name;
	var time = new Date(jsonObject.createDateTime);
	$('#table').dataTable().fnAddData(
			[ jsonObject.testPlanRunId, jsonObject.id, time, html ]);
};

bench4q.table.prototype.addAgentRow = function(jsonObject) {
	var status = "NA";
	switch (jsonObject.currentStatus) {
	case 1:
		status = "Idle";
		break;
	case 2:
		status = "Running";
		break;
	case 3:
		status = "BackUp";
		break;
	case 4:
		status = "BreakDown";
		break;
	default:
		status = "NA";
		break;
	}
	var html = "<a class='btn btn-info'   onClick='editAgent(this)'><i class='icon-edit icon-white'></i>Edit</a>"
			+ "  "
			+ "<a class='btn btn-danger' href='#' onClick='deletetablerow(this)'><i class='icon-trash icon-white'></i>Delete</a>";
	$('#table').dataTable().fnAddData(
			[ jsonObject.hostName, jsonObject.id, jsonObject.port, status,
					jsonObject.maxLoad, jsonObject.remainLoad, html ]);
};

bench4q.table.prototype.addPortRow = function(jsonObject) {
	if (jsonObject.inUse) {
		status = "InUse";
	} else
		status = "InIdle";
	var html = "<a class='btn btn-info'   onClick='editPort(this)'><i class='icon-edit icon-white'></i>Edit</a>"
			+ "  "
			+ "<a class='btn btn-danger' href='#' onClick='deletetablerow(this)'><i class='icon-trash icon-white'></i>Delete</a>";
	$('#table').dataTable().fnAddData(
			[ jsonObject.port, jsonObject.id, status, html ]);
};

bench4q.table.prototype.deleteTableRow = function(obj) {
	var row = obj.parentNode.parentNode;
	var id = row.childNodes[1].innerHTML;
	$.post("remove" + this.type + "FromPool", {
		id : id,
	});
	$('#table').dataTable().fnDeleteRow(row.rowIndex - 1);
};
