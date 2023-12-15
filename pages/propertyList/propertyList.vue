<template>
	<view class="bg">
		<view class="h-layout">
			<image style="width: 32rpx;height: 32rpx;padding-left: 32rpx;padding-right: 10rpx;"
				:src="'/static/ic_address.png'"></image>
			<!-- <text style="font-size: 28rpx;font-weight: 400;color: #333333;" @click="toGo('/pages/selectAddress/selectAddress')">{{address}}</text> -->
			<myPicker type="1" @chooseAddress="chooseAddress" :isEdit="isEdit" :isSaveData="'1'" :region="region" />
			<image style="width: 14rpx;height: 14rpx;padding-left: 16rpx;padding-right: 32rpx;" @click="toGo('/pages/selectAddress/selectAddress')"
				:src="'/static/ic_down.png'"></image>
			<input
				style="flex: auto; height: 76rpx;font-size: 28rpx;color: #333333;margin-right: 32rpx;background: #FFFFFF;border-radius: 38rpx;padding: 0 34rpx;"
				placeholder-style="color:#999999" v-model="keyword" placeholder="请输入关键词查询" />
		</view>
		<!-- 中间布局 -->
		<view
			style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin:32rpx 32rpx 28rpx 32rpx;">
			<!-- 横向tab -->
			<view class="horizonal-tab" style="margin-bottom: 4rpx;">
				<scroll-view scroll-x="true" scroll-with-animation class="scroll-tab">
					<block v-for="(item,index) in tabBars" :key="index">
						<view class="scroll-tab-item" :class="{'active': tabIndex==index}" @tap="toggleTab(item, index)">
							{{item.name}}
							<view
								style="display: flex;justify-content: center;margin-top: 4rpx;background-color: #38CBD5; border-radius: 4rpx;">
								<!-- <view style="background-color: #38CBD5;width: 40rpx;height: 8rpx; border-radius: 4rpx;">
			
								</view> -->
								<view class="scroll-tab-line"></view>
							</view>

						</view>
					</block>

				</scroll-view>
			</view>

		</view>

		<!-- 列表 -->
		<view style="overflow: auto; background: #FFFFFF;border-radius: 16rpx;margin: 0 32rpx 32rpx 32rpx;">
			<propertyListView :list="list" />
		</view>
	</view>
</template>

<script>
	import myPicker from '../../components/picker/picker.vue'
	export default {
		components: {
			myPicker
		},
		onLoad() {
			this.getEventList()
			if(uni.getStorageSync('addressDefault')){
				this.address = uni.getStorageSync('addressDefault').name
			}
		},
		onShow() {
			let that = this
			uni.$once('address', function(data) {
				/* 
				  {"id":61,"spell":"ankang","name":"安康"} 
				 */
				console.log('监听到事件来自返回的参数：' + data.name);
				that.address = data.name
			})
		},
		data() {
			return {
				address:"省市",
				// 选中标签栏的序列,默认显示第一个
				tabIndex: 0,
				tabBars: [{
						name: '项目A',
						id: 'guanzhu'
					},
					{
						name: '项目B',
						id: 'tuijian'
					},
					{
						name: '项目C',
						id: 'redian'
					},
					{
						name: '项目D',
						id: 'tiyu'
					},
					{
						name: '项目E',
						id: 'caijing'
					},
					{
						name: '项目F',
						id: 'yule'
					}
				],
				list: [{
						title: "天河物业",
						num: 170
					},
					{
						title: "南山物业",
						num: 180
					},
					{
						title: "宝安物业",
						num: 160
					},
					{
						title: "长城物业",
						num: 190
					},
					{
						title: "天河物业",
						num: 170
					}
				],
				projects_id: 0 ,// 项目id
				page: 1,
				count: 10
			}
		},
		methods: {
			chooseAddress(data){
				// 更新地址数据
				this.region = data
			},
			//获取项目列表
			async getEventList(){
				const res = await this.$myRequest({
					url: 'api/Device/getEventList',
					method: "POST"
				})
				if(res.code == 1){
					this.tabBars = res.data
					this.projects_id = this.tabBars[0].id
					this.getList()
				}
			},
			async getList(){
				const res = await this.$myRequest({
					url: 'api/Device/getPropertyList',
					method: "POST",
					data: {
						projects_id: this.projects_id,
						page: this.page,
						limit: this.count
					}
				})
				console.log('获取物业列表', res)
				if(res.code == 1){
					this.list = res.data.data.data
				}
			},
			//切换选项卡
			toggleTab(item, index) {
				this.tabIndex = index;
				this.projects_id = item.id
				this.getList()
			},
			//滑动切换swiper
			tabChange(e) { 
				console.log(e);
				this.tabIndex = e.detail.current;
			},
			toGo(url) {
				uni.navigateTo({
					url: url
				})
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

	/* 横向Tab */
	.horizonal-tab {}

	.horizonal-tab .active {
		color: #38CBD5;
	}

	.scroll-tab {
		/* 必要，导航栏才能横向*/
		white-space: nowrap;

		/* border-bottom: 1rpx solid #EFF4FA; */
		text-align: center;
	}

	.scroll-tab-item {
		/* 必要，导航栏才能横向*/
		display: inline-block;

		margin: 16rpx 32rpx 0 32rpx;
		justify-content: center;
		align-items: center;
	}

	.active .scroll-tab-line {
		border-bottom: 3rpx solid #38CBD5;
		border-top: 3rpx solid #38CBD5;
		border-radius: 4rpx;
		width: 40rpx;

	}

	/* 横向Tab */
</style>