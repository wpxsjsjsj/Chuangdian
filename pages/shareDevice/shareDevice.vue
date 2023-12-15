<template>
	<view class="bg">
		<scroll-view style="height: 100vh;" scroll-y="true" @scrolltolower="loadNextPage">
			<view style="display: flex;flex-direction: column;" v-for="item in list" @click="toDetail(item.id)">
				<view class="h-layout">
					<image style="width: 84rpx;height: 84rpx;" :src="item.avatar || '/static/ic_head.png'"></image>
					<text
						style="flex: 1;font-size: 28rpx;font-weight: 500;color: #333333;margin-left: 28rpx;">{{item.nickname}}</text>
					<text style="font-size: 28rpx;font-weight: 500;color: #38CBD5;margin-right: 8rpx;background: #FFFFFF;border-radius: 16rpx;border: 2rpx solid #38CBD5;
						text-align:center;padding: 8rpx 24rpx;" @click.stop="shareDevice(item)">分配设备</text>
					<text style="font-size: 28rpx;font-weight: 500;color: #FFFFFF;margin-left: 8rpx;background: #38CBD5;border-radius: 16rpx;
							text-align:center;padding: 8rpx 24rpx;" @click="deviceList(e)">设备列表</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				hasMoreData: true, // 是否还有更多数据
			}
		},
		onLoad() {
			this.getAgentList()
		},
		onReachBottom() {
			console.log('滑倒底部')
		},
		methods: {
			//分享设备
			shareDevice(item){
				console.log(item);
				uni.navigateTo({
					url:"/pages/shareDeviceList/shareDeviceList?id=" + item.id + '&admin_id=' + item.admin_id 
				})
			},
			toDetail(){},
			//设备列表
			deviceList() {
				uni.navigateTo({
					url: "/pages/deviceList/deviceList?title=设备列表"
				})
			},
			// 获取共享设备
			async getAgentList(order_id){
				let _this = this
				const res = await this.$myRequest({
					url: 'api/Share/agentList',
					method: "POST",
					data: {
						page: _this.page
					}
				})
				if(res.code == 1){
					// res.data[0].order_status = 20
					if (res.data.data && res.data.data.length > 0) {
					    this.hasMoreData = true;
						this.list = [...this.list, ...res.data.data];
					} else {
					    this.hasMoreData = false;
					}
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'error'
					})
				}
				console.log('订单详情', res)
				// this.detail = res.data
			},
			// 加载下一页
			async loadNextPage() {
				if (this.hasMoreData) {
					this.page++;
					await this.getAgentList();
				}
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
		border-radius: 16rpx;
		margin: 0 32rpx 20rpx 32rpx;
		padding: 30rpx;
	}
	.bg {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F3F4F6;
	}
</style>