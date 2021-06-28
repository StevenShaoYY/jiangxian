<template>
  <view class="map-container">
    <view class="gamecard" v-for="(item, index) of cardList" :key="index">
        <view class="">
          <image src="../../static/555.png" class="right-pic" alt="">
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
  created() {
    // this.setDeviceList()
   getMiniCouponListFromWx({}).then(res =>{
     console.log(res)
     this.cardList = res.result
   })
  },
  onPullDownRefresh(){
    getActive({
      type:2
    }).then(res => {
      this.dishList = res.result
      uni.stopPullDownRefresh()
    })
  },
  methods: {
    getXiaofq(){
      this.hasGet = true
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
  .gamecard{
    width: 715rpx;
    margin-left: 16rpx;
    margin-top: 37rpx;
    //height: 523rpx;
    border-radius: 10rpx;
    background: linear-gradient(45deg, rgba(221, 235, 225, 0.45), rgba(221, 235, 225, 0.45), rgba(221, 235, 225, 0.45), rgba(206, 223, 211, 0.45));
    box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.2);
    .top{
      display: flex;
      .topleft{
        flex: 0 0 420rpx;
        width: 420rpx;
        height: 314rpx;
        margin-top: 24rpx;
        margin-left: 59rpx;
      }
      .topright{
        display: flex;
        flex: 1;
        height: 314rpx;
        justify-content: center;
        align-items: center;
        .right-pic{
          width: 41rpx;
          height: 219rpx;
        }
      }
    }
    .bottom{
      width: 599rpx;
//height: 90px;
margin-left: 69rpx;
margin-top: 46rpx;
padding-bottom: 49rpx;
font-size: 22rpx;
font-family: Microsoft YaHei;
font-weight: 400;
color: #000000;
line-height: 34rpx;
    }
  }
}
</style>