<template>
  <view class="home-container">
    <view class="swiper-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(pic, index) in swiperList" :key="index">
					<view class="swiper-item">
            <img class="swiper-pic" :src="pic" />
          </view>
				</swiper-item>
			</swiper>
    </view>
    <view class="jiangxian-hot">
      <view class="left">
        <view class="hot"> HOT</view>
        <view class="jx">江鲜热点</view>
      </view>
      <view class="center"></view>
      <view class="right">
        <swiper class="swiper-hot" circular :vertical="true"  :autoplay="autoplay" :interval="interval" :duration="duration">
          <swiper-item v-for="(item, index) in swiperHotList" :key="index">
            <view class="swiper-hot-item">
              <view class="hot-title">{{item.title}}</view>
              <view class="hot-date">{{item.date}}</view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="main-menu">
      <view
        class="card"
        v-for="(item, index) in cardList"
        :key="index"
        @click="Goto(item.url)"
      > 
        <image class="menu-img" :src="item.pic" mode="" />
        <view class="main-name">{{item.name}}</view>
        <view class="sub-name">{{item.sub}}</view>
        
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';
import noData from '../../layouts/noData';
import * as deviceApi from '@/api/device';
export default {
  data() {
    return {
      background: ['color1', 'color2', 'color3'],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      swiperList: [
        '../../static/newsheader.png'
      ],
      swiperHotList:[
        {
          title:'当江鲜“遇上”马拉松和音乐会',
          date:'06/11'
        },{
          title:'当江鲜“遇上”马拉松和音乐会',
          date:'06/12'
        },{
          title:'当江鲜“遇上”马拉松和音乐会',
          date:'06/13'
        },
      ],
      cardList:[{
        name:'小暑品江鲜',
        sub:'活动详情',
        pic:'../../static/main1.png',
        url:''
      },{
        name:'江鲜券',
        sub:'等你来抢',
        pic:'../../static/main2.png',
        url:'/pages/xiaofq/index'
      },{
        name:'江鲜新闻',
        sub:'抢先收看',
        pic:'../../static/main3.png',
        url:'/pages/news/index'
      },{
        name:'邮乐购',
        sub:'农产品尝鲜',
        pic:'../../static/main4.png',
        url:''
      },{
        name:'江鲜地图',
        sub:'一键导航',
        pic:'../../static/main5.png',
        url:'/pages/map/index'
      },{
        name:'江鲜大赛',
        sub:'创意烹饪',
        pic:'../../static/main6.png',
        url:''
      }],
      deviceList: [],
      loading: true,
      isMoreLoading: false,
      page: 1,
      size: 20,
      keyword: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  created() {
    // this.setDeviceList()
  },
  methods: {
    search(e) {
      this.keyword = e.value
      const params = {
        page: 1,
        size: this.size,
        keyword: this.keyword
      }
      this.getDeviceList(params)
    },
    clear() {
      this.deviceList = []
    },
    setDeviceList() {
      for(let i = 0; i < 5; i++) {
        this.deviceList.push({
          name: `开关${i + 1}`,
          id: (Math.random() * 100).toString().replace('.', '').substr(0, 11),
          status: '在线/离线',
          product: '开关',
          type: `${i % 2 === 0 ? '普通' : '终端'}设备`
        })
      }
    },
    Goto(pageUrl){
      uni.navigateTo({
        url:pageUrl
      })
    },
    getDeviceList(params) {
      this.loading = true
      this.isLogin && this.setDeviceList()
      deviceApi.getDeviceList(params).then(res => {
        console.log('设备列表接口', res);
        if (res[1].statusCode === 200) {
          this.deviceList = res[1].data.content.map(item => {
            return {
              pk: item.pk,
              name: item.name,
              devId: item.devId,
              online: item.online ? '在线' : '离线',
              product: this.productFilter(item),
              deviceType: this.deviceTypeFilter(item.deviceType)
            }
          })
          this.loading = false
        }
      })
    },
   
  },
  components: {
    tabBar,
    noData
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
    width:735rpx;
    margin-left:7.5rpx;
    // background: linear-gradient(0deg, #DDEBE1, #EAF6EE);
    background:url("../../static/header1.png");
    background-size: 735rpx 126rpx;
    // box-shadow: 0px 4rpx 10rpx 0rpx rgba(124, 124, 124, 0.38);
    // border-radius: 10px;
    height: 128rpx;
    display: flex;
    align-items: center;
    margin-top: 25rpx;
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
        font-size: 22rpx;
        flex:0 0 430rpx;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .hot-date{
        font-size: 22rpx;
        padding: 0 24rpx;
        flex: 0 0 90rpx;
      }
    }
  }
  .main-menu{
    display: flex;
    flex-wrap: wrap;
    // margin-left: -7rpx;
    margin-bottom:20rpx;
    margin-top: 20rpx;
    .card{
      width: 365rpx;
      height: 283rpx;
      margin-left: 8rpx;
      position: relative;
      .menu-img{
        width: 368rpx ;
        height: 284rpx;
        z-index: -1;
        position: absolute;
      }
      // background-size: 365rpx 283rpx;
      // background: #EDEDED;
      // box-shadow: 0px -4rpx 11rpx 0rpx rgba(124, 124, 124, 0.31);
      // border-radius: 10rpx;
      margin-top: 6rpx;
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