<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%request.setCharacterEncoding("utf-8"); %>  
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href='css/mapbox-gl.css' rel='stylesheet' />
        <link href='css/dialog.css' rel='stylesheet' />
        <link href='css/index.css' rel='stylesheet' />
        <link href='css/bootstrap-colorpicker.css' rel='stylesheet' />
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/awesome-bootstrap-checkbox.css" rel="stylesheet">
        <link href="css/font-awesome.css" rel="stylesheet">
        
        <script src="js/jquery.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/bootstrap-colorpicker.js"></script>
        <script src="js/dialog.js"></script>
        <script src="js/readMif.js"></script>
        <script src="js/stop.js"></script>
        <!-- <script src="js/new/echarts.js"></script> -->
        <!-- <script src="js/new/echarts-gl.js"></script> -->
        <script src="js/new/mapbox-gl.js"></script>
        <script src="js/turf.min.js"></script>
        <script src="js/mapbox.js"></script>
        <script src="js/index.js"></script>
    </head>
    <body>
    	<div id="options">
    			<div id="parks" class="btn btn-primary" style="display: inline-block;" >显示/隐藏停车位</div>
	    		<div id="tracks" class="btn btn-primary" >显示/隐藏轨迹</div>
	    		<div id="devices" class="btn btn-primary" >显示/隐藏设备</div>
    	</div>
    	<div id="device-options">
	    	<div id="checkAll" class="btn btn-sm btn-default enable-button">全选</div>
	    	<div id="reverseCheck" class="btn btn-sm btn-default enable-button">反选</div>
	    	<div class="checkbox checkbox-success">
                <input id="checkbox1" type="checkbox" dataType="污水房">
                <label for="checkbox1">
                   污水房
                </label>
            </div>
    		<div class="checkbox checkbox-success">
                <input id="checkbox2" type="checkbox" dataType="智能井盖开关">
                <label for="checkbox2">
                    智能井盖开关
                </label>
            </div>
            
            <div class="checkbox checkbox-success">
                <input id="checkbox3" type="checkbox" dataType="地下车库">
                <label for="checkbox3">
                   地下车库
                </label>
            </div>
            <div class="checkbox checkbox-success">
                <input id="checkbox4" type="checkbox"  dataType="河道水浊度">
                <label for="checkbox4">
                   河道水浊度
                </label>
            </div>
            <div class="checkbox checkbox-success">
                <input id="checkbox5" type="checkbox"  dataType="河道无线液位">
                <label for="checkbox5">
                   河道无线液位
                </label>
            </div>
            <div class="checkbox checkbox-success">
                <input id="checkbox6" type="checkbox" dataType="智能垃圾桶">
                <label for="checkbox6">
                    智能垃圾桶
                </label>
            </div>
            <div class="checkbox checkbox-success">
                <input id="checkbox7" type="checkbox" dataType="电气灭弧">
                <label for="checkbox7">
                    电气灭弧
                </label>
            </div>
            <div class="checkbox checkbox-success">
                <input id="checkbox8" type="checkbox" dataType="智能烟感">
                <label for="checkbox8">
                   智能烟感
                </label>
            </div>
            <div class="checkbox checkbox-success">
                <input id="checkbox9" type="checkbox" dataType="智能消防栓">
                <label for="checkbox9">
                   智能消防栓
                </label>
            </div>
            
    	</div>
    	<pre id='features'>
    	</pre>
    	<div id="chart" style="width: 100%;height:100%;"></div>
        <div id="map" style="width: 100%;height:100%;"></div>
         <div class='map-overlay top'>
		    <div class='map-overlay-inner'>
		        <fieldset>
		            <label>Select layer</label>
		            <select id='layer' name='layer'>
		                <option value='water'>Water</option>
		                <option value='other'>Area</option>
		                <option value='road'>Road</option>
		                <option value='sea'>Sea</option>
		                <option value='areas'>Background</option>
		                <option value='areasLine'>AreasLine</option>
		                <option value='building'>Buliding</option>
		                <option value='frontsLine'>RoadFront</option>
		                <option value='frontsPoint'>BuildingFront</option>
		                <option value='park'>Park</option>
		            </select>
		        </fieldset>
		        <fieldset>
		            <label>Choose a color</label>
		            <div id='swatches'></div>
		            
		            <div id="cp5b" class="input-group colorpicker-component" title="Using format option">
					  <input type="text" class="form-control" value="#FF0000" />
					  <span class="input-group-addon"><i></i></span>
					</div>
					<br>
					<div id="save" class="btn btn-primary" >保存</div>
		        </fieldset>
		    </div>
		</div>
    </body>
     <script type="text/javascript">
        	var debug="${param.debug}";
        	var direct="${param.direct}";
        	var bearing="${param.bearing}";
        	var type="${param.type}";
        	var paramData="${param.data}";
        	var options="${param.options}";
        	var mapCenter="${param.mapCenter}";
        	var mapZoom="${param.mapZoom}";
        	var mapBearing="${param.mapBearing}";
        	var mapPitch="${param.mapPitch}";
        	var mapSpeed="${param.mapSpeed}";
        	var mapOpacityZoom="${param.mapOpacityZoom}";
        	var bigParkData=decodeURIComponent("${param.bigParkData}");
        	var showIcon="${param.showIcon}";
        	var iconData="${param.iconData}";
        	var parks="${param.parks}";
        	var clickedBuilding="${param.clickedBuilding}";
        	var allowClickBuliding="${param.allowClickBuliding}";
        	var hideParkOutLineId="${param.hideParkOutLineId}";
        	
        	opacityZoom=+mapOpacityZoom||opacityZoom;
        	if(mapCenter)mapCenter=eval(mapCenter);
        	if(bigParkData){
        		bigParkData=eval('('+bigParkData+')');
        	}else{
        		bigParkData={};
        	}
        	if(showIcon){
        		console.log(showIcon);
        		showIcon=decodeURIComponent(showIcon);
        		showIcon=","+showIcon+",";
        		console.log(showIcon);
        	}
        	if(iconData){
        		console.log(iconData);
        		iconData=decodeURIComponent(iconData);
        		console.log(iconData);
        		iconData=eval('('+iconData+')');
        	}else{
        		iconData={};
        	}
        	if(options==1){
        		$("#features").hide();
        		$("#options").hide();
        		
        		$(".map-overlay").hide();
        		$("#device-options").hide();
        		
        	}
        	if(debug==1){
        		$("#features").show();
        		$("#options").show();
        		$(".map-overlay").show();
        		$("#device-options").show();
        	}
        	if(type==1||type==3){
        		$("#device-options").hide();
        	}
        	if(parks&&parks!=""){
        		parks=parks.split(",");
        	}
        </script>
</html>
