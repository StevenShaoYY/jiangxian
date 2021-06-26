<template>
  <view class="user-container">
    <view class="avatar-bar" @click="toLogin">
      <view v-if="!isLogin" class="user-avatar"></view>
      <image v-else class="user-avatar" :src="userInfo.avatarUrl"></image>
      <!-- <view class="user-name">{{ userInfo.userName || '点击登录' }}</view> -->
      <button class="user-name" open-type="getUserInfo" withCredentials="true">{{ userInfo.nickName || '点击登录' }}</button>

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
import {login} from '@/api/device';

export default {
  computed: {
    // ...mapGetters(['userInfo', 'deviceNum', 'isLogin'])
  },
  data() {
    return {
      isLogin:false,
      userInfo:{}
    }
  },
  created(){
    let opind = uni.getStorageSync('openId')
    if(opind&&opind!=='') {
      if(uni.getStorageSync('userInfo')) {
        this.isLogin = true
        this.userInfo = uni.getStorageSync('userInfo')
      }
    }
  },
  methods: {
    logout(){
      uni.removeStorageSync('userInfo');
      uni.removeStorageSync('openId');
        this.isLogin = false
        this.userInfo = {}
    },
    toLogin() {
      if (!this.isLogin) {
        uni.login({
          provider: '',
          success: (res) => {
            login({
              code:res.code
            }).then(res => {
              console.log(111,res)
              uni.setStorageSync('openId', res.result.id);
              uni.getUserInfo({
                provider:"weixin",
                success:(userInfo)=> {
                  console.log(userInfo)
                  this.isLogin = true
                  this.userInfo = userInfo.userInfo
                  uni.setStorageSync('userInfo', this.userInfo);
                },
                fail:(e) => {
                  console.log(e)
                }
              })
            })
          },
          fail: () => {},
          complete: () => {}
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
    border-bottom: 1px solid #d0d2d5;
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
      background-color: #fff;
    }
    button::after{ border: none; }
  }
  .info-bar {
    width: 100%;
    height: 8vh;
    margin-top: 5px;
    border-bottom: 1px solid #d0d2d5;
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
    width: 100%;
    position: absolute;
    bottom: 10rpx;
    left: 0;
    height: 110rpx;
    color: #BE6569;
    background-color: #fff;
  }
  .log-out-btn::after{ border-left: none;
  border-top:1px solid #d0d2d5;
  border-right: none;
  border-bottom: 1px solid #d0d2d5;  }
}
</style>