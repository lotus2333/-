<template>
  <div class="nav">
    <div class="dtop">
      <ul class="uls">
        <li><van-icon name="arrow-left" size="25" class="v1" @click="tz" /></li>
        <li><h3>设置</h3></li>
      </ul>
      
      <div class="d1">
        <van-cell-group class="vc">
        <van-cell title="大字号" label="内容页将以更大字号显示" /><van-switch v-model="checked" class="vs1" size="20px"/>
      </van-cell-group>

      <van-cell-group class="vc">
        <van-cell title="夜间模式" class="vc2"/><van-switch v-model="checked2" class="vs2" size="20px"/>
      </van-cell-group>

      <van-cell-group class="vc3">
        <van-cell title="账号与安全" is-link/>
      </van-cell-group>

      <van-cell-group class="vc1">
        <van-cell title="去好评" is-link/>
      </van-cell-group>
      <van-cell-group class="vc4">
        <van-cell title="去吐槽" is-link/>
     </van-cell-group>

      <van-cell-group class="vc1">
        <van-cell title="清除缓存" is-link/>
      </van-cell-group>
      <van-cell-group class="vc4">
        <van-cell title="隐私中心" is-link/>
      </van-cell-group>
      <van-cell-group class="vc4">
        <van-cell title="证照中心" is-link/>
      </van-cell-group>
      <van-cell-group class="vc4">
        <van-cell title="知乎协议" is-link/>
      </van-cell-group>

      <van-button type="default" class="btn">退出登录</van-button>

      <p>当前版本 ： 3.6.2（1262）</p>
      <div class="zw"></div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
data() {
    return {
      checked: true,
      checked2: true,
    };
  },
  methods: {
    tz() {
      this.$router.push("/my");
    },
}
}
</script>

<style scoped>
.nav{
  width: 100%;
  height: 100%;
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
  
}
.vc{
  display: flex;
  justify-content: space-between;
 
}

.vc1{
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding-top: 7px;
  padding-bottom: 7px;
}

.vc2{
  height: 8vh;
  padding-top: 15px;
}

.vc3{
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.vc4{
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
}


.vs1{
  position: relative;
  top: 20px;
  right: 20px;
}

.vs2{
  position: relative;
  top: 16px;
  right: 20px;
}

.btn{
  width: 100vw;
  height: 8vh;
  margin-top: 10px;
  color: red;
}

p{
  text-align: center;
  font-size: 12px;
  color: rgb(201, 202, 204);
}

.zw{
  height: 5px;
}
</style>