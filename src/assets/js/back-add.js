// list
var app = new Vue({
    el: '#add',
    data: {
        editor:null, 
        text:'',
        html:'',
        edit:{
            id:util.getQueryString('id'),
            title:'',
            category:'',
            categoryjson:[{checked:false,value:'知识点'},{checked:false,value:'实战'}],
            difficulty:'',
            difficultyjson:[{checked:false,value:'初级'},{checked:false,value:'中级'},{checked:false,value:'高级'}],
            longtime:'',
            mainimg:'',
            oldprice:'',
            newprice:'',
            ewmimg:'',
            desc:'',
            text:'',
            size:'',
            tagsid:'',
            categoryid:'',
            isOnline:'',
            isRecom:'',
            isBanner:'',
            bannerImg:'',
        },
        categoryDatas:[],
        tagsDatas:[],

    },
    filters:{
        imgBaseUrl:window.Filter.imgBaseUrl
    },
    mounted() {
        this.$nextTick(() => {
            this.getClassList();
            this.getTagsList();

            if(this.edit.id){
                this.getGoodsDetail();
            }else{
                this.wangEditor();
            }

        })
    },
    methods: {
        wangEditor(){
            var E = window.wangEditor
            this.editor = new E('#editor')
            this.editor.customConfig.uploadImgServer = config.baseApi+'upload'
            this.editor.customConfig.uploadFileName = 'file'
            this.editor.customConfig.withCredentials = true
            this.editor.customConfig.uploadImgTimeout = 12000

            this.editor.customConfig.uploadImgHooks = {
                success: function (xhr, editor, result) {
                },
                // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                customInsert: function (insertImg, result, editor) {
                    var url = config.imgBaseUrl + result.data
                    insertImg(url)
                }
            }

            // this.editor.customConfig.uploadImgShowBase64 = true
            this.editor.customConfig.onchange = (html) => {
                this.edit.text=html
            }
            this.editor.create() 
            this.editor.txt.html(this.edit.text)

            setTimeout(()=>{
                $('div.w-e-text-container').css({height:'600px'})
            },0)
        },
        getGoodsDetail(){
            util.ajax({
                url:config.baseApi+'api/back/goods/getItemDetail',
                data:{
                    id:this.edit.id
                },
                success:data=>{
                    this.detaildatas = data.data
                    this.edit = Object.assign(this.edit,data.data)
                    this.edit.categoryjson = util.setCheckBoxVal(this.edit.categoryjson,this.edit.category)
                    this.edit.difficultyjson = util.setCheckBoxVal(this.edit.difficultyjson,this.edit.difficulty)
                    this.wangEditor();
                }
            })
        },
        // 获得分类列表
        getClassList(){
            util.ajax({
                url:config.baseApi+'api/back/category/getList',
                success:data=>{
                    this.categoryDatas=data.data
                }
            })
        },
        // 获得标签列表
        getTagsList(){
            util.ajax({
                url:config.baseApi+'api/back/tags/getList',
                success:data=>{
                    this.tagsDatas=data.data
                }
            })
        },
        // 上传图片
        uploadImg(type){
            util.cerateFileFormData({
                url:config.baseApi+'api/back/common/uploadImgs',
                success:data=>{
                    if(type=='mainimg'){
                        this.edit.mainimg=data.data
                    }else if(type=='ewmimg'){
                        this.edit.ewmimg=data.data
                    }else if(type=='bannerImg'){
                        this.edit.bannerImg=data.data
                    }
                }
            })
        },
        // 提交商品
        submit(){
            if(!this.edit.title){ Layer.alert({width:300,height:150,type:"msg",title:"商品标题必填!"}); return false; }
            if(!this.edit.mainimg){ Layer.alert({width:300,height:150,type:"msg",title:"请上传商品主图!"}); return false; }
            if(!this.edit.newprice){ Layer.alert({width:300,height:150,type:"msg",title:"请填写商品售价!"}); return false; }
            if(!this.edit.ewmimg){ Layer.alert({width:300,height:150,type:"msg",title:"请上传商品售价二维码!"}); return false; }
            if(!this.edit.text){ Layer.alert({width:300,height:150,type:"msg",title:"请填写商品详情!"}); return false; }
            if(this.edit.isBanner == 1 && !this.edit.bannerImg){
                Layer.alert({width:300,height:150,type:"msg",title:"请填上传商品banner图片!"}); return false;
            }

            if(this.edit.isBanner == 0) this.edit.bannerImg='';

            this.edit.category=util.getCheckBoxVal(this.edit.categoryjson)
            this.edit.difficulty=util.getCheckBoxVal(this.edit.difficultyjson)

            util.ajax({
                url:config.baseApi+'api/back/goods/editGoods',
                data:this.edit,
                success:data=>{
                    Layer.miss({width:250,height:90,title:"操作成功!",time:2000})
                    setTimeout(()=>{
                        history.back();
                    },1000)
                }
            })
            
        },

    }

});



