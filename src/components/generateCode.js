function packListData(main, mainTemplate_c, formValue_c, plugin_c, plugin_import_c, formRule_c, AT){
  for (let i = 0; i<main.length; i++){
    if (main[i].type === 'grid'){
      mainTemplate_c.push(`
        <el-row :gutter="${main[i].options['gutter']}">`)
      main[i].columns.forEach(item => {
        mainTemplate_c.push(`
          <el-col :span="${item.span}">`)
        packListData(item.list, mainTemplate_c, formValue_c, plugin_c, plugin_import_c, formRule_c, AT)
        mainTemplate_c.push(`
          </el-col>`)
      })
      mainTemplate_c.push(`
        </el-row>`)
    } else {
      if (main[i].type === "input"){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-input v-model="form.${main[i].model}" placeholder="${main[i].options['placeholder']}"
              style="width: ${main[i].options['width']}"></el-input>
            </el-form-item>`)
      }else if (main[i].type === 'textarea'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-input v-model="form.${main[i].model}" placeholder="${main[i].options['placeholder']}"
              style="width: ${main[i].options['width']}" type="${main[i].type}"></el-input>
            </el-form-item>`)
      }else if (main[i].type === 'book_base_cas'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <ShowCategoryCascaderComponent :clearable="${main[i].options['clearable']}" class="filter-item" v-model="form.${main[i].model}"
                placeholder="${main[i].options['placeholder']}" style="width: ${main[i].options['width']}" :change-on-select="true" 
                :disabled="${main[i].options['disabled']}" />
            </el-form-item>`)
        plugin_c.push(`
  import ShowCategoryCascaderComponent from '@/views/components/cascaders/BookShowCategoryCascader'`)
        plugin_import_c.push(`
      ShowCategoryCascaderComponent`)
      }
      for (let k = 0; k<main[i]['rules'].length; k++)
      {
        let temp = main[i]['rules'][k]
        if (temp.hasOwnProperty("required")){
          formRule_c.push(`
          "${main[i].model}": [{ required: ${temp['required']}, message: "${main[i]['model']}必填", trigger: 'blur' },],`)
        }
      }
      formValue_c.push(`
          ${main[i].model}: "${main[i].options['defaultValue']}",`)
      AT.push(mainTemplate_c, formValue_c, plugin_c, plugin_import_c, formRule_c)
    }
  }
}

export default function (data) {

  let main = JSON.parse(data).list
  let config = JSON.parse(data).config

  const mainTemplate_c = [] 
  let mainTemplate = ''

  const formValue_c = []
  let formValue = ''

  const plugin_c = []
  let plugin = ''

  const plugin_import_c = []
  let plugin_import = ''

  const formRule_c = []
  let formRule = ''

  const AT = []
  packListData(main, mainTemplate_c, formValue_c, plugin_c, plugin_import_c, formRule_c, AT)
  mainTemplate = AT[0].join('')
  formValue = AT[1].join('')
  plugin = AT[2].join('')
  plugin_import = AT[3].join('')
  formRule = AT[4].join('')

  return `
  <template>
    <div id="app">
      <el-form ref="dataForm" :rules="rules" :model="form" label-position="${config['labelPosition']}"
        labelWidth="${config['labelWidth']}" v-loading="formLoading" element-loading-text="数据保存中...">${mainTemplate}
      </el-form>
      <el-button @click="doCancel">取消</el-button>
      <el-button type="primary" @click="doAdd">提交</el-button>
    </div>
  </template>

  <script>
  import {} from '@/'${plugin}
  
  export default {
    props: {
      action: {
        type: String,
        default: 'create'
      },
      editPaneData: {
        type: Object,
        default() { return {} }
      },
    },
    components: {${plugin_import}
    },
    data: function() {
      return {
        formLoading: false,
        disabled: true,
        rules: {${formRule}
        },
        form: {
          id: 0,${formValue}
        },
      },
    },
    watch: {},
    mounted() {},
    methods: {
      doAdd() {

      },  
      doCancel() {
        this.$emit('close')
      },
    },
  }
</script>
`
}