/*
 * @Description: Vuex getters
 * @version: v1.0
 * @Author: ZhangCb
 * @Date: 2021-04-14 17:21:28
 * @LastEditors: ZhangCb
 * @LastEditTime: 2021-04-23 10:41:52
 */
const getters = {
  // 程序模块
  platform: state => state.app.platform,
  isIos: state => state.app.isIos,
  isH5: state => state.app.isH5,
  barHidden: state => state.app.barHidden,
  // 用户模块
  access_token: state => state.user.token.access_token,
  refresh_token: state => state.user.token.refresh_token,
  isLogin: state => state.user.isLogin,
  userInfo: state => state.user.userInfo,
  deviceNum: state => state.user.deviceNum,
  // 设备模块
  deviceTypeList: state => state.device.deviceTypeList,
  productList: state => state.device.productList,
  currentDevicePk: state => state.device.currentDevice.pk,
  currentDeviceDevId: state => state.device.currentDevice.devId
}

export default getters