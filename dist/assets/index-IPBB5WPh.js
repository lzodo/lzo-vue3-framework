import{b as U,j as n,R as le,Y as ie,r as l,U as se,o as s,l as c,w as o,e as a,f as d,W as B,V as r,h as p,d as S,C,B as ce,S as de,a1 as re,k as ue}from"./main-QT9KUytk.js";import me from"./form-CwoXl_sb.js";import{headerColumnList as pe,tableColumnList as _e}from"./data-qutiksuu.js";import{l as fe,d as he,r as ve}from"./type-Ci_wKV26.js";import"./index-gHNT2BBc.js";const ge={class:"table-top-handle"},ye={class:"btns"},be={class:"dialog-main"},Ce=de({name:"Dict"}),Ie=Object.assign(Ce,{setup(we){const E=U(()=>[...pe]),O=U(()=>[..._e]),{proxy:h}=ue(),V=n(!0),I=n([]),w=n(0),_=n(1),v=n(10),f=n(!1),k=n(""),D=n({}),R=n(!1),y=n(!0),T=n([]),N=n(!0),P=n(!0),j=n([]),q=le({form:{},queryParams:{dictName:void 0,dictType:void 0,status:void 0}}),{queryParams:b,form:z}=ie(q);function g(){V.value=!0,fe(h.addDateRange({...b.value,pageNum:_.value,pageSize:v.value},j.value)).then(e=>{I.value=e.rows,w.value=e.total,V.value=!1})}function F(){f.value=!1,$()}function H(e={}){b.value={...e},_.value=1,v.value=10,g()}function $(e={}){z.value={...e},b.value={...e},_.value=1,g()}function Q(e){T.value=e.map(t=>t.dictId),N.value=e.length!=1,P.value=!e.length}function W(e){console.log(e)}function x(e={},t){e.dictId?(e.id=e.dictId,k.value="编辑记录",D.value=e):(k.value="新增记录",D.value={}),t&&(this.dialogTitle="查看"),R.value=t,f.value=!0}function L(e){const t=e.dictId||T.value;h.$modal.confirm('是否确认删除字典编号为"'+t+'"的数据项？').then(function(){return he(t)}).then(()=>{g(),h.$modal.msgSuccess("删除成功")}).catch(()=>{})}function Y(){h.download("system/dict/type/export",{...b.value},`dict_${new Date().getTime()}.xlsx`)}function A(){ve().then(()=>{h.$modal.msgSuccess("刷新成功"),re().cleanDict()})}return(e,t)=>{const G=l("pro-search-header"),J=l("el-header"),u=l("el-button"),K=l("right-toolbar"),M=l("el-table-column"),X=l("pro-table-list"),Z=l("el-main"),ee=l("pro-pagination"),te=l("el-footer"),ae=l("el-dialog"),ne=l("el-container"),m=se("hasPermi");return s(),c(ne,{direction:"vertical",class:"app-container"},{default:o(()=>[r(d(J,{height:"auto"},{default:o(()=>[d(G,{data:a(E),dictData:["sys_normal_disable"],onSearch:H,onReset:$},null,8,["data"])]),_:1},512),[[B,a(y)]]),d(Z,{class:"table-main"},{default:o(()=>[S("div",ge,[S("div",ye,[r((s(),c(u,{type:"primary",plain:"",icon:"Plus",onClick:x},{default:o(()=>[p("新增")]),_:1})),[[m,["system:dict:add"]]]),r((s(),c(u,{type:"success",plain:"",icon:"Edit",disabled:a(N),onClick:x},{default:o(()=>[p("修改")]),_:1},8,["disabled"])),[[m,["system:dict:edit"]]]),r((s(),c(u,{type:"danger",plain:"",icon:"Delete",disabled:a(P),onClick:L},{default:o(()=>[p("删除")]),_:1},8,["disabled"])),[[m,["system:dict:remove"]]]),r((s(),c(u,{type:"warning",plain:"",icon:"Download",onClick:Y},{default:o(()=>[p("导出")]),_:1})),[[m,["system:dict:export"]]]),r((s(),c(u,{type:"danger",plain:"",icon:"Refresh",onClick:A},{default:o(()=>[p("刷新缓存")]),_:1})),[[m,["system:dict:remove"]]])]),d(K,{showSearch:a(y),"onUpdate:showSearch":t[0]||(t[0]=i=>C(y)?y.value=i:null),onQueryTable:g},null,8,["showSearch"])]),d(X,{ref:"tableList",tableData:a(I),tableColumn:a(O),selection:!0,showIndex:!1,privateEnmu:[],dictData:["sys_normal_disable"],onCurrentChange:W,onSelectionChange:Q},{default:o(()=>[d(M,{label:"操作",fixed:"right",align:"center",width:"150","class-name":"small-padding fixed-width"},{default:o(i=>[r((s(),c(u,{link:"",type:"primary",icon:"Edit",onClick:oe=>x(i.row)},{default:o(()=>[p("修改")]),_:2},1032,["onClick"])),[[m,["system:dict:edit"]]]),r((s(),c(u,{link:"",type:"primary",icon:"Delete",onClick:oe=>L(i.row)},{default:o(()=>[p("删除")]),_:2},1032,["onClick"])),[[m,["system:dict:remove"]]])]),_:1})]),_:1},8,["tableData","tableColumn"])]),_:1}),d(te,null,{default:o(()=>[r(d(ee,{total:a(w),page:a(_),"onUpdate:page":t[1]||(t[1]=i=>C(_)?_.value=i:null),limit:a(v),"onUpdate:limit":t[2]||(t[2]=i=>C(v)?v.value=i:null),onPagination:g},null,8,["total","page","limit"]),[[B,a(w)>0]])]),_:1}),d(ae,{title:a(k),"append-to-body":"",modelValue:a(f),"onUpdate:modelValue":t[3]||(t[3]=i=>C(f)?f.value=i:null),width:"600px"},{default:o(()=>[S("div",be,[a(f)?(s(),c(me,{key:0,onClose:F,id:a(D).id,isOnlyView:a(R)},null,8,["id","isOnlyView"])):ce("",!0)])]),_:1},8,["title","modelValue"])]),_:1})}}});export{Ie as default};
