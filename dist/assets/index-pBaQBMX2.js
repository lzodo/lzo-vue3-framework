import{X as C,j as g,R as ye,Y as ve,r as a,U as L,o as d,c as $,V as _,W as Q,e as n,f as e,w as o,J as j,F as A,l as y,A as M,C as q,h as s,t as J,d as O,S as he,k as be}from"./main-QT9KUytk.js";import"./index-gHNT2BBc.js";function Ve(p){return C({url:"/system/config/list",method:"get",params:p})}function we(p){return C({url:"/system/config/"+p,method:"get"})}function Ce(p){return C({url:"/system/config",method:"post",data:p})}function ke(p){return C({url:"/system/config",method:"put",data:p})}function xe(p){return C({url:"/system/config/"+p,method:"delete"})}function Ne(){return C({url:"/system/config/refreshCache",method:"delete"})}const Se={class:"app-container"},Te={class:"dialog-footer"},Ke=he({name:"Config"}),De=Object.assign(Ke,{setup(p){const{proxy:c}=be(),{sys_yes_no:T}=c.useDict("sys_yes_no"),P=g([]),h=g(!1),K=g(!0),N=g(!0),U=g([]),Y=g(!0),F=g(!0),R=g(0),D=g(""),k=g([]),W=ye({form:{},queryParams:{pageNum:1,pageSize:10,configName:void 0,configKey:void 0,configType:void 0},rules:{configName:[{required:!0,message:"参数名称不能为空",trigger:"blur"}],configKey:[{required:!0,message:"参数键名不能为空",trigger:"blur"}],configValue:[{required:!0,message:"参数键值不能为空",trigger:"blur"}]}}),{queryParams:u,form:i,rules:X}=ve(W);function V(){K.value=!0,Ve(c.addDateRange(u.value,k.value)).then(r=>{P.value=r.rows,R.value=r.total,K.value=!1})}function G(){h.value=!1,I()}function I(){i.value={configId:void 0,configName:void 0,configKey:void 0,configValue:void 0,configType:"Y",remark:void 0},c.resetForm("configRef")}function S(){u.value.pageNum=1,V()}function H(){k.value=[],c.resetForm("queryRef"),S()}function Z(r){U.value=r.map(t=>t.configId),Y.value=r.length!=1,F.value=!r.length}function ee(){I(),h.value=!0,D.value="添加参数"}function B(r){I();const t=r.configId||U.value;we(t).then(b=>{i.value=b.data,h.value=!0,D.value="修改参数"})}function le(){c.$refs.configRef.validate(r=>{r&&(i.value.configId!=null?ke(i.value).then(t=>{c.$modal.msgSuccess("修改成功"),h.value=!1,V()}):Ce(i.value).then(t=>{c.$modal.msgSuccess("新增成功"),h.value=!1,V()}))})}function E(r){const t=r.configId||U.value;c.$modal.confirm('是否确认删除参数编号为"'+t+'"的数据项？').then(function(){return xe(t)}).then(()=>{V(),c.$modal.msgSuccess("删除成功")}).catch(()=>{})}function oe(){c.download("system/config/export",{...u.value},`config_${new Date().getTime()}.xlsx`)}function ne(){Ne().then(()=>{c.$modal.msgSuccess("刷新缓存成功")})}return V(),(r,t)=>{const b=a("el-input"),m=a("el-form-item"),te=a("el-option"),ae=a("el-select"),ie=a("el-date-picker"),f=a("el-button"),z=a("el-form"),x=a("el-col"),ue=a("right-toolbar"),re=a("el-row"),v=a("el-table-column"),de=a("dict-tag"),se=a("el-table"),ce=a("pagination"),fe=a("el-radio"),pe=a("el-radio-group"),me=a("el-dialog"),w=L("hasPermi"),ge=L("loading");return d(),$("div",Se,[_(e(z,{model:n(u),ref:"queryRef",inline:!0,"label-width":"68px"},{default:o(()=>[e(m,{label:"参数名称",prop:"configName"},{default:o(()=>[e(b,{modelValue:n(u).configName,"onUpdate:modelValue":t[0]||(t[0]=l=>n(u).configName=l),placeholder:"请输入参数名称",clearable:"",style:{width:"240px"},onKeyup:j(S,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(m,{label:"参数键名",prop:"configKey"},{default:o(()=>[e(b,{modelValue:n(u).configKey,"onUpdate:modelValue":t[1]||(t[1]=l=>n(u).configKey=l),placeholder:"请输入参数键名",clearable:"",style:{width:"240px"},onKeyup:j(S,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(m,{label:"系统内置",prop:"configType"},{default:o(()=>[e(ae,{modelValue:n(u).configType,"onUpdate:modelValue":t[2]||(t[2]=l=>n(u).configType=l),placeholder:"系统内置",clearable:""},{default:o(()=>[(d(!0),$(A,null,M(n(T),l=>(d(),y(te,{key:l.value,label:l.label,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(m,{label:"创建时间",style:{width:"308px"}},{default:o(()=>[e(ie,{modelValue:n(k),"onUpdate:modelValue":t[3]||(t[3]=l=>q(k)?k.value=l:null),"value-format":"YYYY-MM-DD",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])]),_:1}),e(m,null,{default:o(()=>[e(f,{type:"primary",icon:"Search",onClick:S},{default:o(()=>[s("搜索")]),_:1}),e(f,{icon:"Refresh",onClick:H},{default:o(()=>[s("重置")]),_:1})]),_:1})]),_:1},8,["model"]),[[Q,n(N)]]),e(re,{gutter:10,class:"mb8"},{default:o(()=>[e(x,{span:1.5},{default:o(()=>[_((d(),y(f,{type:"primary",plain:"",icon:"Plus",onClick:ee},{default:o(()=>[s("新增")]),_:1})),[[w,["system:config:add"]]])]),_:1}),e(x,{span:1.5},{default:o(()=>[_((d(),y(f,{type:"success",plain:"",icon:"Edit",disabled:n(Y),onClick:B},{default:o(()=>[s("修改")]),_:1},8,["disabled"])),[[w,["system:config:edit"]]])]),_:1}),e(x,{span:1.5},{default:o(()=>[_((d(),y(f,{type:"danger",plain:"",icon:"Delete",disabled:n(F),onClick:E},{default:o(()=>[s("删除")]),_:1},8,["disabled"])),[[w,["system:config:remove"]]])]),_:1}),e(x,{span:1.5},{default:o(()=>[_((d(),y(f,{type:"warning",plain:"",icon:"Download",onClick:oe},{default:o(()=>[s("导出")]),_:1})),[[w,["system:config:export"]]])]),_:1}),e(x,{span:1.5},{default:o(()=>[_((d(),y(f,{type:"danger",plain:"",icon:"Refresh",onClick:ne},{default:o(()=>[s("刷新缓存")]),_:1})),[[w,["system:config:remove"]]])]),_:1}),e(ue,{showSearch:n(N),"onUpdate:showSearch":t[4]||(t[4]=l=>q(N)?N.value=l:null),onQueryTable:V},null,8,["showSearch"])]),_:1}),_((d(),y(se,{data:n(P),onSelectionChange:Z},{default:o(()=>[e(v,{type:"selection",width:"55",align:"center"}),e(v,{label:"参数主键",align:"center",prop:"configId"}),e(v,{label:"参数名称",align:"center",prop:"configName","show-overflow-tooltip":!0}),e(v,{label:"参数键名",align:"center",prop:"configKey","show-overflow-tooltip":!0}),e(v,{label:"参数键值",align:"center",prop:"configValue","show-overflow-tooltip":!0}),e(v,{label:"系统内置",align:"center",prop:"configType"},{default:o(l=>[e(de,{options:n(T),value:l.row.configType},null,8,["options","value"])]),_:1}),e(v,{label:"备注",align:"center",prop:"remark","show-overflow-tooltip":!0}),e(v,{label:"创建时间",align:"center",prop:"createTime",width:"180"},{default:o(l=>[O("span",null,J(r.parseTime(l.row.createTime)),1)]),_:1}),e(v,{label:"操作",align:"center",width:"150","class-name":"small-padding fixed-width"},{default:o(l=>[_((d(),y(f,{link:"",type:"primary",icon:"Edit",onClick:_e=>B(l.row)},{default:o(()=>[s("修改")]),_:2},1032,["onClick"])),[[w,["system:config:edit"]]]),_((d(),y(f,{link:"",type:"primary",icon:"Delete",onClick:_e=>E(l.row)},{default:o(()=>[s("删除")]),_:2},1032,["onClick"])),[[w,["system:config:remove"]]])]),_:1})]),_:1},8,["data"])),[[ge,n(K)]]),_(e(ce,{total:n(R),page:n(u).pageNum,"onUpdate:page":t[5]||(t[5]=l=>n(u).pageNum=l),limit:n(u).pageSize,"onUpdate:limit":t[6]||(t[6]=l=>n(u).pageSize=l),onPagination:V},null,8,["total","page","limit"]),[[Q,n(R)>0]]),e(me,{title:n(D),modelValue:n(h),"onUpdate:modelValue":t[12]||(t[12]=l=>q(h)?h.value=l:null),width:"500px","append-to-body":""},{footer:o(()=>[O("div",Te,[e(f,{type:"primary",onClick:le},{default:o(()=>[s("确 定")]),_:1}),e(f,{onClick:G},{default:o(()=>[s("取 消")]),_:1})])]),default:o(()=>[e(z,{ref:"configRef",model:n(i),rules:n(X),"label-width":"80px"},{default:o(()=>[e(m,{label:"参数名称",prop:"configName"},{default:o(()=>[e(b,{modelValue:n(i).configName,"onUpdate:modelValue":t[7]||(t[7]=l=>n(i).configName=l),placeholder:"请输入参数名称"},null,8,["modelValue"])]),_:1}),e(m,{label:"参数键名",prop:"configKey"},{default:o(()=>[e(b,{modelValue:n(i).configKey,"onUpdate:modelValue":t[8]||(t[8]=l=>n(i).configKey=l),placeholder:"请输入参数键名"},null,8,["modelValue"])]),_:1}),e(m,{label:"参数键值",prop:"configValue"},{default:o(()=>[e(b,{modelValue:n(i).configValue,"onUpdate:modelValue":t[9]||(t[9]=l=>n(i).configValue=l),placeholder:"请输入参数键值"},null,8,["modelValue"])]),_:1}),e(m,{label:"系统内置",prop:"configType"},{default:o(()=>[e(pe,{modelValue:n(i).configType,"onUpdate:modelValue":t[10]||(t[10]=l=>n(i).configType=l)},{default:o(()=>[(d(!0),$(A,null,M(n(T),l=>(d(),y(fe,{key:l.value,label:l.value},{default:o(()=>[s(J(l.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(m,{label:"备注",prop:"remark"},{default:o(()=>[e(b,{modelValue:n(i).remark,"onUpdate:modelValue":t[11]||(t[11]=l=>n(i).remark=l),type:"textarea",placeholder:"请输入内容"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue"])])}}});export{De as default};