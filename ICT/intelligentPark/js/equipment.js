;
(function(factory) {
	factory(jQuery, window, document);
}(function($, window, document) {

	$(function() {
		funOp.init();
	});

	var funOp = {

		init: function() {
			origin = window.location.origin;
			scale = document.body.clientHeight / 1080;
			scaleW = document.body.clientWidth / 1920;
			mapName = '';
			timer = 0;
			mapIconData = {
				showIcon: "",
				iconData: {}
			};
			equipdata = {};
			funOp.eventInit();
			funOp.dataInit();
		},
		chart: {},
		//事件绑定初始化
		eventInit: function() {
			$('.con-right-box-list').click(function() {
				var imgSrc = $(this).next('.dropDown').find(".dataTables_wrapper .dropDownTable").attr("id");
				//				console.log($(this).find(".dropDownTable"));
				$('.equipmentDetail').hide();
				if($(this).next('.dropDown').css('display') == 'none') {
					$(this).next('.dropDown').show();
					$(this).next().next('.titleShow').hide();
				} else {
					$(this).next('.dropDown').hide();
				}
				var name = $(this).attr('data')
				if(mapName == name) {} else {
					funOp.resetMap(name);
				}

				if(name == '智能电梯') {
					//					$('.equipmentDetail').removeClass('equipmentDetailImport');
					$('#detailVideo').hide();
					$('#detailImg').show();
					$('#detailImg').find("img").attr("src", "../img/static/image/equip/B4dianti011.png");
					$('#detailText').show();
					$('#environmentText').hide();
				} else if(name == '环境监测') {
					//					$('.equipmentDetail').addClass('equipmentDetailImport');
					$('#detailVideo').hide();
					$('#detailImg').show();
					$('#detailImg').find("img").attr("src", "../img/equip/" + imgSrc + ".jpg");
					$('#detailText').hide();
					$('#environmentText').show();
				} else {
					//					$('.equipmentDetail').addClass('equipmentDetailImport');
					$('#detailVideo').hide();
					$('#detailImg').show();
					$('#detailImg').find("img").attr("src", "../img/equip/" + imgSrc + ".jpg");
					$('#detailText').show();
					$('#environmentText').hide();
				}
				mapName = name;
			}).hover(function() {
				var self = this;
				timer = setTimeout(function() {
					timer = 0;
					if($(self).next('.dropDown').css('display') == 'none') {
						$(self).next().next('.titleShow').show();
					}
				}, 2000);
			}, function() {
				if(timer) {
					clearTimeout(timer);
					timer = 0;
					return;
				}
			}).mouseleave(function(e) {
				$(this).next().next('.titleShow').hide();
			});

			$('.leftMap').click(function() {
				if($('.equipmentDetail').css('display') == 'none') {
					$('.equipmentDetail').show();
				} else {
					$('.equipmentDetail').hide();
				}
			});

			$('.preButton').click(function() {
				var name = $('.myCharts').last().attr('name');
				$(".myCharts").first().before($(".myCharts").last().prop("outerHTML"));
				$(".myCharts").last().remove();
				if(funOp.chart[name]) {
					funOp.chart[name][0].dispose();
					mychart1 = funOp.chart[name][0] = echarts.init(document.getElementById(name));
					mychart1.setOption(funOp.chart[name][1], true);
				}
			});
			$('.nextButton').click(function() {
				var name = $('.myCharts').first().attr('name');
				$(".myCharts").last().after($(".myCharts").first().prop("outerHTML"));
				$(".myCharts").first().remove();
				if(funOp.chart[name]) {
					funOp.chart[name][0].dispose();
					mychart1 = funOp.chart[name][0] = echarts.init(document.getElementById(name));
					mychart1.setOption(funOp.chart[name][1], true);
				}
			});

			$('.tableChangeYe').click(function() {
				$('.ye').show();
				$('.zhuo').hide();
				$('#riverTitle').find('span').html('液位监测统计');
				funOp.chart5(equipdata["river"]["data"]["turbidity"], equipdata["river"]["data"]["level"], "level");
			});
			$('.tableChangeZhuo').click(function() {
				$('.ye').hide();
				$('.zhuo').show();
				$('#riverTitle').find('span').html('水浊度监测统计');
				funOp.chart5(equipdata["river"]["data"]["turbidity"], equipdata["river"]["data"]["level"], "turbidity");
			});

			window.onmessage = function(e) {

				if(e.data == "") {
					return;
				}
				var data = e.data;
				var name;
				var id;
				for(var key in data) {
					name = key;
					id = data[key][0].id
					break;
				}
				// console.log(name)
				$('.equipmentDetail').show();
				$('.detailTitle').find('span').html(name)

				var res = '';
				$('.dropDownTable').find('tr').css('background', '')
				$('.dropDownTable').find('td').each(function() {
					if($(this).html() == id) {
						var alarm = $(this).parent().find('.alarmMessage').html();
						var status = $(this).parent().find('.status').html();
						$('.equipmentDetail').find('.address').html($(this).parent().find('.address').html());
						$('.equipmentDetail').find('.reportTime').html('');
						$('.equipmentDetail').find('.detailLeftLong').html('')
						if(status != '正常') {
							$('.equipmentDetail').find('.reportTime').html($(this).parent().find('.reportTime').html());
							if(alarm != 'undefined') {
								$('.equipmentDetail').find('.detailLeftLong').html(alarm)
							} else {
								$('.equipmentDetail').find('.detailLeftLong').html('')
							}
						}
						if(status == '正常') {
							res = '<img src="../img/icon/icon-equipment-list-green.png"/>&nbsp;&nbsp;正常</span>'
						} else if(status == '报警') {
							res = '<img src="../img/icon/icon-equipment-list-yellow.png"/>&nbsp;&nbsp;报警</span>'
						} else if(status == '失联') {
							res = '<img src="../img/icon/icon-equipment-list-yellow.png"/>&nbsp;&nbsp;失联</span>'
						}

						$(this).parent().css('background', 'rgba(54, 140, 255, 0.2)')
					}
				})
				$('.detailStatus').find('span').html(res)
			};

			$('#detailVideo').hide();
			$('#detailImg').show();
			$('#detailImg').find("img").attr("src", "../img/static/image/equip/B4dianti011.png");

			//关闭详情
			$("body").on("click", ".btn-close", function(e) {
				$(this).parent().hide();
			});
		},

		dataInit: function() {
			//设备index
			$.getJSON("../data/equipStatic.json", function(data){
				var equipdatastr = JSON.stringify(data);
				equipdata = JSON.parse(equipdatastr);
				funOp.setEquipmentNum(data['index']['data']['all'], data['index']['data']['warnStatus']);
				funOp.setEquipmentWarn(data['index']['data']['warnStatus']);
				//烟感柱状图
				//烟感面积图
				funOp.chart1(data['smokeDetector']['data']['building']);
				funOp.chart2(data['smokeDetector']['data']["floor"]);
				//烟感折线图
				funOp.chart3(data['getSmokePoint']['data']);
				//河道监测折线图
				funOp.chart5(data['river']['data']['turbidity'], data['river']['data']['level'], 'level');
				//环境监测柱状图
				//环境监测折线图
				funOp.chart8(data["envirMonitor"]["data"]["pm2.5"], data["envirMonitor"]["data"]["pm10"]);
				funOp.chart9(data["envirMonitor"]["data"]["weather"]);
				//环境监测弹框PM2.5/PM10
				funOp.setEnvironmentNum(data["shEnvirMonitor"]["data"][0]);
				//智能垃圾桶柱状图
				//智能垃圾桶折线图
				funOp.chart10(data["trash"]["data"]["countByDate"]);
				funOp.chart11(data["trash"]["data"]["countByTime"]);
				//古树名木柱状图
				funOp.chart12(data["tree"]["data"]["contentWater"], data["tree"]["data"]["temperature"]);
				//监控日志
				var tableName = ['elevator', 'smoke', 'hydrant', 'electricalFire', 'riverWaterLevel', 'manholeCover', 'trash', 'riverTurbidity', 'treeWood', 'environment', 'buildingWaterLevel', 'parkWaterLevel'];
				var iconName = ['智能电梯', '智能烟感', '智能消防栓', '电气灭弧', '河道无线液位', '智能井盖开关', '智能垃圾桶', '', '古树名木', '环境监测', '污水房', '地下车库'];
				$.each(tableName, function(i, n) {
					funOp.getLog(equipdata[n+"Log"]["data"], n, iconName[i]);
				});
			});
			
			funOp.setMap('智能电梯');
		},

		//烟感柱状图
		chart1: function(data) {
			var date_B3 = [];
			var date_B4 = [];
			var date = [];
			var num = 0;
			$.each(data, function(key, val) {
				$.each(val.data, function(key, val) {
					if(val.name == 'B3') {
						date_B3.push(Number(val.smoke).toFixed(5));
					} else if(val.name == 'B4') {
						date_B4.push(Number(val.smoke).toFixed(5));
					}
				});
				date.push($.fn.commUtil.getWeek(val.date))
				num++;
				if(num > 6) {
					return false
				}
			});
			date = date.reverse();
			date_B3 = date_B3.reverse();
			date_B4 = date_B4.reverse();
			var mychart1 = echarts.init(document.getElementById('yanganBar'));
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {
					itemWidth: scale * 14,
					itemHeight: scale * 5,
					data: ['B3楼', 'B4楼'],
					textStyle: {
						color: '#95BBC1'
					}
				},
				grid: {
					left: '5%',
					right: '5%',
					bottom: '4%',
					top: '13%',
					containLabel: true
				},
				xAxis: {
					type: 'value',
					max: 0.2,
					axisLabel: {
						show: false,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: false,
					},
					splitLine: {
						show: false
					}
					// boundaryGap: [0, 0.01]
				},
				yAxis: {
					type: 'category',
					data: date,
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: false,
					},
					splitLine: {
						show: false
					}
				},
				series: [{
						name: 'B3楼',
						type: 'bar',
						barWidth: 4,
						data: date_B3,
						itemStyle: {
							normal: {
								color: '#09B1FF'
							}
						},
					},
					{
						name: 'B4楼',
						type: 'bar',
						barWidth: 4,
						data: date_B4,
						itemStyle: {
							normal: {
								color: '#086882'
							}
						},
					}
				]
			};
			mychart1.clear();
			mychart1.setOption(option, true);
			funOp.chart["yanganBar"] = [mychart1, option];
		},
		//烟感面积图
		chart2: function(data) {
			var date = [];
			var legend = [];
			var series_data = [];
			$.each(data[0].data, function(key, val) {
				// if(val.name != '防洪防台物资仓库'){
				legend.push(val.name)
				// }
			})
			$.each(data, function(key, val) {
				date.push($.fn.commUtil.getWeek(val.date));
				series_data[key] = new Array();
				$.each(val.data, function(index, val) {
					// if(val.name != '防洪防台物资仓库'){
					series_data[key][index] = val.smoke;
					// }
				})
			});
			legend.reverse()
			series_data.reverse()
			var series = [];
			var color = ['#02293F', '#02354C', '#034359', '#044C60', '#06596D', '#076372', '#0E888E', '#14A5A5', '#16C1BC']
			$.each(legend, function(key, val) {
				var series_default = {
					name: val,
					type: 'line',
					stack: '总量',
					areaStyle: {
						normal: {
							color: color[key]
						}
					},
					lineStyle: {
						normal: {
							opacity: 0
						}
					},
					itemStyle: {
						opacity: 0,
						color: color[key]
					},
					data: series_data[key]
				}
				series.push(series_default);
			});
			var num = 0;

			mychart1 = echarts.init(document.getElementById('yanganLine1'));
			var option = {
				title: {
					text: '楼层分析',
					textStyle: {
						fontWeight: 'normal',
						fontSize: scale * 12,
						color: '#91B5BB'
					},
					// left: '6%'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					icon: 'rect',
					itemWidth: scale * 14,
					itemHeight: scale * 5,
					itemGap: scale * 1,
					orient: 'vertical',
					selectedMode: true,
					right: scale * 50,
					textStyle: {
						fontSize: scale * 10,
						color: '#95BBC1'
					},
					data: legend
				},
				grid: {
					left: '5%',
					right: '35%',
					bottom: '4%',
					top: '13%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: date,
					splitNumber: 7,
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					splitLine: {
						show: false
					}
				}],
				yAxis: [{
					type: 'value',
					axisLabel: {
						show: false,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					splitLine: {
						show: false
					}
				}],
				series: series
			};
			mychart1.clear();
			mychart1.on('legendselectchanged', function(obj) {
				var selected = obj.selected;
				var legend = obj.name;
				var legend_data;
				mychart1.dispatchAction({
					type: 'legendSelect',
					name: legend
				})
				if(legend.indexOf('楼') >= 0) {
					legend_data = legend.replace('楼', '')
				} else {
					legend_data = legend
				}
				console.log(legend_data)
				funOp.chart3(equipdata["getSmokePoint"]["data"]);
			});
			mychart1.setOption(option, true);
			funOp.chart["yanganLine1"] = [mychart1, option];
		},
		//烟感折线图
		chart3: function(data) {
			var date = [];
			var series_data = new Array();
			var series = [];
			var legend = [];
			var id = [];

			var symbol = ['image://../img/icon/icon-equipment-yangan-yellow.png', 'image://../img/icon/icon-equipment-yangan-blue.png', 'image://../img/icon/icon-equipment-yangan-red.png', 'image://../img/icon/icon-equipment-yangan-green.png'];
			$.each(data[0].data, function(key, val) {
				id.push(val.place);
			});

			for(var k = 0; k < id.length; k++) {
				series_data[k] = new Array();
				for(var j = 0; j < data.length; j++) {
					series_data[k][j] = "";
				}
			}
			$.each(data, function(key, val) {
				date.push($.fn.commUtil.getWeek(val.date));
				$.each(val.data, function(index, val) {
					series_data[index][key] = val.smoke;
				})
			});
			$.each(series_data, function(key, val) {
				var series_default = {
					symbol: symbol[key],
					symbolSize: scale * 7,
					name: id[key],
					type: 'line',
					stack: '总量',
					lineStyle: {
						normal: {
							opacity: 1,
							color: '#826C33'
						}
					},
					itemStyle: {
						opacity: 1,
						color: '#fff'
					},
					data: val
				}
				series.push(series_default);
				var legend_default = {
					name: id[key],
					textStyle: {
						fontSize: scale * 7,
						color: '#95BBC1'
					},
					icon: symbol[key],
				}
				legend.push(legend_default);
			});
			var mychart1 = echarts.init(document.getElementById('yanganLine2'));
			var option = {
				title: {
					text: 'B3栋-4楼分析',
					textStyle: {
						fontWeight: 'normal',
						fontSize: scale * 12,
						color: '#91B5BB'
					},
					// left: '6%'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					itemWidth: scale * 8,
					itemHeight: scale * 8,
					itemGap: scale * 1,
					orient: 'horizontal',
					selectedMode: true,
					top: "10%",
					left: '5%',
					// data:[
					//     {
					//         name:'烟感1',
					//         textStyle:{
					//             fontSize:scale*7,
					//             color:'#95BBC1'
					//         },
					//         icon:'image://../img/icon/icon-equipment-yangan-yellow.png',
					//     },
					//     {
					//         name:'烟感2',
					//         textStyle:{
					//             fontSize:scale*7,
					//             color:'#95BBC1'
					//         },
					//         icon:'image://../img/icon/icon-equipment-yangan-blue.png',
					//     },
					//     {
					//         name:'烟感3',
					//         textStyle:{
					//             fontSize:scale*7,
					//             color:'#95BBC1'
					//         },
					//         icon:'image://../img/icon/icon-equipment-yangan-red.png',
					//     },
					//     {
					//         name:'烟感4',
					//         textStyle:{
					//             fontSize:scale*7,
					//             color:'#95BBC1'
					//         },
					//         icon:'image://../img/icon/icon-equipment-yangan-green.png',
					//     }
					// ],
					data: legend
				},
				grid: {
					left: '5%',
					right: '10%',
					bottom: '4%',
					top: '50%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: date,
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					splitLine: {
						show: false
					}
				}],
				yAxis: [{
					type: 'value',
					axisLabel: {
						show: false,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					splitLine: {
						show: false
					}
				}],
				// series : [
				//     {
				//         symbol: 'image://../img/icon/icon-equipment-yangan-yellow.png',
				//         symbolSize: scale*7,
				//         name:'烟感1',
				//         type:'line',
				//         stack: '总量',
				//         lineStyle:{
				//             normal: {
				//                 opacity:1,
				//                 color: '#826C33'
				//             }
				//         },
				//         itemStyle:{
				//             opacity:1,
				//             color: '#fff'
				//         },
				//         data:[120, 132, 101, 134, 90, 230, 210]
				//     },
				//     {
				//         symbol: 'image://../img/icon/icon-equipment-yangan-blue.png',
				//         symbolSize: scale*8,
				//         name:'烟感2',
				//         type:'line',
				//         stack: '总量',
				//         lineStyle:{
				//             normal: {
				//                 opacity:1,
				//                 color: '#076B8E'
				//             }
				//         },
				//         itemStyle:{
				//             opacity:1,
				//             color: '#fff'
				//         },
				//         data:[220, 182, 191, 234, 290, 330, 310]
				//     },
				//     {
				//         symbol: 'image://../img/icon/icon-equipment-yangan-red.png',
				//         symbolSize: scale*7,
				//         name:'烟感3',
				//         type:'line',
				//         stack: '总量',
				//         lineStyle:{
				//             normal: {
				//                 opacity:1,
				//                 color: '#754135'
				//             }
				//         },
				//         itemStyle:{
				//             opacity:1,
				//             color: '#fff'
				//         },
				//         data:[150, 232, 201, 154, 190, 330, 410]
				//     },
				//     {
				//         symbol: 'image://../img/icon/icon-equipment-yangan-green.png',
				//         symbolSize: scale*7,
				//         name:'烟感4',
				//         type:'line',
				//         stack: '总量',
				//         lineStyle:{
				//             normal: {
				//                 opacity:1,
				//                 color: '#274F18'
				//             }
				//         },
				//         itemStyle:{
				//             opacity:1,
				//             color: '#fff'
				//         },
				//         data:[320, 332, 301, 334, 390, 330, 320]
				//     }
				// ]
				series: series
			};
			mychart1.clear();
			mychart1.setOption(option, true);
			funOp.chart["yanganLine2"] = [mychart1, option];

		},

		//无人值守面积图
		// chart4:function(){
		//     var mychart1 = echarts.init(document.getElementById('wurenLine'));
		//     var option = {
		//         tooltip : {
		//             trigger: 'axis',
		//             axisPointer: {
		//                 type: 'cross',
		//                 label: {
		//                     backgroundColor: '#6a7985'
		//                 }
		//             }
		//         },
		//         legend: {
		//             itemWidth: scale*16,
		//             itemHeight: scale*10,
		//             itemGap: scale*1,
		//             orient:'horizontal',
		//             top:"10%",
		//             left:'center',
		//             data:[
		//                 {
		//                     name:'人员活动',
		//                     textStyle:{
		//                         fontSize:scale*11,
		//                         color:'#95BBC1'
		//                     },
		//                     icon:'image://../img/icon/icon-equipment-wurenzhishou-red.png',
		//                 },
		//                 {
		//                     name:'开门数',
		//                     textStyle:{
		//                         fontSize:scale*11,
		//                         color:'#95BBC1'
		//                     },
		//                     icon:'image://../img/icon/icon-equipment-wurenzhishou-blue.png',
		//                 }
		//             ]
		//         },
		//         grid: {
		//             left: '10%',
		//             right: '10%',
		//             bottom: '4%',
		//             top:'13%',
		//             containLabel: true
		//         },
		//         xAxis : [
		//             {
		//                 type : 'category',
		//                 boundaryGap : false,
		//                 data : ['','周一','周二','周三','周四','周五','周六','周日',''],
		//                 axisLabel:{
		//                     show:true,
		//                     color:'#95BBC1',
		//                     fontSize:scale*10
		//                 },
		//                 axisLine:{
		//                     show:true,
		//                     color:'#95BBC1',
		//                     fontSize:scale*10
		//                 },
		//                 splitLine:{
		//                     show:false
		//                 }
		//             }
		//         ],
		//         yAxis : [
		//             {
		//                 type : 'value',
		//                 axisLabel:{
		//                     show:false,
		//                     color:'#95BBC1',
		//                     fontSize:scale*10
		//                 },
		//                 axisLine:{
		//                     show:true,
		//                     color:'#95BBC1',
		//                     fontSize:scale*10
		//                 },
		//                 splitLine:{
		//                     show:false
		//                 }
		//             }
		//         ],
		//         series : [
		//             {
		//                 name:'人员活动',
		//                 type:'line',
		//                 stack: '总量',
		//                 smooth:true,  //这句就是让曲线变平滑的
		//                 areaStyle: {
		//                     normal: {
		//                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		//                             offset: 1,
		//                             color: 'rgba(139, 67, 129, 0)'
		//                         }, {
		//                             offset: 0,
		//                             color: 'rgba(163, 0, 129, 1)'
		//                         }], false),
		//                         // shadowColor: 'rgba(0, 0, 0, 0.1)',
		//                         shadowBlur: 10
		//                     }
		//                 },
		//                 lineStyle:{
		//                     normal: {
		//                         opacity:1,
		//                         color: '#C66081'
		//                     }
		//                 },
		//                 itemStyle:{
		//                     opacity:0,
		//                     color: '#C66081'
		//                 },
		//                 data:[0,120, 132, 101, 134, 90, 230, 210,0]
		//             },
		//             {
		//                 name:'开门数',
		//                 type:'line',
		//                 stack: '总量',
		//                 smooth:true,  //这句就是让曲线变平滑的
		//                 areaStyle: {
		//                     normal: {
		//                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		//                             offset: 1,
		//                             color: 'rgba(123, 134, 128, 0)'
		//                         }, {
		//                             offset: 0,
		//                             color: 'rgba(64, 166, 255, .7)'
		//                         }], false),
		//                         // shadowColor: 'rgba(0, 0, 0, 0.1)',
		//                         shadowBlur: 10
		//                     }
		//                 },
		//                 lineStyle:{
		//                     normal: {
		//                         color:'#37A3D4',
		//                     }
		//                 },
		//                 itemStyle:{
		//                     opacity:0,
		//                     color: '#37A3D4'
		//                 },
		//                 data:[0,220, 182, 191, 234, 290, 330, 310,0]
		//             }
		//         ]
		//     };
		//     mychart1.clear();
		//     mychart1.setOption(option, true);
		// },

		//河道监测折线图
		chart5: function(turbidity, level, type) {
			var date = [];
			var data_num = [];
			var num = 0;
			if(type == 'level') {
				$.each(level, function(key, val) {
					date.push($.fn.commUtil.getWeek(val.date))
					data_num.push(val.data[0].levelData)
					num++;
					if(num > 6) {
						return false;
					}
				});
			} else {
				$.each(turbidity, function(key, val) {
					date.push($.fn.commUtil.getWeek(val.date))
					data_num.push(val.data[0].turbidityData)
					num++;
					if(num > 6) {
						return false;
					}
				});
			}
			var max = Number(funOp.getMax(data_num)) + 150;
			var mychart1 = echarts.init(document.getElementById('yeweiLine'));
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					show: false
				},
				grid: {
					left: '10%',
					right: '10%',
					bottom: '0%',
					top: '0%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: date,
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					splitLine: {
						show: false
					}
				}],
				yAxis: [{
					type: 'value',
					max: max,
					axisLabel: {
						show: false,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					splitLine: {
						show: false
					}
				}],
				series: [{
					symbol: 'image://../img/icon/icon-equipment-hedaojiance-circle.png',
					symbolSize: scale * 10,
					name: '液位监测统计',
					type: 'line',
					smooth: true,
					stack: '总量',
					lineStyle: {
						normal: {
							opacity: 1,
							color: '#00EB0B'
						}
					},
					itemStyle: {
						opacity: 1,
						// borderColor: '#00EB0B',
						// color: '#00EB0B'
						// symbol:'image://../img/icon/icon-equipment-hedaojiance-circle.png',
						// symbolSize:scale*22,
					},
					data: data_num,
					/*markPoint: {
					    symbol: 'image://../img/icon/icon-equipment-hedaojiance-green.png',
					    symbolSize: scale * 22,
					    top: '10%',
					    symbolOffset: [0, '-100%'],
					    label: {
					        show: false
					    },
					    data: [
					        {
					            name: '最大值',
					            type: 'max'
					        },
					    ]
					}*/
				}, ]
			};
			mychart1.clear();
			mychart1.setOption(option, true);

		},

		//二次供水柱状图
		chart6: function() {
			var mychart1 = echarts.init(document.getElementById('ercigongshuiBar'));
			var option = {
				tooltip: {
					trigger: 'axis',
					// formatter: "保障率&占比 : {c}%",
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				legend: {
					itemWidth: scale * 12,
					itemHeight: scale * 5,
					itemGap: scale * 1,
					orient: 'horizontal',
					selectedMode: false,
					top: "0%",
					left: 'center',
					data: [{
							name: '余氯',
							textStyle: {
								fontSize: scale * 11,
								color: '#95BBC1'
							},
							icon: 'image://../img/icon/icon-equipment-ercishuizhi-blue.png',
						},
						{
							name: '浑浊度',
							textStyle: {
								fontSize: scale * 11,
								color: '#95BBC1'
							},
							icon: 'image://../img/icon/icon-equipment-ercishuizhi-yellow.png',
						}
					]
				},
				grid: {
					left: '5%',
					right: '5%',
					bottom: '0%',
					top: '20%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					show: true,
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					}
				}],

				yAxis: [{
						type: 'value',
						name: '(mg/l)',
						nameTextStyle: {
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLabel: {
							show: true,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLine: {
							show: true,
							color: '#95BBC1',
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					},
					{
						type: 'value',
						name: '(FTU)',
						nameTextStyle: {
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLabel: {
							show: true,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLine: {
							show: true,
							color: '#95BBC1',
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					},
				],
				series: [{
						type: 'bar',
						name: '余氯',
						barWidth: scale * 16,
						yAxisIndex: 0,
						itemStyle: {
							color: 'rgba(64,137,195,.25)',
							borderColor: 'rgba(64,137,195,1)'
						},
						data: [30, 60, 70, 80, 20, 60, 90]
					},
					{
						symbol: 'image://../img/icon/icon-equipment-ercishuizhi-top.png',
						name: 'top',
						yAxisIndex: 0,
						type: 'pictorialBar',
						symbolPosition: 'end',
						symbolSize: scale * 18,
						symbolOffset: ['-2%', '-70%'],
						data: [30, 60, 70, 80, 20, 60, 90]
					},
					{
						type: 'line',
						name: '浑浊度',
						yAxisIndex: 1,
						data: [10, 20, 15, 19, 20, 50, 60],
						smooth: true,
						areaStyle: {
							normal: {
								color: 'rgba(235,254,104,.1)'
							}
						},
						lineStyle: {
							normal: {
								width: 1,
								opacity: 1,
								color: '#CEB345'
							}
						},
						itemStyle: {
							opacity: 0,
							color: '#CEB345'
						},
					}
				]
			};
			mychart1.clear();
			mychart1.setOption(option, true);

		},
		//二次供水折线图
		chart7: function() {
			var mychart1 = echarts.init(document.getElementById('ercigongshuiLine'));
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					itemWidth: scale * 21,
					itemHeight: scale * 11,
					itemGap: scale * 1,
					orient: 'horizontal',
					top: "10%",
					left: 'center',
					data: [{
						name: 'pH值',
						textStyle: {
							fontSize: scale * 7,
							color: '#95BBC1'
						},
						icon: 'image://../img/icon/icon-equipment-ercishuizhi-small.png',
					}]
				},
				grid: {
					left: '5%',
					right: '5%',
					bottom: '4%',
					top: '20%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					splitLine: {
						show: false
					}
				}],
				yAxis: [{
					type: 'value',
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: false,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					splitLine: {
						show: false
					}
				}],
				series: [{
					symbol: 'image://../img/icon/icon-equipment-ercishuizhi-big.png',
					symbolSize: scale * 7,
					name: 'pH值',
					type: 'line',
					stack: '总量',
					lineStyle: {
						normal: {
							opacity: 1,
							color: '#54D367'
						}
					},
					label: {
						normal: {
							show: true,
							position: 'inside',
							fontSize: scale * 10,
							color: '#7EFC8A',
							backgroundColor: '#2B5B37',
							borderColor: '#54D367',
							borderWidth: scale * 1,
							borderRadius: scale * 4,
							width: scale * 31,
							height: scale * 16
						}
					},
					itemStyle: {
						opacity: 1,
						color: '#fff'
					},
					data: [, 120, 132, 101, 134, 90, 230, 210]
				}]
			};
			mychart1.clear();
			mychart1.setOption(option, true);

		},

		//环境监测柱状图
		chart8: function(pm25, pm10) {
			var pm25_data = [];
			var pm10_data = [];
			var date = [];
			var total = [];
			$.each(pm25, function(key, val) {
				pm25_data.push(val.data[0].pm25)
				total.push(100)
			});
			$.each(pm10, function(key, val) {
				pm10_data.push(val.data[0].pm10)
				var date1 = (val.date).split(' ')
				date.push(date1[0])
			});
			var mychart1 = echarts.init(document.getElementById('huanjingBar'));
			var option = {
				title: {
					show: true,
					top: '5%',
					left: '4%',
					text: '空气质量检测统计',
					textStyle: {
						color: '#C6D8FF',
						fontSize: scale * 14,
					}
				},
				tooltip: {
					trigger: 'axis',
					// formatter: "保障率&占比 : {c}%",
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				legend: {
					itemWidth: scale * 14,
					itemHeight: scale * 5,
					top: '15%',
					selectedMode: false,
					data: ['PM2.5', 'PM10'],
					textStyle: {
						color: '#95BBC1'
					}
				},
				grid: {
					left: '5%',
					right: '5%',
					bottom: '20%',
					top: '25%',
					containLabel: true
				},
				xAxis: [{
						type: 'category',
						show: true,
						data: date,
						axisPointer: {
							type: 'shadow'
						},
						axisLabel: {
							show: true,
							color: '#95BBC1',
							rotate: -20,
							interval: 0,
							fontSize: scale * 10
						},
						axisLine: {
							show: true,
							color: '#95BBC1',
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					},
					{
						type: 'category',
						show: false,
						data: date,
						axisPointer: {
							type: 'shadow'
						},
						axisLabel: {
							show: true,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLine: {
							show: true,
							color: '#95BBC1',
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					}
				],
				yAxis: [{
						type: 'value',
						name: '(mg/l)',
						axisLabel: {
							show: true,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLine: {
							show: true,
							color: '#95BBC1',
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					},

				],
				series: [{
						type: 'bar',
						name: 'PM2.5',
						z: 2,
						xAxisIndex: 0,
						barWidth: scale * 13,
						itemStyle: {
							color: '#0D6084'
						},
						data: pm25_data
					},
					{
						symbol: 'image://../img/icon/icon-equipment-huanjingjiance-top-blue.png',
						name: 'top',
						type: 'pictorialBar',
						symbolPosition: 'end',
						symbolSize: scale * 14,
						symbolOffset: ['-61%', '-60%'],
						tooltip: {
							show: false
						},
						data: pm25_data
					},
					{
						type: 'bar',
						name: 'PM10',
						z: 2,
						xAxisIndex: 0,
						barWidth: scale * 13,
						itemStyle: {
							color: '#748DCE'
						},
						data: pm10_data
					},
					{
						symbol: 'image://../img/icon/icon-equipment-huanjingjiance-top-purple.png',
						name: 'top',
						type: 'pictorialBar',
						symbolPosition: 'end',
						symbolSize: scale * 14,
						symbolOffset: ['59%', '-60%'],
						tooltip: {
							show: false
						},
						data: pm10_data
					},
					{
						type: 'bar',
						name: '总数',
						z: 1,
						xAxisIndex: 1,
						barWidth: scale * 14,
						itemStyle: {
							color: 'rgba(13,96,132,.25)'
						},
						tooltip: {
							show: false
						},
						data: total
					},
					{
						type: 'bar',
						name: '总数',
						z: 1,
						xAxisIndex: 1,
						barWidth: scale * 14,
						itemStyle: {
							color: 'rgba(91,103,130,.25)'
						},
						tooltip: {
							show: false
						},
						data: total
					}
				]
			};
			mychart1.clear();
			mychart1.setOption(option, true);

		},
		//环境监测折线图
		chart9: function(weather) {
			var date = [];
			var weather_pic = [];
			var hightTp = [];
			var lowTp = []
			$.each(weather, function(key, val) {
				var date1 = (val.date).split(' ')
				date.push(date1[0])
				hightTp.push(val.data[0].hightTp);
				lowTp.push(val.data[0].lowTp);
				if(val.data[0].weather == '') {
					var res = {
						value: 40,
						symbol: 'image://../img/icon/icon-equipment-huanjingjiance-sun.png',
					}
					weather_pic.push(res)
				} else if(val.data[0].weather == '晴') {
					var res = {
						value: 40,
						symbol: 'image://../img/icon/icon-equipment-huanjingjiance-sun.png',
					}
					weather_pic.push(res)
				} else if(val.data[0].weather == '雨') {
					var res = {
						value: 40,
						symbol: 'image://../img/icon/icon-equipment-huanjingjiance-rain.png',
					}
					weather_pic.push(res)
				} else if(val.data[0].weather == '阴') {
					var res = {
						value: 40,
						symbol: 'image://../img/icon/icon-equipment-huanjingjiance-suncloud.png',
					}
					weather_pic.push(res)
				} else if(val.data[0].weather == '云') {
					var res = {
						value: 40,
						symbol: 'image://../img/icon/icon-equipment-huanjingjiance-cloud.png',
					}
					weather_pic.push(res)
				}
			});
			var mychart1 = echarts.init(document.getElementById('huanjingLine'));
			var option = {
				title: {
					show: true,
					top: '5%',
					left: '4%',
					text: '未来4日天气趋势',
					textStyle: {
						color: '#C6D8FF',
						fontSize: scale * 14,
					}
				},
				tooltip: {
					trigger: 'axis',
					// formatter: "保障率&占比 : {c}%",
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				legend: {
					show: false,
					itemWidth: scale * 14,
					itemHeight: scale * 5,
					top: '15%',
					data: ['PM2.5', 'PM10'],
					textStyle: {
						color: '#95BBC1'
					}
				},
				grid: {
					left: '5%',
					right: '5%',
					bottom: '20%',
					top: '35%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					show: true,
					data: date,
					interval: 1,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
						show: true,
						rotate: -20,
						interval: 0,
						color: '#95BBC1',
						fontSize: scale * 8
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					}
				}],
				yAxis: [{
						type: 'value',
						name: '(mg/l)',
						max: 40,
						axisLabel: {
							show: false,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLine: {
							show: true,
							color: '#95BBC1',
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					},

				],
				series: [{
						symbol: 'image://../img/icon/icon-equipment-huanjingjiance-circle.png',
						symbolSize: scale * 7,
						name: '最高气温',
						type: 'line',
						smooth: true,
						label: {
							show: true,
							position: 'top',
							color: '#C5E6EA',
							fontSize: scale * 10,
							formatter: '{c}℃'
						},
						lineStyle: {
							normal: {
								opacity: 1,
								color: '#D88C39'
							}
						},
						itemStyle: {
							opacity: 1,
							borderColor: '#D88C39',
							color: '#D88C39'
						},
						data: hightTp
					},
					{
						symbol: 'image://../img/icon/icon-equipment-huanjingjiance-circle.png',
						symbolSize: scale * 7,
						name: '最低气温',
						type: 'line',
						smooth: true,
						label: {
							show: true,
							position: 'bottom',
							color: '#C5E6EA',
							fontSize: scale * 10,
							formatter: '{c}℃'
						},
						lineStyle: {
							normal: {
								opacity: 1,
								color: '#D88C39'
							}
						},
						itemStyle: {
							opacity: 1,
							borderColor: '#D88C39',
							color: '#D88C39'
						},
						data: lowTp
					},
					/*{
					    name: '天气',
					    type: 'pictorialBar',
					    symbolPosition: 'end',
					    symbolSize: 22,
					    symbolOffset: [0, '-150%'],
					    data: weather_pic
					}*/
				]
			};
			mychart1.clear();
			mychart1.setOption(option, true);

		},

		//智能垃圾桶柱状图
		chart10: function(countByDate) {
			var date = [];
			var data_num = [];
			var num = 0;
			$.each(countByDate, function(key, val) {
				date.push($.fn.commUtil.getWeek(val.date));
				data_num.push(val.data[0].count)
				num++
				if(num > 6) {
					return false
				}
			});
			var mychart1 = echarts.init(document.getElementById('lajitongBar'));
			var option = {
				title: {
					show: true,
					top: '5%',
					left: '4%',
					text: '满溢数值占比统计',
					textStyle: {
						color: '#C6D8FF',
						fontSize: scale * 14,
					}
				},
				tooltip: {
					trigger: 'axis',
					// formatter: "保障率&占比 : {c}%",
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				legend: {
					show: false,
					itemWidth: scale * 14,
					itemHeight: scale * 5,
					top: '15%',
					data: ['PM2.5', 'PM10'],
					textStyle: {
						color: '#95BBC1'
					}
				},
				grid: {
					left: '5%',
					right: '5%',
					bottom: '0%',
					top: '25%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					show: true,
					data: date,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					}
				}],

				yAxis: [{
						type: 'value',
						name: '(mg/l)',
						axisLabel: {
							show: false,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLine: {
							show: true,
							color: '#95BBC1',
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: ['rgba(7,196,170,.2)'],
								width: 1
							}
						},
						axisTick: {
							show: false
						}
					},

				],
				series: [{
						type: 'bar',
						name: '满溢数值占比',
						z: 2,
						xAxisIndex: 0,
						barWidth: scale * 20,
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#108EE4'
							}, {
								offset: 1,
								color: '#21DEFE'
							}], false),
						},
						data: data_num
					},

				]
			};
			mychart1.clear();
			mychart1.setOption(option, true);

			mychart1.on('click', function(params) {
				console.log(params)
			});
		},
		//智能垃圾桶折线图
		chart11: function(countByTime) {
			var date = [];
			var date_num = [];
			var num = 0;
			$.each(countByTime, function(key, val) {
				var dateString = (val.date).split(' ');
				date.push(dateString[1])
				date_num.push(val.data[0].count)
				num++;
				if(num > 6) {
					return false
				}
			});
			var mychart1 = echarts.init(document.getElementById('lajitongLine'));
			var option = {
				title: {
					show: true,
					top: '5%',
					left: '4%',
					text: '今日统计',
					textStyle: {
						color: '#C6D8FF',
						fontSize: scale * 14,
					}
				},
				tooltip: {
					trigger: 'axis',
					// formatter: "保障率&占比 : {c}%",
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				legend: {
					show: false,
					itemWidth: scale * 14,
					itemHeight: scale * 5,
					top: '15%',
					data: ['PM2.5', 'PM10'],
					textStyle: {
						color: '#95BBC1'
					}
				},
				grid: {
					left: '5%',
					right: '5%',
					bottom: '0%',
					top: '25%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					show: true,
					data: date,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					}
				}],
				yAxis: [{
						type: 'value',
						name: '(mg/l)',
						max: 7,
						axisLabel: {
							show: false,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLine: {
							show: false,
							color: '#95BBC1',
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					},

				],
				series: [{
					name: '统计数据',
					type: 'line',
					// smooth:true,
					step: 'middle',
					lineStyle: {
						normal: {
							opacity: 1,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(33,222,254,1)'
							}, {
								offset: 1,
								color: 'rgba(16,142,228,.3)'
							}], false),
						}
					},
					itemStyle: {
						opacity: 0,
					},
					data: date_num
				}, ]
			};
			mychart1.clear();
			mychart1.setOption(option, true);
		},

		//古树名木柱状图
		chart12: function(contentWater, temperature) {
			var contentWater_data = [];
			var temperature_data = [];
			var date = [];
			$.each(contentWater, function(key, val) {
				contentWater_data.push(val.data[0].contentWater)
			});
			$.each(temperature, function(key, val) {
				temperature_data.push(val.data[0].temperature)
				date.push($.fn.commUtil.getWeek(val.date))
			});
			var data1 = contentWater_data;
			var data1_max = [30, 30, 30, 30, 30, 30, 30, 30, 30];
			var data1_min = [10, 10, 10, 10, 10, 10, 10, 10, 10];
			var data2 = contentWater_data;
			var mychart1 = echarts.init(document.getElementById('gushuBar'));
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					icon: 'rect',
					itemWidth: scale * 14,
					itemHeight: scale * 5,
					itemGap: scale * 1,
					orient: 'horizontal',
					selectedMode: false,
					right: scale * 200,
					textStyle: {
						fontSize: scale * 10,
						color: '#95BBC1'
					},
					data: ['含水率', '温度']
				},
				grid: {
					left: '10%',
					right: '10%',
					bottom: '0%',
					top: '25%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					offset: 1,
					data: date,
					boundaryGap: ['20%', '20%'],
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					splitLine: {
						show: false
					}
				}],
				yAxis: [{
						type: 'value',
						name: '含水率（%）',
						nameTextStyle: {
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLabel: {
							show: true,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLine: {
							show: true,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						splitLine: {
							show: false
						}
					},
					{
						type: 'value',
						name: '温度（℃）',
						nameTextStyle: {
							color: '#95BBC1',
							fontSize: scale * 10
						},
						max: 100,
						axisLabel: {
							show: true,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						axisLine: {
							show: true,
							color: '#95BBC1',
							fontSize: scale * 10
						},
						splitLine: {
							show: false
						}
					}
				],
				series: [{
						name: '温度',
						type: 'line',
						yAxisIndex: 1,
						smooth: true,
						lineStyle: {
							normal: {
								opacity: 1,
								color: '#F29400'
							}
						},
						itemStyle: {
							opacity: 0,
						},
						data: temperature_data,
						markPoint: {
							symbol: 'image://../img/icon/icon-equipment-gushumingmu-yellow.png',
							symbolSize: scale * 21,
							top: '10%',
							symbolOffset: [0, 0],
							label: {
								show: false
							},
							data: [{
								name: '最大值',
								type: 'max'
							}, ]
						}
					},
					{
						name: '含水率',
						type: 'pictorialBar',
						yAxisIndex: 0,
						symbol: 'rect',
						label: {
							show: function(item) {
								if(data1[item.dataIndex] > data1_max[item.dataIndex]) {
									return true;
								} else if(data1[item.dataIndex] < data1_min[item.dataIndex]) {
									return true;
								} else {
									return false;
								}
							},
							position: 'top',
							color: '#C5E6EA',
							fontSize: scale * 10,
							formatter: function(item) {
								if(data1[item.dataIndex] > data1_max[item.dataIndex]) {
									return '>30%';
								} else if(data1[item.dataIndex] < data1_min[item.dataIndex]) {
									return '<10%';
								} else {
									return '';
								}
							}
						},
						itemStyle: {
							normal: {
								color: function(item) {
									//for(var i=0;i<data1.lefth;i++){
									if(data1[item.dataIndex] > data1_max[item.dataIndex]) {
										return '#5BFF3E';
									} else if(data1[item.dataIndex] < data1_min[item.dataIndex]) {
										return '#FFEA0B';
									} else {
										return '#5BDB82';
									}
									//}
								}
							}
						},
						symbolRepeat: true,
						symbolSize: [scale * 20, scale * 6],
						symbolMargin: 1,
						z: 2,
						data: data1
					},
					{
						name: '含水率1',
						type: 'bar',
						yAxisIndex: 0,
						barGap: '-100%',
						barWidth: 20,
						z: 1,
						itemStyle: {
							normal: {
								color: 'rgba(0,0,0,0)',
								// borderColor:'#5BDB82',
								borderWidth: 1,
								borderColor: function(item) {
									//for(var i=0;i<data1.lefth;i++){
									if(data1[item.dataIndex] > data1_max[item.dataIndex]) {
										return '#5BFF3E';
									} else if(data1[item.dataIndex] < data1_min[item.dataIndex]) {
										return '#FFEA0B';
									} else {
										return '#5BDB82';
									}
									//}
								}
							}
						},
						data: data2
					}
				]
			};
			mychart1.clear();
			mychart1.setOption(option, true);
		},

		//监测日志
		getLog: function(data, type, iconname) {
			var status_num = 0;
			var num_total = 0;
			var num_normal = 0;
			var outCon = 0;
			var iconStatus = 1;
			$('#' + type).find('tbody').find('tr').remove();
			mapIconData["iconData"][iconname] = [];
			$.each(data, function(key, val) {
				var res = '';
				var res_data = '';
				res = '<td class="equipmentId" title="' + val.equipmentId + '">' + val.equipmentId + '</td><td class="reportTime" title="' + val.reportTime + '">' + val.reportTime + '</td><td class="status" title="' + val.status + '">' + val.status + '</td><td class="address" title="' + val.addressDetail + '">' + val.addressDetail + '</td><td class="alarmMessage" title="' + val.alarmMessage + '" style="display:none">' + val.alarmMessage + '</td>'
				$.each(val.data, function(key, val) {
					var data = val.split(':');
					res_data += '<td title="' + funOp.tableBody(data[0], data[1]) + '">' + funOp.tableBody(data[0], data[1]) + '</td>';
				});
				res = res + res_data;
				$('#' + type).find('tbody').append('<tr>' + res + '</tr>')
				if(val.status == '失联') {
					status_num += 1;
				} else {
					num_normal += 1;
				}
				num_total += 1;
				if(val.status == "正常") {
					iconStatus = 1;
				} else if(val.status == "报警") {
					iconStatus = 2;
				} else if(val.status == "失联") {
					iconStatus = 6;
				}
				mapIconData["iconData"][iconname].push({
					id: val.equipmentId,
					status: iconStatus
				});
			});
			$('#' + type).parent().parent().prev('.con-right-box-list').find('.listRight').find('.online').html(num_total - status_num);
			$('#' + type).parent().parent().prev('.con-right-box-list').find('.listRight').find('.online').parent().parent().next().find('.fiveDivTextNum').html(0);

			if($('#' + type).parent().parent().prev('.con-right-box-list').find('.listLeft').find('.iconTitle').attr('typeId') == "22") {
				$('#' + type).parent().parent().prev('.con-right-box-list').find('.listLeft').find('.iconTitle').find('.iconNum').html(num_total)
			}
			var numTotal = $('#' + type).parent().parent().prev('.con-right-box-list').find('.listLeft').find('.iconTitle').find('.iconNum').html();

			$('#' + type).parent().parent().prev('.con-right-box-list').find('.listRight').find('.online').parent().parent().next().next().find('.fiveDivTextNum').html(status_num);
			/*if(type == 'hydrant'){
			}else if(type == 'manholeCover'){
			    $('#' + type).parent().parent().prev('.con-right-box-list').find('.listRight').find('.online').parent().parent().next().next().find('.fiveDivTextNum').html(status_num);
			}else {
			    $('#' + type).parent().parent().prev('.con-right-box-list').find('.listRight').find('.online').parent().parent().next().next().find('.fiveDivTextNum').html(status_num);
			}*/

			$('.outCon').each(function() {
				outCon += Number($(this).next().html())
			})

			var equi_num = 0;
			$('.con-right-box-list').each(function() {
				var num = $(this).find('.listLeft').find('.iconNum').html()
				equi_num += Number(num)
			})

			// $('#equipmentCount').html(equi_num);

			// $('#totalLostCount').html(outCon);
			$.each(data[0].data, function(key, val) {
				var title = val.split(':')
				$('#' + type + 'Title').find('thead').find('tr').append('<th title="' + funOp.tableHead(title[0]) + '">' + funOp.tableHead(title[0]) + '</th>')
			});
			var width = 100 / ($('#' + type + 'Title').find('thead').find('tr').find('th').length)
			$('#' + type + 'Title thead th').css('width', width + '%')
			$('#' + type + ' tbody td').css('width', width + '%')
			funOp.trClick(type);

		},

		//查找数组中的最大值
		getMax: function(arrs) {
			var max = arrs[0];
			for(var i = 1, ilen = arrs.length; i < ilen; i++) {
				if(arrs[i] > max) {
					max = arrs[i];
				}
			}
			return max;
		},

		//设置map参数
		setMap: function(name) {
			var data = {
				iconData: {}
			};
			data.iconData[name] = mapIconData["iconData"][name];
			var param = {
				direct: 1,
				bearing: 1,
				mapZoom: 15.548828967172582,
				mapCenter: [121.53408537187192, 31.127575097936003],
				mapOpacityZoom: 13.003436315165965,
				mapBearing: 0,
				mapPitch: 35.000000000000014,
				type: 2,
				showIcon: name,
				iconData: encodeURIComponent(JSON.stringify(data.iconData))
			};
			$.fn.commUtil.mapInit("map", param);
			//          var src = "http://47.97.104.216/ZHJY/?direct=1&bearing=1&mapZoom=15.548828967172582&mapCenter=[121.53408537187192,31.127575097936003]&mapOpacityZoom=13.003436315165965&mapBearing=0&mapPitch=35.000000000000014&type=2&showIcon=" + name;
			//          $("#map").attr("src", src);
		},

		//重置map参数
		resetMap: function(name) {
			//			var data = {
			//				showIcon: encodeURIComponent(name)
			//			};
			var data = {
				showIcon: encodeURIComponent(name),
				iconData: {}
			};
			data.iconData[name] = mapIconData["iconData"][name];
			console.log(mapIconData);
			console.log(data);
			data.iconData = encodeURIComponent(JSON.stringify(data.iconData));

			document.getElementById("map").contentWindow.postMessage(data, "*");
		},

		//设置物联设备各数值
		setEquipmentNum: function(all, warnStatus) {
			var equi_num = 0;
			var alarm_num = 0;
			$('#dataQuantity').html(all.dataQuantity);
			$('#equipmentCount').html(all.equipmentCount);
			$('#totalLostCount').html(all.totalLostCount);
			$('#warnCount').html(all.warnCount);

			if(all.dataQuantity > 10000) {
				$('#dataQuantity').html(parseFloat((all.dataQuantity) / 10000).toFixed(2));
				$('#dataQuantityUnit').html('万条');
			} else if(all.dataQuantity > 100000000) {
				$('#dataQuantity').html(parseInt((all.dataQuantity) / 100000000));
				$('#dataQuantityUnit').html('亿条');
			}
			$.each(warnStatus, function(key, val) {
				$('.iconTitle').each(function() {
					if($(this).attr('typeId') == "22") {
						if($(this).attr('equipmentName') == val.equipmentName) {
							$(this).find('.iconName').html(val.equipmentName)
							// $(this).find('.iconNum').html(val.equipmentCount)
							// $(this).parent().next('.listRight').find('.online').html(val.equipmentCount)
						}
					} else {
						if($(this).attr('typeId') == val.typeId) {
							$(this).find('.iconName').html(val.equipmentName)
							$(this).find('.iconNum').html(Number(val.equipmentCount))
							// $(this).parent().next('.listRight').find('.online').html(val.equipmentCount)
						}
					}
				})
				$.each(val.data, function(key, val) {
					alarm_num += val.warnCount;
				})
				equi_num += val.equipmentCount
			});

			/* $('#equipmentCount').html(equi_num);
			 $('#warnCount').html(alarm_num);*/

		},

		//设置物联设备告警
		setEquipmentWarn: function(warnStatus) {
			var img = ["../img/icon/icon-equipment-list-orange.png", "../img/icon/icon-equipment-list-blue.png", "../img/icon/icon-equipment-list-purple.png", "../img/icon/icon-equipment-list-red.png", "../img/icon/icon-equipment-list-white.png"];
			var num = 0;
			var warn = 0;
			$.each(warnStatus, function(key, val) {
				$('.iconTitle').each(function() {
					if($(this).attr('typeId') == val.typeId) {
						if(val.typeId == '6') {
							var num1 = 0;
							var num2 = 0;
							var num3 = 0;
							var num4 = 0;
							var num5 = 0;
							$.each(val.data, function(key, val) {
								if(val.warnTypeName == '冲顶' || val.warnTypeName == '蹲底' || val.warnTypeName == '超速' || val.warnTypeName == '电梯速度异常') {
									num1 = num1 + val.warnCount
								} else if(val.warnTypeName == '运行中开门' || val.warnTypeName == '开门走车' || val.warnTypeName == '运行中开门') {
									num2 = num2 + val.warnCount
								} else if(val.warnTypeName == '门区外停梯' || val.warnTypeName == '停电') {
									num3 = num3 + val.warnCount
								} else if(val.warnTypeName == '平层关人' || val.warnTypeName == '非平层关人' || val.warnTypeName == '非平层关人') {
									num4 = num4 + val.warnCount
								} else if(val.warnTypeName == '安全回路断路' || val.warnTypeName == '开门故障' || val.warnTypeName == '关门故障' || val.warnTypeName == '门锁回路断路' || val.warnTypeName == '层站按钮粘连') {
									num5 = num5 + val.warnCount
								} else {
									num5 = num5 + val.warnCount
								}
								warn += val.warnCount;
							})
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(2).find('.fiveDivTextNum').html(num3)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(3).find('.fiveDivTextNum').html(num4)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(4).find('.fiveDivTextNum').html(num5)
						} else if(val.typeId == '1') {
							var num1 = 0;
							var num2 = 0;
							var num3 = 0;
							var num4 = 0;
							var num5 = 0;
							$.each(val.data, function(key, val) {
								if(val.warnTypeName == '高温预警') {
									num1 = num1 + val.warnCount
								} else if(val.warnTypeName == '湿度告警') {
									num2 = num2 + val.warnCount
								} else if(val.warnTypeName == '烟雾度告警') {
									num3 = num3 + val.warnCount
								} else if(val.warnTypeName == '信号告警') {
									num4 = num4 + val.warnCount
								} else {
									num4 = num4 + val.warnCount
								}
								warn += val.warnCount;
							})
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(2).find('.fiveDivTextNum').html(num3)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(3).find('.fiveDivTextNum').html(num4)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(4).find('.fiveDivTextNum').html(num5)
						} else if(val.typeId == '4') {
							var num1 = 0;
							var num2 = 0;
							var num3 = 0;
							var num4 = 0;
							var num5 = 0;
							$.each(val.data, function(key, val) {
								if(val.warnTypeName == '水压告警') {
									num1 = num1 + val.warnCount
								} else if(val.warnTypeName == '旋角告警') {
									num2 = num2 + val.warnCount
								} else if(val.warnTypeName == '倾角告警') {
									num3 = num3 + val.warnCount
								} else if(val.warnTypeName == '信号告警') {
									num4 = num4 + val.warnCount
								} else {
									num5 = num5 + val.warnCount
								}
								warn += val.warnCount;
							})
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(2).find('.fiveDivTextNum').html(num3)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(3).find('.fiveDivTextNum').html(num4)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(4).find('.fiveDivTextNum').html(num5)
						} else if(val.typeId == '5') {
							var num1 = 0;
							var num2 = 0;
							var num3 = 0;
							var num4 = 0;
							var num5 = 0;
							$.each(val.data, function(key, val) {
								if(val.warnTypeName == '漏电报警') {
									num1 = num1 + val.warnCount
								} else if(val.warnTypeName == '过压报警' || val.warnTypeName == '欠压报警') {
									num2 = num2 + val.warnCount
								} else if(val.warnTypeName == '火线温度报警' || val.warnTypeName == '零线温度报警') {
									num3 = num3 + val.warnCount
								} else if(val.warnTypeName == '电流过载') {
									num4 = num4 + val.warnCount
								} else if(val.warnTypeName == '短路报警') {
									num5 = num5 + val.warnCount
								} else {
									num5 = num5 + val.warnCount
								}
								warn += val.warnCount;
							})
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(2).find('.fiveDivTextNum').html(num3)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(3).find('.fiveDivTextNum').html(num4)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(4).find('.fiveDivTextNum').html(num5)
						} else if(val.typeId == '22') {
							if($(this).attr('equipmentName') == val.equipmentName) {
								var num1 = 0;
								var num2 = 0;
								var num3 = 0;
								$.each(val.data, function(key, val) {
									if(val.warnTypeName == '液位过高预警') {
										num1 = num1 + val.warnCount
									} else if(val.warnTypeName == '信号告警') {
										num2 = num2 + val.warnCount
									} else {
										num3 = num3 + val.warnCount
									}
									warn += val.warnCount;
								})
								$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
								$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
								$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(2).find('.fiveDivTextNum').html(num3)
							}
							/*else if($(this).attr('equipmentName') == "智能地下停车库"){
							                                var num1 = 0;
							                                var num2 = 0;
							                                $.each(val.data, function(key, val) {
							                                    if(val.warnTypeName == '液位过高预警'){
							                                        num1 = num1 + val.warnCount
							                                    }else if(val.warnTypeName == '信号告警'){
							                                        num2 = num2 + val.warnCount
							                                    }
							                                    warn += val.warnCount;
							                                })
							                                $(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
							                                $(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
							                            }*/
						} else if(val.typeId == '2') {
							var num1 = 0;
							var num2 = 0;
							var num3 = 0;
							var num4 = 0;
							$.each(val.data, function(key, val) {
								if(val.warnTypeName == '井盖关闭' || val.warnTypeName == '井盖打开') {
									num1 = num1 + val.warnCount
								} else if(val.warnTypeName == '井盖倾斜告警') {
									num2 = num2 + val.warnCount
								} else if(val.warnTypeName == '信号告警') {
									num3 = num3 + val.warnCount
								} else {
									num4 = num4 + val.warnCount
								}
								warn += val.warnCount;
							})
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(2).find('.fiveDivTextNum').html(num3)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(3).find('.fiveDivTextNum').html(num4)
						} else if(val.typeId == '25') {
							var num1 = 0;
							var num2 = 0;
							var num3 = 0;
							$.each(val.data, function(key, val) {
								if(val.warnTypeName == '液位警告') {
									num1 = num1 + val.warnCount
								} else if(val.warnTypeName == '信号告警') {
									num2 = num2 + val.warnCount
								} else {
									num3 = num3 + val.warnCount
								}
								warn += val.warnCount;
							})
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(2).find('.fiveDivTextNum').html(num3)
						} else if(val.typeId == '15') {
							var num1 = 0;
							var num2 = 0;
							var num3 = 0;
							var num4 = 0;
							var num5 = 0;
							$.each(val.data, function(key, val) {
								if(val.warnTypeName == '空气质量预警') {
									num1 = num1 + val.warnCount
								} else if(val.warnTypeName == '高温预警') {
									num2 = num2 + val.warnCount
								} else if(val.warnTypeName == '大风预警') {
									num3 = num3 + val.warnCount
								} else if(val.warnTypeName == '噪声预警') {
									num4 = num4 + val.warnCount
								} else {
									num5 = num5 + val.warnCount
								}
								warn += val.warnCount;
							})
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(2).find('.fiveDivTextNum').html(num3)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(3).find('.fiveDivTextNum').html(num4)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(4).find('.fiveDivTextNum').html(num5)
						} else if(val.typeId == '14') {
							var num1 = 0;
							var num2 = 0;
							var num3 = 0;
							var num4 = 0;
							$.each(val.data, function(key, val) {
								if(val.warnTypeName == '垃圾箱装满告警') {
									num1 = num1 + val.warnCount
								} else if(val.warnTypeName == '高温预警') {
									num2 = num2 + val.warnCount
								} else if(val.warnTypeName == '倾斜告警') {
									num3 = num3 + val.warnCount
								} else {
									num4 = num4 + val.warnCount
								}
								warn += val.warnCount;
							})
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(2).find('.fiveDivTextNum').html(num3)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(3).find('.fiveDivTextNum').html(num4)
						} else if(val.typeId == '20') {
							var num1 = 0;
							var num2 = 0;
							var num3 = 0;
							var num4 = 0;
							var num5 = 0;
							$.each(val.data, function(key, val) {
								if(val.warnTypeName == '白蚁告警') {
									num1 = num1 + val.warnCount
								} else if(val.warnTypeName == '倾角告警') {
									num2 = num2 + val.warnCount
								} else if(val.warnTypeName == '温度告警') {
									num3 = num3 + val.warnCount
								} else if(val.warnTypeName == '风速告警') {
									num4 = num4 + val.warnCount
								} else if(val.warnTypeName == '含水量告警') {
									num5 = num5 + val.warnCount
								} else {
									num5 = num5 + val.warnCount
								}
								warn += val.warnCount;
							})
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(0).find('.fiveDivTextNum').html(num1)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(1).find('.fiveDivTextNum').html(num2)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(2).find('.fiveDivTextNum').html(num3)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(3).find('.fiveDivTextNum').html(num4)
							$(this).parent().next('.listRight').find('.fiveDivContent').find('tr').eq(1).find('td').eq(4).find('.fiveDivTextNum').html(num5)
						}
					}
				})

			});

			var numWarn = 0;
			$('.warnNum').each(function() {
				$(this).html();
				numWarn += Number($(this).html())
			})
			// $('#warnCount').html(numWarn);
		},

		trClick: function(type) {
			$("#" + type).find("tbody").find("tr").click(function(e) {
				var typeName = $(this).parent().parent().parent().parent().prev('.con-right-box-list').attr('data');
				var typeId = $(this).find(".equipmentId").html();
				var typeStatus = $(this).find(".status").html();
				var status = 1;
				if(typeStatus == "正常") {
					status = 1;
				} else if(typeStatus == "报警") {
					status = 2;
				} else if(typeStatus == "失联") {
					status = 6;
				}
				var data = {
					iconData: {}
				};
				data.iconData[typeName] = [{
					id: typeId,
					status: status,
					size: 1.4
				}];
				document.getElementById("map").contentWindow.postMessage(data, "*");
				$(this).css('background', 'rgba(54, 140, 255, 0.2)');

				$('.equipmentDetail').find('.address').html($(this).find('.address').html())
				$('.equipmentDetail').find('.reportTime').html($(this).find('.reportTime').html())
			}).hover(function(e) {
				$('.dropDownTable').find('tr').css('background', '')
				$(this).css('background', 'rgba(54, 140, 255, 0.2)')
			})
		},

		//获取表头
		tableHead: function(key) {
			var data = equipmentError[key];
			if(data != undefined) {
				return data.name
			}
		},

		//获取表格内容
		tableBody: function(key, val) {
			var data = equipmentError[key];
			var value = val;
			if(data != undefined) {
				if(data.dataType == 'bollon') {
					if(value == '1') {
						return data.true
					} else {
						return data.false
					}
				} else {
					return value
				}
			}
		},

		//设置告警个数
		setWarnNum: function(type) {
			// if(type == )
		},

		//设置环境监测弹框中pm2.5和pm10数值
		setEnvironmentNum: function(data) {
			console.log(data)
			$('.park25').html(data.park.pm25)
			$('.park10').html(data.park.pm10)
			$('.city25').html(data.SH.pm25)
			$('.city10').html(data.SH.pm10)
		},
	};

}));