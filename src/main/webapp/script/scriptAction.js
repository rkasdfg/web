function viewcript(obj) {
	var row = obj.parentNode.parentNode;
	var scriptName = $('#scripttab>tbody').children("tr").eq(row.rowIndex - 1)
			.children("td").eq(0).text();
	var scriptId = $('#scripttab>tbody').children("tr").eq(row.rowIndex - 1)
			.children("td").eq(1).text();

	window.open("scriptview.jsp?name=" + scriptName + "&scriptId=" + scriptId);
}
