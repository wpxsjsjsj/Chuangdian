<template>
	<scroll-view scroll-y="true" class="bg">
		<view style="display:flex; flex-direction: column;" v-if="detail&&JSON.stringify(detail) !== '{}'">
			<view style="width: 100%; display:flex; flex-direction: row;justify-content: center;align-items: center;">
				<image style="width: 32rpx;height: 32rpx;" :src="'/static/ic_circle_check.png'"></image>
				<text style="font-size: 40rpx;font-weight: 600;color: #38CBD5;margin:28rpx 10rpx;">订单已完成</text>
			</view>
			<text style="font-size: 28rpx;font-weight: 400;color: #666666;text-align: center;">满意请给五星好评哟</text>
			<!-- 地址 -->
			<view
				style="display: flex;flex-direction: column; padding: 32rpx; background-color: #FFFFFF;border-radius: 16rpx;margin:32rpx 32rpx 20rpx 32rpx;">
				<view class="h-layout">
					<image style="width: 24rpx;height: 26rpx;" :src="'/static/ic_address.png'"></image>
					<text
						style="flex: 1; font-size: 32rpx;font-weight: 600;color: #333333;margin-left: 10rpx;">{{detail.address.detail}}</text>
				</view>
				<view class="h-layout" style="margin-top: 10rpx; ">
					<text style=" font-size: 24rpx;font-weight: 400;color: #333333;">{{detail.address.name}}</text>
					<!-- <text style=" font-size: 24rpx;font-weight: 400;color: #333333;margin-left: 18rpx;">女士</text> -->
					<text
						style=" font-size: 24rpx;font-weight: 400;color: #333333;margin-left: 18rpx;margin-top: 4rpx;">{{detail.address.phone}}</text>
				</view>
				<view class="h-layout" style="margin-top: 48rpx;">
					<view style="flex: 1; display: flex;flex-direction: column;">
						<view class="h-layout">
							<image style="width: 28rpx;height: 28rpx;" :src="'/static/ic_tip.png'"></image>
							<text
								style="flex: 1; font-size: 24rpx;font-weight: 400;color: #666666;margin-left: 10rpx;">您的快递已经取出，如有问题可致电</text>
						</view>
						<text
							style="font-size: 28rpx;font-weight: 500;color: #666666;margin-left: 38rpx;margin-top: 8rpx;">0659-2356729</text>
					</view>
					<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
				</view>
			</view>

			<!-- 商品 -->
			<view class="h-layout"
				style="padding: 32rpx; background-color: #FFFFFF;border-radius: 16rpx;margin:0 32rpx;">
				<image style="width: 144rpx;height: 144rpx;" :src="detail.goods[0].image || '/static/logo.png'"></image>
				<view style="flex: 1;display: flex;flex-direction: column; margin-left: 24rpx;">
					<view style="color: #333333; font-size: 28rpx; font-weight: 500;">
						{{detail.goods[0].goods_name}}
					</view>
					<view style="display: flex; flex-direction: row;align-items: baseline;margin-top: 14rpx;">
						<text style="flex: 1;font-size: 28rpx;font-weight: 500;color: #333333;">￥{{detail.goods[0].goods_price}}</text>
						<text style="font-size: 28rpx;font-weight: 400;color: #999999;">x{{detail.goods[0].total_num}}</text>
					</view>
				</view>
			</view>

			<!-- 价格列表 -->
			<view
				style="display: flex;flex-direction: column; padding: 32rpx; background-color: #FFFFFF;border-radius: 16rpx;margin:32rpx 32rpx 20rpx 32rpx;">
				<view class="h-layout">
					<text style="flex: 1;font-size: 24rpx;font-weight: 400;color: #666666;">商品总额</text>
					<text style="font-size: 28rpx;font-weight: 500;color: #333333;">¥{{detail.goods[0].total_price}}</text>
				</view>
				<view class="h-layout" style="margin-top: 32rpx;">
					<text style="flex: 1;font-size: 24rpx;font-weight: 400;color: #666666;">商品优惠</text>
					<text style="font-size: 28rpx;font-weight: 500;color: #333333;">¥0</text>
				</view>
				<view class="h-layout" style="margin-top: 32rpx;">
					<text style="flex: 1;font-size: 24rpx;font-weight: 400;color: #666666;">实付款</text>
					<text style="font-size: 28rpx;font-weight: 500;color: #333333;">¥{{detail.goods[0].total_price}}</text>
				</view>
			</view>

			<!-- 订单列表 -->
			<view
				style="display: flex;flex-direction: column; padding: 32rpx; background-color: #FFFFFF;border-radius: 16rpx;margin:0rpx 32rpx 20rpx 32rpx;">
				<view class="h-layout">
					<text style="flex: 1;font-size: 24rpx;font-weight: 400;color: #666666;">订单编号</text>
					<text style="font-size: 28rpx;font-weight: 500;color: #333333;">{{detail.order_no}}</text>
					<text
						@click="copy(detail.order_no)"
						style="font-size: 24rpx;font-weight: 400;color: #333333;background: #F1F2F2;border-radius: 18rpx; padding: 4rpx 12rpx;margin-left: 16rpx;">复制</text>
				</view>
				<view class="h-layout" style="margin-top: 32rpx;">
					<text style="flex: 1;font-size: 24rpx;font-weight: 400;color: #666666;">下单时间</text>
					<text style="font-size: 28rpx;font-weight: 500;color: #333333;">2023-06-14 13:04:47</text>
				</view>
				<view class="h-layout" style="margin-top: 32rpx;">
					<text style="flex: 1;font-size: 24rpx;font-weight: 400;color: #666666;">付款时间</text>
					<text style="font-size: 28rpx;font-weight: 500;color: #333333;">{{detail.pay_time_text}}</text>
				</view>
				<view class="h-layout" style="margin-top: 32rpx;">
					<text style="flex: 1;font-size: 24rpx;font-weight: 400;color: #666666;">收货时间</text>
					<text style="font-size: 28rpx;font-weight: 500;color: #333333;">2023-06-14 13:04:47</text>
				</view>
			</view>

		</view>
	</scroll-view>
</template>

<script>
	import { setClipboardData, getClipboardData } from 'uni-clipboard'
	export default {
		data() {
			return {
				detail: {}
			}
		},
		onLoad(options) {
			this.getOrderDetail(options.id)
		},
		methods: {
			// 复制
			copy(text){
				setClipboardData(text)
			},
			// 获取订单列表
			async getOrderDetail(order_id){
				const res = await this.$myRequest({
					url: 'api/Order/getOrderDetail',
					method: "POST",
					data: {
						order_id
					}
				})
				if(res.code == 1){
					// res.data[0].order_status = 20
					this.detail = res.data
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'error'
					})
				}
				console.log('订单详情', res)
				// this.detail = res.data
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

	.h-layout {
		display: flex;
		align-items: center;
		flex-direction: row;
	}
</style>