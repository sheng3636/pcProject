;
(function(factory) {
    factory(jQuery, window, document);
}(function($, window, document) {

    $(function() {
        
        //pathname 例子：/intelligentPark/view/park.html
        var pathName = window.location.pathname;
        var origin = window.location.origin + "/intelligentPark";
        pathName = pathName.replace("intelligentPark", "");
        pathName = pathName.replace("view", "");
        pathName = pathName.replaceAll("/", "");
        pathName = pathName.replace(".html", "");
        
//      var isLogin = window.sessionStorage.getItem("isLogin");
//    	if((isLogin == null || isLogin == "") && pathName != "login"){
//    		window.location.href = "login.html?index="+pathName;
//    	}
        //nav事件绑定
//      $("header").html(
//          "<ul>" +
//          "<li class='ict-nav ict-nav-1' name='home'><a href='" + origin + "/view/home.html'>首&nbsp;&nbsp;&nbsp;&nbsp;页</a></li>" +
//          "<li class='ict-nav ict-nav-1' name='#'><a href='" + origin + "'>设备概况</a></li>" +
//          "<li class='ict-nav ict-nav-1' name='#'><a href='" + origin + "/view/person.html'>人员管理</a></li>" +
//          "<li class='ict-nav ict-nav-1' name='park'><a href='" + origin + "/view/park.html'>车辆服务</a></li>" +
//          "<li class='ict-nav ict-nav-0'></li>" +
//          "<li class='ict-nav ict-nav-2' name='#'><a href='" + origin + "/view/car.html'>班车服务</a></li>" +
//          "<li class='ict-nav ict-nav-2' name='#'><a href='" + origin + "/view/canteen.html'>食堂管理</a></li>" +
//          "</ul>"
//      );
        $("header").html(
            "<ul>" +
            "<li class='ict-nav ict-nav-1' name='person'><a href='person.html'>人员管理</a></li>" +
            "<li class='ict-nav ict-nav-1' name='park'><a href='park.html'>车辆管理</a></li>" +
            "<li class='ict-nav ict-nav-1' name='car'><a href='car.html'>班车管理</a></li>" +
            "<li class='ict-nav ict-nav-1' name='canteen'><a href='canteen.html'>食堂管理</a></li>" +
            "<li class='ict-nav ict-nav-0'></li>" +
            "<li class='ict-nav ict-nav-2' name='equipment'><a href='equipment.html'>设备管理</a></li>" +
            "<li class='ict-nav ict-nav-2' name='event'><a href='event.html'>事件处理</a></li>" +
            "<li class='ict-nav ict-nav-2' name='worker'><a href='worker.html'>员工视图</a></li>" + //<i class='wait'></i>
            "<li class='ict-nav ict-nav-2' name='company'><a href='company.html'>企业视图</a></li>" +  //<i class='wait'></i>
            "</ul>"
        );
        $("[name='" + pathName + "']").addClass("active");
        
        
        
        
//      map
//				$("#map").contents().find(".map-overlay.top").hide();
//window.frames["map"].getElementsByClassName(".map-overlay.top").css("dispaly","none")
    });
}));