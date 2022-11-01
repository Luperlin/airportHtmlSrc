
<template>
  <div>
    <!-- form 模板 直接带入进行选择 -->
    <a-modal :title="title" :width="box_style_.width" :visible="value" :destroyOnClose="true" @cancel="clk_close_form" @ok="clk_ok_form" :confirmLoading="ok_loading">
      <a-spin :spinning="loading">
        <a-form :labelCol="{span:box_style_.label_col}" :wrapperCol="{span:box_style_.wrapper_col}">
          <a-row :gutter="box_style_.gutter" type="flex">
            <a-col :span="box_style_.item_span" v-for="(item,index) in config" :key="index">
              <a-form-item :label="item.label" :required="item.required" :validate-status="form_err[item.name]? 'error':''" :help="form_err[item.name]">
                <template v-if="!item.type">
                  <a-input :placeholder="item.placeholder" v-model="form_data[item.name]" :type="item.input_type" />
                </template>
                <template v-else-if="item.type==='slot'">
                  <slot :name="item.name" :form_item_config="item" :form_data="form_data" ></slot>
                </template>
                <template v-else-if="item.type==='select'">
                  <a-select v-model="form_data[item.name]" :placeholder="item.placeholder">
                    <a-select-option v-for="(sv,sk) in item.select" :key="sk" :value="sv.value">{{sv.name}}</a-select-option>
                  </a-select>
                </template>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>

//=========================================
//校验
//function(value,rule)[value,errmsg]
//@rule = "a,b,c"
//==============
var must_num = function (data, param) {
  let d = Number(data)
  if (d == NaN) {
    return [data, "必须为数字"]
  } else {
    return [d, ""]
  }
}

var valid_not_empty = function (data, param) {
  if (data == "" || data == undefined) {
    return [data, "不能为空"]
  } else {
    return [data, ""]
  }
}

var must_in = function (data, param) {

}
var must_range = function (data, rule) {
  let [_min, _max] = rule.split(",")
  let min = Number(_min)
  let max = Number(_max)
  if ((data > min) && (data < max)) {
    return [data, ""]
  } else {
    return [data, "取值范围为：" + min + "~" + max]
  }

}

var valid_map = {
  "must_num": must_num,
  "not_empty": valid_not_empty,
  "must_in": must_in,
  "must_range": must_range,
}

var valid_fun = {}
//=========================================

var style1 = {
  label_col: 4,
  wrapper_col: 20,
  gutter: 6,
  item_span: 24,
  width: 600,
}
var style2 = {
  width: 800,
  label_col: 5,
  wrapper_col: 18,
  gutter: 1,
  item_span: 12,
}

export default {
  name: "dForm",
  data: function () {
    return {
      // _show:false,
      ok_loading: false,
      names: [],
      loading: true,
      form_data: {},
      form_err: {},
      form_rule: {},
      box_style_: {},
    }
  },
  props: {
    box_style: Object,
    value: Boolean,
    init_data_fun: Function,
    get_data_fun: Function,
    config: Array,
    col_num: Number,
    title: String,
  },
  methods: {
    clk_close_form: function () {
      this.hide()
    },
    clk_ok_form: function () {
      //校验
      // console.log("click ok",this.form_rule,this.form_data)
      // this.form_err = {}
      this.ok_loading = true

      this.clearErr()
      var ok = true
      for (let key in this.form_rule) {
        let ruleList = this.form_rule[key]
        for (let index in ruleList) {
          let [ruleName, ruleParam] = ruleList[index]
          let [value, errMsg] = valid_fun[ruleName](this.form_data[key], ruleParam)
          if (errMsg != "") {
            this.form_err[key] = errMsg
            ok = false
            break
          } else {
            this.form_data[key] = value
          }
        }
      }

      if (!ok) {
        this.ok_loading = false
        return
      }
      console.log("this.form_data",this.form_data)
      this.get_data_fun({...this.form_data}).then(res => {
        this.hide()
        this.ok_back()
      }).finally(_ => {
        this.ok_loading = false
      })
      // this.get_data()
    },
    hide: function () {
      this.$emit('input', false)
    },
    ok_back:function(){
      this.$emit("ok_back")
    },
    clearErr: function () {
      this.names.forEach(el => {
        this.form_err[el] = ""
      })
    },
    clearValue: function () {
      this.init_data()
    },
    init_data () { //初始化
      var form_err = {}
      var form_data = {}
      if (!this.config) {
        return
      }
      this.config.forEach(config => {
        // let config = this.form_config[name]
        let name = config.name
        this.names.push(name)
        //初始化响应式对象
        if (config.type == "select") {
          //select 初始化
          if (config.default_value!=undefined) {
            form_data[name] = config.default_value
          } else {
            form_data[name] = undefined
          }
        } else {
          form_data[name] = ""
        }

        form_err[name] = "";

        if (config.rule) {
          let _ruleList = config.rule.split(";")
          let ruleList = []
          _ruleList.forEach(rel => {
            let [ruleName, ruleParam] = rel.split("=")
            if (config[ruleName]) { //自定义校验函数
              valid_fun[ruleName] = config[ruleName]
            } else if (valid_map[ruleName]) {
              valid_fun[ruleName] = valid_map[ruleName]
            }
            ruleList.push([ruleName, ruleParam || ""])
          })
          this.form_rule[name] = ruleList;
        }
      })
      this.form_data = form_data
      this.form_err = form_err
    }

  },
  watch: {
    value (n, o) {
      this.loading = false
      // return
      if (n) {
        this.init_data_fun().then(data => {
          this.form_data = { ...this.form_data, ...data }
        }).catch(err => {
          console.log(err)
        }).finally(_ => {
          this.loading = false
        })
      } else {
        // 关闭
        this.loading = false
        this.ok_loading = false
        // this.form_err = {}
        this.clearErr()
        this.clearValue()
      }
    },
    config (n, o) {
      if (n) {
        this.init_data()
      }
    }
  },
  mounted: function () {
    console.log(this.box_style)
    let st = {}
    if (this.col_num == 1 || !this.col_num) {
      st = style1
      // this.box_style_ = { ...style1, ...this.box_style }
    } else if (this.col_num == 2) {
      st = style2
      // this.box_style_ = { ...style2, ...this.box_style }
    }
    if (this.box_style) {
      st = { ...st, ...this.box_style }
    }
    // console.log("dform",st)

    this.box_style_ = st
    this.init_data()
  }
}
</script>

<style scoped>
</style>