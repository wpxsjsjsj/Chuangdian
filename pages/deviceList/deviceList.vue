<template>
	<view class="bg">
		<view class="h-layout">
			<image style="width: 32rpx;height: 32rpx;padding-left: 32rpx;padding-right: 10rpx;"
				:src="'/static/ic_address.png'"></image>
			<!-- <text style="font-size: 28rpx;font-weight: 400;color: #333333;"
				@click="toGo('/pages/selectAddress/selectAddress')">{{address}}</text> -->
				<myPicker type="1" @chooseAddress="chooseAddress" :isEdit="isEdit" :isSaveData="'1'" :region="region" />
			<image style="width: 14rpx;height: 14rpx;padding-left: 16rpx;padding-right: 32rpx;"
				@click="toGo('/pages/selectAddress/selectAddress')" :src="'/static/ic_down.png'"></image>
			<input
				style="flex: auto; height: 76rpx;font-size: 28rpx;color: #333333;margin-right: 32rpx;background: #FFFFFF;border-radius: 38rpx;padding: 0 34rpx;"
				placeholder-style="color:#999999" v-model="searchKeyword" confirm-type="search" @confirm="search"
				placeholder="请输入关键词查询" />
		</view>
		<!-- 中间布局 -->
		<view
			style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin:32rpx 32rpx 28rpx 32rpx; padding-bottom: 22rpx;">
			<!-- 横向tab -->
			<view class="horizonal-tab" style="margin-bottom: 20rpx;">
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
			<!-- 设备数 -->
			<view class="h-layout">
				<view style="flex: 1; display: flex;flex-direction: column;padding-left: 32rpx;">
					<view class="h-layout">
						<text style="font-size: 28rpx;font-weight: 400;color: #333333;">设备数</text>
						<text
							style="flex: 1; font-size: 32rpx;font-weight: bold;color: #333333;margin-left: 10rpx;">{{list.length}}</text>
					</view>
					<view class="h-layout" style="margin-top: 10rpx;" v-if="isShowAddDevice">
						<text
							style="font-size: 28rpx;font-weight: 400;color: #333333;">在线&nbsp;&nbsp;{{onlineNum.length}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;离线&nbsp;&nbsp;{{list.length - onlineNum.length}}</text>
					</view>

				</view>


				<image style="width: 44rpx;height: 44rpx;padding-left: 8rpx;padding-right: 8rpx;"
					:src="'/static/ic_add_blue.png'" v-if="isShowAddDevice"></image>
				<text style="font-size: 28rpx;font-weight: 400;color: #333333;padding-right: 32rpx;"
					@click="addDevice()" v-if="isShowAddDevice">新增设备</text>
			</view>

			<!-- 搜索 -->

			<view class="h-layout" style="margin-top: 32rpx;" v-if="isShowAddDevice">
				<input
					style="flex: 1; height: 76rpx;font-size: 24rpx;color: #333333;margin-left: 24rpx;background: #F3F4F6;border-radius: 38rpx;padding: 0 34rpx;"
					placeholder-style="color:#999999" v-model="snKeyword" confirm-type="search" @confirm="search"
					placeholder="请输入SN号查询" />
				<image style="width: 32rpx;height: 32rpx;padding-left: 32rpx;padding-right: 32rpx;"
					:src="'/static/ic_screen.png'" @click="openPopup"></image>
			</view>

		</view>
		<!-- <uv-line-progress activeColor="#38CBD5" inactiveColor="#EBF9FA"
			:percentage="30" height="8"></uv-line-progress> -->
		<!-- 列表  overflow: auto；固定顶部不动-->
		<view style="flex: 1; overflow: auto;">
			<deviceListView :list="list" />
		</view>

	</view>
	<!-- 筛选右侧弹窗 -->
	<uni-popup ref="popup" type="right">
		<view style="width: 556rpx;height: 100%; background-color: white; display: flex;flex-direction: column; padding: 40rpx;">
			<view style="font-size: 28rpx;font-weight: 500;color: #333333;">
				设备筛选
			</view>

			<scroll-view scroll-y="true" style="flex: 1;overflow: auto; display: flex;flex-direction: column;">
				<view
					style="background: #F3F4F6;border-radius: 16rpx;padding: 24rpx;margin-top: 24rpx;display: flex;flex-direction: column;">
					<text class="txt-24-333-400">
						搜索厕所
					</text>
					<input
						style="background: #FFFFFF;border-radius: 16rpx;padding: 14rpx 24rpx;margin-top: 24rpx; font-size: 24rpx; font-weight: 400;color: #CCCCCC;"
						placeholder="输入要查找的厕所编号" />
				</view>
				<view
					style="background: #F3F4F6;border-radius: 16rpx;padding: 24rpx;margin-top: 24rpx;display: flex;flex-direction: column;">
					<text class="txt-24-333-400">
						设备类型
					</text>

					<view
						style="background: #FFFFFF;border-radius: 16rpx;padding: 14rpx 28rpx;margin-top: 24rpx;display: flex;flex-direction: row; align-items: center;">
						<text
							style="flex: 1; font-size: 24rpx;font-weight: 400;color: #999999;padding-right: 16rpx;">请选择</text>
						<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
					</view>

				</view>
				<view
					style="background: #F3F4F6;border-radius: 16rpx;padding: 24rpx;margin-top: 24rpx;display: flex;flex-direction: column;">
					<text class="txt-24-333-400">
						搜索设备
					</text>

					<view
						style="background: #FFFFFF;border-radius: 16rpx;padding: 14rpx 28rpx;margin-top: 24rpx;display: flex;flex-direction: row; align-items: center;">
						<text
							style="flex: 1; font-size: 24rpx;font-weight: 400;color: #999999;padding-right: 16rpx;">请选择</text>
						<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
					</view>

				</view>

				<view
					style="background: #F3F4F6;border-radius: 16rpx;padding: 24rpx;margin-top: 24rpx;display: flex;flex-direction: column;">
					<text class="txt-24-333-400">
						搜索项目
					</text>

					<view
						style="background: #FFFFFF;border-radius: 16rpx;padding: 14rpx 28rpx;margin-top: 24rpx;display: flex;flex-direction: row; align-items: center;">
						<text
							style="flex: 1; font-size: 24rpx;font-weight: 400;color: #999999;padding-right: 16rpx;">请选择</text>
						<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
					</view>

				</view>
				<view
					style="background: #F3F4F6;border-radius: 16rpx;padding: 24rpx;margin-top: 24rpx;display: flex;flex-direction: column;">
					<text class="txt-24-333-400">
						搜索楼座
					</text>

					<view
						style="background: #FFFFFF;border-radius: 16rpx;padding: 14rpx 28rpx;margin-top: 24rpx;display: flex;flex-direction: row; align-items: center;">
						<text
							style="flex: 1; font-size: 24rpx;font-weight: 400;color: #999999;padding-right: 16rpx;">请选择</text>
						<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
					</view>

				</view>
				<view
					style="background: #F3F4F6;border-radius: 16rpx;padding: 24rpx;margin-top: 24rpx;display: flex;flex-direction: column;">
					<text class="txt-24-333-400">
						选择楼层
					</text>

					<view
						style="background: #FFFFFF;border-radius: 16rpx;padding: 14rpx 28rpx;margin-top: 24rpx;display: flex;flex-direction: row; align-items: center;">
						<text
							style="flex: 1; font-size: 24rpx;font-weight: 400;color: #999999;padding-right: 16rpx;">请选择</text>
						<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
					</view>

				</view>
				<view
					style="background: #F3F4F6;border-radius: 16rpx;padding: 24rpx;margin-top: 24rpx;display: flex;flex-direction: column;">
					<text class="txt-24-333-400">
						选择厕所
					</text>

					<view
						style="background: #FFFFFF;border-radius: 16rpx;padding: 14rpx 28rpx;margin-top: 24rpx;display: flex;flex-direction: row; align-items: center;">
						<text
							style="flex: 1; font-size: 24rpx;font-weight: 400;color: #999999;padding-right: 16rpx;">请选择</text>
						<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
					</view>

				</view>
				<view
					style="margin-bottom: 32rpx; margin-top: 32rpx; display: flex;flex-direction: row; justify-content: flex-end;">
					<view
						style="padding: 16rpx 72rpx; background: #38CBD5;border-radius: 36rpx;font-size: 28rpx;font-weight: 500;color: #FFFFFF;text-align: center;justify-content: center;">
						确定
					</view>
				</view>

			</scroll-view>

		</view>
	</uni-popup>
</template>

<script>
	import myPicker from '../../components/picker/picker.vue'
	export default {
		components: {
			myPicker
		},
		onLoad(options) {
			// console.log(options.id);
			// this.getDetail(options.id)
			if (options.title) {
				uni.setNavigationBarTitle({
					title: options.title
				})
				// 初始化请求链接
				this.requestUrl = options.title == "设备列表"? "api/Device/getDeviceList" : "api/Device/getWarningDeviceList"
				console.log('哈哈哈哈哈哈哈哈哈哈哈',this.requestUrl)
				this.getEventList()
			}
			if (options.keyword) {
				this.keyword = options.keyword
			}
			if(uni.getStorageSync('addressDefault')){
				this.address = uni.getStorageSync('addressDefault').name
			}
			this.isShowAddDevice = options.title == "设备列表" 

		},
		onShow() {
			let that = this
			uni.$once('address', function(data) {
				/* 
				  {"id":61,"spell":"ankang","name":"安康"} 
				 */
				console.log('监听到事件来自返回的参数：' + data.name);
				that.address = data.name
				that.getList()
			})
			that.getList()
		},
		data() {
			return {
				onlineNum: 0, //在线设备数
				searchKeyword: '',
				snKeyword: '',
				address: "省市",
				//是否显示新增设备
				isShowAddDevice: true,
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
				deviceNum: 180,
				list: [{
						title: "负离子免打孔吹风机",
						online: 1,
						value: 70,
						address: "广东省广州市大华区 明离路科技园880号1栋2楼203室"
					},
					{
						title: "负离子免打孔吹风机",
						online: 2,
						value: 60,
						address: "广东省广州市大华区 明离路科技园880号1栋2楼203室"
					},
					{
						title: "负离子免打孔吹风机",
						online: 1,
						value: 80,
						address: "广东省广州市大华区 明离路科技园880号1栋2楼203室"
					},
					{
						title: "负离子免打孔吹风机",
						online: 1,
						value: 70,
						address: "广东省广州市大华区 明离路科技园880号1栋2楼203室"
					},
					{
						title: "负离子免打孔吹风机",
						online: 2,
						value: 75,
						address: "广东省广州市大华区 明离路科技园880号1栋2楼203室"
					}
				],
				page: 1,
				count: 10,
				isOver: false,
				isEmpty: false,
				projects_id: 0, // 项目id
				requestUrl: 'api/Device/getDeviceList'
			}
		},
		created(){
		},
		methods: {
			chooseAddress(data){
				// 更新地址数据
				this.address = data
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
			//获取列表数据
			async getList(key = "",callBack) {
				const res = await this.$myRequest({
					url: this.requestUrl,
					method: "POST",
					data: {
						page: this.page,
						limit: this.count,
						area: this.address,
						key: key,
						projects_id: this.projects_id
					}
				})
				console.log('获取列表数据',res)

				if (this.page == 1) {
					uni.stopPullDownRefresh()
					//刷新
					this.list = res.data.data.data
				} else {
					this.list = [...this.list, ...res.data.data.data]
				}
				console.log(this.list)
				this.onlineNum = this.list.filter(item=>{return item.state_text == '在线'})
				// console.log(this.list.list[0].s_name)

				callBack && callBack()

				if (this.list.length == 0) {
					this.isEmpty = true
				} else this.isEmpty = false

				if (res.data.total == this.list.length) {
					this.isOver = true
				} else this.isOver = false

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

			search: function(event) {
				console.log("点击搜索", event.detail.value);
				this.getList(event.detail.value)
			},
			//添加设备
			addDevice() {
				uni.navigateTo({
					url: '/pages/scanQrCode/scanQrCode'
				})
			},
			openPopup() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('right')
			},
		},
		props: {
			keyword: {
				type: String,
				default: '设备列表'
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

	.txt-24-333-400 {
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
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

		margin: 26rpx 32rpx 0 32rpx;
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