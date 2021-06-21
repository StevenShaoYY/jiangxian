import * as userApi from '@/api/login';
import * as deviceApi from '@/api/device';

const user = {
  state: {
    isLogin: false,
    token: {},
    userInfo: {},
    deviceNum: ''
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_DEVICE_NUM: (state, deviceNum) => {
      state.deviceNum = deviceNum
    },
  },
  actions: {
    // 登录
    login({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        userApi.login(data).then(res => {
          console.log('Vuex登录', res);
          const token = {
            access_token: res[1].data.access_token,
            refresh_token: res[1].data.refresh_token
          }
          commit('SET_IS_LOGIN', true)
          commit('SET_TOKEN', token)
          resolve(200)
          dispatch('getUserInfo')
          dispatch('getDeviceNumInfo')
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    logout({commit}) {
      commit('SET_TOKEN', {})
      commit('SET_IS_LOGIN', false)
      commit('SET_USER_INFO', {})
      commit('SET_DEVICE_NUM', '')
    },
    // 获取用户信息
    getUserInfo({commit}) {
      userApi.getUserInfo().then(res => {
        // console.log('用户信息', res);
        commit('SET_USER_INFO', res[1].data)
      })
    },
    // 获取设备数量信息
    getDeviceNumInfo({commit}) {
      deviceApi.getDeviceNumInfo().then(res => {
        // console.log('设备数量', res);
        commit('SET_DEVICE_NUM', res[1].data.deviceAll)
      })
    }
  }
}

export default user