<template>
  <div class="detial">
   
    <div class="d1">
      <van-image class="i1" :src="story.image"></van-image>
    <!-- 渐变盒子 -->
          <div class="banner-footer" v-if="story.imageHue" :style="{
                background: '#' + story.imageHue.substr(2, 8) + 'd5',
                background: `
           linear-gradient(0,#${story.imageHue.substr(2,8)},#${story.imageHue.substr(2, 8)}e6,#${story.imageHue.substr(2, 8)}00)`,
              }">
              <p class="p1">{{ story.title }}</p>
          </div>
      <div class="d2">
  <section v-html="story.body"></section>
        <!-- 外部链接一个css文件 -->
        <link rel="stylesheet" :href="story.css" />
      </div>

      <div class="d4"></div>
      <!-- 底部菜单栏 -->
      <div class="d3">
        <ul class="uls">
          
          <li @click="tz"><van-icon name="arrow-left" size="30"/></li>
          <li ><van-icon name="chat-o" size="30" @click="tz2"/>
          <span class="sp1">{{con1.comments}}</span>
          </li>
          <li>
           
            
            <van-icon name="good-job" color="#3A93F1" v-if="showlike" @click="nogood" size="30"/>

            <van-icon name="good-job-o" size="30" v-else @click="good"/>
            <span class="sp2">{{con1.popularity}}</span>
          </li>
          <li>
            <van-icon name="star" size="30" v-if="shlike" @click="add" color="#3A93F1"/>
            <van-icon name="star-o" size="30" v-else @click="add"/>
          </li>
          <li>
            <van-icon name="share-o" size="30" @click="showShare = true"/><van-share-sheet v-model="showShare"  title="立即分享给好友" :options="options" @select="onSelect"/>
          </li>
        </ul>
      </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Toast } from 'vant';
export default {
  name: "DetialView",
  data() {
    return {
        story:[],
        showlike:false,
        shlike:false,
        showShare: false,
        con:'',
        con1:'',
        options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
    };
  },
  // 接收主页面传过的id
  props: {
    id: {
      type: String,
      retutn: 0,
      
    },
  },
  // 接口
  created() {
    this.axios
      .get("story/" + this.id)
      .then((response) => {
        // 请求数据，并且接住她
        this.con = response.data;
        this.story = this.con.story;
        console.log(this.con);
      });

        // 点赞数接口获取
    this.axios
      .get(
        "https://apis.netstart.cn/zhihudaily/story/" + this.id + "/extra"
      ).then((response) => {
        console.log(response);
        this.con1 = response.data;
        // this.con = this.con1.popularity;
        console.log(this.con1);
      });
  },
  // 计算属性
  computed: {
    // 将vuex中的cateAll结构出来
    ...mapState(["cateAll"]),
  },

  methods:{
     // 将vuex中的setCateAll结构出来
    ...mapMutations(["setCateAll"]),
    add() {
      // console.log("item==>",item);
 this.shlike=!  this.shlike;

      var show = true; //开关

      // 购物车同数值去重
      if (this.cateAll.length) {
        // 循环遍历cateAll数组中的每一项的值
        for (var i = 0; i < this.cateAll.length; i++) {
          // 加入在cataAll有某项的ID跟将要添加到cateAll中的item的id值一样，不让他添加
         
          if (this.cateAll[i].story.id == this.id) {
         
            show = false;
            this.$toast('已收藏')
          }
        }
      }

      if (show) {
        // 当cateall中没有数据或item.id没有值，show为true  但cateAll中有一项id跟item.id相同则为false，不添加数据
        // 调用vuex中的方法 并传入一个商品对象 item就是需要添加的购物车的对象
        // item.number = 1 //添加商品数量
      // console.log(this.con);
        this.setCateAll(this.con);
  
        // 打印购物车中的数据
        console.log("添加打印",this.cateAll);
        this.$toast('收藏成功')
      }
    },

    tz(){
      this.$router.push("/");
    },

    tz2(){
      this.$router.push("/com/"+this.id)
    },
   // 点赞
    good(){
      this.showlike= true;
      this.con1.popularity += 1;
    },
  // 取消点赞
    nogood(){
     this.showlike = false;
     this.con1.popularity -= 1;
     },

     // 收藏
    ye(){
      this.shlike= true;

    },
  // 取消收藏
    no(){
     this.shlike = false;
     },

    //  分享

     onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  
  },

     
};

</script>

<style scoped>
.d2{
    /* border: 1px solid red; */
    margin-top: -30vh;
}

/* .i1{
    width: 100%;
    height:100%;
} */
.d1{
    /* border: 1px solid red; */
    width: 100vw;
    height:50vh;
}

.d3{
  width: 100vw;
  height: 6vh;
  /* border: 1px solid red; */
  background: #f3f1f2;
  position: fixed;
  bottom: 0%;
}
.banner-footer{
  /* border: 1px solid red; */
  display: flex;
  position: absolute;
  width: 100vw;
  height: 25vh;
  bottom: 290px;
  box-sizing: border-box;
}

.uls{
  display: flex;
  justify-content: space-between;
  padding: 0%;

}


.p1{
  display: flex;
  flex-wrap: wrap;
  font-weight: 500;
  font-size: 18px;
  position: relative;
  top:80px;
  padding-left: 20px;
  color:#fff;
  text-align: left;
}

li:nth-child(1){
  border-right: 1px solid #B9B3B5;
  margin:5px;
  padding-left: 5px;
  padding-right: 5px;
}

li:nth-child(n+2){
  position: relative;
  left: -30px;
  padding-top: 5px;
}

li:nth-child(3):active{
  color:#3A93F1
}

.sp1{
  position: relative;
  top: -10px;
  font-size: 14px;
}

.sp2{
  position: relative;
  top: -10px;
  font-size: 14px;
}
.d4{
  height: 5vh;
}
::v-deep .content-inner{
   /* border: 1px solid red; */
  text-align: left;
}

::v-deep .view-more a{
 /* border: 1px solid red; */
  border-radius: 20px;
  color: white;
  padding-top: 5px;
  height: 5vh;
  background: rgb(75, 181, 242);
}
</style>