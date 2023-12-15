<template>
	<view style="display: flex; flex-direction: column;" v-for="(item,index) in list">
		<view class="h-layout" @click="onShow(index)">
			<text
				style="background: #38CBD5;padding: 4rpx; font-size: 28rpx;font-weight: 400;color: #FFFFFF;">Q{{index+1}}</text>
			<text
				style="flex: 1; font-size: 28rpx;font-weight: 500;color: #333333;margin-left: 16rpx;">{{item.name}}</text>
			<image style="width: 26rpx;height: 26rpx;"
				:src="item.isShow == 1?'/static/ic_jiao_up.png':'/static/ic_jiao_down.png'"></image>

		</view>
		<view style="font-size: 28rpx;font-weight: 500;color: #333333;margin:0 30rpx 32rpx 90rpx;"
			v-if="item.isShow == 1" v-html="item.content"></view>

	</view>
</template>

<script>
	export default {
		name: "questionListView",
		//接收父控件的值
		props: ['list'],
		data() {
			return {

			};
		},
		methods: {
			onShow(index) {
				if (this.list[index].isShow == 1) {
					this.list[index].isShow = 0
				} else {
					this.list[index].isShow = 1
				}
				console.log(">>>>" + index + this.list[index].isShow);
			}
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		align-items: center;
		flex-direction: row;
		padding: 32rpx;
	}
</style>