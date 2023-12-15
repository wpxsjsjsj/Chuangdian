<template>
	<view class="bg">
		<view style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin:0 32rpx;">
			<!-- 省市 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;color: #333333;font-weight: 400;">省市</text>
				<!-- <uni-data-select v-model="value" :localdata="range" @change="change" :clear="false"
				:placeholder="$t('information.vehicleHint')"></uni-data-select> -->
				<input style="flex: 1; font-size: 28rpx;color: #333333;font-weight: 400;text-align: end; " type="text"
					v-model="city" :disabled="true" trim="all" :inputBorder="false" placeholder="请选择省市区" />
				<image style="width: 26rpx;height: 26rpx;margin-left: 10rpx;" :src="'/static/ic_jiao_down.png'"></image>
			</view>
			<view class="line"></view>

			<!-- 项目 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;color: #333333;font-weight: 400;">项目</text>
				<input style="flex: 1; font-size: 28rpx;color: #333333;font-weight: 400;text-align: end; " type="text"
					v-model="project" :disabled="true" trim="all" :inputBorder="false" placeholder="请选择项目名称" />
				<image style="width: 26rpx;height: 26rpx;margin-left: 10rpx;" :src="'/static/ic_jiao_down.png'"></image>
			</view>
			<view class="line"></view>

			<!-- 园区 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;color: #333333;font-weight: 400;">园区</text>
				<input style="flex: 1; font-size: 28rpx;color: #333333;font-weight: 400;text-align: end; " type="text"
					v-model="park" :disabled="true" trim="all" :inputBorder="false" placeholder="请选择园区" />
				<image style="width: 26rpx;height: 26rpx;margin-left: 10rpx;" :src="'/static/ic_jiao_down.png'"></image>
			</view>
			<view class="line"></view>

			<!-- 楼栋 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;color: #333333;font-weight: 400;">楼栋</text>
				<input style="flex: 1; font-size: 28rpx;color: #333333;font-weight: 400;text-align: end; " type="text"
					v-model="building" :disabled="true" trim="all" :inputBorder="false" placeholder="请选择楼栋" />
				<image style="width: 26rpx;height: 26rpx;margin-left: 10rpx;" :src="'/static/ic_jiao_down.png'"></image>
			</view>
			<view class="line"></view>

			<!-- 楼层 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;color: #333333;font-weight: 400;">楼层</text>
				<input style="flex: 1; font-size: 28rpx;color: #333333;font-weight: 400;text-align: end; " type="text"
					v-model="floor" :disabled="false" trim="all" :inputBorder="false" placeholder="请输入楼层信息" />
			</view>
			<view class="line"></view>

			<!-- 厕所 -->
			<view class="h-layout">
				<text style="font-size: 28rpx;color: #333333;font-weight: 400;">厕所</text>
				<input style="flex: 1; font-size: 28rpx;color: #333333;font-weight: 400;text-align: end; " type="text"
					v-model="toilet" :disabled="true" trim="all" :inputBorder="false" placeholder="请选择厕所" />
				<image style="width: 26rpx;height: 26rpx;margin-left: 10rpx;" :src="'/static/ic_jiao_down.png'"></image>
			</view>
			<view class="line"></view>

		</view>
		<view style="flex: 1;" />
		<!-- 按钮 -->
		<button class="btn" @click="bindDevice()">绑定设备</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city:"",
				project:"",
				park:"",
				building:"",
				floor:"",
				toilet:"",
			}
		},
		methods: {
			bindDevice() {
				if (!this.city) {
					return uni.showToast({
						title: '请选择省市区',
						icon: 'error'
					})
				}
				if (!this.project) {
					return uni.showToast({
						title: '请选择项目名称',
						icon: 'error'
					})
				}
				if (!this.park) {
					return uni.showToast({
						title: '请选择园区',
						icon: 'error'
					})
				}
				if (!this.building) {
					return uni.showToast({
						title: '请选择楼栋',
						icon: 'error'
					})
				}
				if (!this.floor) {
					return uni.showToast({
						title: '请输入楼层信息',
						icon: 'error'
					})
				}
				if (!this.toilet) {
					return uni.showToast({
						title: '请选择厕所',
						icon: 'error'
					})
				}
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
		padding: 32rpx;
	}

	.line {
		background-color: #EFF4FA;
		height: 2rpx;
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
		margin: 32rpx 32rpx 56rpx 32rpx;
	}
</style>