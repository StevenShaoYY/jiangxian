<template>
  <view class="tab-bar bottom-fixed" :class="{'paddingBottom30': isIos, 'hidden': barHidden}">
    <view
      class="tab-bar-item"
      v-for="(item, index) in tabBarList"
      :key="index"
      @click="tabChange(item, index)"
    >
      <img
        :class="'item-icon'+index"
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
          name: '江鲜大会',
          icon: '../static/home-unselect.png',
          iconSelected: '../static/home-select.png',
          pageName: 'home',
          pageUrl: '/pages/home/home'
        },
        {
          name: '我  的',
          icon: '../static/my-unselect.png',
          iconSelected: '../static/my-select.png',
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
  height: 150rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .tab-bar-item {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    .item-icon0 {
      width: 183rpx;
      height: 69rpx;
    }
    .item-icon1 {
      width: 122rpx;
      height: 87rpx;
    }
    .item-name {
      margin-top: 14rpx;
      font-size: 22rpx;
      text-align: center;
      color: #DBDBDB;
    }
    .item-name-selected {
      color: #010101;
    }
  }
}
.hidden {
  z-index: -1;
  opacity: 0;
}
</style>