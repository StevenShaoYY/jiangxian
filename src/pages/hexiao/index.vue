<template>
  <view class="map-container">
    <button class="btn" @click="scan">
      开始核销
    </button>
    <view style="text-align:center;font-size:29rpx;padding:25rpx 0;font-weight:700;">核销记录</view>
    <view style="margin:0 25rpx;" v-for="(item, index) of list" :key="index">
      <span>{{item.time}}</span>
      <span style="margin-left:30rpx">{{item.msg}}</span>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import {hexiao} from '@/api/device';
export default {
  data() {
    return {
      list:uni.getStorageSync('hexiao')||[]
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  created() {
            console.log(this.list.length)
            if( this.list.length!=0) {
              this.list = JSON.parse(this.list)
            }
    // this.setDeviceList()
  },
  methods: {
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
            this.list.push({
              time:this.formatDateTime(new Date()),
              msg:res.message
            })
            console.log(this.list)
            uni.setStorageSync('hexiao', this.list);
             uni.showToast({
                title: res.message,
                icon:'none',
                duration: 20000
              });
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
  height: 100vh;
  overflow: auto;
  .btn{
    margin: 20rpx;
  }
}
</style>