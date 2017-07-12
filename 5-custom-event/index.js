    Vue.component("button-counter",{
        template:"<button v-on:click='increment'>{{counter}}</button>",
        data:function(){
            return{
                counter:0
            }
        },
        methods:{
            increment:function(){
                this.counter+=1;
                this.$emit('increment-event')
            }
        }
    })
    // Vue实例实现了事件接口 1.使用$on(eventName)监听事件 2.使用$emit(eventName)触发事件
    var counter = new Vue({
        el:"#counter-event-example",
        data:{
            total:0
        },
        methods:{
            incrementTotal(){
                this.total += 1;
            },
        }
    })


    Vue.component("comp",{
        template:"<div><input v-model='childFoo'></input><div>{{childFoo}}</div></div>",
        props:["foo"],
        data:function() {
            return{
                childFoo:this.foo
            }
        },
        watch:{
            childFoo:function(val,oldVal){
                // this.$emit('update:foo',this.childFoo);
                this.$emit('update:foo',val);
            }
        }
    })
    var sync=new Vue({
        el:"#sync",
        data:{
            bar:"value-bar"
        }
    })


    var comp=new Vue({
        el:"#form-comp",
        data:{
            something:""
        }
    })

    // 组件v-model起作用
    Vue.component("currency-input",{
        template:"\
            <span>\
                $\
                <input\
                    ref='input'\
                    v-bind:value='value'\
                    v-on:input='updateValue($event.target.value)'\
                >\
            </span>\
        ",
        props:['value'],
        methods:{
            updateValue(value){
                var formattedValue = value
                    //清除两侧空格
                    .trim()
                    // 保留2位小数
                    .slice(
                        0,
                        value.indexOf('.') === -1 ? value.length : value.indexOf('.') + 3
                    )
                // 如果值不统一，手动覆盖以保持一致
                if(formattedValue!=value){
                    this.$refs.input.value=formattedValue;
                }
                // 通过input事件发出数值
                this.$emit('input',Number(formattedValue));
            }
        }
    })
    var currency=new Vue({
        el:"#currency-comp",
        data:{
            price:""
        }
    })
