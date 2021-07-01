<template>
  <view class="map-container">
    <image class="back-img" src="../../static/xiaofeiquanbac.png" mode="" />
    <image class="title-img" src="../../static/xiaofeiquan-title.png" mode="" />
    <image class="xfq-img" src="../../static/xiaofeiquan2.png" mode="" />
    <view class="btn" v-if="hasGet==true && rest==true&&start==true"  :style="{background:hasGet==true?'#aaa':'linear-gradient(0deg, #BE6569, #D5B8AF)'}">{{hasGet?"今日已领取":"立即领取"}}</view>
    <view class="btn" v-if="rest==false&&start==true"  :style="{background:'#aaa'}">{{"今日已领完"}}</view>
    <view class="btn" v-if="start==false"  :style="{background:'#aaa'}">{{"活动尚未开始"}}</view>
    <send-coupon
      v-if="hasGet==false && rest==true"
      @customevent="getcoupon"
      :send_coupon_params="send_coupon_params"
      :sign="sign"
      :send_coupon_merchant="send_coupon_merchant"
    >
      <!-- 内部为自定义代码，按钮点击部分的代码写在这里 -->
      <!-- [[以下为示例代码 -->
      <!-- <view class="text">领取</view> -->
      <view class="btn" :style="{background:hasGet==true?'#aaa':'linear-gradient(0deg, #BE6569, #D5B8AF)'}">{{hasGet?"今日已领取":"立即领取"}}</view>

      <!-- 以上为示例代码 ]] -->
    </send-coupon>
    <view class="fenge"></view>
    <view class="word2">
      用户领取规则：</view>
    <view class="word">    &nbsp;&nbsp;   7月6日-7月10日，每日10:00开启江鲜券发放，江鲜券面额随机，每人每天限领一张，每天限额2万元，领完截止</view>
    <view class="word">    &nbsp;&nbsp;   消费券自动存入微信卡包，可用于场口镇各指定民宿、江鲜馆、夜宵市集消费；结账时，向商家出示券码，当场抵扣现金</view>
    <view class="word"> &nbsp;&nbsp;&nbsp;&nbsp;  江鲜券使用时间：7月7日-7月11日</view>
    <view class="word"> &nbsp;&nbsp;&nbsp;&nbsp;  本活动最终解释权在法律允许范围内归主办方所有
</view>
    <image class="xfq-img pijiu" src="../../static/123123.png" mode="" />
    <view class="btn" v-if="hasBeerGet==true&&beerRest==true&&start==true" :style="{background:hasBeerGet==true?'#aaa':'linear-gradient(0deg, #BE6569, #D5B8AF)'}">{{hasBeerGet?"今日已领取":"立即领取"}}</view>
    <view class="btn" v-if="beerRest==false&&start==true"  :style="{background:'#aaa'}">{{"今日已领完"}}</view>
    <view class="btn" v-if="start==false"  :style="{background:'#aaa'}">{{"活动尚未开始"}}</view>
    <send-coupon
      v-if="hasBeerGet==false&&beerRest==true"
      @customevent="getbeercoupon"
      :send_coupon_params="beersend_coupon_params"
      :sign="beersign"
      :send_coupon_merchant="send_coupon_merchant"
    >
      <!-- 内部为自定义代码，按钮点击部分的代码写在这里 -->
      <!-- [[以下为示例代码 -->
      <!-- <view class="text">领取</view> -->
      <view class="btn" :style="{background:hasBeerGet==true?'#aaa':'linear-gradient(0deg, #BE6569, #D5B8AF)'}">{{hasBeerGet?"今日已领取":"立即领取"}}</view>

      <!-- 以上为示例代码 ]] -->
    </send-coupon>
    <!-- <view class="btn" ref="delbtn" id="delbtn" @click="deleteQuan" :style="{background:'linear-gradient(0deg, #BE6569, #D5B8AF)'}">删除</view> -->

    <view class="fenge"></view>
    <view class="word2">
      用户领取规则：</view>
    <view class="word">    &nbsp;&nbsp;  7月6日-7月10日，每日10:00开启啤酒券发放，每人每天限领一张，领完截止 </view>
    <view class="word">    &nbsp;&nbsp;   每张啤酒券可以兑换千岛湖9°P扎啤一罐（1000ml）</view>
    <view class="word">    &nbsp;&nbsp;   使用时间：7月7日-7月11日，当天领的啤酒券第二天到指定地点兑换，过期不可使用，请按规定时间兑换</view>
    <view class="word qbottom">    &nbsp;&nbsp;   本活动最终解释权在法律允许范围内归主办方所有</view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import {getXiaofeiquan,getTodayStatus, getMiniCouponListFromWx,deleteQuan} from '@/api/device';
export default {
  data() {
    return {
      hasGet:false,
      hasBeerGet:false,
      rest:true,
      start:true,
      beerRest:true,
      couponDetail:{},
      beercouponDetail:{},
      send_coupon_params:[{
        "stock_id": "1209180000000035",
        "out_request_no":"161120695720210628000009"
      }],
      sign:"34A8262F946F04A8C9F7B80EC78D2C5CD7E736D657BFBD7F058D9419038BDA0C",
      send_coupon_merchant:"1611206957",
      beersign:"",
      beersend_coupon_params:[],
      delCode:'1210212723003558755256',
      delStock:"1209180000000033"
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  created() {
    getTodayStatus({}).then(res => {
      console.log(res)
      if(res.result.moneyCouponStatus == 1) {
        this.hasGet = true
      } else {
        this.hasGet = false
        if(res.result.moneyCouponStatus == 2) {
          this.rest=false
        }
        if(res.result.moneyCouponStatus == 3) {
          this.start=false
        }
      }
      if(res.result.beerCouponStatus == 1) {
        this.hasBeerGet = true
      } else {
        this.hasBeerGet = false
        if(res.result.moneyCouponStatus == 2) {
          this.beerRest=false
        }
        if(res.result.moneyCouponStatus == 3) {
          this.start=false
        }
      }
    })
    getMiniCouponListFromWx({}).then(res => {
      console.log(res.result.content)
      for(let item of res.result.content) {
        console.log("stock_id："+item.stock_id+',code：'+item.coupon_code)
      }
    })
    getXiaofeiquan({type:1}).then(res => {
        console.log(888,res)
        this.sign = res.result.sign
        this.couponDetail = res.result.miniCoupon
        this.send_coupon_merchant = res.result.sendCouponMerchant
        this.send_coupon_params=[{
          "stock_id": res.result.stockId,
          "out_request_no": res.result.outRequestNo
        }]
    })
    getXiaofeiquan({type:2}).then(res => {
        console.log(999,res)
        this.beersign = res.result.sign
        this.beercouponDetail =  res.result.miniCoupon
        this.send_coupon_merchant = res.result.sendCouponMerchant
        this.beersend_coupon_params=[{
          "stock_id": res.result.stockId,
          "out_request_no": res.result.outRequestNo
        }]
    })
  },
  methods: {
    getcoupon(params) {
      // 插件返回信息在params.detail
      console.log('getcoupon', params)
      if(params.detail.errcode == 'OK') {
        this.delCode = params.detail.send_coupon_result[0].coupon_code
        this.delStock = params.detail.send_coupon_result[0].stock_id
        if(params.detail.send_coupon_result[0].code=='MAXQUOTA') {
          uni.showToast({
            title: params.detail.send_coupon_result[0].message,
            icon:'none',
            duration: 2000
          });
        } else if(params.detail.send_coupon_result[0].code=='SUCCESS') {
          // uni.showToast({
          //   title: params.detail.send_coupon_result[0].message,
          //   // icon:'none',
          //   duration: 2000
          // });
          uni.showModal({
            title: '恭喜您',
            content: `获得一张${this.couponDetail.stockName}`,
            confirmText:'立即使用',
            cancelText:'稍后使用',
            success: res=> {
              if (res.confirm) {
                console.log('用户点击确定');
                uni.navigateTo({
                  url:`/pages/cardhexiao/index?stock_id=${params.detail.send_coupon_result[0].stock_id}&coupon_code=${params.detail.send_coupon_result[0].coupon_code}`,
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
          this.hasGet = true
        }
      } else {
        uni.showToast({
          title: '领取失败',
          icon:'none',
          duration: 2000
        });
      }
    },
    getbeercoupon(params) {
      // 插件返回信息在params.detail
      console.log('getcoupon', params)
      if(params.detail.errcode == 'OK') {
        this.delCode = params.detail.send_coupon_result[0].coupon_code
        this.delStock = params.detail.send_coupon_result[0].stock_id
        if(params.detail.send_coupon_result[0].code=='MAXQUOTA') {
          uni.showToast({
            title: params.detail.send_coupon_result[0].message,
            icon:'none',
            duration: 2000
          });
        } else if(params.detail.send_coupon_result[0].code=='SUCCESS'){
           uni.showModal({
            title: '恭喜您',
            content: `获得一张${this.beercouponDetail.stockName}`,
            confirmText:'立即使用',
            cancelText:'稍后使用',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                uni.navigateTo({
                  url:`/pages/cardhexiao/index?stock_id=${params.detail.send_coupon_result[0].stock_id}&coupon_code=${params.detail.send_coupon_result[0].coupon_code}`,
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
          this.hasBeerGet = true
        }
      } else {
        uni.showToast({
          title: '领取失败',
          icon:'none',
          duration: 2000
        });
      }
    },
    deleteQuan(){
      deleteQuan({
        code:this.delCode,
        stockId:this.delStock
      }).then(res => {
        console.log(res)
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
    margin-top:46rpx;
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
    margin-top: 53rpx;
    margin-left: 132rpx;
    margin-bottom: 37rpx;
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
  .pijiu{
    margin-top: 50rpx;
  }
  .qbottom{
    padding-bottom:50rpx;
  }
}
</style>