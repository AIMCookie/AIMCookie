<template lang="">
    <div>
        <h1>매출 관리</h1>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      property="index"
      label=""
      width="120">
    </el-table-column>
    <el-table-column
      property="date"
      label="날짜"
      width="120">
    </el-table-column>
    <el-table-column
      property="people"
      label="명"
      width="120">
    </el-table-column>
    <el-table-column
      property="total_money"
      label="금액">
    </el-table-column>
  </el-table>
</template>
<script lang="" scopped>
export default {
    data() {
      return {
        tableData: [{
          index: '기존구독',
          date: '2016-05-03',
          people: 'Tom',
          total_money: 'No. 189, Grove St, Los Angeles'
        }, {
          index: '신규구독',
          date: '2016-05-02',
          people: 'Tom',
          total_money: 'No. 189, Grove St, Los Angeles'
        }, {
          index: '구독취소',
          date: '2016-05-04',
          people: 'Tom',
          total_money: 'No. 189, Grove St, Los Angeles'
        }],

      }
    },methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange() {
        this.currentRow = 4;
      },
    },

    
}
</script>
<style lang="" scopped>
    
</style> 