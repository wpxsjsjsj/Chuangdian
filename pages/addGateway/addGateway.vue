<template>
	<view class="bg">
		<view class="imgBox" @click="addImg">
			<image style="width: 375rpx;height: 375rpx;margin: auto;margin-bottom: 40rpx;" v-if="image" :src="image" mode=""></image>
			<view class="imgBox_text"  v-else>
				<image style="width: 44rpx;height: 44rpx;padding-left: 8rpx;padding-right: 8rpx;"
					:src="'/static/ic_add_blue.png'"></image>
				<text class="">请上传图片</text>
			</view>
			 
		</view>
		<view style="flex: 1; overflow: auto;display: flex;flex-direction: column;">
			<view style="display: flex;flex-direction: column;background: #FFFFFF;border-radius: 16rpx;
				margin: 0 32rpx 20rpx 32rpx;">
				<view class="h-layout">
					<text style="font-size: 28rpx;font-weight: 400;color: #666666;width: 180rpx;">网关ID：</text>
					<input style="font-size: 28rpx;font-weight: 400;color: #333333;" type="text" v-model="id"
						:disabled="false" trim="all" :inputBorder="false" placeholder="请输入网关ID" />
				</view>
				<view class="line" />
				<!-- 手机号： -->
				<view class="h-layout">
					<text style="font-size: 28rpx;font-weight: 400;color: #666666;width: 180rpx;">网关名称：</text>
					<input style="font-size: 28rpx;font-weight: 400;color: #333333;" type="text" v-model="name"
						:disabled="false" trim="all"  :inputBorder="false" placeholder="请输入网关名称" />
				</view>
				<view class="line" />
				<!-- 省市区： -->
				<view class="h-layout">
					<text style="font-size: 28rpx;font-weight: 400;color: #666666;width: 180rpx;">安装地址：</text>
					<!-- <text style="font-size: 28rpx;font-weight: 400;color: #666666;width: 180rpx;">省市区：</text> -->
					<!-- <input style="font-size: 28rpx;font-weight: 400;color: #333333;" type="text" v-model="region" -->
						<!-- :disabled="false" trim="all" :inputBorder="true" placeholder="请选择省市区" /> -->
					<myPicker type="3" @chooseAddress="chooseAddress" :isEdit="isEdit" :region="region" />
				</view>
				
				<view class="line" />
				<!-- 详细地址： -->
				<view class="h-layout">
					<!-- <text style="font-size: 28rpx;font-weight: 400;color: #666666;width: 180rpx;">详细地址：</text> -->
					<textarea style="font-size: 28rpx;font-weight: 400;color: #333333;height: 120rpx;border: 1px solid #ccc;border-radius: 12rpx;width: 100%;padding: 20rpx;" type="text" v-model="detail"
						:disabled="false" trim="all" :inputBorder="false" placeholder="请输入详细地址" />
				</view>
				<view class="line" />
			</view>
			<button class="btn" @click="save()">添加设备</button>
		
		</view>
		
	</view>
</template>

<script>
	import myPicker from '../../components/picker/picker.vue'
	export default {
		data() {
			return {
			  id:"",
			  name: "",
			  region: '', // 省市区
			  detail: '', // 详细地址
			  isEdit: '0',
			  sn: "",
			  image:""
			}
		},
		components: {
			myPicker
		},
		onLoad(options) {
			if(options.sn){
				
			}
		},
		methods: {
			chooseAddress(data){
				// 更新地址数据
				this.region = data
			},
			save() {
			    // 非空判断
				if (!this.image.trim()) {
				  uni.showToast({
				    title: '请上传图片',
				    icon: 'none'
				  });
				  return;
				}
			    if (!this.name.trim()) {
			      uni.showToast({
			        title: '请输入网关名称',
			        icon: 'none'
			      });
			      return;
			    }
			    if (!this.id.trim()) {
			      uni.showToast({
			        title: '请输入网关ID',
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
			
				this.submitFeedback()
			},
			async submitFeedback(){
			   const data = {
				  image: this.image,
				  number: this.id,
				  name: this.name,
				  locality: this.region,
				  address: this.detail,
				  internet: this.sn
			   }
			   const res = await this.$myRequest({
			   	url: 'api/Gateway/addGateway',
			   	method: "POST",
			   	data
			   })
			   if(res.code === 1){
				   uni.showToast({
				   	title:"添加成功",
				   })
				   uni.navigateTo({
				   	url:"/pages/gateway/gateway"
				   })
			   }
			},
			async addImg(){
				uni.chooseImage({
				        count: 1,  // 图片数量，这里设置为6
				        sizeType: ['original', 'compressed'], // 指定选择的图片类型，可以选择原图和压缩图，这里设置为二者都有
				        sourceType: ['album', 'camera'], // 指定选择图片的来源，这里设置为相册和相机
				        success: (res) => {
				          console.log(res)
						  this.unloadImg(res.tempFilePaths[0])
				        },
				        fail: (err) => {
				          console.log('选择图片失败', err);
				        }
				      });
				
			},
			async unloadImg(file){
				const url = "http://cdcs.qifudaren.net/api/Common/upload";
				let self = this;
				uni.uploadFile({
					url,
					filePath: file,
					name:"file",
					header:{
						token: uni.getStorageSync("token")
					},
					success(res){
					  console.log(res.data);
					  if(res.statusCode == 200){
						  const data = JSON.parse(res.data);
						  console.log(data)
						  self.image = data.data.fullurl
					  }
					},
					fail: (err) => {
					 reject('err')
					}
				})
				// const res = await this.$myRequest({
				// 	url: 'api/Common/upload',
				// 	method: "POST",
				// 	data: {
				// 		file
				// 	}
				// })
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
	.imgBox{
	position: relative;
	    width: 187px;
	    height: 187px;
	    margin: auto auto 20px;
	}
	.imgBox_text{
	position: absolute;
	    left: 50%;
	    top: 50%;
	    transform: translate(-50%, -50%);
	    /* color: #38CBD5; */
	    font-weight: 700;
	    display: flex;
	    width: 100%;
	    justify-content: center;
	    height: 100%;
	    align-items: center;
	    border: 1px dotted #aaa3a3;
	    margin-top: 10px;
	}
</style>
