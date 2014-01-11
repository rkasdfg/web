function additem()
{
	var value = $("#hostselect option:selected").val()+" ."+$("#itemselect option:selected").val()+$("#chartselect option:selected").val();
	var text = $("#hostselect option:selected").text()+"  "+$("#chartselect option:selected").text();
	
	$("#selectresult").append('<option ondblclick="$(this).remove()" value="'+value+'">'+text+'</option>');

}
function deletechart(selector)
{
	var chartselector = '#'+selector.val();
	$(chartselector).remove();
	selector.parent().remove();
}
$("#selectresult  option").dblclick(function(){
	$(this).remove();
});
function submititem()
{
	$("div[charttype='tnode']").each(function(){
		$(this).hide();
	});
	$("#selectresult  option").each(function(){
		var selector = $(this).val();
		$(selector).show();
	});
}
function initcustomizeModal(){
	$("#hostselect").empty();
	$("#itemselect").empty();
	$("#chartselect").empty();
	$(".host").each(function(){
		var value = $(this).attr("id");
		var text = value.replace(/_/g,'\.');
		$("#hostselect").append('<option value="#'+value+'">'+text+'</option>');
		
	});
	changeitemselect();
	$('#customizeModal').modal('show');
}
function changeitemselect(){
	$("#itemselect").empty();
	var selector = $("#hostselect option:selected").val();
	$(selector+" div[charttype='snode']").each(function(){
		var value = $(this).attr("class");
		$("#itemselect").append('<option value="'+value+'">'+value+'</option>');
	});
	
}
$("#hostselect").change(function(){
	$("#itemselect").empty();
	var selector = $("#hostselect option:selected").val();
	$(selector+" div[charttype='snode']").each(function(){
		var value = $(this).attr("class");
		$("#itemselect").append('<option value="'+value+'">'+value+'</option>');
	});
	
});
$("#itemselect").change(function(){
	var value = $("#itemselect option:selected").text();
	if(value.indexOf("cpu")>=0)
	{
		$("#chartselect").empty();
		$("#chartselect").append("<option value=' .cpuutil'>CPU utilization</option>");
		$("#chartselect").append("<option value=' .cpusystimeper'>System time percent</option>");
		$("#chartselect").append("<option value=' .cpuusertimeper'>User time percent</option>");
	}
	else if(value=="memory")
	{
		$("#chartselect").empty();
		$("#chartselect").append("<option value=' .mempage'>Paging rate</option>");
		$("#chartselect").append("<option value=' .mempagein'>Page in rate</option>");
		$("#chartselect").append("<option value=' .mempageout'>Page out rate</option>");
		$("#chartselect").append("<option value=' .memavail'>Available memory</option>");
		$("#chartselect").append("<option value=' .memusedper'>Memory utilization</option>");
		$("#chartselect").append("<option value=' .memtotal'>Total memory</option>");

	}
	else if(value=="disk")
	{
		$("#chartselect").empty();
		$("#chartselect").append("<option value=' .diskread'>diskReadRate</option>");
		$("#chartselect").append("<option value=' .diskwrite'>diskWriteRate</option>");
		$("#chartselect").append("<option value=' .discur'>currentDiskQueueLength</option>");
	}
	else if(value=="network")
	{
		$("#chartselect").empty();
		$("#chartselect").append("<option value=' .sent'>kiloBytesSentPerSecond</option>");
		$("#chartselect").append("<option value=' .received'>kiloBytesReceivedPerSecond</option>");
		$("#chartselect").append("<option value=' .total'>kiloBytesTotalPerSecond</option>");
	}
});

$("#selecttype").change(function(){
	var test = $("#selecttype").val();
	if(test=="false")
	{
		$("#timediv").hide();
		$("#historydiv").show();
	}
	else
	{
		$("#historydiv").hide();
		$("#timediv").show();
	}
});



function createcharts(hostname,type){
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});
	var host = "#"+hostname;
	var selector;
	var modifiedhostname;
	if(type=="true")
		modifiedhostname = hostname.replace(/_/g,'\.');
	else
		modifiedhostname = hostname.replace(/_/g,'\.')+" history";
	selector = host + " .cpuutil";
	initialcharts(selector,modifiedhostname+"CPU utilization(%)","CPU utilization");
	selector = host + " .cpusystimeper";
	initialcharts(selector,modifiedhostname+"System time percent(%)","System time percent");
	selector = host + " .cpuusertimeper";
	initialcharts(selector,modifiedhostname+"User time percent(%)","User time percent");
	selector = host + " .mempage";
	initialcharts(selector,modifiedhostname+"Paging rate","Paging rate");
	selector = host + " .mempagein";
	initialcharts(selector,modifiedhostname+"Page in rate","Page in rate");
	selector = host + " .mempageout";
	initialcharts(selector,modifiedhostname+"Page out rate","Page out rate");
	selector = host + " .memavail";
	initialcharts(selector,modifiedhostname+"Available memory(KB)","Available memory");
	selector = host + " .memusedper";
	initialcharts(selector,modifiedhostname+"Memory utilization(%)","Memory utilization");
	selector = host + " .memtotal";
	initialcharts(selector,modifiedhostname+"Total memory(KB)","Total memory");
	selector = host + " .diskread";
	initialcharts(selector,modifiedhostname+"diskReadRate(KB/s)","diskReadRate");
	selector = host + " .diskwrite";
	initialcharts(selector,modifiedhostname+"diskWriteRate(KB/s)","diskWriteRate");
	selector = host + " .discur";
	initialcharts(selector,modifiedhostname+"currentDiskQueueLength","currentDiskQueueLength");
	selector = host + " .sent";
	initialcharts(selector,modifiedhostname+"kiloBytesSentPerSecond(KB/s)","kiloBytesSentPerSecond");
	selector = host + " .received";
	initialcharts(selector,modifiedhostname+"kiloBytesReceivedPerSecond(KB/s)","kiloBytesReceivedPerSecond");
	selector = host + " .total";
	initialcharts(selector,modifiedhostname+"kiloBytesTotalPerSecond(KB/s)","kiloBytesTotalPerSecond");
}

function initialcharts(selector, datatext, dataname){
		$(selector).each(function(){$(this).highcharts('StockChart', {
		rangeSelector: {
			buttons: [{
				count: 1,
				type: 'minute',
				text: '1M'
			}, {
				count: 5,
				type: 'minute',
				text: '5M'
			}, {
				type: 'all',
				text: 'All'
			}],
			inputEnabled: false,
			selected: 0
		},
		
		title : {
			text : datatext
		},
		
		exporting: {
			enabled: false
		},
		
		series : [{
			name : dataname,
			data : [[0,0]]
		}]
	});	
	});
	
}


function hidecharts()
{
	var selector = '.ip:eq('+0+')';
	$(selector).hide();
	$('.ip:eq(1)').hide();
}
function showcharts()
{
	$('.ip:eq(0)').show();
	$('.ip:eq(1)').show();
}

function addhosthtml(){
	var host = $("#focusedInput").val();
	var time = $("#timeInput").val();
	var type = $("#selecttype").val();
	var modifiedhost = host.replace(/\./g,'_');
	if(type=="false")
	{
		if($("#starttime").val()==""||$("#endtime").val()==""||$("#starttime").val()>$("#endtime").val())
		{
			alert("wrong time!!!");
			return;
		}
		modifiedhost += "history";
	}
			
	
	var start = MyCNLTreeMenu1.AllNodes.length;
	var cpunum;
	$.post("getProcessorStatus",{hosts:host+":5556"},function(data){
		cpunum =  data.processorModelList.length;
		var htmlelement='<li><input class="t treehost" ondblclick="deletechart($(this))" readonly value="'+modifiedhost+'"  /><ul>'+
		'<li><a href="#" ><span class="hidden-tablet">cpu</span></a><ul>';
		for(var i=0; i<cpunum; i++)
			htmlelement += '<li class="Child"><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .cpu'+i+'" href="#">cpu'+i+'</a></li>';

			htmlelement += '</ul><li><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .memory" href="#"><span class="hidden-tablet">memory</span></a></li>'+
				'<li><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .disk" href="#"><span class="hidden-tablet">disk</span></a></li>'+	
				'<li><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .network" href="#"><span class="hidden-tablet">network</span></a></li>'+					
				'</ul></li>';
			$(".main-menu").append(htmlelement);
			var MyCNLTreeMenu222 = new ModifyTreeMenu("CNLTreeMenu1", "li");
			MyCNLTreeMenu222.InitCss("Opened", "Closed", "Child", "img/s.gif", start);
			addnewcharts(modifiedhost,cpunum,type);
			if(type=="true")
				addhostpoints(host,modifiedhost,time);
			else
				addhistorypoints(host,modifiedhost);
		},"json");
	
}

function addnewcharts(host,cpunum,type)
{
	var chartselement ='<div id="'+host+'" class="host">';
	for(var i=0; i<cpunum; i++)
	{
		chartselement +='<div charttype="snode" class="cpu'+i+'" >'+
		'<div charttype="tnode" class="cpuutil" style="height: 300px;"></div>'+
		'<div charttype="tnode" class="cpusystimeper" style="height: 300px;"></div>'+
		'<div charttype="tnode" class="cpuusertimeper" style="height: 300px;"></div>'+
		'</div>';
	}
	chartselement += '<div charttype="snode" class="memory" >'+
		'<div charttype="tnode" class="mempage" style="height: 300px;"></div>'+
		'<div charttype="tnode" class="mempagein" style="height: 300px;"></div>'+
		'<div charttype="tnode" class="mempageout" style="height: 300px;"></div>'+
		'<div charttype="tnode" class="memavail" style="height: 300px;"></div>'+
		'<div charttype="tnode" class="memusedper" style="height: 300px;"></div>'+
		'<div charttype="tnode" class="memtotal" style="height: 300px;"></div></div>'+
	'<div charttype="snode" class="disk">'+
		'<div charttype="tnode" class="diskread" style="height: 300px;"></div>'+
		'<div charttype="tnode" class="diskwrite" style="height: 300px;"></div>'+
		'<div charttype="tnode" class="discur" style="height: 300px;"></div></div>'+
	'<div charttype="snode" class="network">'+
	'<div charttype="tnode" class="sent" style="height: 300px;"></div>'+
	'<div charttype="tnode" class="received" style="height: 300px;"></div>'+
	'<div charttype="tnode" class="total" style="height: 300px;"></div></div></div>';
	$("#resultcharts").append(chartselement);
	$("div[charttype='tnode']").each(function(){
		$(this).hide();
	});
	createcharts(host,type);
}
function selectcharts(chartsclass){
	var addr = chartsclass.attr("chart");
	$("div[charttype='tnode']").each(function(){
		$(this).hide();
	});
	var selector = "#"+addr+" div[charttype='tnode']";
	$(selector).each(function(){
		$(this).show();
	});
}

function addhostpoints(hosts,host,time)
{
	host = "#"+host;
	hosts += ":5556";
	setInterval(function(){
	$.post("getAllStatus",{hosts:hosts}, function(data){
	var cpumodel = data.processorModel.processorModelList;
	var memorymodel = data.memoryModel;
	var physicaldiskmodel = data.physicalDiskModel;
	var networkmodel = data.networkInterfaceModel;
	var x = (new Date()).getTime();
	//cpu
	for(var i=0; i<cpumodel.length; i++)
	{
		
		var selector1 = host+" .cpuutil:eq("+(i)+")";
		var selector2 = host+" .cpusystimeper:eq("+(i)+")";
		var selector3 = host+" .cpuusertimeper:eq("+(i)+")";
		var processorTimePercent = cpumodel[i].processorTimePercent;
		var userTimePercent = cpumodel[i].userTimePercent;
		var privilegedTimePercent = cpumodel[i].privilegedTimePercent;
		$(selector1).highcharts().series[0].addPoint([x, processorTimePercent], true, false);
		$(selector2).highcharts().series[0].addPoint([x, privilegedTimePercent], true, false);
		$(selector3).highcharts().series[0].addPoint([x, userTimePercent], true, false);
	}
	var selector;
	//memory
	selector = host + " .mempage";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.pagesPerSecond], true, false);
	selector = host + " .mempagein";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.pagesInputPerSecond], true, false);
	selector = host + " .mempageout";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.pagesOutputPerSecond], true, false);
	selector = host + " .memavail";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.availableKiloBytes], true, false);
	selector = host + " .memusedper";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.memoryUsedPercent], true, false);
	selector = host + " .memtotal";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.totalKiloBytes], true, false);
	//disk		
	selector = host + " .diskread";
	$(selector).highcharts().series[0].addPoint([x, physicaldiskmodel.diskReadRate], true, false);
	selector = host + " .diskwrite";
	$(selector).highcharts().series[0].addPoint([x, physicaldiskmodel.diskWriteRate], true, false);
	selector = host + " .discur";
	$(selector).highcharts().series[0].addPoint([x, physicaldiskmodel.curDiskQueLength], true, false);
	//network
	selector = host + " .sent";
	$(selector).highcharts().series[0].addPoint([x, networkmodel.kiloBytesSentPerSecond], true, false);
	selector = host + " .received";
	$(selector).highcharts().series[0].addPoint([x, networkmodel.kiloBytesReceivedPerSecond], true, false);
	selector = host + " .total";
	$(selector).highcharts().series[0].addPoint([x, networkmodel.kiloBytesTotalPerSecond], true, false);
	
	
	},"json");
	},1000*time);

	
}


function addhistorypoints(hosts,host)
{
	
	var stdate = $("#starttime").val().replace("T","-");
	stdate = stdate.replace(":","-");
	stdate = stdate+'-00';
	var edate = $("#endtime").val().replace("T","-");
	edate = edate.replace(":","-");
	edate = edate+'-00';

	
	host = "#"+host;
	hosts += ":5556";
	$.post("getHistory",{hosts:hosts,starttime:stdate,endtime:edate}, function(data){
	if($.isEmptyObject(data))
	{
		alert("no histroy");
		return;
	}
	for(var j=0; j<data.length; j++)
	{	
	var cpumodel = data[j].processorModel.processorModelList;
	var memorymodel = data[j].memoryModel;
	var physicaldiskmodel = data[j].physicalDiskModel;
	var networkmodel = data[j].networkInterfaceModel;
	var strdate = data[j].date.split("-");
	var date = new Date(strdate[0],(strdate[1]-parseInt(1)),strdate[2],strdate[3],strdate[4],strdate[5]);
	
	var x = date.getTime();
	//cpu
	for(var i=0; i<cpumodel.length; i++)
	{
		
		var selector1 = host+" .cpuutil:eq("+(i)+")";
		var selector2 = host+" .cpusystimeper:eq("+(i)+")";
		var selector3 = host+" .cpuusertimeper:eq("+(i)+")";
		var processorTimePercent = cpumodel[i].processorTimePercent;
		var userTimePercent = cpumodel[i].userTimePercent;
		var privilegedTimePercent = cpumodel[i].privilegedTimePercent;
		$(selector1).highcharts().series[0].addPoint([x, processorTimePercent], true, false);
		$(selector2).highcharts().series[0].addPoint([x, privilegedTimePercent], true, false);
		$(selector3).highcharts().series[0].addPoint([x, userTimePercent], true, false);
	}
	var selector;
	//memory
	selector = host + " .mempage";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.pagesPerSecond], true, false);
	selector = host + " .mempagein";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.pagesInputPerSecond], true, false);
	selector = host + " .mempageout";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.pagesOutputPerSecond], true, false);
	selector = host + " .memavail";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.availableKiloBytes], true, false);
	selector = host + " .memusedper";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.memoryUsedPercent], true, false);
	selector = host + " .memtotal";
	$(selector).highcharts().series[0].addPoint([x, memorymodel.totalKiloBytes], true, false);
	//disk		
	selector = host + " .diskread";
	$(selector).highcharts().series[0].addPoint([x, physicaldiskmodel.diskReadRate], true, false);
	selector = host + " .diskwrite";
	$(selector).highcharts().series[0].addPoint([x, physicaldiskmodel.diskWriteRate], true, false);
	selector = host + " .discur";
	$(selector).highcharts().series[0].addPoint([x, physicaldiskmodel.curDiskQueLength], true, false);
	//network
	selector = host + " .sent";
	$(selector).highcharts().series[0].addPoint([x, networkmodel.kiloBytesSentPerSecond], true, false);
	selector = host + " .received";
	$(selector).highcharts().series[0].addPoint([x, networkmodel.kiloBytesReceivedPerSecond], true, false);
	selector = host + " .total";
	$(selector).highcharts().series[0].addPoint([x, networkmodel.kiloBytesTotalPerSecond], true, false);
	
	}
	
	},"json");


	
}

