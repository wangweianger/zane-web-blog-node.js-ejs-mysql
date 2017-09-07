// list
var app = new Vue({
    el: '#addonepage',
    data: {
        editor:null, 
        text:'',
        html:'',
        edit:{
            id:util.getQueryString('id'),
            text:'',
        },
    },
    filters:{
        imgBaseUrl:window.Filter.imgBaseUrl
    },
    mounted() {
        this.$nextTick(() => {

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
                url:config.baseApi+'api/back/onepages/getItemDetail',
                data:{
                    id:this.edit.id
                },
                success:data=>{
                    this.detaildatas = data.data
                    this.edit = Object.assign(this.edit,data.data)
                    this.wangEditor();
                }
            })
        },
       
        // 提交商品
        submit(){
            if(!this.edit.title){ Layer.alert({width:300,height:150,type:"msg",title:"商品标题必填!"}); return false; }

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



