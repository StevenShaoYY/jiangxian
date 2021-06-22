<template>
  <view class="user-container">
    <view class="avatar-bar" @click="toLogin">
      <view class="user-avatar"></view>
      <view class="user-name">{{ userInfo.userName || '点击登录' }}</view>
    </view>
    <view class="info-bar">
      <view class="info-bar-l">我的消费券</view>
      <view class="info-bar-r" v-if="isLogin" style="color:#1879FF">{{ deviceNum }}</view>
      <view class="info-bar-r" v-else style="color:#999">登录后查看</view>
    </view>
    <button v-if="isLogin" class="log-out-btn" @click="logout">退出登录</button>
  </view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['userInfo', 'deviceNum', 'isLogin'])
  },
  methods: {
    ...mapActions(['logout']),
    toLogin() {
      if (!this.isLogin) {
        uni.reLaunch({
          url: '/pages/login/index'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.user-container {
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  .avatar-bar {
    width: 100%;
    height: 15vh;
    border-bottom: 1px solid #F6F7F8;
    display: flex;
    margin-top: 5vh;
    .user-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: url('../../static/avatar.png');
    }
    .user-name {
      height: 60px;
      font-size: 18px;
      line-height: 60px;
      margin-left: 12px;
    }
  }
  .info-bar {
    width: 100%;
    height: 8vh;
    margin-top: 5px;
    border-bottom: 1px solid #F6F7F8;
    display: flex;
    line-height: 8vh;
    font-size: 14px;
    .info-bar-l {
      float: left;
    }
    .info-bar-r {
      margin-left: auto;
    }
  }
  .log-out-btn {
    width: calc(100% - 76px);
    position: absolute;
    bottom: 5vh;
  }
}
</style>