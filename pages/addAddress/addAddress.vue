<template>
	<view class="bg">
		<view style="flex: 1; overflow: auto;display: flex;flex-direction: column;">
			<view style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;
				margin: 0 32rpx 20rpx 32rpx;">
				<!-- 收货人： -->
				<view class="h-layout">
					<text style="font-size: 28rpx;font-weight: 400;color: #666666;width: 180rpx;">收货人：</text>
					<input style="font-size: 28rpx;font-weight: 400;color: #333333;" type="text" v-model="name"
						:disabled="false" trim="all" :inputBorder="false" placeholder="请输入收货人" />
				</view>
				<view class="line" />
				<!-- 手机号： -->
				<view class="h-layout">
					<text style="font-size: 28rpx;font-weight: 400;color: #666666;width: 180rpx;">手机号：</text>
					<input style="font-size: 28rpx;font-weight: 400;color: #333333;" type="number" v-model="phone"
						:disabled="false" trim="all" maxlength="11" :inputBorder="false" placeholder="请输入手机号" />
				</view>
				<view class="line" />
				<!-- 省市区： -->
				<view class="h-layout">
					<!-- <text style="font-size: 28rpx;font-weight: 400;color: #666666;width: 180rpx;">省市区：</text> -->
					<!-- <input style="font-size: 28rpx;font-weight: 400;color: #333333;" type="text" v-model="region" -->
						<!-- :disabled="false" trim="all" :inputBorder="true" placeholder="请选择省市区" /> -->
					<myPicker type="2" @chooseAddress="chooseAddress" :isEdit="isEdit" :region="region" />
				</view>
				
				<view class="line" />
				<!-- 详细地址： -->
				<view class="h-layout">
					<text style="font-size: 28rpx;font-weight: 400;color: #666666;width: 180rpx;">详细地址：</text>
					<input style="font-size: 28rpx;font-weight: 400;color: #333333;" type="text" v-model="detail"
						:disabled="false" trim="all" :inputBorder="false" placeholder="请输入详细地址" />
				</view>
				<view class="line" />
			</view>
			<view style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;
				margin: 0 32rpx 20rpx 32rpx;">
				<!-- <view class="h-layout">
					<text style="flex: 1; font-size: 28rpx;font-weight: 400;color: #666666;">设置默认地址</text>
					
				</view> -->
				<view class="h-layout">
				  <text style="flex: 1; font-size: 28rpx;font-weight: 400;color: #666666;">设置默认地址</text>
				  <!-- <label class="checkbox-label">
				    <input type="checkbox" class="checkbox-input" :checked="isDefault === '1'" @change="toggleDefault"/>
				  </label> -->
				 <image class="checkbox-image" @click="toggleDefault" :src="isDefault == '1' ? '/static/ic_circle_check.png' : '/static/ic_check_black.png'"></image>
				</view>
			</view>

		</view>
		<!-- 按钮 -->
		<button class="btn" @click="save()">保存</button>
	</view>
</template>

<script>
	import myPicker from '../../components/picker/picker.vue'
	export default {
		data() {
			return {
				name: '', // 收货人姓名
				phone: '', // 手机号
				region: '', // 省市区
				detail: '', // 详细地址
				isDefault: '0', // 是否设为默认地址
				isEdit: '0',
				selectAddress: null,
				address_id: '0' // 地址id，编辑时使用
			}
		},
		onLoad(options) {
			console.log(options, this.isEdit)
			if(options.isEdit == '1'){
				console.log('此处是编辑')
				uni.setNavigationBarTitle({
					title: '编辑地址'
				})
				this.isEdit = options.isEdit
				this.address_id = options.address_id
				this.name = decodeURIComponent(options.name)
				this.phone = options.phone
				this.isDefault = options.isdefault
				console.log('isDefault',this.isDefault, options.isdefault)
				this.region = options.region
				this.detail = decodeURIComponent(options.detail)
				
				console.log(decodeURIComponent(this.region ))
			}
			if(options.selectAddress){
				console.log('从商品确认页进入了筛选地址页面', options);
				this.selectAddress = options.selectAddress
			}
		},
		components: {
			myPicker
		},
		created() {
		},
		methods: {
			
			chooseAddress(data){
				// 更新地址数据
				this.region = data
			},
			toggleDefault() {
				this.isDefault = !this.isDefault;
				console.log(this.isDefault)
			},
			save() {
			    // 非空判断
			    if (!this.name.trim()) {
			      uni.showToast({
			        title: '请输入收货人姓名',
			        icon: 'none'
			      });
			      return;
			    }
			    if (!this.phone.trim()) {
			      uni.showToast({
			        title: '请输入手机号码',
			        icon: 'none'
			      });
			      return;
			    }
			    if (!this.region.trim()) {
			      uni.showToast({
			        title: '请选择省市区',
			        icon: 'none'
			      });
			      return;
			    }
			    if (!this.detail.trim()) {
			      uni.showToast({
			        title: '请输入详细地址',
			        icon: 'none'
			      });
			      return;
			    }
			
			    // 手机号格式判断
			    const phonePattern = /^1[3-9]\d{9}$/;
			    if (!phonePattern.test(this.phone)) {
			      uni.showToast({
			        title: '手机号码格式不正确',
			        icon: 'none'
			      });
			      return;
			    }
				this.submitFeedback()
			},
			async submitFeedback(){
				let _this = this
				let data = {
					name: this.name,
					phone: this.phone,
					region: this.region,
					detail: this.detail,
					isdefault: this.isDefault ? '1' : '0'
				}
				if(this.isEdit == '1'){
					data.address_id = this.address_id
				}
				const res = await this.$myRequest({
					url: this.isEdit == '1'? 'api/address/edit'  :'api/address/add',
					method: "POST",
					data
				})
				if(res.code == 1){
					uni.showToast({
						title: this.isEdit == 1? '编辑成功' : '保存成功'
					})
					setTimeout(()=>{
						uni.navigateBack({
						  delta: 1, // 返回的页面数，如果是1就表示返回上一级页面
						  success: function() {
							let data = {
								needRefresh: true
							}
							if(_this.selectAddress){
								data.selectAddress = _this.selectAddress
							}
						    // 通过事件通知前一个页面进行更新
						    uni.$emit('refreshPage', data);
						  }
						});
					}, 1500)
				}else{
					ni.showToast({
						title: res.msg
					})
				}
				console.log('反馈',res)
			}
		}
	}
</script>

<style>
	.picker {
	  padding: 15px;
	  background-color: #FFF;
	  border-bottom: 1px solid #ddd;
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
		padding: 32rpx;
		position: relative;
	}

	.line {
		background: #979797;
		opacity: 0.1;
		height: 2rpx;
		margin-left: 32rpx;
		margin-right: 32rpx;
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
	.checkbox-label {
	  position: relative;
	  display: block;
	  width: 32rpx; /* 复选框大小 */
	  height: 32rpx; /* 复选框大小 */
	}
	
	.checkbox-input {
	  opacity: 1; /* 隐藏原生复选框 */
	  position: absolute;
	  cursor: pointer;
	  left: 50px;
	  z-index: 1;
	  width: 32rpx; /* 图标大小 */
	  height: 32rpx;
	}
	
	.checkbox-image {
	  position: absolute;
	  top: 50%;
	  transform: translateY(-50%);
	  right: 24rpx;
	  width: 32rpx; /* 图标大小 */
	  height: 32rpx; /* 图标大小 */
	}
</style>