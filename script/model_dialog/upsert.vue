<template>
  <el-dialog :title="this.form.id ? '编辑' : '新增'" :visible.sync="visible" width="600px">
    <el-form :rules="rules" ref="dataForm" :model="form"  v-loading="formLoading" label-position="right" label-width="30%">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 70%;" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false" :disabled="formLoading">取消</el-button>
      <el-button type="primary" :disabled="formLoading" @click="doUpsert">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ###Api } from '@/api/###'

export default {
  name: 'create-edit-dialog',
  props: {
    value: {
      type: Object,
      default: () => { return {} }
    },
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      formLoading: false,
      rules: {
        name: [{ required: true, message: '名称必填', trigger: 'blur' }],
      },
      form: {
        id: 0,
        name: '',
      },
    }
  },
  mounted() {
  },
  computed: {
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.$emit('cancel', this.visible)
      }
    },

    dialogFormVisible() {
      this.visible = this.dialogFormVisible
    },

    value() {
      if (this.value) {
        this.form = Object.assign({}, this.value)
      } else {
        this.resetForm()
      }
    },
  },
  methods: {
    // 清空表单
    resetForm() {
      this.form.id = 0
      this.$refs['dataForm'].resetFields()
    },

    // 修改
    doUpsert() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          ###Api.upsert(this.form).then(resp => {
            if (resp.ok) {
              this.visible = false
              this.$message.success(this.form.id ? '编辑成功' : '创建成功')
              this.$emit('success')
            }
          })
        }
      })
    }
  }
}
</script>
