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
	alert("finish");
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
	var modifiedhost = host.replace(/\./g,'_');
	var start = MyCNLTreeMenu1.AllNodes.length;
	var htmlelement='<li><input class="t" readonly value="'+host+'"  /><ul>'+
						'<li><a href="#" ><span class="hidden-tablet">cpu</span></a>'+
						'<ul><li class="Child"><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .cpu0" href="#">cpu1</a></li>'+
						'<li class="Child"><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .cpu1" href="#">cpu2</a></li></ul></li>'+
						'<li><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .memory" href="#"><span class="hidden-tablet">memory</span></a></li>'+
						'<li><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .disk" href="#"><span class="hidden-tablet">disk</span></a></li>'+
							
						'<li><a onclick="selectcharts($(this))" chart="'+modifiedhost+' .network" href="#"><span class="hidden-tablet">network</span></a></li>'+					
					'</ul></li>';
	$(".main-menu").append(htmlelement);
	var MyCNLTreeMenu222 = new ModifyTreeMenu("CNLTreeMenu1", "li");
    MyCNLTreeMenu222.InitCss("Opened", "Closed", "Child", "img/s.gif", start);
    addnewcharts(modifiedhost,2);
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
		'<div class="discur" style="height: 300px;"></div></div></div>';
	$("#resultcharts").append(chartselement);
	createcharts(host);
}


