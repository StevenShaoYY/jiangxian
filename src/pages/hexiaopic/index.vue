<template>
  <view class="map-container">
    <form @submit="scan" @reset="formReset">
        <view class="uni-form-item uni-column">
            <view class="title">消费金额</view>
            <input class="uni-input" v-model="rmb"  type="number" name="input" placeholder="请输入用户消费金额" />
        </view>
        <view class="uni-form-item uni-column">
            <view class="title">上传账单</view>
            <button v-if="imgSrc==''" class="photo" @click="selectPic">拍摄账单</button>
            <img v-else :src="imgSrc" alt="" class="image">
        </view>
        <button form-type="submit" class="nextbtn" >
          扫描消费券
        </button>
    </form>
    
    
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import tabBar from '../../layouts/tabBar';

import {hexiao} from '@/api/device';
export default {
  data() {
    return {
      list:uni.getStorageSync('hexiao')||[],
      Vcode:'',
      imgSrc:'',
      rmb:''
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'productList', 'deviceTypeList'])
  },
  mounted() {
  },
  methods: {
    selectPic(){
      uni.chooseImage({
        count: 1, //上传图片的数量，默认是9
        sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
        success: res=> {
            const tempFilePaths = res.tempFilePaths;    //拿到选择的图片，是一个数组
            console.log(111,res)
            uni.showLoading({
              title: '上传中',
              mask:true
            });
            wx.uploadFile({
              url:'https://jiangxian.nanjingyuanxin.com/jiang/mini/photo/upload',		//post请求的地址
              filePath:tempFilePaths[0],
              files:res.tempFiles,
              fileType:'image',
              name:'photo',	
              header:{
                'token':uni.getStorageSync('token')||'',
                'Content-Type': 'multipart/form-data'
              },
              success: uploadFileRes => {
                //这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
                // var obj = JSON.parse(uploadFileRes.data);
                console.log(222,uploadFileRes)
                this.imgSrc = JSON.parse(uploadFileRes.data).result
                console.log(this.imgSrc)
				
              },
              fail:e=>{
                console.log(e)
              },
              complete:()=>{
                uni.hideLoading();
              }
            })
        }
    });
    },
    formatDateTime  (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second=date.getSeconds();
        second=second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },
    scan(){
      if(this.rmb == '') {
        uni.showToast({
          title: '请先输入消费金额！',
          icon:"none",
          duration: 2000
        });
        return
      }
      if(this.imgSrc == '') {
        uni.showToast({
          title: '请先上传账单图片！',
          icon:"none",
          duration: 2000
        });
        return
      }
       uni.showLoading({
              title: '核验中',
              mask:true
            });
      uni.scanCode({
        onlyFromCamera:true,
        scanType:[
          'qrCode','barCode'
        ],
        success:(e)=>{
          console.log(e)
         
          hexiao({code:e.result,consumeAmount:this.rmb*100,consumeBillPic:this.imgSrc}).then(res => {
            console.log(res)
            if(res.code==200) {
              uni.showToast({
                title: '核销成功',
                duration: 2000,
                mask:true
              });
              uni.navigateBack({
                 delta: 1
              });
            } else {
              uni.showToast({
                title: res.message || res.result,
                icon:'none',
                duration: 2000,
                mask:true
              });
            }
            uni.hideLoading();
          })
        },
        fail:(e)=>{
          // console.log(e)
           uni.showToast({
                title: '对不起，核销失败!',
                icon:'none',
                duration: 2000
              });
        },
        complete:()=>{
        }
      })
    }
  },
  components: {
    tabBar
  }
}
</script>

<style lang="scss">
.map-container {
  width: 750rpx;
  height: calc(100vh - 100rpx);
  padding: 50rpx 0;
  background-color: #ddd;
  overflow: auto;
  display: flex;
  color:#222;
  flex-direction: column;
  align-items: center;
  .uni-input{
    width: 600rpx;
    bottom: 1rpx solid #cccccc !important;
    background-color: #fff;
    line-height: 70rpx;
    margin: 20rpx 40rpx;
    padding: 20rpx;
  }
  .photo{
    width: 260rpx;
    font-size: 26rpx;
    float: left;
    margin: 20rpx 0 0 38rpx;

  }
  .nextbtn{
    width: 600rpx;
    left: 75rpx;
    position: absolute;
    bottom: 40rpx;
  }
  .image{
    width: 300rpx;
    height: 550rpx;
    margin: 20rpx;
  }
}
</style>