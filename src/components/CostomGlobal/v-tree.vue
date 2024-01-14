<template>
  <!-- elementUI 树组件 -->
  <div class="tree-box">
    <el-input v-model.trim="filterText" class="filter-box" placeholder="输入关键字" clearable />
    <div class="flex-1">
      <el-tree
        ref="tree"
        v-bind="$attrs"
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        :node-key="nodeKey"
        :show-checkbox="showCheckbox"
        :default-expand-all="expandAll"
        :check-strictly="checkStrictly"
        :check-nodes="checkDatas"
        :default-checked-keys="checkKeys"
        :current-node-key="currentNodeKey"
        :filter-node-method="filterNode"
        :check-on-click-node="checkOnClickNode"
        :expand-on-click-node="expandOnClickNode"
        :highlight-current="true"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"
        @check="handleCheck"
      />
    </div>
  </div>
</template>

<script>
export default defineComponent({
  expose: ['getAllCheckNodes', 'getCheckedKeys'],
  components: {},
  props: {
    // 点击节点是否展开下一级
    expandOnClickNode: [Boolean],
    // 是否在点击节点的时候选中节点
    checkOnClickNode: {
      type: Boolean,
      default: false,
    },
    // 树数据
    treeData: {
      type: Array,
      default: () => [],
      required: true,
    },
    // 选中节点
    checkDatas: {
      type: Array,
      default: () => [],
    },
    // 字段
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'child',
          label: 'name',
        };
      },
    },
    // 是否展示复选框
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    // nodekey
    nodeKey: {
      type: String,
      default: 'id',
    },
    // 父子节点是否不关联
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    expandAll: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      filterText: '',
      currentNodeKey: '',
      checkKeys: [],
    };
  },

  computed: {
    // 默认选中节点
    // checkKeys() {
    //   const ids = this.checkDatas.map(item => {
    //     return item[this.nodeKey] || item;
    //   });
    //   return ids;
    // },
  },
  watch: {
    treeData() {
      this.filterText = '';
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },

    // 设置节点选中
    checkDatas: {
      handler(newVal) {
        const ids = newVal.map(item => {
          return item[this.nodeKey];
        });
        if (this.showCheckbox) {
          this.checkKeys = ids;
          this.resetChecked();
          this.setCheckedKeys(ids);
        } else {
          this.currentNodeKey = ids.length > 0 ? ids[0] : '';
          this.setCurrentKey(this.currentNodeKey);
        }
      },
      immediate: true,
    },
  },

  created() {},

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },

    // 树节点点击事件
    handleNodeClick(data, node, elem) {
      console.log('点击节点:', data, node, elem);

      this.$emit('node-click', data, node, elem);
    },
    // 复选框-获取所有选中节点
    getAllCheckNodes() {
      if (this.$refs.tree) {
        const arr = this.$refs.tree.getCheckedNodes();
        return arr;
      } else {
        return [];
      }
    },
    // 单选-设置选中节点
    setCurrentKey(key) {
      this.$nextTick(() => {
        if (this.$refs.tree) {
          this.$refs.tree.setCurrentKey(key);
        }
      });
    },
    // 复选框-设置选中节点
    setCheckedKeys(keys) {
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(keys);
      }
    },

    // 复选框-设置单个节点是否选中
    setSignChecked(data, checked, deep) {
      if (!data) {
        return;
      }
      if (this.$refs.tree) {
        this.$refs.tree.setChecked(data, checked, deep);
      }
    },
    // 重置选中节点
    resetChecked() {
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    // 复选框选中事件
    handleCheckChange(data, checked, indeterminate) {
      // const allNodes = this.getAllCheckNodes();
      // this.$emit('nodecheck-change', allNodes, data, checked);
    },
    handleCheck(data, node) {
      this.$emit('handle-check', data, node);
    },
    // 获取选中的key
    getCheckedKeys() {
      // this.$refs.tree.getHalfCheckedKeys(), // 回目前半选中的节点的 key 所组成的数组
      return this.$refs.tree.getCheckedKeys();
    },
  },
});
</script>
<style lang="scss" scoped>
.tree-box {
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.flex-1 {
  flex: 1;
  overflow: auto;
}
</style>
