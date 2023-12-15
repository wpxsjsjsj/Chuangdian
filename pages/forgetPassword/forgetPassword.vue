<template>
	<view class="login_bg">
		<!-- 顶部图片和文字 -->
		<view style="flex: auto;" />
		<image class="logo" src="/static/ic_logo.png"></image>

		<view style="flex: auto;" />

		<!-- 获取验证码布局 -->


		<view v-if="type == 1" style="width: 100%;">
			<!-- 输入手机号 -->
			<view class="input-bg" style="margin-top: 48rpx;">
				<image style="width: 32rpx;height: 34rpx;margin-left: 32rpx;" src="/static/ic_login_account.png">
				</image>
				<input
					style="flex: 1; height: 100%;font-size: 28rpx;color: #333333;margin-left: 26rpx;margin-right: 32rpx;"
					placeholder-style="color:#999999" v-model="phone" type="number" placeholder="请输入手机号" />
				<view style="font-size: 28rpx;font-weight: 400;color: #38CBD5;margin-right: 30rpx; " @click="getCode()">
					获取验证码</view>
			</view>
			<!-- 输入验证码 -->
			<view class="input-bg" style="margin-top: 34rpx;">
				<image style="width: 42rpx;height: 42rpx;margin-left: 32rpx;" src="/static/ic_login_code.png">
				</image>
				<input
					style="flex: auto; height: 100%;font-size: 28rpx;color: #333333;margin-left: 20rpx;margin-right: 32rpx;"
					placeholder-style="color:#999999" v-model="code" text-content-type="oneTimeCode" type="number"
					placeholder="请输入验证码" />
			</view>
		</view>

		<!-- 输入密码布局 -->
		<view v-if="type == 2" style="width: 100%;">
			<!-- 输入密码 -->
			<view class="input-bg" style="margin-top: 48rpx;">
				<image style="width: 32rpx;height: 20rpx;margin-left: 32rpx;" src="/static/ic_login_password.png">
				</image>
				<input
					style="flex: auto; height: 100%;font-size: 28rpx;color: #333333;margin-left: 26rpx;margin-right: 42rpx;"
					password placeholder-style="color:#999999" v-model="password" placeholder="请输入密码" />

			</view>
			<!-- 再次输入密码 -->
			<view class="input-bg" style="margin-top: 48rpx;">
				<image style="width: 32rpx;height: 20rpx;margin-left: 32rpx;" src="/static/ic_login_password.png">
				</image>
				<input
					style="flex: auto; height: 100%;font-size: 28rpx;color: #333333;margin-left: 26rpx;margin-right: 42rpx;"
					password placeholder-style="color:#999999" v-model="password2" placeholder="请再次输入密码" />

			</view>

		</view>
		<!-- 确定按钮 -->
		<button class="btn" style="margin-top: 64rpx;" @click="confirm()">确定</button>


		<view style="flex: auto;" />
		<view style="flex: auto;" />
		<!-- 用户协议、隐私协议 -->
		<view
			style="width: 100%;display: flex;flex-direction: row; justify-content: center;align-items: center;margin-bottom: 80rpx;">
			<image style="width: 24rpx;height: 24rpx;padding: 12rpx;margin-top: 3rpx;"
				:src="isReadAgreement?'/static/ic_circle_check.png':'/static/ic_circle_uncheck.png'"
				@click="readAgreement()" />
			<text style="font-size: 24rpx;color: #666666;">阅读并同意</text>
			<text style="font-size: 24rpx;color: #38CBD5;">《用户协议》</text>
			<text style="font-size: 24rpx;color: #666666;">和</text>
			<text style="font-size: 24rpx;color: #38CBD5;">《隐私政策》</text>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				//1、获取验证码 2、输入密码
				type: 1,

				//密码
				password: "",
				password2: "",

				//手机号
				phone: "",
				//验证码
				code: "",
				//公司名称
				company: "",

				//是否同意协议
				isReadAgreement: false,
				//输入框样式
				styles: {
					//输入文字颜色
					color: '#333333',
					//边框颜色
					borderColor: '#E0EEFF'
				}
			}
		},
		onLoad() {

		},
		methods: {
			//获取验证码
			async getCode() {
				const res = await this.$myRequest({
					url: 'api/user/login',
					method: "POST",
					data: {
						account: this.account,
						password: this.password
						// password: md5.hex_md5(this.login.password)
					}
				})
			},
			//确定
			async confirm() {
				if (this.type == 1) {
					if (this.phone.length <= 0) {
						uni.showToast({
							title: "请输入手机号",
							icon: 'error'
						});
						return
					}
					if (this.code.length <= 0) {
						uni.showToast({
							title: "请输入验证码",
							icon: 'error'
						});
						return
					}

					this.type = 2
					return
				}

				if (this.type == 2) {
					uni.navigateBack()
				}


				/* if (!this.isReadAgreement) {
					uni.showToast({
						title: "请仔细阅读并同意协议",
						icon: 'none'
					});
					return
				} */




			},

			//阅读协议
			readAgreement() {
				this.isReadAgreement = !this.isReadAgreement
			},

		}
	}
</script>

<style>
	.login_bg {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 84rpx;
		background: linear-gradient(to bottom, #E4EFFF, #FFFFFF);
	}

	.logo {
		width: 468rpx;
		height: 66rpx;
	}

	.text-black {
		font-size: 48rpx;
		font-weight: 500;
		color: #333333;
	}

	.text-gray {
		font-size: 32rpx;
		font-weight: 500;
		color: #999999;
	}

	.input-bg {
		width: 100%;
		height: 104rpx;
		background: #FFFFFF;
		border-radius: 54rpx;
		border: 2rpx solid rgba(60, 148, 255, 0.16);
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.h-layout {
		display: flex;
		align-items: center;
		padding: 26rpx;
	}

	.btn {
		width: 100%;
		height: 104rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #38CBD5;
		border-radius: 54rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
	}

	.phoneLogin-bg {
		width: 100%;
		height: 104rpx;
		background: #FFFFFF;
		border-radius: 54rpx;
		border: 4rpx solid #38CBD5;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>