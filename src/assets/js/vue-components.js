let Component = {
    modal:{
        template: `
            <div v-show="show">
                <div 
                    :style="{'width':'500px'}"
                    class="PopLayer PopLayer-alert PopLayer-customHtml customHtmlMask" style="height: 200px; margin-left: -300px; margin-top: -200px; opacity: 1;">
                    <div class="PopLayer-h1">
                        {{title}}
                        <span
                            @click="$emit('update:show',false)"
                            class="closeButton"></span>
                    </div> 
                    <div class="PopLayer-HTML" style="height: 340px;">
                        <slot name="modal-body">XXX</slot>
                    </div>
                </div>
                <div class="PopLayer PopLayer-mask customHtmlMask"></div>
            </div>
        `,
        props:{
            show:{
                type:Boolean,
                default:false,
            },
            width:{
                type:String,
                default:800,
            },
            title:{
                type:String,
                default:'modal头部'
            }
        },
        data:function(){
            return{
            }
        }
    }
}
window.Component = {};
for(let n in Component){
    window['Component'][n] = Component[n];
}
