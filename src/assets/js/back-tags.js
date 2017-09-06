// list
var app = new Vue({
    el: '#tags',
    data: {
        datalist:[], 
        editPicObj:{
            show:false,
        },
        edit:{
            id:'',
            tagname:'',
        }
    },
    components: {
        modal: window.Component.modal
    },
    mounted() {
        this.$nextTick(() => {
            this.getList();
        })
    },
    methods: {
        // 获得列表
        getList(){
            util.ajax({
                url:config.baseApi+'api/back/tags/getList',
                success:data=>{
                    this.datalist=data.data
                }
            })
        },
        // 删除
        deleteItemGoods(){
            Layer.confirm({width:300,height:160,title:"确定删除商品吗？",header:"删除"},()=>{
                util.ajax({
                    url:config.baseApi+'api/back/goods/deleteGoods',
                    data:{
                        id:this.datas.id,
                        type:this.type
                    },
                    success:data => {
                        Layer.alert({
                            type:'msg',
                            title: '操作成功!'
                        });
                        setTimeout(()=>{
                            window.history.back();
                        },1000)
                    },
                })
            })
        },
        updateTags(item){
            this.editPicObj.show=true;
            this.edit=item;
        },
        // 编辑标签
        editPic(){
            if(!this.edit.tagname){ Layer.alert({width:300,height:150,type:"msg",title:"请填写标签名称!"}); return false; }
            util.ajax({
                url:config.baseApi+'api/back/tags/editTags',
                data:this.edit,
                success:data=>{
                    Layer.miss({width:250,height:90,title:"操作成功!",time:2000})
                    this.editPicObj.show=false;
                    this.getList();
                }
            })
            
        },
        // 删除分类
        deleteTags(item){
            Layer.confirm({width:300,height:160,title:"确定删除标签吗？",header:"删除"},()=>{
                util.ajax({
                    url:config.baseApi+'api/back/tags/deleteTags',
                    data:{
                        id:item.id,
                    },
                    success:data => {
                        Layer.alert({
                            type:'msg',
                            title: '操作成功!'
                        });
                        this.getList();
                    },
                })
            })
        },
        
    }
});

