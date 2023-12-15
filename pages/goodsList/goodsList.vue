<template>
	<view class="bg">
		<scroll-view class="coupon-scroll-view" scroll-y="true" @scrolltolower="onReachBottom">
		<view
			style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin:0 32rpx 28rpx 32rpx;">
			<!-- 横向tab -->
			  <view class="horizonal-tab" style="position: sticky; top: 0; margin-bottom: 20rpx;">
			    <scroll-view scroll-x="true" scroll-with-animation class="scroll-tab">
			      <block v-for="(item, index) in tabBars" :key="index">
			        <view class="scroll-tab-item" :class="{'active': tabIndex === index}" @tap="toggleTab(item, index)">
			          <view style="display: flex;align-items: center;">
						  {{item.name}}
						  <view style="display: flex;flex-flow: column;">
						  		<text v-if="(item.id === 'tuijian' || item.id === 'redian')" @tap.stop="toggleSortOrder(item.id, index)" :class="['arrow-icon', {asc: itemSortOrder[item.id] == 10}]">▲</text>
						  		<text v-if="(item.id === 'tuijian' || item.id === 'redian')" @tap.stop="toggleSortOrder(item.id, index)" :class="['arrow-icon', {desc: itemSortOrder[item.id] == 20}]">▼</text>
						  </view>
					  </view>
			          <view
			            style="display: flex; justify-content: center; margin-top: 4rpx; background-color: #38CBD5; border-radius: 4rpx;">
			            <view class="scroll-tab-line"></view>
			          </view>
			        </view>
			      </block>
			    </scroll-view>
			  </view>

		</view>

		<!-- grid -->
		<view v-if="list&&list.length>0" style="flex: 1; overflow: auto;">
			<view style="display: flex;align-items: center;justify-content: center;margin: 0 16rpx;">
				<uni-grid :column="2" :showBorder="false" :square="false" @change="change">
					<uni-grid-item v-for="(item,index) in list" :index="index" :key="index">
						<view
							style="position: relative;display: flex;flex-direction: column; align-items: center;justify-content: center;background: #FFFFFF;border-radius: 16rpx;margin: 16rpx;"
							@click="toDetail(item.id)">
							<div class="new" v-if="item.new_status==1" style="position: absolute;left: 10px;top: 10px;width: 34px;height: 20px;background: url(/static/newGoods.png) center / 100% no-repeat;z-index: 1;"></div>
							<image :src="item.image" style="width: 328rpx;height: 328rpx;border-radius: 16rpx;" />
							<text
								style="font-size: 28rpx;font-weight: 500;color: #333333;padding: 20rpx;">{{item.goods_name}}</text>
							<view style="width: 100%;">
								<view class="h-layout" style="margin: 0 20rpx 20rpx 20rpx;">
									<text style="flex: 1; font-size: 32rpx;font-weight: 500;color: #FF5500;">
										<font style="font-size: 24rpx;">¥</font>{{item.goods_price}}
									</text>
									<text style="font-size: 24rpx;font-weight: 500;color: #FF5500;">
										<font style="color: #666666;">已售 </font>{{ item.sales_actual }}<font style="color: #666666;"> 件
										</font>
									</text>
								</view>
							</view>

						</view>
					</uni-grid-item>
				</uni-grid>

			</view>
			<!-- 筛选下拉框 -->
			    <view v-show="showFilterDropdown" class="filter-dropdown">
			      <!-- 这里放置你的筛选选项和输入元素 -->
			      <view class="filter-options">
			        <!-- ... 筛选选项 ... -->
					1111
			      </view>
			      <view class="filter-actions">
			        <button @click="applyFilters">应用</button>
			        <button @click="closeFilterDropdown">关闭</button>
			      </view>
			    </view>
		</view>
		<view v-else style="text-align: center;">暂无商品</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			// console.log(options.title);
			// this.getDetail(options.id)
			this.id = options.id
			if (options.title) {
				uni.setNavigationBarTitle({
					title: options.title
				})
			}
			// if(options.keyword){
				// this.keyword = options.keyword
				this.getList()
			// }

		},
		data() {
			return {
				itemSortOrder: {
				    tuijian: 10, // 10 表示默认升序，20 表示降序
				    redian: 10, // 10 表示默认升序，20 表示降序
				},
				// 选中标签栏的序列,默认显示第一个
				tabIndex: 0,
				new_product: 0, // 新品
				synthesize: 1, // 综合
				tabBars: [{
						name: '综合',
						id: 'zonghe'
					},
					{
						name: '销量',
						id: 'tuijian'
					},
					{
						name: '价格',
						id: 'redian'
					},
					{
						name: '新品',
						id: 'xinpin'
					},
					{
						name: '筛选',
						id: 'shaixuan'
					}
				],
				list: [],
				showFilterDropdown: false,
				page: 1,
				count: 10,
				isOver: false,
				isEmpty: false,
			}
		},
		methods: {
			toggleSortOrder(id, index) {
			        // 当点击“销量”或“价格”标签时切换排序顺序
			        if (id === 'tuijian' || id === 'redian') {
			          const sortOrder = this.itemSortOrder[id];
			          // 使用10和20分别代表升序和降序
			          this.$set(this.itemSortOrder, id, sortOrder === 10 ? 20 : 10);
			          this.tabIndex = index;
					  this.page = 1
			          // 在这里添加逻辑来处理基于排序顺序（10/20）的排序
			          // 你可能需要更新你的getList方法以考虑排序顺序
			          this.getList();
			        }
			      },
			onReachBottom(){ 
				console.log('商品列表滑到底部')
				this.page += 1
				this.getList()
			},
			//获取列表数据
			async getList(callBack) {
				let data = {
						page: this.page,
						category_id: this.id,
						synthesize: this.synthesize,
						sales_volume: this.itemSortOrder['tuijian'],
						price: this.itemSortOrder['redian'],
						new_product: this.new_product,
						screen: ''
				}
				// return
				const res = await this.$myRequest({
					url: 'api/Goods/goodsList',
					method: "POST",
					data
				})
				
				console.log('商品列表', res)
				if (this.page == 1) {
					uni.stopPullDownRefresh()
					//刷新
					this.list = res.data.list
				} else {
					this.list = [...this.list, ...res.data.list]
				}
				// console.log(this.list.list[0].s_name)
			
				callBack && callBack()
			
				if (this.list.length == 0) {
					this.isEmpty = true
				} else this.isEmpty = false
			
				if (res.data.total == this.list.length) {
					this.isOver = true
				} else this.isOver = false
				
			},
			applyFilters() {
				// 在应用完筛选条件后，关闭下拉框
				this.showFilterDropdown = false;
			},
			closeFilterDropdown() {
				// 关闭筛选下拉框
				this.showFilterDropdown = false;
			},
			//切换选项卡
			toggleTab(item, index) {
				if(item.id=='shaixuan'){
					console.log('点击了筛选按钮');
					this.showFilterDropdown = !this.showFilterDropdown;
					return
				}
				if(this.tabIndex == index) return
				if(item.id == 'xinpin'){
					this.new_product = 1
					this.synthesize = 0
				}else if(item.id == 'zonghe'){
					this.new_product = 0
					this.synthesize = 1
				}else{
					this.new_product = 0
					this.synthesize = 0
				}
				this.page = 1
				this.tabIndex = index; 
				this.getList()
			},
			//滑动切换swiper
			tabChange(e) {
				console.log(e);
				this.tabIndex = e.detail.current;
			},

			toDetail(id) {
				uni.navigateTo({
					url: "/pages/goodsDetail/goodsDetail?id=" + id
				})
			}
		}
	}
</script>

<style scoped>
	.filter-dropdown {
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100vw;
	    height: 100vh;
	    background-color: rgba(0, 0, 0, 0.5);
	    z-index: 999;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	  }
	
	  .filter-options {
	    /* 样式化你的筛选选项容器 */
	  }
	
	  .filter-actions {
	    /* 样式化你的筛选操作容器 */
	  }
	.arrow-icon {
	    font-size: 18rpx;
		margin-left: 4rpx;
		margin-bottom: -4rpx;
	    color: #666666; /* 默认颜色是灰色 */
	  }
	
	  .arrow-icon.asc {
	    color: #38cbd5; /* 升序时的颜色是#38cbd5 */
	  }
	
	  .arrow-icon.desc {
	    color: #38cbd5; /* 降序时的颜色是#38cbd5 */
	  }
	.coupon-scroll-view {
			height: 100vh; /* 设置高度，可根据需要调整 */
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

	/* 横向Tab */
	.horizonal-tab {position: sticky;top: 0;}

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