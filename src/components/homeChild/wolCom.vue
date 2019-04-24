<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="请输入关键字"
              v-model="togo.query"
              class="input-with-select"
              clearable
              @clear="getList"
            >
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
            <el-dialog
              title="提示"
              :visible.sync="addDialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <span>这是一段信息</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-col>
      </el-row>

      <el-table stripe border :data="userlist" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
        <el-table-column prop="create_time" label="用户注册时间" width="180">
          <template slot-scope="user">{{user.row.create_time | fmtDate }}</template>
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="180">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="status.row.mg_state"
            slot-scope="status"
          ></el-switch>
        </el-table-column>
        <el-table-column prop="mg_state" label="操作">
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
          <el-button type="warning" size="mini" icon="el-icon-share"></el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="togo.pagenum"
        :page-sizes="[3, 5, 10, 12]"
        :page-size="togo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tol"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  filters: {
    shiJi: function(v, fromsj) {
      return moment(v).format(fromsj)
    }
  },
  created() {
    this.getList()
  },

  methods: {
    dialogVisible() {},
    handleClose() {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done()
      //     })
      //     .catch(_ => {})
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`)
      this.togo.pagenum = val
      this.getList()
    },

    async getList() {
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = await this.$http.get('/users', { params: this.togo })
      console.log(data, msg, status)
      if (status === 200) {
        this.tol = data.total
        this.userlist = data.users
      }
    }
  },
  data() {
    return {
      addDialogVisible: false,
      userlist: [],
      // 一共多少页
      tol: 0,
      togo: {
        query: '',
        pagenum: 1,
        pagesize: 3
      }
    }
  }
}
</script>

<style lang="less">
.el-main {
  div {
    .el-card {
      margin-top: 20px;
    }
  }
}
</style>
