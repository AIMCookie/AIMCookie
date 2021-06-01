<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    setup() {
      return {}
    }
  }
</script>

<style>
html{
  height:100%;
}
body{
  height:100%;
  margin:0px;
}
#app{
  height:100%;
}

/* <issue> : 자동 생성된 스타일의 수정은 현재로선 전역 수정으로 해결. 나중에 sass를 통해 해결하기.  */
 .el-radio-button:last-child .el-radio-button__inner {
  border-radius: 6px;
  text-align: center;
}
.el-radio-button:first-child .el-radio-button__inner {
  border-radius: 6px;
  text-align: center;
}
.el-radio-button__inner {
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  width: 100%;
  line-height: 2;
  font-size: 35px;
} 
</style>