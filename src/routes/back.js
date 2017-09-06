//前端路由
import KoaRouter from 'koa-router'
import controllers from '../controllers'
import moment from 'moment'
import {
	SYSTEM
} from '../config'
const router = new KoaRouter()

// 请求接口校验中间件
const checkfn 		= 	controllers.common.checkRequestUrl;
const checkIsLogin  = 	controllers.common.checkIsLogin;

// 上传图片接口
router.post('/api/back/common/uploadImgs', controllers.common.uploadImgs)
// 编辑器上传图片
router.post('/upload', controllers.common.fwbUploadImgs)

/*--------------------------------------------首页相关-----------------------------------------------------------*/

/*后台首页*/
router.get(['/back/home'], async(ctx, next) => {
	let datas = {
		title:'后台首页',
	}
	await ctx.render('back/home',{
		datas:datas
	}); 
});

// 新增商品
router.get(['/back/add'], async(ctx, next) => {
	let datas = {
		title:'新增商品',
	}
	await ctx.render('back/add',{
		datas:datas
	}); 
});

// 获得商品列表
router.post('/api/back/goods/getList',checkIsLogin, controllers.back.home.getList)

// 删除商品
router.post('/api/back/goods/deleteGoods',checkIsLogin, controllers.back.home.deleteGoods)

// 新增商品
router.post('/api/back/goods/editGoods',checkIsLogin, controllers.back.home.editGoods)

// 获得商品详情
router.post('/api/back/goods/getItemDetail',checkIsLogin, controllers.back.home.getItemDetail)

// 商品上下架
router.post('/api/back/goods/editOnline',checkIsLogin, controllers.back.home.editOnline)

// 首页是否推荐
router.post('/api/back/goods/editRecom',checkIsLogin, controllers.back.home.editRecom)


/*--------------------------------------------分类相关-----------------------------------------------------------*/

// 分类列表
router.get(['/back/category'], async(ctx, next) => {
	let datas = {
		title:'分类列表',
	}
	await ctx.render('back/category',{
		datas:datas
	}); 
});

// 获得分类列表
router.post('/api/back/category/getList',checkIsLogin, controllers.back.category.getList)

// 编辑标签
router.post('/api/back/category/editCategory',checkIsLogin, controllers.back.category.editCategory)

//编辑分类 
router.post('/api/back/category/editCategory',checkIsLogin, controllers.back.category.editCategory)

// 删除分类
router.post('/api/back/category/deleteCategory',checkIsLogin, controllers.back.category.deleteCategory)


/*--------------------------------------------标签相关-----------------------------------------------------------*/

// 标签列表
router.get(['/back/tags'], async(ctx, next) => {
	let datas = {
		title:'标签列表',
	}
	await ctx.render('back/tags',{
		datas:datas
	}); 
});

// 获得标签列表
router.post('/api/back/tags/getList',checkIsLogin, controllers.back.tags.getList)

// 编辑标签
router.post('/api/back/tags/editTags',checkIsLogin, controllers.back.tags.editTags)

// 删除标签
router.post('/api/back/tags/deleteTags',checkIsLogin, controllers.back.tags.deleteTags)


/*--------------------------------------------购买说明-----------------------------------------------------------*/

// 购买说明
router.get(['/back/explain'], async(ctx, next) => {
	let datas = {
		title:'购买说明',
	}
	await ctx.render('back/explain',{
		datas:datas
	}); 
});

// 获得详情
router.post('/api/back/explain/getDetail',checkIsLogin, controllers.back.explain.getDetail)

// 编辑说明
router.post('/api/back/explain/editItem',checkIsLogin, controllers.back.explain.editItem)


/*--------------------------------------------用户相关-----------------------------------------------------------*/

/*登录页面*/
router.get(['/back/login'], async(ctx, next) => {
	let datas = {
		title:'后台登录',
	}
	await ctx.render('back/login',{
		datas:datas
	}); 
});

// 退出登录
router.post('/api/back/user/userLoginOut',checkIsLogin, controllers.back.user.userLoginOut)

// 用户登录
router.post('/api/back/user/userLogin',checkfn, controllers.back.user.userLogin)



module.exports = router






