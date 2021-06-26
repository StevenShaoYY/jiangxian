<template>
  <view class="map-container">
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import * as deviceApi from '@/api/device';
export default {
  data() {
    return {
      // url:'https://m.ule.com/mitem/store/index/10218.html'
      url:'https://view.inews.qq.com/wxn2/20210626A064SC00?tbkt=I&pushid=2021062602&strategy=feature&openid=o04IBAH4UBoO2d_mHsHnOHi7ad9I&uid=&refer=wx_hot&ft=0'
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  onLoad(query) {
    // console.log(query)
    this.url = query
    // this.setDeviceList()
  },
  methods: {
  },
  components: {
    tabBar
  }
}
</script>

<style lang="scss">
.map-container {
  width: 750rpx;
  height: 100vh;
}
</style>