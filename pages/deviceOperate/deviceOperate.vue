<template>
	<scroll-view scroll-y="true" class="bg">
		<view style="display:flex; flex-direction: column;">
			<!-- 上部分 -->
			<view style="display:flex; flex-direction: column; background-color: #FFFFFF;padding: 0 78rpx;">
				<!-- 累计 -->
				<view class="h-layout" style="background-color: #F7FAFF; padding: 36rpx 28rpx;">
					<text style="flex: 1;font-size: 24rpx;font-weight: 400;color: #666666;">
						累计用纸&nbsp;
						<font style="color: #333333;font-size: 28rpx;font-weight: 500;">234卷</font>
					</text>
					<text style="font-size: 28rpx;font-weight: 400;color: #333333;">
						累计运行&nbsp;
						<font style="color: #333333;font-size: 28rpx;font-weight: 500;">234次</font>
					</text>
				</view>
				<!-- 圆环进度 -->
				<view
					style="background-color: #F3F4F6;padding: 24rpx; display:flex; flex-direction: column;justify-content: center;align-items: center;">
					<view class="h-layout" style="width: 100%;">
						<view style="flex: 1; text-align: center;margin-left: 48rpx;">{{options.batlevel}}%</view>
						<image :class="{ opacity:options.state_text !== '在线'}" style="width: 48rpx; height: 48rpx;" :src="'/static/ic_circle_check.png'"></image>
					</view>
					<image style="width: 38rpx;height: 38rpx;margin-top: 10rpx;margin-bottom: 48rpx;"
						:src="'/static/ic_battery.png'"></image>
					<huihui-progress originalColor="#FFFFFF" :processColor="options.remain<=40? '#FE5100' : (options.remain>40&&options.remain<=70)? '#f8e197' : '#38CBD5'" innerbgColor="#F3F4F6"
						:process="options.remain" :startPosDegree="0" :radius="174" :barWidth="40">
						<view style="display:flex; flex-direction: column;justify-content: center;align-items: center;">
							<view style="align-items:baseline">
								<text style="font-size: 60rpx;font-weight: 400;color: #333333;">{{options.remain}}%</text>
								<!-- <text style="font-size: 28rpx;font-weight: 500;color: #666666;">%</text> -->
							</view>

						</view>
					</huihui-progress>
					<view
						style="font-size: 24rpx;font-weight: 400;color: #999999;margin-top: 20rpx;margin-bottom: 32rpx;">
						剩余纸量</view>
					<view style="width: 100%;">
						<view
							style="background-color: #FFFFFF;border-radius: 16rpx;padding: 42rpx;font-weight: 500;color: #333333;font-size: 28rpx; text-align: center;">
							<!-- SN123456&nbsp;&nbsp;|&nbsp;&nbsp;BH123456 -->
							{{ options.device_number }}
						</view>

					</view>

				</view>
				<view @click="toDetail()" style="text-align: center;padding: 48rpx;">详情></view>
			</view>
			<view style="flex: 1;"></view>
			<!-- 下部分 -->
			<view class="h-layout" style="justify-content: center;margin: 70rpx 0;">
				<view
					style="width: 244rpx;height: 244rpx;display:flex; flex-direction: column;justify-content: center;align-items: center;background: #FFFFFF;border-radius: 122rpx; margin-right: 50rpx;">
					<image style="width: 64rpx; height: 64rpx;" :src="'/static/ic_open_lock.png'"></image>
					<view style="font-size: 36rpx;font-weight: 500;color: #333333;margin-top: 10rpx;">开锁</view>
				</view>
				<view
					style="width: 244rpx;height: 244rpx;display:flex; flex-direction: column;justify-content: center;align-items: center;background: #FFFFFF;border-radius: 122rpx; margin-left: 50rpx;">
					<image style="width: 64rpx; height: 64rpx;" :src="'/static/ic_clock_in.png'"></image>
					<view style="font-size: 36rpx;font-weight: 500;color: #333333;margin-top: 10rpx;">打卡</view>
				</view>
			</view>


		</view>
	</scroll-view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log('进入了设备操作页面',options);
			this.options = options
		},
		onShow(){
			console.log('进来了中专业')
			this.getHdStatus(this.options.device_number)
		},
		data() {
			return {
				options: {}, // 页面数据
				id: "",
				deviceName: "香氛",
				deviceId: "XX2031",
				address: "广东省广州市大华区明离路科技园880号1栋2楼203室",
				process: 75
			}
		},
		methods: {
			// 获取页面数据
			async getHdStatus(nodeid){
				const res = await this.$myRequest({
					url: 'api/mqtt/getHdStatus',
					method: "POST",
					data: {
						nodeid
					}
				})
				if(res.code == 1){
					this.options.device_number = res.data.nodeid
					this.options.remain = res.data.remain
					this.options.batlevel = res.data.batlevel
					
				}
				console.log('设备详情中转页', res)
			},
			toDetail() {
				uni.navigateTo({
					url: "/pages/deviceDetail/deviceDetail?id=" + this.options.id
				})
			}
		}
	}
</script>

<style>
	.opacity{opacity: 0;}
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