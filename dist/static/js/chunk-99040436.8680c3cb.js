(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-99040436"],{"39a8":function(e,t,a){},4473:function(e,t,a){"use strict";a("accd")},"6a77":function(e,t,a){"use strict";a("39a8")},accd:function(e,t,a){},d718:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{display:"flex","margin-top":"2px"}},[e.oldPage?a("el-pagination",{attrs:{disabled:!0,"current-page":e._currentPage,layout:"total,prev,pager,next","page-size":e.pageSize,total:e.total},on:{"update:currentPage":function(t){e._currentPage=t},"update:current-page":function(t){e._currentPage=t},"current-change":function(t){return e.currentChange(t,e.pageSize)}}}):a("div",{staticClass:"page-style",staticStyle:{display:"flex"}},[a("el-pagination",{attrs:{"current-page":e._currentPage,"page-sizes":e.options,"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total,background:""},on:{"size-change":function(t){return e.currentChange(1,t)},"current-change":function(t){return e.currentChange(t,e.pageSize)}}})],1)],1)},l=[],i=(a("a9e3"),{props:{total:{type:Number,default:0},pageSizeProps:{type:Number,default:20},currentPage:{type:Number,default:1},oldPage:{type:Boolean,default:!0}},data:function(){return{pageSize:this.pageSizeProps,options:[20,50,100]}},computed:{_currentPage:{get:function(){return this.currentPage},set:function(){return 1}}},methods:{currentChange:function(e,t){t&&(this.pageSize=t),this.oldPage?this.$emit("currentChange",e):this.$emit("currentChange",e,t)}}}),r=i,s=(a("4473"),a("2877")),o=Object(s["a"])(r,n,l,!1,null,null,null);t["a"]=o.exports},e5da:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"material_info_query"},[a("div",{staticClass:"top-search-box"},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"存货编码"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{size:"small",clearable:"",placeholder:"存货编码"},on:{input:e.changeDebounce},model:{value:e.getParams.inventory_code,callback:function(t){e.$set(e.getParams,"inventory_code",t)},expression:"getParams.inventory_code"}})],1),a("el-form-item",{attrs:{label:"存货名称"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{size:"small",clearable:"",placeholder:"存货名称"},on:{input:e.changeDebounce},model:{value:e.getParams.inventory_name,callback:function(t){e.$set(e.getParams,"inventory_name",t)},expression:"getParams.inventory_name"}})],1),a("el-form-item",{attrs:{label:"规格型号"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{size:"small",clearable:"",placeholder:"规格型号"},on:{input:e.changeDebounce},model:{value:e.getParams.specification,callback:function(t){e.$set(e.getParams,"specification",t)},expression:"getParams.specification"}})],1),a("el-form-item",{attrs:{label:"项目编码"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{size:"small",clearable:"",placeholder:"项目编码"},on:{input:e.changeDebounce},model:{value:e.getParams.project_code,callback:function(t){e.$set(e.getParams,"project_code",t)},expression:"getParams.project_code"}})],1),a("el-form-item",{attrs:{label:"项目名称"}},[a("el-input",{staticStyle:{width:"170px"},attrs:{size:"small",clearable:"",placeholder:"项目名称"},on:{input:e.changeDebounce},model:{value:e.getParams.project_name,callback:function(t){e.$set(e.getParams,"project_name",t)},expression:"getParams.project_name"}})],1),a("el-form-item",{staticStyle:{"margin-left":"30px"},attrs:{label:"最新导入数据日期:"}},[e._v(" "+e._s(e.date)+" ")]),a("el-form-item",[a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["material","multi"],expression:"['material','multi']"}],attrs:{type:"blue",size:"small"}},[a("a",{attrs:{href:e.templateFileUrl+"query.xlsx",download:"批量查询模版.xlsx"},on:{click:e.writeHistory}},[e._v("导出批量查询用模版")])]),a("el-upload",{ref:"fileRefs1",staticStyle:{margin:"0 8px",display:"inline-block"},attrs:{action:"string",accept:".xls, .xlsx","http-request":e.Upload1,"show-file-list":!1}},[a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["material","multi"],expression:"['material','multi']"}],attrs:{loading:e.btnExportLoad1,type:"blue",size:"small"}},[e._v("批量查询")])],1),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["material","add"],expression:"['material','add']"}],attrs:{type:"blue",size:"small"},on:{click:e.addFun}},[e._v("物料信息显示设定")]),a("el-upload",{ref:"fileRefs",staticStyle:{margin:"0 8px",display:"inline-block"},attrs:{"auto-upload":!1,"on-change":e.changeFile,action:"string",accept:".xls, .xlsx","http-request":e.Upload,"show-file-list":!1}},[e._e()],1),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["material","export"],expression:"['material','export']"}],attrs:{loading:e.btnExportLoad,type:"blue",size:"small"},on:{click:e.showWarn}},[e._v("导入U8物料数据Excel文件")])],1)],1)],1),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"center-box"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",stripe:""}},e._l(e.heardersData,(function(t,n){return a("af-table-column",{key:n,attrs:{label:e.headers.find((function(e){return e.prop===t})).label,props:t,align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){var l=n.row;return[a("div",{staticStyle:{cursor:"pointer"},on:{click:function(a){return e.dbclickDesc(l[t])}}},[e._v(e._s(l[t])+" ")])]}}],null,!0)})})),1)],1),a("el-footer",{attrs:{id:"footer"}},[a("page",{attrs:{"old-page":!1,total:e.total,"current-page":e.getParams.page},on:{currentChange:e.currentChange}})],1),a("el-dialog",{staticClass:"dialog-style",attrs:{title:"物料信息显示设定",visible:e.dialogVisible,width:"600px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{attrs:{"label-width":"100px"}},[a("el-form-item",{attrs:{label:"显示列"}},[a("el-checkbox",{on:{change:function(t){return e.checkAllChange(t)}},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),a("el-checkbox-group",{on:{change:function(t){return e.handleCheckedCitiesChange(t)}},model:{value:e.display_columns,callback:function(t){e.display_columns=t},expression:"display_columns"}},[e._l(e.headers.slice(0,16),(function(t){return a("el-checkbox",{key:t.prop,attrs:{label:t.prop}},[e._v(e._s(t.label)+" ")])})),a("div",{staticStyle:{height:"1px",background:"black",width:"400px"}}),e._l(e.headers.slice(16),(function(t){return a("el-checkbox",{key:t.prop,attrs:{label:t.prop}},[e._v(e._s(t.label)+" ")])}))],2)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:e.submitFun}},[e._v("确 定")])],1)],1)],1)},l=[],i=a("c7eb"),r=a("1da1"),s=(a("d3b7"),a("159b"),a("7db0"),a("a15b"),a("e9c4"),a("a78e")),o=a.n(s),c=a("6c18"),p=a("d718"),u=a("ed08"),d={name:"MaterialInfoQuery",inject:["reload"],components:{page:p["a"]},data:function(){return{headers:[{prop:"seq",label:"序号"},{prop:"f_date",label:"日期"},{prop:"currency",label:"币种"},{prop:"inventory_code",label:"存货编码"},{prop:"inventory_name",label:"存货名称"},{prop:"specification",label:"规格型号"},{prop:"unit",label:"主计量"},{prop:"quantity",label:"数量"},{prop:"tax_amount",label:"原币税额"},{prop:"tax_unit_price",label:"原币含税单价"},{prop:"unit_price",label:"原币单价"},{prop:"amount",label:"原币金额"},{prop:"total_value_tax",label:"原币价税合计"},{prop:"cumulative_export_quantity",label:"累计出口数量"},{prop:"project_code",label:"项目编码"},{prop:"project_name",label:"项目名称"},{prop:"business_type",label:"业务类型"},{prop:"order_id",label:"订单编号"},{prop:"supplier",label:"供应商"},{prop:"department",label:"部门"},{prop:"salesman",label:"业务员"},{prop:"plan_arrive_date",label:"计划到货日期"},{prop:"documenter",label:"制单人"},{prop:"closers",label:"行关闭人"},{prop:"requirement_desc",label:"需求分类代码说明"},{prop:"pay_terms",label:"付款条件"},{prop:"tax_rate",label:"税率"},{prop:"unbilled",label:"未开票量"},{prop:"cumulative_billed",label:"累计开票量"},{prop:"billing_status",label:"开票状态"}],heardersData:[],date:null,display_columns:[],checkAll:!1,loading:!1,tableData:[],dialogVisible:!1,total:0,btnExportLoad:!1,btnExportLoad1:!1,getParams:{page:1,page_size:20},btnLoading:!1}},created:function(){this.getList(),this.templateFileUrl="/"},mounted:function(){},methods:{handleCheckedCitiesChange:function(e){var t=e.length;this.checkAll=30===t},writeHistory:function(){Object(c["q"])("post",null,{data:{operator_user:o.a.get("name_MCS"),operator_type:"导出",operator_reason:"导出批量查询模板",operation_desc:{}}})},checkAllChange:function(e){var t=[];this.headers.forEach((function(e){t.push(e.prop)})),e?(this.$set(this,"checkAll",!0),this.$set(this,"display_columns",t)):(this.$set(this,"checkAll",!1),this.$set(this,"display_columns",[]))},showWarn:function(){var e=this;this.$confirm("导入Excel文件时，会将系统内已有数据全部清空，重新导入，请谨慎操作！！！, 是否继续?","提示",{confirmButtonText:"是",cancelButtonText:"否",type:"warning"}).then((function(){e.$refs["fileRefs"].$refs["upload-inner"].handleClick()})).catch((function(){}))},submitFun:function(){var e=this;return Object(r["a"])(Object(i["a"])().mark((function t(){var a;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.display_columns.length>0)){t.next=19;break}return a=[],e.display_columns.forEach((function(t){a.push(e.headers.find((function(e){return e.prop===t})).label)})),t.prev=3,e.btnLoading=!0,t.next=7,Object(c["d"])("post",null,{data:{display_columns:e.display_columns.join(","),display_columns_zh:a.join(",")}});case 7:e.$message.success("操作成功"),e.dialogVisible=!1,e.btnLoading=!1,e.reload(),e.changeList(),t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](3),e.btnLoading=!1;case 17:t.next=20;break;case 19:e.$message("显示列至少选一个");case 20:case"end":return t.stop()}}),t,null,[[3,14]])})))()},addFun:function(){this.dialogVisible=!0,this.display_columns=JSON.parse(JSON.stringify(this.heardersData)),this.checkAll=30===this.display_columns.length},getList:function(){var e=this;return Object(r["a"])(Object(i["a"])().mark((function t(){var a;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.loading=!0,t.next=4,Object(c["c"])("get",null,{params:e.getParams});case 4:a=t.sent,e.date=a.export_date,e.heardersData=a.display_columns,e.display_columns=a.display_columns,e.tableData=a.results||[],e.total=a.count,e.loading=!1,t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),e.loading=!1;case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()},changeDebounce:function(){Object(u["b"])(this,"changeList")},changeList:function(){this.getParams.page=1,this.getList()},currentChange:function(e,t){this.getParams.page=e,this.getParams.page_size=t,this.getList()},changeFile:function(e){var t=this;"ready"===e.status&&this.$confirm("即将开始清空数据，导入excel文件内容，是否继续？","提示",{confirmButtonText:"是",cancelButtonText:"否"}).then((function(){t.$refs.fileRefs.submit()})).catch((function(){t.$refs.fileRefs.clearFiles(),t.$message({type:"info",message:"取消文件上传"})}))},Upload:function(e){var t=this;this.btnExportLoad=!0;var a=new FormData;a.append("file",e.file),Object(c["c"])("post",null,{data:a}).then((function(e){!1===e.ignore_flag?t.$confirm("导入的Excel文件中必填列存在空值，是否继续","提示",{confirmButtonText:"是",cancelButtonText:"否",type:"warning"}).then((function(){t.$store.dispatch("settings/operateTypeSetting","导入"),a.append("ignore_flag",1),Object(c["c"])("post",null,{data:a}).then((function(e){t.$message({type:"success",message:e}),t.btnExportLoad=!1,t.changeList()})).catch((function(e){}))})).catch((function(){})):(t.$store.dispatch("settings/operateTypeSetting","导入"),t.$message({type:"success",message:e}),t.btnExportLoad=!1,t.changeList())})).catch((function(e){t.btnExportLoad=!1}))},Upload1:function(e){var t=this;this.btnExportLoad1=!0;var a=new FormData;a.append("query_file",e.file),Object(c["e"])("post",null,{data:a}).then((function(e){window.open(""+e.url,"_self"),t.btnExportLoad1=!1,t.$message({type:"success",message:"查询成功"})})).catch((function(e){t.btnExportLoad1=!1}))},dbclickDesc:function(e){var t=document.createElement("input");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),this.$message.success("复制成功!"),document.body.removeChild(t)}}},m=d,g=(a("6a77"),a("2877")),h=Object(g["a"])(m,n,l,!1,null,null,null);t["default"]=h.exports}}]);