import{h as p}from"./headerFromTableMixin-pD1Ro-xP.js";import{_,r as g,o as l,l as d,w as y,E as m,k as w,B as u,c as o,A as C,d as h,t as s,n as k,F as v,m as D}from"./main-QT9KUytk.js";import"./index-gHNT2BBc.js";const L={data(){return{multipleSelection:[],gDictMap:{}}},mixins:[p],props:{tableData:{type:Array,default:()=>[]},tableColumn:{type:Array,default:()=>[]},dictData:{type:Array,default:()=>[]},apiData:{type:Array,default:()=>[]},selection:{type:Boolean,default:!0},showIndex:{type:Boolean,default:!1},border:{type:Boolean,default:!0},align:{type:String,default:"center"},tags:{type:Array,default:()=>[]},excludeTipList:{type:Array,default:()=>[]},tableHeight:{type:Number},privateEnmu:{type:Array,default:()=>[]},otherObj:{type:Object,default:()=>{}}},computed:{dataList(){return[...this.tableData]},thisObj(){return this}},created(){console.log(this.tableData,112233),this.initLoad()},activated(){this.initLoad()},methods:{initLoad(){this.multipleSelection=[],this.initDict(),this.initApiData()},doLayout(){this.$refs.multipleTable.doLayout()},cleanSelect(){this.$refs.multipleTable.clearSelection()},clickItem(e,n){n&&this.$emit(n,e)},getLabels(e,n){if(n.valuePath){let t=n.valuePath;if(t.length==2)return e[t[0]][t[1]];if(t.length==3)return e[t[0]][t[1]][t[2]]}else return e[n.fielId]},getMap(e){return[e]},handleSelectionChange(e){this.multipleSelection=e},handleCurrentChange(e){this.selection||(this.multipleSelection=[e]),this.$emit("current-change",e)},async initDict(){}},setup(e,n){const{proxy:t}=w();return{...e.dictData.length?t.useDict([...e.dictData]):{}}}},S={class:"conter-wrap"},I={key:0,class:"conter one-omit"},x={key:1,class:"conter one-omit"},A={key:2,class:"conter one-omit"},B={key:3},T=["onClick"],F={key:0};function H(e,n,t,f,M,i){const c=g("el-table-column"),b=g("el-table");return l(),d(b,m({class:"table-list-cpn",ref:"multipleTable","row-key":"id",stripe:"",border:t.border,data:i.dataList},e.$attrs,{"highlight-current-row":!t.selection,onSelectionChange:i.handleSelectionChange,onCurrentChange:i.handleCurrentChange,minHeight:t.tableHeight?t.tableHeight+"px":"auto"}),{default:y(()=>[t.selection?(l(),d(c,{key:0,type:"selection","reserve-selection":!0,width:"55"})):u("",!0),t.showIndex?(l(),d(c,{key:1,type:"index",width:"50",label:"序号"})):u("",!0),(l(!0),o(v,null,C(t.tableColumn||[],a=>(l(),d(c,{key:a.fielId,align:t.align,label:a.label,prop:a.fielId,"min-width":(a.width||100)+"px","show-overflow-tooltip":!t.excludeTipList.includes(a.fielId)},{default:y(r=>[h("div",S,[a.type=="areaId"?(l(),o("div",I,s(`${r.row.province||""}${r.row.city||""}${r.row.district||""}${r.row.street||""}`||"--"),1)):a.type=="select"?(l(),o("div",x,s(e.$gtools.codeToName(i.getLabels(r.row,a),i.thisObj[a.optionsFielId]||[],a.valueKey,a.labelFile)),1)):a.type=="datetime"?(l(),o("div",A,s(e.$gtools.dateformat(i.getLabels(r.row,a))),1)):(l(),o("div",B,[h("div",{class:k(["conter one-omit",{islink:a.events}]),onClick:j=>i.clickItem(r.row,a.events)},[h("span",null,s(i.getLabels(r.row,a)||"--"),1),a.unit?(l(),o("span",F," "+s(a.unit),1)):u("",!0)],10,T)]))])]),_:2},1032,["align","label","prop","min-width","show-overflow-tooltip"]))),128)),D(e.$slots,"default",{},void 0,!0)]),_:3},16,["border","data","highlight-current-row","onSelectionChange","onCurrentChange","minHeight"])}const E=_(L,[["render",H],["__scopeId","data-v-0459adbd"]]);export{E as default};
