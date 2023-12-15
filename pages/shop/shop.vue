<template>
	<scroll-view refresher-enabled @refresherrefresh="refresh" :refresher-triggered='triggered'>
	<view class="bg">
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="status_bar">
			<view class="top_view"></view>
		</view> -->
		<!-- #endif -->
		<!-- 顶部title -->
		<!-- <view
			style="width: 100%;display: flex;justify-content: center;align-items: center;padding: 30rpx 0 28rpx 0; font-size: 32rpx;font-weight: 600;color: #333333;">
			商城
		</view> -->
		<view>
			<!-- 搜索 -->
			<view
				style="height: 76rpx; display: flex;flex-direction: row;align-items: center;background: #FFFFFF;border-radius: 38rpx;border: 2rpx solid #F0F0F0;margin: 0 30rpx;">
				<image style="width: 26rpx;height: 26rpx;margin-left: 28rpx;" :src="'/static/ic_search.png'"></image>
				<input style="flex: auto; height: 100%;font-size: 24rpx;color: #999999;padding: 0 26rpx;"
					placeholder-style="color:#999999" v-model="keyword" confirm-type="search" @confirm="search"
					placeholder="请输入关键词查询" />
			</view>
			<!-- banner -->
			<view style="width: 100%; height: 280rpx;margin-top: 30rpx;">
				<swiper style="width: 100%; height: 280rpx;" indicator-dots circular autoplay indicator-color="#E9E9E9"
					indicator-active-color="#38CBD5">
					<swiper-item v-for="item,index in this.bannerList" :key="item.id">
						<image style="width: 100%; height: 280rpx;" :src="item.image" mode="aspectFill"
							@error="imageError" />
					</swiper-item>
				</swiper>
			</view>
			<!-- 标签 -->
			<view class="h-layout" style="margin: 48rpx 0;">
				<view class="h-layout" style="flex: auto;justify-content: center;align-items: center;">
					<image style="width: 24rpx;height: 24rpx;" :src="'/static/ic_check_black.png'"></image>
					<text style="font-size: 24rpx;font-weight: 400;color: #333333;margin-left: 6rpx;">正品保证</text>
				</view>
				<view class="h-layout" style="flex: auto;justify-content: center;align-items: center;">
					<image style="width: 24rpx;height: 24rpx;" :src="'/static/ic_check_black.png'"></image>
					<text style="font-size: 24rpx;font-weight: 400;color: #333333;margin-left: 6rpx;">7天无理由退换货</text>
				</view>
				<view class="h-layout" style="flex: auto;justify-content: center;align-items: center;">
					<image style="width: 24rpx;height: 24rpx;" :src="'/static/ic_check_black.png'"></image>
					<text style="font-size: 24rpx;font-weight: 400;color: #333333;margin-left: 6rpx;">假一赔十</text>
				</view>
			</view>
			<!-- tab -->
			<view
				style="display: flex;flex-direction: row;background: #FFFFFF;border-radius: 16rpx;padding: 24rpx 0;margin:0 30rpx;">
				<view class="content-layout" @click="toGo(good)" v-for="good,i in goodsTypeList" :key="i">
					<image style="width: 100rpx;height: 100rpx;" :src="good.image"></image>
					<text style="font-size: 24rpx;font-weight:400;color: #333333;margin-top: 4rpx;">{{ good.name }}</text>
				</view>
			</view>
			<!-- 列表 -->
			<view style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin:30rpx">
				<view class="h-layout" style="align-items: center; padding: 32rpx;">
					<image style="width: 32rpx;height: 32rpx;" :src="'/static/ic_shop_fire.png'"></image>
					<text style="font-size: 32rpx;font-weight: 600;color: #333333;margin-left: 16rpx;">精选推荐</text>
				</view>
				<shopListView :list="list" />
			</view>
		</view>
		<!-- 优惠券弹窗 -->
		<uni-popup ref="popup" :mask-click="false">

			<view style="width:544rpx; display: flex;flex-direction: column; position: relative;">
				<image style="width: 100%;margin-left: 10rpx;" :src="'/static/bg_coupon.png'" mode="widthFix" />
				<view
					style="width: 100%;height: 100%; position: absolute; display: flex;flex-direction: column;align-items: center;">
					<text style="font-size: 48rpx;font-weight: 500;color: #F42B00;margin-top: 200rpx;">恭喜你</text>
					<text style="font-size: 28rpx;font-weight: 400;color: #F42B00;">获得{{popupList.length}}张优惠券</text>

					<view v-for="(item,index) in popupList"
						style="width: 100%;display: flex;flex-direction: column;align-items: center;margin-left: 6rpx;">
						<view
							style="width: 426rpx;display: flex;flex-direction: column; position: relative;margin-top: 16rpx;">
							<image style="width: 100%;" :src="'/static/bg_coupon_item.png'" mode="widthFix" />
							<view
								style="width: 100%;height: 100%; position: absolute; display: flex;flex-direction: row;justify-content: center;align-items: center;">
								<view style="margin-left: 20rpx;">
									<text style="font-size: 32rpx;font-weight: bold;color: #F42B00;">¥</text>
									<text
										style="font-size: 72rpx;font-weight: bold;color: #F42B00; ">{{Math.floor(item.coupons_money)}}</text>
								</view>
								<view style="flex: 1; display: flex;flex-direction: column;justify-content: center;margin-left: 30rpx;">
									<text style="font-size: 28rpx;font-weight: 500;color: #8E480D;">无门槛优惠券</text>
									<text style="font-size: 24rpx;font-weight: 400;color: #8E480D;">有效期至 {{item.end_time}}</text>
									<text :class="{isGet: item.isGet == 1}" style="width: 150rpx; font-size: 12rpx;font-weight: 400;color: #FFFFFF;text-align: center;background-color: #FC001A; border-radius: 26rpx;padding: 6rpx 0;margin-top: 10rpx;" @click="claimCoupons(item)">{{ item.isGet == '1'? '已领取' : '立即领取'}}</text>
								</view>
							</view>
						</view>
					</view>

				</view>

			</view>

			<!-- 关闭按钮 -->
			<view style="width: 100%; height: 80rpx;padding: 30rpx;display: flex;justify-content: center;"
				@click="closePopup()">
				<image style="width: 50rpx;height: 50rpx;" :src="'/static/ic_close.png'" />
			</view>

		</uni-popup>
		<tabbar  :initCurrIndex="user.group_id == 2? '2' : '0'" />
	</view>
	</scroll-view>
</template>

<script>
	import tabbar from '../../components/tabbar/tabbar.vue'
	export default {
		components: {
			tabbar
		},
		onLoad() {
			uni.hideTabBar();
			this.getBannerList()
			this.getGoodsTypeList()
			this.loadMoreData()
			this.getProposeList()
		},
		onReady() {
			// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			

		},
		
		data() {
			return {
				keyword: '',
				bannerList: [], // banner
				goodsTypeList: [], // 商品列表
				list: [],
				//是否展示优惠券弹窗
				isShowPopup: false,
				popupList: [{
						money: 10,
						time: "2023-07-08"
					},
					{
						money: 10,
						time: "2023-07-08"
					}
				],
				user: uni.getStorageSync('userinfo'),
				triggered: false, //设置当前下拉刷新的状态
				_freshing: false,
				page: 1,
				hasMore: true, // 用于判断是否还有更多数据

			}
		},
		onReachBottom(){
			this.loadMoreData();
		},
		methods: {
			refresh(){
				if (this._freshing) return;
				this._freshing = true;
				console.log('下拉刷新');
				
				// 设置触发刷新状态
				this.triggered = true;
				this.page = 1
				this.hasMore = true
				this.loadMoreData(1);
			},
			//获取商城推荐优惠券
			async getProposeList(){
				let _this = this
				const res = await this.$myRequest({
					url: 'api/Coupon/getProposeList',
				    method: "POST"
				});
				console.log('推荐优惠券',res)
				if (res.code == 1) {
					if(res.data.length>0){
						this.isShowPopup = true
					}
					if (this.isShowPopup) {
						this.$refs.popup.open('center')
						this.isShowPopup = false
					}
					this.popupList = res.data
				}
			},
			//获取精选推荐数据
			async loadMoreData(isRefresh){
				let _this = this
				if (!this.hasMore) return;
				      const res = await this.$myRequest({
				        url: 'api/Goods/featuredList',
				        method: "POST",
				        data: {
				          page: this.page,
						  key: ''
				        }
				      });
				
				      if (res.code == 1) {
				        if (res.data.list.length<=0) {
				          // 没有更多数据
				          this.hasMore = false;
				        }
				        if(this.page>1){
							this.list = this.list.concat(res.data.list);
						}else{
							this.list = res.data.list;
						}
				        this.page++;
				      } else {
				        this.hasMore = false;
				      }
					  if(isRefresh){
						  // 异步操作完成后，设置触发刷新状态为false
						  this._freshing = false;
						  this.triggered = false;
					  }
			},
			//获取首页总览数据
			async getBannerList(){
				const res = await this.$myRequest({
					url: 'api/banner/bannerList',
					method: "POST",
					data: {
						banner_type: "mall"
					}
				})
				if(res.code == 1){
					this.bannerList = res.data
				}
			},
			// 获取商品分类
			async getGoodsTypeList(callBack) {
				let _this = this
				const res = await this.$myRequest({
					url: 'api/Goods/goodsTypeList',
					method: "POST"
				})
				if(res.code == 1){
					_this.goodsTypeList = res.data
				}
			},
			toGo(good) {
				let url = good.name == '领优惠券'? '/pages/couponList/couponList' : `/pages/goodsList/goodsList?title=${good.name}&id=${good.id}`
				// this.$refs.popup.open('center')
				uni.navigateTo({
					url
				})
			},
			search: function(event) {
				console.log("点击搜索", event.detail.value);
				this.toGo('/pages/goodsList/goodsList?title=搜索商品&keyword=' + event.detail.value)
			},
			closePopup() {
				this.$refs.popup.close()
			},
			//领取优惠券
			async claimCoupons(item){
				let _this = this
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
				// uni.navigateTo({
				// 	url: '/pages/couponList/couponList'
				// })
			}
		}
	}
</script>

<style>
	/* 沉浸式适配 */
	.isGet{filter: grayscale(1);}
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

	.h-layout {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.content-layout {
		flex: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>