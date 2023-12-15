<template>
	<scroll-view class="coupon-scroll-view" scroll-y="true" @scrolltolower="onReachBottom">
	<view style="display: flex;flex-direction: column;" v-for="item in list">
		<view class="h-layout">
			<!-- 金额 -->
			<view style="display: flex; align-items: baseline;width: 140rpx;justify-content: center;margin-right: 32rpx;">
				<text style="font-size: 32rpx;font-weight: bold;color: #F42B00;">¥</text>
				<text style="font-size: 72rpx;font-weight: bold;color: #F42B00;">{{Math.floor(type == 'user'? item.coupons.coupons_money : item.coupons_money)}}</text>
			</view>
			<!-- 中间部分 -->
			<view style="flex: 1; display: flex; flex-direction: column;">
				<view style="font-size: 32rpx;font-weight: 600;color: #333333;">
					{{type == 'user'? item.coupons.coupons_name : item.coupons_name}}
				</view>
				<view style="font-size: 24rpx;font-weight: 400;color: #80848F;margin-top: 16rpx;">
					有效期至 {{type == 'user'? item.coupons.end_time : item.end_time}}
				</view>
				<view style="font-size: 20rpx;font-weight: 400;color: #999999;margin-top: 32rpx;">
					使用规则 >
				</view>
			</view>

			<!-- 去使用 -->
			<text @click.stop="claimCoupons(item)" :class="{isGet: item.isGet==1}" style="font-size: 24rpx;font-weight: 600;color: #FFFFFF;background: #38CBD5;border-radius: 8rpx;
					text-align:center;padding: 8rpx 18rpx;">{{item.isGet == '1'? '已领取' : type == 'user'? '去使用' : '可领取'}}</text>

		</view>

	</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "couponListView",
		//接收父控件的值
		props: {
			type: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				hasMore: true,
				page: 1,
				list: []
			};
		},
		created() {
			console.log('进入了优惠券列表组件')
			this.getCouponList()
		},
		methods: {
			onReachBottom(){
				console.log('划到底了')
				if(this.type=='user'&&this.hasMore){
					this.getCouponList()
				}
			},
			//领取优惠券
			async getCouponList(){
				let _this = this
				let params = {}
				_this.type == 'user'? params.page = _this.page : ''
				const res = await this.$myRequest({
					url: _this.type == 'user'? 'api/Coupon/getUserCouponList' : 'api/Coupon/getCouponList',
					method: "POST",
					data: params
				})
				console.log('获取'+ (this.type=='user'? '用户' : '领取') +'优惠券列表', res)
				if(res.code == 1){
					if(_this.type=='user'){
						if (res.data.data.length<=0) {
						  // 没有更多数据
						  this.hasMore = false;
						}
						this.list = this.list.concat(res.data.data);
						this.page++;
					}else{
						this.list = res.data;
					}
				}else{
				}
			},
			//领取优惠券
			async claimCoupons(item){
				let _this = this
				console.log('hehhehe',this.type)
				if(_this.type == 'user'){
					console.log('进入到跳转方案了')
					uni.switchTab({
						url: '/pages/shop/shop',
					})
				}else{
					if(item.isGet && item.isGet == 1) {
						uni.showToast({
							title: '已领取',
							icon: 'none'
						})
						return
					}
					const res = await this.$myRequest({
						url: 'api/Coupon/draw',
						method: "POST",
						data: {
							coupons_id: item.id
						}
					})
					console.log('领取优惠券', res)
					if(res.code == 1){
						item.isGet = '1'
						uni.showToast({
							title: res.msg,
							icon: 'success'
						})
						
						// _this.goodsTypeList = res.data
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}
				
				// uni.navigateTo({
				// 	url: '/pages/couponList/couponList'
				// })
			}
		}
	}
</script>

<style>
	.isGet{filter: grayscale(1);}
	.coupon-scroll-view {
			height: 100vh; /* 设置高度，可根据需要调整 */
		}
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 0 32rpx 20rpx 32rpx;
		padding: 30rpx;

	}
</style>