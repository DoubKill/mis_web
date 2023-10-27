<template>
  <div class="problem_manage">
    <!-- 项目问题点管理 -->
    <div class="top-search-box">
      <el-form :inline="true">
        <el-form-item label="操作日期">
          <el-date-picker
            v-model="dateValue"
            size="small"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="changeDate"
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
        <el-form-item label="异常项">
          <el-input
            v-model="getParams.unusual_item"
            style="width: 170px;"
            size="small"
            clearable
            placeholder="异常项"
            @input="changeDebounce"
          />
        </el-form-item>
        <el-form-item label="说明">
          <el-input
            v-model="getParams.explanation"
            style="width: 170px;"
            size="small"
            clearable
            placeholder="说明"
            @input="changeDebounce"
          />
        </el-form-item>
        <el-form-item label="负责部门">
          <el-select
            v-model="getParams.department"
            style="width: 170px;"
            clearable
            placeholder="请选择负责部门"
            @visible-change="getOptionsSection"
            @change="changeList"
          >
            <el-option
              v-for="item in sectionList"
              :key="item.id"
              :label="item.global_name"
              :value="item.global_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-upload
            style="margin-left:8px;display:inline-block"
            action="string"
            accept=".xls, .xlsx"
            :http-request="Upload"
            :show-file-list="false"
          >
            <el-button v-permission="['problem','import']" size="small" type="blue">导入Excel</el-button>
          </el-upload>
          <el-button
            v-permission="['problem','export']"
            style="margin-left: 10px;"
            type="blue"
            size="small"
            :loading="btnExportLoad"
            @click="exportFun"
          >导出Excel</el-button>
          <el-button v-permission="['problem','add']" style="margin-left: 10px;" size="small" type="blue" @click="showAddDialog">新建</el-button>
          <el-button style="margin-left: 10px;" size="small" type="blue" @click="lookEcharts">查看饼图</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      v-loading="loading"
      class="center-box"
    >
      <!-- <div class="botton-box">

      </div> -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
      >
        <af-table-column
          prop="project_name"
          label="项目名称"
        />
        <af-table-column
          prop="problem_title"
          label="标题"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click.prevent="showEditDialog(scope.row,true)"
            >{{ scope.row.problem_title }}</el-link>
          </template>
        </af-table-column>
        <af-table-column
          prop="seq"
          label="序号"
        />
        <af-table-column
          prop="raise_date"
          label="提出日期"
        />
        <af-table-column
          prop="unusual_item"
          label="异常项"
        />
        <af-table-column
          prop="solution"
          label="解决措施"
        />
        <af-table-column
          prop="explanation"
          label="说明"
        />
        <af-table-column
          prop="department"
          label="负责部门"
        />
        <af-table-column
          prop="hope_date"
          label="希望解决时间"
        />
        <af-table-column
          prop="plan_date"
          label="计划解决时间"
        />
        <af-table-column
          prop="actual_date"
          label="实际解决时间"
        />
        <af-table-column
          prop="status"
          label="状态"
        />
        <af-table-column
          prop="remark"
          label="备注"
        />
        <af-table-column
          fixed="right"
          label="操作"
          width="170"
        >
          <template slot-scope="scope">
            <el-button
              v-permission="['problem','change']"
              size="mini"
              type="blue"
              @click="showEditDialog(scope.row,false)"
            >编辑</el-button>
            <el-button
              v-permission="['problem', 'delete']"
              size="mini"
              type="danger"
              :disabled="btnLoading"
              @click="handleUserDelete(scope.row)"
            >
              删除
            </el-button>
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
      :title="dialogForm.id?'修改项目问题点':'新建项目问题点'"
      :visible.sync="dialogVisible"
      width="850px"
      :before-close="handleClose"
    >
      <el-form
        ref="dialogForm"
        inline
        :rules="rules"
        :model="dialogForm"
        label-width="120px"
      >
        <el-form-item label="项目" prop="project_name">
          <el-input
            v-model="dialogForm.project_name"
            :disabled="dialogForm.id?true:false"
          />
        </el-form-item>
        <el-form-item label="标题" prop="problem_title">
          <el-input
            v-model="dialogForm.problem_title"
            :disabled="isLook"
          />
        </el-form-item>
        <el-form-item label="序号" prop="seq">
          <el-input-number
            v-model="dialogForm.seq"
            :disabled="isLook"
            controls-position="right"
            style="width:250px"
          />
        </el-form-item>
        <el-form-item label="异常项">
          <el-input
            v-model="dialogForm.unusual_item"
            :disabled="isLook"
          />
        </el-form-item>
        <el-form-item label="提出日期" prop="raise_date">
          <el-date-picker
            v-model="dialogForm.raise_date"
            :disabled="isLook"
            type="date"
            placeholder="提出日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="异常项">
          <el-input
            v-model="dialogForm.unusual_item"
            :disabled="isLook"
          />
        </el-form-item>
        <el-form-item label="解决措施">
          <el-input
            v-model="dialogForm.solution"
            :disabled="isLook"
          />
        </el-form-item>
        <el-form-item label="说明">
          <el-input
            v-model="dialogForm.explanation"
            :disabled="isLook"
          />
        </el-form-item>
        <el-form-item label="负责部门" prop="department">
          <el-select
            v-model="dialogForm.department"
            :disabled="isLook"
            style="width:250px"
            placeholder="请选择负责部门"
            @visible-change="getOptionsSection"
          >
            <el-option
              v-for="item in sectionList"
              :key="item.id"
              :label="item.global_name"
              :value="item.global_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="希望解决时间">
          <el-date-picker
            v-model="dialogForm.hope_date"
            :disabled="isLook"
            type="date"
            placeholder="希望解决时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="计划解决时间">
          <el-date-picker
            v-model="dialogForm.plan_date"
            :disabled="isLook"
            type="date"
            placeholder="计划解决时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="实际解决时间">
          <el-date-picker
            v-model="dialogForm.actual_date"
            :disabled="isLook"
            type="date"
            placeholder="实际解决时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="dialogForm.status"
            :disabled="isLook"
            style="width:250px"
            placeholder="请选择状态"
            @visible-change="getStatus"
          >
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.global_name"
              :value="item.global_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="dialogForm.remark"
            :disabled="isLook"
          />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            v-if="!isLook"
            ref="elUploadImg"
            :on-remove="handleRemove"
            :file-list="objList"
            action=""
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-change="onChangeImg"
            accept=".jpeg, .jpg, .png"
            :on-exceed="onExceed"
            :limit="5"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleImg" :modal-append-to-body="false" :append-to-body="true">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
          <template v-for="(item, index) in dialogForm.images">
            <el-image
              v-if="isLook&&dialogForm.images.length>0"
              :key="index"
              style="width: 100px; height: 100px"
              :src="item"
              :preview-src-list="[item]"
            />
          </template>
          <div v-if="isLook&&dialogForm.images.length===0">
            暂无图片
          </div>
        </el-form-item>
        <br>
        <el-form-item label="上传视频">
          <span v-if="!isLook" style="font-size: 12px;color: #999;">仅支持mp4视频格式，大小不超过50M，视频时长不超过15秒，最多可一共上传3个视频</span>
          <el-upload
            v-if="!isLook"
            action="api/v1/projects/resource-upload/"
            :data="{'ownership':dialogForm.project_name}"
            name="resource"
            list-type="picture-card"
            :limit="3"
            :on-success="changeUrl"
            :before-upload="beforeAvatarUpload"
            :file-list="videoList"
            accept=".mp4"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{file}" style="height: 100%;">
              <video v-if="file" class="el-upload-list__item-thumbnail" :src="dialogVideoUrl" width="100%" height="100%" />
              <span v-if="file" class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handleVideoPreview(file)">
                  <i class="el-icon-video-play" />
                </span>
                <span class="el-upload-list__item-delete" @click="handleRemoveVideo(file)">
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleVideo" append-to-body>
            <video width="100%" controls="controls" :src="dialogVideoUrl" />
          </el-dialog>
          <template v-for="(item, index) in dialogForm.videos">
            <video
              v-if="isLook&&dialogForm.videos.length>0"
              :key="index"
              style="width:600px;height:300px"
              controls="controls"
              :src="item"
            />
          </template>
          <div v-if="isLook&&dialogForm.videos.length===0">
            暂无视频
          </div>
        </el-form-item>
        <br>
        <el-form-item label="上传文件">
          <el-upload
            v-if="!isLook"
            ref="upload"
            class="upload-demo"
            action=""
            :file-list="fileList"
            :http-request="upExcel"
            :on-remove="handleRemoveFile"
            multiple
            accept=".xls, .xlsx, .doc, .docx"
            :on-exceed="exceed"
            :limit="1"
          >
            <el-button
              type="blue"
              size="small"
            >选择文件</el-button>
          </el-upload>
          <el-button
            v-if="isLook&&fileList.length>0"
            type="blue"
            size="small"
            @click="templateDownload"
          >下载文件</el-button>
          <div v-if="isLook&&fileList.length===0">暂无文件</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button v-if="!isLook" :loading="btnLoading" type="primary" @click="submitFun">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="饼图查看"
      :visible.sync="dialog"
      width="770px"
    >
      <el-form :inline="true">
        <el-form-item label="分析维度">
          <el-select
            v-model="search.analysis_type"
            clearable
            placeholder="请选择分析维度"
            @change="lookEcharts"
          >
            <el-option
              v-for="item in ['部门','状态']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        id="doughnutChart"
        style="width:700px ;height:700px;"
      />
      <span slot="footer" class="dialog-footer" />
    </el-dialog>
  </div>
</template>

<script lang="js">
import page from '@/components/page/index1'
import * as echarts from 'echarts'
import { debounce } from '@/utils'
import { problem, problemImportExcel, resourceUpload, globalCodes, problemAnalysis } from '@/api/jqy'
export default {
  name: 'ProblemManage',
  components: { page },
  data() {
    return {
      dateValue: [],
      tableData: [],
      isLook: false,
      rules: {
        project_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        problem_title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        seq: [{ required: true, message: '不能为空', trigger: 'blur' }],
        raise_date: [{ required: true, message: '不能为空', trigger: 'change' }],
        department: [{ required: true, message: '不能为空', trigger: 'change' }],
        status: [{ required: true, message: '不能为空', trigger: 'change' }]
      },
      dialog: false,
      dialogImageUrl: '',
      dialogVideoUrl: '',
      dialogVisibleImg: false,
      dialogVisibleVideo: false,
      videoList: [],
      objList: [],
      search: { analysis_type: '部门' },
      dialogForm: {},
      statusList: [],
      fileList: [],
      sectionList: [],
      dialogVisible: false,
      total: 0,
      btnExportLoad: false,
      getParams: { page: 1, page_size: 20 },
      btnLoading: false,
      loading: true,
      optionDoughnut: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 'bottom',
          left: 'center'
        },
        series: [
          {
            name: '项目问题统计',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: true,
            label: {
              show: true,
              formatter(param) {
                return param.name + param.percent + '%' + '\n (' + param.value + ')'
              }
            },
            labelLine: {
              show: true
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: []
          }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    handleUserDelete(row) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.btnLoading = true
        problem('delete', row.id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
            this.btnLoading = false
          }).catch(e => {
            this.btnLoading = false
            this.$message.error('删除失败')
          })
      })
    },
    templateDownload() {
      window.open(process.env.VUE_APP_URL + this.fileList[0].url, '_self')
    },
    async upExcel(file) {
      try {
        if (!this.dialogForm.project_name) {
          this.fileList = []
          this.$message('请先填写项目名称')
          return
        }
        var formFile = new FormData()
        formFile.append('resource', file.file)
        formFile.append('ownership', this.dialogForm.project_name)
        const data = await resourceUpload('post', null, { data: formFile })
        this.dialogForm.add_datas.push({ attachment_type: 3, attachment_url: data.resource })
        this.fileList = formFile
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } catch (e) {
        this.fileList = []
      }
    },
    exceed() {
      this.$message({
        message: '最多上传一个，如需更换先移除',
        type: 'warning'
      })
    },
    handleRemoveFile(file) {
      const index = this.fileList.findIndex(d => d.url === file.url)
      this.fileList.splice(index, 1)
      this.dialogForm.add_datas.splice(this.dialogForm.add_datas.findIndex(d => d.attachment_url === file.url), 1)
    },
    async lookEcharts() {
      this.dialog = true
      const data = await problemAnalysis('get', null, { params: this.search })
      this.optionDoughnut.series[0].data = data
      this.$nextTick(() => {
        const chartBar = echarts.init(document.getElementById('doughnutChart'))
        chartBar.setOption(this.optionDoughnut)
      })
    },
    beforeAvatarUpload(file) {
      if (!this.dialogForm.project_name) {
        this.videoList = []
        this.$message('请先填写项目名称')
        return
      }
      var list = JSON.parse(JSON.stringify(this.videoList))
      // 获取视频时长
      var url = URL.createObjectURL(file)
      var audioElement = new Audio(url)
      var duration
      var that = this
      this.durationNumber = audioElement.addEventListener(
        'loadedmetadata',
        function(_event) {
          duration = audioElement.duration // 时长为秒，小数
          if (duration > 15) {
            that.$message('上传视频不能超过15秒,请重新上传')
            that.$set(that, 'videoList', list)
            return false
          } else {
            return true
          }
        }
      )
    },
    changeUrl(res) {
      this.dialogForm.add_datas.push({ attachment_type: 2, attachment_url: res.resource })
      this.videoList.push({ url: res.resource })
    },
    handleRemoveVideo(file) {
      const index = this.videoList.findIndex(d => d.url === file.url)
      this.videoList.splice(index, 1)
      this.dialogForm.add_datas.splice(this.dialogForm.add_datas.findIndex(d => d.attachment_url === file.url), 1)
    },
    // 预览视频
    handleVideoPreview(file) {
      this.dialogVideoUrl = file.url
      this.dialogVisibleVideo = true
    },
    onExceed() {
      this.$message.info('最多上传五张图片')
    },
    async onChangeImg(file, fileList) {
      if (!this.dialogForm.project_name) {
        this.objList = []
        this.$message('请先填写项目名称')
        return
      }
      const isJPG = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.raw.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpeg、jpg 、png格式!')
        fileList.pop()
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        fileList.pop()
        return
      }
      const picture = new FormData()
      picture.append('resource', file.raw)
      picture.append('ownership', this.dialogForm.project_name)
      try {
        const data = await resourceUpload('post', null, { data: picture })
        this.objList.push({ url: data.resource })
        this.dialogForm.add_datas.push({ attachment_type: 1, attachment_url: data.resource })
      } catch (e) {
        this.$set(this, 'objList', this.objList)
      }
    },
    handleRemove(file) {
      const index = this.objList.findIndex(d => d.url === file.url)
      this.objList.splice(index, 1)
      this.dialogForm.add_datas.splice(this.dialogForm.add_datas.findIndex(d => d.attachment_url === file.url), 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisibleImg = true
    },
    handleClose(done) {
      if (this.$refs.elUploadImg) {
        this.$refs.elUploadImg.clearFiles()
      }
      this.$refs.dialogForm.resetFields()
      this.dialogVisible = false
      this.disable = false
      if (done) {
        done()
      }
    },
    showAddDialog() {
      this.dialogForm = {}
      this.isLook = false
      this.objList = []
      this.videoList = []
      this.fileList = []
      this.dialogForm.add_datas = []
      this.dialogVisible = true
    },
    showEditDialog(row, val) {
      this.isLook = val
      this.dialogForm = JSON.parse(JSON.stringify(row))
      this.objList = []
      this.videoList = []
      this.fileList = []
      this.dialogForm.add_datas = []
      this.dialogForm.images.forEach(d => {
        this.dialogForm.add_datas.push(
          { attachment_type: 1, attachment_url: d }
        )
      })
      this.dialogForm.videos.forEach(d => {
        this.dialogForm.add_datas.push(
          { attachment_type: 2, attachment_url: d }
        )
      })
      this.dialogForm.files.forEach(d => {
        this.dialogForm.add_datas.push(
          { attachment_type: 3, attachment_url: d }
        )
      })
      this.dialogForm.images.forEach(d =>
        this.objList.push({ url: d })
      )
      this.dialogForm.videos.forEach(d =>
        this.videoList.push({ url: d })
      )
      this.dialogForm.files.forEach(d =>
        this.fileList.push({ url: d })
      )
      this.dialogVisible = true
    },
    submitFun() {
      this.$refs.dialogForm.validate(async(valid) => {
        if (valid) {
          try {
            this.btnLoading = true
            const _api = this.dialogForm.id ? 'put' : 'post'
            await problem(_api, this.dialogForm.id || null, { data: this.dialogForm })
            this.$message.success('操作成功')
            this.handleClose(null)
            this.getList()
            this.btnLoading = false
          } catch (e) {
            this.btnLoading = false
          }
        } else {
          return false
        }
      })
    },
    async getStatus(val) {
      if (val) {
        try {
          const data = await globalCodes('get', null, { params: { all: 1, class_name: '项目问题状态' }})
          this.statusList = data.results || []
        } catch (e) {
        //
        }
      }
    },
    async getOptionsSection(val) {
      if (val) {
        try {
          const data = await globalCodes('get', null, { params: { all: 1, class_name: '项目问题部门' }})
          this.sectionList = data.results || []
        } catch (e) {
        //
        }
      }
    },
    async getList() {
      try {
        this.loading = true
        const data = await problem('get', null, { params: this.getParams })
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
    changeDate(arr) {
      this.getParams.raise_date_after = arr ? arr[0] : ''
      this.getParams.raise_date_before = arr ? arr[1] : ''
      this.changeList()
    },
    exportFun() {
      this.btnExportLoad = true
      const obj = Object.assign({ export: 1 }, this.getParams)
      const _api = problem
      _api('get', null, { params: obj })
        .then(res => {
          window.open(process.env.VUE_APP_URL + res.url, '_self')
          this.btnExportLoad = false
        }).catch(e => {
          this.btnExportLoad = false
        })
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
    Upload(param) {
      const formData = new FormData()
      formData.append('import_file', param.file)
      problemImportExcel('post', null, { data: formData }).then(response => {
        this.$message({
          type: 'success',
          message: response
        })
        this.getList()
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

