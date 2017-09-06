var app = new Vue({
    el: '#login',
    data: function(){
        return{
            username:'',
            password:'',
        }
    },
    computed:{
        title:function(){
            return document.title;
        },
    },
    methods:{
        login:function(){
            util.ajax({
                url:config.baseApi + 'api/back/user/userLogin',
                data:{
                    username:this.username,
                    password:this.password
                },
                success:function(data){
                    Layer.miss({title:"登录成功！"});
                    util.setStorage('local','userMsg',JSON.stringify(data.data))
                    location.href = "/back/home"
                }
            })
        },
        
    },
    mounted:function(){
        // var This = this;
        // This.$nextTick(function(){
        //     util.ajax({
        //         url:config.baseApi + 'api/user/getUserList',
        //         data:{
        //             pageNo:1,
        //             pageSize:3
        //         }
        //     })
        // })
    }
})