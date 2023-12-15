export const BASE_URL = 'http://cdcs.qifudaren.net/' //根域名
// const BASE_URL = 'http://192.168.0.199/' //根域名
export const myRequest = (options) => {
	//导出myRequest方法，option是参数，实际是一个对象参数
	return new Promise((resolve, reject) => {
		uni.showLoading({
			// title: '数据请求中...'
			title: ''
		});
		console.log('请求地址',BASE_URL + options.url);
		console.log("传入数据：" + JSON.stringify(options.data));
		console.log('token',uni.getStorageSync("token"))
		//最终封装的接口返回的是一个promise对象
		uni.request({
			url: BASE_URL + options.url, //公共地址拼接具体地址
			method: options.method || 'GET', //默认是GET方式请求
			header: options.header || {
				"Content-Type": "application/x-www-form-urlencoded",
				token: uni.getStorageSync("token"),
				// sign:"",
			}, //默认Header参数
			data: options.data || {}, //默认参数为空
			success: res => {
				//隐藏加载框
				uni.hideLoading();
				if (res.statusCode == 200) {
					//状态码
					switch (res.data.code) {
						case 1:
							resolve(res.data)
							break
						case 203:
							uni.showToast({
								// title: "token失效，请重新登录",
								title: res.data.msg,
								icon: "error"
							})
							//移除缓存
							// uni.clearStorage()
							uni.removeStorageSync("token")
							//跳转登录
							uni.redirectTo({
								url: "../login/login"
							})
							break
						default:
							return uni.showToast({
								// title: res.data.msg == "" ? "请求失败" : res.data.msg,
								title: res.data.msg,
								icon: "error"
							})
							break

					}
				} else {
					if (err) {
						console.log("接口请求失败：" + JSON.stringify(err));
						return uni.showToast({
							// title: "接口请求错误，代码" + err.statusCode,
							title: err,
							icon: "none"
						})
					}
				}

			},
			fail: err => {
				if (err) {
					console.log("获取数据失败：" + JSON.stringify(err));
					//隐藏加载框
					uni.hideLoading();
					uni.showToast({
						// title: "接口请求失败:" + err,
						title: err,
						icon: "error"
					})
					//请求失败，返回错误原因
					reject(err)
				}
			}
		})
	})
}

export const myUpLoadFile = (options) => {
	//导出myRequest方法，option是参数，实际是一个对象参数
	return new Promise((resolve, reject) => {
		uni.showLoading({
			// title: '数据请求中...'
			title: ''
		});
		console.log(BASE_URL + options.url);
		//最终封装的接口返回的是一个promise对象
		uni.uploadFile({
			url: BASE_URL + options.url, //公共地址拼接具体地址
			filePath: options.filePath, //要上传文件资源的路径
			name: options.name || 'file', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
			header: options.header || {
				token: uni.getStorageSync("token"),
				// sign:"",
			}, //默认Header参数
			formData: options.data || {}, //默认参数为空
			success: res => {
				//隐藏加载框
				uni.hideLoading();
				if (res.statusCode == 200) {
					console.log("接口请求成功：" + JSON.stringify(res.data));
					//后台返回的是一个字符串，需要强转一下
					let resData = JSON.parse(res.data)
					//状态码
					switch (resData.code) {
						case 1:
							resolve(resData)
							break
						case 203:
							uni.showToast({
								// title: "token失效，请重新登录",
								title: resData.msg,
								icon: "error"
							})
							//移除缓存
							// uni.clearStorage()
							uni.removeStorageSync("token")
							//跳转登录
							uni.redirectTo({
								url: "../login/login"
							})
							break
						default:
							return uni.showToast({
								// title: res.data.msg == "" ? "请求失败" : res.data.msg,
								title: resData.msg,
								icon: "error"
							})
							break

					}
				} else {
					if (err) {
						console.log("接口请求失败：" + JSON.stringify(err));
						return uni.showToast({
							// title: "接口请求错误，代码" + res.statusCode,
							title: err,
							icon: "none"
						})
					}
				}

			},
			fail: err => {
				if (err) {
					console.log("获取数据失败：" + JSON.stringify(err));
					//隐藏加载框
					uni.hideLoading();
					uni.showToast({
						// title: "接口请求失败:" + err,
						title: err,
						icon: "error"
					})
					//请求失败，返回错误原因
					reject(err)
				}
			}
		})
	})
}