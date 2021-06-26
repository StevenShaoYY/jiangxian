<template>
  <view class="main-container">
    <scroll-view
      class="main-view"
      scroll-y
      @scrolltolower="scrollRefresh"
    >
      <home v-if="pageName === 'home'" ref="home" />
      
      <user v-if="pageName === 'user'" />
    </scroll-view>
    <view class="tab-view">
      <tabBar :pageName.sync="pageName" />
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import home from '../home/index';
import user from '../user/index';
import tabBar from '../../layouts/tabBar';
export default {
  onLoad: function(option) {
    if (option.isLogin === 'true') {
      uni.showToast({ title: '登录成功' })
    }
  },
  data() {
    return {
      pageName: 'home',
      pullDownRefresh: false
    }
  },
  watch: {
    pageName: function(n, o) {
      if (n && n === 'user') {
        uni.setNavigationBarTitle({
          title: '我的'
        })
      } else {
        uni.setNavigationBarTitle({
          title: '江鲜大会'
        })
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'barHidden'])
  },
  methods: {
    scrollRefresh() {
      switch(this.pageName) {
        // case 'home':
        //   this.$refs.home.loadMore()
        //   break
        case 'device':
          this.$refs.device.loadMore()
          break
      }
    },
    onPullDownRefresh() {
      if (this.pageName === 'device') {
        this.$nextTick(() => {
          setTimeout(() => {
            this.pullDownRefresh = false
            uni.stopPullDownRefresh();
          }, 500)
        })
      } else uni.stopPullDownRefresh();
      this.pullDownRefresh = true
    }
  },
  components: {
    home,
    user,
    tabBar
  }
}
</script>

<style lang="scss">
.main-container {
  .main-view {
    width: 100%;
    height:calc(100vh - 150rpx);  // 关键属性
    overflow: auto;
  }
  .tab-view {
    width: 100%;
    height: 8vh;
  }
}
</style>