<template>
  <view v-if="visible">
    <view class="main-wrap">
      <view class="btn-wrap">
        <view class="btn btn-cancel" @click="$emit('update:visible', false)">取消</view>
        <view class="btn btn-confirm" @click="handleOk">确定</view>
      </view>
      <view class="picker-wrap">
        <picker-view
          :indicator-style="indicatorStyle"
          :value="value"
          @change="bindChange"
        >
          <picker-view-column
            v-for="(array, arrIndex) in pickerArrayList"
            :key="arrIndex"
          >
            <view 
              class="picker-item"
              v-for="(item, index) in array"
              :key="index"
            >
              {{ item[getProps(arrIndex)] }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
    <uni-transition
      :mode-class="['fade']"
      :styles="maskClass"
      :show="true"
      @click="$emit('update:visible', false)"
    />
  </view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      // pick-view配置
      indicatorStyle: `height: 50px;`,
      value: [0],
      // 遮罩配置
      maskClass: {
        'position': 'fixed',
        'bottom': 0,
        'top': 0,
        'left': 0,
        'right': 0,
        'background-color': 'rgba(0, 0, 0, 0.4)',
      },
      maskShow: false,
      cache: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    pickerArrayList: {
      type: Array
    },
    propsList: {
      type: Array
    }
  },
  watch: {
    visible: function(n, o) {
      if (n) {
        this.SET_BAR_HIDDEN(true)
      } else this.SET_BAR_HIDDEN(false)
      if (n && !!this.cache.length) {
        this.value = [...this.cache]
      } else this.value = [0]
    }
  },
  computed: {
    getProps() {
      return function(arrIndex) {
        return this.propsList[arrIndex][0]
      }
    }
  },
  created() {
    console.log('this.value');
  },
  methods: {
    ...mapMutations(['SET_BAR_HIDDEN']),
    // picker变化
    bindChange(e) {
      this.value = e.detail.value
    },
    // 确定
    handleOk() {
      this.$emit('update:visible', false)
      this.$emit('getValue', this.value)
      this.cache = [...this.value]
    }
  }
}
</script>

<style lang="scss">
.main-wrap {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  animation: open 0.2s linear;
  .btn-wrap {
    height: 50px;
    background: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 0px 0px 0px 0px;
    display: flex;
    .btn {
      min-width: 60px;
      padding: 15px 0px;
      text-align: center;
      font-size: 16px;
    }
    .btn-cancel {
      float: left;
    }
    .btn-confirm {
      margin-left: auto;
      color: $uni-color-primary;
    }
  }
  .picker-wrap {
    border-top: 1px solid #eee;
    height: 50vh;
    picker-view {
      width: 100%;
      height: 50vh;
      background: #fff;
    }
    .picker-item {
      font-size: 16px;
      line-height: 100rpx;
      text-align: center;
    }
  }
}
@keyframes open {
  0% {
    transform: translateY(500rpx);
  }
  100% {
    transform: translateY(0);
  }
}
</style>