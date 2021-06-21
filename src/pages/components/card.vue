<template>
  <view class="card-wrap">
    <view class="card-info">
      <view class="card-info-l" @click="!loading ? toDetail(0) : null">
        <view class="card-info-title" :class="{'skeleton': loading}">设备名称：<span>{{ itemData.name || '' }}</span></view>
        <view class="card-info-title" :class="{'skeleton': loading}">设备ID：<span>{{ itemData.devId || '' }}</span></view>
        <view class="card-info-title" :class="{'skeleton': loading}">设备状态：<span>{{ itemData.online || '' }}</span></view>
        <view class="card-info-title" :class="{'skeleton': loading}">所属产品：<span>{{ itemData.product || '' }}</span></view>
      </view>
      <view class="card-info-r">
        <view
          class="card-info-type"
          :class="{'skeleton': loading}"
          :style="{'color': setColor(itemData.deviceType)}"
        >
          {{ itemData.deviceType || '' }}
        </view>
      </view>
    </view>
    <view class="card-operation">
      <button size="mini" plain="true" hover-class="btn-hover" @click="toDetail(2)" :class="{'skeleton': loading}">调试</button>
      <button size="mini" plain="true" hover-class="btn-hover" @click="toDetail(1)" :class="{'skeleton': loading}">历史记录</button>
      <button size="mini" plain="true" hover-class="btn-hover" @click="toDetail(0)" :class="{'skeleton': loading}">监控</button>
    </view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setColor() {
      return function(type) {
        switch(type) {
          case '普通设备':
            return '#1879FF'
          case '终端设备':
            return '#FA8C16'
          case '网关设备':
            return '#FFC371'
          case '中继设备':
            return '#fe9b8e'
        }
      }
    }
  },
  methods: {
    ...mapMutations(['SET_CURRENT_DEVICE']),
    toDetail(fragmentIndex) {
      // console.log('itemData.pk', this.itemData.pk);
      this.SET_CURRENT_DEVICE(this.itemData)
      uni.navigateTo({
        url: `/pages/device/detail?fragmentIndex=${fragmentIndex}`
      })
    }
  }
}
</script>

<style lang="scss">
.card-wrap {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #F6F7F8;
  margin-bottom: 5px;
  .card-info {
    display: flex;
    .card-info-l {
      display: flex;
      flex-direction: column;
      width: 70%;
      padding-top: 8px;
      .card-info-title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        span {
          color: #000
        }
      }
    }
    .card-info-r {
      width: 30%;
      .card-info-type {
        width: 70px;
        float: right;
        margin-top: 8px;
        text-align: right;
        font-size: 16px;
        font-weight: bold;
        color: $uni-color-primary;
      }
    }
  }
  .card-operation {
    height: 30px;
    text-align: right;
    margin-bottom: 8px;
    button {
      margin-left: 10px;
      height: 24px;
      line-height: 24px;
      padding: 0 8px;
      color: $uni-color-primary;
      border-color: $uni-color-primary;
    }
    .btn-hover {
      background: $uni-color-primary;
      color: #fff;
    }
  }
}
</style>