<template>
  <div>
    <crad-m nm="用户"></crad-m>

    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="$refs.ruleForm.resetFields()"
    >
      <el-form :rules="addrules" ref="ruleForm" label-width="80px" :model="addFrom">
        <el-form-item label="名称" prop="username">
          <el-input v-model="addFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addFrom.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" autocomplete="off">
          <el-input v-model="addFrom.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加结尾 -->
    <!-- 编辑开始 -->

    <el-dialog title="提示" :visible.sync="editConfm" width="30%">
      <el-form label-width="80px" :model="editFrm" :rules="editrules" ref="EditruleForm">
        <el-form-item label="名称">
          <el-input v-model="editFrm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editFrm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editFrm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editConfm = false">取 消</el-button>
        <el-button type="primary" @click="editUser(editFrm.id)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑结尾 -->
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
          <template slot-scope="info">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="edituser(info.row.id)"
            ></el-button>

            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteuser(info.row.id)"
            ></el-button>
            <el-button type="warning" size="mini" icon="el-icon-share"></el-button>
          </template>
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
    // 修改
    editUser(id) {
      //   console.log(id)
      this.$refs.EditruleForm.validate(async valid => {
        // console.log(valid)
        if (valid === true) {
          const {
            data: {
              meta: { status, msg }
            }
          } = await this.$http.put(`users/${id}`, this.editFrm)
          //   console.log(status,msg)
          if (status === 200) {
            this.$message.success(msg)
            this.editConfm = false
            this.getList()
          }
        }
      })
    },
    /* 点击编辑按钮传入id 并打开会话框 发送获取个人用户信息请求 并显示到input框 */

    async edituser(id) {
      this.editConfm = true
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = await this.$http.get(`users/${id}`)
      if (status === 200) {
        this.editFrm = data
      }
    },
    // 删除用户方法
    deleteuser(id) {
      this.$confirm('你确定要删除此用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // console.log(id)
        const {
          data: {
            meta: { msg }
          }
        } = await this.$http.delete(`/users/${id}`)
        if (this.togo.pagenum > 1 && this.userlist.length !== 0) {
          this.togo.pagenum--
        }

        this.$message({
          type: 'success',
          message: msg
        })
        this.getList()
      })
    },
    // 添加用户方法
    adduser() {
      this.$refs.ruleForm.validate(async valid => {
        // console.log(valid)
        if (valid) {
          const {
            data: {
              meta: { msg, status }
            }
          } = await this.$http.post('/users', this.addFrom)
          if (status === 201) {
            this.$message.success(msg)
            this.addDialogVisible = false
            this.getList()
          }
        }
      })
    },

    dialogVisible() {},
    handleClose() {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done()
      //     })
      //     .catch(_ => {})
    },
    // 每页条数方法
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`)
    },
    // 当前第几页
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
      //   console.log(data, msg, status)
      if (status === 200) {
        this.tol = data.total
        this.userlist = data.users
      }
    }
  },
  data() {
    var mobiles = (rule, value, callback) => {
      if (!/^1[35789]\d{9}$/.test(value)) {
        // 校验失败(请给页面提示错误信息)
        return callback(new Error('手机号码格式不正确'))
      }
      // 校验成功，继续执行
      callback()
      console.log(value)
    }
    return {
      /* 修改默认开关 */
      editrules: {
        mobile: [{ validator: mobiles, trigger: 'blur' }]
      },
      editConfm: false,
      editFrm: {
        username: '',
        mobile: '',
        email: ''
      },
      /* 添加用户信息 */
      addDialogVisible: false,
      addFrom: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱 ', trigger: 'blur' }],
        mobile: [{ validator: mobiles, trigger: 'blur' }]
      },
      // 添加用户信息结尾

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

<<<<<<< HEAD
<style>

  </style>
=======
<style lang="less">
.el-main {
  div {
    .el-card {
      margin-top: 20px;
    }
  }
}
</style>
>>>>>>> userList
