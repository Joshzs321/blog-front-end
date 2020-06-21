<template>
   <header class="hd">
       <title>myblog</title>
       <ul class="menu-buttom" @click="changeMenu">
           <li></li>
            <li></li>
             <li></li>
       </ul>
       <section class="menu-content" v-show="isShow">
           <!-- @click.native是给组件绑定原生事件 -->
           <div class="to-home"><router-link :to="{path:'/'}" @click.native="changeMenu">首页</router-link></div>
            <div class="to-home"><router-link :to="{path:'/about'}" @click.native="changeMenu">about</router-link></div>
       </section>
   </header>
</template>

<script>
export default{
    name:'top-nav',
    data(){
            return{
                isShow:false
            }
        },
    methods: {
        changeMenu(){
            this.isShow=!this.isShow
        }
    },

}
    
</script>

<style scoped>
.hd{
    position: relative;
    background:seagreen;
    height: 1rem;
    line-height: 1rem; 
    z-index: 1000;
}

title{
    float: left;
    padding-left: 0.2rem;
    font-size: 0.3rem;
    color:white;
}

.menu-buttom{
    width: 0.5rem;
    height: 0.15rem;
    float: right;
    margin-right: 0.3rem;
    margin-top: 0.45rem;
    overflow: hidden;
}
.menu-buttom li{
    width: 0.1rem;
    height: 0.1rem;
    background: white;
    float: left;
    margin-right: 0.06rem;
    border-radius: 100%;
}
.menu-content{
    padding-top: 1rem;

}

.menu-content div{
    font-size: 0.2rem;
    text-align: center;
    height: 0.3rem;
    line-height: 0.3rem;
    border-top: solid 1px gray;
    background:rgb(55, 128, 87);
}

.menu-content div a{
    color: white;
    text-decoration:none
}
</style>