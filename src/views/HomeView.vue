<template>
  <div class="home" >
    <!-- 日期条 -->
    <div class="date">
      <ol>
        <li><h4>{{ this.day }}</h4></li>
        <li><h4>{{ month }}</h4></li>
      </ol>
      <p class="p1">{{tiems}}</p>
      <img src="../assets/1.jpeg" class="i1" fit="cover" @click="tz"/>
    </div>
    <!-- 轮播图 -->

    <div class="d1">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="(item, index) in con.top_stories" :key="index">
          <van-image class="image" :src="item.image" @click="change(item.id)"></van-image>
          <!-- 渐变盒子 -->
          <div class="banner-footer" :style="{
                background: '#' + item.image_hue.substr(2, 8) + 'd5',
                background: `
           linear-gradient(0,#${item.image_hue.substr(2,8)},#${item.image_hue.substr(2, 8)}e6,#${item.image_hue.substr(2, 8)}00)`,
              }">
          <p class="p2">
            <span class="s">{{ item.title }}<br/></span>
            <span class="s1">{{ item.hint }}</span>
          </p>
          </div>
        </van-swipe-item>

      <!-- 圆点位移 -->
         <template #indicator>
    <div class="custom-indicator">
      <span v-for="(item,index) in con.top_stories" :class="{active: current == index}" :key="index"></span>
    </div>
  </template>

      </van-swipe>
    </div>
    <!-- 条目 -->
    <div class="d2" v-for="(item, index) in con.stories" :key="index" @click="change(item.id)">
      <!-- 历史日期 -->
        <div class="dd" v-if="index%6==0 && index != 0">
          <van-divider v-once
  :style="{ color: '#A39B9E', borderColor: '#A39B9E', }" content-position="left">
     {{history_id_dd}}</van-divider ></div>
     
     <div class="d3">
      <div class="left">
        <h4>{{ item.title }}</h4>
        <p class="p3">{{ item.hint }}</p>
      </div >

      <div class="right">
        <van-image class="i2" :src="item.images[0]" fit="cover"></van-image>
      </div>
     </div>
      
      
      
    </div>
    <!-- 点击加载更多 -->
    <div class="addLosd" @click="addLoad" ref="addLoad">点击加载更多</div>
    
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      con: "",
     tiems:"",
      //绑定日期
      day: new Date().getDate(),
      month: new Date().getMonth() + 1 + "月",
      hour: new Date().getHours(),
      top_stories: [],
      current:0,
      dates:"",
      history_id_dd:"",
    };
  },

  created() {
    //获取接口
    this.axios.get("stories/latest").then((response) => {
      this.con = response.data;
      console.log(this.con);

      this.dates = response.data.date
      console.log("this.dates==>",this.dates);
    });

    var time = new Date();
    console.log(time);
    var hours= time.getHours();
    if(hours >= 6 && hours <= 11){
      this.tiems = "早上好！";
    }else if(hours >= 11 && hours <= 14){
      this.tiems = "中午好！";
    }else if(hours >= 14 && hours <= 18){
      this.tiems = "下午好！";
    }else{
      this.tiems = "晚上好！";
    }
  },
  methods:{
    change(id){
      console.log("id===>",id);
      this.$router.push("/detial/" + id); //页面跳转
    },

    tz(){
      this.$router.push("/my/")
    },

    //小圆点位移
    onChange(index) {
    this.current = index;
  },

  getLoad(index){
    //请求数据
    this.axios.get('stories/before/' + index).then(
      re => {
        console.log("re==>",re);
        this.con.stories.push(...re.data.stories);
        this.dates = re.data.date;
        console.log(this.dates);
        
        this.history_id_dd = this.dates.slice(5,6 )+"月"+this.dates.slice(6,8)+"日";
  })
  },
  //点击加载更多
  addLoad(){
      
      this.getLoad(this.dates);
      
        
    },
  scrollfn(){
    // 获取页面卷去的距离
    var a =document.scrollTop || document.documentElement.scrollTop;
    // 页面的视口高度
    var b = window.innerHeight;
    // 拿到加载更多条距离顶部带有非静态定位父元素的距离

    var c = this.$refs.addLoad.offsetTop;


    if(a + b - 50 >= c){
      this.addLoad()
    }
  }
      
  },

// 页面渲染到页面触发
  mounted(){
    // addEventListener绑定点击事件的一个方法
    // 第一个属性 触发条件
    // 第二个属性 触发条件
    window.addEventListener('scroll',this.scrollfn)
  },
 // 销毁
  beforeDestroy() {
    window.removeEventListener("scroll",this.scrollfn)
  },

  beforeRouteLeave(to,from,next){
    window.removeEventListener('scroll',this.scrollfn);
    next();
  }
  
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
.i1 {
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 50%;
}

.i2 {
  width: 65px;
  height: 65px;
  overflow: hidden;
  border-radius: 10%;
}
.date {
  /* border: 1px solid red; */
  overflow: hidden;
  width: 100vw;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  position: fixed;
  top: 0px;
  z-index: 9;
  justify-content: space-between;
}

.image {
  width: 100%;
  height: 100%;
}

.my-swipe {
  width: 100vw;
  box-sizing: border-box;
  /* border: 1px solid red; */
  /* height: 60vh; */
}
/* 圆点点 */
.custom-indicator {
   position: absolute;
right: 5px;
bottom: 5px;
padding: 2px 5px;
font-size: 12px;
display: flex;
}
.custom-indicator span {

display: block;
width:6px;
height: 6px;
background:#ddd;
border-radius: 50%;
margin-left: 10px;
box-sizing: border-box;


}
.custom-indicator span.active {
 width: 20px;
 height: 6px;
 border-radius: 10px;
 background: #fff;
}

/* 渐变 */
.banner-footer{
  /* border: 1px solid red; */
  position: absolute;
  width: 100vw;
 
  height: 25vh;
  bottom: 0%;
  box-sizing: border-box;
}
.p1{
  border-left: 1px solid rgb(226, 221, 221);
  margin: 10px;
  padding-left: 5px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  position: relative;
  left: -65px;
}
.p2 {
  /* border: 1px solid red; */
  color: #fff;
  position: relative;
  top:80px;
  width: 97vw;
  height: 10vh;
  padding: 5px;
  text-align: left;
  /* backdrop-filter: blur(50px); */
}

/* 历史时间 */
.dd{
  height: 5px;
  position: relative;
  top:-35px;
  /* border: 1px solid red; */
}

ol{
  position: relative;
  left: 10px;
  margin: 10px;
}
.s{
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
  padding-right: 20px;
   box-sizing: border-box;
  padding-left: 20px;
}
.s1 {
  font-size: 10px;
  color: rgb(202, 199, 199);
  padding-right: 20px;
  padding-left: 20px;
  position:absolute;
  bottom: 0%;
}
.d1 {
  /* border: 1px solid red; */
  width: 100vw;
  height: 60vh;
}

.d2 {
  /* border: 1px solid red; */
  width: 100vw;
  height: 15vh;
  margin-top: 15px;
/*   
  display: flex;
  justify-content: space-between; */
  /* padding: 5px; */
}
.d3{
  display: flex;
  justify-content: space-between;
}

.left {
  text-align: left;
  padding-left: 10px;
  
   box-sizing: border-box;
}
.left .p3 {
  font-size: 12px;
  color: rgb(202, 199, 199);
}

.right{
  padding-right: 10px;
  /* border: 1px solid red; */
   box-sizing: border-box;
}

.addLosd{
  height: 50px;
  text-align:center;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 14px;
  color: rgb(149, 139, 139);
  border-top: 1px solid rgb(200, 191, 191);
  line-height: 50px;
}
</style>
