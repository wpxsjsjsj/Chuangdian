<template>
	<view style="display: flex;flex-direction: column;" v-for="(item,index) in list" @click="selectItem(index)">
		<view class="h-layout">
			<image style="width: 32rpx;height: 32rpx;padding:24rpx;"
				:src="item.isSelect == 1?'/static/ic_circle_check.png':'/static/ic_circle_uncheck.png' "></image>
			<!-- 左边布局 -->
			<view style="width: 200rpx;height: 232rpx;background: #F3F4F6;border-radius: 16rpx;display:flex; flex-direction: column;">
				<!-- 左上角图片 -->
				<image
					style="width: 28rpx; height: 28rpx;background: #FFFFFF;border-radius: 16rpx 4rpx 4rpx 0rpx; padding: 8rpx 12rpx;"
					:src="'/static/ic_circle_check.png'"></image>
				<view
					style="width: 200rpx;border-radius: 16rpx;display:flex; flex-direction: column;justify-content: center;align-items: center;">
			
					<!-- 剩余电量 -->
					<huihui-progress originalColor="#FFFFFF" processColor="#FE5100" innerbgColor="#F3F4F6" :process="70"
						:startPosDegree="0" :radius="60" :barWidth="15">
						<text style="font-size: 24rpx;font-weight: 400;color: #666666;">70%</text>
						<!-- <view style="display:flex; flex-direction: column;justify-content: center;align-items: center;">
							<view style="align-items:baseline">
								<text style="font-size: 60rpx;font-weight: 500;color: #666666;">{{process}}</text>
								
							</view>
							<image style="width: 38rpx;height: 38rpx;" :src="'/static/ic_battery.png'"></image>
						</view> -->
					</huihui-progress>
					<view style="font-size: 24rpx;font-weight: 400;color: #999999;margin-top: 4rpx;">剩余电量</view>
			
				</view>
			
			</view>
			
			<view style="flex: 1;height: 232rpx;display: flex;flex-direction: column; margin-left: 30rpx;">
				<!-- SN -->
				<text
					style="font-size: 32rpx;font-weight: bold;color: #333333;margin-top: 15rpx;">SN123456&nbsp;&nbsp;|&nbsp;&nbsp;BH123456</text>
				<!-- 地址 -->
				<view style="display: flex; flex-direction: row;margin-top: 20rpx;align-items: flex-start;">
					<image style="width: 40rpx;height: 28rpx;margin-top: 6rpx;" :src="'/static/ic_address.png'"></image>
					<!-- <text :class="[item.online == 1?'txt-blue':'txt-yellow']">{{item.online == 1?'在线':'离线'}}</text> -->
					<text style="font-size: 24rpx; color: #666666; font-weight: 400;margin-left: 10rpx;">
						{{item.address}}
					</text>
				</view>
				<view style="flex: 1;"></view>
				<!-- 剩余 -->
				<text
					style="font-size: 24rpx;font-weight: 400;color: #999999;background: #F3F4F6;border-radius: 16rpx;padding: 12rpx 20rpx;">
					纸剩余约<font style="color: #38CBD5;">234</font>次&nbsp;|&nbsp;点剩余约<font style="color: #38CBD5;">234
					</font>天
				</text>
			
				<!-- 进度条 -->
				<!-- <view style="display: flex; flex-direction: row;align-items: baseline;margin-top: 10rpx;">
					<ai-progress style="flex: 1;" :percentage="item.value" noData="true" bgColor="#38CBD5"
						inBgColor="#EBF9FA"></ai-progress>
			
					<text
						style="font-size: 24rpx;font-weight: 400;color: #666666;margin-left: 32rpx;">余{{item.value}}%</text>
			
				</view> -->
			
			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "selectShareDeviceListView",
		//接收父控件的值
		props: ['list'],
		data() {
			return {

			};
		},
		methods: {
			selectItem(index) {
				if(this.list[index].isSelect == 1){
					this.list[index].isSelect = 2
				}else{
					this.list[index].isSelect = 1
				}
				/* uni.navigateTo({
					url: "/pages/deviceDetail/deviceDetail?id=" + id
				}) */
			}
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #FFFFFF;
		margin-bottom: 4rpx;
		padding: 30rpx 20rpx 30rpx 0;
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
</style>