<template>
  <dir id="roles">
    <crad-m nm="角色"></crad-m>
    <el-card class="box-card">
      <el-button type="primary">添加用户</el-button>

      <el-table :data="rolesData" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </dir>
</template>

<script>
export default {
  created() {
    this.getRolesData()
  },
  methods: {
    async getRolesData() {
      const {
        data: {
          data,
          meta: { status }
        }
      } = await this.$http.get('/roles')
      //    console.log(data,status)
      if (status === 200) {
        data.forEach(item => {
          //    console.log(item)
          item.son = item.children
          delete item.children
        })
        console.log(data)
        this.rolesData = data
        //    this.rolesData= data
      }
    }
  },
  data() {
    return {
      rolesData: []
    }
  }
}
</script>

<style>
</style>
