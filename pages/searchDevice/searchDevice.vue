<template>
	<view class="bg">
		<!-- 暂无数据 -->
		<view v-if="isSearch" class="center">
			<view class="radar" style="width: 460rpx;height: 460rpx;"></view>
			<text
				style="font-size: 28rpx;color: #141B24;margin-top: 90rpx;font-weight: 400;">正在搜索...</text>
		</view>
		
		<view
			style="width: 750rpx; position: absolute; bottom: 0rpx; display: flex;flex-direction: column;justify-content: center;align-items: center; ">
			<view style="width: 560rpx;height: 84rpx; background-color: #38CBD5;border-radius: 40rpx;border: 2rpx solid rgba(60,148,255,0.16);
				color: #FFFFFF;font-size: 28rpx;display: flex;justify-content: center;align-items: center;" @click="scan()">扫描设备</view>
			<view style="width: 560rpx;height: 84rpx; background: #FFFFFF;border-radius: 40rpx;border: 4rpx solid #38CBD5;
				margin-top: 32rpx;margin-bottom: 100rpx;color: #333333;font-size: 28rpx;display: flex;justify-content: center;align-items: center;" @click="input()">手动填写</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSearch: true,
			}
		},
		methods: {
			//搜索设备
			scan(){
				uni.navigateTo({
					url:"/pages/scanQrCode/scanQrCode"
				})
			},
			//手动填写
			input(){
				uni.navigateTo({
					url:"/pages/inputDevice/inputDevice"
				})
			},
		}
	}
</script>

<style lang="scss">
	@import url("/pages/searchDevice/radarscan.css");

	.bg {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F3F4F6;
	}

	.center {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>