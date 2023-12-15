<template>
	<view class="bg">
		<view style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin:0 32rpx;">
			<!-- 横向tab -->
			<view class="h-layout">
				<view class="horizonal-tab" style="margin-bottom: 20rpx;">
					<scroll-view scroll-x="true" scroll-with-animation class="scroll-tab">
						<block v-for="(item,index) in tabBars" :key="index">
							<view class="scroll-tab-item" :class="{'active': tabIndex==index}" @tap="toggleTab(index)">
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
				<view style="font-size: 28rpx;font-weight: 400;color: #666666;padding-left: 30rpx;" @click="openPopup">
					更多日期
					<image style="width: 24rpx;height: 24rpx;padding-right: 30rpx;" src="../../static/ic_edit.png">
					</image>
				</view>
			</view>
			<!-- 用纸巾统计数据 -->
			<view class="h-layout" style="position: relative;width: 100%;padding: 30rpx 0;">
				<view style="flex: 1; text-align: center;font-size: 28rpx;font-weight: 500;color: #333333;">
					用纸巾统计数据</view>
				<text
					style="position: absolute; right: 30rpx; font-size: 24rpx;font-weight: 400;color: #007AFF;">2023.02</text>
			</view>
			<!-- 表格标题 -->
			<view class="h-layout" style="background-color: #F7FAFF; padding: 24rpx 0;">
				<view style="width: 126rpx;" class="txt-24-333-400"></view>
				<view style="flex: 1;" class="txt-24-333-400">累计用纸(米)</view>
				<view style="flex: 1;" class="txt-24-333-400">累计换纸(卷)</view>
				<view style="flex: 1;" class="txt-24-333-400">人均用纸(米)</view>
			</view>
			<!-- 表格内容 -->
			<view v-for="(item,index) in statisticalData" :class="[index % 2 == 0? 'bg-white-h' : 'bg-blue-h'] "
				@click="toDetail(item.title)">
				<view style="width: 126rpx; padding:0 20rpx;" class="txt-24-333-400">{{item.title}}</view>
				<view style="flex: 1;" class="txt-24-333-400">{{item.data1}}</view>
				<view style="flex: 1;" class="txt-24-333-400">{{item.data2}}</view>
				<view style="flex: 1;" class="h-layout">
					<view style="flex: 1;" class="txt-24-333-400">{{item.data3}}</view>
					<image style="width: 10rpx;height: 14rpx;margin-right: 30rpx;" src="../../static/ic_next.png">
					</image>
				</view>
			</view>
			<!-- 用纸巾统计数据 -->
			<view class="h-layout" style="position: relative;width: 100%;padding: 30rpx 0;">
				<view style="flex: 1; text-align: center;font-size: 28rpx;font-weight: 500;color: #333333;">
					用纸量曲线</view>
				<text
					style="position: absolute; right: 30rpx; font-size: 24rpx;font-weight: 400;color: #007AFF;">2023.02</text>
			</view>

			<view class="h-layout" style="padding: 0rpx 30rpx;">
				<text class="txt-24-333-400" style="flex: 1;">
					单位：百米
				</text>
				<view style="width: 12rpx;height: 12rpx;background: #2FA24C; border-radius: 6rpx;"></view>
				<text class="txt-24-333-400" style="margin-right: 50rpx;">
					男厕
				</text>
				<view style="width: 12rpx;height: 12rpx;background: #E84536; border-radius: 6rpx;"></view>
				<text class="txt-24-333-400" style="margin-right: 50rpx;">
					女厕
				</text>
				<view style="width: 12rpx;height: 12rpx;background: #2FA24C; border-radius: 6rpx;"></view>
				<text class="txt-24-333-400" style="">
					无障碍厕所
				</text>

			</view>
			<l-echart style="height: 460rpx;padding: 0 30rpx; " ref="lineChart2"></l-echart>

		</view>
		<!-- 筛选右侧弹窗 -->
		<uni-popup ref="popup" type="right">
			<view
				style="width: 556rpx;height: 100%; background-color: white; display: flex;flex-direction: column; padding: 40rpx;">
				<text style="font-size: 28rpx;font-weight: 500;color: #333333;">
					设备筛选
				</text>

				<scroll-view scroll-y="true" style="flex: 1; overflow: auto;display: flex;flex-direction: column;">
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
	</view>
</template>

<script>
	import * as echarts from 'echarts/core';
	import {
		LineChart
	} from 'echarts/charts';
	import {
		TooltipComponent,
		GridComponent,
	} from 'echarts/components';
	import {
		CanvasRenderer
	} from 'echarts/renderers';
	// 注册必须的组件
	echarts.use([
		TooltipComponent,
		GridComponent,
		LineChart,
		CanvasRenderer
	]);

	export default {
		data() {
			return {
				// 选中标签栏的序列,默认显示第一个
				tabIndex: 0,
				tabBars: [{
						name: '今天',
						id: 'guanzhu'
					},
					{
						name: '昨天',
						id: 'tuijian'
					},
					{
						name: '本月',
						id: 'redian'
					},
					{
						name: '上月',
						id: 'tiyu'
					}
				],
				//统计数据
				statisticalData: [{
					title: "男厕",
					data1: "2521",
					data2: "21",
					data3: "2.0",
				}, {
					title: "女厕",
					data1: "2521",
					data2: "21",
					data3: "2.0",
				}, {
					title: "无障碍厕所",
					data1: "2521",
					data2: "21",
					data3: "2.0",
				}, {
					title: "合计",
					data1: "2521",
					data2: "21",
					data3: "2.0",
				}],
			}
		},
		mounted() {
			//加载折线图数据
			this.loadLineData2();
		},
		methods: {
			//切换选项卡
			toggleTab(index) {
				this.tabIndex = index;
			},
			//滑动切换swiper
			tabChange(e) {
				console.log(e);
				this.tabIndex = e.detail.current;
			},
			//跳转详情
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/analysisDetail/analysisDetail?id=" + id
				})
			},
			openPopup() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('right')
			},
			//加载折线图数据--示例2
			loadLineData2() {
				//这里请求服务器拿到数据
				let res = {
					//x轴数据
					xData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
					//y轴数据
					yData: [50, 120, 150, 220, 180, 300, 130],
					yData1: [20, 720, 350, 120, 80, 30, 190],
					yData2: [120, 187, 730, 710, 780, 330, 290],
				}
				//这里option配置参考文档：https://echarts.apache.org/zh/option.html
				let option = {
					xAxis: {
						type: 'category',
						// x轴数据文字颜色
						axisLabel: {
							color: '#333333'
						},
						// x轴那天坐标轴线的颜色
						axisLine: {
							lineStyle: {
								color: '#000000'
							}
						},
						//x轴上面刻度线隐藏
						axisTick: {
							show: false,
						},
						//这里是x轴数据
						data: res.xData
					},
					//设置网格
					grid: {
						top: 20,
						bottom: 40,
					},
					//y轴设置
					yAxis: {
						type: 'value',
						//y轴标签文字颜色
						axisLabel: {
							color: '#333333'
						},
						nameTextStyle: {
							fontSize: 5,
							fontStyle: "italic"
						},
						// y轴分割线设置为虚线
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed'
							}
						}
					},
					//设置提示为点击时
					tooltip: {
						trigger: 'axis',
						triggerOn: 'click',
						formatter: '{b}:  \n {a0}: {c0} \n {a1}: {c1} \n {a2}: {c2}'
					},
					//设置曲线的颜色，这里是3条故这只3个颜色
					color: ['#2FA24C', '#E84536', '#5D7092'],
					series: [{
							name: "男厕",
							//这里是数据
							data: res.yData,
							type: 'line',
							//设置为平滑，默认为折线
							smooth: true,
						},
						{
							name: "女厕",
							//这里是数据
							data: res.yData1,
							type: 'line',
							//设置为平滑，默认为折线
							smooth: true,
						},
						{
							name: "无障碍厕所",
							//这里是数据
							data: res.yData2,
							type: 'line',
							//设置为平滑，默认为折线
							smooth: true,
						}
					]
				};

				this.$refs.lineChart2.init(echarts, chart => {
					chart.setOption(option);
				});
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
	}

	.txt-24-333-400 {
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
	}

	.bg-blue-h {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #F7FAFF;
		padding: 24rpx 0;
	}

	.bg-white-h {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #FFFFFF;
		padding: 24rpx 0;
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
		font-size: 28rpx;

	}

	.active .scroll-tab-line {
		border-bottom: 3rpx solid #38CBD5;
		border-top: 3rpx solid #38CBD5;
		border-radius: 4rpx;
		width: 40rpx;
		font-size: 28rpx;

	}

	/* 横向Tab */
</style>