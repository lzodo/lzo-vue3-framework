<template>
  <!-- 根据类型显示内容 -->
  <div class="gform-box">
    <template v-if="isOnlyView">
      <!-- 查看 -->
      <!-- 文件预览 -->
      <template v-if="itemData.type == 'upload'">
        <!-- <gUploader
          v-if="
            (valueObj[itemData.fielId] &&
              valueObj[itemData.fielId].length > 0) ||
            (defaultArr && defaultArr.length > 0)
          "
          :uploadList="valueObj[itemData.fielId] || defaultArr"
          :limit="itemData.limit"
          :showTips="!!itemData.showTips"
          :fileSize="itemData.fileSize"
          :accept="itemData.accept"
          :tipText="itemData.tipText"
          :urlField="itemData.urlField"
          :nameField="itemData.nameField"
          :listType="itemData.listType"
          :multiple="itemData.multiple"
          :isOnlyView="isOnlyView"
          :disabled="isOnlyView"
          :showFileList="itemData.showFileList"
          :isDefaultList="itemData.isDefaultList"
          :isTableFile="itemData.isTableFile"
          :isCustomFileList="itemData.isCustomFileList"
          :isEdit="itemData.isEdit"
          :online="itemData.online"
          :isJoinApiPath="itemData.isJoinApiPath"
          :apiService="itemData.apiService"
          :showCustomViewBtn="itemData.showCustomViewBtn"
          :showCustomDownBtn="itemData.showCustomDownBtn"
          @upload-callback="uploadFiles"
          @delete-callback="deleteFile"
          @preview-file="previewFile"
          @download-file="downloadFile"
          class="upload-card"
        >
          <template #upload-btn>
            <slot name="custom-up-btn"></slot>
          </template>
        </gUploader>
        <template v-else>
          <span class="g-empty-text">无</span>
        </template> -->
      </template>
      <template v-else>
        <slot name="view-content">
          <template v-if="itemData.showViewFun">{{ itemData.showViewFun(valueObj, itemData) }}</template>
          <template v-else-if="itemData.type == 'thousandInput'">
            <template v-if="itemData.showDollar">
              {{ viewData(valueObj, itemData) | thousandFormat(true) }}
            </template>
            <template v-else>
              {{ viewData(valueObj, itemData) | thousandFormat(false) }}
            </template>
          </template>
          <template v-else-if="itemData.type == 'textarea'">
            <span style="white-space: pre-line">{{ viewData(valueObj, itemData) || '--' }}</span>
          </template>
          <template v-else>
            {{ viewData(valueObj, itemData) || '--' }}
          </template>
        </slot>
      </template>
    </template>
    <template v-else>
      <template v-if="itemData.type == 'switch'">
        <el-switch
          v-model="valueObj[itemData.fielId]"
          :disabled="disabled"
          :class="itemData.extraClass"
          :active-color="itemData.activeColor"
          :inactive-color="itemData.inactiveColor"
          :active-text="itemData.activeText"
          :inactive-text="itemData.inactiveText"
          :active-value="itemData.activeValue"
          :inactive-value="itemData.inactiveValue"
        ></el-switch>
      </template>
      <template v-else-if="itemData.type == 'select'">
        <!-- 下拉框 -->
        <el-select
          v-model="valueObj[itemData.fielId]"
          :placeholder="placeholderText"
          :multiple="itemData.multiple || false"
          :class="itemData.extraClass"
          :collapse-tags="itemData.collapseTags"
          filterable
          @change="changeOption"
          :allow-create="itemData.allowCreate || false"
          :filter-method="thisObj[itemData.filterMethod]"
          @input.native="filterData"
          :readonly="itemData.readonly"
          :disabled="itemData.disabled || disabled"
          ref="searchSelect"
          clearable
        >
          <template v-for="(item, index) in itemData.defaultOptions || getSelectOptions(itemData, thisObj)">
            <template v-if="isObj(item)">
              <el-option
                :key="index"
                :disabled="item[itemData.disabledField || 'disabled']"
                :label="item[itemData.labelFile || 'name']"
                :value="item[itemData.valueKey || 'value']"
              ></el-option>
            </template>
            <template v-else>
              <el-option :key="index" :label="item" :value="item"></el-option>
            </template>
          </template>
        </el-select>
      </template>
      <template v-else-if="itemData.type == 'cascader'">
        <!-- 级联选择器 -->
        <el-cascader
          ref="myCascader"
          :class="itemData.extraClass"
          :options="getSelectOptions(itemData, thisObj) || []"
          :disabled="itemData.disabled || disabled"
          v-model="valueObj[itemData.fielId]"
          clearable
          :props="
            itemData.propsData || {
              label: 'name',
              value: 'code',
            }
          "
          :placeholder="placeholderText"
          @change="changCascader"
        />
      </template>
      <template v-else-if="itemData.type == 'date'">
        <!-- 日期控件 -->
        <el-date-picker
          clearable
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :class="itemData.extraClass"
          :popper-class="itemData.popperClass"
          :disabled="itemData.disabled || disabled"
          :format="itemData.format"
          :value-format="itemData.dateFormat || formateDate(itemData.dateType)"
          v-model="valueObj[itemData.fielId]"
          @change="changeDate"
          :picker-options="pickerOptions(itemData, valueObj)"
          :type="itemData.dateType"
          :placeholder="placeholderText"
          :unlink-panels="itemData.unlinkPanels || true"
        ></el-date-picker>
      </template>
      <template v-else-if="itemData.type == 'radio'">
        <!-- 单选 -->
        <el-radio-group v-model="valueObj[itemData.fielId]" :class="itemData.extraClass" :disabled="itemData.disabled || disabled" @input="changeOption">
          <template v-for="(item, index) in itemData.defaultOptions || thisObj[itemData.optionsFielId] || []">
            <template v-if="isObj(item)">
              <el-radio :label="item[itemData.valueKey || 'value']" :disabled="item[itemData.disabledKey || 'disabled']" :key="index">
                {{ item[itemData.labelFile || 'name'] }}
              </el-radio>
            </template>
            <template v-else>
              <el-radio :label="item" :key="index">
                {{ item }}
              </el-radio>
            </template>
          </template>
        </el-radio-group>
      </template>
      <template v-else-if="itemData.type == 'radiobutton'">
        <!-- 单选按钮 -->
        <el-radio-group v-model="valueObj[itemData.fielId]" :class="itemData.extraClass" :disabled="itemData.disabled || disabled" @input="changeOption">
          <template v-for="(item, index) in itemData.defaultOptions || thisObj[itemData.optionsFielId] || []">
            <template v-if="isObj(item)">
              <el-radio-button :label="item[itemData.valueKey || 'value']" :disabled="item[itemData.disabledKey || 'disabled']" :key="index">
                {{ item[itemData.labelFile || 'name'] }}
              </el-radio-button>
            </template>
            <template v-else>
              <el-radio-button :label="item" :key="index">
                {{ item }}
              </el-radio-button>
            </template>
          </template>
        </el-radio-group>
      </template>
      <template v-else-if="itemData.type == 'checkbox'">
        <!-- 多选 -->
        <el-checkbox-group v-model="valueObj[itemData.fielId]" :class="itemData.extraClass" :disabled="itemData.disabled || disabled">
          <template v-for="(item, index) in itemData.defaultOptions || thisObj[itemData.optionsFielId] || []">
            <template v-if="isObj(item)">
              <el-checkbox class="111" :label="item[itemData.valueKey || 'value']" :key="index">
                <slot name="custom-checkbox-label" :optionItem="item" :formObj="valueObj">{{ item[itemData.labelFile || 'name'] }}</slot>
              </el-checkbox>
            </template>
            <template v-else>
              <el-checkbox :label="item" :key="index">
                <slot name="custom-checkbox-label" :optionItem="item" :formObj="valueObj">{{ item }}</slot>
              </el-checkbox>
            </template>
          </template>
        </el-checkbox-group>
      </template>
      <template v-else-if="itemData.type == 'upload'">
        <!-- 文件上传 -->
        <!-- <gUploader
          :uploadList="valueObj[itemData.fielId] || defaultArr"
          :limit="itemData.limit"
          :showTips="!!itemData.showTips"
          :fileSize="itemData.fileSize"
          :accept="itemData.accept"
          :tipText="itemData.tipText"
          :urlField="itemData.urlField"
          :nameField="itemData.nameField"
          :listType="itemData.listType"
          :multiple="itemData.multiple"
          :isDefaultList="itemData.isDefaultList"
          :isTableFile="itemData.isTableFile"
          :showFileList="itemData.showFileList"
          :isCustomFileList="itemData.isCustomFileList"
          :isEdit="itemData.isEdit"
          :apiService="itemData.apiService"
          :online="itemData.online"
          :isJoinApiPath="itemData.isJoinApiPath"
          :class="itemData.extraClass"
          :showCustomViewBtn="itemData.showCustomViewBtn"
          :showCustomDownBtn="itemData.showCustomDownBtn"
          @upload-callback="uploadFiles"
          @delete-callback="deleteFile"
          @preview-file="previewFile"
          @download-file="downloadFile"
          class="upload-card"
        >
          <template #upload-btn>
            <slot name="custom-up-btn"></slot>
          </template>
          <template #other-btn>
            <slot name="other-btn"></slot>
          </template>
        </gUploader> -->
      </template>
      <template v-else-if="itemData.type == 'inputNumber'">
        <!-- 计步器 -->
        <el-input-number
          v-model="valueObj[itemData.fielId]"
          :precision="itemData.precision"
          :step="itemData.step"
          :max="itemData.max"
          :min="itemData.min"
          :disabled="itemData.disabled || disabled"
          :readonly="itemData.readonly"
          :controls="itemData.controls"
          :placeholder="itemData.showPlaceholder ? placeholderText : ''"
          :class="itemData.extraClass"
          @change="changeNumber"
        ></el-input-number>
      </template>
      <template v-else-if="itemData.type == 'thousandInput'">
        <!-- 千位数 -->
        <!-- <thousandInput
          clearable
          v-model.trim="valueObj[itemData.fielId]"
          :class="itemData.extraClass"
          :maxlength="itemData.maxlength || null"
          :disabled="itemData.disabled || disabled"
          :readonly="itemData.readonly"
          :type="itemData.inputType || 'text'"
          @input="inputMethods"
          @blur="computeBirth"
          :placeholder="placeholderText"
        ></thousandInput> -->
      </template>
      <template v-else-if="itemData.type == 'selectTree'">
        <!-- 下拉树 -->
        <!-- <select-tree
          v-model="valueObj[itemData.fielId]"
          :showFilter="itemData.showFilter"
          :tree-data="thisObj[itemData.treeData]"
          :checkNodes="thisObj[itemData.checkNodes]"
          :node-key="itemData.nodeKey"
          :props="itemData.props"
          :isCheckbox="itemData.isCheckbox"
          @change="changeOption"
          @check-nodes="checkNodes"
        /> -->
      </template>
      <!-- 富文本编辑器 -->
      <!-- <template v-else-if="itemData.type == 'editor'">
        <div
          id="content"
          :class="['form-wangEditor', isOnlyView ? 'disable' : '']"
          height="300px"
        >
          <toolbar
            class="form-toolbar"
            :editor="contentEditor"
            :default-config="toolbarConfig"
          />
          <editor
            v-model="valueObj[itemData.fielId]"
            class="form-editor"
            :default-config="editorConfig"
            @onCreated="contentCreated"
            @customPaste="customPaste"
          />
        </div>
      </template> -->
      <template v-else>
        <!-- 输入框 -->
        <template v-if="itemData.type == 'textarea'">
          <el-input
            v-model="valueObj[itemData.fielId]"
            type="textarea"
            :class="itemData.extraClass"
            :autosize="{
              minRows: itemData.rows || 1,
              maxRows: itemData.maxRows || null,
            }"
            :rows="itemData.rows || 1"
            :readonly="itemData.readonly"
            :disabled="itemData.disabled || disabled"
            :maxlength="itemData.maxlength || null"
            :placeholder="placeholderText"
            :show-word-limit="itemData.showWordLimit"
          ></el-input>
        </template>
        <template v-else>
          <el-input
            clearable
            :ref="itemData.fielId"
            v-model.trim="valueObj[itemData.fielId]"
            :class="itemData.extraClass"
            :maxlength="itemData.maxlength || null"
            :disabled="itemData.disabled || disabled"
            :readonly="itemData.readonly"
            :type="itemData.inputType || 'text'"
            @input="inputMethods"
            @blur="computeBirth"
            @click.native="handleInputClick"
            @keyup.enter.native="handleEnterEvent"
            :placeholder="placeholderText"
          >
            <template #append v-if="itemData.append">
              <slot name="custom-append"></slot>
            </template>
            <template #prepend v-if="itemData.prepend">
              <slot name="custom-prepend"></slot>
            </template>
          </el-input>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
// import "@wangeditor/editor/dist/css/style.css";
// import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { isObj, dateFormat } from '@/utils/tools.js';
export default {
  name: 'gFormItem',
  components: {
    // Editor,
    // Toolbar,
  },
  props: {
    // 是否显示placeholder
    showPlaceholder: {
      type: Boolean,
      default: true,
    },
    // 是否是查看
    isOnlyView: {
      type: Boolean,
    },
    //是否禁用
    disabled: {
      type: Boolean,
    },
    //类型对象
    itemData: {
      type: Object,
      default: () => {},
    },
    // 绑定对象
    formObj: {
      type: Object,
      default: () => {},
    },
    // 事件、选项等数据
    thisObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      valueObj: this.formObj || {},
      defaultArr: [],

      // 富文本编辑器
      // contentEditor: null,
      // toolbarConfig: {
      //   excludeKeys: ["group-video", "insertImage"],
      // },
      // editorConfig: { MENU_CONF: {}, maxLength: this.itemData.maxlength },
    };
  },
  watch: {
    formObj(val) {
      this.valueObj = val;
    },
  },
  computed: {
    placeholderText() {
      let tips = '';
      switch (this.itemData.type) {
        case 'radio':
        case 'checkbox':
        case 'select':
        case 'date':
        case 'cascader':
          tips = `请选择`;
          break;
        case 'textarea':
        case 'input':
        default:
          tips = `请输入`;
          break;
      }
      // ${this.itemData.maxlength ? '，限' + this.itemData.maxlength + '字' : ''}
      return this.showPlaceholder ? this.itemData.placeholder || tips : '';
    },
  },

  async created() {
    // await this.initEditorConfig();
  },
  beforeDestroy() {
    // this.destroyEditor();
  },

  methods: {
    isObj,
    // 预览图片
    viewImageArr(data = []) {
      let urlArr = data.reduce((arr, item) => {
        if (item) {
          arr.push(isObj(item) ? item[this.itemData.urlField || 'fileUrl'] : item);
        }
        return arr;
      }, []);
      return urlArr;
    },

    // 下拉选项
    getSelectOptions(config = {}, dataObj = {}) {
      return config.options || dataObj[config.optionsFielId] || [];
    },
    // 限制select输入框输入文字个数
    filterData(val) {
      const maxNum = this.itemData.maxlength || '';
      if (maxNum) {
        const str = this.$refs.searchSelect.$data.selectedLabel; // 此属性得到输入的文字
        // 控制的js
        if (str.length > maxNum) {
          this.$refs.searchSelect.$data.selectedLabel = str.substr(0, maxNum);
        }
      }
    },

    //级联选中切换
    changCascader(val) {
      let checkDatas = [];
      if (this.$refs.myCascader) {
        const nodeArr = this.$refs.myCascader.getCheckedNodes();
        (nodeArr || []).forEach(item => {
          checkDatas = checkDatas.concat(item.pathLabels || []);
        });
      }
      if (this.itemData.changeEvent) {
        if (this.thisObj[this.itemData.changeEvent]) {
          this.thisObj[this.itemData.changeEvent](val, checkDatas, this.itemData, this.formObj);
        }
      }
    },

    changeOption(val, otheData) {
      if (this.itemData.changeEvent) {
        if (this.thisObj[this.itemData.changeEvent]) {
          this.thisObj[this.itemData.changeEvent](val, this.itemData, this.formObj, otheData);
        }
      }
    },
    checkNodes(dataArr, val) {
      if (this.itemData.checkNodesEvent) {
        if (this.thisObj[this.itemData.checkNodesEvent]) {
          this.thisObj[this.itemData.checkNodesEvent](dataArr, val, this.itemData, this.formObj);
        }
      }
    },
    //输入框失焦
    computeBirth(val) {
      if (this.itemData.computeEvent) {
        if (this.thisObj[this.itemData.computeEvent]) {
          this.thisObj[this.itemData.computeEvent](val, this.itemData, this.formObj);
        }
      }
    },
    // 输入框点击事件
    handleInputClick() {
      const clickEvent = this.itemData.clickEvent;
      if (clickEvent) {
        this.thisObj[clickEvent](this.itemData, this.formObj);
      }
    },
    // 日期切换事件
    changeDate(val) {
      if (this.itemData.changeEvent) {
        if (this.thisObj[this.itemData.changeEvent]) {
          this.thisObj[this.itemData.changeEvent](val, this.formObj, this.itemData);
        }
      }
    },
    // 日期设置
    pickerOptions(itemData, valueObj) {
      if (itemData.pickerOptionsFun && typeof itemData.pickerOptionsFun == 'function') {
        return itemData.pickerOptionsFun(itemData, valueObj);
      } else {
        return itemData.pickerOptions || {};
      }
    },
    //计数器输入事件
    changeNumber(val) {
      if (this.itemData.changeEvent) {
        if (this.thisObj[this.itemData.changeEvent]) {
          this.thisObj[this.itemData.changeEvent](val, this.itemData, this.formObj);
        }
      }
    },

    // 输入框输入事件
    inputMethods(value) {
      // numberLimit 目前保质期用到，限制输入一位小数
      if (this.itemData.type == 'thousandInput' || this.itemData.numberLimit) {
        let float = value.split('.')[0];
        value = value.replace(/[^-\d.]/g, ''); // 清除"数字"和"."以外的字符,可输入负数
        // value = value.replace(/-{2,}/g, '-'); // 不能连续输入两个及以上负号
        value = value.replace(/-{2,}/g, '-'); // 不能连续输入两个及以上负号
        value = value.replace('-', '$#$').replace(/-/g, '').replace('$#$', '-'); // 只保留第一个"-", 清除多余的"-"
        value = value.replace(/\.{2,}/g, '.'); // 不能连续输入两个及以上小数点
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.'); // 只保留第一个".", 清除多余的"."
        if (this.itemData.precision == 1) {
          value = value.replace(/^(-)*(\d+)\.(\d).*$/, '$1$2.$3'); // 只能输入一个小数
        } else if (!this.itemData.precision) {
          value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入2个小数
        } else if (this.itemData.precision == 10) {
          value = value.replace(/^(0+)|[^\d]+/g, ''); // 只要整数，不要小数
        } else if (this.itemData.precision == 4) {
          value = value.replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); // 只能输入四个小数
        }

        value = float.length > 1 && float.indexOf('0') == 0 ? Number(value) : value;
        this.valueObj[this.itemData.fielId] = value;
      }
      if (this.itemData.inputMethos && typeof this.itemData.inputMethos == 'function') {
        this.itemData.inputMethos(value, this.valueObj, this.itemData);
      } else if (this.itemData.inputMethosField) {
        this.thisObj[this.itemData.inputMethosField](value, this.valueObj, this.itemData);
      }
      if (this.itemData.changeEvent) {
        if (this.thisObj[this.itemData.changeEvent]) {
          this.thisObj[this.itemData.changeEvent](value, this.itemData, this.formObj);
        }
      }
    },

    // 输入框回车事件
    handleEnterEvent(event) {
      let value = this.valueObj[this.itemData.fielId];
      if (this.itemData.enterEvent) {
        if (this.thisObj[this.itemData.enterEvent]) {
          this.thisObj[this.itemData.enterEvent](value, this.itemData, this.formObj);
        }
      }
      this.$emit('searchFormEnter');
    },

    // 查看详情内容
    viewData(data, propsData) {
      const value = data[propsData.viewField || propsData.fielId];
      // 下拉
      if (propsData.optionsFielId) {
        const arr = this.thisObj[propsData.optionsFielId];
        if (propsData.multiple && Array.isArray(value)) {
          if (value.length == 0) {
            return '--';
          } else {
            let obj = [];
            value.map(vkey => {
              const temp = arr.find(item => {
                return vkey == item[propsData.valueKey || 'value'];
              });
              obj.push(temp ? temp[propsData.labelFile || 'name'] : vkey);
            });
            return obj
              .filter(item => {
                return item;
              })
              .join(',');
          }
        }
        if (arr && Array.isArray(arr)) {
          const obj = arr.find(item => {
            return value == item[propsData.valueKey || 'value'];
          });
          const curValue = obj ? obj[propsData.labelFile || 'name'] : value;
          if (curValue == 'null') {
            return '--';
          }
          return curValue || '--';
        }
      } else {
        if (Array.isArray(value)) {
          return value.join(',');
        }
      }

      // 日期调用格式化
      if (propsData.type == 'date' && propsData.viewDateFormat) {
        return dateFormat(value, propsData.viewDateFormat || 'YYYY-MM-DD HH:mm:ss');
      }
      if (typeof value === 'number' && !isNaN(value)) {
        return value;
      }
      if (!value && propsData.emptyText) {
        return propsData.emptyText;
      }

      return value || '--';
    },

    // 日期格式
    formateDate(dateType) {
      let str = 'yyyy-MM-dd HH:mm:ss';
      switch (dateType) {
        case 'year':
          str = 'yyyy';
          break;
        case 'month':
          str = 'yyyy-MM';
          break;
        case 'datetime':
          str = 'yyyy-MM-dd HH:mm:ss';
          break;
        case 'monthrange':
          str = 'yyyy-MM';
          break;
        case 'daterange':
        default:
          str = 'yyyy-MM-dd';
          break;
      }
      return str;
    },

    // 上传文件
    uploadFiles(fileData, file, fileBlob, currentFile, source) {
      this.$emit('uploadFiles', fileData, fileBlob, this.itemData, this.formObj, currentFile, source);
    },
    // 删除文件
    deleteFile(params, file) {
      this.$emit('deleteFile', params, file, this.itemData, this.formObj);
    },
    // 预览文件
    previewFile(file) {
      this.$emit('previewFile', file, this.itemData, this.formObj);
    },
    // 下载文件
    downloadFile(file) {
      this.$emit('downloadFile', file, this.itemData, this.formObj);
    },
    getRefComponent() {
      let id = this.itemData.fielId;
      return this.$refs[id];
    },

    // 富文本
    // initEditorConfig() {
    //   if (this.itemData.type != "editor") {
    //     return;
    //   }
    //   const that = this;
    //   this.editorConfig.MENU_CONF["uploadImage"] = {
    //     server: this.itemData.api,
    //     // 自定义上传
    //     async customUpload(file, insert) {
    //       let fileData = new FormData();
    //       fileData.append("file", file);
    //       // const res = await fileApi.uploadFile(fileData);
    //       // 使用promise
    //       const res = await that.thisObj[that.itemData.uploadEvent](fileData);
    //       if (res.code === 200) {
    //         insert(res.data.fileUrl || res.data.picUrl);
    //       }
    //     },
    //   };
    // },
    // contentCreated(editor) {
    //   this.contentEditor = Object.seal(editor);
    //   this.$nextTick(() => {
    //     this.initEditor();
    //   });
    // },
    // initEditor() {
    //   const content = this.contentEditor;
    //   if (content) {
    //     if (this.isOnlyView) {
    //       content.disable();
    //       return;
    //     }
    //     content.focus();
    //   }
    // },
    // destroyEditor() {
    //   if (this.itemData.type != "editor") {
    //     return;
    //   }
    //   const content = this.contentEditor;
    //   content?.destroy();
    // },
    // customPaste(editor, event, callback) {
    //   const reg = /<[^<>]+>/g;
    //   let content = editor.getHtml().replace(reg, "");
    //   let length = content.replace(/&nbsp;/gi, "").length;
    //   const html = event.clipboardData.getData("text/html"); // 获取粘贴的 html
    //   const text = event.clipboardData.getData("text/plain"); // 获取粘贴的纯文本
    //   const rtf = event.clipboardData.getData("text/rtf"); // 获取 rtf 数据（如从 word wsp 复制粘贴）
    //   let textLength = text.length;
    //   if (length + textLength > this.itemData.maxlength) {
    //     callback(false);
    //   } else {
    //     callback(true);
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
.gform-box {
  width: 100%;
  :deep(.el-cascader) {
    width: 100%;
  }
  .el-input-number {
    width: 100%;
    :deep(.el-input__inner) {
      text-align: left !important;
    }
  }
}
.upload-card {
  :deep(.el-upload-list--picture-card .el-upload-list__item),
  :deep(.el-upload--picture-card) {
    width: 90px;
    height: 90px;
    line-height: 90px;
    transition: none;
    .el-upload-list__item:last-child {
      margin-bottom: 0px;
    }
  }
}
:deep(input::-webkit-outer-spin-button),
:deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
}

:deep(input[type='number']) {
  -moz-appearance: textfield;
}
.view-image {
  width: 90px;
  height: 90px;
}
:deep(.el-select .el-input .el-select__caret) {
  line-height: inherit;
}
</style>
<style lang="scss" scoped>
/* 富文本 editor */
// .form-wangEditor {
//   // border: 1px solid #ccc;
//   // margin-top: 10px;
//   z-index: 100;
//   .form-toolbar {
//     border-bottom: 1px solid #ccc;
//   }
//   .form-editor {
//     height: 400px;
//     overflow-y: hidden;
//   }
// }
</style>
