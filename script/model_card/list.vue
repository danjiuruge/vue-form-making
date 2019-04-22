<template>
  <div>
    <el-form :inline="true" :model="listQuery" :rules="rules">
      <el-form-item prop="name">
        <el-input @keyup.enter.native="doSearch" class="filter-item" placeholder="名称" v-model="listQuery.name" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button class="list-button" type="primary" v-waves icon="el-icon-search" @click="doSearch">搜索</el-button>
        <el-button class="list-button" type="success" icon="el-icon-circle-plus-outline" @click="doUpsert()">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" :height="tableHeight" element-loading-text="加载中" fit highlight-current-row>
      <el-table-column label="ID" prop="id" min-width="60"></el-table-column>
      <el-table-column label="名称" prop="name" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作" width="100px">
        <template slot-scope="scope">
          <el-button class="operation-button" type="text" @click="doUpsert(scope.row)">编辑</el-button>
          |
          <el-button class="operation-button" type="text" @click="doDelete(scope.row)">删除</el-button>
          |
          <el-button class="operation-button" type="text" @click="doPublish(scope.row)">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <g-pager :pager="listQuery" @input="getList" v-show="!listLoading"/>
  </div>
</template>

<script>
import { DEFAULT_PSIZE, NORMAL_OTHER_HEIGHT } from '@/utils/constant'
import { ###Api } from '@/api/###'

export default {
  name: 'index',
  data() {
    return {
      listLoading: true,
      list: null,
      rules: {},
      listQuery: {
        name: '',
        page: 1,
        psize: DEFAULT_PSIZE,
        count: 0,
      },
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
    getList() {
      this.listLoading = true
      ###Api.query(this.listQuery).then(resp => {
        if (resp.ok) {
          this.list = resp.data.list
          // 更新分页器数据
          this.listQuery.count= resp.data.count
        }
        this.listLoading = false
      })
    },

    doSearch() {
      this.getList()
    },

    doUpsert(row) {
      this.$emit('upsert', row)
    },

    doDelete(row) {
      this.$confirm('确认删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ###Api.del({id: row.id}).then(resp => {
          if (resp.ok) {
            this.$message.success('操作成功')
            this.resetResources()
            this.getList()
          }
        })
      }).catch(() => {})
    },

    doPublish(row) {
      this.$confirm('确认发布, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ###Api.publish({id: row.id}).then(resp => {
          if (resp.ok) {
            this.$message.success('操作成功')
            this.resetResources()
            this.getList()
          }
        })
      }).catch(() => {})
    },
  }
}
</script>
