<template>
  <div class="tk">
    <div class="dtop" >
        <ul class="uls">
         <li><van-icon name="arrow-left" size="25" class="v1" @click="tz"/></li>
         <li><h3>写点评</h3></li>
         <li>发布</li>
        </ul>
        
    </div>
    <div class="d1">
        
        <van-field
  v-model="message"
  rows="1"
  autosize
  type="textarea"
  placeholder="友善评论是交流的起点"
/>
        
    </div>
  </div>
</template>

<script>
export default {
    name: "TalkView",

    data(){
        return{
            message:'',
        }
    },
    methods:{
        tz() {
     this.$router.go(-1)
    },

   
    },
}
</script>

<style scoped>


.dtop{
  border-bottom: 1px solid #dddada;
  width: 100vw;
  height: 6vh;
  display: flex;
  flex-wrap: nowrap;
  position: fixed;
  background: #fff;
  text-align: left;  
  z-index: 3
}

.d1{
    /* border: 1px solid red; */
    position: relative;
    top: 40px;
    height: 50vh;
}
h3{
    margin: 0%;
}
.v1{
    padding-left: 5px;
    padding-top: 5px;
}

.uls{
    display: flex;
    flex-wrap: nowrap;
    
}


.uls li:nth-child(2){
    /* border: 1px solid red; */
    margin: 0%;
    padding-top: 5px;
    text-align: center;
    width: 80vw;
}

.uls li:nth-child(3){
    /* border: 1px solid red; */
    margin: 0%;
    padding-top: 7px;
    text-align: center;
    color: rgb(107, 212, 247);
}



</style>