<template>
  <div class="my">
    <div class="dtop">
      <van-icon name="arrow-left" size="25" class="v1" @click="tz" />
      
    </div>
    <div class="d1">
      <p><img src="../assets/1.jpeg" class="i1" fit="cover" /></p>
      <h3>李若鸿</h3>
      <ul class="uls">
        <li @click="sc"><van-cell is-link title="我的收藏" /></li>
        <li><van-cell is-link title="消息中心" /></li>
      </ul>
    </div>
    <div class="d2">
      <ul class="uls2">
        <li><van-icon name="eye-o" size="40" /><br />夜间模式</li>
        <li @click="tz2">
          <van-icon name="setting-o" size="40" /><br />
          设置
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyView",
  data() {
    return {};
  },
  methods: {
    tz() {
      this.$router.push("/");
    },

    tz2(){
        this.$router.push("/sz");
    },

    sc(){
      this.$router.push("/sc");
    }
  },
};
</script>

<style scoped>


.i1 {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.dtop {
  width: 100vw;
  height: 6vh;
  position: fixed;
  background: #fff;
  text-align: left;

  z-index: 3;
}

.d1 {
  position: relative;
  top: 55px;
}

.d2 {
  position: absolute;
  bottom: 0%;
  width: 100%;
}

.v1 {
  padding-left: 10px;
  padding-top: 10px;
}

.uls li {
  border-top: 1px solid rgb(231, 225, 225);
  text-align: left;
  padding-top: 5px;
  height: 8vh;
}

.uls2 {
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: center;
}

.uls2 li:nth-child(1) {
  /* border: 1px solid red; */
  width: 20vw;
  position: relative;
  left: -50px;
}

.uls2 li:nth-child(2) {
  /* border: 1px solid red; */
  width: 20vw;
  position: relative;
  right: -50px;
}

/* 这里设置日间模式 */
/* .light {
  background-color: #f3f3f3;
  color: #333;
} */
/*这里设置夜间模式*/
/* .dark {
  background-color: #333;
  color: #f3f3f3;
} */
</style>

