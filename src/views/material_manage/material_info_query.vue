<template>
  <div class="material_info_query">
    <!-- 物料信息查询 -->
    <div class="top-search-box">
      <el-form :inline="true">
        <el-form-item label="存货编码">
          <el-input
            v-model="getParams.inventory_code"
            style="width: 170px;"
            size="small"
            clearable
            placeholder="存货编码"
            @input="changeDebounce"
          />
        </el-form-item>
        <el-form-item label="存货名称">
          <el-input
            v-model="getParams.inventory_name"
            style="width: 170px;"
            size="small"
            clearable
            placeholder="存货名称"
            @input="changeDebounce"
          />
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input
            v-model="getParams.specification"
            style="width: 170px;"
            size="small"
            clearable
            placeholder="规格型号"
            @input="changeDebounce"
          />
        </el-form-item>
        <el-form-item label="项目编码">
          <el-input
            v-model="getParams.project_code"
            style="width: 170px;"
            size="small"
            clearable
            placeholder="项目编码"
            @input="changeDebounce"
          />
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            v-model="getParams.project_name"
            style="width: 170px;"
            size="small"
            clearable
            placeholder="项目名称"
            @input="changeDebounce"
          />
        </el-form-item>
        <el-form-item style="margin-left: 30px;" label="最新导入数据日期:">
          {{ date }}
        </el-form-item>
        <el-form-item>
          <el-button v-permission="['material','multi']" type="blue" size="small">
            <a
              :href="`${templateFileUrl}query.xlsx`"
              download="批量查询模版.xlsx"
              @click="writeHistory"
            >导出批量查询用模版</a>
          </el-button>
          <el-upload
            ref="fileRefs1"
            style="margin:0 8px;display:inline-block"
            action="string"
            accept=".xls, .xlsx"
            :http-request="Upload1"
            :show-file-list="false"
          >
            <el-button v-permission="['material','multi']" :loading="btnExportLoad1" type="blue" size="small">批量查询</el-button>
          </el-upload>
          <el-button v-permission="['material','add']" type="blue" size="small" @click="addFun">物料信息显示设定</el-button>
          <el-upload
            ref="fileRefs"
            :auto-upload="false"
            :on-change="changeFile"
            style="margin:0 8px;display:inline-block"
            action="string"
            accept=".xls, .xlsx"
            :http-request="Upload"
            :show-file-list="false"
          >
            <el-button v-if="false" type="blue" size="small">导入U8物料数据Excel文件</el-button>
          </el-upload>
          <el-button v-permission="['material','export']" :loading="btnExportLoad" type="blue" size="small" @click="showWarn">导入U8物料数据Excel文件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      v-loading="loading"
      class="center-box"
    >
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
      >
        <af-table-column v-for="(item,index) in heardersData" :key="index" :label="headers.find(d=>d.prop===item).label" :props="item" align="center">
          <template slot-scope="{row}">
            <div
              style="cursor: pointer "
              @click="dbclickDesc(row[item])"
            >{{ row[item] }}
            </div>
          </template>
        </af-table-column>
      </el-table>
    </div>
    <el-footer id="footer">
      <page
        :old-page="false"
        :total="total"
        :current-page="getParams.page"
        @currentChange="currentChange"
      />
    </el-footer>

    <el-dialog
      title="物料信息显示设定"
      :visible.sync="dialogVisible"
      width="600px"
      class="dialog-style"
    >
      <el-form label-width="100px">
        <el-form-item label="显示列">
          <el-checkbox v-model="checkAll" @change="checkAllChange($event)">全选</el-checkbox>
          <el-checkbox-group v-model="display_columns" @change="handleCheckedCitiesChange($event)">
            <el-checkbox
              v-for="item in headers.slice(0,16)"
              :key="item.prop"
              :label="item.prop"
            >{{ item.label }}
            </el-checkbox>
            <div style="height:1px;background: black;width: 400px;" />
            <el-checkbox
              v-for="item in headers.slice(16)"
              :key="item.prop"
              :label="item.prop"
            >{{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="submitFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="js">
import Cookies from 'js-cookie'
import { userOperationLog } from '@/api/jqy'
import page from '@/components/page/index1'
import { debounce } from '@/utils'
import { material, materialDisplay, multiQuery } from '@/api/jqy'
export default {
  name: 'MaterialInfoQuery',
  inject: ['reload'],
  components: { page },
  data() {
    return {
      headers: [
        { prop: 'seq', label: '序号' },
        { prop: 'f_date', label: '日期' },
        { prop: 'currency', label: '币种' },
        { prop: 'inventory_code', label: '存货编码' },
        { prop: 'inventory_name', label: '存货名称' },
        { prop: 'specification', label: '规格型号' },
        { prop: 'unit', label: '主计量' },
        { prop: 'quantity', label: '数量' },
        { prop: 'tax_amount', label: '原币税额' },
        { prop: 'tax_unit_price', label: '原币含税单价' },
        { prop: 'unit_price', label: '原币单价' },
        { prop: 'amount', label: '原币金额' },
        { prop: 'total_value_tax', label: '原币价税合计' },
        { prop: 'cumulative_export_quantity', label: '累计出口数量' },
        { prop: 'project_code', label: '项目编码' },
        { prop: 'project_name', label: '项目名称' },
        { prop: 'business_type', label: '业务类型' },
        { prop: 'order_id', label: '订单编号' },
        { prop: 'supplier', label: '供应商' },
        { prop: 'department', label: '部门' },
        { prop: 'salesman', label: '业务员' },
        { prop: 'plan_arrive_date', label: '计划到货日期' },
        { prop: 'documenter', label: '制单人' },
        { prop: 'closers', label: '行关闭人' },
        { prop: 'requirement_desc', label: '需求分类代码说明' },
        { prop: 'pay_terms', label: '付款条件' },
        { prop: 'tax_rate', label: '税率' },
        { prop: 'unbilled', label: '未开票量' },
        { prop: 'cumulative_billed', label: '累计开票量' },
        { prop: 'billing_status', label: '开票状态' }
      ],
      heardersData: [],
      date: null,
      display_columns: [],
      checkAll: false,
      loading: false,
      tableData: [],
      dialogVisible: false,
      total: 0,
      btnExportLoad: false,
      btnExportLoad1: false,
      getParams: { page: 1, page_size: 20 },
      btnLoading: false
    }
  },
  created() {
    this.getList()
    this.templateFileUrl = process.env.BASE_URL
  },
  mounted() {
  },
  methods: {
    handleCheckedCitiesChange(data) {
      const checkedCount = data.length
      this.checkAll = checkedCount === 30
    },
    writeHistory() {
      userOperationLog('post', null, { data: { 'operator_user': Cookies.get('name_MCS'), operator_type: '导出', 'operator_reason': '导出批量查询模板', 'operation_desc': {}}})
    },
    checkAllChange(val) {
      const arr = []
      this.headers.forEach(D => {
        arr.push(D.prop)
      })
      if (val) {
        this.$set(this, 'checkAll', true)
        this.$set(this, 'display_columns', arr)
      } else {
        this.$set(this, 'checkAll', false)
        this.$set(this, 'display_columns', [])
      }
    },
    showWarn() {
      this.$confirm('导入Excel文件时，会将系统内已有数据全部清空，重新导入，请谨慎操作！！！, 是否继续?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        this.$refs['fileRefs'].$refs['upload-inner'].handleClick()
      }).catch(() => {
      })
    },
    async submitFun() {
      if (this.display_columns.length > 0) {
        const arr = []
        this.display_columns.forEach(item => {
          arr.push(this.headers.find(d => d.prop === item).label)
        })
        try {
          this.btnLoading = true
          await materialDisplay('post', null, { data: { display_columns: this.display_columns.join(','), display_columns_zh: arr.join(',') }})
          this.$message.success('操作成功')
          this.dialogVisible = false
          this.btnLoading = false
          this.reload()
          this.changeList()
        } catch (e) {
          this.btnLoading = false
        }
      } else {
        this.$message('显示列至少选一个')
      }
    },
    addFun() {
      this.dialogVisible = true
      this.display_columns = JSON.parse(JSON.stringify(this.heardersData))
      this.checkAll = this.display_columns.length === 30
    },
    async getList() {
      try {
        this.loading = true
        const data = await material('get', null, { params: this.getParams })
        this.date = data.export_date
        this.heardersData = data.display_columns
        this.display_columns = data.display_columns
        this.tableData = data.results || []
        this.total = data.count
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    changeDebounce() {
      debounce(this, 'changeList')
    },
    changeList() {
      this.getParams.page = 1
      this.getList()
    },
    currentChange(page, pageSize) {
      this.getParams.page = page
      this.getParams.page_size = pageSize
      this.getList()
    },
    changeFile(file) {
      if (file.status === 'ready') {
        this.$confirm('即将开始清空数据，导入excel文件内容，是否继续？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          this.$refs.fileRefs.submit()
        }).catch(() => {
          this.$refs.fileRefs.clearFiles()
          this.$message({
            type: 'info',
            message: '取消文件上传'
          })
        })
      }
    },
    Upload(param) {
      this.btnExportLoad = true
      const formData = new FormData()
      formData.append('file', param.file)
      material('post', null, { data: formData }).then(response => {
        if (response.ignore_flag === false) {
          this.$confirm('导入的Excel文件中必填列存在空值，是否继续', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('settings/operateTypeSetting', '导入')
            formData.append('ignore_flag', 1)
            material('post', null, { data: formData }).then(response => {
              this.$message({
                type: 'success',
                message: response
              })
              this.btnExportLoad = false
              this.changeList()
            }).catch(e => {
            })
          }).catch(() => {
          })
        } else {
          this.$store.dispatch('settings/operateTypeSetting', '导入')
          this.$message({
            type: 'success',
            message: response
          })
          this.btnExportLoad = false
          this.changeList()
        }
      }).catch(e => {
        this.btnExportLoad = false
      })
    },
    Upload1(param) {
      this.btnExportLoad1 = true
      const formData = new FormData()
      formData.append('query_file', param.file)
      multiQuery('post', null, { data: formData }).then(response => {
        window.open(process.env.VUE_APP_URL + response.url, '_self')
        this.btnExportLoad1 = false
        this.$message({
          type: 'success',
          message: '查询成功'
        })
      }).catch(e => {
        this.btnExportLoad1 = false
      })
    },
    dbclickDesc(val) {
      // 创建input标签
      var input = document.createElement('input')
      // 将input的值设置为需要复制的内容
      input.value = val
      // 添加input标签
      document.body.appendChild(input)
      // 选中input标签
      input.select()
      // 执行复制
      document.execCommand('copy')
      // 成功提示信息
      this.$message.success('复制成功!')
      // 移除input标签
      document.body.removeChild(input)
    }
  }
}
</script>

<style lang="scss">
  .el-tooltip__popper{
    max-width:50%
  }
</style>

