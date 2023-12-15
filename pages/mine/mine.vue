<template>
	<view class="bg">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view style="display: flex;flex-direction: row;padding: 28rpx;">
			<view style="flex: auto;" />
			<!-- 通知 -->
			<view class="notice" @click="toNotice()">
				<image style="width: 36rpx;height: 40rpx; " :src="'/static/ic_notice.png'" />
				<text v-if="notice" class="num">{{notice}}</text>
			</view>
		</view>
		<!-- 个人信息 -->
		<view style=" display: flex; flex-direction: row;margin-bottom: 44rpx;" class="center" @click="information()">

			<!-- 头像 -->
			<image style="width: 156rpx;height: 156rpx;margin-left: 34rpx;border-radius: 50%;" :src="avatar? avatar : '/static/ic_head.png'">
			</image>

			<!-- 昵称、邮箱 -->
			<view style="flex: 1; isplay: flex;flex-direction: column; margin-left: 26rpx;">
				<view style="font-size: 40rpx; color: #333333;font-weight: 600;">{{userName}}</view>
				<view style="font-size: 24rpx; font-weight: 400;color: #666666;margin-top: 10rpx;">{{phone}}
				</view>
			</view>

			<!-- 二维码 -->
			<image style="width: 90rpx;height: 90rpx; margin-right: 30rpx;" :src="'/static/web_qrcode.png'" />

		</view>
		<view
			style="flex: auto; display: flex;flex-direction: column;border-radius: 32rpx 32rpx 0rpx 0rpx;background-color: white; ">
			<!-- 列表数据 -->
			<mineListView :list="list" />
			<view style="flex: auto;" />
			<!-- 登录按钮 -->
			<button class="btn" @click="loginOut()" type="default" plain="true">退出登录</button>
		</view>
		<tabbar  :initCurrIndex="user.group_id == 2? '3' : '1'" />

	</view>
</template>

<script>
	import tabbar from '../../components/tabbar/tabbar.vue'
	export default {
		components: {
			tabbar
		},
		onLoad() {
			uni.hideTabBar();
			console.log('进入了我的页面',uni.getStorageSync('userinfo'))
			if(uni.getStorageSync('userinfo')){
				let userinfo = uni.getStorageSync('userinfo')
				this.userName = userinfo.nickname
				this.phone = userinfo.mobile
				this.avatar = userinfo.avatar
			}
			/* plus.runtime.getProperty(plus.runtime.appid, (appInfo) => {
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
			} */
		},
		data() {
			return {
				avatar: '',
				// userName: uni.getStorageSync("userinfo").nickname,
				// phone: uni.getStorageSync("userinfo").phone,
				userName: "七七七七",
				phone: "1234567890",
				notice: "99",
				user: uni.getStorageSync('userinfo'),
				/* version: "v1.0.0",
				versionCode: 100,
				type: 1 */
				list: [{
						img: '/static/ic_mine_item1.png',
						txt: "共享管理",
						url: "/pages/shareDevice/shareDevice"
					},
					{
						img: '/static/switch.png',
						txt: "网关管理",
						url: "/pages/gateway/gateway"
					},
					{
						img: '/static/ic_mine_item2.png',
						txt: "地址管理",
						url: "/pages/addressManage/addressManage"
					},
					{
						img: '/static/ic_mine_item3.png',
						txt: "我的订单",
						url: "/pages/orderList/orderList"
					},
					{
						img: '/static/ic_mine_item4.png',
						txt: "优惠券",
						url: "/pages/couponList/couponList?type=user"
					},
					{
						img: '/static/ic_mine_item5.png',
						txt: "帮助与设置",
						url: "/pages/help/help"
					},
					{
						img: '/static/ic_mine_item6.png',
						txt: "关于我们",
						url: "/pages/aboutUs/aboutUs"
					}
				]
			}
		},
		methods: {

			//系统版本号
			// async versionNum() {
			// 	const res = await this.$myRequest({
			// 		url: 'api/app/version',
			// 		method: "POST",
			// 		data: {
			// 			//类型:1=IOS,2=ANDROID
			// 			type: this.type,
			// 			//当前版本比较号int
			// 			compare_version: this.versionCode,
			// 			// compare_version: 120,
			// 			//当前版本号字符串
			// 			version: this.version
			// 		}
			// 	})

			// 	/* 
			// 	 "data": {
			// 	     "url": "/uploads/20230503/8af0030a85ce2e114109d84d7be9e662.jpg",
			// 	     "name": "1.0.2",
			// 	     "content": "优化一些bug"
			// 	 }
			// 	 */

			// 	if (res.data != "") {
			// 		//有版本更新
			// 		uni.showModal({
			// 			title: this.$t('app.tip'),
			// 			content: this.$t('app.renew'),
			// 			showCancel: true,
			// 			cancelText: this.$t('app.cancel'),
			// 			confirmText: this.$t('app.confirm'),
			// 			success: res => {
			// 				if (res.confirm) {
			// 					// 用户点击确定 

			// 				} else {
			// 					// 否则点击了取消  
			// 				}
			// 			}
			// 		})
			// 	} else {
			// 		//暂无版本更新
			// 		uni.showToast({
			// 			title: this.$t('app.noRenew'),
			// 			icon: 'success'
			// 		})
			// 	}

			// },
			//退出登录
			async loginOut() {
				uni.showModal({
					title: "提示",
					content: "确认退出吗？",
					showCancel: true,
					cancelText: "取消",
					confirmText: "确认",
					success: res => {
						if (res.confirm) {
							// 用户点击确定 
							const res = this.$myRequest({
								url: 'api/user/logout',
								method: "POST",
								data: {
									// mobile: this.login.account,
									// password: md5.hex_md5(this.login.password)
								}
							})
							//清除缓存数据
							uni.clearStorageSync()
							/* uni.removeStorageSync("token")
							uni.removeStorageSync("userinfo") */

							//跳转登录页面-关闭所有页面
							uni.reLaunch({
								url: "/pages/login/login"
							})
						} else {
							// 否则点击了取消  
						}
					}
				})
			},
			//通知
			toNotice() {
				uni.navigateTo({
					url: "/pages/notice/notice"
				})
			},
			//个人信息
			information(){
				uni.navigateTo({
					url: "/pages/information/information"
				})
			},

		}
	}
</script>

<style>
	/* 沉浸式适配 */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #F3F4F6;
	}
	
	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #F3F4F6;
		top: 0;
		z-index: 999;
	}
	.bg {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F3F4F6;
		padding-bottom: var(--window-bottom);
	}
	

	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.notice {
		width: 48rpx;
		height: 48rpx;
		margin-right: 4rpx;
		position: relative;
	}

	.num {
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		font-size: 18rpx;
		color: white;
		border-radius: 12rpx;
		background-color: #F83C1E;
		border: 1rpx solid #FFF;
		text-align: center;
		top: -10rpx;
		right: -1rpx;
	}

	.h-layout {
		display: flex;
		align-items: center;
		padding: 32rpx;
	}

	.line {
		background-color: #EFF2F5;
		height: 1px;
		margin-left: 32rpx;
		margin-right: 32rpx;
	}

	.btn {
		margin: 32rpx;
		border-radius: 48rpx;
		font-size: 32rpx;
		color: #133B24;
	}
</style>