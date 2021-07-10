<template>
  <view class="no-data-container" :style="setHeight">
    <img
      class="no-data-img"
      src="../static/noData.jpg"
      :style="setSize"
    >
    <view class="no-data-text">{{ text }}</view>
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无记录'
    },
    height: {
      type: Number,
      default: 70
    },
    iconSize: {
      type: Number,
      default: 25
    }
  },
  computed: {
    setHeight() {
      return `height:${this.height}vh;`
    },
    setSize() {
      return `
        width:${this.iconSize}vh;
        height:${this.iconSize}vh;
      `
    },
  }
}
</script>

<style lang="scss">
.no-data-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #cdcdcd;
  font-size: 16px;
  z-index: -1;
  position: relative;
  .no-data-img {
    width: 25vh;
    height: 25vh;
    transform: translateX(-2vw);
  }
  .no-data-text {
    transform: translateY(10px);
  }
}
</style>