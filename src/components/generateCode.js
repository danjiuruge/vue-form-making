function findRemoteFunc (list, funcList, tokenFuncList, blankList) {
  console.log(list)
  for (let i = 0; i < list.length; i++) {
    if (list[i].type == 'grid') {
      list[i].columns.forEach(item => {
        findRemoteFunc(item.list, funcList, tokenFuncList, blankList)
      })
    } else {
      if (list[i].type == 'blank') {
        if (list[i].model) {
          blankList.push({
            name: list[i].model,
            label: list[i].name
          })
        }
      } else if (list[i].type == 'imgupload') {
        if (list[i].options.tokenFunc) {
          tokenFuncList.push({
            func: list[i].options.tokenFunc,
            label: list[i].name,
            model: list[i].model
          })
        }
      } else {
        if (list[i].options.remote && list[i].options.remoteFunc) {
          funcList.push({
            func: list[i].options.remoteFunc,
            label: list[i].name,
            model: list[i].model
          })
        }
      }
    }
  }
}

export default function (data) {

  const funcList = []

  const tokenFuncList = []

  const blankList = []

  let main = JSON.parse(data).list
  findRemoteFunc(main, funcList, tokenFuncList, blankList)

  let funcTemplate = ''

  let blankTemplate = ''

  let mainTemplate = ''

  let formValue = ''

  for(let i = 0; i < funcList.length; i++) {
    funcTemplate += `
            ${funcList[i].func} (resolve) {
              // ${funcList[i].label} ${funcList[i].model}
              // 获取到远端数据后执行回调函数
              // resolve(data)
            },
    `
  }

  for(let i = 0; i < tokenFuncList.length; i++) {
    funcTemplate += `
            ${tokenFuncList[i].func} (resolve) {
              // ${tokenFuncList[i].label} ${tokenFuncList[i].model}
              // 获取到token数据后执行回调函数
              // resolve(token)
            },
    `
  }

  for (let i = 0; i < blankList.length; i++) {
    blankTemplate += `
        <template slot="${blankList[i].name}" slot-scope="scope">
          <!-- ${blankList[i].label} -->
          <!-- 通过 v-model="scope.model.${blankList[i].name}" 绑定数据 -->
        </template>
    `
  }

  for (let i = 0; i<main.length; i++){
    if (main[i].type === "input"){
      mainTemplate += `
        <el-form-item label="${main[i].name}" prop="${main[i].model}">
          <el-input v-model="form.${main[i].model}" placeholder="${main[i].options['placeholder']}" style="width: ${main[i].options['width']}"></el-input>
        </el-form-item>
      `
    }else if (main[i].type === 'textarea'){
      mainTemplate += `
        <el-form-item label="${main[i].name}" prop="${main[i].model}">
          <el-input v-model="form.${main[i].model}" placeholder="${main[i].options['placeholder']}" style="width: ${main[i].options['width']}" type="${main[i].type}"></el-input>
        </el-form-item>
      `
    }
    formValue += `
          ${main[i].model}: "${main[i].options['defaultValue']}",`
  }

  return `
  <template>
    <div id="app">
      <el-form ref="dataForm" :rules="rules" :model="form" label-position="right" v-loading="formLoading" element-loading-text="数据保存中...">
        ${mainTemplate}
      </el-form>
      <el-button @click="doCancel">取消</el-button>
      <el-button type="primary" @click="doAdd">提交</el-button>
    </div>
  </template>

  <script>
  import {} from '@/' 
  
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
    components: {

    },
    data: function() {
      return {
        formLoading: false,
        disabled: true,
        rules: {},
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