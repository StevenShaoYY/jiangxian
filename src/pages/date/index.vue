<template>
  <view class="map-container">
    <swiper class="swiper" circular :indicator-dots="indicatorDots" indicator-color="#CECECE" indicator-active-color="#9BB5A1" :autoplay="autoplay" :interval="interval" :duration="duration">
				<!-- <swiper-item v-for="(item, index) in mainList" :key="index"> -->
				<swiper-item>	
          <view class="swiper-item">
            <img class="swiper-pic1" :src="mainList[0]" />
          </view>
        </swiper-item>
        <swiper-item >
          <view class="swiper-item">
            <img class="swiper-pic2" :src="mainList[1]" />
          </view>
        </swiper-item>
        <swiper-item >
          <view class="swiper-item">
            <img class="swiper-pic3" :src="mainList[2]" />
          </view>
        </swiper-item>
        <swiper-item >
          <view class="swiper-item">
            <img class="swiper-pic4" :src="mainList[3]" />
          </view>
        </swiper-item>
				<!-- </swiper-item> -->
			</swiper>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import {getActive} from '@/api/device';
export default {
  data() {
    return {
      indicatorDots:true,
      mainList:[
      ],
      autoplay:true,
      interval: 5000,
      duration: 500,
    }
  },

  onShareAppMessage(res){
    return {
      title:"江鲜大会",
      path:'/pages/index/index'
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  created() {
    // this.setDeviceList()
    getActive({
      type:1
    }).then(res => {
      this.mainList = res.result
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
  .swiper{
    width: 715rpx;
    height: 98vh;
    margin-top: 1vh;
    margin-left: 17.5rpx;
  }
  .swiper-item{
    width: 715rpx;
    height: 98vh;
    overflow: auto;
  }
  .swiper-pic1{
    width: 715rpx;
    height: 1432rpx;
  }
  .swiper-pic2{
    width: 715rpx;
    height: 1436rpx;
  }
  .swiper-pic3{
    width: 715rpx;
    height: 1793rpx;
  }
  .swiper-pic4{
    width: 715rpx;
    height: 1167rpx;
  }
}
</style>