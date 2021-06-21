<template>
  <view class="status-container">
    <view class="status-info">
      <view class="status-img" :class="{'skeleton': loading}">
        <img v-if="!loading" :src="statusList[currentStatus].url" />
      </view>
      <view class="status-description" :class="{'skeleton': loading}">{{ statusList[currentStatus].description }}</view>
      <button
        v-if="currentStatus === 1 || currentStatus === 3"
        hover-class="btn-hover"
        class="base-btn"
        plain="true"
        type="primary"
        @click="refresh"
      >
        刷新
      </button>
    </view>
  </view>
</template>

<script>
import * as deviceApi from '@/api/device';
export default {
  onLoad: function(option) {
    this.messageId = option.messageId
    console.log(option.status);
    this.statusFilter(option.status)
  },
  data() {
    return {
      currentStatus: '',
      messageId: '',
      loading: false,
      statusList: [
        {
          url: require('../../static/icon_ok.png'),
          description: '发送成功'
        },
        {
          url: require('../../static/icon_wait.png'),
          description: '等待中...'
        },
        {
          url: require('../../static/icon_error.png'),
          description: '发送失败'
        },
        {
          url: require('../../static/icon_closed.png'),
          description: '网络错误，请重试'
        },
      ]
    }
  },
  methods: {
    refresh() {
      this.loading = true
      deviceApi.cloudSendMsgInfo({messageId: this.messageId}).then(res => {
        console.log('指令状态查询', res);
        if (res[1].statusCode === 200) {
          this.statusFilter(res[1].data.code)
          setTimeout(() => {
            uni.showToast({ title: '刷新成功' })
            this.loading = false
          }, 300);
        }
      })
    },
    statusFilter(status) {
      switch(Number(status)) {
        case 0:
          this.currentStatus = 0
          break
        case 2001:
          this.currentStatus = 1
          break
        case 3003:
          this.currentStatus = 1
          break
        case 2002:
          this.currentStatus = 2
          break
        case 2003:
          this.currentStatus = 3
          break
      }
    }
  }
}
</script>

<style lang="scss">
.status-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-15%);
  .status-info {
    width: 160px;
    height: 120px;
    font-size: 18px;
    text-align: center;
    .status-img {
      width: 100%;
      height: 70px;
      img {
        margin-bottom: 30px;
        width: 65px;
        height: 65px;
        margin: 0 auto;
      }
    }
    .status-description {
      margin-top: 10px;
      width: 100%;
    }
    button {
      padding: 0 8px;
      margin-left: auto;
      background: $uni-color-primary;
      border-color: $uni-color-primary;
      color: #fff;
      margin-top: 50px;
    }
    .btn-hover {
      background: #fff;
      color: $uni-color-primary;
      border-color: $uni-color-primary;
    }
  }
}
</style>