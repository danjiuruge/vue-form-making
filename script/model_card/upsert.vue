<template>
  <el-card class="box-card">
    <div>
      <el-form class="form-container" :model="form" :rules="rules" ref="editForm" label-width="100px"
        v-loading="saving">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
      </el-form>
      <div align="right">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" :disabled="saving" @click="submit">提交</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { ###Api } from '@/api/###'

function getDefaultData() {
  return {
    id: 0,
    name: '',
  }
}

export default {
  props: {
    value: Object,
  },
  data() {
    return {
      saving: false,
      form: getDefaultData(),
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      }
    }
  },
  created() {

  },
  watch: {
    value: {
      immediate: true,
      handler() {
        if (this.value && this.value.id) {
          ###Api.one({'id': this.value.id}).then((resp) => {
            if (!resp.ok) {
              this.cancel()
              return
            }
            this.form = resp.data
          })
        } else {
          this.form = getDefaultData()
        }
        if ('editForm' in this.$refs) {
          this.$refs.editForm.clearValidate()
        }
      }
    }
  },
  computed: {

  },
  methods: {
    submit() {
      // 验证创建表单
      this.$refs['editForm'].validate(async (valid) => {
        if (!valid) {
          return
        }
        this.saving = true
        ###Api.upsert(this.form).then(resp => {
          this.saving = false
          if (resp.ok) {
            this.$message.success('操作成功!')
            this.$emit('success')
          }
        })
      })
    },

    cancel() {
      this.$emit('cancel')
    },
  }
}
</script>
