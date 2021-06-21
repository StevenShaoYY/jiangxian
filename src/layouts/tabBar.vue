<template>
  <view class="tab-bar bottom-fixed" :class="{'paddingBottom30': isIos, 'hidden': barHidden}">
    <view
      class="tab-bar-item"
      v-for="(item, index) in tabBarList"
      :key="index"
      @click="tabChange(item, index)"
    >
      <img
        class="item-icon"
        :src="isSelected(index) ? item.iconSelected : item.icon"
      />
      <view 
        class="item-name"
        :class="{'item-name-selected': isSelected(index)}"
      >
        {{ item.name }}
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentSelected: 0,
      tabBarList: [
        {
          name: '首页',
          icon: '../static/icon_home.svg',
          iconSelected: '../static/icon_home_selected.svg',
          pageName: 'home',
          pageUrl: '/pages/home/home'
        },
        {
          name: '设备',
          icon: '../static/icon_device.svg',
          iconSelected: '../static/icon_device_selected.svg',
          pageName: 'device',
          pageUrl: '/pages/device/device'
        },
        {
          name: '我的',
          icon: '../static/icon_user.svg',
          iconSelected: '../static/icon_user_selected.svg',
          pageName: 'user',
          pageUrl: '/pages/user/user'
        },
        // {
        //   name: '详情',
        //   icon: '../static/icon_device.svg',
        //   iconSelected: '../static/icon_device_selected.svg',
        //   pageName: 'detail',
        //   pageUrl: '/pages/device/device'
        // },
      ]
    }
  },
  props: {
    pageName: {
      type: String,
      default: 'home'
    }
  },
  computed: {
    ...mapGetters(['isIos', 'barHidden']),
    isSelected() {
      return (index) => this.currentSelected === index ? true : false
    }
  },
  methods: {
    tabChange(item, index) {
      this.currentSelected = index
      this.$emit('update:pageName', item.pageName)
    }
  }
}
</script>

<style lang="scss">
.tab-bar {
  height: 8vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .tab-bar-item {
    width: 10vh;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    .item-icon {
      width: 3vh;
      height: 3vh;
    }
    .item-name {
      margin-top: 4rpx;
      font-size: 10px;
      text-align: center;
      color: rgba(0, 0, 0, 0.3);
    }
    .item-name-selected {
      color: $uni-color-primary;
    }
  }
}
.hidden {
  z-index: -1;
  opacity: 0;
}
</style>