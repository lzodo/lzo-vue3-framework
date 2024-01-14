<template>
  <div class="echarts">
    <div class="module">
      <v-tree
        ref="treeRef"
        v-loading="loading"
        :check-datas="checkData"
        :tree-data="treeData"
        :default-props="props"
        :show-checkbox="true"
        :check-strictly="false"
      />
      <el-button @click="getCheckNodes">获取选择的节点</el-button>
      <el-button @click="getCheckKeys">获取选择的id</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue';
import { handleTree } from '@/utils/tools';

let { proxy } = getCurrentInstance();
let treeRef = ref();
let loading = ref(true);
let checkData = ref([]);
let treeData = ref([]);
let props = ref({
  children: 'children',
  label: 'name',
});

function getCheckNodes() {
  // 获取选中节点并转换原始对象
  console.log(treeRef.value.getAllCheckNodes().map(item => toRaw(item)));
}
function getCheckKeys() {
  proxy.$modal.msgSuccess({
    message: treeRef.value.getCheckedKeys(),
    type: 'success',
  });
}

setTimeout(() => {
  loading.value = false;
  // 数据
  treeData.value = handleTree(
    [
      {
        name: '系统管理',
        id: 1,
        pid: 0,
      },
      {
        name: '菜单管理',
        id: 11,
        pid: 1,
      },
      {
        name: '用户管理',
        id: 12,
        pid: 1,
        // disabled: true, // 禁用节点
      },
      {
        name: '角色管理',
        id: 13,
        pid: 1,
      },
      {
        name: '角色新增',
        id: 23,
        pid: 13,
      },
    ],
    'id',
    'pid'
  );
  // 选中数据
  checkData.value = [
    {
      name: '系统管理',
      id: 1,
      pid: 0,
    },
    {
      name: '角色管理',
      id: 13,
      pid: 1,
    },
    {
      name: '角色新增',
      id: 23,
      pid: 13,
    },
  ];
}, 1000);

setTimeout(() => {
  checkData.value = [
    {
      name: '菜单管理',
      id: 11,
      pid: 1,
    },
  ];
}, 5000);
</script>

<style lang="scss" scoped>
.module {
  width: 40vw;
  height: 40vh;
}
</style>
