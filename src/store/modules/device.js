import * as deviceApi from '@/api/device';

const device = {
  state: {
    productList: [],
    currentDevice: {},
    deviceTypeList: [
      {
        typeName: '全部',
        value: ''
      },
      {
        typeName: '普通设备',
        value: 'GENERAL'
      },
      {
        typeName: '中继设备',
        value: 'SWITCH'
      },
      {
        typeName: '网关设备',
        value: 'GATEWAY'
      },
      {
        typeName: '终端设备',
        value: 'TERMINAL'
      },
    ]
  },
  mutations: {
    SET_PRODUCT_LIST: (state, productList) => {
      state.productList = productList
    },
    SET_CURRENT_DEVICE: (state, currentDevice) => {
      console.log('currentDevice', currentDevice);
      state.currentDevice = currentDevice
    }
  },
  actions: {
    // 获取产品列表
    getProductList({commit}) {
      deviceApi.getProductInfoAll().then(res => {
        console.log('产品列表', res);
        commit('SET_PRODUCT_LIST', res[1].data)
      })
    }
  }
}

export default device