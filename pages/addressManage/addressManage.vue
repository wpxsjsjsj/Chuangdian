<template>
	<view class="bg">
		<view style="flex: 1; overflow: auto;">
			<addressListView v-if="list&&list.length>0" :selectAddress="selectAddress" :list="list" @delAddress="delAddress" />
			<view v-else class="empty-data"><text class="empty-text">暂无收货地址</text></view>
		</view>
		<!-- 按钮 -->
		<button class="btn" @click="addAddress()">新增收货地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				currentPage: 1,
				pageSize: 10,
				hasMore: true,
				selectAddress: null
			}
		},
		onLoad(options) {
			if(options.selectAddress){
				console.log('从商品确认页进入了筛选地址页面', options);
				this.selectAddress = options.selectAddress
			}
			// 初始化时加载数据
			this.loadMoreData();
		},
		onUnload() {
		    // 页面卸载时移除监听
		    uni.$off('refreshPage');
		    uni.$off('chooseAddress');
		  },
		onHide(){
			// 页面卸载时移除监听
			uni.$off('refreshPage');
			uni.$off('chooseAddress');
		},
		onShow() {
			let _this = this
			// 监听自定义的事件
			    uni.$on('refreshPage', (data) => {
					console.log('监听自定义的事件',data)
			      if (data.needRefresh) {
			        this.loadMoreData();
			      }
				  if(data.selectAddress){
					  _this.selectAddress = data.selectAddress
				  }
			    });
				uni.$on('chooseAddress', (data) => {
					console.log('选择了地址',data)
					if(_this.selectAddress){
						uni.navigateBack({
						  delta: 1, // 返回的页面数，如果是1就表示返回上一级页面
						  success: function() {
						    // 通过事件通知前一个页面进行更新
						    uni.$emit('updateAddress', data);
						  }
						});
					}
				});
		},
		methods: {
			delAddress(){
				this.loadMoreData()
			},
			async loadMoreData() {
				console.log('触发了加载')
			    if (!this.hasMore) return;
			    const res = await this.$myRequest({
			        url: 'api/address/lists',
			        method: 'POST'
			    });
			
			    if (res.code == 1 && res.data.length) {
			        this.list = res.data
			        // this.currentPage++;
			    } else {
			        // 如果没有更多数据了，则设置hasMore为false
			        this.hasMore = false;
			    }
			
			    // if (!res.data.length || res.data.length < this.pageSize) {
			    //     this.hasMore = false;
			    // }
			},
			addAddress() {
				let url = "/pages/addAddress/addAddress"
				if(this.selectAddress){
					url = "/pages/addAddress/addAddress?selectAddress="+this.selectAddress
				}
				uni.navigateTo({
					url
				})
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
	.empty-data {
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
	    padding: 50px 0;
	  }
	  .empty-text {
	      color: #888;
	      margin-top: 20px;
	    }
</style>