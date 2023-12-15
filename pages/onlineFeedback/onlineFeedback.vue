<template>
	<view style="display: flex; flex-direction: column;">
		<text style="font-size: 28rpx;font-weight: 600;color: #333333;padding: 32rpx;">
			<font style="color: #FF3838;">*</font>反馈类型
		</text>
		<!-- grid -->
		<view style="display: flex;align-items: center;justify-content: center;margin: 0 16rpx;">
			<uni-grid :column="3" :showBorder="false" :square="false" @change="change">
				<uni-grid-item v-for="(item,index) in list" :index="index" :key="index">
					<view :class="[item.select == true?'bg-select':'bg-unselect']" @click="toDetail(item.id)">
						<image :src="item.select == true?item.img:item.imgUnSelect"
							style="width: 56rpx;height: 56rpx;margin-top: 18rpx;" />
						<text :class="[item.select == true?'txt-select':'txt-unselect']">{{item.name}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>

		</view>
		<text style="font-size: 28rpx;font-weight: 600;color: #333333;padding: 32rpx;margin-top: 32rpx;">
			<font style="color: #FF3838;">*</font>详细描述
		</text>
		<view style="border-radius: 16rpx; padding: 24rpx;margin:0 32rpx;background-color: #F2F4F6; ">
			<textarea style="width:100%;" v-model="description" placeholder-style="color:#7C8493" placeholder="你想说点什么？" />
		</view>
		<text style="font-size: 28rpx;font-weight: 600;color: #333333;padding: 32rpx;margin-top: 32rpx;">
			<font style="color: #FF3838;">*</font>邮箱
		</text>
		<input
			style="font-size: 28rpx;font-weight: 400;color: #333333;background: #F5F7FB;border-radius: 16rpx;padding: 32rpx;margin: 0 32rpx;"
			type="text" v-model="email" :disabled="false" trim="all" :inputBorder="false" placeholder="请输入邮箱" />
		<text style="font-size: 28rpx;font-weight: 600;color: #333333;padding: 32rpx;margin-top: 32rpx;">
			<font style="color: #FF3838;">*</font>微信/QQ/其他联系方式
		</text>
		<input
			style="font-size: 28rpx;font-weight: 400;color: #333333;background: #F5F7FB;border-radius: 16rpx;padding: 32rpx;margin: 0 32rpx;"
			type="text" v-model="contact" :disabled="false" trim="all" :inputBorder="false" placeholder="请输入联系方式" />

		<!-- 按钮 -->
		<button class="btn" @click="save()">提交</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					img: "/static/ic_feedback1.png",
					imgUnSelect: "/static/ic_feedback1_unselect.png",
					name: "页面闪退",
					select: false
				}, {
					img: "/static/ic_feedback2.png",
					imgUnSelect: "/static/ic_feedback2_unselect.png",
					name: "使用建议",
					select: false
				}, {
					img: "/static/ic_feedback3.png",
					imgUnSelect: "/static/ic_feedback3_unselect.png",
					name: "吐槽",
					select: false
				}, {
					img: "/static/ic_feedback4.png",
					imgUnSelect: "/static/ic_feedback4_unselect.png",
					name: "系统BUG",
					select: false
				}, {
					img: "/static/ic_feedback5.png",
					imgUnSelect: "/static/ic_feedback5_unselect.png",
					name: "功能建议",
					select: false
				}, {
					img: "/static/ic_feedback6.png",
					imgUnSelect: "/static/ic_feedback6_unselect.png",
					name: "不良信息举报",
					select: false
				}],
				typeIndex: 0,
				description: '',
				contact: ''
			}
		},
		methods: {
			change(e) {
			  const selectedIndex = e.detail.index;
			
			  // 首先，将所有项目设置为未选中状态。
			  this.list.forEach((item, index) => {
			    item.select = false;
			  });
			
			  // 然后，将点击的项目设置为选中状态。
			  this.list[selectedIndex].select = true;
			
			  // 如果需要，可以提供用户反馈或记录操作。
			  // uni.showToast({
			  //   title: `选中第${selectedIndex + 1}个宫格`,
			  //   icon: 'none'
			  // });
			
			  console.log(`选中索引: ${selectedIndex}`);
			  this.typeIndex = this.typeIndex
			},
			toDetail(id){
				console.log(id)
			},
			save() {
			    // 检查是否有反馈类型被选择
			    if (this.list.every(item => !item.select)) {
			      uni.showToast({
			        title: '请选择反馈类型',
			        icon: 'none'
			      });
			      return;
			    }
			
			    // 检查详细描述是否填写
			    if (!this.description) {
			      uni.showToast({
			        title: '请填写详细描述',
			        icon: 'none'
			      });
			      return;
			    }
			
			    // 检查邮箱是否填写
			    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			        if (!this.email) {
			          uni.showToast({
			            title: '请填写邮箱',
			            icon: 'none'
			          });
			          return;
			        } else if (!emailPattern.test(this.email)) {
			          uni.showToast({
			            title: '邮箱格式不正确',
			            icon: 'none'
			          });
			          return;
			        }
			
			    // 检查联系方式是否填写
			    if (!this.contact) {
			      uni.showToast({
			        title: '请填写联系方式',
			        icon: 'none'
			      });
			      return;
			    }
			
			    // 所有必填项都已填写，发送数据到反馈接口
			    const feedbackType = this.typeIndex;
			    const postData = {
			      feedback_type: feedbackType,
			      content: this.description,
			      email: this.email,
			      other: this.contact
			    };
			
			    // 调用发送反馈的方法
			    this.submitFeedback(postData);
			  },
			  async submitFeedback(data){
				  console.log(data)
				  const res = await this.$myRequest({
				  	url: 'api/Help/feedback',
				  	method: "POST",
				  	data
				  })
				  if(res.code == 1){
					uni.showToast({
						title: '反馈成功'
					})
					setTimeout(()=>{
						uni.navigateBack()
					}, 1500)
				  }
				  console.log('反馈',res)
			  }
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		padding: 32rpx
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
		margin: 64rpx 32rpx 56rpx 32rpx;
	}

	.bg-select {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #38CBD5;
		border-radius: 16rpx;
		margin: 16rpx;
	}

	.bg-unselect {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #F5F7FB;
		border-radius: 16rpx;
		margin: 16rpx;
	}

	.txt-select {
		font-size: 28rpx;
		color: #FFFFFF;
		padding-top: 4rpx;
		padding-bottom: 22rpx;
	}
	.txt-unselect {
		font-size: 28rpx;
		color: #666666;
		padding-top: 4rpx;
		padding-bottom: 22rpx;
	}
</style>