<template>
  <div>
    <h1>Contact</h1>
    <div id="wrap">
      <div class="title-box"><span class="title">문의하기</span></div>
      <div class="content-box">
        <h1>Email</h1>
        <input type="text" id="input-email" />
        <h1>문의 내용</h1>
        <textarea id="input-contact"></textarea>
        <el-button type="primary">문의</el-button>
      </div>
    </div>
  </div>
</template>
	<script>
export default {
  name: "contact",
};
</script>
<style scoped>
h1 {
  margin: 10px 0;
}
textarea {
  resize: none;
  font-size: 1.2em;
}
#wrap {
  margin: 20px;
}
.title-box {
  height: 40px;
  width: 200px;
  background-color: rgba(210, 210, 210, 1);
  /* margin-left: 20px; */
  border: solid rgb(0, 0, 0);
  border-width: 0 0 1px 0;
}
.title {
  display: inline-block;
  margin: 15px 40px;
}
.content-box {
  padding: 40px;
  padding-top: 10px;
  background-color: rgba(210, 210, 210, 1);
}
#input-email {
  width: 98%;
}
#input-contact {
  width: 98%;
  height: 200px;
}
.el-button {
  margin: 10px 0px;
  width: 100px;
  height: 20px;
}
</style>

