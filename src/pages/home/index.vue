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
    <view class="search-wrap">
      <p class="search-title">搜索设备</p>
      <uni-search-bar
        class="search-bar"
        @confirm="search"
        @clear="clear"
        @cancel="clear"
        placeholder="设备名称/设备ID"
      />
    </view>
    <view class="content-wrap page-padding">
      <card
        v-for="(item, index) in deviceList"
        :key="index"
        :itemData="item"
        :loading="loading"
      />
      <load-more v-if="isMoreLoading" />
    </view>
    <noData
      v-if="!deviceList.length"
      :height="30"
      :iconSize="15"
    />
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';
import noData from '../../layouts/noData';
import loadMore from '../../layouts/loadMore';
import card from '../components/card';
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
        '../../static/banner1.png',
        '../../static/banner2.png'
      ],
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
    loadMore() {
      this.isMoreLoading = true
      this.page++
      const params = {
        page: this.page,
        size: this.size,
        keyword: this.keyword
      }
      deviceApi.getDeviceList(params).then(res => {
        console.log('设备列表更多接口', res);
        if (res[1].statusCode === 200) {
          const more = res[1].data.content.map(item => {
            return {
              pk: item.pk,
              name: item.name,
              devId: item.devId,
              online: item.online ? '在线' : '离线',
              product: this.productFilter(item),
              deviceType: this.deviceTypeFilter(item.deviceType)
            }
          })
          if (!!more.length) {
            this.deviceList = this.deviceList.concat(more)
          } else uni.showToast({ title: '暂无更多记录', icon: 'none' })
          this.isMoreLoading = false
          console.log('more', more);
          console.log(this.deviceList);
        }
      })
    },
    productFilter(item) {
      return this.productList.find(product => {
        return product.pk === item.pk
      })['name']
    },
    deviceTypeFilter(type) {
      return this.deviceTypeList.find(item => {
        return item.value === type
      })['typeName']
    }
  },
  components: {
    tabBar,
    noData,
    loadMore,
    card
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
    width: 100%;
    .swiper-item {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      .swiper-pic {
        width: 100%;
        height: 100%;
      }
    }
	}
  .search-wrap {
    height: 10vh;
    padding: 30px;
    .search-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 23rpx;
      padding: 0 8px;
    }
  }
  .content-wrap {
    padding: 0 38px;
    margin-bottom: 30px;
  }
}
</style>