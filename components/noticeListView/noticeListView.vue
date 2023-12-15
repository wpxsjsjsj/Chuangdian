<template>
	<view style="width: 100%; display: flex;flex-direction: column;" v-for="item in list" @click="toDetail(item.id)">
		<view class="h-layout">
			<image :class="[item.isRead == 1?'img-read':'img-noread']" :src="item.isRead == 1?'/static/ic_notice_read.png':'/static/ic_notice_noread.png'"></image>
			<view style="flex: 1;display: flex;flex-direction: column; margin-right: 20rpx;">
				<text style="font-size: 28rpx;font-weight: 500;color:#333333;">{{item.title}}</text>
				<text style="font-size: 28rpx;font-weight: 400;color: #666666;margin-top: 8rpx;">{{item.content}}</text>
			</view>
			<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
		</view>
		<view style="background-color: rgba(204,204,204,0.2);height: 2rpx;margin-left: 144rpx;margin-right: 48rpx;"/>
	</view>
</template>

<script>
	export default {
		name: "noticeListView",
		//接收父控件的值
		props: ['list'],
		data() {
			return {

			};
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/noticeDetail/noticeDetail?id=" + id+"&title="+"消息详情"
				})
			}
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 32rpx;
	}
	.img-read{
		width: 68rpx;
		height: 68rpx;
		margin-right: 28rpx;
	}
	.img-noread{
		width: 78rpx;
		height: 78rpx;
		margin-right: 18rpx;
	}
</style>