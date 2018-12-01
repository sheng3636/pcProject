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
			clickId = "";
			buildState = {};
			parkdata = {}; 
			persondata = {};
			funOp.eventInit();
			funOp.dataInit();
		},
		chart: {},
		eventInit: function() {
			//车辆 -搜索轨迹
			$("#searchbtn").click(function(e) {
				var searchtxt = $("#searchipt").val();
				if(searchtxt.length === 7) {
					funOp.showTrailList(parkdata["getTrail"]["data"]);
				}
				$(".trail").show();
				//				$(".detail").show();
				e.preventDefault();
				e.stopPropagation();
			});

			$("body").on("click", ".trail .trailTableList .datalist", function(e) {
				var html = "";
				$('.detail').show();
				$('.detail .title').show();
				$('.detail .videoImage').show();
				html += "<tr>" +
					"<th>" + $(this).find(".place").text() + "</th>" +
					"<th>" + $(this).find(".reportTime").text() + "</th>" +
					"</tr>";
				$('.detail .videoImage table').html(html);
				$('.detail .videoImage img').attr("src", $(this).attr("data-img"));
				e.preventDefault();
				e.stopPropagation();
			});

			$("#person_fun_next").click(function(e) {
				var name = $(".con-top-right-bottom-table").first().attr("name");
				$(".con-top-right-bottom-table").first().attr("id");
				$(".con-top-right-bottom-table").last().after($(".con-top-right-bottom-table").first().prop("outerHTML"));
				$(".con-top-right-bottom-table").first().remove();
				if(funOp.chart[name]) {
					funOp.chart[name][0].dispose();
					myChart = funOp.chart[name][0] = echarts.init(document.getElementById(name));
					myChart.setOption(funOp.chart[name][1], true);
				}
			});
			$("#bottom_next").click(function(e) {
				$(".con-bottom-box-item").last().after($(".con-bottom-box-item").first().prop("outerHTML"));
				$(".con-bottom-box-item").first().remove();
			});

			$("#people_recognition li").click(function(e) {
				var type = $(this).attr("name");
				//				var cameraName = $("section").attr("name");
				if(type == ""){
					funOp.picture(persondata.getPicture.data);
				}
				else{
					funOp.picture(persondata["getPicture"][type]["data"]);
				}
			});
			$("#return_all").click(function(e) {
				funOp.picture(persondata.getPicture.data);
				$(".con_top_right_index").show();
				$(".con_top_right_worker").hide();
				$(".con_top_right_vistor").hide();
				$(".company-person-worker").find(".con-top-right-bottom-title").show();
				$(".company-person-worker").removeClass("no-bg");
				var traildata = {
					data: ","
				};
				document.getElementById("map").contentWindow.postMessage(traildata, "*");
				//				funOp.chartInit();
			});

			window.onmessage = function(e) {

			}

			// 关闭按钮
			$("body").on("click", ".btn-close", function(e) {
				var parentClassName = $(this).parent()[0].className;
				$(this).parent().hide();
				if(parentClassName == "trail") {
					trailData = {
						data: ","
					};
					document.getElementById("map").contentWindow.postMessage(trailData, "*");
					$("#searchipt").val("");
					$('.detail').hide();
				}
				e.preventDefault();
				e.stopPropagation();
			});

		},
		dataInit: function() {
			var persondatastr = "";
			$.getJSON("../data/personStatic.json", function(data){
				persondatastr = JSON.stringify(data);
				persondata = JSON.parse(persondatastr);
				$("section").attr("name", "B4");
				$("#person-build-in").text("进B4");
				$("#person-build-out").text("出B4");
				funOp.personCount(data["index"]["B4"]["data"]["peopleCount"]);
				funOp.personTraffic(data["index"]["B4"]["data"]["transportAnalysis"]);
				funOp.personFlow(data["index"]["B4"]["data"]["peopleFlow"]);
				funOp.visitCompany(data["index"]["B4"]["data"]["visitor"]);
				funOp.stayTime(data["index"]["B4"]["data"]["stopTime"]);
				funOp.returnVisits(data["index"]["B4"]["data"]["frequency"]);
				funOp.peopleRecognition(data["index"]["B4"]["data"]["peopleRecognition"]);
				funOp.picture(data["getPicture"]["B4"]["data"]);
			});

			funOp.workHours();
			//车辆管理-停车比例
			var packstr = "";
			var packdatastr = "";
			$.getJSON("../data/parkStatic.json",function(data){
				packdatastr = JSON.stringify(data);
				parkdata = JSON.parse(packdatastr);
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
				mapZoom: 15.26049725550672,
				mapCenter: [121.5343901512083, 31.12746385795093],
				mapOpacityZoom: 13.003436315165965,
				mapBearing: 0,
				mapPitch: 42.00000000000002,
				type: 4,
				showIcon: "0",
				bigParkData: "{'1C-2A':'" + obj.b1state + "','2A-2B':'" + obj.b3state + "','3-4':'" + obj.b4state + "','6-7':'" + obj.b6state + "'}",
				parks: obj.packstr,
				hideParkOutLineId:"12A-24A,24A-24B,13B-14B,14A-25",
				clickedBuilding:"B4"

			};
			$.fn.commUtil.mapInit("map", param);
		},

		//车辆搜索轨迹
		showTrailList: function(data) {
			if(data.length == 1) {
				var str = "";
				$.each(data[0], function(key, value) {
					str += value;
				});
				if(str == "") {
					return false;
				}
			}
			$(".trail .trailTableTitle table").empty();
			var titleHtml = "";
			if(data["name"] || data["tel"] || data["carNumber"]) {
				titleHtml += "<tr>" +
					"<td><span class='tablet1'>" + data["name"] + "</span> <span>" + data["tel"] + "</span></td>" +
					"<td><i class='tableic1'>" + data["carNumber"] + "</i></td>" +
					"</tr>" +
					"<tr>" +
					"<td>" + data["company"] + "</td>" +
					"<td></td>" +
					"</tr>";
			}
			$(".trail .trailTableTitle table").html(titleHtml);
			var detail = "";
			var lnglat = "";
			if(data["info"].length == 1) {
				var str = "";
				$.each(data["info"][0], function(key, value) {
					str += value;
				});
				if(str == "") {
					return false;
				}
			}
			$(".trail .trailTableList").empty();
			detail += "<tr>" +
				"<td style='height: 1px;'></td>" +
				"<td style='height: 1px;'></td>" +
				"</tr>";

			$.each(data["info"], function(i, n) {
				if(n["reportTime"] != "" || n["place"] != "") {
					detail += "<tr class='datalist' data-img='" + n["url"] + "'>" +
						"<td class='reportTime'>" + n["reportTime"] + "</td>" +
						"<td class='place'>" + n["place"] + "</td>" +
						"</tr>";
				}
			});

			$.each(data["info"].reverse(), function(i, n) {
				if(n["LONGITUDE"] != "" && n["LATITUDE"] != "") {
					lnglat += n["LONGITUDE"] + "," + n["LATITUDE"] + ";"
				}
			});

			if(lnglat.length > 0) {
				lnglat = lnglat.substr(0, lnglat.length - 1);
				var traildata = {
					data: lnglat
				};
				document.getElementById("map").contentWindow.postMessage(traildata, "*");
			}
			$(".trail .trailTableList").html(detail);
		},
		personCount: function(data) {
			if(data.length > 0) {
				$("#person-count-in").html(data[0]["in"] + "<em>人</em>");
				$("#person-count-out").html(data[0]["out"] + "<em>人</em>");
			}
		},
		peopleRecognition: function(data) {
			$.each(data, function(i, n) {
				switch(n["classification"]) {
					case "员工":
						$("#people_recognition").find(".num").eq(0).text(n["percent"] + "%");
						$("#people_recognition").find(".chart").eq(0).find("div").css("width", n["percent"] + "%")
						break;
					case "访客":
						$("#people_recognition").find(".num").eq(1).text(n["percent"] + "%");
						$("#people_recognition").find(".chart").eq(1).find("div").css("width", n["percent"] + "%")
						break;
					case "陌生人":
						$("#people_recognition").find(".num").eq(2).text(n["percent"] + "%");
						$("#people_recognition").find(".chart").eq(2).find("div").css("width", n["percent"] + "%")
						break;
					case "黑名单":
						$("#people_recognition").find(".num").eq(3).text(n["percent"] + "%");
						$("#people_recognition").find(".chart").eq(3).find("div").css("width", n["percent"] + "%")
						break;
				}

			})
		},

		picture: function(data) {
			$("#picture").empty();
			if(data.length == 1) {
				var str = "";
				$.each(data[0], function(key, value) {
					str += value;
				});
				if(str == "") {
					return false;
				}
			}
			$.each(data, function(i, n) {
				//				if(i>10){
				//					return;
				//				}
				var typeList = {
					"陌生人": "stranger",
					"员工": "worker",
					"黑名单": "black",
					"访客": "vistor"
				};
				$("#picture").append(
					"<div class='con-bottom-box-item' name='' imgUrl='" + n["imgUrl"] + "' id='" + n["userId"] + "' userType='" + typeList[n["type"]] + "'>" +
					"<img src='" + n["imgUrl"] + "' class='item-img'/>" +
					"<div class='item-info'>" +
					"<p class='item-info-name'>" + n["name"] + "<i class='icon-person-" + typeList[n["type"]] + "'></i></p>" +
					"<p class='item-info-company'>" + (n["company"] ? n["company"] : "----") + "</p>" +
					"<p class='item-info-date'>" + n["date"] + "</p>" +
					"<p class='item-info-palce'>" + n["address"] + "</p>" +
					"<i class='item-info-more'></i>" +
					"</div>" +
					"</div>"
				);
			});

			//底部item事件
			$(".item-info-more").click(function() {
				var type = "";
				var id = $(this).parent().parent().attr("id");
				if($(".con_top_right_index").is(':visible') || clickId != id) {
					type = $(this).parent().parent().attr("userType");
					clickId = id;
				}

				switch(type) {
					case "black":
						$(".con_top_right_index").hide();
						$(".con_top_right_worker").show();
						$(".con_top_right_vistor").hide();
						funOp.getEmployee($(this).parent().parent().attr("id"));
						$(".company-person-worker").find(".con-top-right-bottom-title").hide();
						$(".company-person-worker").addClass("no-bg");
						break;
					case "worker":
						$(".con_top_right_index").hide();
						$(".con_top_right_worker").show();
						$(".con_top_right_vistor").hide();
						funOp.getEmployee($(this).parent().parent().attr("id"));
						$(".company-person-worker").find(".con-top-right-bottom-title").hide();
						$(".company-person-worker").addClass("no-bg");
						break;
					case "vistor":
						$(".con_top_right_index").hide();
						$(".con_top_right_worker").hide();
						$(".con_top_right_vistor").show();
						funOp.getVisitor($(this).parent().parent().attr("id"), $(this).parent().parent().attr("imgUrl"));
						$(".company-person-worker").find(".con-top-right-bottom-title").hide();
						$(".company-person-worker").addClass("no-bg");
						break;
					default:
						$(".con_top_right_index").show();
						$(".con_top_right_worker").hide();
						$(".con_top_right_vistor").hide();
						$(".company-person-worker").find(".con-top-right-bottom-title").show();
						$(".company-person-worker").removeClass("no-bg");
						var trailData = {
							data: ","
						};
						document.getElementById("map").contentWindow.postMessage(trailData, "*");
						break;
				}
			});
		},

		getVisitor: function(id, imgUrl) {
			funOp.vistorInfo(persondata["vistor"][id]["data"]);
		},
		getEmployee: function(id) {
			funOp.workerInfo(persondata["getEmployee"][id]["data"]);
		},

		personTraffic: function(data) {
			if(data.length <= 0) {
				return;
			}
			var xList = [];
			var legend = {};
			$.each(data, function(i, n) {
				xList.push(n["name"]);
				n.value = n["num"];
				legend[n["name"]] = n["num"];
			})
			var myChart = echarts.init(document.getElementById("person_traffic"));
			var option = {
				tooltip: {
					trigger: "item",
					formatter: "{b}: {c}%",
					//					formatter: "{b}",
				},
				legend: {
					show: (document.body.clientHeight < 680) ? false : true,
					bottom: "10%",
					width: "100%",
					height: "30%",
					itemGap: 12 * scale,
					itemWidth: 14 * scale,
					itemHeight: 14 * scale,
					align: "left",
					data: xList,
					formatter: function(name) {
						//						return name + "  " + legend[name] + "%";
						return name;
					},
					textStyle: {
						color: "#C6D8FF",
						fontSize: 12 * scale
					}
				},
				graphic: [{
					type: "text",
					left: "center",
					top: "40%",
					style: {
						text: "入园\n人员交通",
						textAlign: "center",
						font: 'bolder ' + 16 * scale + 'px "微软雅黑"',
						fill: "#C6D8FF"
					}
				}, {
					type: "image",
					left: "center",
					top: "25.5%",
					style: {
						image: origin + "/intelligentPark/img/person-bg-top-circle.png",
						textAlign: "center",
						width: 122 * scale,
						height: 122 * scale
					}
				}],
				series: [{
					name: "",
					type: "pie",
					center: ["center", "45%"],
					radius: ["49%", "55%"],
					color: ["#314994", "#0090FF", "#02CDFF"],
					label: {
						normal: {
							show: false
						}
					},
					data: data
				}]
			};
			funOp.chart["person_traffic"] = [myChart, option];
			myChart.setOption(option);
		},

		personFlow: function(data) {
			if(data.length <= 0) {
				return;
			}
			var currentWeek = [];
			var forecastWeek = [];
			var lastWeek = [];
			$.each(data["currentWeek"], function(i, n) {
				var nowday = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
				if(new Date(nowday) < new Date(n["date"])) {
					return;
				}
				currentWeek.push(n["num"]);
				//				forecastWeek.push("");
			});
			$.each(data["forecastWeek"], function(i, n) {
				forecastWeek.push(n["num"]);
			});
			$.each(data["lastWeek"], function(i, n) {
				lastWeek.push(n["num"]);
			});
			var myChart = echarts.init(document.getElementById("person_flow"));
			var option = {
				legend: {
					show: (document.body.clientHeight < 680) ? false : true,
					bottom: "5%",
					width: "100%",
					height: "30%",
					itemGap: 30 * scale,
					itemWidth: 14 * scale,
					itemHeight: 14 * scale,
					align: "left",
					data: [{
						name: "上周",
						icon: "image://" + origin + "/intelligentPark/img/person-bg-top-line-1.png"
					}, {
						name: "本周",
						icon: "image://" + origin + "/intelligentPark/img/person-bg-top-line-2.png"
					}, {
						name: "预测",
						icon: "image://" + origin + "/intelligentPark/img/person-bg-top-line-3.png"
					}],
					textStyle: {
						color: "#C6D8FF",
						fontSize: 12 * scale
					}
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "15%",
					containLabel: true
				},
				title: {
					text: "人员进出数量分析",
					top: "5%",
					textStyle: {
						color: "#C6D8FF",
						fontFamily: "Microsoft YaHei",
						fontSize: 16 * scale
					}
				},
				tooltip: {
					trigger: "axis"
				},
				xAxis: {
					type: "category",
					boundaryGap: true,
					axisTick: {
						show: false
					},
					axisLine: {
						show: false,
					},
					axisLabel: {
						textStyle: {
							color: "#95BBC1",
							fontSize: 12 * scale
						}
					},
					splitLine: { //网格线
						show: true,
						interval: function(index, name) { //index是x轴的坐标序号，name是坐标值 
							if(index === 0 || index === 6) {
								return false;
							}
							return true;
						},
						lineStyle: {
							color: "#07C4AA",
							type: "solid",
							opacity: 0.2
						}
					},
					data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
				},
				yAxis: {
					min: 0,
					//					max: 100,
					//					interval: 20,
					axisTick: {
						show: false
					},
					axisLine: {
						show: false,
					},
					axisLabel: {
						textStyle: {
							color: "#95BBC1",
							fontSize: 12 * scale
						}
					},
					splitLine: { //网格线
						show: true,
						interval: function(index, name) { //index是x轴的坐标序号，name是坐标值  
							return false;
						},
						lineStyle: {
							color: "#07C4AA",
							type: "solid",
							opacity: 0.2
						}
					},
					splitNumber: 5
				},
				series: [{
						name: "上周",
						type: "line",
						symbolSize: 0,
						smooth: true,
						color: "#AE71FF",
						//						data: ["48", "43", "41", "40", "24", "53", "47", "50", "49"],
						data: lastWeek,
						label: {
							normal: {
								show: false,
								position: "top" //值显示
							}
						}
					},
					{
						name: "本周",
						type: "line",
						symbolSize: 0,
						smooth: true,
						color: "#02CDFF",
						//						data: ["99", "43"],
						data: currentWeek,
						label: {
							normal: {
								show: false,
								position: "top" //值显示
							}
						}
					},
					{
						name: "预测",
						type: "line",
						symbolSize: 0,
						smooth: true,
						color: "#7271FF",
						lineStyle: {
							type: "dashed"
						},
						//						data: ["67", "43", "41", "40", "90", "53", "47", "50", "49"],
						data: forecastWeek,
						label: {
							normal: {
								show: false,
								position: "top" //值显示
							}
						}
					}
				]
			};
			funOp.chart["person_flow"] = [myChart, option];
			myChart.setOption(option);
		},

		visitCompany: function(data) {
			if(data.length <= 0) {
				return;
			}
			$("#visit_company").empty();
			$.each(data, function(i, n) {
				$("#visit_company").append(
					"<li>" +
					"<span title='" + n["companyName"] + "'>" + n["companyName"] + "</span>" +
					"<div id='c1' class='c' title='" + n["percent"] + "%'>" +
					"<div class='c_bg'></div>" +
					"<div class='c_data' style='width:" + n["percent"] + "%;'></div>" +
					"<div class='c_rect' style='left:" + n["percent"] + "%;'></div>" +
					"</div>" +
					"</li>"
				);
			});
		},

		stayTime: function(data) {
			if(!data || data.length <= 0) {
				return false;
			}
			var sum = 0;
			var dataCount = {
				"2小时以下": 0,
				"2-3小时":0,
				"3-4小时": 0,
				"4-6小时":0,
				"6小时以上": 0
			}
			$.each(data, function(i, n) {
				if(n["times"] < 2){
					dataCount["2小时以下"] += (n["percent"]*1.0);
				}
				if(n["times"] >= 2 && n["times"]<3){
					dataCount["2-3小时"] += (n["percent"]*1.0);
				}
				if(n["times"] >= 3 && n["times"]<4){
					dataCount["3-4小时"] += (n["percent"]*1.0);
				}
				if(n["times"] >= 4 && n["times"]<6){
					dataCount["4-6小时"] += (n["percent"]*1.0);
				}
				if(n["times"] >= 6){
					dataCount["6小时以上"] += (n["percent"]*1.0);
				}
//				_data.push(n["num"]);
				sum += (n["times"]*1.0) * (n["percent"]*1.0);
			});
			console.info(dataCount);
			var color = ["#227FA8", "#25ABD5", "#2CC6AF", "#818599", "#5B7B96"];
			var lenged = ["2小时以下", "2-3小时", "3-4小时", "4-6小时", "6小时以上"];
			$("#stay_time").find(".st").empty();
			$(".lenged").remove();
			for(var i = 0; i < 5; i++) {
				$("#stay_time").find(".avg").after("<div class='lenged'><div class='lenged-rect' style='background:" + color[4-i] + ";'></div><div class='lenged-text' style='color:" + color[4-i] + ";'>" + lenged[4-i] + "</div></div>");
				if(dataCount[lenged[i]] == 0 || dataCount[lenged[i]] == ""){
					continue;
				}
				if(dataCount[lenged[i]] < 2){
					$("#stay_time").find(".st").append("<div style='height:" + dataCount[lenged[i]] + "%;padding-bottom: 0;'><div class='bg' style='background:" + color[i] + ";'></div></div>");
				}else{
					$("#stay_time").find(".st").append("<div style='height:" + dataCount[lenged[i]] + "%;'><div class='bg' style='background:" + color[i] + ";'></div></div>");
				}
			}
			$("#stay_time_avg").html((sum/100).toFixed(1) + "<em>小时</em>");
		},

		returnVisits: function(data) {
//			if(data.length < 4) {
//				return;
//			}
			var lenged = ["1-2次", "3-5次", "6-10次", "10次及以上"];
//			function sortByPercent(a, b) {
//				return b.percent - a.percent
//			}
//			data.sort(sortByPercent);
			
			var dataCount = {
				"1-2次": 0,
				"3-5次":0,
				"6-10次": 0,
				"10次及以上":0
			}
			$.each(data, function(i, n) {
				if(n["times"] <= 2){
					dataCount["1-2次"] += (n["percent"]*1.0);
				}
				if(n["times"] >= 3 && n["times"]<= 5){
					dataCount["3-5次"] += (n["percent"]*1.0);
				}
				if(n["times"] >= 6 && n["times"]<= 10){
					dataCount["6-10次"] += (n["percent"]*1.0);
				}
				if(n["times"] > 10){
					dataCount["10次及以上"] += (n["percent"]*1.0);
				}
			});
			console.log(dataCount);
			var myChart = echarts.init(document.getElementById("return_visits"));
			var option = {
				xAxis: {
					show: false,
					max: 100,
					min: 0
				},
				yAxis: {
					show: false,
					max: 100,
					min: 0
				},
				series: [{
					type: 'scatter',
					symbolSize: function(data) {
						return data[2] * scale;
					},
					label: {
						color: "#C6D8FF",
						formatter: "{b}"
					},
					itemStyle: {
						normal: {
							borderColor: "#3074FF",
							borderWidth: 2,
							color: "rgba(48,116,255,0.3)"
						}
					},
					data: [{
						name: lenged[0],
						value: [50, 50, parseFloat(dataCount[lenged[0]]) * 1.5],
						label: {
							show: true,
							position: "inside"
						}
					}, {
						name: lenged[1],
						value: [85, 95, parseFloat(dataCount[lenged[1]]) * 1.5],
						label: {
							show: true,
							position: "inside"
						}
					}, {
						name: lenged[2],
						value: [15, 85, parseFloat(dataCount[lenged[2]]) * 1.5],
						label: {
							show: true,
							position: "bottom"
						}
					}, {
						name: lenged[3],
						value: [80, 10, parseFloat(dataCount[lenged[3]]) * 1.5],
						label: {
							show: true,
							position: "bottom"
						}
					}]
				}]
			};
			funOp.chart["return_visits"] = [myChart, option];
			myChart.setOption(option);
		},

		workHours: function() {
			var color = ["#227FA8", "#25ABD5", "#2CC6AF", "#818599", "#5B7B96"];
			var data = [20, 30, 25, 15, 10];
			var lenged = ["40小时以上", "35-40小时", "30-35小时", "20-30小时", "20小时以下"];
			for(var i = 0; i < 5; i++) {
				$("#work_hours").find(".wh").append("<div style='height:" + data[i] + "%;'><div class='bg' style='background:" + color[i] + ";'></div></div>");
				$("#work_hours").find(".wh-lenged").append("<div class='lenged'><div class='lenged-rect' style='background:" + color[i] + ";'></div><div class='lenged-text' style='color:" + color[i] + ";'>" + lenged[4 - i] + "</div></div>");
			}
		},

		workerInfo: function(data) {
			if(data["info"]) {
				var info = data["info"];
				var infoCompany = info["company"];
				var infoDepart = info["department"];
				if(info["company"].length > 6) {
					info["company"] = info["company"].substring(0, 6) + "..."
				}
				if(info["department"].length > 6) {
					info["department"] = info["department"].substring(0, 6) + "..."
				}
				$("#worker_info").find(".content-info").html(
					"<p class='content-info-name'>" + (info["name"]?info["name"]:"") + "<i>" + (info["gender"]?info["gender"]:"") + "</i></p>" +
					"<p class='content-info-hr'></p>" +
					"<p class='content-info-company' title='" + infoCompany + "'>" + (info["company"]?info["company"]:"") + "</p>" +
					"<p class='content-info-department' title='" + infoDepart + "'>" + (info["department"]?info["department"]:"") + "</p>" +
					"<p class='content-info-type'>" + (info["type"]?info["type"]:"") + "</p>" +
					"<p class='content-info-phone'>" + (info["phone"]?info["phone"]:"") + "</p>" +
					"<p class='content-info-transport'>" + (info["transport"]?info["transport"]:"") + "</p>"
					//					"<p class='content-info-stay'>停留时长：<em>"+ info["name"] +"小时</em></p>"
				);
				$("#worker_info").find("img").attr("src", (info["imgUrl"]?info["imgUrl"]:""));
			}
			if(data["trajectory"]) {
				var infoList = data["trajectory"];
				infoList.reverse();
				var trajectoryList = [];
				$("#worker_trajectory").empty();
				$.each(infoList, function(i, n) {
					$("#worker_trajectory").append(
						"<tr class='table-content'>" +
						"<td>" + (i + 1) + "</td>" +
						"<td>" + n["date"] + "</td>" +
						"<td>" + n["address"] + "</td>" +
						"<td>" + n["direction"] + "</td>" +
						"</tr>"
					);
					if(n["lng"] && n["lat"] && n["lng"] != "" && n["lat"] != "") {
						trajectoryList.push(n["lng"] + "," + n["lat"]);
					}
				});
				if(trajectoryList.length > 0) {
					funOp.trajectoryInit(trajectoryList.join(";"));
				}
			}
			if(data["duration"]) {
				funOp.workerDuration(data["duration"]);
			}
			if(data["frequency"]) {
				funOp.workerFrequency(data["frequency"]);
			}
		},
		workerFrequency: function(data) {
			var times = [' ', '一次', '二次', '三次', '四次', '五次','六次','七次'];
			var dataList = [];
			var index = 0;
			var colors = [];
			$.each(data, function(i, n) {
				index += n["times"];
				dataList.push({value: n["times"],name: times[n["times"]]});
			});
			if(index < 7){
				dataList.push({value: 7-index});
			}
			var myChart = echarts.init(document.getElementById("worker_frequency"));
			var option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				series: [{
					name: '来园区频次',
					type: 'pie',
					radius: '68%',
					center: ['50%', '50%'],
					clockwise: false,
					data: dataList,
					label: {
						normal: {
							textStyle: {
								color: '#999',
								fontSize: 14,
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							borderWidth: 0,
							borderColor: '#ffffff',
						},
						emphasis: {
							borderWidth: 0,
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}],
				color: [
					'#25ABD5',
					'#818599'
				]
			};
			funOp.chart["worker_frequency"] = [myChart, option];
			myChart.setOption(option);
		},
		workerDuration: function(data) {
			var xList = [];
			var dataList = [];
			$.each(data, function(i, n) {
				xList.push(n["date"].substr(0, 10));
				dataList.push(n["time"]);
			});
			var myChart = echarts.init(document.getElementById("worker_duration"));
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
				grid: {
					left: '10%',
					right: '10%',
					bottom: '4%',
					top: '10%',
					containLabel: true
				},
				xAxis: {
					type: "category",
					axisLabel: {
						show: true,
						textStyle: {
							color: "#C6D8FF"
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "#404651"
						}
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
					},
					data: xList
				},
				yAxis: {
					type: "value",
					axisLabel: {
						show: false,
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "#404651"
						}
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
					},
				},
				series: [{
					type: "line",
					smooth: true,
					data: dataList,
					symbol: 'circle',
					symbolSize: 10,
					showSymbol:true,
					color: "#02CDFF",
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
						opacity: 0.7,
					},
				}]
			};
			funOp.chart["worker_duration"] = [myChart, option];
			myChart.setOption(option);
		},
		vistorInfo: function(data) {
			if(data["info"]) {
				var info = data["info"];
				var infoCompany = info["company"];
				if(info["company"].length > 6) {
					info["company"] = info["company"].substring(0, 6) + "..."
				}
				$("#vist_info").find(".content-top-info").html(
					"<p class='content-info-name'>" + (info["name"]?info["name"]:"") + "<i>" + (info["gender"]?info["gender"]:"") + "</i></p>" +
					"<p class='content-info-hr'></p>" +
					"<p class='content-info-company' title='" + infoCompany + "'>" + (info["company"]?info["company"]:"") + "</p>" +
					"<p class='content-info-department'>------</p>" +
					"<p class='content-info-type'>" + (info["type"]?info["type"]:"") + "</p>" +
					"<p class='content-info-phone'>" + (info["phone"]?info["phone"]:"") + "</p>" +
					"<p class='content-info-reason'>" + (info["reason"]?info["reason"]:"") + "</p>"
					//					"<p class='content-info-stay'>停留时长：<em>"+ info["name"] +"小时</em></p>"
				);
				$("#vist_info").find(".content-top-img").attr("src", (info["imgUrl"]?info["imgUrl"]:""));
			}

			if(data["viewerInfo"]) {
				var info = data["viewerInfo"];
				var titleCompany = info["company"] + "";
				var titleDepart = info["department"] + "";
				if(info["company"].length > 10) {
					info["company"] = info["company"].substring(0, 10) + "..."
				}
				if(info["department"].length > 10) {
					info["department"] = info["department"].substring(0, 10) + "..."
				}
				$("#vist_info").find(".content-bottom-info").html(
					"<p>被访问人信息</p>" +
					"<p class='content-info-name'><span>人员名称 </span><em>" + (info["name"]?info["name"]:"") + " <i>" + (info["gender"]?info["gender"]:"") + "</i></em></p>" +
					"<p class='content-info-company'><span>所属公司 </span><em title='" + titleCompany + "'>" + (info["company"]?info["company"]:"") + "</em></p>" +
					"<p class='content-info-department'><span>所属部门 </span><em title='" + titleDepart + "'>" + (info["department"]?info["department"]:"") + "</em></p>" +
					"<p class='content-info-type'><span>人员类型 </span><em>" + (info["type"]?info["type"]:"") + "</em></p>" +
					"<p class='content-info-phone'><span>人员电话 </span><em>" + (info["phone"]?info["phone"]:"") + "</em></p>"
				);
//				if(info["imgUrl"] && info["imgUrl"] != "") {
//					$("#vist_info").find(".content-bottom-img").attr("src", info["imgUrl"]);
//				} else {
//					$("#vist_info").find(".content-bottom-img").hide();
//				}

			}

			if(data["trajectory"]) {
				var infoList = data["trajectory"];
				infoList.reverse();
				var trajectoryList = [];
				$("#vist_trajectory").empty();
				$.each(infoList, function(i, n) {
					$("#vist_trajectory").append(
						"<tr class='table-content'>" +
						"<td>" + (i + 1) + "</td>" +
						"<td>" + n["date"] + "</td>" +
						"<td>" + n["address"] + "</td>" +
						"<td>" + n["direction"] + "</td>" +
						"</tr>"
					);
					trajectoryList.push(n["lng"] + "," + n["lat"]);
				});
				funOp.trajectoryInit(trajectoryList.join(";"));
			}
			if(data["frequency"]) {
				var list = [];
				$.each(data["frequency"], function(i, n) {
					list.push(n["times"]);
				});
				funOp.trajectoryFrequency(list);
			}

		},

		trajectoryFrequency: function(data) {
			var myChart = echarts.init(document.getElementById("vist_frequency"));
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
				grid: {
					left: '10%',
					right: '10%',
					bottom: '4%',
					top: '10%',
					containLabel: true
				},
				xAxis: {
					type: "category",
					axisLabel: {
						show: true,
						textStyle: {
							color: "#C6D8FF"
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "#404651"
						}
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
					},
					data: ["第一周", "第二周", "第三周", "第四周"]
				},
				yAxis: {
					type: "value",
					axisLabel: {
						show: false,
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "#404651"
						}
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
					},
				},
				series: [{
					type: "line",
					smooth: true,
					data: data,
					symbol: 'circle',
					symbolSize: 10,
					showSymbol:true,
					color: "#02CDFF",
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
						opacity: 0.7,
					},
				}]
			};
			funOp.chart["vist_frequency"] = [myChart, option];
			myChart.setOption(option);
		},

		trajectoryInit: function(data) {
			var data = {
				data: data
			};
			document.getElementById("map").contentWindow.postMessage(data, "*");
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
				if(key == "B4") {
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
				}
			});
			totalPercent = ((total - free) * 1.0) / total;
			$("#parkcarpercent").html(Math.round(totalPercent * 100) + "<em>%</em>")
		},

	};

}));