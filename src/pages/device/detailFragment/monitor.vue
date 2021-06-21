<template>
  <view class="monitor-container page-padding">
    <view
      class="monitor-list-item"
      v-for="(item, index) in monitorList"
      :key="index"
    >
      <view class="device-info-item" :class="{'skeleton': loading}">参数：<span>{{ item.param }}</span></view>
      <view class="device-info-item" :class="{'skeleton': loading}">状态值：<span>{{ item.value || '-' }}</span></view>
      <view class="device-info-item" :class="{'skeleton': loading}">参数类型：<span>{{ item.dataType }}</span></view>
      <view class="device-info-item" :class="{'skeleton': loading}">更新日期：<span>{{ item.date || '-' }}</span></view>
      <view class="device-info-item" :class="{'skeleton': loading}">更新时间：<span>{{ item.time || '-' }}</span></view>
    </view>
    <noData v-if="!monitorList.length"></noData>
  </view>
</template>

<script>
import noData from '../../../layouts/noData';
import { mapGetters } from 'vuex';
import * as deviceApi from '@/api/device';
export default {
  data() {
    return {
      monitorList: [],
      loading: true
    }
  },
  props: {
    refresh: Boolean
  },
  watch: {
    refresh: function(n, o) {
      console.log('监控下拉刷新触发');
      if (n) {
        this.getMonitor()
      }
    }
  },
  computed: {
    ...mapGetters(
      [
        'isLogin',
        'currentDevicePk',
        'currentDeviceDevId',
        'productList'
      ]
    ),
    getDate() {
      return (time) => {
        const timeRes = new Date(time).toLocaleString()
        const spacePos = timeRes.indexOf('午') - 1
        return timeRes.slice(0, spacePos)
      }
    },
    getTime() {
      return (time) => {
        const timeRes = new Date(time).toLocaleString()
        const spacePos = timeRes.indexOf('午') - 1
        return timeRes.slice(spacePos, spacePos + 2) + ' ' + timeRes.slice(spacePos + 2, timeRes.length)
      }
    }
  },
  created() {
    this.getMonitor()
  },
  methods: {
    setMonitorList(length) {
      for(let i = 0; i < length; i++) {
        this.monitorList.push({
          param: `power${i + 1}`,
          value: '100',
          dataType: 'int',
          time: ``
        })
      }
    },
    getMonitor() {
      this.loading = true
      deviceApi.getDeviceParams({pk: this.currentDevicePk}).then(res => {
        console.log('设备参数（物模型）', res[1].data.params);
        if (res[1].statusCode === 200) {
          this.monitorList = res[1].data.params.map(param => {
            return {
              param: param.param,
              dataType: param.dataType,
            }
          })
          console.log('监控参数列表', this.monitorList);
          const params = {
            pk: this.currentDevicePk,
            devId: this.currentDeviceDevId
          }
          deviceApi.getMonitor(params).then(resSub => {
            console.log('实时监控数据', resSub);
            if (resSub[1].statusCode === 200) {
              const newest = resSub[1].data.data || null
              const timestamp = resSub[1].data.timestamp
              // console.log('参数最新值', newest.params);
              this.monitorList.forEach(item => {
                // 设置公用时间戳
                if (timestamp) {
                  this.$set(item, 'date', this.getDate(timestamp))
                  this.$set(item, 'time', this.getTime(timestamp))
                }
                // 参数对应赋值
                if (newest && item.param in newest.params) {
                  this.$set(item, 'value', newest.params[item.param])
                }
              })
              // console.log('监控参数列表（处理后）', this.monitorList);
            }
          })
          setTimeout(() => {
            this.loading = false
          }, 300);
        }
      })
    },
    productFilter () {
      return this.productList.find(product => {
        return product.pk === this.currentDevicePk
      })['name']
    }
  },
  components: {
    noData
  }
}
</script>

<style lang="scss">
.monitor-container {
  width: calc(100% - 76px);
  .monitor-list-item{
    width: 100%;
    height: 20vh;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    border-bottom: 1px solid #F6F7F8;
    font-size: 14px;
    .device-info-item {
      width: 70%;
      margin-bottom: 8px;
      color: #999;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        color: #000;
      }
    }
  }
}
</style>
