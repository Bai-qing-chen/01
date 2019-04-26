<template>
  <div id="quanXian">
    <crad-m nm="权限"></crad-m>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="180"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop=" level" label="等级">
          <template slot-scope="info">
            <el-tag v-if="info.row.level==0">一级</el-tag>
            <el-tag v-else-if="info.row.level==1" type="warning">二级</el-tag>
            <el-tag v-else type="danger">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      //   console.log(11111)
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = await this.$http.get('rights/list')
    //   console.log(data, msg, status)
      if (status === 200) {
        this.tableData = data
      }
    }
  },
  data() {
    return {
      tableData: []
    }
  }
}
</script>

<style lang="less">

</style>
