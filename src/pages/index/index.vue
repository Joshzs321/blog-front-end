<template>
  <div id="main">
    <div class="notify">
        <span class="bugle"></span>
        <span class="notify-content ">welcome my blog</span>
    </div>
    <article class="artical-item" v-for="(item,index) in articalList" :key="index">
        <h3 class="title">{{item.title}}</h3>
        <p class="pulished-date">{{item.date}}</p>
        <!-- v-html有一个xss的过滤，对于后台返回的脚本不会直接执行 -->
        <section class="article-content" v-html="markdownCompiler(item.content)"></section>
        <section class="comment">
          <a href="javascript:void(0)" @click="gotoDetail(item.articalId)">
            <img src="https://csdnimg.cn/release/phoenix/template/new_img/commentWhite.png"  class="comment-img" alt="">
            <span class="comment-text">评论</span>
          </a>
          <a href="javascript:void(0)" @click="startGoodNum(item)">
            <span class="good-num"></span>
            <span class="num">{{item.thumbsUp.length>0?item.thumbsUp[0].count:0}}</span>
          </a>
        </section>
    </article>
    <div class="more-tips" v-if="isShowMoreTips">{{moreTips}}</div>
  </div>
</template>

<script>
import utils from '../components/commom/util'
import artical from '../../api/artical'
import thumbsUp from '../../api/thumbsUp'
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import thumbsUp from '../../api/artical'
//为了在前端加载markdown文件
let marked =require("marked")
let hljs =require("highlight.js")
import 'highlight.js/styles/default.css'
export default {
  name: 'index',
  data(){
    return{
      currentPage:1,
      pageSize:20,
      total:0,
      goodNum:0,
      articalList:[],
      isShowMoreTips:false,
      moreTips:"正在加载更多，请稍等 "
    }
  },
  mounted() {
    this.setMarked()
    this.getData()
    window.onscroll= (e)=> {
      if(utils.isScrollBottom()){
        console.log(this.isShowMoreTips)
        this.isShowMoreTips=true
        this.currentPage++
        this.getData((result)=>{
          if(result.length==0){
            this.moreTips="暂无更多数据"
            return
          }
          //只是为了当网速比较快时，能看到这个提示正在加载
          setTimeout(()=>{
            this.isShowMoreTips=false
          },1000)
        })
      }
    }
  },
  methods:{
    setMarked(){
      marked.setOptions({
        renderer:new marked.Renderer(),
        gfm:true,
        tables:true,
        breaks:true,
        pedantic:false,
        sanitize:false,
        smartLists:true,
        smartypants:false,
        highlight:function(code,lang){
          if(lang&&hljs.getLanguage(lang)){
            return hljs.highlight(lang,code,true).value
          }else{
            return hljs.highlightAuto(code).value
          }
        }
      })
    },
    markdownCompiler(val){
      return marked(val||'',{sanitize:false})
    },
    getData(callback){
       //通过artical请求接口获取后台数据
       artical.getAllArticalList({key:this.key,currentPage:this.currentPage}).then((res)=>{
         let list=res.data.list;
         if(list&&list.length>0){
           list.map((item)=>{
             let publishDate=new Date(item.publishDate)
             this.articalList.push({
                title:item.title,
                date:publishDate.getFullYear()+'-'+(publishDate.getMonth()+1)+'-'+publishDate.getDate(),
                type:item.type,
                articalId:item.articalId,
                content:item.content,
                thumbsUp:item.thumbsUp
             }) 
           })
         }
        if(callback){
         callback(list)
       }
       })
    },
    startGoodNum(item){
      console.log("1233")
       if(item.thumbsUp.length>0){
         item.thumbsUp[0].count++
       }else{
        item.thumbsUp.push({
          count:1
        })
       }
       thumbsUp.addThumbs({articalId:item.articalId,count:item.thumbsUp[0].count}).then((res)=>{
         //提示点赞成功
       })  
    },
    gotoDetail(articalId){
        this.$router.push({path:"/detail",query:{articalId:articalId}})
    }
  }
}
</script>

<style scoped>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  color: #2c3e50;
  margin-top: 0.1rem;
  padding:0 0.1rem;
  /* z-index: -1; */
}

.notify{
  /* width: 90%; */
  text-align: center;
  height: 0.6rem;
  background: #fff;
  line-height: 0.6rem;
  position: relative;
  margin: 0 auto;
  font-size:0.15rem;
 
}
.notify-content{
  font-size:0.15rem;
  color: gray;
  padding-bottom: 0;
  /* vertical-align:middle */
}

.bugle{
  font-family:'blogIcon';
}
.bugle::after{
  content: '\e8b8';
  font-size:0.3rem;
  vertical-align:middle
}

.artical-item{
  margin-top: 0.1rem;
  background: white;
  position: relative;
}

h3.title{
  font-size:0.2rem;
  color: #2c3e50;
  padding:0.2rem 0.2rem 0 0.2rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.pulished-date{
  font-size: 0.15rem;
  color: grey;
  padding: 0.13rem 0.2rem 0 0.2rem;
}

.article-content{
  white-space: pre-line;
  font-size: 0.15rem;
  line-height: 0.28rem;
  max-height: 2rem;
  overflow: hidden;
  padding: 0.1rem 0.2rem 0.15rem 0.2rem;
}

.comment{
  font-size: 0;
  background: rgb(233, 233, 233);
}
.comment a{
  display: inline-block;
  width: 49%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align:center;
  font-size: 0.15rem;
  text-decoration:none;
  color:rgb(34, 32, 32);
}

.comment a:first-child{
   border-right: 1px solid #c0c4cc
}

</style>
