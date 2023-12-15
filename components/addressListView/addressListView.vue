<template>
	<view
		style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;margin: 0 32rpx 20rpx 32rpx;padding: 32rpx;"
		v-for="(item,index) in list" @click="chooseAddress(item)">
		<view class="h-layout">
			<text style="flex: 1;font-size: 28rpx;font-weight: 500;color: #333333;">收货人：{{item.name}}</text>
			<text style="font-size: 28rpx;font-weight: 500;color: #333333;">{{item.phone}}</text>
		</view>
		<view class="h-layout" style="margin-top: 10rpx;">
			<text style="font-size: 24rpx;font-weight: 400;color: #666666;">{{item.Area.province || ''}} {{item.Area.city || ''}} {{ item.Area.region || '' }} {{item.detail || ''}}</text>
		</view>
		<view style="height: 2rpx;background: #979797;opacity: 0.1;margin: 28rpx 0;" />
		<view class="h-layout">
			<view style="height: 100%" @click.stop="selectAddress(item,index)">
				<image
				        style="width: 26rpx;height: 26rpx;"
				        :src="item.isdefault == '1'? '/static/ic_circle_check.png' : '/static/ic_check_black.png'"
				        >
				      </image>
				<text style="flex: 1;font-size: 28rpx;font-weight: 500;color: #38CBD5;margin-left: 16rpx;">默认地址</text>
			</view>
			
			<view>
				<image style="width: 26rpx;height: 28rpx;" :src="'/static/ic_edit.png'"></image>
				<text style="font-size: 24rpx;font-weight: 500;color: #333333;margin-left: 4rpx;" @click.stop="toDetail(item, 'edit')">编辑</text>
				
				<image style="width: 24rpx;height: 28rpx; margin-left: 54rpx;" :src="'/static/ic_delete.png'"></image>
				<text style="font-size: 24rpx;font-weight: 500;color: #333333;margin-left: 4rpx;" @click.stop="del(item, index)">删除</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "addressListView",
		//接收父控件的值
		props: ['list'],
		data() {
			return {
				selectedIndex: 0
			};
		},
		onReachBottom(){
			console.log('滚动到了底部')
		},
		methods: {
			chooseAddress(item){
				uni.$emit('chooseAddress', item);
			},
		    selectAddress(item, index) {
				console.log(item.isdefault)
				if(item.isdefault == '1') return
				this.setDefault(item, index)
		    },
			// 设置默认地址
			async setDefault(item, index){
				let data = {
					address_id: item.address_id
				}
				const res = await this.$myRequest({
					url: 'api/address/setDefault',
					method: "POST",
					data
				})
				if(res.code == 1){
					// 先将所有地址的isdefault设置为'0'
					this.list.forEach(address => {
					    address.isdefault = '0';
					});
					// 然后将选中的地址的isdefault设置为'1'
					this.list[index].isdefault = '1';
					this.selectedIndex = index;
					// 发射事件到父组件，通知选中了新的默认地址
					this.$emit('update:selected', this.list[index]);
					uni.showToast({
						title: '默认地址设置成功',
						icon: 'none'
					})
				}
				console.log('反馈',res)
			},
			del(item, index) {
				console.log(item)
			    uni.showModal({
			      title: '确认删除',
			      content: '您确定要删除这个地址吗？',
			      success: (res) => {
			        if (res.confirm) {
			          console.log('用户点击确定');
			          // 用户确认删除后的逻辑，比如调用API删除地址
			          this.deleteAddress(item.address_id);
					  this.$emit('delAddress')
			        } else if (res.cancel) {
			          console.log('用户点击取消');
			          // 可以处理取消操作，如果有需要
			        }
			      }
			    });
			  },
			async deleteAddress(address_id) {
			    // 假设您有一个删除地址的API
			    const res = await this.$myRequest({
			      url: 'api/address/del', // API URL 需要根据您的后端来调整
			      method: "POST",
				  data: {address_id}
			      // 如果API需要在body发送数据则添加data属性
			    });
			    if(res.code == 1) {
			      uni.showToast({
			        title: '删除成功'
			      });
			      // 可能需要更新列表来移除删除的项
			      this.list = this.list.filter((item) => item.address_id !== address_id);
			      // 如果需要更新父组件的地址列表，可以这样发射事件
			      this.$emit('delete:address', address_id);
			    } else {
			      // 处理错误情况
			      uni.showToast({
			        title: '删除失败，请重试',
			        icon: 'none'
			      });
			    }
			  },
		    toDetail(item, type = '') {
				// 跳转到地址详情页，可能需要将id传递过去
				// ...跳转逻辑
				console.log(item,type)
				let query = `?name=${encodeURIComponent(item.name)}&phone=${encodeURIComponent(item.phone)}&region=${encodeURIComponent(item.Area.province + ',' + item.Area.city + ',' + item.Area.region)}&detail=${encodeURIComponent(item.detail)}&isdefault=${item.isdefault}&address_id=${item.address_id}`;
				if(type == 'edit'){
					query += '&isEdit=1'
				}
				console.log(query)
				uni.navigateTo({
					url: '/pages/addAddress/addAddress' + query
				});
			}
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.h-layout view{display: flex;align-items: center;}
	.address-item {
	    display: flex;
	    flex-direction: column;
	    background: #FFFFFF;
	    border-radius: 16rpx;
	    margin: 0 32rpx 20rpx 32rpx;
	    padding: 32rpx;
	  }
</style>