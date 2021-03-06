export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: [],
      placeholder: '请输入'
    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: [],
      placeholder: '请输入'
    }
  },
  {
    type: 'number',
    name: '计数器',
    icon: 'icon-number',
    options: {
      width: '100%',
      required: false,
      defaultValue: 0,
      min: 0,
      max: 10,
      step: 1,
      disabled: false,
      controlsPosition: ''
    }
  },
  {
    type: 'radio',
    name: '单选框组',
    icon: 'icon-radio-active',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        },
        {
          value: '选项3',
          label: '选项3'
        }
      ],
      required: false,
      width: '100%',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'checkbox',
    name: '多选框组',
    icon: 'icon-check-box',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        },
        {
          value: '选项3',
          label: '选项3'
        }
      ],
      required: false,
      width: '100%',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'time',
    name: '时间选择器',
    icon: 'icon-time',
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '100%',
    }
  },
  {
    type: 'date',
    name: '日期选择器',
    icon: 'icon-date',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'datetimerange',
      format: 'yyyy-MM-dd HH:mm:ss',
      timestamp: false,
      required: false,
      width: '100%',
    }
  },
  {
    type: 'rate',
    name: '评分',
    icon: 'icon-icon-test',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    }
  },
  {
    type: 'color',
    name: '颜色选择器',
    icon: 'icon-color',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false
    }
  },
  {
    type: 'select',
    name: '下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '请选择',
      required: false,
      showLabel: false,
      width: '100%',
      options: [
        {
          value: '下拉框1',
          label: '下拉框1'
        },
        {
          value: '下拉框2',
          label: '下拉框2'
        },{
          value: '下拉框3',
          label: '下拉框3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'switch',
    name: '开关',
    icon: 'icon-switch',
    options: {
      defaultValue: false,
      required: false,
      disabled: false,
    }
  },
  {
    type: 'slider',
    name: '滑块',
    icon: 'icon-slider',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: '100%'
    }
  }
]
export const inputComponents = [
  {
    type: 'book_input',
    name: '书籍ID文本框',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: [],
      placeholder: '请输入书籍ID'
    }
  },
  {
    type: 'lisbook_input',
    name: '听书ID文本框',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: [],
      placeholder: '请输入听书ID'
    }
  },
]
export const treeComponents = [
  {
    type: 'version_tree',
    name: '版本树',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: true,
      placeholder: '请选择版本'
    }
  },
  {
    type: 'base_cate_tree',
    name: '底层分类树',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: true,
      placeholder: '请选择底层分类'
    }
  },
  {
    type: 'lis_cate_tree',
    name: '听书分类树',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: true,
      placeholder: '请选择听书分类'
    }
  },
  {
    type: 'show_cate_tree',
    name: '展示分类树',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: true,
      placeholder: '请选择展示分类'
    }
  },
]
export const lookupBackComponents = [
  {
    type: 'version_lookup_back',
    name: '版权方ID查找带回',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      placeholder: '请选择版权方ID'
    }
  },
]
export const selectComponents = [
  {
    type: 'copyright_select',
    name: '版权方下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: [],
      multiple: true,
      disabled: false,
      clearable: false,
      placeholder: '请选择版权方',
      required: false,
      width: '100%',
      filterable: true,
    }
  },
  {
    type: 'book_select',
    name: '书籍下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: [],
      multiple: true,
      disabled: false,
      clearable: false,
      placeholder: '请选择书籍',
      required: false,
      width: '100%',
      filterable: true,
    }
  },
  {
    type: 'lisbook_select',
    name: '听书下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: [],
      multiple: true,
      disabled: false,
      clearable: false,
      placeholder: '请选择听书',
      required: false,
      width: '100%',
      filterable: true,
    }
  },
  {
    type: 'scheme_select',
    name: '方案下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: [],
      multiple: true,
      disabled: false,
      clearable: false,
      placeholder: '请选择方案',
      required: false,
      width: '100%',
      filterable: true,
    }
  },
  {
    type: 'target_user_select',
    name: '目标用户下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: [],
      multiple: true,
      disabled: false,
      clearable: false,
      placeholder: '请选择目标用户',
      required: false,
      width: '100%',
      filterable: true,
    }
  },
  {
    type: 'user_group_select',
    name: '用户集下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: [],
      multiple: true,
      disabled: false,
      clearable: false,
      placeholder: '请选择用户集',
      required: false,
      width: '100%',
      filterable: true,
    }
  },
  {
    type: 'version_set_select',
    name: '版本集下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: [],
      multiple: true,
      disabled: false,
      clearable: false,
      placeholder: '请选择版本集',
      required: false,
      width: '100%',
      filterable: true,
    }
  },
  {
    type: 'version_select',
    name: '版本下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: [],
      multiple: true,
      disabled: false,
      clearable: false,
      placeholder: '请选择版本',
      required: false,
      width: '100%',
      filterable: true,
    }
  },
]
export const cascaderComponents = [
  {
    type: 'book_base_cas',
    name: '书籍基础分类级选',
    icon: 'icon-jilianxuanze',
    options: {
      defaultValue: [],
      width: '100%',
      placeholder: '请选择基础分类',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'book_show_cas',
    name: '书籍显示分类级选',
    icon: 'icon-jilianxuanze',
    options: {
      defaultValue: [],
      width: '100%',
      placeholder: '请选择显示分类',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    }
  },
] 
export const uploadComponents = [
  {
    type: 'imgupload',
    name: '图片',
    icon: 'icon-tupian',
    options: {
      defaultValue: "",
      size: {
        width: 100,
        height: 100,
        max: 5,
      },
      width: '100%',
      disabled: false,
    }
  },
  {
    type: 'videoupload',
    name: '视频',
    icon: 'icon-tupian',
    options: {
      defaultValue: "",
      size: {
        width: 100,
        height: 100,
        max: 30,
      },
      width: '100%',
      disabled: false,
    }
  },
  {
    type: 'audioupload',
    name: '音频',
    icon: 'icon-tupian',
    options: {
      defaultValue: "",
      size: {
        width: 100,
        height: 100,
        max: 30,
      },
      width: '100%',
      disabled: false,
    }
  },
  {
    type: 'excelupload',
    name: 'Excel',
    icon: 'icon-tupian',
    options: {
      defaultValue: "",
      size: {
        width: 100,
        height: 100,
        max: 100,
      },
      width: '100%',
      disabled: false,
    }
  },
  {
    type: 'fileupload',
    name: '文件',
    icon: 'icon-tupian',
    options: {
      defaultValue: "",
      size: {
        width: 100,
        height: 100,
        max: 100,
      },
      width: '100%',
      disabled: false,
    }
  },
]
export const advanceComponents = [
  {
    type: 'editor',
    name: '编辑器',
    icon: 'icon-fuwenbenkuang',
    options: {
      defaultValue: '',
      width: '100%'
    }
  },
  {
    type: 'cascader',
    name: '级联选择器',
    icon: 'icon-jilianxuanze',
    options: {
      defaultValue: [],
      width: '100%',
      placeholder: '请选择',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'blank',
    name: '自定义',
    icon: 'icon-ic',
    options: {
      defaultType: 'String'
    }
  },
]

export const layoutComponents = [
  {
    type: 'grid',
    name: '栅格布局',
    icon: 'icon-grid-',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 21,
      justify: 'start',
      align: 'top'
    }
  }
]