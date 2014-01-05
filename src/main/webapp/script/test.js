$(document).ready(function() {
	$('#selectScripts').show();
	loadScript();
	loadProperties();

});
function loadScript() {
	$('#scriptLib').dataTable().fnClearTable();
	var checkbox = "<input type='checkbox' name='choose' />";
	var html = "<a class='btn btn-success' onClick='viewcript(this)'><i class='icon-zoom-in icon-white'></i>View</a>";
	$.post("loadscript", {}, function(data) {
		for ( var i = 0; i < data.length; i++) {
			var time = new Date(data[i].createDateTime);
			time.setTime(data[i].createDateTime);
			$('#scriptLib').dataTable().fnAddData(
					[ checkbox, data[i].name, data[i].id, time,html]);
		}
	}, "json");
}

function submitSelectedScript() {
	var checkbox = document.getElementsByName("choose");
	$('#selectedScripts').dataTable().fnClearTable();
	$("#scriptLib > tbody > tr").each(function(i) {
		if (checkbox[i].checked) {
			var name = $(this).children("td").eq(1).text();
			var ID = $(this).children("td").eq(2).text();
			var date = $(this).children("td").eq(3).text();
			addSelectedScriptTableRow(name, ID, date);
		}
	});

}

function addSelectedScriptTableRow(name, ID, date) {
	var action = "<a class='btn btn-info' href='#' onClick='config(this)'><i class='icon-edit icon-white'></i>Config</a>"
			+ "  "
			+ "<a class='btn btn-danger' href='#' onClick='deletetablerow(this)'><i class='icon-trash icon-white'></i>Delete</a>";
	$('#selectedScripts').dataTable().fnAddData([ name, ID, date, action ]);
}

function next(divHideName, divShowName) {
	$('#' + divHideName).hide();
	$('#' + divShowName).show();
}
function addIP() {
	var ip = $('#inputIP').val();
	if (ip == "") {
		$('#ipNullMessage').html($.i18n.prop('null'));
		$('#ipNullMessage').show();
	} else {
		var ipTableRowCount = 1;
		var ipRepeat = false;
		$("#ipTable> tbody > tr")
				.each(
						function() {
							if (ip == $(this).children("td").eq(1).text()) {
								ipRepeat = true;
								return false;
							} else if ($(this).children("td").eq(0).attr(
									"class") != "dataTables_empty") {
								ipTableRowCount++;
							}
						});

		if (ipRepeat == false) {
			$('#ipNullMessage').hide();
			addIpTableRow(ipTableRowCount, ip);
		} else {
			$('#ipNullMessage').html($.i18n.prop('ipRepeat'));
			$('#ipNullMessage').show();
		}
	}
}
function addIpTableRow(ipTableRowCount, ip) {
	var action = "<a class='btn btn-danger' href='#' onClick='deleteIpTableRow(this)'><i class='icon-trash icon-white'></i>Delete</a>";
	$('#ipTable').dataTable().fnAddData([ ipTableRowCount, ip, action ]);
}
function clearIP() {
	$('#inputIP').val('');
}
var savetablerow;
var ipList=null;

function config(obj) {
	savetablerow = obj.parentNode.parentNode;
	$("#requireLoad").val(0);
	$("#warmup").val(0);
	$("#cooldown").val(0);
	$("#executeRange").val(0);
	$('#configScript').modal('show');
}

function queryscriptbydate() {
	var time = Date.parse("1377171405000");
}

function ScriptModel(ID,load,warmup,cooldown,executeRange){
	

	this.id=ID;
	this.load=load;
	this.warmup=warmup;
	this.executeRange=executeRange;
	this.cooldown=cooldown;
}

function testPlanRequestModel(scriptList,ipList){
	this.scriptList=scriptList;
	this.ipList=ipList;
}

function startTest(){
	
    var scriptList=new Array();
    var ipList;
    ipList=getIpList();
    $("#selectedScripts>tbody > tr").each(function(index) {
		var ID = $(this).children("td").eq(1).html();
		var requiredLoad = $(this).attr("requireLoad");
		var warmup = $(this).attr("warmup");
		var cooldown = $(this).attr("cooldown");
		var executeRange = $(this).attr("executeRange");
		scriptList[index]=new ScriptModel(ID,requiredLoad,warmup,cooldown,executeRange);
	});
    var testPlan =new testPlanRequestModel(scriptList,ipList);
    alert(JSON.stringify(testPlan));
		 $.ajax({ 
	            type:"POST", 
	            url:"runTestPlan", 
	            dataType:"json",      
	            contentType:"application/json",               
	            data:JSON.stringify(testPlan),
	            success:function(data){ 
	            	window.location.replace(data);             
	            } 
	         }); 
}
function startTest_old() {
	var scriptID = null, scriptLoad = null, scriptWarmup = null, scriptCooldown = null, scriptExecuteRange = null;
	ipList=getIpList();
	$("#selectedScripts>tbody > tr").each(function(index) {
		var ID = $(this).children("td").eq(1).html();
		var requireLoad = $(this).attr("requireLoad");
		var warmup = $(this).attr("warmup");
		var cooldown = $(this).attr("cooldown");
		var executeRange = $(this).attr("executeRange");
		if (index == 0) {
			scriptID = ID;
			scriptLoad = requireLoad;
			scriptWarmup = warmup;
			scriptCooldown = cooldown;
			scriptExecuteRange = executeRange;
		} else {

			scriptID = scriptID + "," + ID;
			scriptLoad = scriptLoad + "," + requireLoad;
			scriptWarmup = scriptWarmup + "," + warmup;
			scriptCooldown = scriptCooldown + "," + cooldown;
			scriptExecuteRange = scriptExecuteRange + "," + executeRange;
		}
	});
	if (scriptID == null)
		alert('no script selected');
	else if (scriptLoad == null || scriptWarmup == null
			|| scriptCooldown == null || scriptExecuteRange == null)
		alert('please config the script to test');
	else if (ipList == null)
		alert("please config the sut");
	else {
		$.post("runTestPlan", {
			scriptID : scriptID,
			scriptLoad : scriptLoad,
			scriptWarmup : scriptWarmup,
			scriptCooldown : scriptCooldown,
			scriptExecuteRange : scriptExecuteRange,
			iplist : ipList
		}, function(data) {
			window.location.replace(data);
			// window.open(data);
		});
	}
}

function getIpList(){
	var ipList=new Array();
	$("#ipTable>tbody>tr").each(function(){
		ipList.push($(this).children("td").eq(1).text());
	});
	return ipList;
}
function submitform() {
	savetablerow.setAttribute("requireLoad", $("#requireLoad").val());
	savetablerow.setAttribute("warmup", $("#warmup").val());
	savetablerow.setAttribute("cooldown", $("#cooldown").val());
	savetablerow.setAttribute("executeRange", $("#executeRange").val());
}
function deletetablerow(obj) {
	var row = obj.parentNode.parentNode;
	var table = row.parentNode.parentNode;
	$(table).dataTable().fnDeleteRow(row.rowIndex - 1);
}
function deleteIpTableRow(obj) {
	deletetablerow(obj);
	freshIpTable();
}
function freshIpTable(obj) {
	$("#ipTable> tbody > tr").each(function(i) {
		$(this).children("td").eq(0).text(i + 1);
	});
}