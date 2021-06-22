<template>
  <view class="home-container">
    <view class="swiper-wrap">
      <map name="" style="width:100%;height:400rpx" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
    </view>
  <view @click="gotoNavigate">打开导航</view>
 
  </view>
</template>

<script>
import { mapGetters } from 'vuex';

import * as deviceApi from '@/api/device';
export default {
  data() {
    return {
      latitude:39.909,
      longitude:116.39742,
      covers:[{
        latitude:39.909,
        longitude:116.39742,
        iconPath:'../../static/icon_error.png'
      }]
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  created() {
    // this.setDeviceList()
  },
  methods: {
    gotoNavigate(){
      uni.getLocation({
        type:'gcj02',
        success:function(res) {
          const la = res.latitude
          const lo = res.longitude
          uni.openLocation({
            latitude:la,
            longitude:lo,
            success:()=>{
              console.log('success')
            }
          })
        }
      })
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
.home-container {
  // width: 690rpx;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .swiper {
		height: 30vh;
    width: 95.6%;
    margin-left: 2.2%;
    border-radius: 10rpx;
    box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(124, 124, 124, 0.38);
    .swiper-item {
      width: 100%;
      border-radius: 10rpx;
      height: 100%;
      background-position: center;
      background-size: cover;
      .swiper-pic {
        border-radius: 10rpx;
        width: 100%;
        height: 100%;
      }
    }
	}
  .jiangxian-hot{
    width: 95.6%;
    margin-left: 2.2%;
    background: linear-gradient(0deg, #DDEBE1, #EAF6EE);
    box-shadow: 0px 4rpx 10rpx 0rpx rgba(124, 124, 124, 0.38);
    border-radius: 10px;
    height: 107rpx;
    display: flex;
    align-items: center;
    margin-top: 45rpx;
    .left{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 40rpx;
      flex: 0 0 102rpx;
      // border-right: 1px solid #030000;;
      .hot{
        font-size: 37rpx;
        font-weight: bold;
        color: #010101;
        // line-height: 81rpx;
      }
      .jx{
        font-size: 22rpx;
        font-weight: 400;
      }
    }
    .center{
      width: 1rpx;
      height: 50rpx;
      background-color: #030000;
      margin: 0 17rpx;
    }
    .right {
      flex: 1;
      .swiper-hot{
        height: 107rpx;
      }
      .swiper-hot-item{
        display: flex;
        height: 107rpx;
        align-items: center;
        justify-content: flex-start;
      }
      .hot-title{
        flex:0 0 380rpx;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .hot-date{
        padding: 0 24rpx;
        flex: 0 0 90rpx;
      }
    }
  }
  .main-menu{
    display: flex;
    flex-wrap: wrap;
    margin-left: -7rpx;
    margin-bottom:20rpx;
      margin-top: 27rpx;
    .card{
      width: 346rpx;
      margin-left: 24rpx;
      height: 263rpx;
      background: #EDEDED;
      box-shadow: 0px -4rpx 11rpx 0rpx rgba(124, 124, 124, 0.31);
      border-radius: 10rpx;
      margin-top: 26rpx;
      .main-name{
        font-size: 33rpx;
        font-weight: bold;
        color: #000000;
        margin-left: 40rpx;
margin-top: 53rpx;
      }
      .sub-name{
        font-size: 25rpx;
font-family: Microsoft YaHei;
font-weight: bold;
margin-top: 11rpx;
        margin-left: 40rpx;
color: #666666;
      }
    }
  }
}
</style>