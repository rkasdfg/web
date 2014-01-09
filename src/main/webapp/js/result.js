$("#selecttype").change(function(){
	var test = $("#selecttype").val();
	if(test=="false")
		$("#timediv").hide();
	else
		$("#timediv").show();
});

function createcharts(hostname){
	var host = "#"+hostname;
	var selector;
	selector = host + " .cpuutil";
	initialcharts(selector,"CPU utilization","CPU utilization");
	selector = host + " .cpusystimeper";
	initialcharts(selector,"System time percent","System time percent");
	selector = host + " .cpuusertimeper";
	initialcharts(selector,"User time percent","User time percent");
	selector = host + " .mempage";
	initialcharts(selector,"Paging rate","Paging rate");
	selector = host + " .mempagein";
	initialcharts(selector,"Page in rate","Page in rate");
	selector = host + " .mempageout";
	initialcharts(selector,"Page out rate","Page out rate");
	selector = host + " .memavail";
	initialcharts(selector,"Available memory","Available memory");
	selector = host + " .memusedper";
	initialcharts(selector,"Memory utilization","Memory utilization");
	selector = host + " .memtotal";
	initialcharts(selector,"Total memory","Total memory");
	selector = host + " .diskread";
	initialcharts(selector,"diskReadRate","diskReadRate");
	selector = host + " .diskwrite";
	initialcharts(selector,"diskWriteRate","diskWriteRate");
	selector = host + " .discur";
	initialcharts(selector,"currentDiskQueueLength","currentDiskQueueLength");
	selector = host + " .sent";
	initialcharts(selector,"kiloBytesSentPerSecond(KB/s)","kiloBytesSentPerSecond");
	selector = host + " .received";
	initialcharts(selector,"kiloBytesReceivedPerSecond(KB/s)","kiloBytesReceivedPerSecond");
	selector = host + " .total";
	initialcharts(selector,"kiloBytesTotalPerSecond(KB/s)","kiloBytesTotalPerSecond");
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
		modifiedhost += "history";
			
	
	var start = MyCNLTreeMenu1.AllNodes.length;
	var cpunum;
	$.post("getProcessorStatus",{hosts:host+":5556"},function(data){
		cpunum =  data.processorModelList.length;
		var htmlelement='<li><input class="t" readonly value="'+modifiedhost+'"  /><ul>'+
		'<li><a href="#" ><span class="hidden-tablet">cpu</span></a><ul>';
		for(var i=0; i<cpunum; i++)
			htmlelement += '<li class="Child"><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .cpu'+i+'" href="#">cpu1</a></li>';

			htmlelement += '</ul><li><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .memory" href="#"><span class="hidden-tablet">memory</span></a></li>'+
				'<li><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .disk" href="#"><span class="hidden-tablet">disk</span></a></li>'+	
				'<li><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .network" href="#"><span class="hidden-tablet">network</span></a></li>'+					
				'</ul></li>';
			$(".main-menu").append(htmlelement);
			var MyCNLTreeMenu222 = new ModifyTreeMenu("CNLTreeMenu1", "li");
			MyCNLTreeMenu222.InitCss("Opened", "Closed", "Child", "img/s.gif", start);
			addnewcharts(modifiedhost,cpunum);
			if(type=="true")
				addhostpoints(host,modifiedhost,time);
			else
				addhistorypoints(host,modifiedhost);
		},"json");
	
}

function addnewcharts(host,cpunum)
{
	var chartselement ='<div id="'+host+'" class="host">';
	for(var i=0; i<cpunum; i++)
	{
		chartselement +='<div charttype="snode" class="cpu'+i+'" style="display:none" >'+
		'<div class="cpuutil" style="height: 300px;"></div>'+
		'<div class="cpusystimeper" style="height: 300px;"></div>'+
		'<div class="cpuusertimeper" style="height: 300px;"></div>'+
		'</div>';
	}
	chartselement += '<div charttype="snode" class="memory"  style="display:none">'+
		'<div class="mempage" style="height: 300px;"></div>'+
		'<div class="mempagein" style="height: 300px;"></div>'+
		'<div class="mempageout" style="height: 300px;"></div>'+
		'<div class="memavail" style="height: 300px;"></div>'+
		'<div class="memusedper" style="height: 300px;"></div>'+
		'<div class="memtotal" style="height: 300px;"></div></div>'+
	'<div charttype="snode" class="disk" style="display:none">'+
		'<div class="diskread" style="height: 300px;"></div>'+
		'<div class="diskwrite" style="height: 300px;"></div>'+
		'<div class="discur" style="height: 300px;"></div></div>'+
	'<div charttype="snode" class="network" style="display:none">'+
	'<div class="sent" style="height: 300px;"></div>'+
	'<div class="received" style="height: 300px;"></div>'+
	'<div class="total" style="height: 300px;"></div></div></div>';
	$("#resultcharts").append(chartselement);
	createcharts(host);
}
function selectcharts(chartsclass){
	var addr = chartsclass.attr("chart");
	$("div[charttype='snode']").each(function(){
		$(this).hide();
	});
	var selector = "#"+addr;
	$(selector).show();
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
	host = "#"+host;
	hosts += ":5556";
	$.post("getHistory",{hosts:hosts}, function(data){
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

