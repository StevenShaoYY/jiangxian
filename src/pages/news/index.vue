<template>
  <view class="map-container">
    <image class="header-img" src="../../static/newsheader.png" mode="" />
    <view class="cover"></view>
    <view class="title">江鲜新闻<span class="hot">HOT</span></view>
    <view class="main-title">2021年江鲜大会</view>
    <view class="sub">在小暑这个节点，作为“富春江畔第一村”、“东流第一关”、“浙江省小城镇综合整治省级样板村”的东梓关结合富阳区“富春山居 味道山乡”的品牌活动......</view>
    <view class="news" v-for="(item, index) of newsList" :key="index" @click="goToDetail(item.contentUrl)">
      <image class="n-img" :src="item.coverUrl" mode="" />
      <view class="n-title">{{item.title}}</view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import {getNews} from '@/api/device';
export default {
  data() {
    return {
      newsList:[
       
      ]
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  created() {
    // this.setDeviceList()
     getNews({
      currentPage:1,
      pageSize:100,
      type:1
    }).then(res => {
      this.newsList = res.result.content
    })
  },
  onPullDownRefresh(){
    getNews({
      currentPage:1,
      pageSize:100,
      type:1
    }).then(res => {
      this.newsList = res.result.content
      uni.stopPullDownRefresh()
    })
  },
  methods: {
    goToDetail(url) {
      // uni.navigateToMiniProgram({
      //   appId:'wxb10c47503e8c8e01',
      //   path:'pages/normal/index?atype=0&id=20201223A07D5B00'
      // })
      uni.navigateToMiniProgram({
        appId:'wxbbd95efd68bc8a5e',
        path:'pages/webView?pageUrl=https%3A%2F%2Fm.ule.com%2Fmitem%2Fstore%2Findex%2F10218.html'
      })
      // uni.navigateTo({
      //   url:`/pages/newsdetail/index?url=${url}`,
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
  .header-img{
    width: 750rpx;
    height: 325rpx;
  }
  .cover{
    width: 750rpx;
    height: 325rpx;
    position: absolute;
    top: 0;
    left: 0;
    background:#000;
    opacity: 0.2;
  }
  .title{
    position: absolute;
    font-size: 52rpx;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #FFFFFF;
    margin-top: -100rpx;
    left: 16rpx;
    .hot{
      width: 66rpx;
      height: 30rpx;
      line-height: 30rpx;
      background: #BE6569;
      border-radius: 10rpx;
      font-weight: bold;
      display: inline-block;
      font-size: 21rpx;
      text-align: center;
      margin-left: 10rpx;
    }
  }
  .main-title{
      font-size: 32rpx;
      padding: 0 16rpx;
      font-weight: bold;
      margin-top: 18rpx;
  }
  .sub{
    font-size: 24rpx;
    margin: 0 16rpx;
    color: #666666;
    line-height: 33rpx;
    margin-top: 10rpx;
    padding-bottom: 30rpx;
    // border-bottom: 1px solid #666666;
  }
  .news{
    display: flex;
    align-items: center;
    height: 143rpx;
    margin:  0 17rpx;
    border-top: 1px solid #ccc;
    .n-img{
      width: 192rpx;
      height: 108rpx;
      margin:  21rpx 0;
    }
    .n-title{
      margin-left: 30rpx;
      font-size: 30rpx;
font-family: Microsoft YaHei;
font-weight: bold;
color: #010101;
    }
  }
  // .new + .new {
  //   border-top: 1rpx solid #666;
  // }
}
</style>