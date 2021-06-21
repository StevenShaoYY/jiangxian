const app = {
  state: {
    platform: '',
    isIos: '',
    isH5: '',
    barHidden: false
  },
  mutations: {
    SET_PLATFORM: (state, platform) => {
      state.platform = platform
    },
    SET_IS_IOS: (state, boolean) => {
      state.isIos = boolean
    },
    SET_IS_H5: (state, boolean) => {
      state.isH5 = boolean
    },
    SET_BAR_HIDDEN: (state, boolean) => {
      state.barHidden = boolean
    }
  },
  actions: {
    GetPlatform({commit}) {
      const platform = uni.getSystemInfoSync().platform
      console.log('platform', platform);
      commit('SET_PLATFORM', platform)
      platform === 'ios' ? commit('SET_IS_IOS', true) : commit('SET_IS_IOS', false)
      platform === 'other' ? commit('SET_IS_H5', true) : commit('SET_IS_H5', false)
    }
  }
}

export default app