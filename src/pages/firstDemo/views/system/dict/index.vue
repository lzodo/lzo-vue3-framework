<template>
  <el-container direction="vertical" class="app-container">
    <!-- 搜索 -->
    <el-header height="auto" v-show="showSearch">
      <pro-search-header :data="headerColumn" :dictData="['sys_normal_disable']" @search="search" @reset="reset"></pro-search-header>
    </el-header>
    <el-main class="table-main">
      <div class="table-top-handle">
        <div class="btns">
          <el-button type="primary" plain icon="Plus" @click="formHandler" v-hasPermi="['system:dict:add']">新增</el-button>
          <el-button type="success" plain icon="Edit" :disabled="single" @click="formHandler" v-hasPermi="['system:dict:edit']">修改</el-button>
          <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:dict:remove']">删除</el-button>
          <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:dict:export']">导出</el-button>
          <el-button type="danger" plain icon="Refresh" @click="handleRefreshCache" v-hasPermi="['system:dict:remove']">刷新缓存</el-button>
        </div>
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </div>
      <!-- 表格 -->
      <pro-table-list
        ref="tableList"
        :tableData="typeList"
        :tableColumn="tableColumn"
        :selection="true"
        :showIndex="false"
        :privateEnmu="[]"
        :dictData="['sys_normal_disable']"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="操作" fixed="right" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button link type="primary" icon="Edit" @click="formHandler(scope.row)" v-hasPermi="['system:dict:edit']">修改</el-button>
            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:dict:remove']">删除</el-button>
          </template>
        </el-table-column>
      </pro-table-list>
    </el-main>
    <!-- 分页 -->
    <el-footer>
      <pro-pagination v-show="total > 0" :total="total" v-model:page="pageNum" v-model:limit="pageSize" @pagination="getList"></pro-pagination>
    </el-footer>
    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" append-to-body v-model="dialogVisible" width="600px">
      <div class="dialog-main">
        <PageForm @close="cancel" :id="rowInfo.id" v-if="dialogVisible" :isOnlyView="dialogIsOnlyView"></PageForm>
      </div>
    </el-dialog>
  </el-container>
</template>

<script setup name="Dict">
import PageForm from './form.vue';
import { headerColumnList, tableColumnList } from './data';
import useDictStore from '@/pages/firstDemo/store/dict';
import { listType, delType, addType, updateType, refreshCache } from '@/pages/firstDemo/api/system/dict/type';

const headerColumn = computed(() => [...headerColumnList]);
const tableColumn = computed(() => [...tableColumnList]);

/**
 * const { ctx }  = getCurrentInstance();  //  方式一，这种方式只能在开发环境下使用，生产环境下//的ctx将访问不到
 * const { proxy }  = getCurrentInstance();  //  方式二，此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）
 */
const { proxy } = getCurrentInstance();
// const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const loading = ref(true);
const typeList = ref([]);
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const dialogVisible = ref(false);
const dialogTitle = ref('');
const rowInfo = ref({});
const dialogIsOnlyView = ref(false);

const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const dateRange = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    dictName: undefined,
    dictType: undefined,
    status: undefined,
  },
});

const { queryParams, form } = toRefs(data);

/** 查询字典类型列表 */
function getList() {
  loading.value = true;

  listType(proxy.addDateRange({ ...queryParams.value, pageNum: pageNum.value, pageSize: pageSize.value }, dateRange.value)).then(response => {
    typeList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

/** 取消按钮 */
function cancel() {
  dialogVisible.value = false;
  reset();
}
/** 头部搜索 */
function search(data = {}) {
  // this.pageIndex = 1;
  // this.searchForm = { ...data };
  // this.loadData();

  queryParams.value = { ...data };
  pageNum.value = 1;
  pageSize.value = 10;

  getList();
}

/** 表单重置 */
function reset(data = {}) {
  // this.searchForm = { ...data };
  // this.pageIndex = 1;
  // this.loadData();

  form.value = { ...data };
  queryParams.value = { ...data };
  pageNum.value = 1;
  // proxy.resetForm('dictRef');
  getList();
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.dictId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 单选 */
function handleCurrentChange(select) {
  console.log(select);
}
/** 修改按钮操作 */
function formHandler(row = {}, isOnlyView) {
  // 弹窗
  if (row.dictId) {
    row.id = row.dictId;
    dialogTitle.value = '编辑记录';
    rowInfo.value = row;
  } else {
    dialogTitle.value = '新增记录';
    rowInfo.value = {};
  }

  if (isOnlyView) {
    this.dialogTitle = '查看';
  }

  dialogIsOnlyView.value = isOnlyView;
  dialogVisible.value = true;

  // 子页面
  // this.$router.push({
  //   path: '/xxx',
  //   query: {
  //     id: row.id || '',
  //     isOnlyView,
  //   },
  // });
}
/** 提交按钮 */
// function submitForm() {
//   proxy.$refs['dictRef'].validate(valid => {
//     if (valid) {
//       if (form.value.dictId != undefined) {
//         updateType(form.value).then(response => {
//           proxy.$modal.msgSuccess('修改成功');
//           open.value = false;
//           getList();
//         });
//       } else {
//         addType(form.value).then(response => {
//           proxy.$modal.msgSuccess('新增成功');
//           open.value = false;
//           getList();
//         });
//       }
//     }
//   });
// }
/** 删除按钮操作 */
function handleDelete(row) {
  const dictIds = row.dictId || ids.value;
  proxy.$modal
    .confirm('是否确认删除字典编号为"' + dictIds + '"的数据项？')
    .then(function () {
      return delType(dictIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess('删除成功');
    })
    .catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    'system/dict/type/export',
    {
      ...queryParams.value,
    },
    `dict_${new Date().getTime()}.xlsx`
  );
}
/** 刷新缓存按钮操作 */
function handleRefreshCache() {
  refreshCache().then(() => {
    proxy.$modal.msgSuccess('刷新成功');
    useDictStore().cleanDict();
  });
}
</script>

<style></style>
