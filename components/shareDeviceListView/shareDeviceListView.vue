<template>
	<view style="display: flex;flex-direction: column;" v-for="item in list" @click="toDetail(item.id)">
		<view class="h-layout">
			<image style="width: 84rpx;height: 84rpx;" :src="'/static/ic_head.png'"></image>
			<text
				style="flex: 1;font-size: 28rpx;font-weight: 500;color: #333333;margin-left: 28rpx;">{{item.name}}</text>
			<text style="font-size: 28rpx;font-weight: 500;color: #38CBD5;margin-right: 8rpx;background: #FFFFFF;border-radius: 16rpx;border: 2rpx solid #38CBD5;
				text-align:center;padding: 8rpx 24rpx;" @click="shareDevice()">分配设备</text>
			<text style="font-size: 28rpx;font-weight: 500;color: #FFFFFF;margin-left: 8rpx;background: #38CBD5;border-radius: 16rpx;
					text-align:center;padding: 8rpx 24rpx;" @click="deviceList()">设备列表</text>
		</view>

	</view>
</template>

<script>
	export default {
		name: "shareDeviceListView",
		//接收父控件的值
		props: ['list'],
		data() {
			return {

			};
		},
		methods: {
			//分享设备
			shareDevice(){
				uni.navigateTo({
					url:"/pages/shareDeviceList/shareDeviceList"
				})
			},
			
			//设备列表
			deviceList() {
				uni.navigateTo({
					url: "/pages/deviceList/deviceList?title=设备列表"
				})
			},
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 0 32rpx 20rpx 32rpx;
		padding: 30rpx;

	}
</style>