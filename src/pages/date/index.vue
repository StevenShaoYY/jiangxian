<template>
  <view class="map-container">
    <swiper class="swiper" circular :indicator-dots="indicatorDots" indicator-color="#CECECE" indicator-active-color="#9BB5A1" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in mainList" :key="index">
					<view class="swiper-item">
            <img class="swiper-pic" :src="item.pic" />
          </view>
				</swiper-item>
			</swiper>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import * as deviceApi from '@/api/device';
export default {
  data() {
    return {
      indicatorDots:true,
      mainList:[
        {
          namepic:'../../static/main1.png',
          pic:'../../static/liuchen3.png',
          mask:'龙井虾仁将茶饮与虾仁融合，整体清新软嫩，虾仁玉白，鲜嫩，芽叶清香，色泽雅丽，虾中有茶香，茶中有虾鲜，食后清口开胃，回味无穷。'
        },
        {
          namepic:'../../static/main1.png',
          pic:'../../static/liuchen3.png',
          mask:'龙井虾仁将茶饮与虾仁融合，整体清新软嫩，虾仁玉白，鲜嫩，芽叶清香，色泽雅丽，虾中有茶香，茶中有虾鲜，食后清口开胃，回味无穷。'
        },
        {
          namepic:'../../static/main1.png',
          pic:'../../static/liuchen3.png',
          mask:'龙井虾仁将茶饮与虾仁融合，整体清新软嫩，虾仁玉白，鲜嫩，芽叶清香，色泽雅丽，虾中有茶香，茶中有虾鲜，食后清口开胃，回味无穷。'
        },{
          namepic:'../../static/main1.png',
          pic:'../../static/liuchen3.png',
          mask:'龙井虾仁将茶饮与虾仁融合，整体清新软嫩，虾仁玉白，鲜嫩，芽叶清香，色泽雅丽，虾中有茶香，茶中有虾鲜，食后清口开胃，回味无穷。'
        }
      ]
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
    height: 100%;
  }
}
</style>