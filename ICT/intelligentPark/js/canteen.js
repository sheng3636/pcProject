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
			funOp.eventInit();
			funOp.dataInit();
		},
		chart: {},
		//事件绑定初始化
		eventInit: function() {
			$(".video-change").click(function() {
				$(".con_bc-topr").removeClass("active");
				var dataid = $(this).attr("data");
				var img = "<img src='../img/static/image/canteen/nanshitang009.png'/>";
				switch(dataid + "") {
					case "1":
						$(".con_bc-topr").eq(0).addClass("active");
						img = "<img src='../img/static/image/canteen/nanshitang009.png'/>";
						break;
					case "2":
						$(".con_bc-topr").eq(1).addClass("active");
						img = "<img src='../img/static/image/canteen/beishitang010.png'/>";
						break;
				}
//				$.fn.commUtil.playerInit('shitangplayer', obj);
				$("#shitangplayer").empty();
				$("#shitangplayer").append(img);
			});

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
			})

			//图片消失
			//			function vanishImg(){
			//				var img = document.getElementById("image");
			//				img.style.display = "none";
			//			}
		},

		dataInit: function() {
			var img = "<img src='../img/static/image/canteen/nanshitang009.png'/>";
			$("#shitangplayer").empty();
			$("#shitangplayer").append(img);
//			$.fn.commUtil.playerInit('shitangplayer', obj);

			$.getJSON("../data/canteenStatic.json", function(data){
				funOp.humanNum(data.index.data["peoplec"]);
				funOp.infoInit(data.index.data["message"]);
				funOp.humanFlow(data.index.data["peopleFlowDate"]);
				funOp.areaLine(data.index.data["peopleFlowTime"]);
				funOp.favoriteFood(data.index.data["foodTop5"]);
				funOp.mealsInit(data.index.data["meals"]);
			});
		},

		//当前人数
		humanNum: function(data) {
			if(!data || data.length <= 0) {
				return;
			}
			//			function getHtmlModel (data,num){
			//				var htmlModel = "<div class='text_top'>" +
			//									"<p><span>"+ data["door"] +"</span><i></i></p>" +
			//									"<div class='text_bottombox'>" +
			//										"<p><span>进</span><span>"+ (data["out"] + num) +"</span></p>" +
			//										"<p><span>出</span><span>"+ data["out"] +"</span></p>" +
			//									"</div>" +
			//								"</div>";
			//				return htmlModel;
			//			}
			function getHtmlModel(data) {
				var htmlModel = "<div class='text_top'>" +
					"<p><span>" + data["door"] + "</span><i></i></p>" +
					"<div class='text_bottombox'>" +
					"<p><span>进</span><span>" + data["in"] + "</span></p>" +
					"<p><span>出</span><span>" + data["out"] + "</span></p>" +
					"</div>" +
					"</div>";
				return htmlModel;
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
						$("#south .con-left-tboxl").append(getHtmlModel(value));
						southSum += (value["in"] - value["out"]);
						southInSum += value["in"];
						southOutSum += value["out"];
						//						southSum += (value["out"] - value["out"] + 10);
						break;
					case "小食堂":
						$("#north .con-left-tboxl").append(getHtmlModel(value));
						northSum += (value["in"] - value["out"]);
						northInSum += value["in"];
						northOutSum += value["out"];
						//						northSum += (value["out"] - value["out"] + 8);
						break;
				}
			});
			
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
			
//			var sum = data["in"] - data["out"];
			//后期修改为南食堂加北食堂
			data["in"] = southInSum + northInSum;
			data["out"] = southOutSum + northOutSum;
			var sum = data["in"] - data["out"];

			if(sum < 0) {
				sum = '-- '
				
			}
			console.log(sum)
			$("#sum_in").html("<i>进</i>" + data["in"])
			$("#sum_out").html("<i>出</i>" + data["out"])
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
								fontSize: 30
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
							offsetCenter: [0, -20],
							color: '#9CD5DE',
							formatter: '当前人数',
							textStyle: {
								fontSize: scale * 20
							}
						}
					}
				]
			};
			myChart.setOption(option);
		},

		//人流分析
		humanFlow: function(data) {
			var dateList = [];
			var today = [];
			var forecast = [];
			//			var date = new Date(new Date().Format("yyyy-MM-dd") + " 00:00:00");
			var date = new Date();
			$.each(data, function(i, n) {
				if(date > new Date(n["date"])) {
					today.push(n["past"]);
				} else {
					today.push(" ");
				}
				forecast.push(n["forecast"]);
			});
//			today.reverse();
//			forecast.reverse();
			var myChart = echarts.init(document.getElementById("humanFlow"));
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {
					icon: 'rect',
					itemWidth: scale * 18,
					itemHeight: scale * 8,
					itemGap: scale * 10,
					selectedMode: false,
					textStyle: {
						fontSize: scale * 10,
						color: '#95BBC1'
					},
					data: ['当前', '预测']
				},
				grid: {
					left: '5%',
					right: '5%',
					bottom: '14%',
					top: '13%',
					containLabel: true
				},
				xAxis: {
					type: 'value',
					axisLabel: {
						show: false,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: "rgba(45,180,158,0.2)",
							type: "dashed"
						},
						interval: function(index) {
							console.info(index);
							if(index > 1) {
								return true;
							}
						},
					}
				},
				yAxis: {
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五'],
					axisLabel: {
						show: true,
						color: '#95BBC1',
						fontSize: scale * 10
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "rgba(45,180,158,0.2)"
						}
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false
					}
				},
				series: [{
						type: 'bar',
						name: '当前',
						z: 2,
						xAxisIndex: 0,
						barWidth: scale * 12,
						itemStyle: {
							color: '#1C4572'
						},
						data: today
					},
					{
						symbol: 'image://../img/icon/icon-cateen-humanflow-blue.png',
						name: '',
						type: 'pictorialBar',
						symbolPosition: 'end',
						symbolSize: scale * 14,
						symbolOffset: ['20%', '-60%'],
						tooltip: {
							show: false
						},
						data: today
					},
					{
						type: 'bar',
						name: '预测',
						z: 2,
						xAxisIndex: 0,
						barWidth: scale * 12,
						itemStyle: {
							color: '#312472'
						},
						data: forecast
					},
					{
						symbol: 'image://../img/icon/icon-cateen-humanflow-purple.png',
						name: '',
						type: 'pictorialBar',
						symbolPosition: 'end',
						symbolSize: scale * 14,
						symbolOffset: ['70%', '60%'],
						tooltip: {
							show: false
						},
						data: forecast
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
//				xList.push(new Date(n["date"]).getHours());
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
					top: "10%",
					left: 'center',
					data: [{
							name: '当前',
							textStyle: {
								fontSize: scale * 11,
								color: '#95BBC1'
							},
							icon: 'image://../img/icon/icon-cateen-arealine-blue.png',
						}
					]
				},
				grid: {
					left: '10%',
					right: '10%',
					bottom: '4%',
					top: '30%',
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
				]
			};
			myChart.setOption(option);
		},

		//最受欢迎菜系
		favoriteFood: function(data) {
			var xList = [];
			var dataList = [];
			var max = 0;
			var min
			$.each(data, function(i, n) {
				xList.push(n["name"]);
				dataList.push(n["num"]);
				if(max < n["num"]) {
					max = n["num"];
				}
			});
			max += max * 0.1;
			var myChart = echarts.init(document.getElementById("favoriteFood"));
			var option = {
				title: {
					show: false,
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				grid: {
					left: '0%',
					right: '0%',
					bottom: '0%',
					top: '0%',
					containLabel: true
				},
				xAxis: [{
						type: 'category',
						show: true,
						data: xList,
						axisPointer: {
							type: 'shadow'
						},
						axisLabel: {
							show: true,
							color: '#95BBC1',
							fontSize: scale * 10,
							interval: 0
						},
						axisLine: {
							show: true,
							color: "rgba(193,193,198,0.8)",
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
						data: xList,
					}
				],
				yAxis: [{
						type: 'value',
						name: '',
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
						type: 'bar',
						//						name: 'PM2.5',
						z: 2,
						xAxisIndex: 0,
						barWidth: scale * 20,
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(163,105,198,1)'
							}, {
								offset: 1,
								color: 'rgba(102,195,108,.1)'
							}], false),
						},
						data: dataList
					},
					{
						symbol: 'image://../img/icon/icon-cateen-favorite-top.png',
						name: 'top',
						type: 'pictorialBar',
						symbolPosition: 'end',
						symbolSize: scale * 27,
						symbolOffset: ['-3%', '-58%'],
						data: dataList,
						tooltip: {
							show: false
						},
					},
					{
						type: 'bar',
						name: '总数',
						z: 1,
						xAxisIndex: 1,
						barWidth: scale * 25,
						itemStyle: {
							color: 'rgba(7,71,170,.3)'
						},
						data: [max, max, max, max, max],
						tooltip: {
							show: false
						},
					}
				]
			};
			myChart.setOption(option);
		},

		mealsInit: function(data) {
			console.info(data);
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
		}
	};

}));