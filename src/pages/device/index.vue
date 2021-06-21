<template>
  <view class="device-container">
    <view class="search-wrap top-fixed" :class="{'marginTop44': isH5}">
      <uni-row>
        <uni-col :span="20">
          <uni-search-bar
            @confirm="search"
            @clear="clear"
            placeholder="设备名称/设备ID"
            cancelButton="none"
          />
        </uni-col>
        <uni-col :span="4">
          <view
            class="select-down"
            @click="showPicker"
          >
            {{ deviceTypeFilter(deviceType).slice(0, 2) }}
          </view>
        </uni-col>
      </uni-row>
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
    <picker-pro
      :visible.sync="pickerVisible"
      :pickerArrayList="[deviceTypeList]"
      :propsList="[['typeName']]"
      @getValue="getPickerValue"
    />
    <noData v-if="!deviceList.length"></noData>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import pickerPro from '../components/pickerPro';
import card from '../components/card';
import noData from '../../layouts/noData';
import loadMore from '../../layouts/loadMore';
import * as deviceApi from '@/api/device';
export default {
  data() {
    return {
      pickerVisible: false,
      deviceType: '',
      deviceList: [],
      loading: true,
      page: 1,
      size: 20,
      isMoreLoading: false
    }
  },
  props: {
    refresh: Boolean
  },
  computed: {
    ...mapGetters(
      [
        'isH5',
        'isLogin',
        'productList',
        'deviceTypeList'
      ]
    )
  },
  created() {
    // this.setDeviceList()
    this.isLogin && this.getDeviceList({ page: 1, size: this.size })
  },
  filters: {
    // productFilter (item) {
    //   let pkName = this.productList.map(product => {
    //     return product.pk = item.pk
    //   })
    //   return pkName.name
    // }
  },
  methods: {
    showPicker() {
      this.pickerVisible = true
    },
    getPickerValue(val) {
      const resIndex = val[0]
      this.deviceType = this.deviceTypeList[resIndex].value

      const params = {
        page: 1,
        size: this.size,
        deviceType: this.deviceType
      }
      this.getDeviceList(params)
    },
    search(e) {
      console.log('设备搜索', e);
      const keyword = e.value
      const params = {
        page: 1,
        size: this.size,
        deviceType: this.deviceType,
        keyword: keyword
      }
      this.getDeviceList(params)
    },
    clear() {
      this.getDeviceList({ page: 1, size: this.size })
    },
    setDeviceList() {
      for(let i = 0; i < 5; i++) {
        this.deviceList.push({
          name: `开关${i + 1}`,
          devId: (Math.random() * 100).toString().replace('.', '').substr(0, 11),
          online: '在线/离线',
          product: '开关',
          deviceType: `${i % 2 === 0 ? '普通' : '终端'}设备`
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
        deviceType: this.deviceType
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
    pickerPro,
    card,
    noData,
    loadMore
  }
}
</script>

<style lang="scss">
.device-container {
  display: flex;
  flex-direction: column;
  .search-wrap {
    width: 100%;
    height: 8vh;
    .select-down {
      height: 52px;
      padding: 0 5px;
      font-size: 15px;
      line-height: 52px;
      color: #999;
      &:after {
        content: "";
        display: inline-block;
        border: 10rpx solid transparent;
        border-top-color: #999;
        position: absolute;
        top: 50%;
        transform: translateY(-25%);
        margin-left: 3px;
      }
    }
  }
  .content-wrap {
    margin-bottom: 30px;
    margin-top: 70px;
  }
}
</style>