<template>
  <div class="sc">
    <div class="dtop">
      <ul class="uls">
        <li @click="tz"><van-icon name="arrow-left" size="25" class="v1"/></li>
        <li><h3>收藏</h3></li>
      </ul>


      <div class="dbox"  v-for="(item, index) in cate" :key="index">
         
       
     <div class="d3">
      <div class="left">
        <h4>{{ item.story.title }}</h4>
        <!-- <p class="p3">{{ item.hint }}</p> -->
      </div >

      <div class="right">
        <van-image class="i2" :src="item.story.image" fit="cover"></van-image>
      </div>
     </div>
      
      
      
    
      </div>

      <div class="d1">
        <!-- <span>你还没有收藏喔~</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
      data() {
    return {
      story: [],
      stories:[],
      con: "",
      cate: [],
    };
  },

  props: {
    id: {
      type: String,
      retutn: 0,
    },
  },

methods:{
    tz(){
        this.$router.push("/my/");
    }
},
 // 计算属性
  computed: {
    // 将vuex中的cateAll结构出来
    ...mapState(["cateAll"]),
  },
  created() {
    this.cate = this.cateAll;
    console.log(this.cate[0].story);

  },
}
</script>

<style scoped>
.i2{
    width: 90px;
    height: 90px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 5px;
    left: 5px;
    top: 5px;
}
.dtop {
  width: 100vw;
  height: 7vh;
  position: fixed;
  background: #fff;
  text-align: left;
  
  z-index: 3;
}
.uls{
  display: flex;
  padding-bottom: 5px;
}

.v1 {
  padding-left: 10px;
  padding-top: 10px;
}

h3{
  margin: 0;

}

.uls li:nth-child(2){
    /* border: 1px solid red; */
    margin: 0%;
    padding-top: 8px;
    text-align: center;
    width: 80vw;
}

.d1{
    background-color: rgb(249, 244, 244);
    height: 100vh;
}

span{
    display: flex;
    justify-content: center;
    position: relative;
    top: 300px;
    color: rgb(203, 205, 207);
}

.dbox{
  border-bottom: 1px solid rgb(222, 222, 222);
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
</style>