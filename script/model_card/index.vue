<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" @tab-remove="removeTab">
      <el-tab-pane label="&&&维护" name="list">
        <list-component ref="list" @upsert="showUpsert"></list-component>
      </el-tab-pane>
      <el-tab-pane :label="this.upsertValue ? '[编辑]&&&' : '[新增]&&&'" v-if="isShowUpsert" name="upsert" closable>
        <upsert-component :value="upsertValue" @cancel="closeUpsert(false)" @success="closeUpsert(true)"></upsert-component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ListComponent from './###List'
import UpsertComponent from './###Upsert'


export default {
  components: {
    'list-component': ListComponent,
    'upsert-component': UpsertComponent
  },

  data() {
    return {
      activeName: 'list',
      isShowUpsert: false,
      upsertValue: null
    }
  },

  methods: {
    closeUpsert(refresh) {
      this.activeName = 'list'
      this.isShowUpsert = false
      this.upsertValue = null
      if (refresh) {
        this.$refs.list.getList()
      }
    },
    removeTab(targetName) {
      if (targetName === 'upsert') {
        this.closeUpsert(false)
      }
    },
    showUpsert(row) {
      this.upsertValue = row
      this.isShowUpsert = true
      this.activeName = 'upsert'
    }
  }
}
</script>
