function packListData(main, mainTemplate_c, formValue_c, plugin_c, plugin_import_c, formRule_c, option_c, remote_c, func_c, AT){
  for (let i = 0; i<main.length; i++){
    if (main[i].type === 'grid'){
      mainTemplate_c.push(`
        <el-row :gutter="${main[i].options.gutter}">`)
      main[i].columns.forEach(item => {
        mainTemplate_c.push(`
          <el-col :span="${item.span}">`)
        packListData(item.list, mainTemplate_c, formValue_c, plugin_c, plugin_import_c, formRule_c, option_c, remote_c, func_c, AT)
        mainTemplate_c.push(`
          </el-col>`)
      })
      mainTemplate_c.push(`
        </el-row>`)
    } else {
      if (main[i].type === "input"){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-input v-model="form.${main[i].model}" placeholder="${main[i].options.placeholder}"
              style="width: ${main[i].options.width}" :disabled="${main[i].options.disabled}"></el-input>
            </el-form-item>`)
      }else if (main[i].type === 'number'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-input-number v-model="form.${main[i].model}"
              style="width: ${main[i].options.width}" :min="${main[i].options.min}" :max="${main[i].options.max}"
              :step="${main[i].options.step}" :disabled="${main[i].options.disabled}"></el-input-number>
            </el-form-item>`)
      }else if (main[i].type === 'textarea'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-input v-model="form.${main[i].model}" placeholder="${main[i].options.placeholder}"
              style="width: ${main[i].options.width}" type="${main[i].type}" :disabled="${main[i].options.disabled}"></el-input>
            </el-form-item>`)
      }else if (main[i].type === 'radio'){
        if (!main[i].options.remote){
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-radio-group v-model="form.${main[i].model}" style="width: ${main[i].options.width}">
                <el-radio 
                  :style="{display: ${main[i].options.inline} ? 'inline-block' : 'block'}"
                  :label="item.label" v-for="(item, index) in options_${main[i].model}" :key="item.value"
                ></el-radio>
              </el-radio-group>
            </el-form-item>`)
          let temp = JSON.stringify(main[i].options.options)
          option_c.push(`
        options_${main[i].model}: ${temp},`)
        }
        if (main[i].options.remote){
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-radio-group v-model="form.${main[i].model}" style="width: ${main[i].options.width}">
                <el-radio 
                  :style="{display: ${main[i].options.inline} ? 'inline-block' : 'block'}"
                  :label="item.${main[i].options.props.label}" v-for="(item, index) in options_${main[i].model}"
                  :key="item.${main[i].options.props.value}"
                ></el-radio>
              </el-radio-group>
            </el-form-item>`)
          option_c.push(`
        options_${main[i].model}: [],`)
          remote_c.push(`
      def ${main[i].options.remoteFunc}(){
        this.options_${main[i].model} = ###Api.${main[i].options.remoteFunc}.data
      },`)
          func_c.push(`
      this.${main[i].options.remoteFunc}()`)
        }
      }else if (main[i].type === 'checkbox'){
        if (!main[i].options.remote){
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-checkbox-group v-model="form.${main[i].model}" style="width: ${main[i].options.width}">
                <el-checkbox 
                  :style="{display: ${main[i].options.inline} ? 'inline-block' : 'block'}"
                  :label="item.label" v-for="(item, index) in options_${main[i].model}" :key="item.value"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>`)
          let temp = JSON.stringify(main[i].options.options)
          option_c.push(`
        options_${main[i].model}: ${temp},`)
        }
        if (main[i].options.remote){
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-checkbox-group v-model="form.${main[i].model}" style="width: ${main[i].options.width}">
                <el-checkbox
                  :style="{display: ${main[i].options.inline} ? 'inline-block' : 'block'}"
                  :label="item.${main[i].options.props.label}" v-for="(item, index) in options_${main[i].model}"
                  :key="item.${main[i].options.props.value}"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>`)
          option_c.push(`
        options_${main[i].model}: [],`)
          remote_c.push(`
      def ${main[i].options.remoteFunc}(){
        this.options_${main[i].model} = ###Api.${main[i].options.remoteFunc}.data
      },`)
          func_c.push(`
      this.${main[i].options.remoteFunc}()`)
        }
      }else if (main[i].type === 'time'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-date-picker :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                style="width: ${main[i].options.width}" type="${main[i].type}" is-range="${main[i].options.isRange}"
                ></el-date-picker>
            </el-form-item>`)
      }else if (main[i].type === 'date'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-date-picker :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                style="width: ${main[i].options.width}" type="${main[i].options.type}"
                start-placeholder="${main[i].options.startPlaceholder}"
                end-placeholder="${main[i].options.endPlaceholder}" unlink-panels
                value-format="${main[i].options.format}" format="${main[i].options.format}"></el-date-picker>
            </el-form-item>`)
      }else if (main[i].type === 'rate'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-rate v-model="form.${main[i].model}" allow-half="${main[i].options.allowHalf}"
                max="${main[i].options.max}" :disabled="${main[i].options.disabled}" 
                ></el-rate>
            </el-form-item>`)
      }else if (main[i].type === 'color'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-color-picker v-model="form.${main[i].model}" 
                :disabled="${main[i].options.disabled}" :show-alpha="${main[i].options.showAlpha}"
                ></el-color-picker>
            </el-form-item>`)
      }else if (main[i].type === 'cascader'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-cascader v-model="form.${main[i].model}" style="width: ${main[i].options.width}"
                :clearable="${main[i].options.clearable}" :disabled="${main[i].options.disabled}"
                :placeholder="${main[i].options.placeholder}" :options="options_${main[i].model}" change-on-select>
              </el-cascader>
            </el-form-item>`)
          option_c.push(`
        options_${main[i].model}: [],`)
          remote_c.push(`
      def ${main[i].options.remoteFunc}(){
        this.options_${main[i].model} = ###Api.${main[i].options.remoteFunc}.data
      },`)
          func_c.push(`
      this.${main[i].options.remoteFunc}()`)
      }else if (main[i].type === 'select'){
        if (!main[i].options.remote){
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-select v-model="form.${main[i].model}" style="width: ${main[i].options.width}"
                :clearable="${main[i].options.clearable}" :disabled="${main[i].options.disabled}"
                :multiple="${main[i].options.multiple}" :placeholder="${main[i].options.placeholder}">
                <el-option
                  :label="item.label" v-for="(item, index) in options_${main[i].model}" :key="item.value" :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>`)
          let temp = JSON.stringify(main[i].options.options)
          option_c.push(`
        options_${main[i].model}: ${temp},`)
        }
        if (main[i].options.remote){
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-select v-model="form.${main[i].model}" style="width: ${main[i].options.width}"
                :clearable="${main[i].options.clearable}" :disabled="${main[i].options.disabled}"
                :multiple="${main[i].options.multiple}" :placeholder="${main[i].options.placeholder}">
                <el-option
                  :label="item.${main[i].options.props.label}" v-for="(item, index) in options_${main[i].model}"
                  :key="item.${main[i].options.props.value}" :value="item.${main[i].options.props.value}" 
                ></el-option>
              </el-select>
            </el-form-item>`)
          option_c.push(`
        options_${main[i].model}: [],`)
          remote_c.push(`
      def ${main[i].options.remoteFunc}(){
        this.options_${main[i].model} = ###Api.${main[i].options.remoteFunc}.data
      },`)
          func_c.push(`
      this.${main[i].options.remoteFunc}()`)
        }
      }else if (main[i].type === 'switch'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-switch v-model="form.${main[i].model}"></el-switch>
            </el-form-item>`)
      }else if (main[i].type === 'slider'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-slider v-model="form.${main[i].model}" :min="${main[i].options.min}" :max="${main[i].options.max}"
                :step="${main[i].options.step}" style="width: ${main[i].options.width}"
                :show-input="${main[i].options.showInput}" :disabled="${main[i].options.disabled}"
                :range="${main[i].options.range}"></el-slider>
            </el-form-item>`)
      }else if (main[i].type === 'blank'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
            </el-form-item>`)
      }else if (main[i].type === 'book_base_cas'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <BaseCategoryCascaderComponent :clearable="${main[i].options.clearable}" class="filter-item" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" style="width: ${main[i].options.width}" :change-on-select="true" 
                :disabled="${main[i].options.disabled}" />
            </el-form-item>`)
        plugin_c.push(`
  import BaseCategoryCascaderComponent from '@/views/components/cascaders/BookBaseCategoryCascader'`)
        plugin_import_c.push(`
      BaseCategoryCascaderComponent,`)
      }else if (main[i].type === 'book_show_cas'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <ShowCategoryCascaderComponent :clearable="${main[i].options.clearable}" class="filter-item" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" style="width: ${main[i].options.width}" :change-on-select="true" 
                :disabled="${main[i].options.disabled}" />
            </el-form-item>`)
        plugin_c.push(`
  import ShowCategoryCascaderComponent from '@/views/components/cascaders/BookShowCategoryCascader'`)
        plugin_import_c.push(`
      ShowCategoryCascaderComponent,`)
      }else if (main[i].type === 'book_input'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <BookInputComponent  v-model="form.${main[i].model}" type="textarea"
                placeholder="${main[i].options.placeholder}" style="width: ${main[i].options.width}"
                :disabled="${main[i].options.disabled}" />
            </el-form-item>`)
        plugin_c.push(`
  import BookInputComponent from '@/views/components/inputs/bookInput'`)
        plugin_import_c.push(`
      BookInputComponent,`)
      }else if (main[i].type === 'imgupload'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <ImageUploadComponent v-model="form.${main[i].model}"
                :showDimension=true :limitDimensions="[{'height':${main[i].options.size.height}, 'width':${main[i].options.size.width}}]" :limitSize="${main[i].options.size.max} * 1024 * 1024"
                placeholder="仅支持${main[i].options.size.max}M内的jpg/png文件且分辨率${main[i].options.size.width} * ${main[i].options.size.height}的图片" style="width: ${main[i].options.width}" />
            </el-form-item>`)
        plugin_c.push(`
  import ImageUploadComponent from '@/views/components/uploads/uploads/ImageUploadComponent`)
        plugin_import_c.push(`
      ImageUploadComponent,`)
      }else if (main[i].type === 'editor'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <RichText v-model="form.${main[i].model}"
              style="width: ${main[i].options.width}" :inputStyle="inputStyle"/>
            </el-form-item>`)
        plugin_c.push(`
  import RichText from '@/components/RichTextEditor`)
        plugin_import_c.push(`
      RichText,`)
      }else if (main[i].type === 'copyright_select'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <copyRightSelectComponent :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" :opstyle="{width: ${main[i].options.width}}"
                :disabled="${main[i].options.disabled}" :multiple="${main[i].options.multiple}"
                :filterable="${main[i].options.filterable}"/>
            </el-form-item>`)
        plugin_c.push(`
  import copyRightSelectComponent from '@/views/components/selects/copyRightSelectComponent'`)
        plugin_import_c.push(`
      copyRightSelectComponent,`)
      }
      for (let k = 0; k<main[i].rules.length; k++)
      {
        let temp = main[i].rules[k]
        if (temp.hasOwnProperty("required")){
          formRule_c.push(`
          "${main[i].model}": [{ required: ${temp.required}, message: "${main[i].model}必填", trigger: 'blur' },],`)
        }
      }
      let temp = JSON.stringify(main[i].options.defaultValue)
      formValue_c.push(`
      ${main[i].model}: ${temp},`)
      AT.push(mainTemplate_c, formValue_c, plugin_c, plugin_import_c, formRule_c, option_c, remote_c, func_c)
    }
  }
}

export default function (data) {

  let main = JSON.parse(data).list
  let config = JSON.parse(data).config
  console.log(main)

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

  const option_c = []
  let option = ''

  const remote_c = []
  let remote = ''

  const func_c = []
  let func = ''

  const AT = []
  packListData(main, mainTemplate_c, formValue_c, plugin_c, plugin_import_c, formRule_c, option_c, remote_c, func_c, AT)
  if (AT.length > 0)
  {
    mainTemplate = AT[0].join('')
    formValue = AT[1].join('')
    plugin = AT[2].join('')
    plugin_import = AT[3].join('')
    formRule = AT[4].join('')
    option = AT[5].join('')
    remote = AT[6].join('')
    func = AT[7].join('')
  }

  return `
  <template>
    <div id="app">
      <el-form ref="editForm" :rules="rules" :model="form" label-position="${config['labelPosition']}"
        labelWidth="${config['labelWidth']}" v-loading="formLoading" element-loading-text="数据保存中...">${mainTemplate}
      </el-form>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </template>

  <script>
  ${plugin}
  import {###Api} from '@/###'

  function getDefaultData() {
    return {
      id:0,${formValue}
    }
  }

  export default {
    props: {
      value: Object,
    },
    components: {${plugin_import}
    },
    data() {
      return {
        formLoading: false,
        disabled: true,
        ${option}
        rules: {${formRule}
        },
        form: getDefaultData(),
      },
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
    mounted() {
      ${func}
    },
    computed() {

    },
    methods: {
      ${remote}
      submit() {
        // 验证创建表单
        this.$refs['editForm'].validate(async (valid) => {
          if (!valid) {
            return
          }
          ###Api.upsert(this.form).then(resp => {
            if (resp.ok) {
              this.$message.success('操作成功!')
              this.$emit('success')
            }
          })
        })
      },  
      cancel() {
        this.$emit('close')
      },
    },
  }
</script>
`
}