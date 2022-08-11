<template>
  <div class="comment">
    <!-- 顶部菜单 -->
    <div class="num">
      <ul class="uls">
        <li @click="tz"><van-icon name="arrow-left" size="25" /></li>
        <li>{{ comments.length + comments1.length }} 条评论</li>
      </ul>
    </div>

    <div class="dbox">
      <!-- 长评 -->
      <div class="numl" v-if="comments1.length > 0">
        {{ comments1.length }}条长评
      </div>
      <div class="long" v-for="(item, index) in comments1" :key="index + 888">
        <div class="i1">
          <van-image :src="item.avatar" class="img"></van-image>
        </div>
        <div class="d1">
           <!-- 下拉 -->
          <ul class="u1">
            <li> <h4>{{ item.author }}</h4></li>
            <li><van-popover
              v-model="shortpop[index1]"
              trigger="click"
              :actions="actions"
              @select="onSelect"
              placement="left">

              <template #reference>
                <span>...</span>
              </template>
            </van-popover></li>
           
          </ul>
          <p class="p1">{{ item.content }}</p>
          <!-- 回复 -->
             <p class="huifu" v-if="item.reply_to">
                {{ item | jiaping_Filter }}
              </p>

          <ul class="uls1">
            <li>{{ item.time | time_Filter }}</li>
            <li>
              <span v-if="item.likes">{{ item.likes }}</span>
              <van-icon
                name="good-job"
                color="blue"
                v-if="dz2[index]"
                @click="good2(index)"
              />
              <van-icon name="good-job-o" v-else @click="good2(index)" />
            </li>
            <li><van-icon name="chat-o" /></li>
          </ul>
        </div>
      </div>

      <!-- 短评 -->
      <div class="nums" v-if="con">{{ con.comments.length }}条短评</div>
      <div class="short" v-for="(item, index) in con.comments" :key="index">
        <div class="i2">
          <van-image :src="item.avatar" class="img2"></van-image>
        </div>
        <div class="d2">
          <ul class="u1">
            <li><h4>{{ item.author }}</h4></li>
            <li>
            <van-popover
              v-model="shortpop[index]"
              trigger="click"
              :actions="actions"
              @select="onSelect"
              placement="left"
            >
              <template #reference>
                <span>...</span>
              </template>
            </van-popover></li>
          

          </ul>
          <p class="p2">{{ item.content }}</p>
          <!-- 回复 -->
             <p class="huifu" v-if="item.reply_to">
                {{ item | jiaping_Filter }}
              </p>

          <!-- 下拉 -->
          
          
          <ul class="uls2">
            <li>{{ item.time | time_Filter }}</li>
            <li>
              <span v-if="item.likes">{{ item.likes }}</span>
              <van-icon
                name="good-job"
                color="blue"
                v-if="dz[index]"
                @click="good(index)"
              />
              <van-icon name="good-job-o" v-else @click="good(index)" />
            </li>
            <li @click="tz2"><van-icon name="chat-o" /></li>
          </ul>
        </div>
      </div>
      <div class="zw"></div>
    </div>
    <div class="btm">
      <ul class="uls3">
        <li><img src="../assets/1.jpeg" class="timg1" fit="cover" /></li>
        <li @click="tz2">说说你的看法...</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "ComView",
  data() {
    return {
      con: "",
      con2: "",
      comments: [],
      comments1: [],
      dz: [],
      dz2: [],
      shortpop: [],
      index1:[],
      showlike: false,

      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: "复制" }, { text: "举报" }],
    };
  },
  // 接收主页面传过的id
  props: {
    comid: {
      type: String,
      retutn: 0,
    },
  },
  // 接口
  created() {
    this.axios
      .get("story/" + this.comid + "/short-comments")
      .then((response) => {
        // 请求数据，并且接住她
        this.con = response.data;
        this.comments = this.con.comments;

        //初始化点赞
        for (var i = 0; i < this.comments.length; i++) {
          this.dz[i] = false;
          this.shortpop[this.index] = false;
        }

        console.log(this.con);
      });

    this.axios
      .get("story/" + this.comid + "/long-comments")
      .then((response) => {
        // 请求数据，并且接住她
        this.con2 = response.data;
        this.comments1 = this.con2.comments;

        //初始化点赞
        for (var b = 0; b < this.comments1.length; b++) {
          this.dz2[b] = false;
          this.shortpop[this.index1] = false;
        }

        console.log(this.con2);
      });
  },

  methods: {
    //返回
    tz() {
      this.$router.push("/detial/" + this.comid);
    },
    //跳转写点评
    tz2() {
      this.$router.push("/talk/");
    },

    // 点赞
    good(index) {
      this.dz[index] = !this.dz[index];
      console.log(this.dz[index]);

      if (this.dz[index]) {
        this.con.comments[index].likes++;
      } else {
        this.con.comments[index].likes--;
      }
    },

    good2(index) {
      this.dz2[index] = !this.dz2[index];
      console.log(this.dz2[index]);

      if (this.dz2[index]) {
        this.comments1[index].likes++;
      } else {
        this.comments1[index].likes--;
      }
    },

    // 收藏
    ye() {
      this.shlike = true;
    },
    // 取消收藏
    no() {
      this.shlike = false;
    },

    onSelect(action) {
      Toast(action.text);
    },
  },

  filters: {
    // 时间格式过滤器
    time_Filter: function (item) {
      var date = new Date(item * 1000);

      var shijian = "";
      var M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var D = date.getDate();
      var m = date.getHours();
      var s = date.getMinutes();

      // 判断时间是不是今天 是就显示今天 不是就显示具体日期
      if (D == new Date().getDate()) {
        shijian = "今天";
      } else {
        shijian = M + "-" + D;
      }

      // 拼接日期 将得到的时间放进数组里 方便页面渲染
      return shijian + " " + m + ":" + s;
    },


    // 回复
    jiaping_Filter: function (item) {
    return "//" + item.reply_to.author + ":" + item.reply_to.content;
    },
  },
};
</script>

<style scoped>
.img {
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
}

.img2 {
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
}

.timg1 {
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 50%;
}

.i1 {
  width: 50px;
  position: relative;
  top: 20px;
  /* border: 1px solid rgb(0, 255, 153); */
}

.i2 {
  width: 50px;
  position: relative;
  top: 20px;
  /* border: 1px solid rgb(0, 255, 153); */
}
.num {
  /* border: 1px solid red; */
  width: 100vw;
  height: 6vh;
  position: fixed;
  background: #fff;
  z-index: 3;
}

.numl {
  /* border: 1px solid red; */
  text-align: left;
  font-weight: 550;
  padding: 10px 0px;
}

.nums {
  /* border: 1px solid red; */
  text-align: left;
  font-weight: 550;
  padding: 10px 0px;
}

.long {
  border-bottom: 1px solid rgb(221, 221, 221);
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.short {
  border-bottom: 1px solid rgb(221, 221, 221);
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
.dbox {
  position: relative;
  top: 50px;
  margin-left: 10px;
}
.d1 {
  /* border: 1px solid red; */
  width: 90vw;
  text-align: left;
  padding-left: 5px;
}

.d2 {
  /* border: 1px solid red; */
  width: 90vw;
  text-align: left;
  padding-left: 5px;
}

.uls {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 8px;
  padding: 0%;
}

.uls li:nth-child(2) {
  position: relative;
  right: 152px;
}

.uls1 {
  /* border: 1px solid red; */
  width: 80vw;
  height: 5vh;
  position: relative;
  bottom: 0%;
  margin-top: 10px;
  display: flex;
  font-weight: normal;
  justify-content: space-between;
}

.uls1 li:nth-child(1) {
  font-size: 14px;
  color: #bfbfbf;
}

.uls1 li:nth-child(2) {
  position: relative;
  left: 80px;
}

.uls2 {
  /* border: 1px solid red; */
  width: 80vw;
  position: relative;
  bottom: 0%;
  height: 5vh;
  margin-top: 10px;
  display: flex;
  font-weight: normal;
  justify-content: space-between;
}

.uls2 li:nth-child(1) {
  font-size: 14px;
  color: #bfbfbf;
}

.uls2 li:nth-child(2) {
  position: relative;
  left: 80px;
}

.p1 {
  padding-right: 10px;
}

.p2 {
  padding-right: 10px;
}

.btm {
  /* border: 1px solid red; */
  width: 100vw;
  height: 7vh;
  position: fixed;
  text-align: left;
  bottom: 0%;
  background: #eeeded;
}

.uls3 {
  /* border: 1px solid red; */
  position: relative;
  bottom: 0%;
  text-align: left;
  display: flex;
  flex-wrap: nowrap;
}

.uls3 li:nth-child(2) {
  padding-top: 10px;
  font-size: 13px;
  color: #c7c2c2;
}




.s2 {
  /* border: 1px solid red; */
  width: 20px;
  position: relative;
  left: 280px;
  top: -100px;
  font-size: 15px;
  font-weight: 500;
}

.zw {
  height: 5vh;
}

.u1{
  display: flex;
  width: 80vw;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.u1 li:nth-child(2){
  position: relative;
  top: 10px;
}

.huifu{
  color: #bfbfbf;
  font-size: 12px;
  overflow: hidden;
  padding-right: 5px;
}
</style>
