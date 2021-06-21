<template>
  <view class="history-container page-padding">
    <view class="date-picker-wrap">
      <view class="date-picker-wrap-sub page-padding">
        <uni-datetime-picker
          class="date-picker"
          type="date"
          :value="date"
          start="2020-2-31"
          end="2025-2-30"
          @change="dateChange"
        />
      </view>
    </view>
    <view
      class="history-list-item"
      v-for="(item, index) in historyList"
      :key="index"
    >
      <view class="device-info-l">
        <view
          class="device-info-item"
          :class="{'skeleton': loading}"
          v-for="(itemSub, indexSub) in item.paramItem"
          :key="indexSub"
        >
          {{ itemSub.name }}：<span>{{ itemSub.value }}</span>
        </view>
        <!-- <view class="device-info-item">亮度：<span>{{ item.light }}</span></view>
        <view class="device-info-item">事件：<span>{{ item.event }}</span></view> -->
      </view>
      <view class="device-info-r">
        <view class="device-info-date" :class="{'skeleton': loading}">{{ formatDate(item.time) }}</view>
      </view>
    </view>
    <load-more v-if="isMoreLoading" />
    <noData v-if="!historyList.length"></noData>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import noData from '../../../layouts/noData';
import loadMore from '../../../layouts/loadMore';
import * as deviceApi from '@/api/device';

const DAY_SECONDS = 1 * 24 * 60 * 60 * 1000

export default {
  data() {
    return {
      historyList: [],
      date: new Date().toLocaleDateString(),
      loading: true,
      isMoreLoading: false,
      page: 1,
      size: 20,
      startTime: 0,
      endTime: 0
    }
  },
  computed: {
    ...mapGetters(
      [
        'isLogin',
        'currentDevicePk',
        'currentDeviceDevId'
      ]
    )
  },
  created() {
    const timestamp = new Date(this.date).getTime()
    this.startTime = timestamp
    this.endTime = timestamp + DAY_SECONDS
    const params = {
      page: 1,
      size: 20,
      pk: this.currentDevicePk,
      devId: this.currentDeviceDevId,
      startTime: this.startTime,
      endTime: this.endTime,
      action: 'devSend',
      source: 'MINI'
    }
    this.getHistory(params)
  },
  methods: {
    setHistoryList() {
      for(let i = 0; i < 3; i++) {
        this.historyList.push({
          paramItem: [{},{}],
          time: '100',
        })
      }
    },
    getHistory(params) {
      this.loading = true
      this.isLogin && this.setHistoryList()
      deviceApi.getHistory(params).then(res => {
        // console.log('历史数据', res);
        if (res[1].statusCode === 200) {
          this.historyList = res[1].data.map(item => {
            return {
              paramItem: item.paramItems,
              time: item.timestamp
            }
          })
          setTimeout(() => {
            this.loading = false
          }, 300);
        }
      })
    },
    loadMore() {
      this.isMoreLoading = true
      this.page++
      const params = {
        page: this.page,
        size: this.size,
        pk: this.currentDevicePk,
        devId: this.currentDeviceDevId,
        startTime: this.startTime,
        endTime: this.endTime,
        action: 'devSend',
        source: 'MINI'
      }
      deviceApi.getHistory(params).then(res => {
        console.log('历史记录更多接口', res);
        if (res[1].statusCode === 200) {
          const more = res[1].data.map(item => {
            return {
              paramItem: item.paramItems,
              time: item.timestamp
            }
          })
          if (!!more.length) {
            this.historyList = this.historyList.concat(more)
          } else uni.showToast({ title: '暂无更多记录', icon: 'none' })
          this.isMoreLoading = false
          console.log('more', more);
          console.log(this.historyList);
        }
      })
    },
    dateChange(e) {
      // console.log('日期更改', e);
      this.date = e
      const timestamp = new Date(e).getTime()
      this.startTime = timestamp
      this.endTime = timestamp + DAY_SECONDS
      const params = {
        page: 1,
        size: 20,
        pk: this.currentDevicePk,
        devId: this.currentDeviceDevId,
        startTime: this.startTime,
        endTime: this.endTime,
        action: 'devSend',
        source: 'MINI'
      }
      this.getHistory(params)
    },
    formatDate(date, format) {
      var date = new Date(date);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      switch(format) {
        case 'date':
          return YY + MM + DD
        case 'time':
          return hh + mm + ss
        default:
          return YY + MM + DD + " " +hh + mm + ss;
      }
    }
  },
  options: { styleIsolation: 'shared' },
  components: {
    noData,
    loadMore
  }
}
</script>

<style lang="scss">
.history-container {
  width: calc(100% - 76px);
  .date-picker-wrap {
    width: 100%;
    height: 7vh;
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 70px;
    background: #fff;
    .date-picker-wrap-sub {
      width: 33vw;
      min-width: 130px;
      .date-picker {
        font-size: 14px;
      }
    }
  }
  .history-list-item{
    width: 100%;
    min-height: 5vh;
    display: flex;
    padding: 24px 0;
    border-bottom: 1px solid #F6F7F8;
    font-size: 14px;
    margin-top: 7vh;
    .device-info-l {
      width: 50%;
      display: flex;
      flex-direction: column;
      .device-info-item {
        margin-bottom: 8px;
        color: #999;
        span {
          color: #000;
        }
      }
    }
    .device-info-r {
      width: 50%;
      .device-info-date {
        font-size: 14px;
        color: #999;
        float: right;
      }
    }
  }
  // 隐藏日期选择清空按钮
  ::v-deep .uni-datetime-picker-btn :nth-of-type(1) {
    display: none;
  }
  ::v-deep .uni-datetime-picker-btn-group {
    margin-left: auto;
  }
  ::v-deep .uni-datetime-picker-btn-group :nth-child(1){
    display: block !important;
  }
}
</style>
