<template>
	<view class="bg">
		<!-- 筛选 -->
		<view style="display: flex;flex-direction: column;background: #FFFFFF;margin-bottom: 16rpx;">
			<!-- 省市区 -->
			<view class="h-layout">
				<view style="display: flex;justify-content: space-between;width: 100%">
					<text
						style="font-size: 28rpx;font-weight: 400;color: #333333;text-align: end; padding-right: 16rpx;">请选择省市区</text>
					<view style="display: flex;align-items: center;">
						<myPicker type="3" @chooseAddress="chooseAddress" :region="region" />
						<image style="width: 12rpx;height: 16rpx;margin-left: 20rpx;" :src="'/static/ic_next.png'"></image>
					</view>
				</view>
			</view>
			<view style="height: 2rpx;background-color: #EFF4FA;margin: 0 32rpx;" />
			<!-- 项目 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;font-weight: 400;color: #333333;">项目</text>
				<text
					style="flex: 1; font-size: 28rpx;font-weight: 400;color: #999999;text-align: end; padding-right: 16rpx;">请选择项目名称</text>
				<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
			</view>
			<view style="height: 2rpx;background-color: #EFF4FA;margin: 0 32rpx;" />
			<!-- 园区 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;font-weight: 400;color: #333333;">园区</text>
				<text
					style="flex: 1; font-size: 28rpx;font-weight: 400;color: #999999;text-align: end; padding-right: 16rpx;">请选择园区</text>
				<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
			</view>
			<view style="height: 2rpx;background-color: #EFF4FA;margin: 0 32rpx;" />
			<!-- 楼栋 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;font-weight: 400;color: #333333;">楼栋</text>
				<text
					style="flex: 1; font-size: 28rpx;font-weight: 400;color: #999999;text-align: end; padding-right: 16rpx;">请选择楼栋</text>
				<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
			</view>
			<view style="height: 2rpx;background-color: #EFF4FA;margin: 0 32rpx;" />
			<!-- 楼层 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;font-weight: 400;color: #333333;">楼层</text>
				<text
					style="flex: 1; font-size: 28rpx;font-weight: 400;color: #999999;text-align: end; padding-right: 16rpx;">请选择楼层</text>
				<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
			</view>
			<view style="height: 2rpx;background-color: #EFF4FA;margin: 0 32rpx;" />
			<!-- 厕所 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;font-weight: 400;color: #333333;">厕所</text>
				<text
					style="flex: 1; font-size: 28rpx;font-weight: 400;color: #999999;text-align: end; padding-right: 16rpx;">请选择厕所</text>
				<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
			</view>
			<view style="height: 2rpx;background-color: #EFF4FA;margin: 0 32rpx;" />
			<!-- 设备 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;font-weight: 400;color: #333333;">设备</text>
				<text
					style="flex: 1; font-size: 28rpx;font-weight: 400;color: #999999;text-align: end; padding-right: 16rpx;">请选择设备</text>
				<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
			</view>
		</view>
		<!-- 列表 -->
		<!-- <view style="flex: 1; overflow: auto"> -->
		<selectShareDeviceListView :list="list" />
		<!-- </view> -->

		<!-- 权限赋予 -->
		<view style="display: flex;flex-direction: column;background: #FFFFFF;margin-top: 46rpx; padding: 30rpx;">
			<view style="display: flex;align-items: center;flex-direction: row;">
				<text style="font-size: 28rpx;font-weight: 500;color: #333333;">设备权限</text>
				<view style="flex: 1; margin: 24rpx 32rpx;">
					<uni-data-select v-model="value" :localdata="range" @change="changeLog" :clear="false"
						placeholder="请选择分享赋予权限" style="font-size: 40rpx;background-color: #F3F4F6;"></uni-data-select>
				</view>
			</view>
			<button class="btn" @click="addAddress()">确定赋予</button>
		</view>
	</view>
</template>

<script>
	import myPicker from '../../components/picker/picker.vue'
	export default {
		
		components: {
			myPicker
		},
		data() {
			return {
				list: [],
				region: '',
				range: [{
						value: 0,
						text: "权限一"
					},
					{
						value: 1,
						text: "权限二"
					},
					{
						value: 2,
						text: "权限三"
					},
				],
				hasMoreData: true,
				page: 1
			}
		},
		onReachBottom(){
			console.log('滑倒底了');
			if (this.hasMoreData) {
				this.page++;
				this.getShareDeviceList();
			}
		},
		onLoad(options) {
			console.log(options);
			this.getShareDeviceList()
			this.getSubEventList(options)
		},
		methods: {
			chooseAddress(data){
				// 更新地址数据
				this.region = data
			},
			// 获取项目、园区、楼栋、楼层
			async getSubEventList(options){
				let _this = this
				const res = await this.$myRequest({
					url: 'api/Share/getSubEventList',
					method: "POST",
					data: {
						pid: options.id
					}
				})
				if(res.code == 1){
					
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'error'
					})
				}
				console.log('获取项目、园区、楼栋、楼层', res)
				// this.detail = res.data
			},
			// 获取待分配设备列表
			async getShareDeviceList(order_id){
				let _this = this
				const res = await this.$myRequest({
					url: 'api/Share/getShareDeviceList',
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
			changeLog(e) {
				console.log('change事件:', e);
				// this.carNum = 
			},
		}
	}
</script>

<style>
	.bg {
		display: flex;
		flex-direction: column;
		background-color: #F3F4F6;
	}

	.h-layout {
		display: flex;
		align-items: center;
		flex-direction: row;
		padding: 32rpx;
	}

	.btn {
		height: 104rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #38CBD5;
		border-radius: 54rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin: 32rpx 32rpx 0 32rpx;
	}
</style>