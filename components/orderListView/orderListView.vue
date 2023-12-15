<template>
	<view
		style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin: 0 32rpx 20rpx 32rpx;padding: 32rpx;"
		v-for="(item,index) in list" @click="toDetail(item.id)">
		<view class="h-layout">
			<text style="flex: 1;font-size: 24rpx;font-weight: 500;color: #333333;">订单号：{{item.order_no}}</text>
			<text style="font-size: 24rpx;font-weight: 400;color: #38CBD5;" :class="[{cancel: item.order_status == '20'},{isGet: item.order_status == '30'}]">{{item.order_status == '10'? '待收货' : item.order_status == '20'? '已取消' : '已完成'}}</text>
		</view>

		<view class="h-layout" style="margin-top: 20rpx;">
			<image style="width: 144rpx;height: 144rpx;border-radius: 8px;" :src="item.images || '/static/logo.png'"></image>
			<view style="flex: 1;display: flex;flex-direction: column; margin-left: 24rpx;">
				<view style="color: #333333; font-size: 28rpx; font-weight: 500;">
					{{item.goods_name}}
				</view>
				<view style="display: flex; flex-direction: row;align-items: baseline;margin-top: 14rpx;">
					<text style="flex: 1;font-size: 28rpx;font-weight: 500;color: #333333;">￥{{item.total_price}}</text>
					<text style="font-size: 28rpx;font-weight: 400;color: #999999;">x{{item.total_num}}</text>
				</view>
			</view>
		</view>
		<text style="text-align: end; font-size: 28rpx;font-weight: 500;color: #333333;margin-top: 14rpx;">
			<font style="color: #666666; font-size: 24rpx;">实付款 </font>￥{{item.pay_price}}
		</text>
		<view style="display: flex; flex-direction: row;align-items: baseline;margin-top: 20rpx;">
			<text style="flex: 1;"></text>
			<text v-show="item.order_status==10" @tap.stop="buy($event,item)"
				style="font-size: 24rpx;color: #FFF; font-weight: 400;padding: 16rpx 44rpx; background-color: #38CBD5 ; border-radius: 36rpx;">
				{{item.receipt_status == '10'? '确认收货' : '已收货'}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "orderListView",
		//接收父控件的值
		props: ['list'],
		data() {
			return {

			};
		},
		methods:{
			buy(e,item) {
				e.preventDefault();
				uni.navigateTo({
					url: "/pages/goodsConfirm/goodsConfirm?id="+item.id
				})
			},
			toDetail(id){
				uni.navigateTo({
					url: "/pages/orderDetail/orderDetail?id="+id
				})
			},
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.cancel{color: #ff0000 !important;}
	.isGet{color: #333 !important;}
</style>