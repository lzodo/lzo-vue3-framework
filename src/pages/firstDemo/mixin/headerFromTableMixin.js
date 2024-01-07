import * as enmuObj from "@/pages/firstDemo/utils/enmu.js";
// import { getOrgList, getOrgTree } from "@/pages/tablePass/api/system/user.js";
export default {
  data() {
    return {
      // Api数据 选择列表
      // dept_typeMap: [],
      // dept_tree_typeMap: [],

      // 枚举数据
      ...enmuObj,
    };
  },
  methods: {
    // ===================== 获取Api下拉数据=======================
    initApiData() {
      // 部门列表
      // if (this.apiData.includes("dept_type")) {
      //   this.getDeptTypeList();
      // }
      // // 部门列表树
      // if (this.apiData.includes("dept_tree_type")) {
      //   this.getDeptTypeTree();
      // }
    },
    // async getDeptTypeList() {
    //   const res = await getOrgList({ pageNum: 1, pageSize: 1000 });
    //   if (res.code == 200) {
    //     this.dept_typeMap = res.data || [];
    //   }
    // },
    // async getDeptTypeTree() {
    //   const res = await getOrgTree({});
    //   if (res.code == 200) {
    //     this.dept_tree_typeMap = [res.data] || [];
    //   }
    // },
  },
  created() {
    // 页面私有选择设置
    if (this.privateEnmu.length == 1) {
      this.privateEnmu1 = this.privateEnmu[0];
    } else if (this.privateEnmu.length == 2) {
      this.privateEnmu1 = this.privateEnmu[0];
      this.privateEnmu2 = this.privateEnmu[1];
    }
  },
};
