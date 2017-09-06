let Filter = {
    // 图片地址过滤器
    imgBaseUrl:function(img) {
        if (!img) return '../images/index/bg-0.png';
        if (img.indexOf('http:') !== -1 || img.indexOf('HTTP:') !== -1 || img.indexOf('https:') !== -1 || img.indexOf('HTTPS:') !== -1) {
            return img + '?imageslim';
        } else {
            return config.imgBaseUrl + img + '?imageslim';
        }
    },
    
    // 分类过滤器
    categoryFilter(val){
        let result='';
        let categoryData = util.getStorage('session','categoryDatas')?JSON.parse(util.getStorage('session','categoryDatas')):''
        if(!categoryData){
            util.ajax({
                async:false,
                url:config.baseApi+'api/back/category/getList',
                success:data=>{
                    categoryData=data.data
                    util.setStorage('session','categoryDatas',JSON.stringify(categoryData))
                }
            })
        }
        if(categoryData.length){
            categoryData.forEach((item)=>{
                if(item.id == val){
                    result = item.categoryname
                }
            })
        };
        return result
    },
    // tab标签过滤器
    tagsFilter(val){
        let result='';
        let tagsData = util.getStorage('session','tagsDatas')?JSON.parse(util.getStorage('session','tagsDatas')):''
        if(!tagsData){
            util.ajax({
                async:false,
                url:config.baseApi+'api/back/tags/getList',
                success:data=>{
                    tagsData=data.data
                    util.setStorage('session','tagsDatas',JSON.stringify(tagsData))
                }
            })
        }
        if(tagsData.length){
            tagsData.forEach((item)=>{
                if(item.id == val){
                    result = item.tagname
                }
            })
        };
        return result
    },
}
window.Filter = {};
for(let n in Filter){
    window['Filter'][n] = Filter[n];
}
