$(document).ready(function(){
	
	
		var equipMentJson = [
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299928","equipment_state":"正常","equipment_lat":"31.204147","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.297973","equipment_state":"预警","equipment_lat":"31.204282","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljtw.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298014","equipment_state":"正常","equipment_lat":"31.204130","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298987","equipment_state":"正常","equipment_lat":"31.204215","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298047","equipment_state":"预警","equipment_lat":"31.204196","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljtw.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299016","equipment_state":"正常","equipment_lat":"31.203925","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298895","equipment_state":"正常","equipment_lat":"31.204227","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298851","equipment_state":"正常","equipment_lat":"31.203722","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298022","equipment_state":"正常","equipment_lat":"31.204514","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298285","equipment_state":"预警","equipment_lat":"31.203808","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljtw.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.297918","equipment_state":"正常","equipment_lat":"31.203756","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298806","equipment_state":"正常","equipment_lat":"31.204327","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299625","equipment_state":"正常","equipment_lat":"31.204365","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298859","equipment_state":"预警","equipment_lat":"31.204669","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljtw.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299611","equipment_state":"正常","equipment_lat":"31.205017","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299445","equipment_state":"正常","equipment_lat":"31.205161","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299433","equipment_state":"正常","equipment_lat":"31.204800","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299698","equipment_state":"正常","equipment_lat":"31.205024","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299261","equipment_state":"正常","equipment_lat":"31.204830","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		    {"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299891","equipment_state":"正常","equipment_lat":"31.204805","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
			
			{"equipment_name":"智能烟感","equipment_long":"121.298859","equipment_state":"正常","equipment_lat":"31.203970","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298172","equipment_state":"失联","equipment_lat":"31.204282","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yangans.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298987","equipment_state":"正常","equipment_lat":"31.204130","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.297974","equipment_state":"正常","equipment_lat":"31.204215","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298046","equipment_state":"正常","equipment_lat":"31.204196","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299008","equipment_state":"失联","equipment_lat":"31.203925","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yangans.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298510","equipment_state":"正常","equipment_lat":"31.204227","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298959","equipment_state":"正常","equipment_lat":"31.203722","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298927","equipment_state":"正常","equipment_lat":"31.204514","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298283","equipment_state":"失联","equipment_lat":"31.203808","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yangans.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298602","equipment_state":"正常","equipment_lat":"31.203756","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.297940","equipment_state":"失联","equipment_lat":"31.204327","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yangans.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298463","equipment_state":"正常","equipment_lat":"31.204365","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.297937","equipment_state":"正常","equipment_lat":"31.204459","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298551","equipment_state":"预警","equipment_lat":"31.204897","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganw.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298998","equipment_state":"正常","equipment_lat":"31.205003","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299012","equipment_state":"预警","equipment_lat":"31.205128","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganw.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299780","equipment_state":"正常","equipment_lat":"31.204757","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299490","equipment_state":"正常","equipment_lat":"31.204913","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299176","equipment_state":"正常","equipment_lat":"31.205243","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299583","equipment_state":"正常","equipment_lat":"31.204698","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299506","equipment_state":"正常","equipment_lat":"31.204735","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299459","equipment_state":"正常","equipment_lat":"31.204879","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298894","equipment_state":"正常","equipment_lat":"31.204676","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298859","equipment_state":"正常","equipment_lat":"31.204743","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298968","equipment_state":"失联","equipment_lat":"31.204676","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yangans.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299080","equipment_state":"正常","equipment_lat":"31.204713","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299732","equipment_state":"正常","equipment_lat":"31.204743","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.299866","equipment_state":"正常","equipment_lat":"31.205168","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
		    {"equipment_name":"智能烟感","equipment_long":"121.298806","equipment_state":"正常","equipment_lat":"31.205063","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			
			{"equipment_name":"消防栓水压","equipment_long":"121.298837","equipment_state":"正常","equipment_lat":"31.204557","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
		    {"equipment_name":"消防栓水压","equipment_long":"121.299397","equipment_state":"正常","equipment_lat":"31.204377","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
		    {"equipment_name":"消防栓水压","equipment_long":"121.298662","equipment_state":"正常","equipment_lat":"31.204355","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
		    {"equipment_name":"消防栓水压","equipment_long":"121.299654","equipment_state":"正常","equipment_lat":"31.204654","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
		    {"equipment_name":"消防栓水压","equipment_long":"121.299980","equipment_state":"正常","equipment_lat":"31.204571","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
		    {"equipment_name":"消防栓水压","equipment_long":"121.299513","equipment_state":"正常","equipment_lat":"31.204297","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
		   
			{"equipment_name":"智能停车","equipment_long":"121.299583","equipment_state":"正常","equipment_lat":"31.204157","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
		    {"equipment_name":"智能停车","equipment_long":"121.299506","equipment_state":"正常","equipment_lat":"31.204148","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
		    {"equipment_name":"智能停车","equipment_long":"121.299459","equipment_state":"正常","equipment_lat":"31.204498","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
		    {"equipment_name":"智能停车","equipment_long":"121.298894","equipment_state":"正常","equipment_lat":"31.204170","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
		    {"equipment_name":"智能停车","equipment_long":"121.298859","equipment_state":"正常","equipment_lat":"31.204652","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
		    {"equipment_name":"智能停车","equipment_long":"121.298968","equipment_state":"正常","equipment_lat":"31.204275","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
		    {"equipment_name":"智能停车","equipment_long":"121.299080","equipment_state":"正常","equipment_lat":"31.204410","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
		    {"equipment_name":"智能停车","equipment_long":"121.299732","equipment_state":"正常","equipment_lat":"31.204645","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
		    {"equipment_name":"智能停车","equipment_long":"121.299866","equipment_state":"正常","equipment_lat":"31.204666","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.298806","equipment_state":"正常","equipment_lat":"31.204251","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
		    {"equipment_name":"智能停车","equipment_long":"121.299625","equipment_state":"正常","equipment_lat":"31.204712","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.298859","equipment_state":"正常","equipment_lat":"31.204184","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			
			
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},

			{"equipment_name":"高空抛物","equipment_long":"121.299133","equipment_state":"正常","equipment_lat":"31.204702","equipment_type":"高空抛物","equipment_lng":"121.299615","imgUrl":"images/gkz.png","equipmentImg": "images/gaokongpao.jpg"},
		    {"equipment_name":"高空抛物","equipment_long":"121.299015","equipment_state":"正常","equipment_lat":"31.204327","equipment_type":"高空抛物","equipment_lng":"121.299615","imgUrl":"images/gkz.png","equipmentImg": "images/gaokongpao.jpg"},
		];
		//烟感
		var YGJson =[
			{"equipment_name":"智能烟感","equipment_long":"121.298859","equipment_state":"正常","equipment_lat":"31.203970","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298172","equipment_state":"失联","equipment_lat":"31.204282","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yangans.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298987","equipment_state":"正常","equipment_lat":"31.204130","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.297974","equipment_state":"正常","equipment_lat":"31.204215","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298046","equipment_state":"正常","equipment_lat":"31.204196","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299008","equipment_state":"失联","equipment_lat":"31.203925","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yangans.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298510","equipment_state":"正常","equipment_lat":"31.204227","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298959","equipment_state":"正常","equipment_lat":"31.203722","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298927","equipment_state":"正常","equipment_lat":"31.204514","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298283","equipment_state":"失联","equipment_lat":"31.203808","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yangans.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298602","equipment_state":"正常","equipment_lat":"31.203756","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.297940","equipment_state":"失联","equipment_lat":"31.204327","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yangans.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298463","equipment_state":"正常","equipment_lat":"31.204365","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.297937","equipment_state":"正常","equipment_lat":"31.204459","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298551","equipment_state":"预警","equipment_lat":"31.204897","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganw.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298998","equipment_state":"正常","equipment_lat":"31.205003","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
            {"equipment_name":"智能烟感","equipment_long":"121.299012","equipment_state":"预警","equipment_lat":"31.205128","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganw.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299780","equipment_state":"正常","equipment_lat":"31.204757","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299490","equipment_state":"正常","equipment_lat":"31.204913","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299176","equipment_state":"正常","equipment_lat":"31.205243","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299583","equipment_state":"正常","equipment_lat":"31.204698","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299506","equipment_state":"正常","equipment_lat":"31.204735","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299459","equipment_state":"正常","equipment_lat":"31.204879","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298894","equipment_state":"正常","equipment_lat":"31.204676","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298859","equipment_state":"正常","equipment_lat":"31.204743","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298968","equipment_state":"失联","equipment_lat":"31.204676","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yangans.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299080","equipment_state":"正常","equipment_lat":"31.204713","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299732","equipment_state":"正常","equipment_lat":"31.204743","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299866","equipment_state":"正常","equipment_lat":"31.205168","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298806","equipment_state":"正常","equipment_lat":"31.205063","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299625","equipment_state":"正常","equipment_lat":"31.204669","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.298859","equipment_state":"正常","equipment_lat":"31.205017","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			{"equipment_name":"智能烟感","equipment_long":"121.299611","equipment_state":"正常","equipment_lat":"31.205161","equipment_type":"智能烟感 ","equipmentImg": "images/yangan.png","imgUrl":"images/yanganz.png"},
			];

		// 消防栓
    var totJson = [
	    	{"equipment_name":"消防栓水压","equipment_long":"121.298837","equipment_state":"正常","equipment_lat":"31.204557","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
			{"equipment_name":"消防栓水压","equipment_long":"121.299397","equipment_state":"正常","equipment_lat":"31.204377","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
			{"equipment_name":"消防栓水压","equipment_long":"121.298662","equipment_state":"正常","equipment_lat":"31.204355","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
			{"equipment_name":"消防栓水压","equipment_long":"121.299654","equipment_state":"正常","equipment_lat":"31.204654","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
			{"equipment_name":"消防栓水压","equipment_long":"121.299980","equipment_state":"正常","equipment_lat":"31.204571","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"},
			{"equipment_name":"消防栓水压","equipment_long":"121.299513","equipment_state":"正常","equipment_lat":"31.204297","equipment_type":"消防栓水压","imgUrl":"images/xiaofz.png","equipmentImg": "images/xiaofs.jpg"}
			];

    // 地磁停车
		var carJson = [
			{"equipment_name":"智能停车","equipment_long":"121.299625","equipment_state":"正常","equipment_lat":"31.204459","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.298859","equipment_state":"正常","equipment_lat":"31.204282","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.299611","equipment_state":"正常","equipment_lat":"31.204130","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.299445","equipment_state":"正常","equipment_lat":"31.204215","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.299433","equipment_state":"正常","equipment_lat":"31.204196","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.299200","equipment_state":"正常","equipment_lat":"31.205259","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300094","equipment_state":"正常","equipment_lat":"31.205221","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.299713","equipment_state":"正常","equipment_lat":"31.205079","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.299423","equipment_state":"正常","equipment_lat":"31.205007","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.300004","equipment_state":"正常","equipment_lat":"31.204838","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.299509","equipment_state":"正常","equipment_lat":"31.205208","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
			{"equipment_name":"智能停车","equipment_long":"121.299937","equipment_state":"正常","equipment_lat":"31.205190","equipment_type":"智能停车","imgUrl":"images/dicz.png","equipmentImg": "images/dici.jpg"},
		];

	// 高空抛物
		var gaokongJson = [
			{"equipment_name":"高空抛物","equipment_long":"121.299133","equipment_state":"正常","equipment_lat":"31.204702","equipment_type":"高空抛物","equipment_lng":"121.299615","imgUrl":"images/gkz.png","equipmentImg": "images/gaokongpao.jpg"},
			{"equipment_name":"高空抛物","equipment_long":"121.299015","equipment_state":"正常","equipment_lat":"31.204327","equipment_type":"高空抛物","equipment_lng":"121.299615","imgUrl":"images/gkz.png","equipmentImg": "images/gaokongpao.jpg"}
			];

    // 垃圾桶
	var lajiJson = [
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299928","equipment_state":"正常","equipment_lat":"31.204147","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.297973","equipment_state":"预警","equipment_lat":"31.204282","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljtw.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298014","equipment_state":"正常","equipment_lat":"31.204130","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298987","equipment_state":"正常","equipment_lat":"31.204215","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298047","equipment_state":"预警","equipment_lat":"31.204196","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljtw.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299016","equipment_state":"正常","equipment_lat":"31.203925","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298895","equipment_state":"正常","equipment_lat":"31.204227","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298851","equipment_state":"正常","equipment_lat":"31.203722","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298022","equipment_state":"正常","equipment_lat":"31.204514","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298285","equipment_state":"预警","equipment_lat":"31.203808","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljtw.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.297918","equipment_state":"正常","equipment_lat":"31.203756","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298806","equipment_state":"正常","equipment_lat":"31.204327","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299625","equipment_state":"正常","equipment_lat":"31.204365","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.298859","equipment_state":"预警","equipment_lat":"31.204669","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljtw.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299611","equipment_state":"正常","equipment_lat":"31.205017","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299445","equipment_state":"正常","equipment_lat":"31.205161","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299433","equipment_state":"正常","equipment_lat":"31.204800","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299698","equipment_state":"正常","equipment_lat":"31.205024","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299261","equipment_state":"正常","equipment_lat":"31.204830","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		{"equipment_name":"垃圾箱满溢检测","equipment_long":"121.299891","equipment_state":"正常","equipment_lat":"31.204805","equipment_type":"垃圾箱满溢检测","equipment_lng":"121.299615","imgUrl":"images/ljt.png","equipmentImg": "images/lajito.jpg"},
		];

    //人物表数据
		var peoplejson =[{"people_id":"P01","people_lng":"121.299470","people_phone":"18134513508","people_desc":"id1","people_lat":"31.204634","people_name":"郑思思","people_company":"二联馨苑管理处2部"},
				{"people_id":"P02","people_lng":"121.299830","people_phone":"18934514862","people_desc":"id2","people_lat":"31.204857","people_name":"陈俊","people_company":"二联馨苑管理处2部"},
				{"people_id":"P03","people_lng":"121.299290","people_phone":"13634513817","people_desc":"id3","people_lat":"31.204079","people_name":"金世民","people_company":"二联馨苑管理处2部"},
				{"people_id":"P04","people_lng":"121.298497","people_phone":"13834513029","people_desc":"id4","people_lat":"31.204812","people_name":"池伟民","people_company":"二联馨苑管理处2部"},
				{"people_id":"P05","people_lng":"121.300036","people_phone":"18134519659","people_desc":"id5","people_lat":"31.204919","people_name":"李金东","people_company":"二联馨苑物业管理1部"},
				{"people_id":"P06","people_lng":"121.299340","people_phone":"13834514001","people_desc":"id6","people_lat":"31.204531","people_name":"潘铁鹏","people_company":"二联馨苑物业管理1部司 "},
				{"people_id":"P07","people_lng":"121.300037","people_phone":"18134510277","people_desc":"id7","people_lat":"31.204757","people_name":"唐淑红","people_company":"二联馨苑物业管理1部"},
				{"people_id":"P08","people_lng":"121.299603","people_phone":"13134515603","people_desc":"id8","people_lat":"31.204755","people_name":"余增明","people_company":"二联馨苑居民自治小组2组"},
				{"people_id":"P09","people_lng":"121.299917","people_phone":"15834511670","people_desc":"id9","people_lat":"31.204676","people_name":"嵇九通","people_company":"二联馨苑居民自治小组2组"},
				{"people_id":"P10","people_lng":"121.299523","people_phone":"13334519999","people_desc":"id10","people_lat":"31.204665","people_name":"郑翚","people_company":"二联馨苑居民自治小组2组"},
				{"people_id":"P11","people_lng":"121.298917","people_phone":"18934510083","people_desc":"id11","people_lat":"31.204541","people_name":"陆倩怡","people_company":"二联馨苑居民自治小组2组"},
				{"people_id":"P12","people_lng":"121.299872","people_phone":"18034517235","people_desc":"id12","people_lat":"31.204483","people_name":"张军","people_company":"二联馨苑居民自治小组2组"},
				{"people_id":"P13","people_lng":"121.299171","people_phone":"18934514777","people_desc":"id13","people_lat":"31.204778","people_name":"贾玉曲","people_company":"二联馨苑社区居委会"},
				{"people_id":"P14","people_lng":"121.299308","people_phone":"13134511670","people_desc":"id14","people_lat":"31.204230","people_name":"郑旺","people_company":"二联馨苑社区居委会"},
				{"people_id":"P15","people_lng":"121.299657","people_phone":"18934510366","people_desc":"id15","people_lat":"31.204847","people_name":"刘东阳","people_company":"二联馨苑社区居委会"},
				{"people_id":"P16","people_lng":"121.299660","people_phone":"13834511567","people_desc":"id16","people_lat":"31.204703","people_name":"张金才","people_company":"二联馨苑物业管理3部"},
				{"people_id":"P17","people_lng":"121.299262","people_phone":"13734519770","people_desc":"id17","people_lat":"31.204620","people_name":"陈浬","people_company":"二联馨苑物业管理3部"},
				{"people_id":"P18","people_lng":"121.298910","people_phone":"18634510254","people_desc":"id18","people_lat":"31.204416","people_name":"徐志龙","people_company":"二联馨苑物业管理3部"},
				{"people_id":"P19","people_lng":"121.298969","people_phone":"18934510212","people_desc":"id19","people_lat":"31.204591","people_name":"连成建","people_company":"二联馨苑物业管理3部"},
				{"people_id":"P20","people_lng":"121.298486","people_phone":"15834514461","people_desc":"id20","people_lat":"31.204736","people_name":"连成建","people_company":"二联馨苑管理处1部"},
				{"people_id":"P21","people_lng":"121.300062","people_phone":"17634510333","people_desc":"id21","people_lat":"31.204576","people_name":"付丽楠","people_company":"二联馨苑管理处1部"},
				{"people_id":"P22","people_lng":"121.299878","people_phone":"18934510233","people_desc":"id22","people_lat":"31.204715","people_name":"周玉霞","people_company":"二联馨苑管理处1部"},
				{"people_id":"P23","people_lng":"121.299502","people_phone":"18834513369","people_desc":"id23","people_lat":"31.204072","people_name":"潘峰","people_company":"二联馨苑管理处1部"},
				{"people_id":"P24","people_lng":"121.299996","people_phone":"17734510003","people_desc":"id24","people_lat":"31.204879","people_name":"廖樱","people_company":"二联馨苑管理处1部"},
				{"people_id":"P25","people_lng":"121.299819","people_phone":"18834518669","people_desc":"id25","people_lat":"31.204764","people_name":"刘超","people_company":"二联馨苑管理处1部"},
				{"people_id":"P26","people_lng":"121.300021","people_phone":"13334515551","people_desc":"id26","people_lat":"31.204309","people_name":"朱晨晖","people_company":"二联馨苑居民自治小组1组"},
				{"people_id":"P27","people_lng":"121.298887","people_phone":"15034511563","people_desc":"id27","people_lat":"31.204022","people_name":"顾燮嘉","people_company":"二联馨苑居民自治小组1组"},
				{"people_id":"P28","people_lng":"121.298566","people_phone":"18634519501","people_desc":"id28","people_lat":"31.204768","people_name":"朱瑞敏","people_company":"二联馨苑物业管理2部 "},
				{"people_id":"P29","people_lng":"121.299200","people_phone":"13334517352","people_desc":"id29","people_lat":"31.204610","people_name":"陈咏","people_company":"二联馨苑物业管理2部"}
				];

		// 百度地图API功能
		var map = new BMap.Map("map");
		var point = new BMap.Point(121.298973,31.204434); //初始化地图  二联馨苑
		map.centerAndZoom(point, 18);
		map.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放
		map.enableDragging();   //开启拖拽a
		polygonFn(); // 地图区域 覆盖物

		map.setMapStyle({style:'midnight'}); // 引入地图样式
	
		$(".BMap_bottom").next().next().children("img").attr("src","");

		//切换地图 标记点
		var num01=$(".divright .top .list .lists .num01");
		var num02=$(".divright .top .list .lists .num02");
		var num03=$(".divright .top .list .lists .num03");

		$("#swiperWraper").on("click",".swiperItem",function(event){
			
		   var idx = $(this).attr('data-target')-1;
//		   console.log(idx);
			if(idx === 0 || idx == undefined){ // 显示全部标点
				// showSTMark(equipMentJson);
				showSigleMark(equipMentJson);
				num01.html(752);
				num02.html(23);
				num03.html(24)
				
			} else if(idx === 1) { //烟感
				showSigleMark(YGJson);
				num01.html(26);
				num02.html(2);
				num03.html(5)
			}else if(idx === 2) { //消防栓
				showSigleMark(totJson);
				num01.html(6);
				num02.html(0);
				num03.html(0)
			}else if(idx === 3) { //地磁
				showSigleMark(carJson);
				num01.html(12);
				num02.html(0);
				num03.html(0)
			}else if(idx === 4) { //高空抛物
				showSigleMark(gaokongJson);
				num01.html(2);
				num02.html(0);
				num03.html(0)
			}else if(idx === 5) { //垃圾桶
				showSigleMark(lajiJson);
				num01.html(15);
				num02.html(4);
				num03.html(0)
            }else {
				return;
			}
		});

    		showSigleMark(equipMentJson);// 显示全部

		function polygonFn () {//添加地图 区域覆盖

			var polygon = new BMap.Polygon([
				new BMap.Point(121.297356,31.204149),
				new BMap.Point(121.298569,31.205029),
				new BMap.Point(121.30002,31.206102),
				new BMap.Point(121.300487,31.205361),
				new BMap.Point(121.30002,31.204956),
				new BMap.Point(121.300379,31.204454),
				new BMap.Point(121.299696,31.204033),
				new BMap.Point(121.299072,31.203566),
				new BMap.Point(121.298951,31.203462),
                new BMap.Point(121.298317,31.202967),
                new BMap.Point(121.298317,31.202967)
				
			], {strokeColor:"red", strokeWeight:2, strokeOpacity:0.1,fillOpacity:0.1, fillColor:"blue", });  //创建多边形   覆盖物       
			//把标注添加到地图上
			map.addOverlay(polygon);
		}

		// 人物头像 切换
		$("#peopleClosePhoto").click(function(event){
			event.stopPropagation();
			$("#peoplePhoto").show();
			$(this).hide();
			
			showPeopleMark(peoplejson);
		});

		$("#peoplePhoto").click(function(event){
			event.stopPropagation();
			$(this).hide();
			$("#peopleClosePhoto").show();
			showSigleMark(equipMentJson);
		});
	
				// 人物头像 显示 隐藏 标记物
			function showPeopleMark(json) {
					// map.clearOverlays(); 
					// polygonFn();

					json.forEach(function(value,key) {
						
						var lng = Number(value.people_lng); // 经纬度转数字
						var lat = Number(value.people_lat);
					
						var markIcon ="images/peoplePho.png";
						var myIcon = new BMap.Icon(markIcon, new BMap.Size(30,30));
						var marker = new BMap.Marker(new BMap.Point(lng,lat), {icon:myIcon});  // 创建标注
						map.addOverlay(marker);

						var content = "<div style='width: 220px;'>" +
						"<div style='width:100%;height:150px;text-align:center;'><img style='max-width:90%;height:100%;width:auto;' id='imgDemo' src='images/safety/"+value.people_desc+".png' title=''/></div>" +
						"<div style='overflow: hidden;margin-top:5px;'>" +
							"<div class='mapTitleStyle'>工作单位：</div>" +
							"<div class='mapDesStyle'>"+value.people_company+"</div>" +
						"</div>" +
						"<div style='overflow: hidden;'>" +
							"<div class='mapTitleStyle'>工作编号：</div>" +
							"<div class='mapDesStyle'> "+value.people_id+"</div>" +
						"</div>" +
						"<div style='overflow: hidden;'>" +
							"<div class='mapTitleStyle'>工作人员：</div>" +
							"<div class='mapDesStyle'>"+value.people_name+"</div>" +
						"</div>" +
						"<div style='overflow: hidden;'>" +
							"<div class='mapTitleStyle' style='width:70px;'></div>" +
							"<div class='mapDesStyle'>"+value.people_phone+"</div>" +
						"</div>" +
						"</div>";
					
						addClickHandler(content,marker);
					})
				}

			// 显示所有单种设备的所有 标记物
			function showSigleMark(json) {

				map.clearOverlays(); 
				polygonFn();

				json.forEach(function(value,key) {
					// var lng = value.equipment_position.lng;
					// var lat = value.equipment_position.lat;
					var lng = Number(value.equipment_long);
					var lat = Number(value.equipment_lat);
					var markIcon =value.imgUrl;
					var myIcon = new BMap.Icon(markIcon, new BMap.Size(30,30));
					var marker = new BMap.Marker(new BMap.Point(lng,lat), {icon:myIcon});  // 创建标注
					map.addOverlay(marker);

					var content = "<div style='width: 240px;margin-top:10px;'>" +
							"<img style='width:100%;height:150px;' id='imgDemo' src='"+value.equipmentImg+"' title=''/>" +
							"<div style='overflow: hidden;margin-top:5px;'>" +
								"<div class='mapTitleStyle'>设备名称：</div>" +
								"<div class='mapDesStyle'>"+value.equipment_name+"</div>" +
							"</div>" +
							"<div style='overflow: hidden;'>" +
								"<div class='mapTitleStyle'>设备状态：</div>" +
								"<div class='mapDesStyle'>"+value.equipment_state+"</div>" +
							"</div>" +
							"<div style='overflow: hidden;'>" +
								"<div class='mapTitleStyle'>设备类型：</div>" +
								"<div class='mapDesStyle'>"+value.equipment_type+"</div>" +
							"</div>" +
							"</div>";
				
					addClickHandler(content,marker);
				})
			}

			// 点击标注执行事件
		function addClickHandler(content,marker){

			var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象 \
			marker.addEventListener("click",function(e){  // 标记点事件
				var p = e.target;
				var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
				map.openInfoWindow(infoWindow,point); //开启信息窗口
				//地图 样式
				$("#map .BMap_bubble_title").parent("div").addClass("aaa");
				$("#map .BMap_bottom").next().next().children("img").parent().addClass("aaa")
				$("#map .BMap_bottom").next().next().children("img").attr("src","images/point-down.png");
				$("#map .BMap_bottom").next().next().children("img").addClass("map-img");
				
			});
		}

		// 点击 右边设备信息 地图标记
		// $('#equipment1').click(function(){
		// 	sigleShebMark();
		// });

		//显示地图上 一种设备的单个标记物
		function sigleShebMark(){
			map.clearOverlays(); 
			var single1 = {equipment_name:"消防栓",equipment_position:{lng:121.545238,lat:31.132781},equipment_state:"正常",equipment_type:"消防栓",imgUrl:"images/ljt.png"};
			
			polygonFn();
				var lng = single1.equipment_position.lng;
				var lat = single1.equipment_position.lat;
			
				var markIcon =single1.imgUrl;
				var myIcon = new BMap.Icon(markIcon, new BMap.Size(100,60));
				var marker = new BMap.Marker(new BMap.Point(lng,lat), {icon:myIcon});  // 创建标注
				map.addOverlay(marker);

				var content = "<div style='width: 240px;margin-top:10px;'>" +
						"<img style='width:100%;height:120px;' id='imgDemo' src='images/lix.jpg' title=''/>" +
						"<div style='overflow: hidden;margin-top:5px;'>" +
							"<div class='mapTitleStyle'>设备名称：</div>" +
							"<div class='mapDesStyle'>"+single1.equipment_name+"</div>" +
						"</div>" +
						"<div style='overflow: hidden;'>" +
							"<div class='mapTitleStyle'>设备状态：</div>" +
							"<div class='mapDesStyle'>"+single1.equipment_state+"</div>" +
						"</div>" +
						"<div style='overflow: hidden;'>" +
							"<div class='mapTitleStyle'>设备类型：</div>" +
							"<div class='mapDesStyle'>"+single1.equipment_type+"</div>" +
						"</div>" +
						"</div>";
			
				addClickHandler(content,marker);
	}


			// // 中间 小地图 引用
			var smallMap = new BMap.Map("centerMap");
			var smallPoint = new BMap.Point(121.296606,31.206442); //初始化地图
			var smallPolygon = new BMap.Polygon([  //添加地图 区域覆盖
				new BMap.Point(121.297356,31.204149),
				new BMap.Point(121.298569,31.205029),
				new BMap.Point(121.30002,31.206102),
				new BMap.Point(121.300487,31.205361),
				new BMap.Point(121.30002,31.204956),
				new BMap.Point(121.300379,31.204454),
				new BMap.Point(121.299696,31.204033),
				new BMap.Point(121.299072,31.203566),
				new BMap.Point(121.298951,31.203462),
                new BMap.Point(121.298317,31.202967),
                new BMap.Point(121.298317,31.202967)

			], {strokeColor:"red", strokeWeight:2, strokeOpacity:0.1,fillOpacity:0.1, fillColor:"red" });  //创建多边形   覆盖物

		//把标注添加到地图上
			smallMap.addOverlay(smallPolygon);
			smallMap.centerAndZoom(smallPoint, 17);
			smallMap.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放
			smallMap.enableDragging();   //开启拖拽

    var siglePeopleJson = [
    		{"people_id":"P27","people_lng":"121.298887","people_phone":"15034511563","people_desc":"id27","people_lat":"31.204022","people_name":"顾燮嘉","people_company":"二联馨苑居民自治小组1组"}
    	];
        showSmal(siglePeopleJson);
    	smallSigleShebMark();
    function showSmal(json) {
        // smallMap.clearOverlays();
        // polygonFn();

        json.forEach(function(value,key) {
            var lng = Number(value.people_lng); // 经纬度转数字
            var lat = Number(value.people_lat);
            var markIcon ="images/peoplePho.png";
            var myIcon = new BMap.Icon(markIcon, new BMap.Size(30,30));
            var myMarker = new BMap.Marker(new BMap.Point(lng,lat), {icon:myIcon});  // 创建标注
            smallMap.addOverlay(myMarker);

            var content = "<div style='width: 200px; overflow-y: auto'>" +
                "<div style='width:200px;height:70px;text-align:center;'><img style='max-width:100%;height:100%;width:auto;' id='imgDemo' src='images/safety/"+value.people_desc+".png' title=''/></div>" +
                "<div style='overflow: hidden;margin-top:5px;'>" +
                "<div class='smallMapTitleStyle'>工作单位：</div>" +
                "<div class='smallMapDesStyle' >"+value.people_company+"</div>" +
                "</div>" +
                "<div style='overflow: hidden;'>" +
                "<div class='smallMapTitleStyle'>工作编号：</div>" +
                "<div class='smallMapDesStyle'> "+value.people_id+"</div>" +
                "</div>" +
                "<div style='overflow: hidden;'>" +
                "<div class='smallMapTitleStyle'>工作人员：</div>" +
                "<div class='smallMapDesStyle'>"+value.people_name+"</div>" +
                "</div>" +
                "<div style='overflow: hidden;'>" +
                "<div class='smallMapTitleStyle'></div>" +
                "<div class='smallMapDesStyle'>"+value.people_phone+"</div>" +
                "</div>" +
                "</div>";

            var myInfoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象 \

            myMarker.addEventListener("click",function(e){  // 标记点事件
                var p = e.target;
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                smallMap.openInfoWindow(myInfoWindow,point); //开启信息窗口
                //地图 样式
                $(".BMap_bubble_title").parent("div").addClass("aaa");
                $(".BMap_bottom").next().next().children("img").parent().addClass("aaa");
                $(".BMap_bottom").next().next().children("img").attr("src","images/point-down.png");
                $(".BMap_bottom").next().next().children("img").addClass("map-img");
            });
        })
    }

    function smallSigleShebMark(){
        // smallMap.clearOverlays();
        var single1 = {equipment_name:"高空抛物",equipment_position:{lng:121.298851,lat:31.204702},equipment_state:"正常",equipment_type:"高空抛物",imgUrl:"images/gkz.png",equipmentImg: "images/gaokongpao.jpg"};
        // polygonFn();
        var lng = single1.equipment_position.lng;
        var lat = single1.equipment_position.lat;

        var markIcon =single1.imgUrl;
        var myIcon = new BMap.Icon(markIcon, new BMap.Size(30,30));
        var myMarker = new BMap.Marker(new BMap.Point(lng,lat), {icon:myIcon});  // 创建标注
        smallMap.addOverlay(myMarker);

        var content = "<div style='width: 240px;margin-top:10px;'>" +
            "<img style='width:100%;height:120px;' id='imgDemo' src='"+single1.equipmentImg+"' title=''/>" +
            "<div style='overflow: hidden;margin-top:5px;'>" +
            "<div class='mapTitleStyle'>设备名称：</div>" +
            "<div class='mapDesStyle'>"+single1.equipment_name+"</div>" +
            "</div>" +
            "<div style='overflow: hidden;'>" +
            "<div class='mapTitleStyle'>设备状态：</div>" +
            "<div class='mapDesStyle'>"+single1.equipment_state+"</div>" +
            "</div>" +
            "<div style='overflow: hidden;'>" +
            "<div class='mapTitleStyle'>设备类型：</div>" +
            "<div class='mapDesStyle'>"+single1.equipment_type+"</div>" +
            "</div>" +
            "</div>";

        var myInfoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象 \

        myMarker.addEventListener("click",function(e){  // 标记点事件
            var p = e.target;
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            smallMap.openInfoWindow(myInfoWindow,point); //开启信息窗口
            //地图 样式
            $(".BMap_bubble_title").parent("div").addClass("aaa");
            $(".BMap_bottom").next().next().children("img").parent().addClass("aaa");
            $(".BMap_bottom").next().next().children("img").attr("src","images/point-down.png");
            $(".BMap_bottom").next().next().children("img").addClass("map-img");
        });
    }


});
