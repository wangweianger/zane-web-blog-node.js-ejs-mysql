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
        // 删除单页
        deleteOnepage(item){
            Layer.confirm({width:300,height:160,title:"确定删除此单页吗？",header:"删除"},()=>{
                util.ajax({
                    url:config.baseApi+'api/back/onepages/deleteOnepage',
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

