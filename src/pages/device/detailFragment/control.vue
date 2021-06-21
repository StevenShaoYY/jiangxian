<template>
  <view class="control-container page-padding">
    <view class="history-instructions" @click="toInstruction">
      历史指令列表
    </view>
    <view class="cmd-dropdown">
      <view
        class="form-select"
        v-model="currentCmd.value"
        @click="showCmdPicker()"
      >
        <span v-if="currentCmd.value">{{ currentCmd.name }}</span>
        <span
          v-if="!currentCmd.value"
          style="color:grey;"
        >
          {{ `请选择指令` }}
        </span>
      </view>
      <picker-pro
        :visible.sync="cmdDropdownVisible"
        :pickerArrayList="[cmdList]"
        :propsList="[['name']]"
        @getValue="getCmdPickerValue"
      />
    </view>
    <view class="form-wrap">
      <uni-forms
        v-if="isFormReady"
        ref="form"
        :value="formData"
        :rules="rules"
      >
        <uni-forms-item
          class="uni-forms-item"
          v-for="(item, index) in dynamicFormConfig"
          :key="index"
          :label="item.label"
          :name="item.name"
          :required="item.isRequired"
          validate-trigger="bind"
        >
          <uni-easyinput
            v-if="item.formItemType === 'input'"
            type="text"
            v-model="formData[item.name]"
            :placeholder="`请输入${item.label}`"
          />
          <view v-if="item.formItemType === 'dropdown'">
            <view
              class="form-select"
              v-model="formData[item.name]"
              @click="showPicker(item)"
            >
              <span :class="{'placeholder': !hasValue(item)}">
                {{ getValueTypeName(item) }}
              </span>
            </view>
            <picker-pro
              v-if="item.pickerVisible"
              :key="index"
              :visible.sync="item.pickerVisible"
              :pickerArrayList="[item.dropdownArr]"
              :propsList="[['desc']]"
              @getValue="getPickerValue"
            />
          </view>
          <slider
            v-if="item.formItemType === 'slider'"
            class="form-slider"
            activeColor="#1879FF"
            v-model="formData[item.name]"
            @change="sliderChange"
            @changing="getSliderInfo(item)"
            :min="item.sliderConfig.min"
            :max="item.sliderConfig.max"
            show-value
          />
        </uni-forms-item>
        <button
          class="base-btn send-btn"
          type="primary"
          @click="handleSubmit('form')"
        >
          发送
        </button>
      </uni-forms>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import * as deviceApi from '@/api/device';
import pickerPro from '../../components/pickerPro';
export default {
  data() {
    return {
      cmdList: [],
      cmdParams: [],
      currentCmd: {
        name: '',
        value: ''
      },
      cmdDropdownVisible: false,
      isFormReady: false,
      dynamicFormConfig: [
        {
          label: 'SetBridge',
          name: 'bridge',
          isRequired: true,
          formItemType: 'input'
        },
        {
          label: 'SetSwitch',
          name: 'switch',
          isRequired: true,
          formItemType: 'dropdown',
          pickerVisible: false,
          dropdownArr: [
            {
              typeName: '测试1',
              id: 1
            },
            {
              typeName: '测试2',
              id: 2
            },
            {
              typeName: '测试3',
              id: 3
            }
          ]
        },
        {
          label: 'SetTemperature1',
          name: 'temperature1',
          isRequired: true,
          formItemType: 'slider'
        },
        {
          label: 'SetTemperature2',
          name: 'temperature2',
          isRequired: true,
          formItemType: 'slider'
        },
        {
          label: 'SetTest',
          name: 'test',
          isRequired: true,
          formItemType: 'dropdown',
          pickerVisible: false,
          dropdownArr: [
            {
              typeName: '不同测试1',
              id: 1
            },
            {
              typeName: '不同测试2',
              id: 2
            },
            {
              typeName: '不同测试3',
              id: 3
            },
            {
              typeName: '不同测试4',
              id: 4
            },
            {
              typeName: '不同测试5',
              id: 5
            }
          ]
        },
      ],
      formData: {},
      rules: {},
      currentSelectItem: {},  // 当前选择框
      currentSliderItem: {}  // 当前进度条
    }
  },
  computed: {
    ...mapGetters(['currentDevicePk', 'currentDeviceDevId']),
    getValueTypeName() {
      return (item) => {
        return item.dropdownArr[this.formData[item.name]] ?
        item.dropdownArr[this.formData[item.name]].desc :
        `请选择${item.label}`
      }
    },
    hasValue() {
      return (item) => {
        return item.dropdownArr[this.formData[item.name]] ?
        true :
        false
      }
    }
  },
  // 自定义验证备用
  // onReady() {
  //   this.$refs.form.setRules(this.rules)
  // },
  created() {
    this.dynamicFormConfig = []
    this.getDeviceParams()
  },
  methods: {
    // 获得设备表格参数
    getDeviceParams() {
      deviceApi.getDeviceParams({pk: this.currentDevicePk}).then(res => {
        console.log('设备参数配置', res);
        if (res[1].statusCode === 200) {
          // 筛选下发指令
          const validCmd = (cmd) => cmd.frameType === 'DEV_DOWN'
          this.cmdList = res[1].data.cmds.filter(validCmd)
          this.cmdParams = res[1].data.params
        }
      })
    },
    // 动态表格 & 验证配置
    setFormAndRules() {
      function createMsg(item) {
        switch(item.formItemType) {
          case 'input':
            return `请输入${item.label}`
          case 'dropdown':
            return `请选择${item.label}`
          case 'slider':
            return `请设置${item.label}`
        }
      }
      this.dynamicFormConfig.forEach(item => {
        // 如果为滑块 设置初始值
        this.$set(this.formData, item.name, item.formItemType === 'slider' ?
          item.sliderConfig.initialValue :
          ''
        )
        this.$set(this.rules, item.name, {
          rules: [
            {
              required: item.isRequired,
              errorMessage: createMsg(item)
            }
          ]
        })
        // 自定义验证备用
        // if (item.formItemType === 'dropdown') {
        //   // delete this.rules[item.name].rules[0].errorMessage
        //   this.rules[item.name].rules.push({
        //     validateFunction: function(rule, value, data, callback) {
        //       console.log('验证value', value);
        //       if (value.length < 10) {
        //         callback('请至少勾选两个兴趣爱好')
        //       }
        //       return true
        //     }
        //   })
        // }
      })
      console.log('生成的表单', this.formData)
      console.log('生成的表单验证', this.rules)
    },
    // 重置表单配置
    resetFormConfig() {
      this.formData = {}
      this.dynamicFormConfig = []
      this.rules = {}
    },
    // 指令选择回调
    getCmdPickerValue(val) {
      // 指令切换 重置表单
      this.resetFormConfig()

      // 回调索引 resIndex
      const resIndex = val[0]
      // 选择回调对应数组值
      const resValue = this.cmdList[resIndex]
      this.currentCmd.value = resValue.cmd
      this.currentCmd.name = resValue.name
      const validParams = resValue.params  // 有效参数
      
      // console.log('有效参数', validParams);

      // 处理参数 动态生成指令表单
      let resParams = []
      validParams.forEach(paramsValid => {
        this.cmdParams.forEach(params => {
          if (params.param === paramsValid) {
            resParams.push({
              label: params.name,
              name: params.param,
              isRequired: true,
              formItemType: this.paramTypeFilter(params.checkType.type),
              pickerVisible: false,
              dropdownArr: params.checkType.values || [],
              get sliderConfig() {
                if (this.formItemType === 'slider') {
                  return {
                    max: params.checkType.max.value,
                    min: params.checkType.min.value,
                    initialValue: Number((params.checkType.max.value / 2).toFixed(0))
                  }
                }
              } 
            })
          }
        })
      })
      // 配置表单
      this.dynamicFormConfig = resParams
      // 配置表单 & 表单验证
      this.setFormAndRules()

      console.log('resParams', resParams);
      
      // 重载表单DOM
      this.isFormReady = false
      this.$nextTick(() => {
        this.isFormReady = true
      })
    },
    // 表单参数类型过滤
    paramTypeFilter(paramType) {
      const typeMap = {
        "ENUM": 'dropdown',
        "LENGTH": 'input',
        "RANGE": 'slider'
      }
      return typeMap[paramType]
    },
    // 选择回调
    getPickerValue(val) {
      const resIndex = val[0]
      this.formData[this.currentSelectItem.name] = this.currentSelectItem.dropdownArr[resIndex].value
    },
    // 指令选择显隐
    showCmdPicker() {
      this.cmdDropdownVisible = true
    },
    // 选择显隐
    showPicker(item) {
      item.pickerVisible = true
      this.currentSelectItem = item
    },
    // 进度条回调
    sliderChange(e) {
      // console.log('slider 发生变化：' + e.detail.value)
      this.formData[this.currentSliderItem.name] = e.detail.value
    },
    // 获取当前进度条
    getSliderInfo(item) {
      this.currentSliderItem = item
    },
    handleSubmit(form) {
      this.$refs[form].submit().then(res => {
        console.log('表单的值：', res)
        const data = {
          pk: this.currentDevicePk,
          devId: this.currentDeviceDevId,
          cmd: this.currentCmd.value,
          params: res,
          source: 'MINI'
        }
        deviceApi.sendInstructions(data).then(res => {
          console.log('指令发送结果', res);
          const statusRes = res[1].data.code
          const messageId = res[1].data.messageId
          uni.showToast({ title: '指令发送成功' })
          setTimeout(() => {
            uni.navigateTo({
              url: `/pages/device/status?status=${statusRes}&messageId=${messageId}`
            })
          }, 800)
        })
      })
      .catch(errors => {
        console.error('验证失败：', errors)
      })
    },
    toInstruction() {
      uni.navigateTo({
        url: '/pages/device/instructionList'
      })
    }
  },
  options: { styleIsolation: 'shared' },
  components: {
    pickerPro
  }
}
</script>

<style lang="scss" scoped>
.control-container {
  width: calc(100% - 76px);
  .history-instructions {
    font-size: 14px;
    color: #000;
    text-decoration: underline;
  }
  .cmd-dropdown {
    padding: 10px 15px;
  }
  // forms-item 样式深度修改
  // 表单label与内容分行
  .uni-forms-item ::v-deep .is-direction-left {
    display: flex;
    flex-direction: column;
  }
  // 清空表单验证提示文字前置padding
  ::v-deep .uni-error-message {
    padding-left: 0 !important;
  }
  .form-select {
    width: 100%;
    height: 36px;
    box-sizing: border-box;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 10px;
    line-height: 36px;
    position: relative;
    font-size: 14px;
    &:after {
      content: "";
      display: block;
      border: 6px solid transparent;
      border-top-color: #e5e5e5;
      position: absolute;
      top: 14px;
      right: 15px;
    }
  }
  .form-slider {
    margin: 10px 0 10px 15px;
  }
  .send-btn {
    margin-top: 50px;
  }
  .border-color-red {
    border-color: 'red'
  }
  .placeholder {
    color: grey;
  }
}
</style>
