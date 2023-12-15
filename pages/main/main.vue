<template>
	<view class="bg">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<!-- 顶部title -->
		<view style="display: flex;flex-direction: row; position: relative;">
			<view
				style="width: 100%;display: flex;justify-content: center;align-items: center;padding: 30rpx 0 28rpx 0; font-size: 32rpx;font-weight: 600;color: #333333;">
				首页
			</view>
			<view style="position: absolute;display: flex;top: 0rpx;right: 0rpx;flex-direction: row;">
				<image style="width: 40rpx;height: 44rpx; padding: 28rpx 17rpx 28rpx 17rpx;" :src="'/static/ic_add.png'"
					@click="toGo('/pages/scanQrCode/scanQrCode')" />
				<!-- 通知 -->
				<view style="padding: 30rpx 17rpx 28rpx 17rpx;" @click="toGo('/pages/notice/notice')">
					<view class="notice">
						<image style="width: 36rpx;height: 40rpx; " :src="'/static/ic_notice.png'" />
						<text v-if="notice" class="num">{{notice}}</text>
					</view>
				</view>

			</view>
		</view>

		<!-- 定位地址及搜索栏 -->
		<view class="h-layout">
			<view style="display: flex;align-items: center;">
				<image style="width: 32rpx;height: 32rpx;padding-left: 32rpx;padding-right: 10rpx;"
					 :src="'/static/ic_address.png'"></image>
				<!-- <text style="font-size: 28rpx;font-weight: 400;color: #333333;padding-right: 40rpx;"
					@click="toGo('/pages/selectAddress/selectAddress')">{{address}}</text> -->
				<myPicker type="1" @chooseAddress="chooseAddress" :isEdit="isEdit" :region="region" :isSaveData="'1'" />
			</view>
			<input
				style="flex: auto; height: 76rpx;font-size: 28rpx;color: #333333;margin-left: 10rpx;margin-right: 32rpx;background: #FFFFFF;border-radius: 38rpx;padding: 0 34rpx;"
				placeholder-style="color:#999999" v-model="keyword" confirm-type="search" @confirm="search"
				placeholder="请输入关键词查询" />
		</view>
		<!-- 图片 -->
		<swiper style="width: 100%; height: 280rpx;" indicator-dots circular autoplay indicator-color="#E9E9E9"
			indicator-active-color="#38CBD5">
			<swiper-item v-for="item,index in bannerList" :key="item.id">
				<image style="width: 100%; height: 280rpx;" :src="item.image" mode="aspectFill"
					@error="imageError" />
			</swiper-item>
		</swiper>
		<!-- 四方格 -->
		<view style="width: 100%;display: flex;flex-direction: row;">
			<!-- 投放设备 -->
			<view
				style="flex: auto; display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin: 32rpx 15rpx 32rpx 32rpx;padding: 36rpx 32rpx 40rpx 32rpx;"
				@click="toGo('/pages/deviceList/deviceList?title=设备列表')">
				<view class="h-layout">
					<text style="flex: auto; font-size: 28rpx;font-weight: 500;color: #333333;">投放设备</text>
					<image style="width: 44rpx;height: 44rpx;" :src="'/static/ic_main_item1.png'"></image>
				</view>
				<text style="font-size: 60rpx;font-weight:bold;color: #333333;margin-top: 36rpx;">{{overviewData.device_count || 0}}</text>
				<view style="display: flex;flex-direction: row;justify-content:flex-end; margin-top: -30rpx;">
					<image style="width: 40rpx; height: 40rpx;" :src="'/static/ic_next_black.png'"></image>
				</view>

			</view>
			<!-- 覆盖项目 -->
			<view
				style="flex: auto; display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin: 32rpx 32rpx 32rpx 15rpx;padding: 36rpx 32rpx 40rpx 32rpx;"
				@click="toGo('/pages/propertyList/propertyList')">
				<view class="h-layout">
					<text style="flex: auto; font-size: 28rpx;font-weight: 500;color: #333333;">覆盖项目</text>
					<image style="width: 34rpx;height: 36rpx;" :src="'/static/ic_main_item2.png'"></image>
				</view>
				<text style="font-size: 60rpx;font-weight:bold;color: #333333;margin-top: 36rpx;">{{overviewData.event_count || 0}}</text>
				<view style="display: flex;flex-direction: row;justify-content:flex-end; margin-top: -30rpx;">
					<image style="width: 40rpx; height: 40rpx;" :src="'/static/ic_next_black.png'"></image>
				</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<!-- 耗材分析 -->
			<view
				style="flex: auto; display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin: 0 15rpx 0 32rpx;padding: 36rpx 32rpx 40rpx 32rpx;"
				@click="toGo('/pages/consumableAnalysis/consumableAnalysis')">
				<view class="h-layout">
					<text style="flex: auto; font-size: 28rpx;font-weight: 500;color: #333333;">耗材分析</text>
					<image style="width: 52rpx;height: 52rpx;" :src="'/static/ic_main_item3.png'"></image>
				</view>
				<view style="margin-top: 36rpx;">
					<text style="font-size: 60rpx;font-weight:bold;color: #333333;">{{overviewData.online_device_count || 0}}</text>
					<text style="font-size: 32rpx;font-weight:bold;color: #C1C1C1;">/{{overviewData.device_count || 0}}</text>
				</view>
				<view style="display: flex;flex-direction: row;justify-content:flex-end; margin-top: -30rpx;">
					<image style="width: 40rpx; height: 40rpx;" :src="'/static/ic_next_black.png'"></image>
				</view>
			</view>
			<!-- 告警设备 -->
			<view
				style="flex: auto; display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin: 0 32rpx 0 15rpx;padding: 36rpx 32rpx 40rpx 32rpx;"
				@click="toGo('/pages/deviceList/deviceList?title=告警设备')">
				<view class="h-layout">
					<text style="flex: auto; font-size: 28rpx;font-weight: 500;color: #333333;">告警设备</text>
					<image style="width: 48rpx;height: 48rpx;" :src="'/static/ic_main_item4.png'"></image>
				</view>
				<text style="font-size: 60rpx;font-weight:bold;color: #333333;margin-top: 36rpx;">{{overviewData.warning_device_count || 0}}</text>
				<view style="display: flex;flex-direction: row;justify-content:flex-end; margin-top: -30rpx;">
					<image style="width: 40rpx; height: 40rpx;" :src="'/static/ic_next_black.png'"></image>
				</view>
			</view>
		</view>

		<!-- 智能耗材检测 -->
		<view
			style="position: relative;display: flex;flex-direction: row; background: #38CBD5;border-radius: 16rpx; padding: 32rpx;margin: 32rpx 32rpx 0 32rpx;">
			<image style="position: absolute; width: 30rpx; height: 35rpx; " src="../../static/ic_more_white.png">
			</image>
			<view style="font-size: 28rpx;font-weight: 400;color: #FFFFFF; text-align: center; width: 100%;">智能耗材检测
			</view>
		</view>
		<!-- 三角形 -->
		<view style="display: flex;flex-direction: row; justify-content: center;">
			<view
				style="height:0;width:0;border-width:30rpx;border-style:solid;border-color: #38CBD5 transparent transparent transparent;">
			</view>
		</view>

		<!-- 今日 本月 年度 -->
		<view style="width: 100%; flex-direction: row; display: flex;margin-top: 0rpx;">
			<view
				style="flex-direction: column; display: flex;align-items: center;margin-right: 17rpx;margin-left: 32rpx;"
				@click="switchDate(1)">
				<text :class="[type==1?'text-black':'text-gray']">今日</text>
				<view style="width: 40rpx;height: 8rpx;background-color: #38CBD5;border-radius: 4rpx;margin-top: 8rpx;"
					v-if="type==1">
				</view>
			</view>
			<view
				style="flex-direction: column; display: flex;align-items: center;margin-left: 17rpx;margin-right: 17rpx;"
				@click="switchDate(2)">
				<text :class="[type==2?'text-black':'text-gray']">本月</text>
				<view style="width: 40rpx;height: 8rpx;background-color: #38CBD5;border-radius: 4rpx;margin-top: 8rpx;"
					v-if="type==2">
				</view>
			</view>
			<view style="flex-direction: column; display: flex;align-items: center;margin-left: 17rpx;"
				@click="switchDate(3)">
				<text :class="[type==3?'text-black':'text-gray']">年度</text>
				<view style="width: 40rpx;height: 8rpx;background-color: #38CBD5;border-radius: 4rpx;margin-top: 8rpx;"
					v-if="type==3">
				</view>
			</view>
		</view>
		<!-- 纸巾、精油、洗手液 -->
		<view
			style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;padding: 32rpx;margin: 32rpx;">
			<uni-grid style="width: 100%;" :column="3" :showBorder="false" :square="false" :highlight="false">
				<uni-grid-item v-for="(item,index) in dataList1" :index="index" :key="index">
					<view class="content-layout" @click="toGo('/pages/deviceList/deviceList?title='+item.name)">
						<image style="width: 92rpx;height: 92rpx;margin-top: 30rpx;" :src="item.img">
						</image>
						<text v-if="item.value.length > 0"
							style="font-size: 28rpx;font-weight:500;color: #333333;margin-top: 10rpx;">{{item.value}}</text>
						<text
							style="font-size: 24rpx;font-weight:400;color: #666666;margin-top: 8rpx;margin-bottom: 30rpx;">{{item.name}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>

		<!-- 智能保洁系统 -->
		<view
			style="position: relative;display: flex;flex-direction: row; background: #38CBD5;border-radius: 16rpx; padding: 32rpx;margin: 32rpx 32rpx 0 32rpx;">
			<image style="position: absolute; width: 30rpx; height: 35rpx; " src="../../static/ic_more_white.png">
			</image>
			<view style="font-size: 28rpx;font-weight: 400;color: #FFFFFF; text-align: center; width: 100%;">智能保洁系统
			</view>
		</view>
		<!-- 三角形 -->
		<view style="display: flex;flex-direction: row; justify-content: center;">
			<view
				style="height:0;width:0;border-width:30rpx;border-style:solid;border-color: #38CBD5 transparent transparent transparent;">
			</view>
		</view>

		<!-- 底部布局 -->
		<!-- grid -->
		<view
			style="flex-direction: column; display: flex;align-items: center;justify-content: center;background: #FFFFFF;border-radius: 16rpx;padding: 32rpx 0;margin:0 32rpx 32rpx 32rpx;">
			<uni-grid style="width: 100%;" :column="4" :showBorder="false" :square="false" :highlight="false">
				<uni-grid-item v-for="(item,index) in dataList2" :index="index" :key="index">
					<view style="display: flex;flex-direction: column; align-items: center;justify-content: center; padding: 36rpx 0;" @click="toGo('/pages/noticeDetail/noticeDetail?title='+item.name)">
						<image style="width: 80rpx;height: 80rpx;margin-right: 4rpx;" :src="item.img" mode="heightFix">
						</image>
						<text style="font-size: 20rpx;color: #666666;">{{item.name}}</text>
						<!-- <text style="font-size: 32rpx;color: #333333;">{{item.value}}</text>
						<view
							style="display: flex;flex-direction: row;align-items: center;justify-content: center;padding-top: 8rpx;padding-bottom: 48rpx;">
							<image style="width: 32rpx;height: 32rpx;margin-right: 4rpx;" :src="item.img"
								mode="heightFix"></image>
							<text style="font-size: 28rpx;color: #666666;">{{item.name}}</text>
						</view> -->

					</view>

				</uni-grid-item>
			</uni-grid>
			<!-- <image :src="'/static/ic_main_item8.png'" mode="widthFix"></image> -->
		</view>
		<tabbar :initCurrIndex="'0'" />
	</view>
</template>

<script>
	import myPicker from '../../components/picker/picker.vue'
	import tabbar from '../../components/tabbar/tabbar.vue'
	export default {
		components: {
			myPicker,
			tabbar
		},
		onLoad(){
			uni.hideTabBar();
			if(uni.getStorageSync('addressDefault')){
				this.address = uni.getStorageSync('addressDefault').name
			}
		},
		onShow() {
			console.log('首页加载')
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
				notice: "99",
				address: "省市",
				keyword: "",
				itemNum1: "180",
				itemNum2: "8",
				itemNum3: "160",
				itemNum4: "25",
				itemNum5: "1613",
				itemNum6: "876",
				itemNum7: "123",
				type: 1,

				dataList1: [{
						name: '纸巾',
						value: '1613',
						img: '/static/ic_main_grid_item1.png'
					},
					{
						name: '精油',
						value: '760',
						img: '/static/ic_main_grid_item2.png'
					},
					{
						name: '洗手液',
						value: '1313',
						img: '/static/ic_main_grid_item3.png'
					},
					{
						name: '感应厕纸机',
						value: '',
						img: '/static/ic_main_grid_item4.png'
					},
					{
						name: '感应檫手纸机',
						value: '',
						img: '/static/ic_main_grid_item5.png'
					},
					{
						name: '感应皂液器',
						value: '',
						img: '/static/ic_main_grid_item6.png'
					},
					{
						name: '智能香氛机',
						value: '',
						img: '/static/ic_main_grid_item7.png'
					},
					{
						name: '大盘纸巾盒',
						value: '',
						img: '/static/ic_main_grid_item8.png'
					},
					{
						name: '檫手纸盒',
						value: '',
						img: '/static/ic_main_grid_item9.png'
					},
					{
						name: '中心抽纸盒',
						value: '',
						img: '/static/ic_main_grid_item10.png'
					},
					{
						name: '环境垃圾桶',
						value: '',
						img: '/static/ic_main_grid_item11.png'
					}

				],

				dataList2: [{
						name: '空气质量',
						value: '',
						img: '/static/ic_main_grid_item12.png'
					},
					{
						name: '硫化氢气体浓度',
						value: '',
						img: '/static/ic_main_grid_item13.png'
					},
					{
						name: '氨气体浓度',
						value: '',
						img: '/static/ic_main_grid_item14.png'
					},
					{
						name: '空气温度',
						value: '',
						img: '/static/ic_main_grid_item15.png'
					},
					{
						name: '空气湿度',
						value: '',
						img: '/static/ic_main_grid_item16.png'
					},
					{
						name: '人流量',
						value: '',
						img: '/static/ic_main_grid_item17.png'
					},
					{
						name: '清洁状态',
						value: '',
						img: '/static/ic_main_grid_item18.png'
					},
					{
						name: '使用状态',
						value: '',
						img: '/static/ic_main_grid_item19.png'
					}
				],
				bannerList: [],
				overviewData: {}

			}
		},
		created(){
			console.log(1111)
			this.getOverViewData()
			this.getBannerList()
		},
		methods: {
			chooseAddress(data){
				// 更新地址数据
				this.address = data
			},
			//获取首页总览数据
			async getOverViewData(){
				const res = await this.$myRequest({
					url: 'api/Device/overview',
					method: "POST"
				})
				if(res.code == 1){
					this.overviewData = res.data
				}
			},
			//获取首页总览数据
			async getBannerList(){
				const res = await this.$myRequest({
					url: 'api/banner/bannerList',
					method: "POST",
					data: {
						banner_type: "home"
					}
				})
				if(res.code == 1){
					this.bannerList = res.data
				}
			},
			//切换选项卡
			toggleTab(index) {
				this.tabIndex = index;
			},
			//滑动切换swiper
			tabChange(e) {
				console.log(e);
				this.tabIndex = e.detail.current;
			},
			//左侧tab点击
			selectLeftTab(index) {
				this.leftIndex = index
			},

			switchDate(type) {
				this.type = type
			},


			toGo(url) {
				uni.navigateTo({
					url: url
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/deviceDetail/deviceDetail?id=" + id
				})
			},
			search: function(event) {
				console.log("点击搜索", event.detail.value);
				this.toGo('/pages/deviceList/deviceList?title=在线设备&keyword=' + event.detail.value)
			}
		}
	}
</script>

<style>
	/* 沉浸式适配 */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #F3F4F6;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #F3F4F6;
		top: 0;
		z-index: 999;
	}

	.bg {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F3F4F6;
		padding-bottom: var(--window-bottom);
	}

	.notice {
		width: 48rpx;
		height: 48rpx;
		margin-right: 20rpx;
		position: relative;
	}

	.num {
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		font-size: 18rpx;
		color: white;
		border-radius: 12rpx;
		background-color: #F83C1E;
		border: 1rpx solid #FFF;
		text-align: center;
		top: -10rpx;
		right: -1rpx;
	}

	.h-layout {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.content-layout {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.text-black {
		font-size: 32rpx;
		font-weight: 500;
		color: #38CBD5;
	}

	.text-gray {
		font-size: 32rpx;
		font-weight: 400;
		color: #666666;
	}

	/* 横向Tab */
	.horizonal-tab {}

	.horizonal-tab .active {
		color: #38CBD5;
	}

	.scroll-tab {
		/* 必要，导航栏才能横向*/
		white-space: nowrap;

		border-bottom: 1rpx solid #EFF4FA;
		text-align: center;
	}

	.scroll-tab-item {
		/* 必要，导航栏才能横向*/
		display: inline-block;

		margin: 50rpx 30rpx 0 30rpx;
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

	.txt_color_blue {
		color: #38CBD5;
	}

	.txt_color_gray {
		color: #666666;
	}
</style>