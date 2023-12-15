<template>
	<view class="bg">
		<view style="flex: 1; overflow: auto;">
			<!-- 地址 -->
			<view class="h-layout" @click="selectAddress()"
				style="padding: 32rpx; background-color: #FFFFFF;border-radius: 16rpx;margin: 0 32rpx;">
				<view style="flex: 1; display: flex;flex-direction: column;">
					<view class="h-layout">
						<image style="width: 24rpx;height: 26rpx;" :src="'/static/ic_address.png'"></image>
						<text
							style="flex: 1; font-size: 32rpx;font-weight: 600;color: #333333;margin-left: 10rpx;">{{detail.addressDetail}}</text>
					</view>
					<view class="h-layout" style="margin-top: 10rpx; ">
						<text style=" font-size: 24rpx;font-weight: 400;color: #333333;">{{detail.name}}</text>
						<!-- <text style=" font-size: 24rpx;font-weight: 400;color: #333333;margin-left: 18rpx;">女士</text> -->
						<text
							style=" font-size: 24rpx;font-weight: 400;color: #333333;margin-left: 18rpx;margin-top: 4rpx;">{{detail.phone}}</text>
					</view>
				</view>
				<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
			</view>
			<!-- 订单商品 -->
			<view
				style=" display: flex;flex-direction: column; padding: 32rpx; background-color: #FFFFFF;border-radius: 16rpx;margin:20rpx 32rpx;">
				<text style=" font-size: 28rpx;font-weight: 600;color: #333333;">订单商品</text>
				<view class="h-layout" style="margin-top: 32rpx;">
					<image style="width: 128rpx;height: 128rpx;border-radius: 8rpx;" :src="detail.image || '/static/logo.png'"></image>
					<view style="flex: 1; display: flex;flex-direction: column;margin:0 10rpx;">
						<text style=" font-size: 28rpx;font-weight: 500;color: #333333;">{{detail.goods_name}}</text>
						<text style=" font-size: 24rpx;font-weight: 500;color: #666666;margin-top: 20rpx;">{{detail.goods_attr}}</text>
					</view>

					<text style="font-size: 28rpx;font-weight: 500;color: #FF5500;">¥{{detail.goods_price}}</text>
				</view>
			</view>
			<!-- 购买数量 -->
			<view class="h-layout"
				style="padding: 32rpx; background-color: #FFFFFF;border-radius: 16rpx;margin:0 32rpx;">
				<text style="flex: 1; font-size: 28rpx;font-weight: 600;color: #333333;">购买数量</text>

				<text style="width: 64rpx;height: 64rpx; background-color: #F3F4F6;
				border-radius: 50%;border: 2rpx solid #CCCCCC;color: #333333;font-size: 32rpx;font-weight: 600;
				 display: flex; align-items: center;justify-content: center;" @click="addNum()">+</text>
				<text
					style="min-width: 40rpx; font-size: 28rpx;font-weight: 500;color: #333333;margin: 0 32rpx;text-align: center;">{{detail.order_total_num}}</text>
				<text style="width: 64rpx;height: 64rpx; background-color: #F3F4F6;
				 border-radius: 50%;border: 2rpx solid #CCCCCC; color: #333333;font-size: 32rpx;font-weight: 600;
				  display: flex; align-items: center;justify-content: center;" @click="reduceNum()">-</text>
			</view>
			<!-- 优惠券 -->
			<view class="h-layout" @click="couponList()"
				style="padding: 32rpx; background-color: #FFFFFF;border-radius: 16rpx;margin:20rpx 32rpx;">
				<text style="flex: 1; font-size: 28rpx;font-weight: 600;color: #333333;">优惠券</text>
				<text style="font-size: 28rpx;font-weight: 400;color: #333333;margin-right:18rpx;">{{ couponPrice>0 ? '-'+couponPrice : '请选择优惠券' }}</text>
				<image style="width: 12rpx;height: 16rpx;" :src="'/static/ic_next.png'"></image>
			</view>
			<!-- 支付方式 -->
			<view class="h-layout"
				style="padding: 32rpx; background-color: #FFFFFF;border-radius: 16rpx;margin:0 32rpx;">
				<text style="flex: 1; font-size: 28rpx;font-weight: 600;color: #333333;">支付方式</text>
				<image style="width: 48rpx;height: 48rpx;" :src="'/static/ic_weixin.png'"></image>
				<text style="font-size: 28rpx;font-weight: 400;color: #333333;margin-left:8rpx;">微信支付</text>

			</view>

		</view>

		<!-- 底部布局 -->
		<view class="h-layout" style="background-color: #FFFFFF;">
			<text style="flex: 1; font-size: 28rpx;font-weight: 500;color: #333333;text-align: end;">待支付：</text>
			<text style="font-size: 28rpx;font-weight: 500;color: #FF5500;">¥{{ detail.order_pay_price }}</text>
			<text
				style="font-size: 28rpx;font-weight: 500;color: #FFFFFF;background: #38CBD5;border-radius: 36rpx; padding: 16rpx 44rpx;margin: 14rpx 32rpx 20rpx 16rpx;" @click="buyNow()">立即支付</text>
		</view>
		<!-- 优惠券弹框 -->
		    <view class="coupon-modal" v-show="showCouponModal">
				<div class="shadow" style="position: absolute;left: 0;right: 0;bottom: 0;top: 0;" @click="showCouponModal = false"></div>
		        <view class="coupon-content" style="background: #f3f5f7;border-radius: 24px 24px 0 0;padding: 16 10px;z-index: 1;">
		            <view style="display: flex;justify-content: space-between;align-items: center;height: 46px;padding: 0 12px;margin-bottom: 14px;">
						<text class="close-button" style="margin: 0;color: #393c3c;font-weight: bold;">可用优惠券</text>
						<image @click="closeCouponModal" style="width: 18px;height: 18px;" src="/static/ic_close_popup.png" alt="" ></image>
					</view>
		            <!-- 优惠券列表内容，你可以根据实际情况添加 -->
		            <view style="display: flex;flex-direction: column;justify-content: center;align-items: center;" v-for="item,i in list">
		            	<view @click.stop="claimCoupons(item, i)" class="h-layout" style="background-color: #FFFFFF;width: 82%;border-radius: 8px;margin-bottom: 10px;padding: 16px 22px;">
		            		<!-- 金额 -->
		            		<view style="display: flex; align-items: baseline;width: 140rpx;justify-content: center;margin-right: 32rpx;">
		            			<text style="font-size: 32rpx;font-weight: bold;color: #F42B00;">¥</text>
		            			<text style="font-size: 72rpx;font-weight: bold;color: #F42B00;">{{item.coupons.coupons_money}}</text>
		            		</view>
		            		<!-- 中间部分 -->
		            		<view style="flex: 1; display: flex; flex-direction: column;">
		            			<view style="font-size: 32rpx;font-weight: 600;color: #333333;">
		            				{{item.coupons.coupons_name}}
		            			</view>
		            			<view style="font-size: 24rpx;font-weight: 400;color: #80848F;margin-top: 16rpx;">
		            				有效期至 {{item.coupons.end_time}}
		            			</view>
		            			<view style="font-size: 20rpx;font-weight: 400;color: #999999;margin-top: 32rpx;">
		            				使用规则 >
		            			</view>
		            		</view>
		            
		            		<!-- 去使用 -->
		            		<image style="width: 20px;height: 20px;" :src="chooseCouponsIndex==i? '/static/ic_circle_check.png' : '/static/ic_circle_uncheck.png'" alt="" ></image>
		            
		            	</view>
		            
		            </view>
					<view @click.stop="chooseCoupons(item,i)" style="width: 94%;margin: 0 auto;border-radius: 40px;padding: 16px 0;font-weight: bold;color: #353535;font-size: 16px;display: flex;align-items: center;justify-content: center;background-color: #fff;">确认</view>
		            <!-- 根据需要添加更多优惠券详情 -->
		        </view>
		    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponPrice: 0,
				num: 1,
				detail: {},
				showCouponModal: false,
				list: [],
				chooseCouponsIndex: 0
			}
		},
		onUnload() {
		    // 页面卸载时移除监听
		    uni.$off('updateAddress');
		  },
		onHide(){
			uni.$off('updateAddress');
			console.log('商品确认页页面隐藏了')
		},
		onLoad(options) {
			for (const key in options) {
			  this.detail[key] = decodeURIComponent(options[key]);
			}
			console.log('进入到商品确认页', this.detail);
		},
		onShow(){
			let _this = this
			uni.$on('updateAddress', (data) => {
				console.log('拿到了选择的地址信息',data)
				_this.detail.address_id = data.address_id
				_this.detail.addressDetail = data.detail
				_this.detail.name = data.name
				_this.detail.phone = data.phone
			});
		},
		methods: {
			// 确认使用优惠券
			chooseCoupons(item,i){
				this.calculatePrice(item,i)
			},
			//选择优惠券计算优惠价
			async calculatePrice(item,i){
				let _this = this
				if(this.chooseCouponsIndex == i){
					this.showCouponModal = false;
					return
				}
				const res = await this.$myRequest({
					url: 'api/Coupon/calculatePrice',
					method: "POST",
					data: {
						goods_price: this.detail.order_pay_price,
						coupons_id: _this.list[this.chooseCouponsIndex].coupons_id
					}
				});
				console.log('选择优惠券计算优惠价',res)
				if (res.code == 1) {
					// _this.list = res.data.data
					this.couponPrice = _this.list[this.chooseCouponsIndex].coupons.coupons_money
					console.log('this.couponPrice',this.couponPrice)
					this.detail.order_pay_price = res.data.coupons_price
					this.showCouponModal = false;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'error'
					})
				}
			},
			// 勾选优惠券
			claimCoupons(item,i ){
				this.chooseCouponsIndex = i
			},
			couponList() {
			    // 点击打开优惠券弹框
			    this.showCouponModal = true;
				if(this.list.length<=0){
					this.screenUserCouponsList()
				}
			},
			closeCouponModal() {
			    // 点击关闭按钮关闭优惠券弹框
			    this.showCouponModal = false;
			},
			//获取商品价格筛选优惠券
			async screenUserCouponsList(){
				let _this = this
				const res = await this.$myRequest({
				    url: 'api/Coupon/screenUserCouponsList',
				    method: "POST",
				    data: {
				        goods_price: this.detail.goods_price
				    }
				});
				console.log('获取商品价格筛选优惠券',res)
				if (res.code == 1) {
					_this.list = res.data.data
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'error'
					})
				}
			},
			selectAddress() {
				uni.navigateTo({
					url: '/pages/addressManage/addressManage?selectAddress=1'
				})
			},
			// couponList() {
			// 	uni.navigateTo({
			// 		url: '/pages/couponList/couponList'
			// 	})
			// },
			//加
			addNum() {
				if (this.detail.order_total_num >= 99) {
					this.detail.order_pay_price = Number(this.detail.goods_price) * this.detail.order_total_num - this.couponPrice
					return
				}
				this.detail.order_total_num = Number(this.detail.order_total_num) + 1
				this.detail.order_pay_price = Number(this.detail.goods_price) * this.detail.order_total_num - this.couponPrice
			},
			//加
			reduceNum() {
				if (this.detail.order_total_num <= 1) {
					this.detail.order_pay_price = Number(this.detail.goods_price) * this.detail.order_total_num - this.couponPrice
					return
				}
				this.detail.order_total_num -= 1
				this.detail.order_pay_price = Number(this.detail.goods_price) * this.detail.order_total_num - this.couponPrice
			},
			// buyNow(){
			// 	uni.navigateTo({
			// 		url:"/pages/orderList/orderList"
			// 	})
			// },
			// 微信支付
			async buyNow(){
				let _this = this
				const res = await this.$myRequest({
					url: 'api/Order/buyNow_pay',
					method: "POST",
					data: {
						goods_id: _this.detail.goods_id,
						goods_num: _this.detail.order_total_num,
						goods_sku_id:  _this.detail.spec_sku_id,
						address_id: _this.detail.address_id
					}
				});
				console.log('选择优惠券计算优惠价',res)
				if (res.code == 1) {
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'error'
					})
				}
			},
			
		}
	}
</script>

<style scoped>
	.isGet{filter: grayscale(1);}
	/* 优惠券弹框样式 */
	    .coupon-modal {
	        position: fixed;
	        bottom: 0;
	        left: 0;
	        width: 100%;
	        height: 100%;
	        background-color: rgba(0, 0, 0, 0.5);
	        display: flex;
	        align-items: flex-end;
	        z-index: 999;
	    }
	
	    .coupon-content {
	        width: 100%;
	        padding: 20rpx;
	        background-color: #ffffff;
	        border-top-left-radius: 20rpx;
	        border-top-right-radius: 20rpx;
	    }
	
	    .close-button {
	        font-size: 28rpx;
	        color: #333333;
	        margin-bottom: 20rpx;
	        cursor: pointer;
	    }
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
</style>