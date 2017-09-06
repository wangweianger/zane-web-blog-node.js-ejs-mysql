$(()=>{
	
	// 增加active样式
	let tagsid 		= 	util.getQueryString('tagsid')
	let categoryid 	= 	util.getQueryString('categoryid')
	let objs		=	$('div.search').find('li')

	objs.removeClass('active')

	if(tagsid){
		let obj = objs.find("[href='/list?tagsid="+tagsid+"']")
		obj.parent('li').addClass('active')
	}else if(categoryid){
		let obj = objs.find("[href='/list?categoryid="+categoryid+"']")
		obj.parent('li').addClass('active')
	}else{
		let obj = objs.find("[href='/list']")
		obj.parent('li').addClass('active')
	}

})