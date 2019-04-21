<template>
  <div id="login">
    <div class="box1">
      <img src="../assets/logo.png" alt class="mini">
    </div>
    <div>
      <el-form
        :label-position="labelPosition"
        label-width="40px"
        :model="formLabelAlign"
        id="biaodan"
      >
        <el-form-item label="账号">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-row>
          <el-col size="medium">
            <el-button type="primary" class="widt">登录</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  }
}
</script>

<style lang="less">
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
</style>
