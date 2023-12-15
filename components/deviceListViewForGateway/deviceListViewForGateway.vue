<template>
	<view style="display: flex;flex-direction: column;" v-for="item, i in list" @click="toDetail(item)">
		<view class="h-layout">
			<!-- <image style="width: 232rpx;height: 232rpx;" :src="'/static/logo.png'"></image> -->
			<!-- 左边布局 -->
			<view class="imgBox">
				<!-- 左上角图片 -->
				<image
					style="width: 100%; height: 100%;background: #FFFFFF;box-sizing: border-box;border-radius: 16rpx 4rpx 4rpx 0rpx;"
					:src="item.device_image"></image>
			</view>
			<view class="boxMess">	
				<view class="boxMess_title">{{item.toilet_type_text}}</view>
				<view class="boxMess_num">
					<text class="boxMess_num_title">编号: </text>
					<text>{{item.device_number}}</text>
				</view>
			</view>
			<view class="currentElectricity">
				<view class="currentElectricity_m">{{item.remain}}%</view>
				<view class="currentElectricity_n" :style="{
					width: item.remain + '%',
					backgroundColor: item.remain > 50 ? '#1db94abf' : 'red'
				}"></view>
			</view>
			<view class="totalElectricity">
				<view class="currentElectricity_m">{{item.batlevel}}%</view>
				<view class="currentElectricity_n" :style="{
					width: item.batlevel + '%',
					backgroundColor: item.batlevel > 50 ? '#1db94abf' : 'red'
				}"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "deviceListView",
		//接收父控件的值
		props: ['list'],
		data() {
			return {

			};
		},
		methods: {
			toDetail(item) {
				console.log(item)
				uni.navigateTo({
					// url: "/pages/deviceDetail/deviceDetail?id=" + id
					url: `/pages/deviceOperate/deviceOperate?id=${item.id}&remain=${item.remain}&device_number=${item.device_number}&batlevel=${item.batlevel}&state_text=${item.state_text}`
				})
			}
		}
	}
</script>

<style>
	.opacity{opacity: 0;}
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 0 32rpx 20rpx 32rpx;
		padding: 30rpx;

	}

	.txt-blue {
		background: #EBF9FA;
		border-radius: 24rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #38CBD5;
		padding: 8rpx 22rpx;
	}

	.txt-yellow {
		background: #FEEDE5;
		border-radius: 24rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #FE5100;
		padding: 8rpx 22rpx;
	}
	.imgBox{
		flex:0 0 74px;
		height: 74px;
		background: rgb(243, 244, 246);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.boxMess{
		flex: 1 1 0%;
		    height: 74px;
		    display: flex;
		    flex-direction: column;
		    margin-left: 10px;
		    justify-content: space-evenly;
	}
	.boxMess_title{
			font-weight: 700;
			    font-size: 14px;
	}
	.boxMess_num{
	 display: flex;
	 font-size: 12px;
	 align-items: baseline;	
	 color: #a7a4a4;
	}
	.currentElectricity{
		height: 30px;
		    width: 60px;
		    background-color: #ccc;
		    border-radius: 6px;
			text-align: center;
			line-height: 30px;
			font-size: 12px;
			color: white;
			position: relative;
            overflow: hidden;			
	}
	.totalElectricity{
		background-color: #ccc;
		    height: 30px;
		    width: 60px;
		    border-radius: 6px;
		    text-align: center;
		    line-height: 30px;
		    font-size: 12px;
		    color: white;
		    margin-left: 5px;
			position: relative;
			overflow: hidden;
			
	}
	.boxMess_num_title{
		word-break: keep-all;
	}
	.currentElectricity_n{
		width: 50%;
		height: 100%;
		background-color: red;
	}
	.currentElectricity_m{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		text-align: center;
		line-height: 30px;
		font-size: 12px;
	}
</style>