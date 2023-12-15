<template>
	<view class="h-layout">
		<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">消息推送设置</text>
		<switch checked @change="switchChange" color="#38CBD5" style="transform:scale(0.7)"/>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			switchChange: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
			},
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 60rpx 48rpx 100rpx 48rpx;
	}
</style>