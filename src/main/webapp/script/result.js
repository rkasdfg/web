$(document)
		.ready(
				function() {
					$("#testresult").treeview({});
					var scriptId;
					var scriptName;
					var ip;
					$
							.ajax({
								url : "getRunningInfo",
								type : "GET",
								cache : false,
								dataType : "json",
								success : function(data, status) {
									if (data != null) {
										scripts = data.scriptIndexModels;
										monitor = data.monitorModels;
										for ( var i = 0; i < scripts.length; i++) {
											scriptId = scripts[i].scriptId;
											scriptName = scripts[i].scriptName;
											addNodeToTree(scriptName,
													scriptName, "scripts");
											addContainer(scriptName);
											addContainer("Agent_"+scriptName);
											
										}
										for (i = 0; i < monitor.length; i++) {
											ip = monitor[i].hostName;
											port = monitor[i].port;
											sut_processorList[i] = getProcessorList(
													ip, port);
											sut_networkList[i]=getNetworkList(ip,port);
											var ip_change = changeIp(ip);
											addNodeToTree(ip_change, ip, "sut");
											for ( var j = 0; j < sut_processorList[i].length; j++) {
												addContainer(ip_change
														+ "cpu_"
														+ sut_processorList[i][j].instance);
											}
											addContainer(ip_change + "memory_");
											for ( var j = 0; j < sut_networkList[i].length; j++) {
												addContainer(ip_change
														+ "net_"
														+ j);
											}
										}
										for ( var i = 0; i < scripts.length; i++) {
											scriptId = scripts[i].scriptId;
											scriptName = scripts[i].scriptName;
											new Highcharts.Chart(
													getChartOptions("","Agent_"+scriptName,
															
															"Load"));
											new Highcharts.Chart(
													getChartOptions(scriptId,
															scriptName,
															"averageResponseTime"));
										}
										for ( var i = 0; i < monitor.length; i++) {
											ip = monitor[i].hostName;
											var ip_change = changeIp(ip);
											
											for (var j = 0; j < sut_processorList[i].length; j++) {
												new Highcharts.Chart(
														getChartOptions(
																monitor[i],
																ip_change
																		+ "cpu_"
																		+ sut_processorList[i][j].instance,
																sut_processorList[i][j].instance
																		+ ":processorTimePercent"));
											}
											new Highcharts.Chart(
													getChartOptions(
															monitor[i],
															ip_change
																	+ "memory_"
																	,
																	"availableKiloBytes"));
											for (var j = 0; j < sut_networkList[i].length; j++) {
												new Highcharts.Chart(
														getChartOptions(
																monitor[i],
																ip_change
																		+ "net_"
																		+ j,
																sut_networkList[i][j].instance
																		+ " bytesTotalPerSecond"));
											}
										}
									}

								},
								error : function(request, status, error) {
									/*alert("An error occurred while loading the sut data:"
											+ error);*/
								}
							});
				});

var scripts;
var monitor;
var finish_all = false;
var scriptFinishCount = 0;
var sut_processorList = [];
var sut_networkList=[];
function addNodeToTree(name, name_show, treeNode) {
	var branches;
	branches = $(
		//	"<ul id='"+name+"' ><li><span  onClick='scriptClick(this)'  name=" + name + ">"
		//			+ name_show + "</span></li></ul>").appendTo("#" + treeNode);

			"<li><span  onClick='scriptClick(this)'  name=" + name + ">"
					+ name_show + "</span></li>").appendTo("#" + treeNode);
			$("#" + treeNode).treeview({
		add : branches
	});
}

function scriptClick(obj) {
	var chartName = obj.getAttribute("name");
	for ( var i = 0; i < scripts.length; i++) {
		var chart = scripts[i].scriptName;
		if (chart == chartName) {
			$('#' + chartName).show();
			$('#text' + chartName).show();
			$('#Agent_'+chartName).show();
		} else {
			$('#' + chart).hide();
			$('#text' + chart).hide();
			$('#Agent_'+chart).hide();
		}
	}
	for ( var i = 0; i < monitor.length; i++) {

		var ip = monitor[i].hostName;
		ip = changeIp(ip);
		if (ip == chartName) {
			for ( var j = 0; j < sut_processorList[i].length; j++) {
				var chart = ip;
				chart = chart + "cpu_" + sut_processorList[i][j].instance;
				$('#' + chart).show();
				$('#text' + chart).show();
			}
			for ( var j = 0; j < sut_networkList[i].length; j++) {
				var chart = ip;
				chart = chart + "net_" +j ;
				$('#' + chart).show();
				$('#text' + chart).show();
			}
			
			var chart=ip+"memory_";
			$('#' + chart).show();
			$('#text' + chart).show();
		} else {
			for ( var j = 0; j < sut_processorList[i].length; j++) {
				var chart = ip;
				chart = chart + "cpu_" + sut_processorList[i][j].instance;
				$('#' + chart).hide();
				$('#text' + chart).hide();
			}
			for ( var j = 0; j < sut_networkList[i].length; j++) {
				var chart = ip;
				chart = chart + "net_" +j;
				$('#' + chart).hide();
				$('#text' + chart).hide();
			}
			var chart=ip+"memory_";
			$('#' + chart).hide();
			$('#text' + chart).hide();
			}
	}

}
function changeIp(ip)
{       
	var ipChange=ip;
	for(var i=0;i<3;i++){
		 ipChange=ipChange.replace(".","_");
	}
	return ipChange;
}  
function getProcessorList(ip, port) {

	var processorList = null;
	$.ajax({
		url : "getProcessorStatus",
		data : "ip=" + ip + "&port=" + port,
		type : "GET",
		async : false,
		cache : false,
		dataType : "json",
		success : function(data, status) {
			processorList = data.processorModelList;
		},
		error : function(request, status, error) {
			/*alert("get the info about the instance of processor is wrong:"
					+ error);*/
		}
	});
	return processorList;
}
function getNetworkList(ip, port) {

	var networkList = null;
	$.ajax({
		url : "getNetworkStatus",
		data : "ip=" + ip + "&port=" + port,
		type : "GET",
		async : false,
		cache : false,
		dataType : "json",
		success : function(data, status) {
			networkList = data.networkList;
		},
		error : function(request, status, error) {
			/*alert("get the info about the instance of processor is wrong:"
					+ error);*/
		}
	});
	return networkList;
}
function getChartOptions(params, containerName, title) {
	var options = {
		chart : {
			renderTo : containerName,
			type : 'spline',
			animation : Highcharts.svg, // don't nimate in old // IE
			marginRight : 10,
			events : {
				load : function() {
					var series = this.series[0];
					if (containerName.indexOf("_") < 0) {
						scriptLoadFunction(params, containerName, series);
					} else if(containerName.indexOf("cpu")>0){
						processorLoadFunction(params, containerName, series);
					}
					else if(containerName.indexOf("net")>0){
						networkLoadFunction(params, containerName, series);
					}
					else if(containerName.indexOf("mem")>0){
						memoryLoadFunction(params, containerName, series);
					}
					else if(containerName.indexOf("Agent">0)){
						agentLoadFunction(series);
					}
				}// load function
			}
		// load
		},// chart
		title : {
			text : title
		},
		xAxis : {
			type : 'datetime',
			tickPixelInterval : 150
		},
		yAxis : {
			title : {
				text : title
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>'
						+ Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)
						+ '<br/>' + Highcharts.numberFormat(this.y, 2);
			}
		},
		legend : {
			enabled : true
		},
		exporting : {
			enabled : false
		},
		series : [ {
			name : title,
			data : [ {
				color : "#00FF00",
				x : (new Date()).getTime(),
				y : 0
			} ]
		} ]
	};
	return options;
}

function scriptLoadFunction(scriptId, containerName, series) {
	var finish = false;
	var intervalId = null;
	intervalId = setInterval(function() {
		$.ajax({
			url : "getScriptBriefStatus",
			data : "scriptID=" + scriptId,
			type : "GET",
			cache : false,
			dataType : "json",
			success : function(data, status) {
				// alter(data);
				if (data != null) {
					finish = data.finished;
					var x = (new Date()).getTime(); // current time
					var y = parseFloat(data.averageResponseTime);
					series.addPoint([ x, y ], true, false);
					outputSciptBrief(containerName, data);
					if (finish == true) {
						clearInterval(intervalId);
						scriptFinishCount++;
						if (scriptFinishCount == scripts.length)
							finish_all = true;
					}
				}
			},
			error : function(request, status, error) {
			/*	alert("An error occurred while loading the script data:"
						+ error);*/
			}
		});
	}, 2000);
}


function processorLoadFunction(params, containerName, series) {

	var intervalId = null;
	 intervalId = setInterval(function() {
		$.ajax({
			url : "getProcessorStatus",
			data : "ip=" + params.hostName + "&port=" + params.port,
			type : "GET",
			cache : false,
			dataType : "json",
			success : function(data, status) {
			
				for ( var i = 0; i <  data.processorModelList.length; i++) {
					var processorModelChild =  data.processorModelList[i];
					
					if(containerName.indexOf(processorModelChild.instance)>0){
					var x = (new Date()).getTime(); // current time
					var y = processorModelChild.processorTimePercent;
					series.addPoint([ x, y ], true, false);
					outputProcessorBrief(containerName,  processorModelChild);
					}
				}
				if (finish_all == true)
					clearInterval(intervalId);
			},
			error : function(request, status, error) {
				//alert("An error occurred while loading the processor data:" + error);
			}
		});
	}

	, 2000);
}


function networkLoadFunction(params, containerName, series){
	var intervalId = setInterval(function() {
		$.ajax({
			url : "getNetworkStatus",
			data : "ip=" + params.hostName + "&port=" + params.port,
			type : "GET",
			cache : false,
			dataType : "json",
			success : function(data, status) {
				// alter(data)
				for ( var i = 0; i < data.networkList.length; i++) {
					var networkModelChild=data.networkList[i];
					
					var x = (new Date()).getTime(); // current time
					var y =  data.networkList[i].bytesTotalPerSecond;
					series.addPoint([ x, y ], true, false);
					outputNetworkBrief(containerName, networkModelChild);
					
				}
				if (finish_all == true)
					clearInterval(intervalId);
			},
			error : function(request, status, error) {
				//alert("An error occurred while loading the network data:" + error);
			}
		});
	}

	, 2000);
}

function memoryLoadFunction(params, containerName, series){
	var intervalId = setInterval(function() {
		$.ajax({
			url : "getMemoryStatus",
			data : "ip=" + params.hostName + "&port=" + params.port,
			type : "GET",
			cache : false,
			dataType : "json",
			success : function(data, status) {
					var x = (new Date()).getTime(); // current time
					var y =data.availableKiloBytes;
					series.addPoint([ x, y ], true, false);
					outputMemoryBrief(containerName, data);
				if (finish_all == true)
					clearInterval(intervalId);
			},
			error : function(request, status, error) {
				//alert("An error occurred while loading the memory data:" + error);
			}
		});
	}

	, 2000);
}

function agentLoadFunction(series){
var count=0;
var data=new Array(5000,5000,5000,5000,5000,5000,5000,5000,5000,2500, 
		2500,2500,2500,2500,2500,2500,2500,5000,5000,5000,
		5000,5000,5000,5000,5000,5000,5000,5000,5000,5000,0);

 var intervalId=setInterval(function(){
		var x = (new Date()).getTime(); 
		var y =data[count];
		series.addPoint([ x, y ], true, false);
		count++;
		if (count==31)
			clearInterval(intervalId);
 },2000);	
}


function outputSciptBrief(containerName, jsonObject) {
	var scriptBrief = "";

	scriptBrief = "averageElapsedTime: " + jsonObject.averageElapsedTime
			+ "<br/>" + "runningTime:" + jsonObject.runningTime + "<br/>"
			+ "totalFailCount:" + jsonObject.totalFailCount + "<br/>"
			+ "totalFinishedCount:" + jsonObject.totalFinishedCount + "<br/>"
			+ "totalSuccessCount: " + jsonObject.totalSuccessCount + "<br/>";

	$('#text' + containerName).html(scriptBrief);
}

function outputProcessorBrief(containerName, jsonObject) {

	var processorBrief = "";
	processorBrief = "userTimePercent: " +Highcharts.numberFormat( jsonObject.userTimePercent,2)+ "<br/>"
			+ "privilegedTimePercent:" +Highcharts.numberFormat( jsonObject.privilegedTimePercent,2)
			+ "<br/>";
	$('#text' + containerName).html(processorBrief);
}

function outputMemoryBrief(containerName, jsonObject) {
	var memoryBrief = "";
	memoryBrief = "pagesInputPerSecond: " + jsonObject.pagesInputPerSecond
			+ "<br/>" + "pagesOutputPerSecond:"
			+ Highcharts.numberFormat(jsonObject.pagesOutputPerSecond,2) + "<br/>" + "cacheBytes:"
			+ jsonObject.cacheBytes + "<br/>" + "committedBytes:"
			+ jsonObject.committedBytes + "<br/>" + "pagesPerSecond:"
			+ jsonObject.pagesPerSecond + "<br/>";
	$('#text' + containerName).html(memoryBrief);
}

function outputNetworkBrief(containerName, jsonObject) {
	var networkBrief = "";
	networkBrief = "bytesReceivedPerSecond: " + Highcharts.numberFormat(jsonObject.bytesReceivedPerSecond,2)
			+ "<br/>" + "bytesSentPerSecond:"
			+ Highcharts.numberFormat(jsonObject.bytesSentPerSecond, 2) + "<br/>";
	$('#text' + containerName).html(networkBrief);
}
function addContainer(containerName) {
	var html = "<div class='div-left' id=" + containerName
			+ " style='width: 600px; height: 300px;display:none'></div>"
			+ "<div class='div-right' ><div class='dataText' id=" + "text"
			+ containerName + "  style='display:none'></div></div>"
			+ "<div style='clear:both;'></div>";
	$("#container").html($("#container").html() + html);
}