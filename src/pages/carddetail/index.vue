<template>
  <view class="map-container">
    <view class="title">
      我的券
    </view>
    <view class="" v-for="(item, index) of cardList" :key="index">
        <view class="ccard-c" @click="gotoDetail(item)">
          <image :src="item.picUrl" class="ccard" alt="">
        </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import {getMiniCouponListFromWx} from '@/api/device';
export default {
  data() {
    return {
      cardList:[
      ]
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  onShow() {
    // this.setDeviceList()
   getMiniCouponListFromWx({}).then(res =>{
     this.cardList = []
     for(let item of res.result.content) {
       if(item.coupon_state == 'SENDED') {
          if(item.stock_type == 'EXCHANGE') {
            item.picUrl = '../../static/beer.png'
            this.cardList.push(item)
          } else {
            let Cvalue = item.coupon_use_rule.fixed_normal_coupon.discount_amount/100
            if(Cvalue==5||Cvalue==10||Cvalue==25||Cvalue==50||Cvalue==100){
              item.picUrl = '../../static/'+Cvalue+'.png'
              this.cardList.push(item)
            }
          }
       }
     }
     console.log(this.cardList)
    //  this.cardList = res.result.content
   })
  },
  onPullDownRefresh(){
    getMiniCouponListFromWx({}).then(res =>{
     this.cardList = []
     for(let item of res.result.content) {
       if(item.coupon_state == 'SENDED') {
          if(item.stock_type == 'EXCHANGE') {
            item.picUrl = '../../static/beer.png'
            this.cardList.push(item)
          } else {
            let Cvalue = item.coupon_use_rule.fixed_normal_coupon.discount_amount/100
            if(Cvalue==5||Cvalue==10||Cvalue==25||Cvalue==50||Cvalue==100){
              item.picUrl = '../../static/'+Cvalue+'.png'
              this.cardList.push(item)
            }
          }
       }
     }
      uni.stopPullDownRefresh()
     console.log(this.cardList)
    //  this.cardList = res.result.content
   })
  },
  methods: {
    gotoDetail(item){
      uni.navigateTo({
        url:`/pages/cardhexiao/index?stock_id=${item.stock_id}&coupon_code=${item.coupon_code}`,
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
  .title{
    width: 716rpx;
    margin-left: 17rpx;
    font-size: 34rpx;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #666;
  }
  .ccard-c{
    margin-left: 35rpx;
  }
  .ccard{
    width: 680rpx;
    height: 280rpx;
    margin-top: 30rpx;
  }
}
</style>