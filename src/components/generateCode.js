function packListData(main, mainTemplate_c, formValue_c, plugin_c, plugin_import_c, formRule_c, option_c, remote_c, func_c, AT) {
  for (let i = 0; i < main.length; i++) {
    if (main[i].type === 'grid') {
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
    }
    else {
      if (main[i].type === "input") {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-input v-model="form.${main[i].model}" placeholder="${main[i].options.placeholder}"
              style="width: ${main[i].options.width}"></el-input>
            </el-form-item>`)
      }
      else if (main[i].type === 'number') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-input-number v-model="form.${main[i].model}"
              style="width: ${main[i].options.width}" :min=${main[i].options.min} :max=${main[i].options.max}
              :step="${main[i].options.step}" :disabled="${main[i].options.disabled}"></el-input-number>
            </el-form-item>`)
      }
      else if (main[i].type === 'textarea') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-input v-model="form.${main[i].model}" placeholder="${main[i].options.placeholder}"
              style="width: ${main[i].options.width}" type="${main[i].type}" :disabled="${main[i].options.disabled}"></el-input>
            </el-form-item>`)
      }
      else if (main[i].type === 'radio') {
        if (!main[i].options.remote) {
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-radio-group v-model="form.${main[i].model}" style="width: ${main[i].options.width}">
                <el-radio 
                  :style="{display: ${main[i].options.inline} ? 'inline-block' : 'block'}"
                  :label="item.label" v-for="item in options_${main[i].model}" :key="item.value"
                  :value="item.value"
                ></el-radio>
              </el-radio-group>
            </el-form-item>`)
          let temp = JSON.stringify(main[i].options.options)
          option_c.push(`
      options_${main[i].model}: ${temp},`)
        }
        if (main[i].options.remote) {
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-radio-group v-model="form.${main[i].model}" style="width: ${main[i].options.width}">
                <el-radio 
                  :style="{display: ${main[i].options.inline} ? 'inline-block' : 'block'}"
                  :label="item.${main[i].options.props.label}" v-for="item in options_${main[i].model}"
                  :key="item.${main[i].options.props.value}" :value="item.${main[i].options.props.value}"
                ></el-radio>
              </el-radio-group>
            </el-form-item>`)
          option_c.push(`
      options_${main[i].model}: [],`)
          remote_c.push(`
    ${main[i].options.remoteFunc}(){
      this.options_${main[i].model} = ###Api.${main[i].options.remoteFunc}.data
    },`)
          func_c.push(`
    this.${main[i].options.remoteFunc}()`)
        }
      }
      else if (main[i].type === 'checkbox') {
        if (!main[i].options.remote) {
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-checkbox-group v-model="form.${main[i].model}" style="width: ${main[i].options.width}">
                <el-checkbox 
                  :style="{display: ${main[i].options.inline} ? 'inline-block' : 'block'}"
                  :label="item.label" v-for="item in options_${main[i].model}" :key="item.value"
                  :value="item.value"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>`)
          let temp = JSON.stringify(main[i].options.options)
          option_c.push(`
      options_${main[i].model}: ${temp},`)
        }
        if (main[i].options.remote) {
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-checkbox-group v-model="form.${main[i].model}" style="width: ${main[i].options.width}">
                <el-checkbox
                  :style="{display: ${main[i].options.inline} ? 'inline-block' : 'block'}"
                  :label="item.${main[i].options.props.label}" v-for="item in options_${main[i].model}"
                  :key="item.${main[i].options.props.value}" :value="item.${main[i].options.props.value}"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>`)
          option_c.push(`
      options_${main[i].model}: [],`)
          remote_c.push(`
    ${main[i].options.remoteFunc}(){
      this.options_${main[i].model} = ###Api.${main[i].options.remoteFunc}.data
    },`)
          func_c.push(`
    this.${main[i].options.remoteFunc}()`)
        }
      }
      else if (main[i].type === 'time') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-time-picker :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                style="width: ${main[i].options.width}" type="${main[i].type}" :is-range="${main[i].options.isRange}"
                :arrowControl="${main[i].options.arrowControl}"></el-time-picker>
            </el-form-item>`)
      }
      else if (main[i].type === 'date') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-date-picker :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                style="width: ${main[i].options.width}" type="${main[i].options.type}"
                start-placeholder="${main[i].options.startPlaceholder}"
                end-placeholder="${main[i].options.endPlaceholder}" unlink-panels
                value-format="${main[i].options.format}" format="${main[i].options.format}"></el-date-picker>
            </el-form-item>`)
      }
      else if (main[i].type === 'rate') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-rate v-model="form.${main[i].model}" :allow-half=${main[i].options.allowHalf}
                :max=${main[i].options.max} :disabled="${main[i].options.disabled}" 
                ></el-rate>
            </el-form-item>`)
      }
      else if (main[i].type === 'color') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-color-picker v-model="form.${main[i].model}" 
                :disabled="${main[i].options.disabled}" :show-alpha="${main[i].options.showAlpha}"
                ></el-color-picker>
            </el-form-item>`)
      }
      else if (main[i].type === 'cascader') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-cascader v-model="form.${main[i].model}" style="width: ${main[i].options.width}"
                :clearable="${main[i].options.clearable}" :disabled="${main[i].options.disabled}"
                placeholder="${main[i].options.placeholder}" :options="options_${main[i].model}" change-on-select>
              </el-cascader>
            </el-form-item>`)
        option_c.push(`
      options_${main[i].model}: [],`)
        remote_c.push(`
    ${main[i].options.remoteFunc}(){
      this.options_${main[i].model} = ###Api.${main[i].options.remoteFunc}.data
    },`)
        func_c.push(`
  this.${main[i].options.remoteFunc}()`)
      }
      else if (main[i].type === 'select') {
        if (!main[i].options.remote) {
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-select v-model="form.${main[i].model}" style="width: ${main[i].options.width}"
                :clearable="${main[i].options.clearable}" :disabled="${main[i].options.disabled}"
                :multiple="${main[i].options.multiple}" placeholder="${main[i].options.placeholder}">
                <el-option
                  :label="item.label" v-for="item in options_${main[i].model}" :key="item.value" :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>`)
          let temp = JSON.stringify(main[i].options.options)
          option_c.push(`
      options_${main[i].model}: ${temp},`)
        }
        if (main[i].options.remote) {
          mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-select v-model="form.${main[i].model}" style="width: ${main[i].options.width}"
                :clearable="${main[i].options.clearable}" :disabled="${main[i].options.disabled}"
                :multiple="${main[i].options.multiple}" placeholder="${main[i].options.placeholder}">
                <el-option
                  :label="item.${main[i].options.props.label}" v-for="item in options_${main[i].model}"
                  :key="item.${main[i].options.props.value}" :value="item.${main[i].options.props.value}" 
                ></el-option>
              </el-select>
            </el-form-item>`)
          option_c.push(`
      options_${main[i].model}: [],`)
          remote_c.push(`
    ${main[i].options.remoteFunc}(){
      this.options_${main[i].model} = ###Api.${main[i].options.remoteFunc}.data
    },`)
          func_c.push(`
      this.${main[i].options.remoteFunc}()`)
        }
      }
      else if (main[i].type === 'switch') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-switch v-model="form.${main[i].model}"></el-switch>
            </el-form-item>`)
      }
      else if (main[i].type === 'slider') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <el-slider v-model="form.${main[i].model}" :min=${main[i].options.min} :max=${main[i].options.max}
                :step="${main[i].options.step}" style="width: ${main[i].options.width}"
                :show-input="${main[i].options.showInput}" :disabled="${main[i].options.disabled}"
                :range="${main[i].options.range}"></el-slider>
            </el-form-item>`)
      }
      else if (main[i].type === 'blank') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
            </el-form-item>`)
      }
      else if (main[i].type === 'book_base_cas') {
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
      }
      else if (main[i].type === 'book_show_cas') {
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
      }
      else if (main[i].type === 'book_input') {
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
      }
      else if (main[i].type === 'lisbook_input'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <ListenBookInputComponent  v-model="form.${main[i].model}" type="textarea"
                placeholder="${main[i].options.placeholder}" style="width: ${main[i].options.width}"
                :disabled="${main[i].options.disabled}" />
            </el-form-item>`)
        plugin_c.push(`
import ListenBookInputComponent from '@/views/components/inputs/lisbookInput'`)
        plugin_import_c.push(`
    ListenBookInputComponent,`)
      }
      else if (main[i].type === 'version_tree'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <VersionTree  v-model="form.${main[i].model}" type="textarea"
                placeholder="${main[i].options.placeholder}" opstyle="width: ${main[i].options.width}"
                :disabled="${main[i].options.disabled}" />
            </el-form-item>`)
        plugin_c.push(`
import VersionTree from '@/views/components/trees/VersionTree'`)
        plugin_import_c.push(`
    VersionTree,`)
      }
      else if (main[i].type === 'base_cate_tree'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <BaseCategoryTreeComponent  v-model="form.${main[i].model}" showTextType="textarea"
                placeholder="${main[i].options.placeholder}" opstyle="width: ${main[i].options.width}"
                :disabled="${main[i].options.disabled}" />
            </el-form-item>`)
        plugin_c.push(`
import BaseCategoryTreeComponent from '@/views/components/trees/BaseCategoryTree'`)
        plugin_import_c.push(`
    BaseCategoryTreeComponent,`)
      }
      else if (main[i].type === 'lis_cate_tree'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <lisCategoryTree  v-model="form.${main[i].model}" input-type="text" 
                placeholder="${main[i].options.placeholder}" :style="width: ${main[i].options.width}"
                :check-strictly="true" :disabled="${main[i].options.disabled}" />
            </el-form-item>`)
        plugin_c.push(`
import lisCategoryTree from '@/views/components/trees/LisCategoryTree'`)
        plugin_import_c.push(`
    lisCategoryTree,`)
      }
      else if (main[i].type === 'show_cate_tree'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <showCategoryTree  v-model="form.${main[i].model}" input-type="text" 
                placeholder="${main[i].options.placeholder}" :style="width: ${main[i].options.width}"
                :check-strictly="true" :disabled="${main[i].options.disabled}" />
            </el-form-item>`)
        plugin_c.push(`
import showCategoryTree from '@/views/components/trees/ShowCategoryTree'`)
        plugin_import_c.push(`
    showCategoryTree,`)
      }
      else if (main[i].type === 'version_lookup_back'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <VersionSearchBack  v-model="form.${main[i].model}" 
                placeholder="${main[i].options.placeholder}"/>
            </el-form-item>`)
        plugin_c.push(`
import VersionSearchBack from '@/views/components/lookup/VersionSearchBack'`)
        plugin_import_c.push(`
    VersionSearchBack,`)
      }
      else if (main[i].type === 'imgupload') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <ImageUploadComponent v-model="form.${main[i].model}"
                :showDimension=true :limitDimensions="[{'height':${main[i].options.size.height}, 'width':${main[i].options.size.width}}]" :limitSize="${main[i].options.size.max} * 1024 * 1024"
                placeholder="仅支持${main[i].options.size.max}M内的jpg/png文件且分辨率${main[i].options.size.width} * ${main[i].options.size.height}的图片" style="width: ${main[i].options.width}"
              ></ImageUploadComponent>
            </el-form-item>`)
        plugin_c.push(`
import ImageUploadComponent from '@/views/components/uploads/imageUpload'`)
        plugin_import_c.push(`
    ImageUploadComponent,`)
      }
      else if (main[i].type === 'audioupload'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <audioUploadComponent v-model="form.${main[i].model}" style="width: ${main[i].options.width}"></audioUploadComponent>
            </el-form-item>`)
        plugin_c.push(`
import audioUploadComponent from '@/views/components/uploads/audioUpload'`)
        plugin_import_c.push(`
    audioUploadComponent,`)
      }
      else if (main[i].type === 'videoupload'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <videoUploadComponent v-model="form.${main[i].model}" style="width: ${main[i].options.width}"></videoUploadComponent>
            </el-form-item>`)
        plugin_c.push(`
import videoUploadComponent from '@/views/components/uploads/videoUpload'`)
        plugin_import_c.push(`
    videoUploadComponent,`)
      }
      else if (main[i].type === 'excelupload'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <ExcelUploadComponent v-model="form.${main[i].model}"
                :dialogVisible="uploadVisible" @cancel="uploadVisible = false"
                :file-handler="uploadFileHandler" download="###上传模板.xlsx"
                style="width: ${main[i].options.width}"
                templateLink="/athnapi/###"></ExcelUploadComponent>
            </el-form-item>`)
        plugin_c.push(`
import ExcelUploadComponent from '@/views/components/uploads/excelUpload'`)
        plugin_import_c.push(`
    ExcelUploadComponent,`)
      }
      else if (main[i].type === 'fileupload'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <fileUpload v-model="form.${main[i].model}"
                :fetchBaseInfo="true"
                @baseInfo="fetchFileBaseInfo"
                style="width: ${main[i].options.width}"
                uploadUrl="/athnapi/###"></fileUpload>
            </el-form-item>`)
        plugin_c.push(`
import fileUpload from '@/views/components/uploads/fileUpload'`)
        plugin_import_c.push(`
    fileUpload,`)
      }
      else if (main[i].type === 'editor') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <RichText v-model="form.${main[i].model}"
              style="width: ${main[i].options.width}"/>
            </el-form-item>`)
        plugin_c.push(`
import RichText from '@/components/RichTextEditor'`)
        plugin_import_c.push(`
    RichText,`)
      }
      else if (main[i].type === 'copyright_select') {
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <copyRightSelectComponent :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" :opstyle="{width: '${main[i].options.width}'}"
                :disabled="${main[i].options.disabled}" :multiple="${main[i].options.multiple}"
                :filterable="${main[i].options.filterable}"/>
            </el-form-item>`)
        plugin_c.push(`
import copyRightSelectComponent from '@/views/components/selects/copyrightSelect'`)
        plugin_import_c.push(`
    copyRightSelectComponent,`)
      }
      else if (main[i].type === 'book_select'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <BookSelectComponent :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" :style="width: ${main[i].options.width}"
                :disabled="${main[i].options.disabled}" :multiple="${main[i].options.multiple}"
                :filterable="${main[i].options.filterable}"/>
            </el-form-item>`)
        plugin_c.push(`
import BookSelectComponent from '@/views/components/selects/bookSelect'`)
        plugin_import_c.push(`
    BookSelectComponent,`)
      }
      else if (main[i].type === 'lisbook_select'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <LisBookSelectComponent :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" :style="width: ${main[i].options.width}"
                :disabled="${main[i].options.disabled}" :multiple="${main[i].options.multiple}"
                :filterable="${main[i].options.filterable}"/>
            </el-form-item>`)
        plugin_c.push(`
import LisBookSelectComponent from '@/views/components/selects/lisBookSelect'`)
        plugin_import_c.push(`
    LisBookSelectComponent,`)
      }
      else if (main[i].type === 'scheme_select'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <SchemeSelectComponent :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" :style="width: ${main[i].options.width}"
                :disabled="${main[i].options.disabled}" :multiple="${main[i].options.multiple}"
                :filterable="${main[i].options.filterable}"/>
            </el-form-item>`)
        plugin_c.push(`
import SchemeSelectComponent from '@/views/components/selects/SchemeSelect'`)
        plugin_import_c.push(`
    SchemeSelectComponent,`)
      }
      else if (main[i].type === 'target_user_select'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <TargetUserComponent :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" :style="width: ${main[i].options.width}"
                :disabled="${main[i].options.disabled}" :multiple="${main[i].options.multiple}"
                :filterable="${main[i].options.filterable}"/>
            </el-form-item>`)
        plugin_c.push(`
import TargetUserComponent from '@/views/components/selects/TargetUserSelect'`)
        plugin_import_c.push(`
    TargetUserComponent,`)
      }
      else if (main[i].type === 'user_group_select'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <UserGroupComponent :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" :style="width: ${main[i].options.width}"
                :disabled="${main[i].options.disabled}" :multiple="${main[i].options.multiple}"
                :filterable="${main[i].options.filterable}"/>
            </el-form-item>`)
        plugin_c.push(`
import UserGroupComponent from '@/views/components/selects/UserGorupSelect'`)
        plugin_import_c.push(`
    UserGroupComponent,`)
      }
      else if (main[i].type === 'version_set_select'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <VersionSetComponent :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" :opstyle="{width: '${main[i].options.width}'}"
                :disabled="${main[i].options.disabled}" :multiple="${main[i].options.multiple}"
                :filterable="${main[i].options.filterable}"/>
            </el-form-item>`)
        plugin_c.push(`
import VersionSetComponent from '@/views/components/selects/VersionSetSelect'`)
        plugin_import_c.push(`
    VersionSetComponent,`)
      }
      else if (main[i].type === 'version_select'){
        mainTemplate_c.push(`
            <el-form-item label="${main[i].name}" prop="${main[i].model}">
              <versionSelect :clearable="${main[i].options.clearable}" v-model="form.${main[i].model}"
                placeholder="${main[i].options.placeholder}" :opstyle="{width: '${main[i].options.width}'}"
                :disabled="${main[i].options.disabled}" :multiple="${main[i].options.multiple}"
                :filterable="${main[i].options.filterable}"/>
            </el-form-item>`)
        plugin_c.push(`
import versionSelect from '@/views/components/selects/VersionSelect'`)
        plugin_import_c.push(`
    versionSelect,`)
      }
      for (let k = 0; k < main[i].rules.length; k++) {
        let temp = main[i].rules[k]
        let _T = [] 
        if (temp.hasOwnProperty("required")) {
          _T.push(`{ required: ${temp.required}, message: ${temp.message}, trigger: 'blur' }`)
          if (main[i].options.pattern != undefined){
            for( let n = 0; n < main[i].options.pattern.length; n++){
              _T.push(`
          {trigger: 'blur', validator: ${main[i].options.pattern[n]}, message: '【${main[i].options.pattern[n]}】校验不通过'}`)
              plugin_c.push(`
import { ${main[i].options.pattern} } from '@/utils/validate'`)
            }
          }
          formRule_c.push(`
        '${main[i].model}': [${_T}],`)
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
  const formValue_c = []
  const plugin_c = []
  const plugin_import_c = []
  const formRule_c = []
  const option_c = []
  const remote_c = []
  const func_c = []
  const AT = []
  let mainTemplate = ''
  let formValue = ''
  let plugin = ''
  let plugin_import = ''
  let formRule = ''
  let option = ''
  let remote = ''
  let func = ''
  packListData(main, mainTemplate_c, formValue_c, plugin_c, plugin_import_c, formRule_c, option_c, remote_c, func_c, AT)
  if (AT.length > 0) {
    mainTemplate = AT[0].join('')
    formValue = AT[1].join('')
    let plugin_cset = [...new Set(AT[2])]
    plugin = plugin_cset.join('')
    let plugin_import_set = [...new Set(AT[3])]
    plugin_import = plugin_import_set.join('')
    formRule = AT[4].join('')
    option = AT[5].join('')
    remote = AT[6].join('')
    func = AT[7].join('')
  }

return `<template>
  <el-card class="box-card">
    <div>
      <el-form class="form-container" ref="editForm" :rules="rules" :model="form"
        labelWidth="${config.labelWidth}" v-loading="saving">${mainTemplate}
      </el-form>
      <div align="right">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" :disabled="saving" @click="submit">提交</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>${plugin}
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
    return {${option}
      rules: {${formRule}
      },
      saving: false,
      form: getDefaultData(),
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
  mounted() {${func}
  },
  computed() {

  },
  methods: {${remote}
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
  },
}
</script>`
}