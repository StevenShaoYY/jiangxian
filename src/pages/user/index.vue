<template>
  <view class="user-container">
    <view class="avatar-bar" @click="toLogin">
      <view v-if="!isLogin" class="user-avatar"></view>
      <image v-else class="user-avatar" :src="userInfo.avatarUrl"></image>
      <!-- <view class="user-name">{{ userInfo.userName || '点击登录' }}</view> -->
      <button class="user-name" open-type="getUserInfo" withCredentials="true">{{ userInfo.nickName || '点击登录' }}</button>

    </view>
    <view class="info-bar">
      <view class="info-bar-l" @click="gotoXiaofei">我的消费券</view>
      <view class="info-bar-r" v-if="isLogin" style="color:#1879FF">{{ deviceNum }}</view>
      <view class="info-bar-r" v-else style="color:#999">登录后查看</view>
    </view>
    <view v-if="isLogin" class="info-bar">
      <button v-if="canHexiao=='unknown'" class="user-hexiao" open-type="getPhoneNumber" @getphonenumber="getphone">消费券核销</button>
      <button v-else class="user-hexiao"  @click="getphone">消费券核销</button>
      
    </view>
    <button v-if="isLogin" class="log-out-btn" @click="logout">退出登录</button>
  </view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {login, setPhone, getInfo, logout} from '@/api/device';

export default {
  computed: {
    // ...mapGetters(['userInfo', 'deviceNum', 'isLogin'])
  },
  data() {
    return {
      isLogin:false,
      userInfo:{},
      canHexiao:'unknown'
    }
  },
  created(){
    let opind = uni.getStorageSync('token')
    if(opind&&opind!=='') {
      if(uni.getStorageSync('userInfo')) {
        this.isLogin = true
        this.userInfo = uni.getStorageSync('userInfo')
      }
    }
  },
  methods: {
    getphone(e){
      if(this.isLogin==false) {
        uni.showToast({
                title: '对不起，请先登陆!',
                icon:'none',
                duration: 2000
              });
        return
      }
      if(this.canHexiao=='unknown') {
        setPhone({
          iv:e.detail.iv,
          encryptedData:e.detail.encryptedData
        }).then(res => {
          if(res.code == 200) {
            getInfo().then(res => {
              console.log(res)
              if(res.result.type == 1) {
                this.canHexiao = true
                uni.navigateTo({
                  url:`/pages/hexiao/index`,
                })
              } else {
                this.canHexiao = false
                uni.showToast({
                  title: '对不起，您不是管理员',
                icon:'none',
                  duration: 2000
                });
              }
            })
          } else {
            uni.showToast({
                  title: res.message,
                icon:'none',
                  duration: 2000
                });
          }
        })
      } else if(this.canHexiao == true) {
        console.log(1111)
        uni.navigateTo({
                  url:`/pages/hexiao/index`,
                })

      } else if (this.canHexiao == false){
        console.log(22222)

         getInfo().then(res => {
              console.log(res)
              if(res.result.type == 1) {
                this.canHexiao = true
                uni.navigateTo({
                  url:`/pages/hexiao/index`,
                })
              } else {
                this.canHexiao = false
                uni.showToast({
                  title: '对不起，您不是管理员',
                  duration: 2000
                });
              }
            })
      }
      
    },
    gotoXiaofei(){
      uni.navigateTo({
        url:`/pages/carddetail/index`,
      })
    },
    logout(){
      logout().then(res => {
          uni.removeStorageSync('userInfo');
      uni.removeStorageSync('token');
        this.isLogin = false
        this.userInfo = {}
      })
      // uni.removeStorageSync('userInfo');
      // uni.removeStorageSync('token');
      //   this.isLogin = false
      //   this.userInfo = {}
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
              uni.setStorageSync('token', res.result);
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
    .user-hexiao{
    float: left;
    font-size: 14px;
    background-color: #fff;
    text-align: left;
    width: 100%;
    padding-left: 0rpx;
    line-height: 8vh;
    }
    .user-hexiao::after{ border: none; }
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