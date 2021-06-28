<template>
  <view class="map-container">
    <swiper class="swiper" circular :indicator-dots="indicatorDots" indicator-color="#CECECE" indicator-active-color="#9BB5A1" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in mainList" :key="index">
					<view class="swiper-item">
            <img class="swiper-pic" :src="item" />
          </view>
				</swiper-item>
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
      interval: 2000,
      duration: 500,
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
  .swiper-pic{
    width: 715rpx;
    height: 1432rpx;
  }
}
</style>