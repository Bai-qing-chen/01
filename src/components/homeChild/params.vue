<template>
  <div>
    <crad-m nm="参数"></crad-m>
    <el-card class="box-card">
      <el-alert title="只允许为第三分类设置相关参数" type="warning" show-icon></el-alert>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              :props="catTree"
              v-model="getSledId"
              clearable
              @change="catTreeChange"
            ></el-cascader>
          </div>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="动态数据" name="many">
          <el-button type="primay" size="mini" :disabled="showButton">添加动态参数</el-button>
          <el-table :data="manyList" stripe style="width: 100%">
            <el-table-column type="expand" width="50">
              <template slot-scope="info">
                <el-tag v-for="(item,k) in info.row.attr_arr" :key="k">{{item}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column type="index" width="80"></el-table-column>
            <el-table-column prop="attr_name" label="姓名" width="250"></el-table-column>
            <el-table-column prop="address" label="操作">
              <el-button>编辑</el-button>
              <el-button>删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button type="primay" size="mini" :disabled="showButton">添加静态参数</el-button>
          <el-table :data="onlyList" stripe style="width: 100%">
            <el-table-column type="expand" width="50">
              <template slot-scope="info">
                <el-tag v-for="(item,k) in info.row.attr_arr" :key="k">{{item}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column type="index" width="80"></el-table-column>
            <el-table-column prop="attr_name" label="姓名" width="250"></el-table-column>
            <el-table-column prop="address" label="操作">
              <el-button>编辑</el-button>
              <el-button>删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
/*  selectedCat: [],    // 临时接收选取的分类信息
    catList: [],        // 接收全部用于展示的级联分类信息
    activeName: 'many', // many：动态参数    only：静态参数
    catThreeId: 0,      // 选取好的第3级别分类id
    manyParamList: [],  // 动态参数列表
    onlyParamList: []   // 静态参数列表 */

export default {
  created() {
    this.getSled()
    // this.getParamList()
  },
  methods: {
    // 自定义方法
    async getParamList() {
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = await this.$http.get(`categories/${this.streeId}/attributes`, {
        params: { sel: this.activeName }
      })
      data.forEach(item => {
        item.attr_arr = item.attr_vals.split(' ')
      })

      if (this.activeName === 'only') {
        this.onlyList = data
      } else {
        this.manyList = data
      }
      console.log(data, msg, status)
    },

    tabClick() {
      // 如果选取第三级别id就可以获取三级别数据
      if (this.streeId !== 0) {
        this.getParamList()
      }
      // console.log(this.activeName)
    },
    // 下拉改变的回调
    catTreeChange() {
      console.log(this.getSledId)
      const len = this.getSledId.length
      // console.log(len)
      if (len === 3) {
        this.showButton = false
        this.streeId = this.getSledId[2]
        this.getParamList()
      } else {
        this.showButton = true
        this.getSledId = []
        this.streeId = 0
        this.onlyList = []
        this.manyList = []
      }
    },
    async getSled() {
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = await this.$http.get('categories', { pramas: { type: 3 } })
      // console.log(data, msg, status)
      if (status === 200) {
        this.options = data
        //  console.log(  this.options)
      }
    }
  },
  data() {
    return {
      // 定义静态参数列表
      onlyList: [],
      // 定义动态参数列表
      manyList: [],
      //
      streeId: 0,
      // 是否禁用
      showButton: true,
      // 默认tabs激活的显示
      activeName: 'only',
      // 选中绑定的id
      getSledId: [],
      // 显示的属性
      options: [],
      // 下拉显示的文字
      catTree: { value: 'cat_id', label: 'cat_name', children: 'children' }
    }
  }
}
</script>

<style>
.el-tag {
  margin-right: 10px;
}
</style>
