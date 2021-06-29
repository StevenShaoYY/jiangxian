import store from '@/store'
import { GlobalInterception } from './errCode';
 import {login} from '@/api/device'
export default class Service {
  config = {
	  baseUrl: 'https://jiangxian.nanjingyuanxin.com/jiang',   // 生产环境地址
    timeout: 30000,
    header: {
      'content-type': 'application/json',
    }
  }

  interceptor = {
    request: callback => {
      if (callback) {
        this.beforeRequest = callback
      }
    }
  }

  beforeRequest(config) {
    return config
  }

  /**
   * @name: judgeUrl
   * @msg: 根据环境判断接口url
   * @param {url} url
   */
  judgeUrl(url) {
    // console.log('平台', uni.getSystemInfoSync().platform);
    if (uni.getSystemInfoSync().platform !== 'other') {
      return this.config.baseUrl + url
    } else return url
  }

  request(options = {}) {
    // 设置token
    // if (store.getters.isLogin) {
    //   this.config.header.Authorization = `Bearer ${store.getters.access_token}`
    // } else delete this.config.header.Authorization
    this.config.header.token = uni.getStorageSync('token')||''
    return new Promise((resolve, reject) => {
      return uni.request({
        url: this.judgeUrl(options.url),
        method: options.method,
        data: options.data || options.params,
        header: this.config.header,
      })
      .then(res => {
        if (res[0] !== null) {
          uni.showToast({ title: '网络错误，请检查网络', icon: 'none' })
        } else if (res[1].statusCode === 200) {
          if(res[1].data.code == 400) {
            if(uni.getStorageSync('token')!='') {
              uni.login({
                provider: '',
                success: (res) => {
                  login({
                    code:res.code
                  }).then(res => {
                    uni.setStorageSync('token', res.result);
                    // uni.getUserInfo({
                    //   provider:"weixin",
                    //   success:(userInfo)=> {
                    //       uni.setStorageSync('userInfo', userInfo.userInfo);
                    //       resolve(this.request(options))
                    //     },
                    //     fail:(e) => {
                    //       console.log(e)
                    //     }
                    //   })
                  })
                },
                fail: () => {},
                complete: () => {}
              })
            } else {
              uni.showToast({ title: '请先登录', icon: 'none' })
            }
          }else {
            resolve(res[1].data)
          }
        } else if (res[1].statusCode === 403) {
          uni.showToast({ title: '请先登录', icon: 'none' })
          setTimeout(() => {
            // uni.navigateTo({ url: '/pages/login/index' })
          }, 1000);
        } else {
          res[1].data.msg = GlobalInterception(res[1].data.code)
          reject(res)
          // console.log('reject', GlobalInterception(res[1].data.code));
          // console.log('错误处理', GlobalInterception(res[1].data.code));
          uni.showToast({ title: res[1].data.msg || '服务器错误', icon: 'none' })
        }
      })
    })
  }

  get(url, params = {}) {
    const options = {}
    options.params = params
    return this.request({
      url,
      method: 'GET',
      ...options
    })
  }

  post(url, data, options = {}) {
    return this.request({
        url,
        data,
        method: 'POST',
        ...options
      })
  }
}
