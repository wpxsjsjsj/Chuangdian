<template>
	<view style="flex-direction: column;" v-for="item in list">
		<view class="h-layout" @click="goTo(item.url)">
			<image style="width: 52rpx;height: 52rpx;" :src="item.img"></image>
			<text style="flex: 1;font-size: 28rpx;color:#333333; padding-left: 16rpx;">{{item.txt}}</text>
			<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		name: "mineListView",
		//接收父控件的值
		props: ['list'],
		data() {
			return {

			};
		},
		methods:{
			goTo(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		align-items: center;
		padding: 26rpx 42rpx 26rpx 30rpx;
	}
	.line {
		background-color: #F4F4F4;
		height: 1px;
		margin-left: 98rpx;
		margin-right: 32rpx;
	}
</style>