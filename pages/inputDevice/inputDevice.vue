<template>
	<view class="bg">
		<view style="width: 750rpx; flex: 1;display: flex;justify-content: center;align-items: center;">
			<view
				style="width: 560rpx; height: 76rpx; display: flex;flex-direction: row;align-items: center;background: #FFFFFF;border-radius: 38rpx;border: 2rpx solid #F0F0F0;">
				<image style="width: 26rpx;height: 32rpx;margin-left: 34rpx;" :src="'/static/ic_input_device.png'">
				</image>
				<input style="flex: auto; height: 100%;font-size: 24rpx;color: #999999;padding: 0 26rpx;"
					placeholder-style="color:#999999" v-model="keyword" confirm-type="search" @confirm="search" placeholder="请输入设备SN码"  />
			</view>
		</view>
		<view
			style="width: 750rpx; position: absolute; bottom: 0rpx; display: flex;flex-direction: column;justify-content: center;align-items: center; ">
			<view style="width: 560rpx;height: 84rpx; background-color: #38CBD5;border-radius: 40rpx;border: 2rpx solid rgba(60,148,255,0.16);
				color: #FFFFFF;font-size: 28rpx;display: flex;justify-content: center;align-items: center;" @click="scan()">扫码绑定
			</view>
			<view
				style="width: 560rpx;height: 84rpx; background: #FFFFFF;border-radius: 40rpx;border: 4rpx solid #38CBD5;
				margin-top: 32rpx;margin-bottom: 100rpx;color: #333333;font-size: 28rpx;display: flex;justify-content: center;align-items: center;"
				@click="searchDevice()">扫描设备</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			scan() {
				uni.navigateTo({
					url: "/pages/scanQrCode/scanQrCode"
				})
			},
			searchDevice() {
				uni.navigateTo({
					url: "/pages/searchDevice/searchDevice"
				})
			},
			search: function(event){
				console.log("点击搜索",event.detail.value);
				uni.redirectTo({
					url:"/pages/bindDevice/bindDevice?sn="+event.detail.value
				})
				
			}
			
			
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
</style>