<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <template v-if="!advanced">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="编号">
                  <a-input v-model="queryParam.pointNum" placeholder="请输入编号" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="航路点名称">
                  <a-input v-model="queryParam.pointName" placeholder="请输入航路点名称" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                  <a-button type="primary" @click="()=>{this.loading_search=true;query()}" :loading="loading_search">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'" />
                  </a>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </template>
        <template v-else>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="编号">
                  <a-input v-model="queryParam.pointNum" placeholder="请输入编号" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="航路点名称">
                  <a-input v-model="queryParam.pointName" placeholder="请输入航路点名称" />
                </a-form-item>
              </a-col>

              <a-col :md="8" :sm="24">
                <a-form-item label="类型">
                  <a-select v-model="queryParam.pointType" placeholder="请选择类型" default-value="0">
                    <a-select-option :value="item.value" v-for="(item,key) in select_point_type" :key="key">{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="起始经度">
                  <a-row :gutter="8">
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLngStart1" type="number" />
                    </a-col>
                    <a-col :span="2">
                      度
                    </a-col>
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLngStart2" type="number" />
                    </a-col>
                    <a-col :span="2">
                      分
                    </a-col>
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLngStart3" type="number" />
                    </a-col>
                    <a-col :span="2">
                      秒
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="结束经度">
                  <a-row :gutter="6">
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLngEnd1" type="number" />
                    </a-col>
                    <a-col :span="2">
                      度
                    </a-col>
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLngEnd2" type="number" />
                    </a-col>
                    <a-col :span="2">
                      分
                    </a-col>
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLngEnd3" type="number" />
                    </a-col>
                    <a-col :span="2">
                      秒
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="状态">
                  <a-select v-model="queryParam.pointStatus" placeholder="请选择状态" default-value="0">
                    <a-select-option :value="item.value" v-for="(item,key) in select_point_status" :key="key">{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="48">

              <a-col :md="8" :sm="24">
                <a-form-item label="起始纬度">
                  <a-row :gutter="6">
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLatStart1" type="number" />
                    </a-col>
                    <a-col :span="2">
                      度
                    </a-col>
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLatStart2" type="number" />
                    </a-col>
                    <a-col :span="2">
                      分
                    </a-col>
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLatStart3" type="number" />
                    </a-col>
                    <a-col :span="2">
                      秒
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="结束纬度">
                  <a-row :gutter="6">
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLatEnd1" type="number" />
                    </a-col>
                    <a-col :span="2">
                      度
                    </a-col>
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLatEnd2" type="number" />
                    </a-col>
                    <a-col :span="2">
                      分
                    </a-col>
                    <a-col :span="6">
                      <a-input v-model="queryParam2.pointLatEnd3" type="number" />
                    </a-col>
                    <a-col :span="2">
                      秒
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="显示文字">
                  <a-input v-model="queryParam.textDisplay" placeholder="请输入显示文字" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                  <a-button type="primary" @click="query()">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => {this.queryParam = {};this.queryParam2={}}">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'" />
                  </a>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </template>

      </div>

      <d-form :title="form_title" :box_style="{  label_col: 6,wrapper_col: 17}" v-model="form_show" :col_num="2" :config="form_config" :init_data_fun="form_init_data" :get_data_fun="form_get_data" @ok_back="query()">
        <template #pointLng>
          <a-row :gutter="8">
            <a-col :span="6">
              <a-input v-model="lng.du" type="number" />
            </a-col>
            <a-col :span="2">
              度
            </a-col>
            <a-col :span="6">
              <a-input v-model="lng.fen" type="number" />
            </a-col>
            <a-col :span="2">
              分
            </a-col>
            <a-col :span="6">
              <a-input v-model="lng.miao" type="number" />
            </a-col>
            <a-col :span="2">
              秒
            </a-col>
          </a-row>
        </template>
        <template #pointLat>
          <a-row :gutter="8">
            <a-col :span="6">
              <a-input v-model="lat.du" type="number" />
            </a-col>
            <a-col :span="2">
              度
            </a-col>
            <a-col :span="6">
              <a-input v-model="lat.fen" type="number" />
            </a-col>
            <a-col :span="2">
              分
            </a-col>
            <a-col :span="6">
              <a-input v-model="lat.miao" type="number" />
            </a-col>
            <a-col :span="2">
              秒
            </a-col>
          </a-row>
        </template>

      </d-form>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd2">新建</a-button>
        <a-dropdown v-if="hasSelected">
          <a-menu slot="overlay" @click="delete_all">
            <a-menu-item key="1">
              <a-icon type="delete"/>删除
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px" >
            批量操作
          <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
  
      <template>
        <a-table size="default" :loading='query_loading' :columns="columns_config" :data-source="query_data" :pagination="page" rowKey='pointId'
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <template #pointType="text, scope">
            <span>
              {{pointTypeMap[scope.pointType] || scope.pointType}}
            </span>
          </template>
          <template #pointStatus="text, scope">
            <span>
              {{pointStatusMap[scope.pointStatus] || scope.pointStatus}}
            </span>
          </template>
          <template #pointLng="text, scope">
            <span>
              {{get_coord(scope.pointLng)}}
            </span>
          </template>
          <template #pointLat="text, scope">
            <span>
              {{get_coord(scope.pointLat)}}
            </span>
          </template>
          <template #action="text, scope">
            <template>
              <a @click="handleEdit(scope)">修改</a>
              <a-divider type="vertical" />
              <a @click="delete_one(scope)">删除</a>
            </template>
  
          </template>
        </a-table>
      </template>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { dForm } from '@/easyComponents'
import { getRoleList, getServiceList } from '@/api/manage'
import page from '@/utils/page'

import StepByStepModal from '@/views/list/modules/StepByStepModal'
// import CreateForm from '@/views/list/modules/CreateForm'
import { GetDict, AirPointSave,AirPointQuery,AirPointDelete } from '@/api/airRoute'
// import D_form from '@/components/d_form.vue'
var form_config = [
  { "name": "pointNum", "label": "编号", rule: "not_empty", required: true, placeholder: "请输入编号" },
  { "name": "pointName", "label": "航路点名称", required: true, placeholder: "请输入航路点名称", rule: "not_empty" },
  { "name": "pointType", "label": "类型", type: "select", select: [], placeholder: "请选择类型", default_value: undefined },
  { "name": "pointStatus", "label": "状态", type: "select", select: [], placeholder: "请选择状态", default_value: undefined },
  { "name": "pointX", "label": "X坐标", placeholder: "请输入X坐标", rule: "point2", required: true, input_type: "number" },
  { "name": "pointY", "label": "Y坐标", placeholder: "请输入Y坐标", rule: "point2", required: true, input_type: "number" },
  { "name": "pointLng", "label": "经度", type: "slot", rule: "lng_model", required: true },
  { "name": "pointLat", "label": "纬度", type: "slot", rule: "lng_model", required: true },
  { "name": "textDisplay", "label": "显示文字", placeholder: "请输入显示文字", rule: "not_empty", required: true, },
  { "name": "textAng", "label": "文字角度", placeholder: "请输入文字角度", rule: "not_empty", required: true, },
  { "name": "borderColor", "label": "边框颜色", placeholder: "请输入边框颜色", rule: "not_empty", required: true, },
  { "name": "borderStyle", "label": "边框样式", type: "select", select: [], default_value: undefined, placeholder: "请输入边框样式" },
  { "name": "bgColor", "label": "背景颜色", placeholder: "请输入背景颜色", rule: "not_empty", required: true, },
  { "name": "transp", "label": "透明度", placeholder: "请输入透明度", rule: "not_empty", required: true, },
]


var columns_config = [
  { title: "编号", dataIndex: "pointNum"},
  { title: "航路点名称", dataIndex: "pointName"},
  { title: "类型", dataIndex: "pointType", scopedSlots: { customRender: "pointType" } },
  { title: "状态", dataIndex: "pointStatus", scopedSlots: { customRender: "pointStatus" } },
  { title: "经度", dataIndex: "pointLng", scopedSlots: { customRender: "pointLng" } },
  { title: "纬度", dataIndex: "pointLat", scopedSlots: { customRender: "pointLat" } },
  { title: "显示文字", dataIndex: "textDisplay" },
  { title: "操作", dataIndex:"action",scopedSlots: { customRender: "action" } }
]

export default {
  name: 'airRoute',
  components: {
    Ellipsis,
    StepByStepModal,
    dForm,
  },
  data () {
    return {
      form_type: "post",
      form_show: false,
      form_title: "新建",
      form_config: null,
      demo_show: false,
      query_data: [],
      query_loading: false,
      // create model
      AirStatus: {},
      AirBorderType: {},
      AirType: {},

      loading: true,
      form: {},
      formMsg: {},
      formMsgBg: {
        pointNum: "",
        pointName: "",
        pointType: "",
        pointStatus: "",
        pointLng1: "",
        pointLng2: "",
        pointLng3: "",
        pointLat1: "",
        pointLat2: "",
        pointLat3: "",
        textDisplay: "",
        textAng: "",
        borderStyle: "",
        borderColor: "",
        bgColor: "",
        transp: "",
        pointX: "",
        pointY: "",
      },
      // form_title: "",
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      queryParam2: {},

      // // 加载数据方法 必须为 Promise 对象
      // loadData: parameter => {
      //   const requestParameters = Object.assign({}, parameter, this.queryParam)
      //   console.log('loadData request parameters:', requestParameters)
      //   return getServiceList(requestParameters)
      //     .then(res => {
      //       return res.result
      //     })
      // },
      selectedRowKeys: [],
      selectedRows: [],
      lng: {
        du: "",
        fen: "",
        miao: "",
      },
      lat: {
        du: "",
        fen: "",
        miao: "",
      },
      columns_config: columns_config,
      page: page(this.query),
      pointTypeMap: {},
      pointStatusMap: {},
      form_item:{},

      select_point_status:[],
      select_point_type:[],
      loading_search:false

    }
  },
  created () {
    getRoleList({ t: new Date() })
  },
 computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    changeXY (d, idx) {
      // console.log("d,indx", d, idx)
      if (d.length == 7) {
        if (idx == 0) {
          return d.substring(0, 3)
        } else if (idx == 1) {
          return d.substring(3, 5)
        } else if (idx == 2) {
          return d.substring(5, 7)
        } else {
          return ""
        }
      } else {
        return ""
      }
    },
    form_get_data (data) {
      return new Promise((ok, bad) => {
        console.log("form last data", data)
        // post数据
        if(this.form_type=="post"){
          data.pointId=0
        }else{
          data.pointId = this.form_item.pointId
        }
        console.log("put data",data,this.form_item)
        AirPointSave(data).then(res => {
            ok()
          }).catch(err => { bad() })
      })
    },
    form_init_data () {
      // form.form_data = form_data
      return new Promise((ok, bad) => {
        if(this.form_type == "post"){
          this.lng.du = ""
          this.lng.fen = ""
          this.lng.miao = ""
          this.lat.du = ""
          this.lat.fen = ""
          this.lat.miao = ""
          ok({})
        }else{
          let item= this.form_item
          this.lng.du = this.changeXY(item.pointLng,0)
          this.lng.fen = this.changeXY(item.pointLng,1)
          this.lng.miao = this.changeXY(item.pointLng,2)
          this.lat.du = this.changeXY(item.pointLat,0)
          this.lat.fen = this.changeXY(item.pointLat,1)
          this.lat.miao = this.changeXY(item.pointLat,2)
          ok({...item})
        }
      })
    },
    handleAdd2 () {
      console.log("will show")
      this.form_type = "post"
      this.form_title = "新建"
      this.form_show = true
    },
    handleEdit (record) {
      this.form_title = "修改"
      this.form_type = "put"
      this.form_item = record
      this.form_show = true
    },

    handleSub (record) {
      this.$confirm({
        title: `是否确认删除编号为[ ${record.no} ] 的航路点`,
        // content: 'Some descriptions',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log('OK');
        },
        onCancel () {
          console.log('Cancel');
        },
      });
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log("select row key",selectedRowKeys,selectedRows)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },


    //
    initForm () {
      return new Promise((ok, bad) => {
        GetDict("AirPointType").then(res => {
          if (res.status == 200) {
            let select_data = []
            let default_value = null
            res.data.forEach(el => {
              select_data.push({ "value": el.DictKey, "name": el.DictValue })
              if (el.IsDefault == 1) {
                default_value = el.DictKey
              }
              this.pointTypeMap[el.DictKey] = el.DictValue
            })
            form_config[2].select = select_data
            form_config[2].default_value = default_value
            this.select_point_type = select_data
            GetDict("AirPointStatus").then(res => {
              if (res.status == 200) {
                let select_data = []
                let default_value = null
                res.data.forEach(el => {
                  select_data.push({ "value": el.DictKey, "name": el.DictValue })
                  if (el.IsDefault == 1) {
                    default_value = el.DictKey
                  }
                  this.pointStatusMap[el.DictKey]=el.DictValue
                })
                form_config[3].select = select_data
                form_config[3].default_value = default_value
                this.select_point_status = select_data
                GetDict("BorderStyle").then(res => {
                  if (res.status == 200) {
                    let select_data = []
                    let default_value = null
                    res.data.forEach(el => {
                      select_data.push({ "value": el.DictKey, "name": el.DictValue })
                      if (el.IsDefault == 1) {
                        default_value = el.DictKey
                      }
                    })
                    form_config[11].select = select_data
                    form_config[11].default_value = default_value
                    ok()
                  } else {
                    bad()
                  }
                })
              } else {
                bad()
              }
            })
          } else {
            bad()
          }
        })
      })
    },
    form_lng_rule (data, rule) {
      let du = this.lng.du
      let fen = this.lng.fen
      let miao = this.lng.miao
      if (du == "") {
        return ["", "度不能为空"]
      }
      if (fen == "") {
        return ["", "分不能为空"]
      }
      if (miao == "") {
        return ["", "秒不能为空"]
      }
      if (du < -180 || du > 180) {
        return ["", "度取值范围 -180~180"]
      } else if (fen < 0 || fen > 59) {
        return ["", "分取值范围 0~59"]
      } else if (miao < 0 || miao > 59) {
        return ["", "秒取值范围 0~59"]
      } else {
        let d = this.getDu(du) + this.getFen(fen) + this.getFen(miao)
        // console.log(d)
        return [d, ""]
      }
    },
    getDu (d) {
      if (d < 10) {
        return "00" + d
      } else if (d < 100) {
        return "0" + d
      } else {
        return "" + d
      }
    },
    getFen (d) {
      if (d < 10) {
        return "0" + d
      } else {
        return "" + d
      }
    },
    form_rule_point2 (data, rule) {
      // console.log("point2", data, rule)
      if (/^\d+(\.\d{1,2})?$/.test(data)) {
        return [Number(data), ""]
      } else {
        return [data, "请输入有效两位小数数字"]
      }
    },
    //搜索
    query () {
      return new Promise((ok, bad) => {
        let page_ = {pageSize:this.page.pageSize,pageIndex:this.page.current}
        this.searchCoodr()
        console.log("search...",this.queryParam)
        AirPointQuery({...this.queryParam,...page_}).then(res=>{
            if(res.status==200){
              this.query_data = res.data
              ok({size:res.pageSize,total:res.total,current:res.pageIndex})
              console.log("search finish")
              this.loading_search = false
            }else{
              bad()
            }
        }).catch(err=>{
          bad()
        })

      })
    },
    searchCoodr(){
     let pointLng1 = ""+(this.queryParam2.pointLngStart1 || "") + (this.queryParam2.pointLngStart2 || "") +(this.queryParam2.pointLngStart3 || "")
      let pointLng2 = ""+(this.queryParam2.pointLngEnd1||"")  + (this.queryParam2.pointLngEnd2||"") +(this.queryParam2.pointLngEnd3||"") 
      let pointLat1 = ""+(this.queryParam2.pointLatStart1||"")  + (this.queryParam2.pointLatStart2||"") +(this.queryParam2.pointLatStart3||"") 
      let pointLat2 = ""+(this.queryParam2.pointLatEnd1||"")  + (this.queryParam2.pointLatEnd2||"") +(this.queryParam2.pointLatEnd3||"") 
      if(pointLng1!=""){
        this.queryParam.pointLng1 = pointLng1
      }
      if(pointLng2!=""){
        this.queryParam.pointLng2 = pointLng2

      }

      if(pointLat1!=""){
        this.queryParam.pointLat1 = pointLat1
      }
      if(pointLat2!=""){
        this.queryParam.pointLat2 = pointLat2

      }
      console.log("coodr",pointLng1)

    },
    get_coord (d) {
      // console.log(d)
      if (d.length == 7) {
        let r = ""
        r = d.substring(0, 3) + "°"+ d.substring(3, 5) + "′"+ d.substring(5, 7) + "″"
        // console.log(r)
        return r
      } else {
        return d
      }
    },
    delete_all(v){
      console.log("delete....",v)
      var self = this
      if(v.key==1){
        let le= this.selectedRows.length
        let keys=[]
        this.selectedRows.forEach(el=>{
            keys.push(el.pointId)
        })
        console.log("delete...")
        this.$confirm({
          title: `确定删除 ${le} 项？`,
          content: '',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            

            return new Promise((ok,bad)=>{
              AirPointDelete(keys).then(res=>{
                self.selectedRows = []
                self.selectedRowKeys = []
                console.log(res)
                if(res.status==200){
                  ok()
                  self.query() 
                }
              })
              
            })
            
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    },
    delete_one(v){
      let id =v.pointId
      let keys = [id]
      var self = this
      this.$confirm({
          title: `确定删除 ${v.pointName} ？`,
          content: '',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            return new Promise((ok,bad)=>{ok(
              AirPointDelete(keys).then(res=>{
                console.log(res)
                if(res.status==200){
                  self.query()  
                  ok()          
                }
              })
            )})
            
            
          },
          onCancel() {
            console.log('Cancel');
          },
        });

    }
  },
  mounted () {
    // this.GetAirStatus()
    console.log("mounted main..")
    // this.form_config = form_config
    this.initForm().then(res => {
      form_config[6].lng_model = this.form_lng_rule
      form_config[4].point2 = this.form_rule_point2
      this.form_config = form_config
      this.query()
    })


  }

}
</script>



