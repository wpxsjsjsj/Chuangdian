<template>
	<scroll-view scroll-y="true" class="bg">
		<view style="display:flex; flex-direction: column;">
			<view style="background: #FFFFFF;border-radius: 16rpx;margin: 0 32rpx 32rpx 32rpx;">
				<!-- 设备名称 -->
				<view class="h-layout">
					<text style="flex: 1;font-size: 28rpx;font-weight: 400;color: #333333;padding: 32rpx;">设备名称</text>
					<text style="font-size: 28rpx;font-weight: 400;color: #333333;padding: 32rpx;">{{detail.device_name}}</text>
				</view>
				<view class="line" />
				<!-- 设备ID -->
				<view class="h-layout">
					<text style="flex: 1;font-size: 28rpx;font-weight: 400;color: #333333;padding: 32rpx;">设备ID</text>
					<text style="font-size: 28rpx;font-weight: 400;color: #333333;padding: 32rpx;">{{detail.device_number}}</text>
				</view>
				<view class="line" />
				<!-- 投放地址 -->
				<view class="h-layout">
					<text style="font-size: 28rpx;font-weight: 400;color: #333333;padding: 32rpx;">投放地址</text>
					<text
						style="flex: 1;font-size: 28rpx;font-weight: 400;color: #333333;padding: 32rpx;text-align:right">{{detail.drop_address}}</text>
				</view>
				<view class="line" />
				<!-- 耗材状态 -->
				<view class="h-layout">
					<text style="flex: 1;font-size: 28rpx;font-weight: 400;color: #333333;padding: 32rpx;">耗材状态</text>
					<text style="font-size: 28rpx;font-weight: 400;color: #3390FA;padding: 32rpx;">{{detail.state_text}}</text>
				</view>
			</view>
			<!-- 耗材记录 -->
			<view style="background: #FFFFFF;border-radius: 16rpx;margin: 0 32rpx 32rpx 32rpx;">
				<view style="font-size: 28rpx;font-weight: 400;color: #333333;padding: 32rpx;">耗材记录</view>
				<view style="display:flex; flex-direction: row;">
					<!-- 剩余电量 -->
					<view
						style="flex: 1; display:flex; flex-direction: column;justify-content: center;align-items: center;">
						<huihui-progress originalColor="#F2F2F2" :processColor="detail.batlevel<=40? '#FE5100' : (detail.batlevel>40&&detail.batlevel<=70)? '#f8e197' : '#38CBD5'" innerbgColor="#FFFFFF"
							:process="detail.batlevel" :startPosDegree="0" :radius="114" :barWidth="15">
							<view
								style="display:flex; flex-direction: column;justify-content: center;align-items: center;">
								<view style="align-items:baseline">
									<text style="font-size: 60rpx;font-weight: 500;color: #666666;">{{detail.batlevel}}</text>
									<text style="font-size: 28rpx;font-weight: 500;color: #666666;">%</text>
								</view>
								<image style="width: 38rpx;height: 38rpx;" :src="'/static/ic_battery.png'"></image>
							</view>
						</huihui-progress>
						<view style="font-size: 28rpx;font-weight: 400;color: #333333;margin-top: 20rpx;">剩余电量</view>
					</view>
					<!-- 剩余耗材 -->
					<view
						style="flex: 1; display:flex; flex-direction: column;justify-content: center;align-items: center;margin: 48rpx 0;">
						<huihui-progress originalColor="#F2F2F2" :processColor="detail.remain<=40? '#FE5100' : (detail.remain>40&&detail.remain<=70)? '#f8e197' : '#38CBD5'" innerbgColor="#FFFFFF"
							:process="detail.remain" :startPosDegree="0" :radius="114" :barWidth="15">
							<view
								style="display:flex; flex-direction: column;justify-content: center;align-items: center;">
								<view style="align-items:baseline">
									<text style="font-size: 60rpx;font-weight: 500;color: #666666;">{{detail.remain}}</text>
									<text style="font-size: 28rpx;font-weight: 500;color: #666666;">%</text>
								</view>
								<image style="width: 38rpx;height: 38rpx;" :src="'/static/ic_consumables.png'"></image>
							</view>
						</huihui-progress>
						<view style="font-size: 28rpx;font-weight: 400;color: #333333;margin-top: 20rpx;">剩余耗材</view>
					</view>
				</view>
				<view style="display:flex; flex-direction: row;margin: 120rpx 36rpx 48rpx 36rpx;">
					<view
						style="flex: 1; display:flex; flex-direction: column;justify-content: center;align-items: center; background-color: #EBF9FA; border-radius: 16rpx;padding: 24rpx 0;margin-right: 16rpx;">
						<text style="font-size: 24rpx;font-weight: 500;color: #333333;">出液次数</text>
						<text style="font-size: 36rpx;font-weight: 500;color: #666666;margin-top: 12rpx;">200</text>
					</view>
					<view
						style="flex: 1; display:flex; flex-direction: column;justify-content: center;align-items: center; background-color: #EBF9FA; border-radius: 16rpx;padding: 24rpx 0;margin-left: 16rpx;">
						<view style="display:flex; flex-direction: row;justify-content: center;align-items: center;">
							<text style="font-size: 24rpx;font-weight: 500;color: #333333;">出液档位</text>
							<image style="width: 14rpx;height: 14rpx;margin-left: 16rpx;" :src="'/static/ic_down.png'"></image>
						</view>
						
						<text style="font-size: 36rpx;font-weight: 500;color: #666666;margin-top: 12rpx;">1</text>
					</view>
				</view>

				<view style="height: 2rpx; background-color: #979797;opacity: 0.1;" />
				<view class="h-layout" style="height: 114rpx;">
					<text style="flex: 1; font-size: 24rpx;font-weight: 500;color: #333333;text-align:center">复位 →</text>
					<view style="height: 114rpx;width: 2rpx;background-color: #979797;opacity: 0.1;"></view>
					<text style="flex: 1; font-size: 24rpx;font-weight: 500;color: #333333;text-align:center">报修 →</text>
				</view>
			</view>

		</view>
	</scroll-view>
</template>

<script>
	export default {
		onLoad(options) {
			let _this = this
			// console.log(options.id);
			_this.device_id = options.id
			_this.getDeviceValue(_this.device_id)
		},
		onShow(){
			let _this = this
			if(this.timer){
				clearInterval(this.timer)
				this.timer = null 
			}
			_this.timer = setInterval(()=>{
				_this.getDeviceValue(_this.device_id)
			}, 5000)
		},
		onHide(){
			console.log('推出了页面')
		},
		data() {
			return {
				timer: null,
				device_id: '',
				deviceName: "香氛",
				deviceId: "XX2031",
				address: "广东省广州市大华区明离路科技园880号1栋2楼203室",
				process: 75,
				detail: {} // 详情数据
			}
		},
		onBackPress() {
			// 手机自带返回按钮被点击时触发
			// 在这里清除定时器
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		methods: {
			// 获取设备详情
			async getDeviceValue(device_id){
				const res = await this.$myRequest({
					url: 'api/Device/getDeviceValue',
					method: "POST",
					data: {
						device_id
					}
				})
				this.detail = res.data
				console.log('设备详情', res)
			},
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

	.h-layout {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.line {
		height: 2rpx;
		background-color: #EFF4FA;
	}
</style>