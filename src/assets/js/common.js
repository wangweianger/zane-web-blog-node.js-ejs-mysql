$(()=>{
	navSwitch('#nav-checkout');//执行导航切换函数
});

function navSwitch(nav){
	//导航效果
	var lilen=$(nav).children("li").children("a");
	var currenturl = document.location.href;
	var olast = 0;
	for (var navi=0;navi<lilen.length;navi++){
	    var linkurl =  lilen[navi].getAttribute("href");
		if(currenturl.indexOf(linkurl)!=-1){
			olast = navi;
		}
	}
	$(lilen[olast]).parent('li').addClass('active')
	//导航特效结束
}