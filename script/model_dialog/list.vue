<template>
  <div class="app-container calendar-list-container">
    <el-form :inline="true" @submit.native.prevent>
      <el-form-item>
        <el-input @keyup.enter.native="getList" class="filter-item" placeholder="名称" v-model="listQuery.name" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="list-button" type="primary" v-waves icon="el-icon-search" @click="getList">搜索</el-button>
        <el-button class="list-button" @click="doCreate" type="success" icon="el-icon-circle-plus-outline">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" :height="tableHeight" v-loading="listLoading" element-loading-text="加载中" fit highlight-current-row style="width: 100%">
      <el-table-column label="ID" prop="id" min-width="100"></el-table-column>
      <el-table-column label="名称" prop="name" min-width="140" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button class="operation-button" type="text" @click="doEdit(scope.row)">编辑</el-button>
          |
          <el-button class="operation-button" type="text" @click="doDelete(scope.row)">删除</el-button>
          |
          <el-button class="operation-button" type="text" @click="doPublish(scope.row)">发布</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页显示-->
    <g-pager :pager="listQuery" :vShow="!listLoading" @input="getList" />
    <create-edit-dialog
      :value="editData"
      :dialogType="dialogType"
      :dialogFormVisible="dialogFormVisible"
      @cancel="closeCreateEditDialog"
      @success="refreshList"/>
  </div>
</template>

<script>
import { DEFAULT_PSIZE, NORMAL_OTHER_HEIGHT } from '@/utils/constant'
import { ###Api } from '@/api/###'
import CreateEditDialog from './###Upsert'

export default {
  name: 'index',
  components: {
    'create-edit-dialog': CreateEditDialog,
  },
  data() {
    return {
      listLoading: true,
      list: null,
      listQuery: {
        name: '',
        page: 1,
        psize: DEFAULT_PSIZE,
        count: 0,
      },

      dialogType: '',
      dialogFormVisible: false,
      editData: null,
    }
  },
  created() {
    this.getList()
  },
  computed: {
    tableHeight() {
      return this.$GlobalVariable.WindowHeight - NORMAL_OTHER_HEIGHT
    }
  },

  methods: {
    // 查询
    getList() {
      this.listLoading = true
      ###Api.query(this.listQuery).then(resp => {
        this.list = resp.data.list
        // 更新分页器数据
        this.listQuery.count = resp.data.count
        this.listLoading = false
      })
    },

    // 新增
    doCreate() {
      this.dialogType = 'create'
      this.dialogFormVisible = true
    },

    // 编辑
    doEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.editData = row
    },

    // 删除
    doDelete(row) {
      this.$confirm('确认删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        ###Api.del({id: row.id}).then(resp => {
          if (resp.ok) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 2000
            })
            this.getList()
          }
        })
      }).catch()
    },

    // 发布 
    doPublish(row) {
      this.$confirm('确认发布, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        ###Api.publish({id: row.id}).then(resp => {
          if (resp.ok) {
            this.$message({
              type: 'success',
              message: '发布成功!',
              duration: 2000
            })
            this.getList()
          }
        })
      }).catch()
    },

    // 中途关闭对话框
    closeCreateEditDialog(value) {
      this.editData = null
      this.dialogFormVisible = value
    },

    // 操作成功后
    refreshList() {
      this.dialogFormVisible = false
      this.getList()
    },
  }
}
</script>
