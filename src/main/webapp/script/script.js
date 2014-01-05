var port;
$('.btn-setting').click(function(e){
	e.preventDefault();
	$('#myModal').modal('show');
});
function startserver() {
	$
			.post(
					"startrecordserver",
					{},
					function(data) {
						document.getElementById("scriptinfo").innerHTML = "Please use the proxy with the IP '133.133.12.1' and the port "
								+ data + " to record the script.";
						port=data;
					});
}
function stopserver() {
	$
			.post(
					"stoprecordserver",
					{port:port},
					function(data) {
						$('#scriptdiv').show();
						document.getElementById("scriptinfo").innerHTML = "The script recording has been stopped, please inpurt the script name and save it";
					});
}

function savescript() {
	var scriptName = document.getElementsByName("scriptname")[0].value;
	$.post("saveScriptToDB", {
		scriptName : scriptName,
		port:port
	}, function(data) {
		document.getElementById("scriptinfo").innerHTML = "Saving success!";
		$('#scriptdiv').hide();
		loadscript();
	});
}

function loadscript() {
	$('#scripttab').dataTable().fnClearTable();
	$.post("loadscript", {}, function(data) {
	
		for ( var i = 0; i < data.length; i++) {
			var time = new Date(data[i].createDateTime);
			time.setTime(data[i].createDateTime);
			addtablerow(data[i].name, data[i].id, time);
			$('#scripttab >tbody').children("tr").eq(i).attr("id",
					data[i].id);
			$('#scripttab >tbody').children("tr").eq(i).attr("name",
					data[i].name);
		}
	},"json");

}

function editscript(obj) {
	var row = obj.parentNode.parentNode;
	var scriptName = $('#scripttab>tbody').children("tr").eq(row.rowIndex - 1)
			.children("td").eq(0).text();
	var scriptId = $('#scripttab>tbody').children("tr").eq(row.rowIndex - 1)
			.children("td").eq(1).text();
	window.open("scriptedit.jsp?name=" + scriptName + "&scriptId=" + scriptId);
}
function viewcript(obj) {
	var row = obj.parentNode.parentNode;
	var scriptName = $('#scripttab>tbody').children("tr").eq(row.rowIndex - 1)
			.children("td").eq(0).text();
	var scriptId = $('#scripttab>tbody').children("tr").eq(row.rowIndex - 1)
			.children("td").eq(1).text();

	window.open("scriptview.jsp?name=" + scriptName + "&scriptId=" + scriptId);
}

function deletetablerow(obj) {
	var row = obj.parentNode.parentNode;
	var scriptId = $('#scripttab>tbody').children("tr").eq(row.rowIndex - 1)
		.children("td").eq(1).text();
	$.post("deletescript", {
		scriptId : scriptId
	});
	$('#scripttab').dataTable().fnDeleteRow(row.rowIndex - 1);

}

function addtablerow(name, ID, data) {
	var html = "<a class='btn btn-success' onClick='viewcript(this)'><i class='icon-zoom-in icon-white'></i>View</a>"
			+ "  "
			+ "<a class='btn btn-info'   onClick='editscript(this)'><i class='icon-edit icon-white'></i>Edit</a>"
			+ "  "
			+ "<a class='btn btn-danger' href='#' onClick='deletetablerow(this)'><i class='icon-trash icon-white'></i>Delete</a>";
	$('#scripttab').dataTable().fnAddData([ name, ID, data, html ]);
}

$(document).ready(function() {
	loadscript();
});