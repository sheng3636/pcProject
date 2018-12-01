/**
 * JavaScript CommUtil
 */
;
(function(factory) {
	if(typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else {
		factory(jQuery);
	}

}(function($) {
	'use strict';

	if(typeof(module) !== 'undefined') {
		module.exports = CommUtil;
	}

	//requirejs(AMD) support
	if(typeof define === 'function' && define.amd) {
		define([], function() {
			'use strict';
			return CommUtil;
		});
	}

	//seajs(CMD) support
	if(typeof define === 'function') {
		define([], function() {
			'use strict';
			return CommUtil;
		});
	}

	var CommUtil = function() {}

	/**
	 * 解析URL中的参数
	 * @param url
	 * @returns {Object}
	 */
	CommUtil.prototype.parseUrlParm = function(url) {
		var str = url.substr(url.indexOf('?') + 1);
		var arr = str.split('&');
		var obj = {};
		for(var i = 0; i < arr.length; i++) {
			var earr = arr[i].split('=');
			obj[earr[0]] = earr[1];
		}
		return obj;
	}

	/**
	 * 返回星期
	 * @param dateStr 日期字符串
	 * @returns string
	 */
	CommUtil.prototype.getWeek = function(dateStr) {
		var date = new Date(dateStr);
		var Week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
		return Week[date.getDay()];
	}
	
	CommUtil.prototype.isRealNum = function(val) {
		// isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if(val === "" || val == null){
        return false;
    }
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
	}
	

	//---------------------------------------------------  
	//日期格式化  
	//格式 YYYY/yyyy/YY/yy 表示年份  
	//MM/M 月份  
	//W/w 星期  
	//dd/DD/d/D 日期  
	//hh/HH/h/H 时间  
	//mm/m 分钟  
	//ss/SS/s/S 秒  
	//--------------------------------------------------- 
	Date.prototype.Format = function(formatStr) {
		var str = formatStr;
		var Week = ['日', '一', '二', '三', '四', '五', '六'];

		str = str.replace(/yyyy|YYYY/, this.getFullYear());
		str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

		str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
		str = str.replace(/M/g, this.getMonth() + 1);

		str = str.replace(/w|W/g, Week[this.getDay()]);

		str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
		str = str.replace(/d|D/g, this.getDate());

		str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
		str = str.replace(/h|H/g, this.getHours());

		str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
		str = str.replace(/m/g, this.getMinutes());

		str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
		str = str.replace(/s|S/g, this.getSeconds());

		return str;
	}

	//数组去重
	Array.prototype.unique = function() {
		var temp = new Array();
		this.sort();
		for(var i = 0; i < this.length; i++) {
			if(this[i] == this[i + 1]) {
				continue;
			}
			temp[temp.length] = this[i];
		}
		return temp;
	}
	//字符串全部替换
	String.prototype.replaceAll = function(s1, s2) {　　
		return this.replace(new RegExp(s1, "gm"), s2);　　
	}

	var old = $.fn.commUtil;

	$.fn.commUtil = $.extend($.fn.commUtil, CommUtil.prototype);

	$.fn.commUtil.constant = {
		domain:	"http://172.31.45.3:8080/",
		// domain:	"http://10.4.230.55:8080/",
		baseUrl: "http://172.31.45.3/ict_intelligence_home/v2",
		baseUrl1: "http://172.31.45.3/ict_intelligence_home",

		baiduAk: "ae118a3cb35e46e5a936cf15b2d1edc3", //百度ak码,理想集团313
	}

	$.fn.commUtil.Constructor = CommUtil;

	$.fn.commUtil.noConflict = function() {
		$.fn.commUtil = old;
		return this;
	};

	/**
	 * 地图初始化
	 * @param param 
	 * @returns string
	 */
	$.fn.commUtil.mapInit = function(id, param) {
//		var param = {
//			direct: 1,
//			bearing: 1,
//			mapZoom: 15.548828967172582,
//			mapCenter: [121.53408537187192, 31.127575097936003],
//			mapOpacityZoom: 13.003436315165965,
//			mapBearing: 0,
//			mapPitch: 35.000000000000014,
//			type: 1,
//			showIcon: "视频流"
//		}
		var path = "http://47.97.104.216/ZHJY";
//		var path = "http://172.31.45.3:8080/ZHJY";
		if(path.lastIndexOf("/") + 1 != path.length) {
			path += "/";
		}
		if(Object.keys(param).length > 0) {
			path += "?"
			var dataList = [];
			$.each(param, function(key, value) {
				if(value instanceof Array) {
					value = "[" + value.toString() + "]";
				}
				dataList.push(key + "=" + encodeURIComponent(value))
			});
			path += dataList.join("&");
		}
		$("#" + id).attr("src", path);
	};

	/**
	 * 返回摄像头视频
	 * @param param 
	 *	{
	 *		title: "flv点播",
	 *		width: 680,
	 *      height: 448,
	 *		file: "http://172.31.45.5:8000/live/008.m3u8",
	 *      image: "http://gcqq450f71eywn6bv7u.exp.bcevod.com/mda-hiup6h1qdymgf3fe/mda-hiup6h1qdymgf3fe.jpg", // 视频截图
	 *	}
	 * @returns string
	 */
	$.fn.commUtil.playerInit = function(id, param) {
		var player = cyberplayer(id).setup({
			ak: $.fn.commUtil.constant.baiduAk,
			width: param.width,
			height: param.height,
			//播放地址（×一定要支持跨域访问，否则要设置primary参数）
			file: param["file"],
			// 设置媒体流的预览图
			image: param["image"],
			//非必选
			title: param.title ? param.title : "视频",
			//设置是否在播放器载入后自动播放：true : 自动播放；false : 不自动播放
			autostart: param["autostart"] ? param["autostart"] : true,
			//设置视频的重复播放模式，重复模式分为：1.false:无重复； 2.true: 重复播放
			repeat: param["repeat"] ? param["repeat"] : false,
			//设置播放器缩放方式，缩放方式分为：
			//1.none:不缩放；2.uniform:添加黑边缩放；
			//3. exactfit:改变宽高比缩到最大；4.fill:剪切并缩放到最大（默认方式为uniform）
			stretching: param["stretching"] ? param["stretching"] : "exactfit",
			//设置播放器音量大小，范围（0 - 100）
			volume: param["volume"] ? param["volume"] : 0,
			//设置播放器控制条的显示模式，显示模式分为：1.none:不显示；2.over:悬浮(鼠标无操作时自动隐藏)
			controls: param["controls"] ? param["controls"] : "none",
			starttime: 0,
			// 强制使用flash来播放，不设置的话则默认高优使用H5进行播放
			// primary: "flash", 
		});
	}
}));