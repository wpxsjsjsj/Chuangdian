<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">创点</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			if (uni.getStorageSync("token") !== null && uni.getStorageSync("token").length > 0) {
				//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
				let loginUrl = uni.getStorageSync("userinfo") && uni.getStorageSync("userinfo").group_id == 2? '/pages/main/main' : '/pages/shop/shop'
				uni.switchTab({
					url: loginUrl
				})
				/* setTimeout(function() {
					
				}, 3000); */

			} else {
				//跳转登录面-关闭当前页面
				uni.redirectTo({
					url: "/pages/login/login"
				})
				/* setTimeout(function() {
					
				}, 3000); */
			}
		},
		methods: {
		
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>