<template>
  <div id="memberManagement">
    <div id="searchBar" style="margin:50px 50px 100px 50px;">
      <el-input placeholder="Please input" v-model="searchText">
        <template #prepend>
          <el-select v-model="searchType" placeholder="Select">
            <el-option label="id" value="1"></el-option>
            <el-option label="name" value="2"></el-option>
            <el-option label="email" value="3"></el-option>
            <el-option label="tel" value="4"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button icon="el-icon-search"></el-button>
        </template>
      </el-input>
    </div>
  </div>

  <div id="tableSection" style="height:100%">
    <el-table :data="tableData" height="700px" style="width: 100%;height:100%">
      <el-table-column prop="id" label="Id" width="180"> </el-table-column>
      <el-table-column prop="name" label="Name" width="180"> </el-table-column>
      <el-table-column prop="email" label="Email"> </el-table-column>
      <el-table-column prop="tel" label="Tel"> </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      searchType: ref(""),
      searchText: ref(""),
      tableData: ref([]),
    };
  },
  created() {
    for (var i = 1; i <= 50; ++i) {
      this.tableData.push({
        id: "user" + i,
        name: "유저명" + i,
        email: "sample" + i + "@email.com",
        tel: "010-1234-1234",
      });
    }
  },
  methods: {
    handleEdit(idx, row) {
      console.log(idx, row);
    },
    handleDelete(idx, row) {
      console.log(idx, row);
    },
  },
});
</script>

<style></style>
