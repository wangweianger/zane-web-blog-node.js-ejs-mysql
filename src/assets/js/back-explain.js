// list
var app = new Vue({
    el: '#explain',
    data: {
        bayexplain:'',
        editor:'',
        edit:{
            bayexplain:'',
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getExplainDetail();
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
                this.edit.bayexplain=html
            }
            this.editor.create() 
            this.editor.txt.html(this.edit.bayexplain)

            setTimeout(()=>{
                $('div.w-e-text-container').css({height:'400px'})
            },0)
        },
        // 获得详情
        getExplainDetail(){
            util.ajax({
                url:config.baseApi+'api/back/explain/getDetail',
                success:data=>{
                    this.edit.bayexplain=data.data.bayexplain
                    this.wangEditor()
                }
            })
        },
        submitExplain(){
            if(!this.edit.bayexplain.trim()){
                Layer.alert({type:'msg',title: '请输入内容!' });
                return false;
            }
            util.ajax({
                url:config.baseApi+'api/back/explain/editItem',
                data:{
                    bayexplain:this.edit.bayexplain
                },
                success:data=>{
                    Layer.miss({width:250,height:90,title:"操作成功!",time:2000})
                    this.getExplainDetail();
                }
            })
        },
    }
});

