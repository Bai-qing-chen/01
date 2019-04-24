<template>
  <div id="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2">
            <!-- <div class="grid-content bg-purple"> -->
            <img src="@/assets/img/heima.png" alt>
            <!-- </div> -->
          </el-col>
          <el-col :span="20" class="txt">
            <div class="grid-content bg-purple-light">后台管理系统</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple-light">
              <el-button @click="outUser">退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside :width="isShow?'53px':'200px'">
          <el-col :span="12">
            <div class="shuXian" @click="isShow=!isShow">|||</div>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="width:200px"
              :unique-opened="true"
              :collapse="isShow"
              :collapse-transition="false"
            >
              <el-submenu
                :index="item.id+''"
                :style="{width:isShow?'53px':'200px'}"
                v-for="(item,k) in slidList"
                :key="item.id"
              >
                <template slot="title">
                  <i :class="'iconfont icon-'+iconList[k]"></i>
                  <span>{{item.authName}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    :index="item2.id+''"
                    v-for="item2 in item.children"
                    :key="item2.id"
                  >{{item2.authName}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    /* 获取侧边栏 */

    this.getslide()
  },
  methods: {
    outUser() {
      this.$confirm('您确定要退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.removeItem('token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      })
    },
    async getslide() {
      const {
        data: {
          data,
          meta: { status }
        }
      } = await this.$http.get('/menus')
      /* 侧边栏接受请求数据 */
      // console.log(data)
      if (status === 200) {
        this.slidList = data
      }
    }
  },
  data() {
    return {
      /* 侧边栏Icon */

      iconList: ['users', 'tijikongjian', 'user', 'danju', 'showpassword'],
      /* 停止动画 */
      isCollapse: false,
      /* 侧边显示导航栏的内容 */

      isShow: false,
      /* 定义一个空数组接受侧边栏的信息 */

      slidList: []
    }
  }
}
</script>

<style lang="less">
#home {
  height: 100%;
  width: 100%;
  // background: #ccc;
  .el-container {
    height: 100%;
    /* 头部 */
    .el-header {
      height: 60px;
      line-height: 60px;
      width: 100%;
      background-color: #4a5064;
      overflow: hidden;
      .el-row {
        height: 100%;
        .el-col {
          height: 100%;
        }
        .txt {
          font-size: 22px;
          height: 60px;
          line-height: 60px;
          font-weight: 700;
          color: #fff;

          user-select: none;
        }
      }
    }
    /* 侧边栏 */
    .el-aside {
      width: 198px;
      height: 100%;
      background-color: #333744;

      letter-spacing: 0.1em;
      cursor: pointer;

      .el-col {
        overflow: hidden;
        width: 100%;
        height: 100%;
        width: 100%;
        .shuXian {
          text-align: center;
        }
      }
    }

    /* 主题 */
  }
}
</style>
