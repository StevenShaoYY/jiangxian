/*
 * @Description: 登陆接口
 * @version: v1.0
 * @Author: ZhangCb
 * @Date: 2021-04-12 11:33:08
 * @LastEditors: ZhangCb
 * @LastEditTime: 2021-04-19 17:50:23
 */
import api from '../utils/service/index';

// 登录
export const login = (data) => api.post(`/api/user/login`, data)
// 获取登录密钥
export const getSecretKey = (params) => api.get(`/api/user/secretKey`, params)
// 获取验证码
export const getImgCaptcha = (params) => api.get(`/api/images/getImgCaptchaBase64`, params)
// 获取用户信息
export const getUserInfo = () => api.get('/api/user/self')
