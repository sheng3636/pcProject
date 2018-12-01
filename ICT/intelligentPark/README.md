#源文件共享ftp \\10.4.252.37

#目录结构

#css
	scss文件编译后存放目录
#img
	图片资源
	#icon
		图标
#js
	js文件	对应view中的html文件名
#lib
	第三方框架目录	存放Eharts jQuery
#scss
	scss
	style.scss	公共样式
#util
	工具js
#view
	页面

#browser-sync 热更新
#安装
	npm install -g browser-sync
#启动
	在ICT目录下启动
	browser-sync start --server --files "**/*.*"