<template>
  <el-container direction="vertical" class="app-container">
    <el-header height="auto" v-show="showSearch">
      <pro-search-header :data="headerColumn" :dictData="['sys_normal_disable']" @search="handleQuery" @reset="reset"></pro-search-header>
    </el-header>
    <el-main class="table-main">
      <div class="table-top-handle">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:dict:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate" v-hasPermi="['system:dict:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:dict:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:dict:export']">导出</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Refresh" @click="handleRefreshCache" v-hasPermi="['system:dict:remove']">刷新缓存</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </div>
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
        <el-table-column :key="Math.random()" label="操作" fixed="right" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:dict:edit']">修改</el-button>
            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:dict:remove']">删除</el-button>
          </template>
        </el-table-column>
      </pro-table-list>
    </el-main>
    <el-footer>
      <pro-pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      ></pro-pagination>
    </el-footer>
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="dictRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="form.dictType" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup name="Dict">
import { headerColumnList, tableColumnList } from './data';
const headerColumn = computed(() => [...headerColumnList]);
const tableColumn = computed(() => [...tableColumnList]);

import useDictStore from '@/pages/firstDemo/store/dict';
import { listType, getType, delType, addType, updateType, refreshCache } from '@/pages/firstDemo/api/system/dict/type';

/**
 * const { ctx }  = getCurrentInstance();  //  方式一，这种方式只能在开发环境下使用，生产环境下//的ctx将访问不到
 * const { proxy }  = getCurrentInstance();  //  方式二，此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）
 */
const { proxy } = getCurrentInstance();
console.log('proxy:', proxy);

const { sys_normal_disable } = proxy.useDict('sys_normal_disable');
console.log(sys_normal_disable, 465789);

const typeList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref('');
const dateRange = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    dictName: undefined,
    dictType: undefined,
    status: undefined,
  },
  rules: {
    dictName: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
    dictType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询字典类型列表 */
function getList() {
  loading.value = true;
  listType(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
    typeList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

function updatePage(val) {}

function updateLimit(val) {}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 头部搜索 */
function search() {}
/** 表单重置 */
function reset() {
  form.value = {
    dictId: undefined,
    dictName: undefined,
    dictType: undefined,
    status: '0',
    remark: undefined,
  };
  proxy.resetForm('dictRef');
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm('queryRef');
  handleQuery();
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = '添加字典类型';
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
function handleUpdate(row) {
  reset();
  const dictId = row.dictId || ids.value;
  getType(dictId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = '修改字典类型';
  });
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs['dictRef'].validate(valid => {
    if (valid) {
      if (form.value.dictId != undefined) {
        updateType(form.value).then(response => {
          proxy.$modal.msgSuccess('修改成功');
          open.value = false;
          getList();
        });
      } else {
        addType(form.value).then(response => {
          proxy.$modal.msgSuccess('新增成功');
          open.value = false;
          getList();
        });
      }
    }
  });
}
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

getList();
</script>
