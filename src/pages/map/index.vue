<template>
  <view class="map-container">
    <view class="map-wrap">
      <map name="" style="width:100%;height:436rpx;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
    </view>
    <image class="back-img" src="../../static/liuchen2.png" mode="" />
    <view @click="gotoNavigate" class="daohang">点击跳转到导航页面</view>
    <view @click="gotoNavigate" class="title">地址/</view>
    <view @click="gotoNavigate" class="add">杭州市富阳区东舒线与汤横线交叉路口</view>
    <view @click="gotoNavigate" class="add">往北约110米</view>
    <view @click="gotoNavigate" class="title">时间/</view>
    <view @click="gotoNavigate" class="add">2021年7月初</view>
    <image class="map-img" src="../../static/map-title.png" mode="" />
    <!-- <view class="tab-view">
      <tabBar :pageName.sync="pageName" />
    </view> -->
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
      covers:[{
        latitude:29.890874,
        longitude:119.830751,
        iconPath:'../../static/location.png'
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
      // uni.getLocation({
      //   type:'gcj02',
      //   success:function(res) {
      //     const la = res.latitude
      //     const lo = res.longitude
          uni.openLocation({
            latitude:29.890874,
            longitude:119.830751,
            success:()=>{
              console.log('success')
            }
          })
      //   }
      // })
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
  // height: 1184rpx;
  // background:url("../../static/liuchen3.png");
  // background-size: 750rpx 1184rpx;
  // display: flex;
  // flex-direction: column;
  // overflow: hidden;
  .back-img{
    width: 750rpx;
    height: 100%;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
  }
  .map-wrap {
    width: 715rpx;
    margin-left: 17.5rpx;
    height: 436rpx;
    margin-top: 20rpx;
    box-shadow: 0px -4rpx 11rpx 0px rgba(124, 124, 124, 0.31);
  }
  .daohang{
    font-size: 24rpx;    
    font-weight: 400;
    color: #666666;
    text-align: center;
    margin-top: 19rpx;
    margin-bottom: 112rpx;
  }
  .title{
    font-size: 34rpx;
    text-align: center;
    font-weight: bold;
    margin-top: 56rpx;
    color: #000000;
  }
  .add{
    font-size: 29rpx;
    font-weight: bold;
    text-align: center;
    margin-top: 8rpx;
    color: #000000;
  }
  .map-img{
    width:543rpx;
    margin-top: 87rpx;
    margin-left: 103.5rpx;
    height: 93rpx;
  }
  .tab-view{
    width: 100%;
    height: 8vh;
  }
}
</style>