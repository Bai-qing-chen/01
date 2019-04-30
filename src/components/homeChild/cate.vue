<template>
  <div>
    <crad-m nm="分类"></crad-m>
    <el-dialog title="添加商品" :visible.sync="addCaseBool" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="ruleForm.cat_name"></el-input>
        </el-form-item>

        <el-form-item label="分类上级">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            :props="cateProps"
            v-model="catSleted"
            :change-on-select="true"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCaseBool = false">取 消</el-button>
        <el-button type="primary" @click="addQuanxian">确 定</el-button>
      </span>
    </el-dialog>
    <el-card class="box-card">
      <el-button type="primary" @click="addCasc">添加用户</el-button>
      <el-table :data="cateUserList" style="width: 100%" row-key="cat_id">
        <el-table-column label="商品名称" prop="cat_name"></el-table-column>
        <el-table-column label="商品级别" prop="cat_level">
          <template slot-scope="info">
            <el-tag v-if="info.row.cat_level===0">一级</el-tag>
            <el-tag type="success" v-else-if="info.row.cat_level===1">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="desc">
          <el-button type="primary">修改</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getCateList()
  },
  methods: {
    addQuanxian() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          // console.log(111)
          const {
            data: {
              meta: { msg, status }
            }
          } = await this.$http.post('categories', this.ruleForm)
          console.log(status)
          if (status !== 201) {
            return this.$message.error(msg)
          }
          this.$message.success(msg)
          this.addCaseBool = false
          this.getCateList()
        }
      })
    },
    handleChange(value) {
      //   console.log(value)
      const len = this.catSleted.length
      if (len === 0) {
        this.ruleForm.cat_pid = 0
        this.ruleForm.cat_pid = 0
      }
      this.ruleForm.cat_pid = this.catSleted[len - 1]
      this.ruleForm.cat_id = this.catSleted
    },

    async addCasc() {
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = await this.$http.get('categories', { params: { type: 2 } })
      console.log(data)

      if (status !== 200) {
        this.$message.error(msg)
        this.addCaseBool = false
      }
      this.options = data
      this.addCaseBool = true
    },
    //   获取列表
    async getCateList() {
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = await this.$http.get('categories')
      console.log(data, status)
      if (status === 200) {
        this.cateUserList = data
        console.log(this.cateUserList)
      }
    }
  },
  data() {
    return {
      //
  
      // 接受一二级信息 定义级联选择器显示的数据
      options: [],
      //   props定义显示的字段 id 父子嵌套
      cateProps: {
        label: 'cat_name', //定义显示文字
        value: 'cat_id', //起作用的字段
        children: 'children' //父子嵌套衔接字段
      },
      //   获取上级分类信息
      catSleted: [],
      rules: {
        cat_name: [{ required: true, message: '必须填入商品名称', trigger: 'blur' }]
      },
      // 级联表单数据
      ruleForm: {
        cat_name: '', //新添加的名称
        cat_pid: '', //父级id
        cat_id: ''
      },
      addCaseBool: false,
      cateUserList: []
    }
  }
}
</script>

<style>
</style>
