<template>
	<div v-if="list&&list.length > 0">
		<view class="h-layout" v-for="item in list">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color: #333333;">{{item.name}}</text>
			<text style="font-size: 28rpx;font-weight: 400;color: #333333;">设备数</text>
			<text style="font-size: 32rpx;font-weight: bold;color: #333333;margin-left: 26rpx;">{{item.count}}</text>
		</view>
	</div>
	<div style="color: #ccc;background: #f3f5f7;text-align: center;" v-else>
		暂无数据
	</div>
</template>

<script>
	export default {
		name: "propertyListView",
		//接收父控件的值
		props: ['list'],
		data() {
			return {

			};
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