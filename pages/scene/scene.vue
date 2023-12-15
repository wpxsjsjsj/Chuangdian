<template>
	<view class="bg">
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="status_bar">
			<view class="top_view"></view>
		</view> -->
		<!-- #endif -->
		<!-- 顶部title -->
		<!-- <view
			style="width: 100%;display: flex;justify-content: center;align-items: center;padding: 30rpx 0 28rpx 0; font-size: 32rpx;font-weight: 600;color: #333333;">
			场景
		</view> -->

		<view style="height: 100%; display: flex;flex-direction: column; ">
			<!-- 上部分不动 -->
			<view
				style="background-color: #FFF;border-radius: 16rpx 16rpx 0 0;margin: 0 32rpx;display: flex;flex-direction: column;">
				<!-- 省市区及搜索栏 -->
				<view class="h-layout" style="margin: 32rpx 32rpx 40rpx 32rpx;">
					<myPicker type="1" @chooseAddress="chooseAddress" :isEdit="isEdit" :isSaveData="'1'" :region="region" />
						<image style="width: 20rpx;height: 20rpx;padding-left: 16rpx;padding-right: 32rpx;"
						@click="toGo('/pages/selectAddress/selectAddress')" :src="'/static/ic_down.png'"></image>
					<input
						style="flex: auto; height: 76rpx;font-size: 24rpx;color: #999999;background: #F7F8FA;border-radius: 38rpx;padding: 0 34rpx;"
						placeholder-style="color:#999999" v-model="keyword" confirm-type="search" @confirm="search"
						placeholder="请输入关键词查询" />
				</view>

				<!-- 横向tab -->
				<view class="horizonal-tab" style="margin-bottom: 30rpx; ">
					<scroll-view scroll-x="true" scroll-with-animation class="scroll-tab">
						<block v-for="(item,index) in tabBars" :key="index">
							<view class="scroll-tab-item" :class="{'active': tabIndex==index}" @tap="toggleTab(item,index)">
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


			<!-- 下部分滑动 -->
			<view
				style="flex: 1; overflow: scroll; background-color: #FFF;border-radius:0 0 16rpx 16rpx ;margin: 0 32rpx 32rpx 32rpx;padding-bottom: 32rpx; display: flex;flex-direction: column;">
				<!-- 横向布局 -->
				<view style="width: 100%; height: 100%; display: flex;flex-direction: row;">
					<!-- 左边竖向列表 -->
					<view
						style="width: 130rpx; display: flex;flex-direction: column;margin: 0 32rpx;background-color: #F7F8FA;border-radius: 8rpx;">
						<view>
							<view @click="toggleYuanqu(item,i)" :class="[yuanquIndex == i? 'txt_color_blue':'txt_color_gray']" v-for="item, i in yuanquData" :key="i">{{item.name}}</view>
						</view> 
						<view style="width: 130rpx;display: flex;flex-direction: column;margin: 32rpx 0;"
							v-for="(item,index) in leftList" @click="selectLeftTab(item,index)">
							<view style="display: flex;justify-content: center;padding: 32rpx 0; "
								:class="[leftIndex == index? 'txt_color_blue':'txt_color_gray']">{{item.name}}
							</view>
						</view>

					</view>
					<!-- 右边列表 -->
					<scroll-view v-if="rightList.length > 0" scroll-y="true" :scroll-into-view="toView" scroll-with-animation="true" style="flex: 1;overflow: scroll; display: flex; flex-direction: column;">
						<view :id="'i'+index"  style="display: flex;flex-direction: column;" v-for="(item,index) in rightList">
							<view v-for="box, i in item.list" :key="i">
								<view style="display: flex;flex-direction: row;align-items: center; ">
									<text style="font-size: 28rpx;color: #666666;margin-right: 30rpx;">{{item.name}}{{box.toilet_type_text}}</text>
									<!-- 评分等级 -->
									<uni-rate :value="item.rate" :size="16" margin="2" touchable="false"
										active-color="#FF6966" />
								</view>
								<!-- grid -->
								<view
									style="flex: 1;  display: flex; display: flex;align-items: center;justify-content: center;margin-top: 40rpx;">
									<uni-grid style="" :column="3" :showBorder="false" :square="false" :highlight="false">
										<uni-grid-item v-for="(device,j) in box.list" :index="j" :key="j">
											<view
												style="display: flex;flex-direction: column; align-items: center;justify-content: center;"
												@click="toDetail(device.id)">
								
												<image :src="device.device_image" mode="aspectFit"
													style="width: 100rpx;height: 100rpx;background-color: #FFF;border-radius: 8px;" />
												<text
													style="font-size: 24rpx;color: #666666;padding-top: 16rpx;padding-bottom: 30rpx;">{{device.device_name}}</text>
											</view>
								
										</uni-grid-item>
									</uni-grid>
								
								</view>
								<!-- 横线 -->
								<view style="height: 4rpx;background: #F7F8FA;border-radius: 4rpx;margin-bottom: 30rpx;" />
							</view>
						</view>

					</scroll-view >
					<view v-else>暂无数据</view>
					<!-- 索引列表 -->
					<!-- 右侧字母导航条 -->
					<view style="width: 50rpx;height: 100%;display: flex;flex-direction: column;">
						<view style="font-size: 20rpx; color: #333333; padding: 10rpx 0;" 
						v-for="(item, index) in rightList" :key="index" @click="toSelectIndex('i'+index)">
							{{ (index+1) }}楼
						</view>
					</view>


				</view>
			</view>
			<tabbar :initCurrIndex="'1'"/>

		</view>
	</view>
</template>

<script>
	import tabbar from '../../components/tabbar/tabbar.vue'
	import myPicker from '../../components/picker/picker.vue'
	export default {
		components: {
			myPicker,
			tabbar
		},
		onLoad() {
			uni.hideTabBar();
			/* uni.setNavigationBarColor({
				backgroundColor: "#F3F4F6"
			}) */
			
			if(uni.getStorageSync('addressDefault')){
				this.address = uni.getStorageSync('addressDefault').name
			}
			console.log('进入了场景页面')
			this.getEventList()
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
				projects_id: "0", //项目id
				address: "省市",
				leftIndex: 0,
				keyword: "",
				leftList: [],
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
				//索引导航(scroll-into-view的值为滚动元素的id，且id不能以数字开头，且scroll-into-view的值一定要等于某个滚动元素的id，如果不等，则滚动不生效)
				toView: "",
				rightList: [{
					name: "1楼-男厕",
					rate: 3,
					list: [{
						img: "/static/ic_head.png",
						name: "101A"
					}, {
						img: "/static/ic_head.png",
						name: "102B"
					}, {
						img: "/static/ic_head.png",
						name: "103A"
					}, {
						img: "/static/ic_head.png",
						name: "104A"
					}, {
						img: "/static/ic_head.png",
						name: "105B"
					}]
				}, {
					name: "2楼-女厕",
					rate: 4,
					list: [{
						img: "/static/ic_head.png",
						name: "201A"
					}, {
						img: "/static/ic_head.png",
						name: "202B"
					}, {
						img: "/static/ic_head.png",
						name: "203A"
					}, {
						img: "/static/ic_head.png",
						name: "204A"
					}, {
						img: "/static/ic_head.png",
						name: "205B"
					}, {
						img: "/static/ic_head.png",
						name: "206B"
					}]
				}, {
					name: "3楼-女厕",
					rate: 2,
					list: [{
						img: "/static/ic_head.png",
						name: "301A"
					}, {
						img: "/static/ic_head.png",
						name: "302B"
					}, {
						img: "/static/ic_head.png",
						name: "303A"
					}, {
						img: "/static/ic_head.png",
						name: "304A"
					}]
				}, {
					name: "4楼-男厕",
					rate: 1,
					list: [{
						img: "/static/ic_head.png",
						name: "401A"
					}, {
						img: "/static/ic_head.png",
						name: "402B"
					}, {
						img: "/static/ic_head.png",
						name: "403A"
					}, {
						img: "/static/ic_head.png",
						name: "404A"
					}]
				}],
				yuanquIndex: 0,
				tabbarId: 0,
				selectLeftTabId: 0,
				yuanquId: 0,
				scenceData: {},
				yuanquData: [],
				buildingData: [],
				isParkData: false // 判断是否有园区数据
			}
		},
		methods: {
			//获取项目列表
			async getEventList(){
				const res = await this.$myRequest({
					url: 'api/Device/getEventList',
					method: "POST"
				})
				if(res.code == 1){
					this.tabBars = res.data
					this.projects_id = this.tabBars[0].id
					this.getList(this.projects_id)
				}
			},
			// processData 处理不带园区的数据
			processBuildData(){
				console.log('处理不带园区的数据',this.buildingData);
				this.leftList = this.buildingData.map(item=>{
					return {
						name: item.name,
						id: item.id
					}
				})
				let data = this.buildingData.filter(item=>item.id == this.selectLeftTabId)[0]
				console.log(data);
				this.$nextTick(()=>{
					this.rightList = data.story_data
				})

			},
			// 处理返回的JSON数据，带园区的数据
			processParkData() {
				console.log('处理带园区的数据', this.scenceData);
				this.yuanquData = this.scenceData.park_data.map(park => {
					return ({
						name: park.name,
						id: park.id
					})
				});
				this.yuanquId = this.yuanquData[0].id
				this.processBuildData()
			},
			// 获取场景内容
			async getList(projects_id){
				let _this = this
				const res = await this.$myRequest({
					url: 'api/take/getDeviceDistribute',
					method: "POST",
					data: {
						projects_id
					}
				})
				console.log('场景页数据',res)
				if(res.code == 1){
					// res.data.building_data = res.data.park_data[0].building_data
					// console.log(res.data);
					// delete res.data.park_data
					_this.scenceData = res.data
					// 模拟不带园区数据
					const hasParkData = res.data.hasOwnProperty('park_data');
					console.log(hasParkData);
					if(hasParkData){
						this.isParkData = true
						this.buildingData = _this.scenceData.park_data[0].building_data
						this.selectLeftTabId = this.buildingData[0].id
						this.processParkData()
					}else{
						this.isParkData = false
						this.buildingData = _this.scenceData.building_data
						this.selectLeftTabId = this.buildingData[0].id
						this.processBuildData()
					}
					
					console.log(this.selectLeftTabId)
					// this.tabbarId = res.data.park_data[0].id
					
					// this.processData()
					// this.tabBars = res.data
					// this.projects_id = this.tabBars[0].id
					// this.getList()
				}
			},
			//切换选项卡
			toggleTab(item,index) {
				this.tabbarId = item._id
				if(this.tabIndex !== index){
					this.getList(item.id)
				}
				this.tabIndex = index;
			},
			//滑动切换swiper
			tabChange(e) {
				console.log(e);
				this.tabIndex = e.detail.current;
			},
			// 园区点击
			toggleYuanqu(item,index){
				this.yuanquId = item.id
				console.log(item,index);
				let data = this.scenceData.park_data.filter((item)=>item.id == this.yuanquId)[0]
				this.buildingData = data.building_data
				this.yuanquIndex = index
				// this.selectLeftTab(this.leftList[0],0)
				// this.processBuildData()
			},
			//左侧tab点击
			selectLeftTab(item, index) {
				console.log('selectLeftTab',item)
				this.selectLeftTabId = item.id
				this.leftIndex = index
				this.processBuildData()
			},
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/deviceDetail/deviceDetail?id=" + id
				})
			},
			toGo(url) {
				uni.navigateTo({
					url: url
				})
			},
			search: function(event) {
				console.log("点击搜索", event.detail.value);
				this.toGo('/pages/deviceList/deviceList?title=在线设备&keyword=' + event.detail.value)
			},
			//索引点击列表滑动
			toSelectIndex(item){
				 this.toView = item
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
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #F3F4F6;
		padding-bottom: var(--window-bottom);
	}

	.h-layout {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.txt_color_blue {
		color: #38CBD5;
	}

	.txt_color_gray {
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

		margin: 0rpx 30rpx 0 30rpx;
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