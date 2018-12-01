// JavaScript Document

(function ($) {
$.fn.extend({
	Myscroll:function(options)
		{
			var defaults=
			{
				"width": 950,
				"height":426,
				"content_h":0,
				"btn_h":40,
				"btn":"",
				"content_box":"",
				"drag":"false",
				"y":0,
				"top":0
　　			}
			var op=$.extend(defaults,options);//有了这个调用的时候就你能改变默认的值了
			
			$(this).find(".scroll-panel").height(op.height);
			$(this).find(".scroll-bar").height(op.height);
			$(this).width(op.width);
			op.content_h=$(this).find("#ScrollContent").height();
			
			if(op.content_h>op.height)
			{
				$(this).find("#scrollbar").show();
				$(this).find(".scroll-panel").width(op.width-35);
				$(this).find(".scroll-content").width(op.width-35);
			}
			else
			{
				$(this).find("#scrollbar").hide();
				$(this).find(".scroll-panel").width(op.width);
				$(this).find(".scroll-content").width(op.width);
			}
			op.content_h=$(this).find("#ScrollContent").height();
			op.btn=$(this).find("#scrollblock");
			op.content_box=$(this).find("#ScrollContent");
			op.btn.mousedown(function(e){
				op.drag=true;
				e = e||window.event; 
				op.y=e.clientY-op.btn.position().top;
				return false;
			});
			document.onmousemove = function(e){
				e = e||window.event;
				if(op.drag==true)
				{
					op.top=e.clientY-op.y;
					scrollContenttop();
					return false;
				}
				;
			}
			$(document).mouseup(function(e) {
                op.drag = false;
                op.btn[0].releaseCapture();
                e.cancelBubble = true;
            })
			function scrollContenttop()
			{
				var hh=op.height-op.btn_h;
				if(op.top<0)
				{
					op.top=0;
				}
				if(op.top>hh)
				{
					op.top=hh;
				}
				var b=(op.content_h-op.height)/hh;
				
				
				op.content_box.css({"top":-op.top*b});
				op.btn.css({"top":op.top+"px"});
			}
			//阻止冒泡函数
			var scrollFunc=function(e){
				e=e||window.event;
				if (e&&e.preventDefault)
				{ 
					e.preventDefault();
					e.stopPropagation();
				}
				else
				{ 
				e.returnvalue=false;  
				return false;     
				}
			}
			
			if (window.addEventListener)
			{
				window.addEventListener('DOMMouseScroll', wheel, false);
				window.onmousewheel = document.onmousewheel = wheel;
			}
			
			function handle(delta) 
			{
				if(delta>0)
				{
					op.top-=10;
				}
				else
				{
					op.top+=10;
				}
				scrollContenttop();
		
			}
			
			function wheel(event)
			{
				var DetailScrollBox=$("#DetailScrollBox").offset();
				if(event.clientX<DetailScrollBox.left||event.clientX>DetailScrollBox.left+op.width||event.clientY<DetailScrollBox.top||event.clientY>DetailScrollBox.top+op.height)
				{
					
				}
				else
				{	
					scrollFunc(event);
					var delta = 0;
					if (!event) event = window.event;
					if (event.wheelDelta) {
					delta = event.wheelDelta/120; 
					if (window.opera) delta = -delta;
					} 
					else if (event.detail) 
					{
					delta = -event.detail/3;
					
					}
					if (delta)
					handle(delta);
				}
		
			}
			
　　　　　		
		}
	
	});

})(window.jQuery);


