<template>
  <el-form
    @submit.native.prevent
    class="pro-from"
    ref="ruleFormRef"
    :disabled="disabledForm"
    :class="{ inline: !blockLine }"
    :model="ruleForm"
    :label-width="labelWidth + 'px'"
  >
    <template v-for="(item, k) in data || []">
      <!-- isOnlyViewNotLoad=true 预览不加载 -->
      <el-form-item
        class="inline-item"
        :key="`${item.label}-${k}`"
        :label="item.label"
        :prop="item.fielId"
        :rules="checkRules(rules, item)"
        :label-width="item.hideLabel ? 0 + 'px' : ''"
        :class="{ block: blockList.includes(item.fielId) || item.block }"
        v-if="isLoad(item.delayLoad)"
      >
        <!-- 临时插入特殊的东西 -->
        <div v-if="item.type == 'middleInster'">
          <slot name="middleInster" :scope="ruleForm"></slot>
        </div>
        <div v-else>
          <gFormItem
            :isOnlyView="disabledForm || item.isOnlyView || Boolean(isEdit && item.isEditOnlyView)"
            :itemData="item"
            :formObj="ruleForm"
            :thisObj="thisObj"
            @focus="inputFocus"
            @uploadFiles="uploadFiles"
            @deleteFile="deleteFile"
            @selectChange="selectChange"
          ></gFormItem>
        </div>
      </el-form-item>
    </template>
    <slot></slot>
  </el-form>
</template>

<script>
import headerFromTableMixin from '@/pages/firstDemo/mixin/headerFromTableMixin.js';
import { rulesObj, checkRules } from '@/utils/rules.js';

export default {
  data() {
    return {
      rules: {
        fill: rulesObj.fill,
        onlyNumber: [...rulesObj.fill, ...rulesObj.onlyNumber],
        select: rulesObj.select,
        phone: [...rulesObj.fill, ...rulesObj.phone],
        onlyphone: rulesObj.phone,
      },

      gDictMap: {},
    };
  },
  mixins: [headerFromTableMixin],
  props: {
    ruleFormData: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Array,
      default: () => [],
    },
    dataId: {
      type: [String, Number],
      default: '',
    },
    labelWidth: {
      type: Number,
      default: 120,
    },
    // 是否一列一整行
    blockLine: {
      type: Boolean,
      default: true,
    },
    // 用到的字典数据
    dictData: {
      type: Array,
      default: () => [],
    },
    // 用到的 Api数据
    apiData: {
      type: Array,
      default: () => [],
    },
    // 如果 blockLine false，哪些需要单独占一整行
    blockList: {
      type: Array,
      default: () => [],
    },
    // 禁止整个表单输入
    disabledForm: {
      type: Boolean,
      default: false,
    },
    // 页面，如果需要特殊处理时使用
    page: {
      type: String,
    },
    // 是否是编辑表单
    isEdit: {
      type: Boolean,
      default: false,
    },
    // 页面私有枚举
    privateEnmu: {
      type: Array,
      default: () => [],
    },
    // 额外的数据对象
    otherObj: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    thisObj() {
      return this;
    },
    ruleForm() {
      return this.ruleFormData;
    },
  },
  methods: {
    checkRules,
    inputFocus(data) {
      this.$emit(data);
    },
    submit() {
      let data = false;
      this.$refs['ruleFormRef'].validate(async valid => {
        if (valid) {
          data = { ...this.ruleForm };
        }
      });
      return data;
    },
    async initDict() {
      // 获取用到的字典数据
      // this.useDictList(this.dictData);
    },
    uploadFiles(fileData, fileBlob, itemData, formObj) {
      this.$emit('uploadFiles', fileData, fileBlob, itemData, formObj);
    },
    deleteFile(params, file, itemData, formObj) {
      this.$emit('deleteFile', params, file, itemData, formObj);
    },
    selectChange(funcName, val, list, itemData, formObj) {
      this.$emit('selectChange', funcName, val, list, itemData, formObj);
    },
    isLoad(delayLoad) {
      let load = true;
      if (delayLoad) {
        if (delayLoad.value == undefined) {
          load = this.ruleForm[delayLoad.prop];
        } else {
          if (delayLoad.resolve) {
            load = this.ruleForm[delayLoad.prop] != delayLoad.value;
          } else {
            load = this.ruleForm[delayLoad.prop] == delayLoad.value;
          }
        }
      }
      return load;
    },
  },
  created() {
    // console.log(this.ruleForm, 456789555);

    this.initDict();
    this.initApiData();
  },
  setup(props, ctx) {
    // 获取用到的字典数据
    const { proxy } = getCurrentInstance();
    // main.js 全局绑定 useDict
    const gDictMap = props.dictData.length ? proxy.useDict([...props.dictData]) : {};
    return { ...gDictMap };
  },
};
</script>

<style lang="scss" scoped>
.pro-from {
  &.el-form.inline {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 50%;
      &.block {
        width: 100%;
      }
      :deep(.el-input) {
        width: 100%;
      }
    }
  }
  // :deep(:disabled) {
  //   background-color: #f4f8ff;
  //   color: #777;
  // }
}
</style>
