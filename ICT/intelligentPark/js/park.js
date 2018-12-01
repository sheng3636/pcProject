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
			parkdata = {};
			dev_id = "";
			video_url = '';
			buildState = {};
			funOp.dataInit();
			funOp.eventInit();
		},
		chart: {},
		//事件绑定初始化
		eventInit: function() {
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
			var arrwtId = ['con-park-carwtchart', 'con-park-carwtlist'];
			var arrcsId = ['con-park-carcs', 'con-park-carcslist'];
			$(".con-park-wt .changeTitle li").click(function(e) {
				var $this = $(this);
				var index = $this.attr("data-index");
				$(".con-park-wt .con-park-carinfo").hide();
				$('.' + arrwtId[index] + '').show();
				e.preventDefault();
				e.stopPropagation();
			});
			$(".con-park-cs .changeTitle li").click(function(e) {
				var $this = $(this);
				var index = $this.attr("data-index");
				$(".con-park-cs .con-park-carinfo").hide();
				$('.' + arrcsId[index] + '').show();
				e.preventDefault();
				e.stopPropagation();
			});

			$(".con-park-wt").on("click", ".con-park-carwtlist table .datalist", function(e) {
				var dataid = $(this).attr("data-id");
				funOp.weitingdetail(parkdata["disobeyDetail"]["data"]);
				$(".con-park-wt .con-park-carinfo").hide();
				$(".con-park-carwtinfo").show();
				e.preventDefault();
				e.stopPropagation();
			});

			$(".con-park-wt").on("click", ".con-park-carwtinfo #returnback", function(e) {
				$(".con-park-wt .con-park-carinfo").hide();
				$(".con-park-carwtlist").show();
				e.preventDefault();
				e.stopPropagation();
			});

			$(".con-park-cs").on("click", ".con-park-carcslist table .datalist", function(e) {
				var dataid = $(this).attr("data-id");
				funOp.chaosudetail(parkdata["overspeedDetail"]["data"]);
				$(".con-park-cs .con-park-carinfo").hide();
				$(".con-park-carcsinfo").show();
				e.preventDefault();
				e.stopPropagation();
			});

			$(".con-park-cs").on("click", ".con-park-carcsinfo #returnback", function(e) {
				$(".con-park-cs .con-park-carinfo").hide();
				$(".con-park-carcslist").show();
				e.preventDefault();
				e.stopPropagation();
			});

			$("body").on("click", ".trail .trailTableList .datalist", function(e) {
				var html = "";
				$('.detail').show();
				$('.detail #parkplayer').hide();
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
			window.onmessage = function(e) {

				var data = e.data;
				var name;
				var id;
				for(var key in data) {
					name = key;
					id = data[key][0].id
					break;
				}

				dev_id = id;
				if(id === 16) {
					//放大图标
					var showData = {
						iconData: {
							'车牌识别': [{
								id: id,
								size: 2
							}]
						}
					};
					document.getElementById("map").contentWindow.postMessage(showData, "*");

					$('.detail').show();
					$('.detail .title').hide();
					$('.detail .videoImage').hide();
					$('.detail #parkplayer').show();
//					$.fn.commUtil.playerInit('parkplayer', obj);
					var img = "<img src='../img/static/image/park/dongchukou003.png' style='width: 90%;height: 90%;margin: 4%;'/>";
					$("#parkplayer").empty();
					$("#parkplayer").append(img);
				}

			};
			//切换下一个
			$("#parkCountBtnNext").click(function(e) {
				$(".con-top-right-2").last().after($(".con-top-right-2").first().prop("outerHTML"));
				$(".con-top-right-2").first().remove();
			});

			// 关闭按钮
			$("body").on("click", ".btn-close", function(e) {
				var parentClassName = $(this).parent()[0].className;
				$(this).parent().hide();
				var trailData = {
					iconData: {
						'车牌识别': [{
							id: dev_id,
							size: 1
						}]
					}
				};
				document.getElementById("map").contentWindow.postMessage(trailData, "*");
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
			var packstr = "";
			var packdatastr = "";
			$.getJSON("../data/parkStatic.json",function(data){
				packdatastr = JSON.stringify(data);
				parkdata = JSON.parse(packdatastr);
				funOp.carEntryAndExit(data.index.data["carEntryAndExit"]);
				funOp.carOutChart(data.index.data["carEntryAnalysis"]);
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
				
				$("#personnelcar").html(data["carType"]["data"][0]["num"] + "<em>辆</em>");
				$("#visitorcar").html(data["carType"]["data"][1]["num"] + "<em>辆</em>");
				
				funOp.weitingtop(data["top5"]["data"]);
				funOp.chaosutop(data["top5"]["data"]);
				
				funOp.weitinglist(data["getList"]["data"]);
				funOp.chaosulist(data["getList"]["data"]);
			});

			var mapCenter = encodeURIComponent("[121.5343901512083,31.12746385795093]");
			var showIcon = encodeURIComponent("车牌识别");

		},
		mapInit: function(obj) {
			//			1，没有数据；2，一般 50~80；3，拥挤80~；4，空闲~50
			var param = {
				direct: 1,
				bearing: 1,
				options: 1,
				mapZoom: 15.76049725550672,
				mapCenter: [121.5343901512083, 31.12746385795093],
				mapOpacityZoom: 13.003436315165965,
				mapBearing: 0,
				mapPitch: 42.00000000000002,
				type: 4,
				showIcon: "车牌识别",
				bigParkData: "{'1C-2A':'" + obj.b1state + "','2A-2B':'" + obj.b3state + "','3-4':'" + obj.b4state + "','6-7':'" + obj.b6state + "'}",
				parks: obj.packstr,
				hideParkOutLineId:"12A-24A,24A-24B,13B-14B,14A-25"

			};
			$.fn.commUtil.mapInit("map", param);
		},
		carEntryAndExit: function(data) {
			var carInsum = 0;
			var carOutsum = 0;
			$.each(data, function(i, n) {
				$.each(n["entry"], function(index, node) {
					carInsum = carInsum + node["num"];
				});
				$.each(n["exit"], function(item, nood) {
					carOutsum = carOutsum + nood["num"];
				});
				if(n["name"] == "秀沿西路") {
					$("#xiuyanName").text(n["name"]);
					if(Object.keys(n).length >= 3) {
						if(n["entry"].length > 0) {
							$("#xiuyanCarInCount em").text(n["entry"][0]["num"]);
							$("#xiuyanCarOutCount em").text(n["exit"][0]["num"]);
						}
					}
				}
				if(n["name"] == "上南路") {
					$("#shangnanName").text(n["name"]);
					if(Object.keys(n).length >= 3) {
						if(n["entry"].length > 0) {
							$("#shangnanCarInCount1 em").text(n["entry"][0]["num"]);
							$("#shangnanCarOutCount em").text(n["exit"][0]["num"]);
						}
					}
				}
			});
			if(carInsum != 0) {
				$("#yuanquCarInCount em").text(carInsum);
			}
			if(carOutsum != 0) {
				$("#yuanquCarOutCount em").text(carOutsum);
			}
		},

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
					data[key]["undergroundPercent"] = 0;
					data[key]["undergroundResidual"] = value["undergroundTotal"];
				}
				if(undergroundPercent <= 150 && undergroundPercent > 100) {
					undergroundResidual = 0;
					undergroundPercent = 100;
					data[key]["undergroundPercent"] = 100;
					data[key]["undergroundResidual"] = 0;
				}
				if(overgroundPercent < 0 && overgroundPercent >= -10) {
					overgroundResidual = value["overgroundTotal"];
					overgroundPercent = 0;
					data[key]["overgroundPercent"] = 0;
					data[key]["overgroundResidual"] = value["overgroundTotal"];
				}
				if(overgroundPercent <= 150 && overgroundPercent > 100) {
					overgroundResidual = 0;
					overgroundPercent = 100;
					data[key]["overgroundPercent"] = 100;
					data[key]["overgroundResidual"] = 0;
				}
				//		1，没有数据；2，一般 50~80；3，拥挤80~；4，空闲~50
				if(undergroundPercent  == ""){
					return true;
				}
				var buildPercent = undergroundPercent / 100;

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
		carOutChart: function(data) {
			var myChart = echarts.init(document.getElementById("carOutChart"));
			var _color = ["rgb(2,205,255)", "rgb(174,113,255)", "rgb(114,113,255)"];
			var namearr = ['本周', '上周', '预测'];
			var _data = [];
			for(i = 0; i < 3; i++) {
				_data.push({
					name: namearr[i],
					textStyle: {
						color: _color[i],
						fontSize: 16 * scale
					}
				});
			}
			var currentWeek = [];
			var forecastWeek = [];
			var lastWeek = [];
			$.each(data["currentWeek"], function(i, n) {
				var nowday = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
				if(new Date(nowday) < new Date(n["date"])) {
					return;
				}
				currentWeek.push(n["all"]);
				//				forecastWeek.push("");
			});
			$.each(data["forecastWeek"], function(i, n) {
				forecastWeek.push(n["all"]);
			});
			$.each(data["lastWeek"], function(i, n) {
				lastWeek.push(n["all"]);
			});
			var option = {
				grid: {
					left: '0%',
					right: '1%',
					top: '1%',
					bottom: '23%'
				},
				legend: {
					data: _data,
					orient: 'horizontal',
					bottom: 0
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
						shadowType: 'rgb(19, 34, 55)'
					},
					showContent: true
				},
				xAxis: {
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					axisLine: {
						lineStyle: {
							width: 1,
							color: 'rgb(19,59,74)'
						}
					},
					axisLabel: {
						textStyle: {
							color: 'rgb(149,187,193)',
							fontSize: 13 * scale
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							width: 1,
							color: 'rgb(19,59,74)'
						}
					}
				},
				yAxis: {
					axisLine: {
						show: false
					},
					axisLabel: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							width: 1,
							color: 'rgb(19,59,74)'
						}
					},
					type: 'value',
					splitNumber: 10
				},
				series: [{
						name: '本周',
						data: currentWeek, //[23, 36, 22]
						type: 'line',
						lineStyle: {
							color: 'rgb(2,205,255)',
							width: 4
						},
						symbol: 'circle',
						symbolSize: 10,
						itemStyle: {
							normal: {
								color: 'rgb(2,205,255)',
								borderColor: 'rgba(10,99,131,0.5)',
								borderWidth: 10
							},
							emphasis: {
								width: 10,
								lineStyle: {
									color: 'red'
								}
							}
						}
					},
					{
						name: '上周',
						data: lastWeek, //[19, 28, 18, 36, 30, 51, 17]
						type: 'line',
						symbol: 'none',
						lineStyle: {
							color: 'rgb(174,113,255)',
							width: 2
						},
					},
					{
						name: '预测',
						data: forecastWeek, //[11, 32, 20, 41, 35, 53, 28]
						type: 'line',
						symbol: 'none',
						lineStyle: {
							color: 'rgb(114,113,255)',
							width: 2,
							type: 'dotted'
						},
					}
				]
			};
			myChart.setOption(option);
		},

		weitingtop: function(data) {
			if(data.length == 1) {
				var str = "";
				$.each(data["disobeyCompany"][0], function(key, value) {
					str += value;
				});
				if(str == "") {
					return false;
				}
			}
			var html = "<tr>" +
				"<th>违停企业Top5</th>" +
				"<th>违停人员Top5</th>" +
				"</tr>";
			var count = data["disobeyCompany"][0]["num"] + 5;
			if(data) {
				$("#weiTingChart table").empty();
				$.each(data["disobeyCompany"], function(i, n) {
					var percent = Math.round((data["disobeyCompany"][i]["num"] / count) * 100) / 100;
					html += "<tr>" +
						"<td>" +
						"<p>" + n["name"] + "</p>" +
						"<div class='jindubg'>" +
						"<div class='jindu' style='width:" + percent * 100 + "%'></div>" +
						"</div>" +
						"</td>";
					if(data["disobeyPeople"].length > 0) {
						if(data["disobeyPeople"][i]["num"] >= 5) {
							html += "<td class='active'>";
						} else {
							html += "<td>";
						}
						if(data["disobeyPeople"][i]["carImage"].length > 0) {
							html += "<span class='picturebg'>" +
								"<span class='picture'>" +
								"<img src='" + data["disobeyPeople"][i]["carImage"] + "'/>" +
								"</span>" +
								"</span>";
						}
						html += "<span class='pictureinfo'>" +
							data["disobeyPeople"][i]["name"] +
							"|" +
							"<em>" + data["disobeyPeople"][i]["num"] + "次</em>" +
							"</span>" +
							"</td>";
					}
					html += "</tr>";
				});
				$("#weiTingChart table").html(html);
			}

		},

		chaosutop: function(data) {
			if(data.length == 1) {
				var str = "";
				$.each(data["oversleepCompany"][0], function(key, value) {
					str += value;
				});
				if(str == "") {
					return false;
				}
			}
			var html = "<tr>" +
				"<th>超速企业Top5</th>" +
				"<th>超速人员Top5</th>" +
				"</tr>";
			var count = data["oversleepCompany"][0]["num"] + 5;
			if(data) {
				$("#chaoSuChart table").empty();
				$.each(data["oversleepCompany"], function(i, n) {
					var percent = Math.round((data["oversleepCompany"][i]["num"] / count) * 100) / 100;
					html += "<tr>" +
						"<td>" +
						"<p>" + n["name"] + "</p>" +
						"<div class='jindubg'>" +
						"<div class='jindu' style='width:" + percent * 100 + "%'></div>" +
						"</div>" +
						"</td>";
					if(data["oversleepPeople"].length > 0) {
						if(data["oversleepPeople"][i]["num"] >= 5) {
							html += "<td class='active'>";
						} else {
							html += "<td>";
						}
						if(data["oversleepPeople"][i]["carImage"].length > 0) {
							html += "<span class='picturebg'>" +
								"<span class='picture'>" +
								"<img src='" + data["oversleepPeople"][i]["carImage"] + "'/>" +
								"</span>" +
								"</span>";
						}
						html += "<span class='pictureinfo'>" +
							data["oversleepPeople"][i]["name"] +
							"|" +
							"<em>" + data["oversleepPeople"][i]["num"] + "次</em>" +
							"</span>" +
							"</td>";
					}
					html += "</tr>";
				});
				$("#chaoSuChart table").html(html);
			}

		},

		weitinglist: function(data) {
			var html = "<tr>" +
				"<th>触发设备</th>" +
				"<th>上报时间</th>" +
				"<th>地 点</th>" +
				"<th>处理结果</th>" +
				"</tr>" +
				"<tr style='height: 5px;border-top: 3px solid #368CFF;border-bottom: 1px solid #368CFF;'>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"</tr>";
			if(data) {
				$(".con-park-carwtlist table").empty();
				$.each(data["disobeyList"], function(i, n) {
					var arr = n["reportTime"].split(" ");
					html += "<tr class='datalist' data-id=" + n["id"] + ">" +
						"<td>" + n["type"] + "</td>" +
						"<td>" +
						"<p>" + arr[0] + "</p>" +
						"<p>" + arr[1] + "</p>" +
						"</td>" +
						"<td>" + n["place"] + "楼</td>" +
						"<td>" + n["result"] + "</td>" +
						"</tr>";
				});
				$(".con-park-carwtlist table").html(html);
			}

		},

		chaosulist: function(data) {
			var html = "<tr>" +
				"<th>车牌</th>" +
				"<th>上报时间</th>" +
				"<th>速度</th>" +
				"</tr>" +
				"<tr style='height: 5px;border-top: 3px solid #368CFF;border-bottom: 1px solid #368CFF;'>" +
				"<td style='height: 5px;'></td>" +
				"<td style='height: 5px;'></td>" +
				"<td style='height: 5px;'></td>" +
				"</tr>";
			if(data) {
				$(".con-park-carcslist table").empty();
				$.each(data["overspeedList"], function(i, n) {
					html += "<tr class='datalist' data-id=" + n["id"] + ">" +
						"<td>" + n["carNumber"] + "</td>" +
						"<td>" +
						"<p>" + n["reportTime"] + "</p>" +
						"</td>" +
						"<td>" + n["speed"] + "码</td>" +
						"</tr>";
				});
				$(".con-park-carcslist table").html(html);
			}

		},

		weitingdetail: function(data) {
			$(".con-park-carwtinfo table").empty();
			var html = "<tr>" +
				"<th><span class='tablet1'>" + data["name"] + "</span> <span>" + data["tel"] + "</span></th>" +
				"<th><i class='tableic1'>" + data["carNumber"] + "</i>" +
				"</th>" +
				"</tr>" +
				"<tr>" +
				"<td>" + data["company"] + " " + data["department"] + "</td>" +
				"<td></td>" +
				"</tr>" +
				"<tr>" +
				"<td>" + data["reportTime"] + "</td>" +
				"<td>处理时效:" + data["timeInterval"] + "</td>" +
				"</tr>" +
				"<tr>" +
				"<td>违停地点:" + data["place"] + "</td>" +
				"<td>负 责 人:" + data["personResponsible"] + "</td>" +
				"</tr>" +
				"<tr>" +
				"<td>触发设备:" + data["type"] + "</td>" +
				"<td style='text-align: right;'>" + data["personResponsibleTel"] + "</td>" +
				"</tr>";
			$(".con-park-carwtinfo table").html(html);
			$(".con-park-carwtinfo .topbox_tul1 ul").empty();
			if(data["log"].length == 1) {
				var str = "";
				$.each(data["log"][0], function(key, value) {
					str += value;
				});
				if(str == "") {
					return false;
				}
			}
			if(data["log"]) {
				html = "";
				$.each(data["log"], function(i, n) {
					html += "<li>" +
						"<p>" + n["name"];
					if(n["videoUrl"] != "") {
						html += "<i class='tul1_i1' data-url='" + n["videoUrl"] + "'></i>";
					}
					html += "</p><span>" + n["date"] + "</span>" +
						"</li>";
				});
				$(".con-park-carwtinfo .topbox_tul1 ul").html(html);
			}

		},

		chaosudetail: function(data) {
			$(".con-park-carcsinfo table").empty();
			var html = "<tr>" +
				"<th><span class='tablet1'>" + data["name"] + "</span> <span>" + data["tel"] + "</span></th>" +
				"<th><i class='tableic1'>" + data["carNumber"] + "</i>" +
				"</th>" +
				"</tr>" +
				"<tr>" +
				"<td>" + data["company"] + " " + data["department"] + "</td>" +
				"<td></td>" +
				"</tr>" +
				"<tr>" +
				"<td>" + data["reportTime"] + "</td>" +
				"<td></td>" +
				"</tr>" +
				"<tr>" +
				"<td>超速速度：" + data["speed"] + "码</td>" +
				"<td></td>" +
				"</tr>" +
				"<tr>" +
				"<td>累积超速次数：" + data["overspeedCount"] + "次</td>" +
				"<td></td>" +
				"</tr>";
			$(".con-park-carcsinfo table").html(html);

			if(data["imageUrl"] != "") {
				$(".con-park-carcsinfo #chaosuimg .stimg").show();
				$(".con-park-carcsinfo #chaosuimg img").attr("src", data["imageUrl"]);
			}
		},

		getVideoUrl: function(name, id) {
			var value = id;
			var data = videoObj[name];
			$.each(data, function(key, val) {
				if(val.id == value) {
					video_url = val.url
				}
			})

		},

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
		}
	};

}));