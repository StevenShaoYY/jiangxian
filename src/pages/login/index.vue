<template>
	<view class="login-container">
    <view class="login-body">
      <view class="title">
        <text>欢迎使用DMP管理小程序！</text>
      </view>
      <view class="login-form">
        <uni-forms ref="form" :value="formData" :rules="rules">
          <uni-forms-item label="用户名" name="userName" required>
            <uni-easyinput
              type="text"
              v-model="formData.userName"
              placeholder="请输入用户名"
            />
          </uni-forms-item>
          <uni-forms-item label="密码" name="password" required>
            <uni-easyinput
              type="password"
              v-model="formData.password"
              placeholder="请输入密码"
            />
          </uni-forms-item>
          <uni-forms-item label="验证码" name="code" required>
            <view style="display:flex">
              <uni-easyinput
                type="text"
                v-model="formData.code"
                placeholder="请输入验证码"
              />
              <image
                class="verify-code"
                :src="verifyCodeImg"
                @click="getVerifyCode"
              />
            </view>
          </uni-forms-item>
          <button
            class="login-btn"
            type="primary"
            @click="handleSubmit('form')"
          >
            立即登录
          </button>
        </uni-forms>
      </view>
    </view>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
import { getSecretKey, getImgCaptcha } from '@/api/login'
import { encrypt } from '@/utils/secret'
	export default {
		data() {
			return {
				formData: {
					userName: '',
					password: '',
          code: ''
				},
        cache: '',
        rid: '', // 验证码id
        verifyCodeImg: '', // 验证码url
				rules: {
					userName: {
						rules: [
							{
								required: true,
								errorMessage: '请输入用户名'
							}
						]
					},
					password: {
						rules: [
							{
								required: true,
								errorMessage: '请输入密码'
							}
						]
					},
					code: {
						rules: [
							{
								required: true,
								errorMessage: '请输入验证码'
							}
						]
					},
				},
			}
		},
		created() {
      this.getVerifyCode()
		},
		methods: {
      ...mapActions(['login', 'getProductList']),
			handleSubmit(form) {
				this.$refs[form].submit().then(form => {
            const { password } = form
            // 获取密钥
            getSecretKey({username: this.formData.userName}).then(res => {
              if (res[1].statusCode === 200) {
                // 加密
                this.cache = this.formData.password
                this.formData.password = encrypt(res[1].data, password)
                const data = { ...this.formData, rid: this.rid}
                this.login(data).then(res => {
                  if (res === 200) {
                    this.getProductList()
                    this.formData.password = this.cache
                    uni.redirectTo({ url: '/pages/index/index?isLogin=true' })
                  }
                })
                .catch(err => {
                  this.formData.password = this.cache
                  this.getVerifyCode()
                  uni.showToast({ 
                    title: err[1].data.msg,
                    icon: 'none'
                  })
                })
              }
            })
					})
					.catch(errors => {
						console.error('表单验证失败：', errors)
					})
			},
      // 获取验证码id
      randomRid (n) {
        var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        var s = ''
        for (var i = 0; i < n; i++) {
          var rand = Math.floor(Math.random() * str.length)
          s += str.charAt(rand)
        }
        return s
      },
      // 获取验证码
      getVerifyCode() {
        // this.verifyCodeImg = "data:image/jpg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAjAGkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+o1YzQBhvjLrkZADLkeh7insSqEhSxAyFGMn25rgrr4o+H9F8San4duRqTXlnEksaeVva4ZxHshiBYu8jGQYBAxzkgLmgDtQ7QK0k85ZFGHJjwAc5yPRRnHfgcngktEk0dxO8iSMuwlFQZGF/H7x3dMD7vfGTx3hP4kaX4i8SXOizx6lpmsRoGFjqUAgZ1wD8q7idwHzYODhv4guR3TRq7IzDJQ7l9jgj+RNAEbXHluwkjcDJ2lVL7gACTwOO4x3xxUUF1DeuGt7lypAYALhWHfBI56gHB4wOhrjdR+KWl6f4iu9D0/R9c1uez/4+n0q2+0rC5P3Cd3Ucg9gRjsQOm0bUIPEWiLqEBuY0uBIgE0Pkz25DFXjYHoyurD/AICOvUgF+OOdXaRnyWYjyw3yY3cHkZztxx0zn1zRIjx24PnzsYzvJVVLSAc7cYxz7YPvVSaKfz5p1lMdx5ixRskblWT7wVxyOpb5h09RyK4nTfjVoGr6Ytxp2la5e3ZlZG060tVmuFVQpMpVWwI8uqgkgk5wODgA9GEqmYxYfcBkkodv54xUSMLyCKVJJY1OCVGAQQQcN6EYII9yKwvB3jjR/HemNfaNMw8l9lxbTqBNF125AJABxkEEg4I6g42bieysjcTyS21sQoknmlwo2AE5ZjjoqtyTwBnpQAlu9w+yYNI0cr5Mc0YRol2njHBzuwO/H51Hpeu6XrRlOmalZXqIcbrWdZR0HUrwDz09CD3rgLP4xaTc2szWGmeJbvT7abypNXGnb4I0XBZ5GBztC/MflDbSOAeayf2eY1ufhtqluc/NqcmcggcxRdwRnpyM/wA6APXrYlmLxyeZbvlhuJ3I2eRz268HlSMdOBYqmYmcx2828rhz8nKkAjblj8wbBByD1BParlADJVdoyI32P2bGfzHp/nivHNCtIJ/2n/E/2iKOdotLRkaVASrGO3UsOOCVZhx2Yjoa9mrno/DGnWXieXxTFZrFqtzH5N5KjySGSPChQF6D7idFB469cgHnfiIeR+014WPm4VdIkIaQ5CAJc9T1I4zyfXmvXY7XFklvPI0+FAZn4L/XHb+Y65rMuPCekXfi608UT27vqtpAbeCTzGCop3Z+UHBOHYc+v0q+lnILWNXmR7qLOycx5289MEk4xgHnJHfPNAHkuueBNS0/Wda8V/DLxLb29yXkXULDcsieaoLSKCdyh87fkYDaWPzKMCus+Fnja/8AHvhVtUvre2tp4LuS2lWANtkwqsGUEkrw4BBLZxnjOA/UfhN4L1rUrnUtT0GF725kZ5XhnmjVjnglVYDcRgk45OT3rq7K0tNNt4rLTLW3trWJypgt41RI8gsflGAMkg9O/TnNAE9zFFNbSRzpviI+ZcE5+gHOfpXi37PcUaeAtWuTaQ5XUsyTEhWkVI0YLu7bSSwzx8x6ZJr2E3CmZZUtwSw8tWdWSRj94qAV6YBOc4zx71n+HvDmi+DNLkstJsvsVpJO0roskko3EAbiWJI+VVz2H6kA82+EkUV74++JR3lov7WDgo3DfvLnHI+uQR3ANdN8YGuz8Kdcgg8yW68qNnNsh4j81SxIBJC7A+SeMK2a6DTPDOkaDrV/eaRbfZ7zU5ftF9mZyJzuY7vm3DILscLtHzDPate4UmRGyVCuhJaQqrckYGD15HBGDwPcAHD+D9V0iy+Efh69hubK1sTZxQzvORFF5igiUfNhdxkDgk43En5uQa5L9n5I7v4fanZTwTPEdTd/lBAkPlR/Lu7YwD1HUV21r8I/BFvq8mpHw7ZtMXZljYu8PzZz+6YlB97GMYGAQB23fDfhfSvCNpJp+h2C2ljJIZ2HnvITIQFP3yeMKO/bpQBqTXUcLhCsjuRnbGhYgepx07/XBxk8VPVFhbW8iSNIbaSZlIiDAbmzzwOpO7BPPY9gavUANWNFkd1GGfG73x3+vv7D0p1FFABRRRQA141k27hnawYHoQadRRQAUUUUAFIyq6MjqGVhgqRkEUUUALRRRQAUUUUAf//Z"
        this.rid = this.randomRid(16)
        getImgCaptcha({rid: this.rid}).then(res => {
          console.log('验证码', res);
          this.verifyCodeImg= `data:image/jpg;base64,${res[1].data}`
        })
      },
		}
	}
</script>

<style lang="scss">
	// @import "../../common.scss";
	.login-container {
		font-size: 14px;
		line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-body {
      width: 100%;
      height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        // height: 15vh;
        // line-height: 15vh;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
      }
      .login-form {
        margin-top: 40px;
        .verify-code {
          width: 20vw;
          min-width: 45px;
          height: 36px;
          margin-left: 8px;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .login-btn {
          margin-top: 40px;
          background: $uni-color-primary;
          border-color: $uni-color-primary;
        }
      }
    }
	}
</style>
