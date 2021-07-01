<template>
  <view class="user-container">
    <view class="avatar-bar">
      <view v-if="!isLogin" class="user-avatar"></view>
      <image v-else class="user-avatar" :src="userInfo.avatarUrl"></image>
      <!-- <view class="user-name">{{ userInfo.userName || '点击登录' }}</view> -->
      <button class="user-name"  @click="toLogin">{{ userInfo.nickName || '点击登录' }}</button>

    </view>
    <view class="info-bar"  @click="gotoXiaofei">
      <view class="info-bar-l">我的消费券</view>
      <view class="info-bar-r" v-if="isLogin" style="color:#ccc">{{ deviceNum }}&nbsp;张</view>
      <view class="info-bar-r" v-else style="color:#999">登录后查看</view>
    </view>
    <view v-if="isLogin" class="info-bar">
      <button v-if="admin!=1" class="user-hexiao" open-type="getPhoneNumber" @getphonenumber="getphone">消费券核销</button>
      <button v-else class="user-hexiao"  @click="getphone">消费券核销</button>
    </view>
    <button v-if="isLogin" class="log-out-btn" @click="logout">退出登录</button>
  </view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {login, setPhone, getInfo, logout, getMiniCouponListFromWx} from '@/api/device';

export default {
  computed: {
    // ...mapGetters(['userInfo', 'deviceNum', 'isLogin'])
  },
  data() {
    return {
      isLogin:false,
      userInfo:{},
      canHexiao:'unknown',
      deviceNum:0,
      admin:0
    }
  },
  created(){
    let opind = uni.getStorageSync('token')
    this.admin = uni.getStorageSync('admin')
    if(opind&&opind!=='') {
      this.isLogin = true
      if(uni.getStorageSync('userInfo')) {
        this.userInfo = uni.getStorageSync('userInfo')
      }
      getInfo().then(res =>{
          this.deviceNum = res.result.couponCount
      })
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
      if(uni.getStorageSync('admin') == 1) {
        uni.navigateTo({
          url:`/pages/hexiao/index`,
        })
        return
      }
      if(this.canHexiao=='unknown') {
        setPhone({
          iv:e.detail.iv,
          encryptedData:e.detail.encryptedData
        }).then(res => {
          if(res.code == 200) {

            getInfo().then(res => {
              uni.setStorageSync('admin',res.result.type )
              console.log(res)
              if(res.result.type == 1) {
                this.admin = 1
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
            if(res.message == '参数为空') {
              uni.showToast({
                  title: '请选择手机号',
                  icon:'none',
                  duration: 2000
              });
            } else {
              uni.showToast({
                  title: res.message,
                  icon:'none',
                  duration: 2000
              });
            }
          }
        })
      } else if(this.canHexiao == true) {
        uni.navigateTo({
                  url:`/pages/hexiao/index`,
                })

      } else if (this.canHexiao == false){
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
      if(this.isLogin==false) {
        return
      }
      uni.navigateTo({
        url:`/pages/carddetail/index`,
      })
    },
    logout(){
      logout().then(res => {
          uni.removeStorageSync('userInfo');
          uni.removeStorageSync('admin')
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
       if(!uni.getStorageSync('userInfo')) {
         uni.getUserProfile({
                desc:'展示用户头像和用户名',
                success:(userInfo)=> {
                  console.log(userInfo)
                  this.userInfo = userInfo.userInfo
                  uni.setStorageSync('userInfo', this.userInfo);
                 
                },
                fail:(e) => {
                  console.log(e)
                }
              })
      }
      
      if (!this.isLogin) {
        uni.login({
          provider: '',
          success: (res) => {
            login({
              code:res.code
            }).then(res => {
              console.log(111,res)
              uni.setStorageSync('token', res.result);
              
                  this.isLogin = true
               getMiniCouponListFromWx({}).then(res =>{
                      this.deviceNum = res.result.totalCount
                  })
              // uni.getUserInfo({
              //   provider:"weixin",
              //   success:(userInfo)=> {
              //     console.log(userInfo)
              //     this.isLogin = true
              //     this.userInfo = userInfo.userInfo
              //     uni.setStorageSync('userInfo', this.userInfo);
              //     getMiniCouponListFromWx({}).then(res =>{
              //         this.deviceNum = res.result.totalCount
              //     })
              //   },
              //   fail:(e) => {
              //     console.log(e)
              //   }
              // })
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
    bottom: 20rpx;
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