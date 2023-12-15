<template>
	<view class="login_bg">
		<!-- 顶部图片和文字 -->
		<view style="flex: auto;" />
		<image class="logo" src="/static/ic_logo.png"></image>
		<view style="font-size: 24rpx;color: #666666; margin-top: 20rpx;">智慧卫生间一站式解决方案服务商</view>
		<!-- 登录、注册 -->
		<view style="flex: auto;" />
		<view style="width: 100%; flex-direction: row; display: flex;align-items: center;">
			<view style="flex-direction: column; display: flex;align-items: center;margin-right: 24rpx;"
				@click="selectLogin()">
				<text :class="[type==1?'text-black':'text-gray']">登录</text>
				<view style="width: 52rpx;height: 8rpx;background-color: #333333;margin-top: 12rpx;" v-if="type==1">
				</view>
			</view>
			<view style="flex-direction: column; display: flex;align-items: center;margin-left: 24rpx;"
				@click="selectRegister()">
				<text :class="[type==2?'text-black':'text-gray']">注册</text>
				<view style="width: 52rpx;height: 8rpx;background-color: #333333;margin-top: 12rpx;" v-if="type==2">
				</view>
			</view>
		</view>
		<!-- 登录布局 -->
		<view v-if="type == 1" style="width: 100%;">
			<!-- 输入账号 -->
			<view class="input-bg" style="margin-top: 48rpx;">
				<image style="width: 32rpx;height: 34rpx;margin-left: 32rpx;" src="/static/ic_login_account.png">
				</image>
				<input
					style="flex: auto; height: 100%;font-size: 28rpx;color: #333333;margin-left: 26rpx;margin-right: 32rpx;"
					placeholder-style="color:#999999" v-model="account" placeholder="请输入账号" />
			</view>
			<!-- 输入密码 -->
			<view class="input-bg" style="width: 100%; margin-top: 34rpx;">
				<image @click="isWatchPwd = !isWatchPwd" style="width: 32rpx;height: 20rpx;margin-left: 32rpx;" src="/static/ic_login_password.png">
				</image>
				<input
					style="flex: 1; height: 100%;font-size: 28rpx;color: #333333;margin-left: 26rpx;margin-right: 42rpx;"
					:type="isWatchPwd? 'text':'password'" placeholder-style="color:#999999" v-model="password" placeholder="请输入密码" />
				<view style="font-size: 28rpx;font-weight: 400;color: #666666;margin-right: 10rpx; "
					@click="forgotPassword()">忘记密码？</view>
			</view>
			<!-- 登录按钮 -->
			<button class="btn" style="margin-top: 64rpx;" @click="login()">登录</button>
			<!-- 手机号快捷登录 -->
			<view class="phoneLogin-bg" style="margin-top: 48rpx;" @click="quickLogin()">
				<image style="width: 24rpx;height: 36rpx;margin-left: 32rpx;" src="/static/ic_phone.png">
				</image>
				<text style="font-size: 32rpx;font-weight: 500;color: #333333;margin-left: 18rpx; "
					>手机号快捷登录</text>
			</view>
		</view>

		<!-- 注册布局 -->
		<view v-if="type == 2" style="width: 100%;">
			<!-- 输入手机号 -->
			<view class="input-bg" style="margin-top: 48rpx;">
			  <image style="width: 32rpx;height: 34rpx;margin-left: 32rpx;" src="/static/ic_login_account.png"></image>
			  <input
			    style="flex: 1; height: 100%; font-size: 28rpx; color: #333333; margin-left: 26rpx; margin-right: 10rpx;"
			    placeholder-style="color: #999999" v-model="phone" maxlength="11" type="number" placeholder="请输入手机号" />
			  <view v-if="!isCountingDown" class="get-code-btn" @click="getCode()">
			    获取验证码
			  </view>
			  <view v-else class="countdown-timer">
			    {{ countDownSeconds }}秒后重试
			  </view>
			</view>
			<!-- 输入验证码 -->
			<view class="input-bg" style="margin-top: 34rpx;">
				<image style="width: 42rpx;height: 42rpx;margin-left: 32rpx;" src="/static/ic_login_code.png">
				</image>
				<input
					style="flex: 1; height: 100%;font-size: 28rpx;color: #333333;margin-left: 20rpx;margin-right: 32rpx;"
					placeholder-style="color:#999999" v-model="code" maxlength="4" text-content-type="oneTimeCode" type="number"
					placeholder="请输入验证码" />
			</view>
			<!-- 输入密码 -->
			<view class="input-bg" style="margin-top: 34rpx;">
				<image style="width: 30rpx;height: 28rpx;margin-left: 32rpx;" src="/static/ic_login_company.png">
				</image>
				<input
					style="flex: 1; height: 100%;font-size: 28rpx;color: #333333;margin-left: 26rpx;margin-right: 32rpx;" password
					 placeholder-style="color:#999999" v-model="regPassport" type="text" placeholder="请设置密码" />
			</view>
			<!-- 输入公司名称 -->
			<view class="input-bg" style="margin-top: 34rpx;">
				<image style="width: 30rpx;height: 28rpx;margin-left: 32rpx;" src="/static/ic_login_company.png">
				</image>
				<input
					style="flex: 1; height: 100%;font-size: 28rpx;color: #333333;margin-left: 26rpx;margin-right: 32rpx;"
					placeholder-style="color:#999999" v-model="company" type="text" placeholder="请输入公司名称" />
			</view>
			<!-- 注册按钮 -->
			<button class="btn" style="margin-top: 64rpx;" @click="register()">注册</button>

		</view>

		<view style="flex: auto;" />
		<view style="flex: auto;" />
		<!-- 用户协议、隐私协议 -->
		<view
			style="width: 100%;display: flex;flex-direction: row; justify-content: center;align-items: center;margin-bottom: 80rpx;">
			<image style="width: 24rpx;height: 24rpx;padding: 12rpx;margin-top: 3rpx;"
				:src="isReadAgreement?'/static/ic_circle_check.png':'/static/ic_circle_uncheck.png'"
				@click="readAgreement()" />
			<text style="font-size: 24rpx;color: #666666;">阅读并同意</text>
			<text style="font-size: 24rpx;color: #38CBD5;" @click="goTo('/pages/noticeDetail/noticeDetail?id=1&title=用户协议&noticeType=1')">《用户协议》</text>
			<text style="font-size: 24rpx;color: #666666;">和</text>
			<text style="font-size: 24rpx;color: #38CBD5;" @click="goTo('/pages/noticeDetail/noticeDetail?id=1&title=隐私政策&noticeType=2')">《隐私政策》</text>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				isCountingDown: false,
				countDownSeconds: 60,
				buttonText: '获取验证码',
				// 是否查看密码
				isWatchPwd: false,
				//1、登录 2、注册
				type: 1,
				//账号
				account: "",
				//密码
				password: "",

				//手机号
				phone: "",
				//验证码
				code: "",
				//公司名称
				company: "",
				//密码
				regPassport: "",

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
			//选择登录
			selectLogin() {
				this.type = 1
			},
			//选择注册
			selectRegister() {
				this.type = 2
			},
			//忘记密码
			forgotPassword() {
				uni.navigateTo({
					url: "/pages/forgetPassword/forgetPassword"
				})
			},
			//获取验证码
			async getCode() {
			      // 如果正在倒计时，则直接返回
			      if (this.isCountingDown) {
			        return;
			      }
				  if(!this.phone){
					  uni.showToast({
					  	title: '请填写手机号',
						icon: 'none'
					  })
					  return
				  }
			      // 其他获取验证码的逻辑...
				  const res = await this.$myRequest({
				  	url: 'api/Sms/send',
				  	method: "POST",
				  	data: {
				  		mobile: this.phone
				  	}
				  })
				  if(res.code == 1){
					  uni.showToast({
					  	title: res.msg
					  })
					  // 开始倒计时
					  this.isCountingDown = true;
					  this.buttonText = `${this.countDownSeconds}秒后重试`;
					  			
					  const timer = setInterval(() => {
					    if (this.countDownSeconds > 0) {
					      this.countDownSeconds -= 1;
					      this.buttonText = `${this.countDownSeconds}秒后重试`;
					    } else {
					      clearInterval(timer);
					      this.isCountingDown = false;
					      this.countDownSeconds = 60;
					      this.buttonText = '获取验证码';
					    }
					  }, 1000);
				  }else {
					  uni.showToast({
					  	title: res.msg
					  })
				  }
			
			      // 发送获取验证码的请求...
			},
			//登录
			async login() {
				if (this.account.length <= 0) {
					uni.showToast({
						title: "请输入账号",
						icon: 'error'
					});
					return
				}
				if (this.password.length <= 0) {
					uni.showToast({
						title: "请输入密码",
						icon: 'error'
					});
					return
				}
				if (!this.isReadAgreement) {
					uni.showToast({
						title: "请仔细阅读并同意协议",
						icon: 'none'
					});
					return
				}
				const res = await this.$myRequest({
					url: 'api/user/login',
					method: "POST",
					data: {
						account: this.account,
						password: this.password
						// password: md5.hex_md5(this.login.password)
					}
				})
				console.log('登陆信息',res)
				if(res.code == 1){
					// 证明登录成功
					uni.setStorageSync("userinfo", res.data.userinfo)
					// console.log("token:"+uni.getStorageSync("userinfo").token);
					uni.setStorageSync("token", res.data.userinfo.token)
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					let loginUrl = res.data.userinfo.group_id == 2? '/pages/main/main' : '/pages/shop/shop'
					setTimeout(()=>{
						uni.switchTab({
							url: loginUrl
						})
					}, 1500)
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'error'
					});
				}
				/* 
				 "data": {
				     "userinfo": {
				         "id": 2,
				         "username": "39352831",
				         "nickname": "compan1添加的司机1",
				         "mobile": "",
				         "avatar": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgaGVpZ2h0PSIxMDAiIHdpZHRoPSIxMDAiPjxyZWN0IGZpbGw9InJnYigyMTYsMTYwLDIyOSkiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48L3JlY3Q+PHRleHQgeD0iNTAiIHk9IjUwIiBmb250LXNpemU9IjUwIiB0ZXh0LWNvcHk9ImZhc3QiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHRleHQtcmlnaHRzPSJhZG1pbiIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiPkM8L3RleHQ+PC9zdmc+",
				         "token": "e945d5ad-f3ca-4ab4-b690-ff4fa8976331",
				         "user_id": 2,
				         "createtime": 1685601175,
				         "expiretime": 1688193175,
				         "expires_in": 2592000
				     }
				 }
				 */

				//缓存数据
				uni.setStorageSync("userinfo", res.data.userinfo)
				// console.log("token:"+uni.getStorageSync("userinfo").token);
				uni.setStorageSync("token", res.data.userinfo.token)
				// uni.setStorageSync("name", res.data.nickname)
				// uni.setStorageSync("type", res.data.type)
				if (this.login.isRememberPassword) {
					uni.setStorageSync("email", this.login.email)
					uni.setStorageSync("password", this.login.password)
				} else {
					uni.removeStorageSync("email")
					uni.removeStorageSync("password")
				}


			},
			// 验证手机号
			isValidPhoneNumber(phoneNumber) {
			    const pattern = /^1[3-9]\d{9}$/;
			    return pattern.test(phoneNumber);
			},
			//注册
			async register() {
				if (!this.isValidPhoneNumber(this.phone)) {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: 'error'
					});
					return
				}
				if (this.code.length !== 4 ) {
					uni.showToast({
						title: "请输入正确的验证码",
						icon: 'error'
					});
					return
				}
				if (this.regPassport.length <= 0 ) {
					uni.showToast({
						title: "请输入密码",
						icon: 'error'
					});
					return
				}
				if (!this.company) {
					uni.showToast({
						title: "请输入公司名称",
						icon: 'error'
					});
					return
				}
				if (!this.isReadAgreement) {
					uni.showToast({
						title: "请仔细阅读并同意协议",
						icon: 'none'
					});
					return
				}
				const res = await this.$myRequest({
					url: 'api/user/register',
					method: "POST",
					data: {
						mobile: this.phone,
						code: this.code,
						company_name: this.company,
						password: this.regPassport
						// password: md5.hex_md5(this.login.password)
					}
				})
				if(res.code == 1){
					// 证明注册成功
					uni.setStorageSync("userinfo", res.data.userinfo)
					// console.log("token:"+uni.getStorageSync("userinfo").token);
					uni.setStorageSync("token", res.data.userinfo.token)
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/main/main'
						})
					}, 1500)
				}
			},
			//手机号快捷登录
			quickLogin() {
				if (!this.isReadAgreement) {
					uni.showToast({
						title: "请仔细阅读并同意协议",
						icon: 'none'
					});
					return
				}
				//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
				uni.switchTab({
					url: '/pages/main/main'
				})
			},
			goTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			//阅读协议
			readAgreement() {
				this.isReadAgreement = !this.isReadAgreement
			},

		}
	}
</script>

<style>
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
	
	  .get-code-btn {
	    font-size: 28rpx;
	    font-weight: 400;
	    color: #38CBD5;
	    margin-right: 30rpx;
	    cursor: pointer;
	  }
	
	  .countdown-timer {
	    font-size: 28rpx;
	    font-weight: 400;
		
		
	    color: #cfd3d5;
	    margin-right: 30rpx;
	  }
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