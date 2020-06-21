<template>
    <div >
    <article id="content">
        <h3 class="title">{{artical.title}}</h3>
        <p class="second-title">发布于：{{artical.publishDate}}</p>
        <section class="article-content" v-html="markdownCompiler(artical.content)"></section>
        <p class="second-title">发表评论</p>
        <section class="comment-box">
          <textarea class='comment-content' placeholder="请输入评价内容" maxlength="200" v-model="commentText"></textarea>
          <input type="button" value="发布" class="pulish-btn" @click="publish"/>
        </section>
        <ul class="comment-list">
            <li class="comment-item" v-for="(content,index) in commentList" :key="index">
              {{content}}
            </li>
        </ul>
    </article>
  </div>
</template>

<script>
import artical from '../../api/artical'
import comment from '../../api/comment'
let marked =require("marked")
let hljs =require("highlight.js")
import 'highlight.js/styles/default.css'
export default{
  name:'detail',
  data(){
    return{
      artical:{},
      commentList:[],
      commentText:"",
      articalId:""
    }
  },
  mounted(){
    this.articalId=this.$route.query.articalId
    this.setMarked()
    this.getData(this.articalId)
  },
  methods: {
   publish(){
     if(this.commentText.trim()){
       comment.saveComment({articalId:this.articalId,content:this.commentText}).then((res)=>{
         this.commentList.push(this.commentText)
         this.commentText=''
       })
     }
   },
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
    getData(articalId){
      if(articalId){
        artical.getArticalDetail({articalId:articalId}).then((res)=>{
          if(res.data.length>0){
            this.artical=res.data[0]
            let publishDate=new Date(this.artical.publishDate)
            this.artical.publishDate=publishDate.getFullYear()+'-'+(publishDate.getMonth()+1)+'-'+publishDate.getDate()
            return comment.getCommentList({articalId:articalId})
          }
        }).then((res)=>{
          if(res.data.length>0){
            res.data.map((item)=>{
              this.commentList.push(item.content)
            })
          }
        })
      }
    }
  },
}
</script>

<style>
#content{
  background: white;
  position: relative;
  height: 100%;
}

h3.title{
  font-size:0.2rem;
  color: #2c3e50;
  padding:0.2rem 0.2rem 0 0.2rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.article-content{
  white-space: pre-line;
  font-size: 0.15rem;
  line-height: 0.28rem;
  max-height: 2rem;
  overflow: hidden;
  padding: 0.1rem 0.2rem 0.15rem 0.2rem;
}

.comment-box{
   padding:0.2rem 0.2rem 0 0.2rem;
   font-size: 0;
}
.comment-content{
  display: block;
  width: 100%;
  height: 0.5rem;
}
.comment-list{
  font-size: 0;
}

.comment-item{
  font-size: 0.15rem;
  line-height: 0.2rem;
   padding:0.2rem 0.2rem 0 0.2rem;
}
</style>