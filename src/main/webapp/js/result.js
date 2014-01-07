
function initialcharts(){
		$('.ipcontainer').each(function(){$(this).highcharts('StockChart', {
		chart : {
			events : {
				load : function() {

					// set up the updating of the chart each second
					var series = this.series[0];
					setInterval(function() {
						var x = (new Date()).getTime(), // current time
						y;

						$.post("getMemoryStatus",{}, y = function(data){
							//series.addPoint([x, m], true, true);
							return data.pagesPerSecond;
						},"json");
						y = Math.round(Math.random() * 100);
						series.addPoint([x, y], true, true);
					}, 1000);
				}
			}
		},
		
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
			text : 'Live random data'
		},
		
		exporting: {
			enabled: false
		},
		
		series : [{
			name : 'Random data',
			data : (function() {
				// generate an array of random data
				var data = [], time = (new Date()).getTime(), i;

				for( i = -9; i <= 0; i++) {
					data.push([
						time + i * 1000,
						0
					]);
				}
				return data;
			})()
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
function addhost(){
	var start = MyCNLTreeMenu1.AllNodes.length;
	var htmlelement='<li><input class="t" readonly value="ip2"  /><ul>'+
						'<li><a href="#"><span class="hidden-tablet">cpu</span></a></li>'+
		
						'<li><a  href="#"><span class="hidden-tablet">memory</span></a>'+
						'<li><a href="#"><span class="hidden-tablet">disk</span></a>'+
							'<ul><li class="Child"><a href="#">disk1</a></li><li class="Child"><a href="#">disk2</a></li></ul></li>'+
						'<li><a href="#"><span class="hidden-tablet">network</span></a></li>'+					
					'</ul></li>';
	$(".main-menu").append(htmlelement);
	var MyCNLTreeMenu222 = new ModifyTreeMenu("CNLTreeMenu1", "li");
    MyCNLTreeMenu222.InitCss("Opened", "Closed", "Child", "img/s.gif", start);
}
