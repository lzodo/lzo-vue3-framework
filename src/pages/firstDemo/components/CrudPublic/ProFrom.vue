<template>
  <div>
    <el-form
      @submit.native.prevent
      class="yl-from"
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
          v-if="isLoad(item.delayLoad) && (disabledForm && item.isOnlyViewNotLoad ? false : true)"
        >
          <template>
            <!-- 临时插入特殊的东西 -->
            <div v-if="item.type == 'middleInster'">
              <slot name="middleInster" :scope="ruleForm"></slot>
            </div>
            <!-- <div v-else-if="item.type == 'date' && item.dateType == 'datetime'">
              <el-date-picker
                v-model="ruleForm[item.fielId]"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
                :clearable="item.clearable"
              ></el-date-picker>
            </div> -->
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
          </template>
        </el-form-item>
      </template>
    </el-form>
    <slot></slot>
  </div>
</template>

<script>
import headerFromTableMixin from '@/pages/tablePass/mixin/headerFromTableMixin.js';
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
      return { ...this, ...this.otherObj };
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
      this.useDictList(this.dictData);
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
    this.initDict();
    this.initApiData();
  },
};
</script>

<style lang="scss" scoped>
.yl-from {
  &.el-form.inline {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 50%;
      &.block {
        width: 100%;
      }
      ::v-deep .el-input {
        width: 100%;
      }
    }
  }
  ::v-deep :disabled {
    background-color: #f4f8ff;
    color: #777;
  }

  // ::v-deep .el-form-item .el-form-item {
  //   margin-bottom: 20px;
  // }
}
</style>
