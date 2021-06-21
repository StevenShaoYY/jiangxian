<template>
  <view class="instruction-list-container">
    <view class="instruction-list-wrap page-padding">
      <view
        class="instruction-list-item"
        v-for="(item, index) in instructionList"
        :key="index"
      >
        <view class="instruction-item-title" >
          <view class="instruction-item-title-l" :class="{'skeleton': loading || item.loading}">
            {{ item.cmdName || '' }}
          </view>
          <view class="instruction-item-title-r">
            <button
              class="base-btn refresh-btn"
              :class="{'skeleton': loading || item.loading}"
              plain="true"
              type="primary"
              size="mini"
              @click="refresh(item)"
            >
              刷新
            </button>
          </view>
        </view>
        <view class="instruction-item-info" :class="{'skeleton': loading || item.loading}">标识符：<span>{{ item.cmd || '' }}</span></view>
        <view class="instruction-item-info" :class="{'skeleton': loading || item.loading}">下发状态：<span>{{ item.desc || '' }}</span></view>
        <view class="instruction-item-info" :class="{'skeleton': loading || item.loading}">下发日期：<span>{{ formatDate(item.createTime, 'date') || '' }}</span></view>
        <view class="instruction-item-info" :class="{'skeleton': loading || item.loading}">下发时间：<span>{{ formatDate(item.createTime, 'time') || '' }}</span></view>
      </view>
    </view>
    <load-more v-if="isMoreLoading" />
    <noData v-if="!instructionList.length"></noData>
  </view>
</template>

<script>
import noData from '../../layouts/noData';
import loadMore from '../../layouts/loadMore';
import { mapGetters } from 'vuex';
import * as deviceApi from '@/api/device';
export default {
  data() {
    return {
      instructionList: [],
      loading: true,
      isMoreLoading: false,
      page: 1,
      size: 20
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'currentDevicePk', 'currentDeviceDevId'])
  },
  created() {
    this.getInstructionsHistory({ page: 1, size: this.size })
  },
  onReachBottom() {
    this.loadMore()
  },
  methods: {
    setInstructionList() {
      for(let i = 0; i < 5; i++) {
        this.instructionList.push({
          cmdName: `命令名称${i + 1}`,
          cmd: `标识符${i + 1}`,
          desc: '等待中',
          createTime: '2020-8-19 10:00:00'
        })
      }
    },
    getInstructionsHistory(pageParams) {
      this.loading = true
      this.isLogin && this.setInstructionList()
      const params = {
        pk: this.currentDevicePk,
        devId: this.currentDeviceDevId,
        source: 'MINI',
        ...pageParams
      }
      deviceApi.getInstructionsHistory(params).then(res => {
        console.log('历史指令数据', res);
        if (!!res[1].data.content.length) {
          this.instructionList = res[1].data.content
          this.instructionList.forEach(item => {
            this.$set(item, 'loading', false)
          })
          setTimeout(() => {
            this.loading = false
          }, 300);
        } else {
          setTimeout(() => {
            this.loading = false
            this.instructionList = []
          }, 300);
        }
      })
    },
    loadMore() {
      this.page++
      this.isMoreLoading = true
      const params = {
        pk: this.currentDevicePk,
        devId: this.currentDeviceDevId,
        source: 'MINI',
        page: this.page,
        size: this.size
      }
      deviceApi.getInstructionsHistory(params).then(res => {
        console.log('更多历史指令数据', res);
        if (res[1].statusCode === 200) {
          const more = res[1].data.content
          more.forEach(item => {
            this.$set(item, 'loading', false)
          })
        if (!!more.length) {
          this.instructionList = this.instructionList.concat(more)
        } else uni.showToast({ title: '暂无更多记录', icon: 'none' })
        this.isMoreLoading = false
          setTimeout(() => {
            this.loading = false
          }, 300);
        }
        console.log(this.instructionList);
      })
    },
    refresh(item) {
      item.loading = true
      deviceApi.cloudSendMsgInfo({messageId: item.messageId}).then(res => {
        console.log('指令状态查询', res);
        if (res[1].statusCode === 200) {
          item.desc = res[1].data.desc
          setTimeout(() => {
            item.loading = false
            uni.showToast({ title: '指令刷新成功' })
          }, 300);
        }
      })
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
  components: {
    noData,
    loadMore
  }
}
</script>

<style lang='scss'>
.instruction-list-container {
  .instruction-list-wrap {
    width: calc(100% - 76px);
    display: flex;
    flex-direction: column;
    .instruction-list-item {
      width: 100%;
      // height: 15vh;
      padding: 24px 0;
      border-bottom: 1px solid #F6F7F8;
      font-size: 14px;
      color: #999;
      span {
        color: #000;
      }
      .instruction-item-title {
        display: flex;
        margin-bottom: 12px;
        .instruction-item-title-l {
          float: left;
          font-size: 16px;
          color: #000;
        }
        .instruction-item-title-r {
          text-align: right;
          margin-left: auto;
          button {
            height: 24px;
            line-height: 24px;
            padding: 0 8px;
            margin-left: auto;
            background: $uni-color-primary;
            border-color: $uni-color-primary;
            color: #fff;
          }
        }
      }
      .instruction-item-info {
        width: 80%;
        margin-bottom: 8px;
      }
    }
  }
}
</style>