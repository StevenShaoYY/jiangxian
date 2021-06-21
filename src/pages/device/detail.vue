<template>
  <view class="device-detail-container">
    <view class="subsection-wrap">
      <uni-segmented-control
        class="segmented-control"
        :current="currentFragment"
        :values="segmentMenu"
        :style-type="styleType"
        :active-color="activeColor"
        @clickItem="onClickItem"
      />
    </view>
    <scroll-view
      class="fragment-wrap"
      scroll-y
      @scrolltolower="scrollRefresh"
    >
      <monitor v-if="currentFragment === 0" :refresh="pullDownRefresh" />
      <history v-if="currentFragment === 1" ref="history" />
      <control v-if="currentFragment === 2" />
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import monitor from './detailFragment/monitor';
import history from './detailFragment/history';
import control from './detailFragment/control';
export default {
  onLoad: function(option) {
    this.currentFragment = Number(option.fragmentIndex)
  },
  computed: {
    ...mapGetters(['currentDevicePk'])
  },
  data() {
    return {
      currentFragment: 0,
      segmentMenu: ['实时监控', '历史数据', '远程控制'],
      activeColor: '#007aff',
      styleType: 'text',
      pullDownRefresh: false
    }
  },
  created() {
    console.log('currentDevicePk', this.currentDevicePk);
  },
  methods: {
    scrollRefresh() {
      switch(this.currentFragment) {
        case 1:
          this.$refs.history.loadMore()
          break
      }
    },
    onClickItem(e) {
      if (this.currentFragment !== e.currentIndex) {
        this.currentFragment = e.currentIndex
      }
    },
    onPullDownRefresh() {
      if (this.currentFragment === 0) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.pullDownRefresh = false
            uni.stopPullDownRefresh();
            uni.showToast({ title: '刷新成功' })
          }, 500)
        })
      } else uni.stopPullDownRefresh();
      this.pullDownRefresh = true
    }
  },
  components: {
    monitor,
    history,
    control
  }
}
</script>

<style lang="scss">
.device-detail-container {
  .subsection-wrap {
    width: 100%;
    height: 7vh;
    margin-bottom: 12px;
    padding-top: 20px;
    position: fixed;
    top: 0;
    background: #fff;
    .segmented-control {
      width: calc(100% - 76px);
      margin: 0 auto;
    }
  }
  .fragment-wrap {
    // width: 100%;
    // background: pink;
    height: calc(93vh - 32px);  // 关键
    // margin-top: calc(7vh + 20px);
    margin-top: 70px;
    overflow: hidden;
  }
}
</style>