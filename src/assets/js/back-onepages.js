// list
var app = new Vue({
    el: '#onepages',
    data: {
        datalist:[], 
         editPicObj:{
            show:false,
        },
        edit:{
            id:'',
            linkName:'',
            lineHref:'',
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
                url:config.baseApi+'api/back/onepages/getList',
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
        // 新增友链
        addLink(){
            this.editPicObj.show    =   true
            this.edit.linkName      =   '';
            this.edit.lineHref      =   '';
            this.edit.id            =   '';
        },
        updateLink(item){
            this.editPicObj.show=true;
            this.edit=item;
        },
        // 编辑标签
        editPic(){
            if(!this.edit.linkName){ Layer.alert({width:300,height:150,type:"msg",title:"请填写友链名称!"}); return false; }
            if(!this.edit.lineHref){ Layer.alert({width:300,height:150,type:"msg",title:"请填写友链链接!"}); return false; }
            util.ajax({
                url:config.baseApi+'api/back/link/editLink',
                data:this.edit,
                success:data=>{
                    Layer.miss({width:250,height:90,title:"操作成功!",time:2000})
                    this.editPicObj.show=false;
                    this.getList();
                }
            })
        },
        // 删除分类
        deleteLink(item){
            Layer.confirm({width:300,height:160,title:"确定删除分类吗？",header:"删除"},()=>{
                util.ajax({
                    url:config.baseApi+'api/back/link/deleteLink',
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

