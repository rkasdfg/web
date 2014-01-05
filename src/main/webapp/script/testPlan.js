$(document).ready(function() {
	loadTestPlans();
});

function loadTestPlans() {
	table = new bench4q.table("TestPlan");
	table.loadTable();
}

function deletetablerow(obj) {
	table.deleteTableRow(obj);
}

function downloadResult(obj) {
	var row = obj.parentNode.parentNode;
//	$.ajax({
//		url : "downloadReport",
//		data : "testPlanID=" + row.childNodes[0].innerHTML,
//		type : "GET",
//		cache : false,
//		dataType : "json",
//		success : function(data, status) {
//			if (data != null) {
//			}
//		},
//		error : function(request, status, error) {
//			alert("An error occurred while loading the script data:" + error);
//		}
//	});
	var form=$("<form>");//定义一个form表单
	form.attr("style","display:none");
	form.attr("method","post");
	form.attr("action","downloadReport");
	var input1=$("<input>");
	input1.attr("type","hidden");
	input1.attr("name","testPlanID");
	input1.attr("value",row.childNodes[0].innerHTML);
	$("body").append(form);//将表单放置在web中
	form.append(input1);
	form.submit();
}