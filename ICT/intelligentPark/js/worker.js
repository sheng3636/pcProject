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
			map = {};
			center = [121.674673, 31.071349];
			makers = [];
			zoom = 10;
			pathSimplifierIns = [];
			buildState = {};
			cardata = {};
			funOp.eventInit();
			funOp.dataInit();
		},
		chart: {},
		eventInit: function() {
			$("#dd1").click(function() {
				$("#breakfast").show();
				$("#lunch").hide();
				$("#dinner").hide();
				$("#meals").find(".type2").show();
				$(".table-title1").find("p").text("早餐");
				$("#meals_time").text("7:15-8:30");
				$(".table-title2").hide();
			});
			$("#dd2").click(function() {
				$("#breakfast").hide();
				$("#lunch").show();
				$("#dinner").hide();
				$("#meals").find(".type2").show();
				$(".table-title1").find("p").text("午餐");
				$("#meals_time").text("11:00-13:00");
				$(".table-title2").find("span").eq(2).show();
				$(".table-title2").find("span").eq(3).show();
				$(".table-title2").show();
			});
			$("#dd3").click(function() {
				$("#breakfast").hide();
				$("#lunch").hide();
				$("#dinner").show();
				$("#meals").find(".type2").show();
				$(".table-title1").find("p").text("晚餐");
				$("#meals_time").text("16:30-18:00");
				$(".table-title2").find("span").eq(2).hide();
				$(".table-title2").find("span").eq(3).hide();
				$(".table-title2").show();
			});
			$(".meals_fun").click(function() {
				$("#meals").find(".type2").show();
				$("#meals").find(".type2").not($("#meals").find("." + $(this).attr("name"))).hide();
			});
			//班车地图
			map = new AMap.Map('container', {
				center: center,
				zoom: zoom,
				mapStyle: 'amap://styles/1c43924dda0fec68cd079890e61c3c55',
				zoomEnable: false,
				dragEnable: false,
				resizeEnable: false
			});

			//切换下一个
			$("#parkCountBtnNext").click(function(e) {
				$(".con-top-right-2").last().after($(".con-top-right-2").first().prop("outerHTML"));
				$(".con-top-right-2").first().remove();
			});
		},
		dataInit: function() {
			//食堂
			$.getJSON("../data/canteenStatic.json", function(data){
				funOp.humanNum(data.index.data["peoplec"]);
				funOp.infoInit(data.index.data["message"]);
				funOp.areaLine(data.index.data["peopleFlowTime"]);
				funOp.mealsInit(data.index.data["meals"]);
			});
			
			//运行中班车数量
			$.getJSON("../data/carStatic.json", function(data) {
				var cardatastr = JSON.stringify(data);
				cardata = JSON.parse(cardatastr);
				funOp.busAmount(data['index']['data']['busAmount']);
				funOp.busRunningDetail(data['running']['data']);
				funOp.showMap3("1");
			});

			//园区公共信息
			$.getJSON("../data/workerStatic.json", function(data) {
				funOp.publicInfo(data["publicInfo"]["data"]);
			});

			//车辆管理-停车比例
			var packstr = "";
			$.getJSON("../data/parkStatic.json", function(data) {
				var parkingTotalByBuildingData1 = data.index.data["parkingTotalByBuilding"];
				$.each(data.freeCount.data["status"], function(i, n) {
					if(n["status"] == 1) {
						packstr += n["parkingNo"] + ","
					}
				});
				if(packstr.length > 0) {
					packstr = packstr.substr(0, packstr.length - 1);
				}
				var parkData = funOp.checkParkingTotal(parkingTotalByBuildingData1, data["freeCount"]["data"]["statistics"]);

				if(parkData) {
					funOp.parkingTotalByBuilding(parkData);
				}
				//			1，没有数据；2，一般 50~80；3，拥挤80~；4，空闲~50
				var objdata = {
					b1state: buildState["B1"],
					b3state: buildState["B3"],
					b4state: buildState["B4"],
					b6state: buildState["B6"],
					packstr: packstr
				}
				funOp.mapInit(objdata);
			});
		},
		mapInit: function(obj) {
			//			1，没有数据；2，一般 50~80；3，拥挤80~；4，空闲~50
			var param = {
				direct: 1,
				bearing: 1,
				options: 1,
				mapZoom: 14.76049725550672,
				mapCenter: [121.5343901512083, 31.12746385795093],
				mapOpacityZoom: 13.003436315165965,
				mapBearing: 0,
				mapPitch: 42.00000000000002,
				type: 4,
				showIcon: "0",
				bigParkData: "{'1C-2A':'" + obj.b1state + "','2A-2B':'" + obj.b3state + "','3-4':'" + obj.b4state + "','6-7':'" + obj.b6state + "'}",
				parks: obj.packstr,
				hideParkOutLineId: "12A-24A,24A-24B,13B-14B,14A-25"

			};
			$.fn.commUtil.mapInit("map", param);
		},
		//当前人数
		humanNum: function(data) {
			if(!data || data.length <= 0) {
				return;
			}
			var canteen = data["canteen"];
			var southSum = 0;
			var southPercent = 0;
			var southColor = "";
			var southInSum = 0;
			var southOutSum = 0;
			var northSum = 0;
			var northPercent = 0;
			var northColor = "";
			var northInSum = 0;
			var northOutSum = 0;
			$.each(canteen, function(key, value) {
				// 新加出现负数就为0
				if((value["in"] - value["out"]) < 0) {
					value["in"] = value["out"];
				}
				switch(value["name"]) {
					case "大食堂":
						southSum += (value["in"] - value["out"]);
						southInSum += value["in"];
						southOutSum += value["out"];
						//						southSum += (value["out"] - value["out"] + 10);
						break;
					case "小食堂":
						northSum += (value["in"] - value["out"]);
						northInSum += value["in"];
						northOutSum += value["out"];
						//						northSum += (value["out"] - value["out"] + 8);
						break;
				}
			});
			$("#south").find(".tboxl-info span").text(southSum);
			$("#north").find(".tboxl-info span").text(northSum);
			//旁边的柱子------------开始
			southPercent = Math.round(southSum / 1000 * 100);
			northPercent = Math.round(northSum / 400 * 100);

			$("#south").find(".mtext").text(southPercent + "%");
			$("#north").find(".maxtext").text(northPercent + "%");
			if(southPercent <= 60) {
				southColor = "blue";
			} else if(southPercent <= 90) {
				southColor = "green";
			} else {
				southColor = "orange";
			}
			if(northPercent <= 60) {
				northColor = "blue";
			} else if(northPercent <= 90) {
				northColor = "green";
			} else {
				northColor = "orange";
			}
			$("#south").find(".con-left-tboxr").addClass("coniconbg-" + southColor);
			$("#north").find(".con-left-tboxr").addClass("coniconbg-" + northColor);
			$("#south").find(".mtext").addClass("text-" + southColor);
			$("#north").find(".maxtext").addClass("text-" + northColor);
			$("#south").find(".mtext + div").replaceWith("<div class='timebox timebox-" + southColor + "'><span class='timeicon-" + southColor + "' style='height: " + southPercent * 0.78 + "%;'></span></div>");
			$("#north").find(".maxtext + div").replaceWith("<div class='timebox timebox-" + northColor + "'><span class='timeicon-" + northColor + "' style='height: " + northPercent * 0.78 + "%;'></span></div>")
			//旁边的柱子------------结束

			//后期修改为南食堂加北食堂
			data["in"] = southInSum + northInSum;
			data["out"] = southOutSum + northOutSum;
			var sum = data["in"] - data["out"];

			if(sum < 0) {
				sum = '-- '
			}

			var myChart = echarts.init(document.getElementById("humanNum"));
			var option = {
				series: [{
						name: '刻度',
						type: 'gauge',
						radius: '90%',
						min: 0,
						max: 1000,
						splitNumber: 5, //刻度数量
						startAngle: 220,
						endAngle: -40,
						//仪表盘轴线
						axisLine: {
							show: false,
							lineStyle: {
								width: 1,
								color: [
									[
										0.98, new echarts.graphic.LinearGradient(
											0, 0, 1, 0, [{
													offset: 1,
													color: '#7F4899'
												},
												{
													offset: 0,
													color: '#2CB4EA'
												}
											]
										)
									],
									[
										1, '#222e7d'
									]
								]
							}
						},
						//刻度标签。
						axisLabel: {
							show: false,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#108EE4'
							}, {
								offset: 1,
								color: '#21DEFE'
							}], false),
							distance: 30
						},
						//刻度样式
						axisTick: {
							show: true,
							lineStyle: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#108EE4'
								}, {
									offset: 1,
									color: '#21DEFE'
								}], false),
								width: 2
							},
							length: -5
						},
						//分隔线样式
						splitLine: {
							show: true,
							length: -10,
							lineStyle: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#108EE4'
								}, {
									offset: 1,
									color: '#21DEFE'
								}], false),
							}
						},
						detail: {
							offsetCenter: [
								0, '10%'
							], // x, y，单位px
							textStyle: {
								fontWeight: 400,
								color: '#fff',
								fontSize: 60
							},
							formatter: sum + ""
						},
						pointer: {
							show: false,
							data: sum
						}
					},
					{
						type: 'gauge',
						radius: '80%',
						center: ['50%', '50%'],
						splitNumber: 0, //刻度数量
						startAngle: 220,
						endAngle: -40,
						axisLine: {
							show: true,
							lineStyle: {
								width: 10,
								color: [
									[
										0.98, new echarts.graphic.LinearGradient(
											0, 0, 1, 0, [{
													offset: 1,
													color: '#7F4899'
												},
												{
													offset: 0,
													color: '#2CB4EA'
												}
											]
										)
									],
									[
										1, '#222e7d'
									]
								]
							}
						},
						//分隔线样式。
						splitLine: {
							show: false,
						},
						axisLabel: {
							show: false
						},
						axisTick: {
							show: false
						},
						pointer: {
							show: false
						},
						title: {
							show: true,
							offsetCenter: [0, '-20%'], // x, y，单位px
							textStyle: {
								color: '#ddd',
								fontSize: 20
							}
						},
						//仪表盘详情，用于显示数据。
						detail: {
							show: true,
							offsetCenter: [0, -40],
							color: '#9CD5DE',
							formatter: '当前人数',
							textStyle: {
								fontSize: scale * 30
							}
						}
					}
				]
			};
			myChart.setOption(option);
		},
		//优惠信息
		infoInit: function(data) {
			if(!(data instanceof Array) || data.length <= 0) {
				data = [
					"· 本周一（6月3日），瑞海进口食品凭员工卡购买8.5折，现场试吃!",
					"· 本周二（6月4日），海飞丝无硅油洗发水买三送一，更有现场好礼！"
				];
			}
			$.each(data, function(i, n) {
				$("#info").append("<p>" + n + "</p>");
			})
		},
		//面积图
		areaLine: function(data) {
			var xList = [];
			var today = [];
			var forecast = [];
			var now = new Date().getHours();
			$.each(data, function(i, n) {
				if(now > new Date(n["date"]).getHours()) {
					today.push(n["past"]);
					xList.push(new Date(n["date"]).getHours());
				}
				forecast.push(n["forecast"]);
				
			});
			var myChart = echarts.init(document.getElementById("arealine"));
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
					itemWidth: scale * 16,
					itemHeight: scale * 20,
					itemGap: scale * 5,
					orient: 'horizontal',
					top: "2%",
					left: 'center',
					data: [{
							name: '当前',
							textStyle: {
								fontSize: scale * 11,
								color: '#95BBC1'
							},
							icon: 'image://../img/icon/icon-cateen-arealine-blue.png',
						}
						//					,
						//						{
						//							name: '预测',
						//							textStyle: {
						//								fontSize: scale * 11,
						//								color: '#95BBC1'
						//							},
						//							icon: 'image://../img/icon/icon-cateen-arealine-purple.png',
						//						}
					]
				},
				grid: {
					left: '0%',
					right: '0%',
					bottom: '4%',
					top: '5%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: xList,
					axisLabel: {
						show: true,
						color: 'rgba(45,180,158,0.8)',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "rgba(45,180,158,0.8)",
						}
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
					},
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						show: false,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: false,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisTick: {
						show: true,
						color: "rgba(193,193,198,0.8)",
					},
					splitLine: {
						show: false
					}
				},
				series: [{
						name: '当前',
						type: 'line',
						smooth: true, //这句就是让曲线变平滑的
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 1,
									color: 'rgba(123, 134, 128, 0)'
								}, {
									offset: 0,
									color: 'rgba(64, 166, 255, .7)'
								}], false),
								// shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowBlur: 10
							}
						},
						lineStyle: {
							normal: {
								color: '#37A3D4',
							}
						},
						itemStyle: {
							opacity: 0,
						},
						data: today
					}
					//				,
					//					{
					//						name: '预测',
					//						type: 'line',
					//						smooth: true, //这句就是让曲线变平滑的
					//						lineStyle: {
					//							normal: {
					//								opacity: 1,
					//								type: 'dashed',
					//								color: '#6D3BF1'
					//							}
					//						},
					//						itemStyle: {
					//							opacity: 0,
					//						},
					//						data: forecast
					//					},
				]
			};
			myChart.setOption(option);
		},
		mealsInit: function(data) {
			var typeList = {
				"基础套餐": "meal_t1",
				"自选菜": "meal_t2",
				"花式窗口": "meal_t3",
				"特色面食": "meal_t4"
			}
			$.each(data, function(i, n) {
				setTable(n["type"], n);
			})

			if(new Date().getHours() < 9 || new Date().getHours() >= 18) {
				$(".table-title1").find("p").text("早餐");
				$(".table-title2").hide();
				$("#breakfast").show();
				$("#meals_time").text("7:15-8:30");
			} else if(new Date().getHours() < 13) {
				$(".table-title1").find("p").text("午餐");
				$(".table-title2").show();
				$("#lunch").show();
				$("#meals_time").text("11:00-13:00");
			} else if(new Date().getHours() < 18) {
				$(".table-title1").find("p").text("晚餐");
				$(".table-title2").show();
				$("#dinner").show();
				$(".table-title2").find("span").eq(2).hide();
				$(".table-title2").find("span").eq(3).hide();
				$(".table-title2").show()
				$("#meals_time").text("16:30-18:00");
			}

			function setTable(id, data) {
				$("#" + id).append(
					"<tr class='type2 " + typeList[data["type2"]] + "'>" +
					"<td>" + data["name"] + "</td>" +
					"<td>" + data["price"] + "</td>" +
					"<td>" + data["like"] + "</td>" +
					"<td>" + data["unlike"] + "</td>" +
					"<td>" +
					"<i src='http://" + data["imgUrl"] + "'></i> " +
					"</td>" +
					"</tr>"
				);
			}

			$("#meals").find("i").parent().hover(
				function() {
					$("#meals").parent().find("img").eq(0).attr("src", $(this).find("i").attr("src"));
					$("#meals").parent().find("img").show();
				},
				function() {
					$("#meals").parent().find("img").hide();
				}
			);
		},
		//班车地图
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
						offset: new AMap.Pixel(188, -60), //相对于基点的偏移位置
						// content:'<div class="marker-route marker-marker-bus-from mapBoard">123</div>'
						content: '<div class="marker-route marker-marker-bus-from mapBoard"><div class="carTime" id="remainIn"><div class="carTimeDiv"><div class="carTimeTitle1"><span>下一辆班车</span></div><div class="doubleLines"></div></div><div class="carTimeTable"><div class="fourDiv greyRow"><span>发车时间</span></div><div class="fourDiv departureTime"><span>' + dt[0] + '</span></div><div class="fourDiv greyRow"><span>剩余时间</span></div><div class="fourDiv remainingTime"><span>' + rt[0] + '分钟</span></div></div></div></div>' //自定义点标记覆盖物内容
					});
				} else if(val.direction == '0') {
					var dt = val.departureTime.split(' ');
					var rt = val.remainingTime.split('.');
					marker = new AMap.Marker({
						map: map,
						position: [121.522807, 31.230952],
						offset: new AMap.Pixel(-378, -20), //相对于基点的偏移位置
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
						offset: new AMap.Pixel(50, -40), //相对于基点的偏移位置
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
						offset: new AMap.Pixel(-420, -100), //相对于基点的偏移位置
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
		//显示第3个地图
		showMap3: function(color) {
			$('.mapLines1').css('visibility', 'hidden');
			$('.content1').css('display', 'none');
			$('.content2').css('display', 'none');
			$('.content3').css('display', 'block');
			funOp.map3('1', cardata['map2']['data']['runningBus'], cardata['map2']['data']['waitingBus']);
			isMap3 = true;
		},
		//		车辆管理-停车
		checkParkingTotal: function(data1, data2) { //data2 少数据为主
			var data = {};
			$.each(data1, function(i, n) {
				buildState[n["name"]] = 1;
				data[n["name"]] = n;
			})
			//验证data2，替换data
			$.each(data2, function(i, n) {
				var name = n["name"];
				var undergroundPercent = n["undergroundPercent"];
				var undergroundResidual = n["undergroundResidual"];
				var undergroundTotal = n["undergroundTotal"];
				if(undergroundPercent == "" || undergroundPercent < -10 || undergroundPercent > 150) {
					return true;
				}
				if(undergroundPercent < 0) {
					undergroundResidual = n["undergroundTotal"];
					undergroundPercent = 0;
				}
				if(undergroundPercent > 100) {
					undergroundResidual = 0;
					undergroundPercent = 100;
				}
				data[name]["undergroundPercent"] = undergroundPercent;
				data[name]["undergroundResidual"] = undergroundResidual;
				data[name]["undergroundTotal"] = undergroundTotal;
			})

			$.each(data, function(key, value) {

				var undergroundPercent = value["undergroundPercent"];
				var undergroundResidual = value["undergroundResidual"];
				var overgroundPercent = value["overgroundPercent"];
				var overgroundResidual = value["overgroundResidual"];
				//				var flag = true;
				if(!$.fn.commUtil.isRealNum(undergroundPercent) || undergroundPercent == "" || undergroundPercent < -10 || undergroundPercent > 150) {
					data[key]["undergroundPercent"] = "";
					data[key]["undergroundResidual"] = "";
					data[key]["undergroundTotal"] = "";
					//					flag = false;
				}
				if(!$.fn.commUtil.isRealNum(overgroundPercent) || overgroundPercent == "" || overgroundPercent < -10 || overgroundPercent > 150) {
					data[key]["overgroundPercent"] = "";
					data[key]["overgroundResidual"] = "";
					data[key]["overgroundTotal"] = "";
					//					flag = false;
				}
				//				if(!flag) {
				//					return true;
				//				}

				var undergroundPercent = value["undergroundPercent"];
				var undergroundResidual = value["undergroundResidual"];
				var overgroundPercent = value["overgroundPercent"];
				var overgroundResidual = value["overgroundResidual"];

				if(undergroundPercent < 0 && undergroundPercent >= -10) {
					undergroundResidual = value["undergroundTotal"];
					undergroundPercent = 0;
				}
				if(undergroundPercent <= 150 && undergroundPercent > 100) {
					undergroundResidual = 0;
					undergroundPercent = 100;
				}
				if(overgroundPercent < 0 && overgroundPercent >= -10) {
					overgroundResidual = value["overgroundTotal"];
					overgroundPercent = 0;
				}
				if(overgroundPercent <= 150 && overgroundPercent > 100) {
					overgroundResidual = 0;
					overgroundPercent = 100;
				}
				//		1，没有数据；2，一般 50~80；3，拥挤80~；4，空闲~50
				var buildPercent = undergroundPercent / 100;
				if(undergroundPercent == "") {
					return true;
				}
				if(buildPercent >= 0.8) {
					buildState[value["name"]] = 3;
				} else if(buildPercent <= 0.5) {
					buildState[value["name"]] = 4;
				} else if(buildPercent > 0.5 && buildPercent < 0.8) {
					buildState[value["name"]] = 2;
				}
			})
			return data;

		},

		parkingTotalByBuilding: function(data) {
			console.info(data);
			var total = 0;
			var free = 0;
			var totalPercent = 0;
			$.each(data, function(key, value) {
				if(value == "") {
					return true;
				}
				$(".data-" + value["name"]).find("#underCount").text(value["undergroundResidual"]);
				$(".data-" + value["name"] + " .undercubedata").css("top", (100 - Math.round(value["undergroundPercent"] * 100) / 100) + "%");
				$(".data-" + value["name"] + " .underheight").css("height", Math.round(value["undergroundPercent"] * 100) / 100 + "%");
				$(".data-" + value["name"]).find("#innerCount").text(value["overgroundResidual"]);
				$(".data-" + value["name"] + " .innercubedata").css("top", (100 - Math.round(value["overgroundPercent"] * 100) / 100) + "%");
				$(".data-" + value["name"] + " .innerheight").css("height", Math.round(value["overgroundPercent"] * 100) / 100 + "%");

				total += (value["undergroundTotal"] * 1.0);
				free += (value["undergroundResidual"] * 1.0);
				total += (value["overgroundTotal"] * 1.0);
				free += (value["overgroundResidual"] * 1.0);
				//				if(n["name"] == "B4") {
				//					$(".data-B4").find("#innerCount").text(n["overgroundResidual"]);
				//					$(".data-B4 .innercubedata").css("top", (1 - Math.round(n["percent"] * 100) / 100) * 100 + "%");
				//					$(".data-B4 .innerheight").css("height", Math.round(n["percent"] * 100) + "%");
				//				}
			});
			totalPercent = ((total - free) * 1.0) / total;
			$("#parkcarpercent").html(Math.round(totalPercent * 100) + "<em>%</em>")
		},
		//园区公共信息
		publicInfo: function(data) {
			$("#workerPublicinfo").empty();
			var html = "";
			$.each(data, function(i, n) {
				var conlen = 0;
				html += '<div class="con-bottom-left-info">' +
					'<div class="con-img-box">';
				if(n["imageUrl"] != "") {
					html += '<img src="' + n["imageUrl"] + '" /> </div>';
				}
				html += '<ul><li title="' + n["title"] + '">' + n["title"] + '</li>';
				if(n["startTime"] != "") {
					var time = n["startTime"].substring(5, n["startTime"].length - 3);
					if(n["endTime"] != "") {
						time += " - " + n["endTime"].substring(5, n["endTime"].length - 3);
					}
					html += '<li title="时间：' + time + '">时间：' + time + '</li>';
					conlen++;
				}
				if(n["content"] != "") {
					html += '<li title="内容：' + n["content"] + '">内容：' + n["content"] + '</li>';
					conlen++;
				}
				if(n["address"] != "") {
					html += '<li title="地点：' + n["address"] + '">地点：' + n["address"] + '</li>';
					conlen++;
				}
				if(n["registrationType"] != "") {
					html += '<li title="报名：' + n["registrationType"] + '">报名：' + n["registrationType"] + '</li>';
					conlen++;
				}
				if(conlen < 4 && n["remark"] != "") {
					html += '<li title="备注：' + n["remark"] + '">备注：' + n["remark"] + '</li>';
				}
				html += '</ul></div>';
			});
			$("#workerPublicinfo").append(html);
		}
	};
}));