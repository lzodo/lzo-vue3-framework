import{u as J,j as d,R as W,r as s,U as V,o as h,c as G,V as m,W as R,e as o,f as e,w as t,J as $,h as _,l as w,C as H,t as M,d as X,S as Y,k as Z}from"./main-QT9KUytk.js";import ee from"./selectUser-ka4lpfkV.js";import{a as oe,b as te,c as le}from"./role-TF0kQUfK.js";import"./index-gHNT2BBc.js";const ne={class:"app-container"},ae=Y({name:"AuthUser"}),de=Object.assign(ae,{setup(re){const x=J(),{proxy:u}=Z(),{sys_normal_disable:P}=u.useDict("sys_normal_disable"),k=d([]),y=d(!0),g=d(!0),N=d(!0),v=d(0),U=d([]),n=W({pageNum:1,pageSize:10,roleId:x.params.roleId,userName:void 0,phonenumber:void 0});function c(){y.value=!0,oe(n).then(r=>{k.value=r.rows,v.value=r.total,y.value=!1})}function A(){const r={path:"/system/role"};u.$tab.closeOpenPage(r)}function f(){n.pageNum=1,c()}function K(){u.resetForm("queryRef"),f()}function T(r){U.value=r.map(a=>a.userId),N.value=!r.length}function j(){u.$refs.selectRef.show()}function B(r){u.$modal.confirm('确认要取消该用户"'+r.userName+'"角色吗？').then(function(){return te({userId:r.userId,roleId:n.roleId})}).then(()=>{c(),u.$modal.msgSuccess("取消授权成功")}).catch(()=>{})}function D(r){const a=n.roleId,b=U.value.join(",");u.$modal.confirm("是否取消选中用户授权数据项?").then(function(){return le({roleId:a,userIds:b})}).then(()=>{c(),u.$modal.msgSuccess("取消授权成功")}).catch(()=>{})}return c(),(r,a)=>{const b=s("el-input"),C=s("el-form-item"),p=s("el-button"),q=s("el-form"),I=s("el-col"),z=s("right-toolbar"),L=s("el-row"),i=s("el-table-column"),O=s("dict-tag"),Q=s("el-table"),E=s("pagination"),S=V("hasPermi"),F=V("loading");return h(),G("div",ne,[m(e(q,{model:o(n),ref:"queryRef",inline:!0},{default:t(()=>[e(C,{label:"用户名称",prop:"userName"},{default:t(()=>[e(b,{modelValue:o(n).userName,"onUpdate:modelValue":a[0]||(a[0]=l=>o(n).userName=l),placeholder:"请输入用户名称",clearable:"",style:{width:"240px"},onKeyup:$(f,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(C,{label:"手机号码",prop:"phonenumber"},{default:t(()=>[e(b,{modelValue:o(n).phonenumber,"onUpdate:modelValue":a[1]||(a[1]=l=>o(n).phonenumber=l),placeholder:"请输入手机号码",clearable:"",style:{width:"240px"},onKeyup:$(f,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(C,null,{default:t(()=>[e(p,{type:"primary",icon:"Search",onClick:f},{default:t(()=>[_("搜索")]),_:1}),e(p,{icon:"Refresh",onClick:K},{default:t(()=>[_("重置")]),_:1})]),_:1})]),_:1},8,["model"]),[[R,o(g)]]),e(L,{gutter:10,class:"mb8"},{default:t(()=>[e(I,{span:1.5},{default:t(()=>[m((h(),w(p,{type:"primary",plain:"",icon:"Plus",onClick:j},{default:t(()=>[_("添加用户")]),_:1})),[[S,["system:role:add"]]])]),_:1}),e(I,{span:1.5},{default:t(()=>[m((h(),w(p,{type:"danger",plain:"",icon:"CircleClose",disabled:o(N),onClick:D},{default:t(()=>[_("批量取消授权")]),_:1},8,["disabled"])),[[S,["system:role:remove"]]])]),_:1}),e(I,{span:1.5},{default:t(()=>[e(p,{type:"warning",plain:"",icon:"Close",onClick:A},{default:t(()=>[_("关闭")]),_:1})]),_:1}),e(z,{showSearch:o(g),"onUpdate:showSearch":a[2]||(a[2]=l=>H(g)?g.value=l:null),onQueryTable:c},null,8,["showSearch"])]),_:1}),m((h(),w(Q,{data:o(k),onSelectionChange:T},{default:t(()=>[e(i,{type:"selection",width:"55",align:"center"}),e(i,{label:"用户名称",prop:"userName","show-overflow-tooltip":!0}),e(i,{label:"用户昵称",prop:"nickName","show-overflow-tooltip":!0}),e(i,{label:"邮箱",prop:"email","show-overflow-tooltip":!0}),e(i,{label:"手机",prop:"phonenumber","show-overflow-tooltip":!0}),e(i,{label:"状态",align:"center",prop:"status"},{default:t(l=>[e(O,{options:o(P),value:l.row.status},null,8,["options","value"])]),_:1}),e(i,{label:"创建时间",align:"center",prop:"createTime",width:"180"},{default:t(l=>[X("span",null,M(r.parseTime(l.row.createTime)),1)]),_:1}),e(i,{label:"操作",align:"center","class-name":"small-padding fixed-width"},{default:t(l=>[m((h(),w(p,{link:"",type:"primary",icon:"CircleClose",onClick:se=>B(l.row)},{default:t(()=>[_("取消授权")]),_:2},1032,["onClick"])),[[S,["system:role:remove"]]])]),_:1})]),_:1},8,["data"])),[[F,o(y)]]),m(e(E,{total:o(v),page:o(n).pageNum,"onUpdate:page":a[3]||(a[3]=l=>o(n).pageNum=l),limit:o(n).pageSize,"onUpdate:limit":a[4]||(a[4]=l=>o(n).pageSize=l),onPagination:c},null,8,["total","page","limit"]),[[R,o(v)>0]]),e(o(ee),{ref:"selectRef",roleId:o(n).roleId,onOk:f},null,8,["roleId"])])}}});export{de as default};
