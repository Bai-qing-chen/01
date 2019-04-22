<template>
  <div id="loginbox">
    <div id="login">
      <div class="box1">
        <img src="../assets/logo.png" alt class="mini">
      </div>
      <div>
        <el-form
          ref="formDM"
          :label-position="labelPosition"
          :rules="rules"
          label-width="60px"
          :model="loginFrom"
          id="biaodan"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginFrom.username">
              <i slot="prefix" class="el-input__icon icon iconfont icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginFrom.password" show-password>
              <i slot="prefix" class="el-input__icon icon iconfont icon-3702mima"></i>
            </el-input>
          </el-form-item>
          <el-row>
            <el-col size="medium" :push="12">
              <el-button type="primary" @click="login()">登录</el-button>
              <el-button type="info" @click="reset">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /*方法*/
  methods: {
    reset() {
      this.$refs.formDM.resetFields()
    },
    login() {
      /*校验触发完后的回调函数*/
      this.$refs.formDM.validate(async v => {
        // console.log(v)

        if (v === true) {
          const {
            data: {
              data,
              meta: { msg, status }
            }
          } = await this.$http.post('/login', this.loginFrom)

          if (status !== 200) {
            return this.$message({
              message: msg,
              type: 'error'
            })
          } else {
            this.$message.success(msg)
            this.$router.push('/home')
            window.sessionStorage.setItem('token', data.token)

            
          }
        }
      })
    }
  },
  /*数据存储*/
  data() {
    return {
      labelPosition: 'right',
      /*初始化账号密码*/
      loginFrom: {
        username: 'admin',
        password: '123456'
      },
      /*校验*/
      rules: {
        /*检验初始化账号密码*/

        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="less">
#loginbox {
  height: 100%;
  background: #2b4b6b;
  #login {
    height: 400px;
    width: 400px;
    padding: 50px 50px;
    box-sizing: border-box;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .box1 {
      width: 150px;
      height: 150px;
      background: #eee;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 10px 10px;
      overflow: hidden;
      box-shadow: 0 0 10px #eee;
      .mini {
        //   width: 100%;
        background: #fff;
        border-radius: 50%;
        height: 100%;
      }
    }
    #biaodan {
      padding-top: 100px;
    }
  }
  .widt {
    width: 100%;
  }
}
</style>
