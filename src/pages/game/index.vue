<template>
  <view class="map-container">
    <view class="gamecard" v-for="(item, index) of dishList" :key="index">
      <view class="top">
        <image :src="item.pic" class="topleft" alt="">
        <view class="topright">
          <image :src="item.namepic" class="right-pic" alt="">
        </view>
        
      </view>
      <view class="bottom">
        {{item.mask}}
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import * as deviceApi from '@/api/device';
export default {
  data() {
    return {
      dishList:[
        {
          namepic:'../../static/main1.png',
          pic:'../../static/main1.png',
          mask:'龙井虾仁将茶饮与虾仁融合，整体清新软嫩，虾仁玉白，鲜嫩，芽叶清香，色泽雅丽，虾中有茶香，茶中有虾鲜，食后清口开胃，回味无穷。'
        },
        {
          namepic:'../../static/main1.png',
          pic:'../../static/main1.png',
          mask:'龙井虾仁将茶饮与虾仁融合，整体清新软嫩，虾仁玉白，鲜嫩，芽叶清香，色泽雅丽，虾中有茶香，茶中有虾鲜，食后清口开胃，回味无穷。'
        },
        {
          namepic:'../../static/main1.png',
          pic:'../../static/main1.png',
          mask:'龙井虾仁将茶饮与虾仁融合，整体清新软嫩，虾仁玉白，鲜嫩，芽叶清香，色泽雅丽，虾中有茶香，茶中有虾鲜，食后清口开胃，回味无穷。'
        },{
          namepic:'../../static/main1.png',
          pic:'../../static/main1.png',
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