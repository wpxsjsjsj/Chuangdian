<template>
	<view class="bg">
		<view
			style="height: 100%; display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin:0 32rpx;">
			<view style="text-align: center;padding: 26rpx;" class="txt-24-333-400">2019.11</view>
			<!-- 表格标题 -->
			<view class="h-layout" style="background-color: #F7FAFF; padding: 24rpx 32rpx;">
				<view style="flex: 1;" class="txt-24-333-400">厕所编号</view>
				<view style="flex: 1;" class="txt-24-333-400">累计用纸(米)</view>
				<view style="flex: 1;" class="txt-24-333-400">累计换纸(卷)</view>
				<view style="flex: 1;" class="txt-24-333-400">人均用纸(米)</view>
			</view>
			<!-- 表格内容 -->
			<scroll-view scroll-y="true" style="flex: 1;overflow: auto;">
				<view v-for="(item,index) in statisticalData" :class="[index % 2 == 0? 'bg-white-h' : 'bg-blue-h'] "
					@click="toDetail(item.title)">
					<view style="flex: 1;" class="txt-24-333-400">{{item.title}}</view>
					<view style="flex: 1;" class="txt-24-333-400">{{item.data1}}</view>
					<view style="flex: 1;" class="txt-24-333-400">{{item.data2}}</view>
					<view style="flex: 1;" class="h-layout">
						<view style="flex: 1;" class="txt-24-333-400">{{item.data3}}</view>
						<image style="width: 10rpx;height: 14rpx;margin-right: 30rpx;" src="../../static/ic_next.png">
						</image>
					</view>
				</view>
			</scroll-view>
			
			<!-- 底部内容 -->
			<view class="h-layout" style="background-color:#38CBD5; padding: 40rpx 32rpx;border-radius:0 0 16rpx 16rpx ; ">
				<view style="flex: 1; font-size: 24rpx;font-weight: 400;color: #F7FAFF;" >当前统计数&nbsp;&nbsp;<font style="font-size: 32rpx;">32</font></view>
				<view style="font-size: 24rpx;font-weight: 400;color: #F7FAFF;" >合计用纸&nbsp;&nbsp;<font style="font-size: 32rpx;">2876米</font></view>
				
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//统计数据
				statisticalData: [{
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					},
					{
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					},
					{
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					},
					{
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					},
					{
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					},
					{
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}, {
						title: "BH123",
						data1: "2521",
						data2: "21",
						data3: "2.0",
					}
				],
			}
		},
		methods: {

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

	.txt-24-333-400 {
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
	}

	.h-layout {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.bg-blue-h {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #F7FAFF;
		padding: 24rpx 32rpx;
	}

	.bg-white-h {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #FFFFFF;
		padding: 24rpx 32rpx;
	}
</style>