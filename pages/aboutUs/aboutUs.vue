<template>
  <view class="bg">
	<!-- 其他内容根据实际需要动态加载 -->
	<view class="content" v-if="Object.keys(aboutUs).length>0" v-html="aboutUs.content"></view>
    <view v-else class="content-layout">
      <!-- Logo -->
      <image class="logo" src="/static/ic_logo.png"></image>
      <!-- 电话信息 -->
      <view class="info-block">
        <image class="icon" src="/static/ic_phone.png"></image>
        <text class="info-label">电话</text>
        <text class="info-content">158 9984 0587</text>
      </view>
      <!-- 分割线 -->
      <view class="divider"></view>
      <!-- 邮箱信息 -->
      <view class="info-block">
        <image class="icon" src="/static/ic_email.png"></image>
        <text class="info-label">邮箱</text>
        <text class="info-content">1804533852@qq.com</text>
      </view>
    </view>
    <view style="display: flex;flex-flow: column">
		<!-- 协议部分 -->
		<view class="agreement">
		  <text class="agreement-text" @click="goTo('/pages/noticeDetail/noticeDetail?id=1&title=隐私协议&noticeType=2')">隐私协议</text>|
		  <text class="agreement-text" @click="goTo('/pages/noticeDetail/noticeDetail?id=1&title=用户协议&noticeType=1')">用户协议</text>
		</view>
		<!-- 底部版权信息 -->
		<view class="footer" style="flex;flex-flow: column;">
		  <text class="footer-text">深圳科技有限公司</text>
		  <text class="footer-text">CopyRight ©www.AuxerU.com, All Rights Reserved</text>
		</view>
	</view>
  </view>
</template>

<script>
	export default {
		onLoad() {
			this.getAboutUs()
		},
		data() {
			return {
				aboutUs: {}
			}
		},
		methods: {
			
			goTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			async getAboutUs(options) {
				let _this = this
				let params = {}
				const res = await this.$myRequest({
					url: 'api/Help/aboutUs',
					method: "POST",
					data: {
						type: '0'
					}
				})
				console.log('获取关于我们的数据', res)
				if(res.code == 1){
					_this.aboutUs = res.data
				}else{
					uni.showToast({
						title: res.msg
					})
				}
			}
		}
	}
</script>

<style>
  .bg {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 0 48rpx;
    height: 100%;
	
    justify-content: space-between; /* 让协议和底部版权信息靠底对齐 */
  }
  .content p{background: #fff;border-bottom: 2rpx solid rgba(149, 149, 149, 0.5);padding: 12rpx 0;}
  .content-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
    padding-top: 118rpx;
    padding-bottom: 145rpx;
  }

  .logo {
    width: 468rpx;
    height: 66rpx;
  }

  .info-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 35rpx 0;
    width: 100%;
  }

  .icon {
    width: 28rpx;
    height: 28rpx;
    margin-right: 16rpx;
  }

  .info-label {
    font-size: 28rpx;
    color: #333333;
    flex-grow: 1;
  }

  .info-content {
    font-size: 28rpx;
    color: #666666;
    text-align: right;
  }

  .divider {
    height: 2rpx;
    background-color: #979797;
    opacity: 0.1;
    width: calc(100% - 96rpx); /* 根据父容器减去padding值 */
  }

  .agreement {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 40rpx 0;
	width: 300rpx;
	margin: 0 auto;
	color: #38CBD5;
  }

  .agreement-text {
    font-size: 28rpx;
    /* color: #333333; */
  }

  .footer {
    align-items: center;
    display: flex;
    justify-content: center;
    padding-bottom: 30rpx;
  }

  .footer-text {
    font-size: 22rpx;
    color: #999999;
    text-align: center;
  }
</style>