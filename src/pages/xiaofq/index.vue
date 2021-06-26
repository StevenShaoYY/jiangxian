<template>
  <view class="map-container">
    <image class="back-img" src="../../static/xiaofeiquanbac.png" mode="" />
    
    <image class="title-img" src="../../static/xiaofeiquan-title.png" mode="" />
    <image class="xfq-img" src="../../static/xiaofeiquan2.png" mode="" />
    <send-coupon
      @bindcustomevent="getcoupon"
      :send_coupon_params="send_coupon_params"
      :sign="sign"
      :send_coupon_merchant="send_coupon_merchant"
    >
      <!-- 内部为自定义代码，按钮点击部分的代码写在这里 -->
      <!-- [[以下为示例代码 -->
      <!-- <view class="text">领取</view> -->
      <view class="btn" :style="{background:hasGet==true?'#aaa':'linear-gradient(0deg, #BE6569, #D5B8AF)'}">立即领取</view>

      <!-- 以上为示例代码 ]] -->
    </send-coupon>
    <view class="fenge"></view>
    <view class="word2">
      用户领取规则：</view>
    <view class="word">    &nbsp;&nbsp;   7月6日-7月10日，每日10:00开启江鲜优惠券发放，进入云享江鲜大会平台“江鲜券领取页面”，在线领“江鲜消费券”。</view>
    <view class="word">    &nbsp;&nbsp;   消费券自动存入微信卡包，可用于场口镇各民宿、江鲜馆、农特产品店等消费；结账时，向商家出示券码，当场抵扣现金。</view>
    <view class="word"> &nbsp;&nbsp;&nbsp;&nbsp;  可使用商家：</view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import * as deviceApi from '@/api/device';
export default {
  data() {
    return {
      latitude:29.890874,
      longitude:119.830751,
      hasGet:false,
      covers:[{
        latitude:29.890874,
        longitude:119.830751,
        iconPath:'../../static/location.png'
      }],
      send_coupon_params:[{
        "stock_id": "1209180000000032",
        "out_request_no": "89560002019101000121"
      }],
      sign:'9A0A8659F005D6984697E2CA0A9CF3B79A0A8659F005D6984697E2CA0A9CF3B7',
      send_coupon_merchant:'1611206957'
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  created() {
    // this.setDeviceList()
  },
  methods: {
    getXiaofq(){
      this.hasGet = true
    },
    getcoupon(params) {
      // 插件返回信息在params.detail
      console.log('getcoupon', params)
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
  .back-img{
    width: 750rpx;
    height: 832rpx;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
  }
  .title-img{
    width:472rpx;
    margin-top:49rpx;
    margin-left: 139rpx;
    height: 173.3rpx;
  }
  .xfq-img{
     width:616rpx;
    margin-top:49rpx;
    margin-left: 67rpx;
    height: 279rpx;
  }
  .btn{
  width: 215rpx;
   line-height: 62rpx;
   text-align: center;
   margin-left: 267.5rpx;
   margin-top: 24rpx;
height: 62rpx;
color: #fff;
font-size: 25rpx;
font-family: Microsoft YaHei;
font-weight: 400;
//background: linear-gradient(0deg, #BE6569, #D5B8AF);
box-shadow: 0px 4rpx 5rpx 0px rgba(124, 124, 124, 0.31);
border-radius: 30rpx;
  }
  .fenge{
    height: 1rpx;
    width: 486rpx;
    background-color: #666;
    margin-top: 62rpx;
    margin-left: 132rpx;
    margin-bottom: 60rpx;
  }
  .word2{
    width: 631rpx;
    margin-left: 59rpx;
    font-size: 20rpx;
    margin-top: 20rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    line-height: 30rpx;
  }
  .word{
    width: 631rpx;
    margin-left: 59rpx;
    font-size:20rpx;
    margin-top: 10rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    line-height: 30rpx;
    text-indent:20rpx;
  }
}
</style>