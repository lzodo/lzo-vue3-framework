<template>
  <div class="form-page" :class="{ 'child-page': false }">
    <pro-from
      :disabledForm="isOnlyViewInner"
      ref="profrom"
      :ruleFormData="ruleForm"
      :data="formColumn"
      :dataId="dataId"
      :dictData="['sys_normal_disable']"
      :labelWidth="140"
      :blockList="[]"
      :privateEnmu="[]"
    >
      <div class="dialog-footer-center">
        <pro-button @click="closeBack">取消</pro-button>
        <pro-button type="submit" @click="submitHandler" v-if="!isOnlyViewInner">确认</pro-button>
      </div>
    </pro-from>
  </div>
</template>

<script>
import { getType, addType, updateType } from '@/pages/firstDemo/api/system/dict/type';
import { formColumnList } from './data.js';
export default {
  data() {
    return {
      ruleForm: {},
      dataId: '',
    };
  },
  props: {
    id: {
      type: [Number, String],
      default: '',
    },
    isOnlyView: {
      type: Boolean,
      default: false,
    },
    isBackPage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formColumn() {
      return [...formColumnList];
    },
  },
  created() {
    // 如果prods 没有再去query找找
    this.dataId = this.id;
    this.isOnlyViewInner = this.isOnlyView;
    if (!this.dataId) {
      this.dataId = this.$route.query.id;
      this.isOnlyViewInner = Boolean(this.$route.query.isOnlyView);
    }

    if (this.dataId) {
      this.getDataDetail();
    }
  },
  methods: {
    async getDataDetail() {
      let res = await getType(this.dataId);
      if (res.code == 200) {
        let data = res.data;
        this.ruleForm = Object.assign({}, data);
        this.detailInit(data);
      }
    },
    // 详情初始化操作
    detailInit(data) {},
    // 提交
    async submitHandler() {
      let data = this.$refs['profrom'].submit();
      if (data) {
        if (this.dataId) {
          this.editHeadler(data);
        } else {
          this.addHeadler(data);
        }
      }
    },
    // 编辑操作
    async editHeadler(data) {
      let res = await updateType(data);
      if (res.code == 200) {
        this.$message({
          message: '修改成功',
          type: 'success',
        });
        this.closeBack();
      }
    },
    // 添加操作
    async addHeadler(data) {
      let res = await addType(data);
      if (res.code == 200) {
        this.$message({
          message: '添加成功',
          type: 'success',
        });
        this.closeBack();
      }
    },
    // 退出
    closeBack() {
      // if (!this.isBackPage || this.$route.path == this.$route.meta.key) {
      this.$emit('close');
      // } else {
      //   this.$router.back();
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.child-page {
  // width: 1000px;
  margin: 0 auto;
}
</style>
