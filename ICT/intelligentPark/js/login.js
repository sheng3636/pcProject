;
(function(factory) {
	factory(jQuery, window, document);
}(function($, window, document) {

	$(function() {
		funOp.init();
	});

	var funOp = {
		init: function() {
			funOp.eventInit();
		},
		eventInit: function() {
			$("#username").change(function(){
				$(".loginmes").css("visibility","hidden");
			});
			$("#passward").change(function(){
				$(".loginmes").css("visibility","hidden");
			});
			$("#loginbtn").click(function(){
				var username = $("#username").val();
				var passward = $("#passward").val();
				if(username == null || username == ""){
					$(".loginmes").css("visibility","visible");
					$(".loginmes").find("span").text("用户名不能为空");
					$("#username").focus();
					return false;
				}
				if(passward == null || passward == ""){
					$(".loginmes").css("visibility","visible");
					$(".loginmes").find("span").text("密码不能为空");
					$("#passward").focus();
					return false;
				}
				var obj = {
							"userAccount":username,
							"userPassword":passward
				};
				$.ajax({
					type:"post",
					url:$.fn.commUtil.constant.baseUrl1 + "/user/login",
					dataType:"json",
					contentType:"application/json",
					data:JSON.stringify(obj),
					error:function(XMLHttpRequest, textStatus){
						console.log(XMLHttpRequest);
						console.log(textStatus);
						alert("登录失败");
					},
					success:function(data){
						if(data.code == "200"){
							window.sessionStorage.removeItem("isLogin");
							window.sessionStorage.setItem("isLogin","OK");
							var urlStr = window.location.href;
			    		var urlObj = $.fn.commUtil.parseUrlParm(urlStr);
			    		if( urlObj == null || urlObj.index == null){
			    			window.location.href = "person.html";
			    		}
			    		else{
			    			window.location.href = urlObj.index+".html";
			    		}
						}
						else{
							alert(data["message"]);
						}
					}
				})
				
			});
		}
	};

}));