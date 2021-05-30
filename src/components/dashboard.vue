

<template>
  <div id="wrap">
    <!-- <h1>Dashboard</h1> -->
    <div class="content-box">
      <div class="title"><span>작곡 중 노래</span></div>
      <el-table :data="creating_music" style="width: 100%">
        <el-table-column prop="No" label="No." width="180"> </el-table-column>
        <el-table-column prop="name" label="Name" width="180">
        </el-table-column>
        <el-table-column prop="length" label="Length"> </el-table-column>
      </el-table>
    </div>
    <div class="content-box">
      <div class="title"><span>제작 노래 리스트</span></div>
      <el-table :data="music_list" style="width: 100%">
        <el-table-column prop="No" label="No." width="180"> </el-table-column>
        <el-table-column prop="name" label="Name" width="180">
        </el-table-column>
        <el-table-column prop="length" label="Length"> </el-table-column>
      </el-table>
    </div>
    <div class="content-box">
      <div class="title"><span>최근 댓글 리스트</span></div>
      <el-table :data="rec_comment_list" style="width: 100%">
        <el-table-column prop="No" label="No." width="180"> </el-table-column>
        <el-table-column prop="name" label="Name" width="180">
        </el-table-column>
        <el-table-column prop="comments" label="Comments"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
	<script>
export default {
  name: "dashboard",
  data() {
    return {
      creating_music: [
        {
          No: "1",
          name: "박하사탕",
          length: "3:12",
        },
        {
          No: "2",
          name: "celebrity",
          length: "3:39",
        },
        {
          No: "3",
          name: "좋은날",
          length: "3:24",
        },
        {
          No: "4",
          name: "봄날",
          length: "5:14",
        },
      ],
      music_list: [
        {
          No: "1",
          name: "보고싶다",
          length: "4:11",
        },
        {
          No: "2",
          name: "형",
          length: "4:37",
        },
      ],
      rec_comment_list: [
        {
          No: "1",
          name: "보고싶다",
          comments: "노래가 좋네요!!",
        },
        {
          No: "2",
          name: "형",
          comments: "역시.. 갓 노라조 형님들 ,,,",
        },
      ],
    };
  },
  music_data() {
    return {};
  },
  comments_data() {
    return {};
  },
};
</script>
	<style >
#wrap {
  padding: 30px;
}
.content-box {
  margin-top: 20px;
}
.title {
  padding: auto;
  height: 40px;
  width: 700px;
  background: #99a9bf;
  border-radius: 4px;
}
.title span {
  font-size: 1.2em;
  display: inline-block;
  margin: 9px 10px;
}
</style>

