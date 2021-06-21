/*
 * @Description: Vuex
 * @version: v1.0
 * @Author: ZhangCb
 * @Date: 2021-04-14 17:21:12
 * @LastEditors: ZhangCb
 * @LastEditTime: 2021-04-20 10:20:54
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import device from './modules/device'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    user,
    device
  },
  getters
})