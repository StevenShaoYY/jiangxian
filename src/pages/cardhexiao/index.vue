<template>
  <view class="map-container">
    <view class="back">
      <view class="title">{{mainName}}</view>
      <view class="name">{{stockName}}</view>
      <view class="codetwo">
        <canvas canvas-id="qrcode" id="qrcode" style="width:360rpx;height:360rpx"/>
      </view>
      <view class="code">{{codeShow}}</view>
      <view class="dot left"></view>
      <view class="dot right"></view>
    </view>
    <view class="detail">
      <view class="detail-title">{{ctype=="EXCHANGE"?"兑换券":"代金券"}}详情</view>
      <view class="da"><span class="da-t">优惠说明</span><span class="da-m">{{des}}</span></view>
      <view class="da"><span class="da-t">有效日期</span><span class="da-m">{{avTime}}</span></view>
      <view class="da"><span class="da-t">可用时段</span><span class="da-m">全天</span></view>
      <view class="da"><span class="da-t">使用须知</span><span class="da-m">{{shiyongxuzhi}}</span></view>

    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';
import CODE  from '@uni-plugs/uni-code';
import {getCouponConfiFromWx} from '@/api/device';
export default {
  data() {
    return {
      code:'',
      stockId:'',
      codeShow:'',
      avTime:'',
      shiyongxuzhi:'',
      des:'',
      stockName:'',
      mainName:'',
      ctype:'',
      config:{
                qrc:{// 二维码配置
                    id: 'qrcode', // canvas的canvas-id
                    size: 360, // 二维码大小 单位rpx
                    level: 4, //等级 0～4
                    bgColor: '#FFFFFF', //二维码背景色 默认白色
                    border: {
                        color: ['#fff', '#ffffff'], //边框颜色支持渐变色
                        lineWidth: 4, //边框宽度
                    },
                    // img: '/static/logo.png',//图片
                    iconSize: 40, //二维码图标的大小
                    color: ['#000', '#000'] // 二维码颜色 默认黑色
                }
            }
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  onLoad(query) {
    console.log(query)
    this.code = query.coupon_code
    this.codeShow = this.code.replace(/\s/g,'').replace(/(.{4})/g,"$1 ")
    this.stockId = query.stock_id
    getCouponConfiFromWx({stockId:this.stockId}).then(res => {
      let temp = JSON.parse(res.result)
      console.log(JSON.parse(res.result))
      console.log(res.result)
      let startTime = new Date(temp.coupon_use_rule.coupon_available_time.available_begin_time)
      let endTime = new Date(temp.coupon_use_rule.coupon_available_time.available_end_time)
      this.avTime = `${startTime.getFullYear()}.${startTime.getMonth()+1<10?'0'+(startTime.getMonth()+1):startTime.getMonth()+1}.${startTime.getDate()<10?'0'+startTime.getDate():startTime.getDate()}-${endTime.getFullYear()}.${endTime.getMonth()+1<10?'0'+(endTime.getMonth()+1):endTime.getMonth()+1}.${endTime.getDate()<10?'0'+endTime.getDate():endTime.getDate()}`
      
      this.ctype = temp.stock_type
      this.stockName = temp.stock_name
      this.mainName = temp.display_pattern_info.merchant_name
      if(this.ctype== 'EXCHANGE') {
        this.des = `${temp.stock_name};${temp.goods_name};${temp.comment}`
        this.shiyongxuzhi = temp.display_pattern_info.description
      } else {
        this.shiyongxuzhi = temp.goods_name + '；' + temp.display_pattern_info.description
        this.des = `价值${temp.coupon_use_rule.fixed_normal_coupon.discount_amount/100}元代金券一张，消费满${temp.coupon_use_rule.fixed_normal_coupon.transaction_minimum/100}元可使用`
      }
   })
  },
  onReady(){
    this.findCan()
  },
  methods: {
    findCan () {
            // 二维码
            CODE.QRCode({
                ...this.config.qrc,
                code: this.code,
                ctx: this //自定义组件时 必须传 其它不用传
            });
        },
  },
  components: {
    tabBar
  }
}
</script>

<style lang="scss">
.map-container {
  width: 750rpx;
  height: calc(100vh - 30rpx);
  background-color: #2D9E66;
  padding-top: 30rpx;
  .back{
    width: 720rpx;
    // margin: 30rpx 15rpx;
    margin-left: 15rpx;
    margin-right: 15rpx;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title{
      margin-top: 45rpx;
      color: #8B8B8B;
      font-size: 25rpx;
    }
    .name{
      font-size:46rpx;
      font-weight: 500;
      margin-top: 40rpx;
      color: #151515;
    }
    .codetwo{
      width: 340rpx;
      margin-left: -20rpx;
      // height: 340rpx;
      // background-color: #000;
      margin-top: 120rpx;
    }
    .code{
      font-size: 46rpx;
      color: #33986c;
      font-weight: 500;
      margin-top: 35rpx;
      padding-bottom: 120rpx;
    }
    .dot{
      position: absolute;
      width: 20rpx;
      height: 20rpx;
      background-color: #2D9E66;
      top: 240rpx;
      border-radius: 10rpx;
    }
    .left{
      left: 5rpx;
    }
    .right{
      right: 6rpx;
    }
    
  }
  .detail{
    color:#fff;
    margin: 20rpx 15rpx 0 15rpx;
    .detail-title{
      font-size: 28rpx;
      border-bottom: 1rpx solid #fff;
      padding-bottom: 20rpx;
    }
    .da{
      font-size: 23rpx;
      margin-top: 12rpx;
      display: flex;
    }
    .da-t{
      display: block;
      flex: 0 0 100rpx;
    }
    .da-m{
      display: block;
      margin-left: 40rpx;
    }
  }
}
</style>