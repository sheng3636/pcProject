$(document).ready(function(){
		function show(){
	               var mydate = new Date();
	               var str = "" + mydate.getFullYear() + "年";
	               str += ((mydate.getMonth()+1)<10?"0":"") + (mydate.getMonth()+1)+"月";
	               str += (mydate.getDate()<10?"0":"")+ mydate.getDate()+"日  ";
	               str += "星期" + "日一二三四五六".charAt(mydate.getDay());
	               return str;
               }
             
              function a(){
                $(".header").children('.time').text(show());                
              }
             setInterval(a, 10);
             //二级菜单
             function menu(){
		          var _menu=$(".header .menu .living");
		          var _menuList=$("");
		          _menu.click(function(){
		          	
		          	if($(this).hasClass("flag")){
		          		$(this).removeClass("flag");
		          		$(this).children(".sub-menu").hide();
		          	}else{
		          		$(this).addClass("flag");
		          		$(this).children(".sub-menu").show();
		          	}
		          })
             }
             menu();
             
             function titles(){
             	 var titles = $("title").html()
				  if(titles == '城域战图'){
					  $(".index").addClass("active")
				  }
				  if(titles == '城域看板'){
					 $(".board").addClass("active")
				  }
				  if(titles == '城域事件'){
					  $(".live").addClass("active");
					  $(".live").children(".oneMenu").addClass("one")
				  }
				  if(titles == '城域大脑'){
					 $(".brain").addClass("active")
				  }
				  if(titles=='城域+'||titles == '城域+党建'||titles == '城域+服务'){
				  	$(".Plus").addClass("active");
				  	 $(".Plus").children(".oneMenu").addClass("one")
				  }
             }
             titles()
             
})
