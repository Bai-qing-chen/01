<template>
  <dir id="roles">
    <crad-m nm="角色"></crad-m>

    <el-dialog title="分配权限" :visible.sync="editDialogVisible" width="30%">
      <el-form label-width="80px" :model="formDate">
        <el-form-item label="名称">{{formDate.roleName}}</el-form-item>
        <el-form-item label="权限分配">
          <el-tree
            :data="treeData"
            show-checkbox
            default-expand-all
            :default-checked-keys="checkedKey"
            node-key="id"
            :props="defaultProps"
            @node-click="handleNodeClick(formDate.id)"
            ref="domTree"
          ></el-tree>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qTree()">确 定</el-button>
      </span>
    </el-dialog>

    <el-card class="box-card">
      <el-button type="primary">添加用户</el-button>

      <el-table :data="rolesData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row v-for="item in props.row.son" :key="item.id">
              <el-col :span="5">
                <el-tag closable @close="removeTag( props.row,item.id)">{{item.authName}}</el-tag>
              </el-col>
              <el-col :span="19">
                <el-row v-for="item2 in item.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeTag( props.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                  </el-col>
                  <el-col :span="13">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeTag( props.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="info">
            <el-button type="primary" icon="el-icon-edit">修改</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" @click="fenPei(info.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </dir>
</template>

<script>
export default {
  created() {
    // this.getTree()
    this.getRolesData()
  },
  methods: {
    async qTree() {
      // 获取选中的Id
      const checkedId = this.$refs.domTree.getCheckedKeys()
      console.log(checkedId)
      // 获取半选的ID
      const BcheckedId = this.$refs.domTree.getHalfCheckedKeys()
      console.log(BcheckedId)

      const ids = checkedId.concat(BcheckedId).join(',')
      // console.log(arr2)
      const {
        data: {
          meta: { msg, status }
        }
      } = await this.$http.post(`roles/${this.formDate.id}/rights`, {
        rids: ids
      })
      console.log(msg, status)
      if (status !== 200) {
        return this.$message.error(msg)
      }
      this.$message.success(msg)
      this.editDialogVisible = false
      this.getRolesData()
    },

    // 获取树形结构选中的id

    handleNodeClick(data) {
      // console.log(data)
    },
    async fenPei(user) {
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = await this.$http.get('/rights/tree')
      if (status !== 200) {
        return this.$message.error(msg)
      }

      var arr = []
      //
      this.quanXian(user, arr)
      console.log(arr)
      this.checkedKey = arr
      this.treeData = data
      this.formDate = user
      // console.log(this.formDate)
      this.editDialogVisible = true

      // 默认勾选权限定义一个数组接收第三级别id
    },

    // 默认勾选权限方法声明
    quanXian(node, arr) {
      // console.log(arr)
      if (node.son) {
        node.children = node.son
      }
      if (!node.children) {
        return arr.push(node.id)
      }
      console.log(node)
      node.children.forEach(item => {
        this.quanXian(item, arr)
      })
    },
    removeTag(propsId, tagId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {
          data: {
            data,
            meta: { msg, status }
          }
        } = await this.$http.delete(`roles/${propsId.id}/rights/${tagId}`)
        if (status === 200) {
          this.$message.success(msg)
          propsId.son = data
        }
      })

      //  console.log(data)
    },

    async getRolesData() {
      const {
        data: {
          data,
          meta: { status }
        }
      } = await this.$http.get('/roles')

      if (status === 200) {
        data.forEach(item => {
          item.son = item.children
          delete item.children
        })

        this.rolesData = data
      }
    }
  },
  data() {
    return {
      checkedKey: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      formDate: {},
      editDialogVisible: false,
      rolesData: []
    }
  }
}
</script>

<style lang="less">
.el-row {
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 10px 5px;
}
</style>
