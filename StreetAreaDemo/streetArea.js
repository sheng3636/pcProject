//绘制街道色块函数入口
var label_description_width = '110px';
var label_description_height = '130px';
var label_description_fontSize = '20px';
var label_description_position = new BMap.Point(122.055153, 31.099361);
var label_area_fontSize = '12px';
var label_area_height = '20px';
var label_area_lineHeight = '20px';
var label_area_borderRadius = '10px';
var label_area_padding = '5px';
var map = new BMap.Map("map"); // 创建Map实例
map.centerAndZoom(new BMap.Point(122.055153, 31.099361), 10);
map.setMapStyle({style:'midnight'});// 引入地图风格样式
map.enableScrollWheelZoom();//开启鼠标滚轮缩放
function DrawStreetArea() {
	//绘制人数分级说明
	var label_description = new BMap.Label('<span style="color:rgba(0,206,209,0.4)">0~3人</span><br/>' +
						   		 	 '<span style="color:rgba(0,206,209,0.5)">3~10人</span><br/>' +
						   		 	 '<span style="color:rgba(0,206,209,0.7)">10~50人</span><br/>' +
						   		 	 '<span style="color:rgba(0,206,209,0.8)">50~100人</span><br/>' +
						   		 	 '<span style="color:rgba(0,206,209,1)">100~500人</span>', {
		position: label_description_position
	});
	label_description.setStyle({
		fontFamily: '微软雅黑',
		width: label_description_width,
		height: label_description_height,
		fontSize: label_description_fontSize,
		fontWeight: 'bold',
		backgroundColor: 'rgb(2,16,25)',
		border: 0
	});
	map.addOverlay(label_description);

	bmap_info_data.forEach(function(data, index, array) {
		//当index=32时的边界数据有误
		if(index != 32) {
			var dataSet = new Array();
			if(data['type'] == 'Polygon') {
				dataSet.push(data['coordinates']);
			} else {
				dataSet = data['coordinates'];
			}

			var styleOptions = {
				fillColor: '#00CED1',
				fillOpacity: 0.4,
				strokeColor: "blue",
				strokeWeight: 0.45,
				strokeOpacity: 0
			};
			//人数分级判断
			if(data['count'] >= 3 && data['count'] < 10) {
				styleOptions['fillOpacity'] = 0.5;
			}
			if(data['count'] >= 10 && data['count'] < 50) {
				styleOptions['fillOpacity'] = 0.7;
			}
			if(data['count'] >= 50 && data['count'] < 200) {
				styleOptions['fillOpacity'] = 0.8;
			}
			if(data['count'] >= 200) {
				styleOptions['fillOpacity'] = 1;
			}

			//绘制各个街道的人数标签
			var label_area = new BMap.Label(data['name'] + ' : ' + data['count'] + '人', {
				position: new BMap.Point(parseFloat(data['center'].split(',')[0]), parseFloat(data['center'].split(',')[1])),
				offset: new BMap.Size(0, 0)
			});
			label_area.setStyle({
				fontWeight:'bold',
				color: 'black',
				fontSize: label_area_fontSize,
				height: label_area_height,
				lineHeight: label_area_lineHeight,
				fontFamily: '微软雅黑',
				display: 'none',
				backgroundColor: '#CFCFCF',
				borderRadius: label_area_borderRadius,
				padding: label_area_padding,
				border: 0
			});
			map.addOverlay(label_area);
			
			//绘制街道
			var polygon = new Array();
			for(var i = 0; i < dataSet.length; i++) {
				var bmapSet = new Array();
				for(var j = 0; j < dataSet[i].length; j++) {
					var bd_cor = GPS.bd_encrypt(parseFloat(dataSet[i][j][0]), parseFloat(dataSet[i][j][1]));
					var bmap = new BMap.Point(bd_cor[0], bd_cor[1]);
					bmapSet.push(bmap);
				}

				polygon.push(new BMap.Polygon(bmapSet, styleOptions));
				map.addOverlay(polygon[i]);
			}
			
			//为各个街道增加监听器,用于显示人数标签
			map.addEventListener('mousemove', function(e) {
				for(var i = 0; i < polygon.length; i++) {
					if(BMapLib.GeoUtils.isPointInPolygon(e.point, polygon[i])) {
						label_area.setStyle({
							display: 'block'
						});
						break;
					} else {
						label_area.setStyle({
							display: 'none'
						});
					}
				}
			});
		}
	})
}

DrawStreetArea();