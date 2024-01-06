<template>
  <div class="itme-btn" :class="{ left: posit == 'left', center: posit == 'center', right: posit == 'right', none: posit == 'none' }">
    <template v-if="type == 'add'">
      <el-button :loading="isLoading" type="primary" plain @click="click"><slot></slot></el-button>
    </template>
    <template v-else-if="type == 'delete'">
      <el-button :loading="isLoading" type="primary" @click="click"><slot></slot></el-button>
    </template>
    <template v-else-if="type == 'update'">
      <el-button :loading="isLoading" type="primary" @click="click"><slot></slot></el-button>
    </template>
    <template v-else-if="type == 'search'">
      <el-button :loading="isLoading" type="primary" @click="click"><slot></slot></el-button>
    </template>
    <template v-else-if="type == 'submit'">
      <el-button :loading="isLoading" type="primary" @click="click"><slot></slot></el-button>
    </template>
    <template v-else-if="type == 'reset'">
      <el-button :loading="isLoading" @click="click"><slot></slot></el-button>
    </template>
    <template v-else-if="type == 'export'">
      <el-button :loading="isLoading" type="primary" @click="click"><slot></slot></el-button>
    </template>
    <template v-else-if="type == 'import'">
      <el-button :loading="isLoading" type="primary" @click="click"><slot></slot></el-button>
    </template>
    <template v-else-if="type == 'downloadTmp'">
      <el-button :loading="isLoading" type="primary" @click="click"><slot></slot></el-button>
    </template>
    <template v-else-if="type == 'deleteBatch'">
      <el-button :loading="isLoading" type="primary" @click="click"><slot></slot></el-button>
    </template>
    <template v-else-if="type == 'text'">
      <el-button :loading="isLoading" type="text" @click="click"><slot></slot></el-button>
    </template>
    <template v-else>
      <el-button :loading="isLoading" @click="click"><slot></slot></el-button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'base',
    },
    icon: {
      type: String,
      default: '',
    },
    posit: {
      type: String,
      default: 'center',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    confirm: {
      type: String,
      default: '',
    },
  },
  computed: {},
  methods: {
    click(evt) {
      if (this.confirm) {
        this.$confirm(this.confirm, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            this.$emit('click', evt);
          })
          .catch(() => {});
      } else {
        this.$emit('click', evt);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.itme-btn {
  display: inline-block;
  // flex: 1;
  &.left {
    padding-right: 10px;
  }
  &.center {
    padding: 0 5px;
  }
  &.right {
    padding-left: 10px;
  }
  &.none {
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
