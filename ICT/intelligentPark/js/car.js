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
			page = 2;
			map = {};
			center = [121.674673, 31.071349];
			makers = [];
			zoom = 10;
			pathSimplifierIns = [];
			cardata = {};
			funOp.eventInit();
			funOp.dataInit();
		},
		chart: {},
		//事件绑定初始化
		eventInit: function() {
			$('#changeIcon').click(function() {
				if(page == 1) {
					funOp.showMap1();
				} else if(page == 2) {
					funOp.showMap2();
				} else if(page == 3) {
					funOp.showMap3("1");
				}
			})

			/*$('.con-top-right-fourDiv').click(function () {
			    $('.con-top-right-fourDiv').each(function () {
			        $(this).removeClass('fourDivPick');
			    })
			    $(this).addClass('fourDivPick');
			    var color = $(this).attr('data');
			    funOp.showMap3(color);
			})*/

			map = new AMap.Map('container', {
				center: center,
				zoom: zoom,
				mapStyle: 'amap://styles/1c43924dda0fec68cd079890e61c3c55',
				zoomEnable: false,
				dragEnable: false,
				resizeEnable: false
			});

			AMap.event.addDomListener(document.getElementById('clearMakers'), 'click', function() {
				map.remove(makers);
			}, false);
			AMap.event.addDomListener(document.getElementById('setCenter'), 'click', function() {
				// 设置缩放级别和中心点
				map.setZoomAndCenter(zoom, center);
				// 在新中心点添加 marker
			})
		},

		dataInit: function() {
			funOp.map1();
			funOp.chart3();

			//运行中班车数量
			$.getJSON("../data/carStatic.json",function(data){
				var cardatastr = JSON.stringify(data);
				cardata = JSON.parse(cardatastr);
				funOp.busAmount(data['index']['data']['busAmount']);
				funOp.chart1(data['index']['data']['passenger']);
				funOp.busRunningDetail(data['running']['data']);
			});
			
			//    //map3
			//    $.ajax({
			//        type: "POST",
			//        url: $.fn.commUtil.constant.baseUrl + "/car/map2",
			//        dataType: "json",
			//        data: "",
			//        success: function(data) {
			//        }
			//    });
			//map1
			// $.ajax({
			//     type: "POST",
			//     url: $.fn.commUtil.constant.baseUrl + "/car/map1",
			//     dataType: "json",
			//     data: "",
			//     success: function(data) {
			//         var data1;
			//         if(data.code == 200){
			//             data1 = data.data;
			//             funOp.map1(data1['busPoint']);
			//         }
			//     }
			// });
		},

		//折线图
		chart1: function(data) {
			var data_up = [];
			var data_down = [];
			var date = [];
			$.each(data, function(key, val) {
				$.each(val, function(key, val) {
					if(val.busType == '上') {
						data_up.push(val.personTotal)
						var date_num = val.date.split(' ')
						date.push(date_num[0])
					} else {
						data_down.push(-Number(val.personTotal))
					}
				});
			});

			var myChart = echarts.init(document.getElementById('mychart1'));

			// 折线 与 柱状图
			option = {
				title: {
					show: false,
					text: '折线图堆叠'
				},
				tooltip: {
					trigger: 'axis'
				},
				grid: {
					top: '4%',
					left: '0%',
					right: '6%',
					bottom: '0%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					splitLine: {
						lineStyle: {
							color: 'rgba(7,196,170,.2)'
						},
						show: true
					},
					axisLabel: {
						color: '#95BBC1',
						fontSize: 12 * scale
					},
					data: date
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					splitLine: {
						lineStyle: {
							color: 'rgba(7,196,170,.2)'
						},
						show: true
					},
					axisLabel: {
						color: '#95BBC1',
						fontSize: 12 * scale
					}
				},
				series: [{
						name: '上车',
						type: 'line',
						stack: '总量',
						symbol: 'circle', //设定为实心点
						symbolSize: scale * 8, //设定实心点的大小
						itemStyle: {
							normal: {
								color: '#50F7FF',
								lineStyle: {
									color: '#50F7FF',
									width: scale * 2
								}
							}
						},
						data: data_up
					},
					{
						name: '下车',
						type: 'line',
						stack: '总量',
						symbol: 'circle', //设定为实心点
						symbolSize: scale * 8, //设定实心点的大小
						itemStyle: {
							normal: {
								color: '#50F7FF',
								lineStyle: {
									color: '#50F7FF',
									width: scale * 2
								}
							}
						},
						data: data_down
					},

				]
			};
			myChart.clear();
			myChart.setOption(option, true);
		},
		//线图
		chart2: function() {
			var myChart = echarts.init(document.getElementById('containerLines'));

			var allData = {
				citys: [],
				moveLines: []
			};
			var center = [107.531065, 39.224838];
			var fromList = [
				[100.501941, 35.905655],
				[93.546863, 40.699748],
				[98.546863, 30.699748],
				[98.546863, 36.699748],
				[111.546863, 40.699748],
				[120, 48],
				[90, 30],
				[80, 40],
				[120, 40],
			]
			$.each(fromList, function(i, n) {

				allData.citys.push({
					value: n,
					symbolSize: 2,
					itemStyle: {
						"normal": {
							"color": "#61E3A1"
						}
					}
				});
				allData.moveLines.push({
					coords: [
						n,
						center
					]
				});
			});
			var option = {
				grid: {
					top: 0,
					left: 0,
					right: 0,
					bottom: 0
				},
				legend: {
					show: false,
					orient: 'vertical',
					top: 'auto',
					left: 'right',
					data: ['地点', '线路'],
					textStyle: {
						color: '#fff'
					}
				},
				geo: {
					type: 'map',
					map: 'china',
					show: false,
					zoom: 0.5,
					label: {
						emphasis: {
							show: false,
							textStyle: {
								color: '#fff',
							}
						}
					},
					roam: false,
					itemStyle: {
						normal: {
							areaColor: '#323c48',
							borderColor: 'rgba(0,0,0,1)'
						},
						emphasis: {
							areaColor: 'rgba(0,0,0,1)'
						}
					}
				},
				series: [{
					name: '地点',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					zlevel: 1,
					rippleEffect: {
						brushType: 'stroke',
						period: 7,
						scale: 26
					},
					label: {
						normal: {
							show: false,
							position: 'right',
							formatter: '{b}'
						},
						emphasis: {
							show: true,
							position: 'right',
							formatter: '{b}'
						}
					},
					symbolSize: 10,
					showEffectOn: 'render',
					itemStyle: {
						normal: {
							color: '#61E3A1'
						}
					},
					data: allData.citys
				}, {
					name: '线路',
					type: 'lines',
					coordinateSystem: 'geo',
					zlevel: 2,
					large: true,
					effect: {
						show: true,
						constantSpeed: 50,
						symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
						symbolSize: 10,
						trailLength: 0,
					},
					lineStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#61E3A1'
							}, {
								offset: 1,
								color: '#61E3A1'
							}], false),
							width: 2,
							opacity: 0.6,
							curveness: 0.2
						}
					},
					data: allData.moveLines
				}]
			};
			myChart.clear();
			myChart.setOption(option, true);
		},
		//map2线图
		chart3: function() {
			var myChart = echarts.init(document.getElementById('containerLines1'));
			var allData = {
				citys: [],
				moveLines: []
			};
			var center = [101.267566, 37.021109];
			var fromList = [
				[90.501941, 35.905655],
				[93.546863, 40.699748],
				[97.546863, 35.699748],
				[97.546863, 33.699748],
				[109.546863, 33],
				[109.501941, 45.905655],
				//				[90,30],
				//				[80,40],
				//				[90, 40],
			]
			$.each(fromList, function(i, n) {

				allData.citys.push({
					value: n,
					symbolSize: 2,
					itemStyle: {
						"normal": {
							"color": "#61E3A1"
						}
					}
				});
				allData.moveLines.push({
					coords: [
						n,
						center
					]
				});
			});
			var option = {
				backgroundColor: '',
				grid: {
					top: 0,
					left: 0,
					right: 0,
					bottom: 0
				},
				legend: {
					show: false,
					orient: 'vertical',
					top: 'auto',
					left: 'right',
					data: ['地点', '线路'],
					textStyle: {
						color: '#fff'
					}
				},
				geo: {
					type: 'map',
					map: 'china',
					show: false,
					zoom: 2,
					label: {
						emphasis: {
							show: false,
							textStyle: {
								color: '#fff',
							}
						}
					},
					roam: false,
					itemStyle: {
						normal: {
							areaColor: '#323c48',
							borderColor: 'rgba(0,0,0,0)'
						},
						emphasis: {
							areaColor: 'rgba(0,0,0,0)'
						}
					}
				},
				series: [{
					name: '地点',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					zlevel: 1,
					rippleEffect: {
						brushType: 'stroke',
						period: 7,
						scale: 26
					},
					label: {
						normal: {
							show: false,
							position: 'right',
							formatter: '{b}'
						},
						emphasis: {
							show: true,
							position: 'right',
							formatter: '{b}'
						}
					},
					symbolSize: 10,
					showEffectOn: 'render',
					itemStyle: {
						normal: {
							color: '#61E3A1'
						}
					},
					data: allData.citys
				}, {
					name: '线路',
					type: 'lines',
					coordinateSystem: 'geo',
					zlevel: 2,
					large: true,
					effect: {
						show: true,
						constantSpeed: 50,
						symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
						symbolSize: 10,
						trailLength: 0,
					},
					lineStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#61E3A1'
							}, {
								offset: 1,
								color: '#61E3A1'
							}], false),
							width: 2,
							opacity: 0.6,
							curveness: 0.2
						}
					},
					data: allData.moveLines
				}]
			};
			myChart.clear();
			myChart.setOption(option, true);
		},
		//标点线图
		map1: function() {
			var positions = {
				"list": [{
						"Lng": 121.531065,
						"Lat": 31.224838
					},
					{
						"Lng": 121.510911,
						"Lat": 31.235356
					},
					{
						"Lng": 121.494032,
						"Lat": 31.160749
					},
					{
						"Lng": 121.524252,
						"Lat": 31.145129
					},
					{
						"Lng": 121.49816,
						"Lat": 31.118606
					}
				]
			}
			/*var positions = {"list": []}
			$.each(data,function(key,val){
			    if(val.stop.indexOf('园区') >= 0){
			    }else {
			        var arr = {
			            "Lng":val.lng,
			            "Lat":val.lat
			        }
			        positions.list.push(arr)
			    }
			});
			console.log(positions)*/
			//清除所有标记以及修改中心点和放大倍数
			$('#clearMakers').trigger('click');
			// center = [121.674673, 31.071349];
			center = [121.516688842, 31.182873852];
			zoom = 10;
			//通过该方法清空上次传入的轨迹
			if(funOp.pathSimplifierIns) {
				funOp.pathSimplifierIns.setData([]);
			}
			$('#setCenter').trigger('click');

			var images = ["../img/icon/icon-car-map-yellow.png", "../img/icon/icon-car-map-red.png", "../img/icon/icon-car-map-purple.png", "../img/icon/icon-car-map-blue.png", "../img/icon/icon-car-map-purple.png"]

			for(i = 0; i < images.length; i++) {
				var marker = new AMap.Marker({
					map: map,
					position: [positions.list[i].Lng, positions.list[i].Lat],
					icon: new AMap.Icon({
						size: new AMap.Size(80, 80), //图标大小
						imageSize: new AMap.Size(52 * scale, 55 * scale),
						image: images[i]
					})
				});
				makers.push(marker);
			}

			var marker = new AMap.Marker({
				map: map,
				position: [121.621156, 31.057613],
				icon: new AMap.Icon({
					size: new AMap.Size(80, 80), //图标大小
					imageSize: new AMap.Size(65 * scale, 47 * scale),
					image: "../img/icon/icon-car-map-dianxin.png"
				})
			});
			makers.push(marker);

			funOp.chart2();
		},
		//班车图片地图
		map2: function() {
			$('#clearMakers').trigger('click');
			center = [121.538149, 31.126156];
			zoom = 17;
			$('#setCenter').trigger('click');
			if(funOp.pathSimplifierIns) {
				//通过该方法清空上次传入的轨迹
				funOp.pathSimplifierIns.setData([]);
			}
		},

		map3: function(colorPoint, data, data1) {
			$('#clearMakers').trigger('click');
			if(funOp.pathSimplifierIns) {
				funOp.pathSimplifierIns.setData([]);
			}
			/*var positions = {
			    "list": [{
			        "Lng": 121.47924,
			        "Lat": 31.226719
			    },
			        {
			            "Lng": 121.47924,
			            "Lat": 31.226719
			        },
			        {
			            "Lng": 121.475292,
			            "Lat": 31.215856
			        },
			        {
			            "Lng": 121.463962,
			            "Lat": 31.219746
			        },
			        {
			            "Lng": 121.546115,
			            "Lat": 31.1048
			        }
			    ]
			}*/
			var positions = {
				"list": []
			};
			var path = [];
			var out = [];
			var out_car = [];
			var In = [];
			var In_car = [];
			$.each(data, function(key, val) {
				var arr = {
					"Lng": val.lng,
					"Lat": val.lat
				}
				positions.list.push(arr)
				var arr_lng_lat = []
				arr_lng_lat.push(val.lng)
				arr_lng_lat.push(val.lat)
				path.push(arr_lng_lat)
				if(val.direction == '进') {
					In.push(arr)
					In_car.push(val.licensePlate);
				} else if(val.direction == '出') {
					out.push(arr)
					out_car.push(val.licensePlate);
				}
			})

			$.each(data1, function(key, val) {
				if(val.direction == '1') {
					var dt = val.departureTime.split(' ');
					var rt = val.remainingTime.split('.');
					marker = new AMap.Marker({
						map: map,
						position: [121.537909, 31.12608],
						offset: new AMap.Pixel(50, -30), //相对于基点的偏移位置
						// content:'<div class="marker-route marker-marker-bus-from mapBoard">123</div>'
						content: '<div class="marker-route marker-marker-bus-from mapBoard"><div class="carTime" id="remainIn"><div class="carTimeDiv"><div class="carTimeTitle1"><span>下一辆班车</span></div><div class="doubleLines"></div></div><div class="carTimeTable"><div class="fourDiv greyRow"><span>发车时间</span></div><div class="fourDiv departureTime"><span>' + dt[0] + '</span></div><div class="fourDiv greyRow"><span>剩余时间</span></div><div class="fourDiv remainingTime"><span>' + rt[0] + '分钟</span></div></div></div></div>' //自定义点标记覆盖物内容
					});
				} else if(val.direction == '0') {
					var dt = val.departureTime.split(' ');
					var rt = val.remainingTime.split('.');
					marker = new AMap.Marker({
						map: map,
						position: [121.522807, 31.230952],
						offset: new AMap.Pixel(-200, 0), //相对于基点的偏移位置
						// content:'<div class="marker-route marker-marker-bus-from mapBoard">123</div>'
						content: '<div class="marker-route marker-marker-bus-from mapBoard"><div class="carTime" id="remainOut"><div class="carTimeDiv"><div class="carTimeTitle1"><span>下一辆班车</span></div><div class="doubleLines"></div></div><div class="carTimeTable"><div class="fourDiv greyRow"><span>发车时间</span></div><div class="fourDiv departureTime"><span>' + dt[0] + '</span></div><div class="fourDiv greyRow"><span>剩余时间</span></div><div class="fourDiv remainingTime"><span>' + rt[0] + '分钟</span></div></div></div></div>' //自定义点标记覆盖物内容
					});
				}
				makers.push(marker);
			})

			// $('#clearMakers').trigger('click');
			center = [121.538149, 31.126156];
			zoom = 10;
			$('#setCenter').trigger('click');
			// var images = ["../img/icon/icon-car-map-yellow.png","../img/icon/icon-car-map-cars"];
			var cars;
			var points;
			var lineColor;

			switch(colorPoint) {
				case "1":
					cars = "../img/icon/icon-car-map-cars-yellow.png";
					points = "../img/icon/icon-car-map-yellow.png";
					lineColor = 'rgba(242,255,106,.4)';
					break;
				case "2":
					cars = "../img/icon/icon-car-map-cars-purple.png";
					points = "../img/icon/icon-car-map-purple.png";
					lineColor = 'rgba(203,122,219,.4)';
					break;
				case "3":
					cars = "../img/icon/icon-car-map-cars-blue.png";
					points = "../img/icon/icon-car-map-blue.png";
					lineColor = 'rgba(80,247,255,.4)';
					break;
				case "4":
					cars = "../img/icon/icon-car-map-cars-red.png";
					points = "../img/icon/icon-car-map-red.png";
					lineColor = 'rgba(242,89,106,.4)';
					break;
			}
			/*var positions = {
			    "list": [{
			            "Lng": 121.47924,
			            "Lat": 31.226719
			        },
			        {
			            "Lng": 121.47924,
			            "Lat": 31.226719
			        },
			        {
			            "Lng": 121.475292,
			            "Lat": 31.215856
			        },
			        {
			            "Lng": 121.463962,
			            "Lat": 31.219746
			        },
			        {
			            "Lng": 121.546115,
			            "Lat": 31.1048
			        }
			    ]
			}*/

			var content2 = '<div class="carTime content3"><div class="carTimeDiv"><div class="carTimeTitle1"><span>下一辆班车</span></div><div class="doubleLines"></div></div><div class="carTimeTable"><div class="fourDiv greyRow"><span>发车时间</span></div><div class="fourDiv"><span>17:00</span></div><div class="fourDiv greyRow"><span>剩余时间</span></div><div class="fourDiv"><span>还有5分钟</span></div></div></div>'
			var content = '<div class="carBoard1"><div class="carTitle"><span>沪AD38E27</span></div><img class="carLine" src="../img/car-bg-map-line1.png"/></div>';
			var content1 = '<div class="carBoard2"><img class="carLine carLine1" src="../img/car-bg-map-line2.png"/><div class="carTitle carTitle1"><span>沪CH3V306</span></div></div>';

			makers.push(marker);
			marker = new AMap.Marker({
				map: map,
				position: [121.522807, 31.230952],
				icon: new AMap.Icon({
					size: new AMap.Size(80, 80), //图标大小
					imageSize: new AMap.Size(52 * scale, 55 * scale),
					image: "../img/icon/icon-car-map-yellow.png"
				})
			});
			makers.push(marker);

			if(out.length > 0) {
				for(i = 0; i < out.length; i++) {
					marker = new AMap.Marker({ //添加自定义点标记
						map: map,
						position: [out[i].Lng, out[i].Lat],
						offset: new AMap.Pixel(50, -30), //相对于基点的偏移位置
						content: '<div class="marker-route marker-marker-bus-from mapBoard"><div class="carBoard1"><div class="carTitle"><span>' + out_car[i] + '</span></div><img class="carLine" src="../img/car-bg-map-line1.png"/></div></div>' //自定义点标记覆盖物内容
					});
				}
			}
			makers.push(marker);
			if(In.length > 0) {
				for(i = 0; i < In.length; i++) {
					var marker = new AMap.Marker({
						map: map,
						position: [In[i].Lng, In[i].Lat],
						offset: new AMap.Pixel(-350, -100), //相对于基点的偏移位置
						// content:'<div class="marker-route marker-marker-bus-from mapBoard">123</div>'
						content: '<div class="marker-route marker-marker-bus-from mapBoard"><div class="carBoard2"><img class="carLine carLine1" src="../img/car-bg-map-line2.png"/><div class="carTitle carTitle1"><span>' + In_car[i] + '</span></div></div>' //自定义点标记覆盖物内容
					});
				}
			}
			makers.push(marker);

			/*marker = new AMap.Marker({ //添加自定义点标记
			    map: map,
			    position: [121.459842, 31.216736],
			    offset: new AMap.Pixel(350, 50), //相对于基点的偏移位置
			    content: '<div class="marker-route marker-marker-bus-from mapBoard">' + content + '</div>' //自定义点标记覆盖物内容
			});*/
			makers.push(marker);
			marker = new AMap.Marker({ //添加自定义点标记
				map: map,
				position: [121.537909, 31.12608],
				icon: new AMap.Icon({
					size: new AMap.Size(80, 80), //图标大小
					imageSize: new AMap.Size(65 * scale, 47 * scale),
					image: '../img/icon/icon-car-map-dianxin.png'
				})
			});
			makers.push(marker);
			if(positions.list.length > 0) {
				for(i = 0; i < positions.list.length; i++) {
					marker = new AMap.Marker({
						map: map,
						position: [positions.list[i].Lng, positions.list[i].Lat],
						icon: new AMap.Icon({
							size: new AMap.Size(80, 80), //图标大小
							imageSize: new AMap.Size(33 * scale, 35 * scale),
							image: "../img/icon/icon-car-map-cars-yellow.png"
						})
					})
					makers.push(marker);
				}
			}

			AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {
				if(!PathSimplifier.supportCanvas) {
					alert('当前环境不支持 Canvas！');
					return;
				}
				funOp.pathSimplifierIns = new PathSimplifier({
					zIndex: 100,
					//autoSetFitView:false,
					map: map, //所属的地图实例
					getPath: function(pathData, pathIndex) {
						return pathData.path;
					},
					getHoverTitle: function(pathData, pathIndex, pointIndex) {
						if(pointIndex >= 0) {
							//point
							return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
						}
						return pathData.name + '，点数量' + pathData.path.length;
					},
					renderOptions: {
						pathTolerance: 2,
						keyPointTolerance: 0,
						pathLineStyle: {
							lineWidth: 8,
							strokeStyle: lineColor,
							borderWidth: 0,
							borderStyle: lineColor,
							dirArrowStyle: false
						},
						pathLineHoverStyle: {
							lineWidth: 3,
							strokeStyle: lineColor,
							borderWidth: 1,
							borderStyle: '#cccccc',
							dirArrowStyle: false
						},
						pathLineSelectedStyle: {
							lineWidth: 8,
							strokeStyle: lineColor,
							borderWidth: 0,
							borderStyle: lineColor,
							dirArrowStyle: false
						},
						dirArrowStyle: {
							stepSpace: 100,
							strokeStyle: '#ffffff',
							lineWidth: 0
						},
						startPointStyle: {
							radius: 0,
							fillStyle: '#109618',
							lineWidth: 1,
							strokeStyle: '#eeeeee'
						},
						endPointStyle: {
							radius: 0,
							fillStyle: '#dc3912',
							lineWidth: 1,
							strokeStyle: '#eeeeee'
						},
						keyPointStyle: {
							radius: 0,
							fillStyle: 'rgba(8, 126, 196, 1)',
							lineWidth: 1,
							strokeStyle: '#eeeeee'
						},
						keyPointHoverStyle: {
							radius: 0,
							fillStyle: 'rgba(0, 0, 0, 0)',
							lineWidth: 2,
							strokeStyle: '#ffa500'
						},
						keyPointOnSelectedPathLineStyle: {
							radius: 0,
							fillStyle: 'rgba(8, 126, 196, 1)',
							lineWidth: 2,
							strokeStyle: '#eeeeee'
						}
					}
				});

				funOp.pathSimplifierIns = funOp.pathSimplifierIns;

				//设置数据
				funOp.pathSimplifierIns.setData([{
					name: '路线1',
					path: [
						[121.537909, 31.12608],
						[121.534818, 31.132422],
						[121.535313, 31.132552],
						[121.535805, 31.13268],
						[121.53578, 31.133872],
						[121.534347, 31.136452],
						[121.534142, 31.136855],
						[121.533935, 31.137255],
						[121.533727, 31.137658],
						[121.533708, 31.137698],
						[121.533522, 31.13806],
						[121.533502, 31.138102],
						[121.533315, 31.13846],
						[121.53311, 31.138863],
						[121.53309, 31.138905],
						[121.5327, 31.139683],
						[121.532493, 31.140093],
						[121.532288, 31.140505],
						[121.53043, 31.144192],
						[121.530215, 31.1446],
						[121.53011, 31.144805],
						[121.530002, 31.145007],
						[121.529958, 31.145263],
						[121.529875, 31.145307],
						[121.529792, 31.145418],
						[121.529577, 31.145827],
						[121.529425, 31.146147],
						[121.529363, 31.146235],
						[121.529152, 31.146643],
						[121.529135, 31.14669],
						[121.528938, 31.147052],
						[121.528785, 31.147252],
						[121.528723, 31.14746],
						[121.528513, 31.147868],
						[121.528352, 31.148073],
						[121.527648, 31.149352],
						[121.527255, 31.150068],
						[121.52709, 31.150502],
						[121.526458, 31.151272],
						[121.526157, 31.15183],
						[121.526048, 31.151852],
						[121.525913, 31.152222],
						[121.525605, 31.152468],
						[121.525672, 31.152617],
						[121.525427, 31.153007],
						[121.525182, 31.1534],
						[121.52493, 31.153408],
						[121.524938, 31.153792],
						[121.524685, 31.154177],
						[121.524407, 31.154555],
						[121.524007, 31.154715],
						[121.524133, 31.154932],
						[121.523993, 31.155125],
						[121.523855, 31.15531],
						[121.523207, 31.155825],
						[121.523442, 31.15588],
						[121.523167, 31.156258],
						[121.522888, 31.156635],
						[121.522613, 31.157013],
						[121.522277, 31.15713],
						[121.522335, 31.15739],
						[121.521093, 31.159093],
						[121.520813, 31.159472],
						[121.520018, 31.160613],
						[121.519738, 31.160705],
						[121.51984, 31.16076],
						[121.519755, 31.160997],
						[121.519488, 31.161377],
						[121.519225, 31.161758],
						[121.518813, 31.16209],
						[121.518997, 31.16215],
						[121.518665, 31.162292],
						[121.518772, 31.162543],
						[121.518225, 31.163047],
						[121.51776, 31.164092],
						[121.517497, 31.164852],
						[121.517243, 31.16554],
						[121.51696, 31.16628],
						[121.51674, 31.166815],
						[121.516935, 31.167077],
						[121.516608, 31.167172],
						[121.516783, 31.167488],
						[121.516632, 31.167897],
						[121.516338, 31.167982],
						[121.516482, 31.168307],
						[121.51633, 31.168717],
						[121.51618, 31.169127],
						[121.51593, 31.169163],
						[121.51604, 31.169555],
						[121.515902, 31.169985],
						[121.515763, 31.170413],
						[121.515427, 31.170648],
						[121.515625, 31.170843],
						[121.514872, 31.172257],
						[121.515133, 31.172342],
						[121.51498, 31.172758],
						[121.51441, 31.173718],
						[121.514252, 31.175047],
						[121.514508, 31.175055],
						[121.514493, 31.175482],
						[121.51448, 31.175907],
						[121.51425, 31.176075],
						[121.514475, 31.176332],
						[121.514305, 31.176718],
						[121.51456, 31.176752],
						[121.514322, 31.176925],
						[121.51465, 31.177173],
						[121.514372, 31.177177],
						[121.514788, 31.177602],
						[121.514932, 31.178027],
						[121.514643, 31.178143],
						[121.515077, 31.178455],
						[121.515222, 31.178883],
						[121.515218, 31.17956],
						[121.515685, 31.179972],
						[121.51578, 31.180368],
						[121.51595, 31.180793],
						[121.515763, 31.180905],
						[121.516242, 31.182113],
						[121.516797, 31.183042],
						[121.51675, 31.183367],
						[121.517002, 31.18341],
						[121.517217, 31.183797],
						[121.517163, 31.183827],
						[121.5173, 31.184673],
						[121.517717, 31.185727],
						[121.518133, 31.186747],
						[121.518627, 31.187988],
						[121.518883, 31.188222],
						[121.518967, 31.18843],
						[121.51913, 31.188848],
						[121.519463, 31.189247],
						[121.519297, 31.189268],
						[121.519158, 31.189302],
						[121.520393, 31.19235],
						[121.520877, 31.193557],
						[121.521105, 31.193867],
						[121.521268, 31.194288],
						[121.52143, 31.194708],
						[121.521647, 31.195485],
						[121.521722, 31.195627],
						[121.522005, 31.196155],
						[121.522048, 31.196385],
						[121.522172, 31.196565],
						[121.523082, 31.199072],
						[121.523235, 31.199222],
						[121.523458, 31.1996],
						[121.523688, 31.199977],
						[121.523882, 31.200285],
						[121.524488, 31.20136],
						[121.524615, 31.202557],
						[121.524935, 31.203672],
						[121.52504, 31.203848],
						[121.52511, 31.204082],
						[121.525647, 31.205505],
						[121.526257, 31.207138],
						[121.526897, 31.208748],
						[121.527342, 31.209752],
						[121.52746, 31.210102],
						[121.527843, 31.211013],
						[121.527913, 31.211207],
						[121.528093, 31.211643],
						[121.528177, 31.211855],
						[121.52826, 31.212063],
						[121.528347, 31.212275],
						[121.528925, 31.212855],
						[121.528908, 31.212975],
						[121.529108, 31.213618],
						[121.529193, 31.213797],
						[121.529008, 31.21416],
						[121.529535, 31.214727],
						[121.529415, 31.215213],
						[121.529623, 31.216705],
						[121.529938, 31.21698],
						[121.53009, 31.217452],
						[121.53086, 31.217508],
						[121.53081, 31.217527],
						[121.531268, 31.218598],
						[121.531505, 31.219455],
						[121.531733, 31.219847],
						[121.531097, 31.220218],
						[121.531802, 31.221693],
						[121.532525, 31.22301],
						[121.533252, 31.223848],
						[121.533393, 31.224363],
						[121.532768, 31.224768],
						[121.533218, 31.224798],
						[121.532442, 31.225093],
						[121.532307, 31.22514],
						[121.532307, 31.225448],
						[121.53166, 31.225508],
						[121.531683, 31.225833],
						[121.53131, 31.225868],
						[121.530727, 31.226077],
						[121.53088, 31.226118],
						[121.530232, 31.226497],
						[121.52965, 31.226702],
						[121.529802, 31.226747],
						[121.529375, 31.226997],
						[121.528685, 31.227235],
						[121.526018, 31.22739],
						[121.526518, 31.227507],
						[121.526355, 31.227843],
						[121.52761, 31.228027],
						[121.522807, 31.230952]
					]
				}]);

			});
		},

		//显示第1个地图
		showMap1: function() {
			$('.mapLines1').css('visibility', 'hidden');
			$('.content1').css('display', 'block');
			$('.content2').css('display', 'none');
			$('.content3').css('display', 'none');
			funOp.map1();
			page = 2;
			isMap3 = false;
		},
		//显示第2个地图
		showMap2: function() {
			$('.mapLines1').css('visibility', 'visible');
			$('.content1').css('display', 'none');
			$('.content2').css('display', 'block');
			$('.content3').css('display', 'none');
			funOp.map2();
			page = 3;
			isMap3 = false;
		},
		//显示第3个地图
		showMap3: function(color) {
			$('.mapLines1').css('visibility', 'hidden');
			$('.content1').css('display', 'none');
			$('.content2').css('display', 'none');
			$('.content3').css('display', 'block');
			funOp.map3('1', cardata['map2']['data']['runningBus'], cardata['map2']['data']['waitingBus']);
			// funOp.map3(color);
			page = 1;
			isMap3 = true;
		},
		//运行中班车数量
		busAmount: function(data) {
			$('#carNumber').html(data[0]["busNum"])
		},

		busRunningDetail: function(data) {
			$("#caroutdetail .con-middle-right-title").empty();
			$("#carindetail .con-middle-right-title").empty();
			$("#caroutclock").empty();
			$("#carinclock").empty();
			$("#caroutnextbus tbody").empty();
			$("#carinnextbus tbody").empty();
			var outhtml = "";
			$.each(data["out"]["stop"], function(i, n) {
				n["time"] = (n["time"] == -1 ? 0 : n["time"]);
				if(i === 0) {
					outhtml = "<div class='titleLeft'>" +
						"<div class='bigTitle'><span title='" + n["name"] + "'>" + n["name"] + "</span></div>" +
						"<div class='smallTitle'><span>还有" + n["time"] + "分钟</span></div>" +
						"</div>";
				} else if(i === data["out"]["stop"].length - 1) {
					outhtml += "<div class='titleRight'>" +
						"<div class='roadBroad roadBroad1'><span title='" + n["name"] + "'>" + n["name"] + "</span></div>" +
						"<div class='smallTitle'><span>还有" + n["time"] + "分钟</span></div>" +
						"</div>";
				} else {
					outhtml += "<div class='titleMiddle'>" +
						"<div class='roadBroad'><span title='" + n["name"] + "'>" + n["name"] + "</span></div>" +
						"<div class='smallTitle'><span>还有" + n["time"] + "分钟</span></div>" +
						"</div>";
				}
			});
			$("#caroutdetail .con-middle-right-title").html(outhtml);

			outhtml = "";
			$.each(data["out"]["timeTable"], function(i, n) {
				if(n["go"] == "Y") {
					if(i === data["out"]["timeTable"].length - 1) {
						outhtml += "<div class='con-middle-right-progressDiv stationPass lastOneDiv'><span>" + n["time"] + "</span></div>";
					} else {
						outhtml += "<div class='con-middle-right-progressDiv stationPass'><span>" + n["time"] + "</span></div>" +
							"<div class='con-middle-right-progressLine'></div>";
					}
				}
				if(n["go"] == "N") {
					if(i === data["out"]["timeTable"].length - 1) {
						outhtml += "<div class='con-middle-right-progressDiv lastOneDiv'><span>" + n["time"] + "</span></div>";
					} else {
						outhtml += "<div class='con-middle-right-progressDiv'><span>" + n["time"] + "</span></div>" +
							"<div class='con-middle-right-progressLine'></div>";
					}
				}
			});
			$("#caroutclock").html(outhtml);

			outhtml = "";
			$.each(data["out"]["busOut"], function(i, n) {
				outhtml += "<tr>" +
					"<td><span>" + n["startDate"] + "</span></td>" +
					"<td><span>" + n["timeTable"] + "</span></td>" +
					"<td><span>" + n["plateNumber"] + "</span></td>";
				if(n["speed"] != "") {
					outhtml += "<td><span>" + n["speed"] + "码</span></td>";
				} else {
					outhtml += "<td><span></span></td>";
				}
				outhtml += "<td><span>" + n["nextStopDate"] + "</span></td>" +
					"<td><span>" + n["nextStopName"] + "</span></td>" +
					"</tr>";
			});
			$("#caroutnextbus tbody").html(outhtml);

			var inhtml = "";
			$.each(data["in"]["stop"], function(i, n) {
				n["time"] = (n["time"] == -1 ? 0 : n["time"]);
				if(i === 0) {
					inhtml = "<div class='titleLeft'>" +
						"<div class='bigTitle'><span title='" + n["name"] + "'>" + n["name"] + "</span></div>" +
						"<div class='smallTitle'><span>还有" + n["time"] + "分钟</span></div>" +
						"</div>";
				} else if(i === data["in"]["stop"].length - 1) {
					inhtml += "<div class='titleRight'>" +
						"<div class='roadBroad roadBroad1'><span title='" + n["name"] + "'>" + n["name"] + "</span></div>" +
						"<div class='smallTitle'><span>还有" + n["time"] + "分钟</span></div>" +
						"</div>";
				} else {
					inhtml += "<div class='titleMiddle'>" +
						"<div class='roadBroad'><span title='" + n["name"] + "'>" + n["name"] + "</span></div>" +
						"<div class='smallTitle'><span>还有" + n["time"] + "分钟</span></div>" +
						"</div>";
				}
			});
			$("#carindetail .con-middle-right-title").html(inhtml);

			inhtml = "";
			$.each(data["in"]["timeTable"], function(i, n) {
				if(n["go"] == "Y") {
					if(i === data["in"]["timeTable"].length - 1) {
						inhtml += "<div class='con-middle-right-progressDiv stationPass lastOneDiv'><span>" + n["time"] + "</span></div>";
					} else {
						inhtml += "<div class='con-middle-right-progressDiv stationPass'><span>" + n["time"] + "</span></div>" +
							"<div class='con-middle-right-progressLine'></div>";
					}
				}
				if(n["go"] == "N") {
					if(i === data["in"]["timeTable"].length - 1) {
						inhtml += "<div class='con-middle-right-progressDiv lastOneDiv'><span>" + n["time"] + "</span></div>";
					} else {
						inhtml += "<div class='con-middle-right-progressDiv'><span>" + n["time"] + "</span></div>" +
							"<div class='con-middle-right-progressLine'></div>";
					}
				}
			});
			$("#carinclock").html(inhtml);

			inhtml = "";
			$.each(data["in"]["busIn"], function(i, n) {
				inhtml += "<tr>" +
					"<td><span>" + n["startDate"] + "</span></td>" +
					"<td><span>" + n["timeTable"] + "</span></td>" +
					"<td><span>" + n["plateNumber"] + "</span></td>";
				if(n["speed"] != "") {
					inhtml += "<td><span>" + n["speed"] + "码</span></td>";
				} else {
					inhtml += "<td><span></span></td>";
				}
				inhtml += "<td><span>" + n["nextStopDate"] + "</span></td>" +
					"<td><span>" + n["nextStopName"] + "</span></td>" +
					"</tr>";
			});
			$("#carinnextbus tbody").html(inhtml);

		},
		map3Check: function() {
			funOp.map3('1', cardata['map2']['data']['runningBus'], cardata['map2']['data']['waitingBus']);
		}

	};

}));