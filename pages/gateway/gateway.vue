<template>
	<scroll-view scroll-y="true" class="bg">
	 <view style="display: flex;align-items: center;justify-content: end;margin-bottom: 10px;">
		 <image style="width: 44rpx;height: 44rpx;padding-left: 8rpx;padding-right: 8rpx;"
		 	:src="'/static/ic_add_blue.png'"></image>
		 <text style="font-size: 28rpx;font-weight: 400;color: #333333;padding-right: 32rpx;"
		 	@click="addDevice()">新增网关</text>
	 </view>
	 <view style="display: flex;flex-direction: column;" v-for="item, i in list" @click="toDetail(item)">
		<view class="h-layout" @click="detailMess(item)">
			<!-- <image style="width: 232rpx;height: 232rpx;" :src="'/static/logo.png'"></image> -->
			<!-- 左边布局 -->
			<view class="imgBox">
				<!-- 左上角图片 -->
				<image
					style="width: 100%; height: 100%;background: #FFFFFF;border-radius: 16rpx 4rpx 4rpx 0rpx; padding: 8rpx 12rpx;"
					:src="item.image"></image>
			</view>
			<view class="boxMess">	
				<view class="boxMess_title">
				 <text class="boxMess_num_title">网关ID: </text>
				 <text>{{item.number}}</text>
				</view>
				<view class="boxMess_num">
					<text class="boxMess_num_title">地址: </text>
					<text>{{item.locality}}</text>
				</view>
			</view>
			<image style="width: 21px;height: 21px;" src="/static/switch.png" mode=""></image>
		</view>
	</view>
  </scroll-view>
</template>

<script>
	export default {
		name: "deviceListView",
		//接收父控件的值
		data() {
			return {
              list:[],
			  page: "1"
			};
		},
		onLoad() {
			this.getList();
		},
		methods: {
			toDetail(item) {
				console.log(item)
				return;
				uni.navigateTo({
					// url: "/pages/deviceDetail/deviceDetail?id=" + id
					url: `/pages/deviceOperate/deviceOperate?id=${item.id}&remain=${item.remain}&device_number=${item.device_number}&batlevel=${item.batlevel}&state_text=${item.state_text}`
				})
			},
			async getList(){
				const res = await this.$myRequest({
					url: 'api/Gateway/getGatewayList',
					method: "POST",
					data: {
						page: this.page
					}
				})
				this.list = res.data?.data || []
			},
			addDevice(){
				uni.navigateTo({
					url:"/pages/scanQrCodeForGateway/scanQrCodeForGateway"
				})
			},
			detailMess(mess){
				uni.navigateTo({
					url:"/pages/deviceListForGateway/deviceListForGateway?id="+ mess.number,
					
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
		flex:0 0 80px;
		height: 74px;
		background: rgb(243, 244, 246);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
	}
	.boxMess{
		flex: 1 1 0%;
		    height: 74px;
		    display: flex;
		    flex-direction: column;
		    margin-left: 15px;
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
		background-color: #1db94abf;
		    height: 30px;
		    width: 60px;
		    border-radius: 6px;
		    text-align: center;
		    line-height: 30px;
		    font-size: 12px;
		    color: white;
		    margin-left: 5px;
			
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