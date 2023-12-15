<template>
	<view class="bg">
		<text
			style="font-size: 28rpx;color:#333333;font-weight: 600; padding: 60rpx 48rpx;background-color: #FFFFFF;">基本资料</text>
		<view class="h-layout" v-show="name">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">真实姓名</text>
			<text style="font-size: 28rpx;color:#333333;font-weight: 400;color: #666666; ">{{name}}</text>
		</view>
		<view class="h-layout" v-show="phone">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">手机号码</text>
			<text style="font-size: 28rpx;color:#333333;font-weight: 400;color: #666666; ">{{phone}}</text>
		</view>
		<view class="h-layout" v-show="eamil">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">邮箱地址</text>
			<text style="font-size: 28rpx;color:#333333;font-weight: 400;color: #666666; ">{{eamil}}</text>
		</view>
		<view class="h-layout" v-show="idCrad">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">身份证号</text>
			<text style="font-size: 28rpx;color:#333333;font-weight: 400;color: #666666; ">{{idCrad}}</text>
		</view>
		<view class="h-layout" v-show="education">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">教育程度</text>
			<text style="font-size: 28rpx;color:#333333;font-weight: 400;color: #666666; ">{{education}}</text>
		</view>
		<view class="h-layout" v-show="address">
			<text style="flex: 1;font-size: 28rpx;font-weight: 400;color:#333333;">所在地</text>
			<text style="font-size: 28rpx;color:#333333;font-weight: 400;color: #666666; ">{{address}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "七七七七",
				phone: "1234567890",
				eamil: "1234567890@qq.com",
				idCrad: "1234567890987654321",
				education: "本科",
				address: "广东省广州市"
			}
		},
		onLoad() {
			console.log(uni.getStorageSync('userinfo'))
			if(uni.getStorageSync('userinfo')){
				let user = uni.getStorageSync('userinfo')
				this.idCrad = user.id_number
				this.phone = user.mobile
				this.address = user.locality
				this.education = user.educational_level
				this.name = user.nickname
				this.eamil = user.eamil
			}
		},
		methods: {
			
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
		flex-direction: row;
		align-items: center;
		background-color: #FFFFFF;
		padding: 0 48rpx 64rpx 48rpx;
	}
</style>