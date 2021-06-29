/*
 * @Description: 设备模块api
 * @version: v1.0
 * @Author: ZhangCb
 * @Date: 2021-04-19 13:55:57
 * @LastEditors: ZhangCb
 * @LastEditTime: 2021-04-22 16:32:04
 */
import api from '../utils/service/index';

// 获取设备数量信息
export const getDeviceNumInfo = () => api.get('/api/device/countTotalDevice')
// 获取产品列表（简要信息）
export const getProductInfoAll = () => api.get('/api/productall')
// 获取设备列表
export const getDeviceList = (params) => api.get(`/api/device/getDeviceList`, params)
// 获取设备参数列表
export const getDeviceParams = (params) => api.get(`/api/model/protocol/${params.pk}`)
// 设备调试发送
export const sendInstructions = (data) => api.post(`/api/device/cloudSend/${data.pk}/${data.devId}?source=${data.source}`, data)
// 获取历史指令数据
export const getInstructionsHistory = (params) => api.get(`/api/device/cloudSendMsgList`, params)
// 获取实时监控
export const getMonitor = (params) => api.get(`/api/device/getSnapshot`, params)
// 获取历史记录
export const getHistory = (params) => api.get(`/api/device/getDevicePackage/${params.pk}/${params.devId}`, params)
// 获取指令发送状态
export const cloudSendMsgInfo = (params) => api.get(`/api/device/cloudSendMsgInfo/${params.messageId}`)

// 活动
export const getActive = (data) => api.post('/mini/party/query',data)
export const getNews = (data) => api.post('/mini/news/query',data)
export const login = (data) => api.post('/mini/user/login',data)
export const getXiaofeiquan = (data) => api.post('/mini/pay/get',data)
export const getTodayStatus = (data) => api.post('/mini/pay/getTodayStatus',data)
export const setPhone = (data) => api.post('/mini/user/setWxPhone',data)
export const getInfo = (data) => api.post('/mini/user/getInfo',data)
export const logout = (data) => api.post('/mini/user/logout',data)
export const deleteQuan = (data) => api.post('/mini/pay/delete',data)
export const getMiniCouponListFromWx = (data) => api.post('/mini/pay/getMiniCouponListFromWx',data)
export const hexiao = (data) => api.post('/mini/pay/verify',data)
export const getCouponConfiFromWx = (data) => api.post('/mini/pay/getCouponConfigFromWx',data)
