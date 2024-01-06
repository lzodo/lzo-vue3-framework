<template>
  <el-form class="filter-form" @submit.native.prevent ref="searchForm" :inline="true" :model="searchForm" label-position="right">
    <!-- :label-width="labelWidth + 'px'" -->
    <div class="header-warp" style="display: inline-block" :class="{ 'filter-put': isPackUp, fixedCount4: columnCount == 4 }" ref="inputWarp">
      <template v-for="(item, k) in data || []">
        <el-form-item :key="`${item.label}-${k}`" :label="item.label" :prop="item.fielId" :label-width="item.width || '80px'">
          <template v-if="item.type == 'cascader'">
            <el-cascader
              class="filter-cascader"
              :props="item.cascaderProps"
              :options="getMap(item.optionsFielId)"
              :show-all-levels="false"
              clearable
              filterable
              @change="data => cascaderChange(data, item)"
            ></el-cascader>
          </template>
          <div v-else>
            <g-form-item
              :isOnlyView="false"
              :itemData="item"
              :formObj="searchForm"
              :thisObj="thisObj"
              @clearSelect="clearSelect"
              @searchFormEnter="search"
            ></g-form-item>
          </div>
        </el-form-item>
      </template>
    </div>
    <el-form-item class="fr filter-btns">
      <pro-button type="search" @click="search">搜索</pro-button>
      <pro-button type="reset" @click="reset">重置</pro-button>
      <el-button @click="isPackUp = !isPackUp" v-if="!hideScale">
        {{ isPackUp ? '展开' : '收起' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import headerFromTableMixin from '@/pages/tablePass/mixin/headerFromTableMixin.js';
export default {
  data() {
    return {
      isPackUp: true,
      heightLevel: false,
      searchForm: {},
      hideScale: true,
    };
  },
  mixins: [headerFromTableMixin],
  props: {
    fromData: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Array,
      default: () => [],
    },
    apiData: {
      type: Array,
      default: () => [],
    },
    dictData: {
      type: Array,
      default: () => [],
    },
    labelWidth: {
      type: Number,
      default: 100,
    },
    // hideColumn: {
    //   type: Array,
    //   default: () => [],
    // },
    page: {
      type: String,
    },
    // 页面私有枚举
    privateEnmu: {
      type: Array,
      default: () => [],
    },

    // 其他字典数据对象
    otherObj: {
      type: Object,
      default: () => {},
    },
    columnCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    thisObj() {
      return { ...this, ...(this.otherObj || {}) };
    },
  },
  created() {
    // 数据初始化
    this.initDict();
    this.initApiData();

    // 进入页面进行搜索
    this.searchForm = { ...this.fromData };
    if (this.determineCache()) {
      return;
    }
    this.$emit('search', this.searchForm); // 没接口先不搜索
  },
  activated() {
    if (!this.determineCache()) {
      return;
    }
    this.$emit('search', this.searchForm); // 没接口先不搜索
  },
  mounted() {
    // 判断高度
    if (this.$refs['inputWarp'].offsetHeight > 60) {
      this.hideScale = false;
    }
  },
  methods: {
    cascaderChange(data, item) {
      console.log(data, this.searchForm);
      this.$set(this.searchForm, item.fielId, data[data.length - 1]);
    },
    getMap(str) {
      return this[str];
    },
    clearSelect(fielId) {
      delete this.searchForm[fielId];
      this.$emit('search', this.searchForm);
    },
    search() {
      this.$emit('search', this.searchForm);
    },
    reset() {
      // this.$refs.searchForm.resetFields();
      this.searchForm = {};
      // this.$refs.lazyscity && this.$refs.lazyscity[0].cleanInfos();
      this.$emit('reset', this.searchForm);
    },

    async initDict() {
      // 获取用到的字典数据
      this.useDictList(this.dictData);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-put {
  max-height: 104px;
  overflow: hidden;
}

.filter-all {
  max-height: 52px;
  overflow: hidden;
}
.filter-form {
  padding-top: 15px;
  ::v-deep .el-form-item:not(.filter-btns) {
    .el-form-item__content {
      min-width: 217px;
      .el-date-editor--daterange.el-input__inner {
        width: 100%;
      }
    }
    .filter-cascader {
      display: block;
      line-height: inherit;
    }
  }
}
.header-warp {
  &.fixedCount4 {
    width: 100%;
    display: flex !important;
    flex-wrap: wrap;
    justify-content: flex-start;
    .el-form-item {
      display: flex;
      width: 23%;
      ::v-deep {
        .el-form-item__label {
        }
        .el-form-item__content {
          flex: 1;
          width: unset;
          min-width: unset;
        }
      }
    }
  }
}
</style>
