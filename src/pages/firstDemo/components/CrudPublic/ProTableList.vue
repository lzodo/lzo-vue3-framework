<template>
  <!-- :height="'100%'" -->
  <el-table
    class="table-list-cpn"
    ref="multipleTable"
    row-key="id"
    stripe
    :border="border"
    :data="dataList"
    v-bind="$attrs"
    :highlight-current-row="!selection"
    @selection-change="handleSelectionChange"
    @current-change="handleCurrentChange"
    :minHeight="tableHeight ? tableHeight + 'px' : 'auto'"
  >
    <el-table-column type="selection" :reserve-selection="true" width="55" v-if="selection"></el-table-column>
    <el-table-column type="index" width="50" v-if="showIndex" label="序号"></el-table-column>
    <template v-for="(item, k) in tableColumn || []">
      <el-table-column
        :key="`${item.label}-${k}`"
        :align="align"
        :label="item.label"
        :prop="item.fielId"
        :min-width="(item.width || 100) + 'px'"
        :show-overflow-tooltip="!excludeTipList.includes(item.fielId)"
      >
        <template slot-scope="{ row }">
          <div class="conter-wrap">
            <div class="conter one-omit" v-if="item.type == 'areaId'">
              {{ `${row.province || ''}${row.city || ''}${row.district || ''}${row.street || ''}` || '--' }}
            </div>
            <div class="conter one-omit" v-else-if="item.type == 'select'">
              {{ getLabels(row, item) | codeToName(thisObj[item.optionsFielId] || [], item.valueKey, item.labelFile) }}
            </div>
            <div class="conter one-omit" v-else-if="item.type == 'datetime'">
              {{ getLabels(row, item) | dateformat() }}
            </div>
            <div class="conter one-omit" v-else-if="item.type == 'businessDataFormList'" @click="clickCopy($event, row, item)">
              {{ getFormValue(row, item) }}
              <!-- {{ getLabels(row, item) | codeToName(getMap(item.optionsFielId), item.valueKey, item.labelFile) }} -->
            </div>
            <div v-else>
              <div class="conter one-omit" :class="{ islink: item.events }" @click="clickItem(row, item.events)">
                <span>{{ getLabels(row, item) || '--' }}</span>
                <span v-if="item.unit">&nbsp;{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </template>
    <slot></slot>
  </el-table>
</template>

<script>
import headerFromTableMixin from '@/pages/tablePass/mixin/headerFromTableMixin.js';
export default {
  data() {
    return {
      multipleSelection: [],
    };
  },
  mixins: [headerFromTableMixin],
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    tableColumn: {
      type: Array,
      default: () => [],
    },
    dictData: {
      type: Array,
      default: () => [],
    },
    // 用到的 Api数据
    apiData: {
      type: Array,
      default: () => [],
    },
    selection: {
      type: Boolean,
      default: true,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
    align: {
      type: String,
      default: 'center',
    },
    // 指定页面特殊处理
    tags: {
      type: Array,
      default: () => [],
    },
    // 不需要tip提示的字段
    excludeTipList: {
      type: Array,
      default: () => [],
    },
    tableHeight: {
      type: Number,
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
    dataList() {
      return [...this.tableData];
    },
    thisObj() {
      return { ...this, ...this.otherObj };
    },
  },
  created() {
    if (this.determineCache()) {
      return;
    }
    this.initLoad();
  },
  activated() {
    if (!this.determineCache()) {
      return;
    }
    this.initLoad();
  },
  methods: {
    // 业务数据明细特殊处理
    getFormValue(row, itemData) {
      if (!row.businessDataFormList || !row.businessDataFormList.length) {
        return '--';
      }
      let form = row.businessDataFormList.filter(item => item.formId == itemData.formId && item.dataField == itemData.fielId);
      if (form.length) {
        return form[0]['businessBasicCode'];
      } else {
        return '--';
      }
    },
    clickCopy(e, row, itemData) {
      if (/.*(upload_).*/.test(itemData.fielId)) {
        if (navigator.clipboard.writeText) {
          navigator.clipboard.writeText(e.target.innerText); // 复制，写入剪切板
          console.log('clipboard');
        } else {
          window.getSelection().selectAllChildren(e.target);
          document.execCommand('copy');
          window.getSelection().removeAllRanges(); //清除选择的内容
          console.log('execCommand');
        }
        this.$message.success({ showClose: true, message: '复制成功', duration: 1500 });
      }
    },

    // 判断是否是菜单页面，菜单页面会被缓存
    determineCache() {
      const { path, meta = {} } = this.$route;
      if (path == meta.key) {
        return true;
      }
      return false;
    },

    // 初始化加载
    initLoad() {
      // 数据初始化
      this.multipleSelection = [];
      this.initDict();
      this.initApiData();
    },

    // 重新布局
    doLayout() {
      this.$refs.multipleTable.doLayout();
    },
    // 清除选择
    cleanSelect() {
      this.$refs.multipleTable.clearSelection();
    },
    // 事件
    clickItem(row, events) {
      if (events) {
        this.$emit(events, row);
      }
    },
    // 多层级数据处理
    getLabels(row, item) {
      if (item.valuePath) {
        let path = item.valuePath;
        if (path.length == 2) {
          return row[path[0]][path[1]];
        } else if (path.length == 3) {
          return row[path[0]][path[1]][path[2]];
        }
      } else {
        return row[item.fielId];
      }
    },

    getMap(str) {
      return [str];
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 单选
    handleCurrentChange(val) {
      if (!this.selection) {
        this.multipleSelection = [val];
      }
      this.$emit('current-change', val);
    },
    async initDict() {
      // 获取用到的字典数据
      this.useDictList(this.dictData);
    },
  },
};
</script>

<style lang="scss" scoped>
.islink {
  cursor: pointer;
  color: #409eff;
}
.table-list-cpn {
  :deep(.el-table__cell) {
    padding: 13px 0 !important;
  }

  :deep(.el-table__header-wrapper th.el-table__cell) {
    // background-color: $aside-bg-active;
    // color: #fff;
  }
}
</style>
