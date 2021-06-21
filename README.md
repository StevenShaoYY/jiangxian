# DMP 微信小程序 & H5

## Project setup
```
npm run dev:mp-weixin
npm run dev:H5
```

### Compiles and minifies for production
```
npm run build:mp-weixin
npm run build:H5
```

### Customize configuration
#### 微信小程序 接口配置
src/utils/service/service

```
config: {
  baseUrl: 'url',
}
```
#### H5 本地调试代理配置
manifest.json

```
  "h5" : {
    "devServer" : {
        "proxy" : {
            "/api" : {
                "target" : "url",
                "changeOrigin" : true,
                "pathRewrite" : {
                    "^/api" : ""
                }
            }
        }
    }
}
```

