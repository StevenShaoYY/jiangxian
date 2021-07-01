<template>
  <view class="map-container">
    <button class="btn" @click="scanxiaofei">
      江鲜消费券
    </button>
    <button class="btn" @click="scan">
      江鲜啤酒券
    </button>
    <!-- <view style="text-align:center;font-size:29rpx;padding:25rpx 0;font-weight:700;">核销记录</view>
    <view style="margin:0 25rpx;" v-for="(item, index) of list" :key="index">
      <span>{{item.time}}</span>
      <span style="margin-left:30rpx">{{item.msg}}</span>
    </view> -->
    <!-- <input type="text" v-model="Vcode">
    <button class="btn" @click="scan2">
      手动核销
    </button> -->
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import {hexiao} from '@/api/device';
export default {
  data() {
    return {
      list:uni.getStorageSync('hexiao')||[],
      Vcode:''
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  mounted() {
    console.log(this.list.length)
    // if( this.list.length!=0) {
    //   console.log(this.list)
    //   this.list = JSON.parse(this.list)
    // }
    // this.setDeviceList()
  },
  methods: {
    scanxiaofei(){
      uni.navigateTo({
         url: '/pages/hexiaopic/index'
      });
    },
    formatDateTime  (date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h=h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                var second=date.getSeconds();
                second=second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            },
    scan2(){
      hexiao({code:this.Vcode}).then(res => {
            console.log(res)
            if(res.code==200) {
              this.list.push({
                time:this.formatDateTime(new Date()),
                msg:'核销成功'
              })
              uni.showToast({
                title: '核销成功',
                duration: 20000
              });
            } else {
              this.list.push({
                time:this.formatDateTime(new Date()),
                msg:res.message || res.result
              })
              uni.showToast({
                title: res.message || res.result,
                icon:'none',
                duration: 20000
              });
            }
            console.log(this.list)
            uni.setStorageSync('hexiao', this.list);
          
            
          })
    },
    scan(){
      uni.scanCode({
        onlyFromCamera:true,
        scanType:[
          'qrCode','barCode'
        ],
        success:(e)=>{
          console.log(e)
          hexiao({code:e.result}).then(res => {
            console.log(res)
            if(res.code==200) {
              this.list.push({
                time:this.formatDateTime(new Date()),
                msg:'核销成功'
              })
              uni.showToast({
                title: '核销成功',
                duration: 20000
              });
            } else {
              this.list.push({
                time:this.formatDateTime(new Date()),
                msg:res.message || res.result
              })
              uni.showToast({
                title: res.message || res.result,
                icon:'none',
                duration: 20000
              });
            }
            console.log(this.list)
            uni.setStorageSync('hexiao', this.list);
          })
        },
        fail:(e)=>{
          // console.log(e)
           uni.showToast({
                title: '对不起，核销失败!',
                icon:'none',
                duration: 2000
              });
        }
      })
    }
  },
  components: {
    tabBar
  }
}
</script>

<style lang="scss">
.map-container {
  width: 750rpx;
  height: 70vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .btn{
    margin: 50rpx 20rpx;
  }
}
</style>