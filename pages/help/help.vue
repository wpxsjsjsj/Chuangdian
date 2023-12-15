<template>
	<view class="bg">
		<view class="h-layout" style="padding-top: 60rpx;" @click="goTo('/pages/question/question')">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">常见问题</text>
			<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
		</view>
		<view class="h-layout" @click="goTo('/pages/noticeDetail/noticeDetail?id=0&title=设备链接介绍')">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">设备链接介绍</text>
			<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
		</view>
		<view class="h-layout" @click="goTo('/pages/noticeDetail/noticeDetail?id=1&title=故障排除')">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">故障排除</text>
			<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
		</view>
		<view class="h-layout" @click="goTo('/pages/onlineFeedback/onlineFeedback')">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">在线反馈</text>
			<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
		</view>
		<view class="h-layout" @click="goTo('/pages/messagePushSetup/messagePushSetup')">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">消息推送设置</text>
			<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
		</view>
		<view class="h-layout" @click="goTo('/pages/noticeDetail/noticeDetail?id=1&title=隐私协议&noticeType=2')">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">隐私协议</text>
			<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
		</view>
		<view class="h-layout" @click="versionNum()">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">版本号</text>
			<text
				style="font-size: 28rpx;color:#333333;font-weight: 400;color: #666666;margin-right: 32rpx; ">{{version}}</text>
			<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad() {
			plus.runtime.getProperty(plus.runtime.appid, (appInfo) => {
				// appInfo为当前应用程序的所有信息
				console.log(JSON.stringify(appInfo));
				// 获取版本名称
				console.log(appInfo.version);
				if (appInfo.version) {
					this.version = "v" + appInfo.version;
				}
				// 获取版本号
				console.log(appInfo.versionCode);
				if (appInfo.versionCode) {
					this.versionCode = appInfo.versionCode
				}
				// 获取当前应用id
				console.log(appInfo.appid);
			});
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					// 如果是安卓
					this.type = 2
					break;
				case 'ios':
					// 如果是ios
					this.type = 1
					break;
				default:
					this.type = 3
					break
			}
		},
		data() {
			return {
				version: "v1.0.0",
				versionCode: 100,
			}
		},
		methods: {
			//系统版本号
			async versionNum() {
				const res = await this.$myRequest({
					url: 'api/app/version',
					method: "POST",
					data: {
						//类型:1=IOS,2=ANDROID
						type: this.type,
						//当前版本比较号int
						compare_version: this.versionCode,
						// compare_version: 120,
						//当前版本号字符串
						version: this.version
					}
				})

				/* 
				 "data": {
				     "url": "/uploads/20230503/8af0030a85ce2e114109d84d7be9e662.jpg",
				     "name": "1.0.2",
				     "content": "优化一些bug"
				 }
				 */

				if (res.data != "") {
					//有版本更新
					uni.showModal({
						title: this.$t('app.tip'),
						content: this.$t('app.renew'),
						showCancel: true,
						cancelText: this.$t('app.cancel'),
						confirmText: this.$t('app.confirm'),
						success: res => {
							if (res.confirm) {
								// 用户点击确定 

							} else {
								// 否则点击了取消  
							}
						}
					})
				} else {
					//暂无版本更新
					uni.showToast({
						title: this.$t('app.noRenew'),
						icon: 'success'
					})
				}

			},
			goTo(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style>
	.bg {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F3F4F6;
	}

	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #FFFFFF;
		padding: 48rpx;
	}
</style>