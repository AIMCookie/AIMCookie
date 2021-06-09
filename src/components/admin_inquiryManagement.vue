<template>
<el-container style="height: 700px; border: 1px solid #eee">
  <el-container>
    <el-header style="text-align: left; font-size: 30px">
      <span>문의게시판</span>
    </el-header>

    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="Date" width="140">
        </el-table-column>
        <el-table-column prop="ID" label="ID" width="120">
        </el-table-column>
        <el-table-column prop="title" label="제목" width="600">
        </el-table-column>
        <el-table-column prop="status" label="딥변상태" width="140">
        </el-table-column>
        <el-table-column prop="chekbox" label="" >
             <el-checkbox v-model="checked"></el-checkbox>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
<div style="margin-top: 15px;">
  <el-input placeholder="겁색" v-model="input" class="input-with-select">
    <template #prepend>
      <el-select v-model="select" placeholder="Select">
        <el-option label="ID" value="1"></el-option>
        <el-option label="제목/내용" value="2"></el-option>
      </el-select>
    </template>
    <template #append>
      <el-button type="primary" icon="el-icon-search"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
      <el-button  type="primary" icon="el-icon-receiving"></el-button>
    </template>
  </el-input>
</div>
</template>

<script>
   import { defineComponent, ref } from 'vue';
 
  export default defineComponent ({
       data() {
      const item = {
        date: '2016-05-02',
        ID: 'abc',
        title: '문의 드립니다.',
        status: '대기중'
        
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
  setup() {
    return {
      input: ref(''),
      select: ref('')
    }
  }
})
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
