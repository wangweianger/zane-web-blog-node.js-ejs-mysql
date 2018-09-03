// list
var app = new Vue({
    el: '#home',
    data: {
        datalist:[], 
        pageNo:1,
        pageSize:config.pageSize,  
        isOnline:'', 
        isRecom:'',
        isBanner:'',
    },
    mounted() {
        this.$nextTick(() => {
            this.getGoodsList();
        })
    },
    filters:{
        imgBaseUrl:window.Filter.imgBaseUrl,
        categoryFilter:window.Filter.categoryFilter,
        tagsFilter:window.Filter.tagsFilter,
    },
    watch:{
        'pageNo'(){
            this.getGoodsList();
        },
    },
    methods: {
        // 获得列表
        getGoodsList(){
            util.ajax({
                url:config.baseApi+'api/back/goods/getList',
                data:{
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                    isOnline:this.isOnline,
                },
                success:data=>{
                    this.datalist=data.data.datalist

                    new Page({
                        parent: $("#copot-page"),
                        nowPage: this.pageNo,
                        pageSize: this.pageSize,
                        totalCount: data.data.totalNum,
                        callback:(nowPage, totalPage) =>{
                            this.pageNo=nowPage
                        }
                    });

                }
            })
        },
        // 删除
        deleteItemGoods(item){
            Layer.confirm({width:300,height:160,title:"确定删除商品吗？",header:"删除"},()=>{
                util.ajax({
                    url:config.baseApi+'api/back/goods/deleteGoods',
                    data:{
                        id:item.id,
                        type:this.type
                    },
                    success:data => {
                        Layer.alert({
                            type:'msg',
                            title: '操作成功!'
                        });
                        this.getGoodsList()
                    },
                })
            })
        },
        // 上下架
        editOnline(item){
            util.ajax({
                url:config.baseApi+'api/back/goods/editOnline',
                data:{
                    id:item.id,
                    isOnline:item.isOnline==1?0:1
                },
                success:data=>{
                    Layer.miss({width:250,height:90,title:"操作成功!",time:2000})
                    this.getGoodsList();
                }
            })
        },
        selectOnline($event,type,lei){
            this.isOnline=''
            this.isRecom=''
            this.isBanner=''

            $($event.target).addClass('btn-main').siblings().removeClass('btn-main');
            if(lei == 'online'){
                this.isOnline=type
            }else if(lei == 'recom'){
                this.isRecom = type
            }else if(lei == 'banner'){
                this.isBanner = type
            }

            this.getGoodsList();
        },
        
    }
});

