<template>
	<view style="display: flex;flex-direction: column;padding: 24px;">
		<div v-if="!titleArr.includes(title)" class="list" v-for="item,i in list" :key="i">
			<h1 style="font-size: 14px;color: #333333;margin-bottom: 15px;" v-html="item.name"></h1>
			<div style="color: #666666;font-size: 28rpx;line-height: 48rpx;" v-html="item.content"></div>
		</div>
		<div v-else>
			<!-- <h1 style="font-size: 14px;color: #333333;margin-bottom: 15px;" v-html="aboutUs.name"></h1> -->
			<div v-html="aboutUs.content"></div>
		</div>
	</view>
</template>

<script>
	export default { 
		onLoad(options) {
			console.log(options);
			this.url = options.title == '设备链接介绍'? 'api/Help/getEquipmentList' : options.title == '故障排除'? 'api/Help/getTroublesHootList' : 'api/Help/aboutUs' 
			console.log(this.url)
			this.title = options.title
			this.getDetail(options)
			uni.setNavigationBarTitle({
				title: options.title
			})
		},
		data() {
			return {
				title: '', // 页面title
				aboutUs: {},
				url: '',
				page: 1,
				list: [],
				titleArr: ['隐私协议','用户协议','隐私政策'],
				detail: "<h1>这是一个h1标题</h1> <u>HTML转换工具，可以将HTML代码转换为HTML转义字符串</u> <p>直接将你所要用程序输出的大串HTML代码贴到输入框中，即可一键生成</p> <p>如果您觉得好用，请记得收藏我们的地址！</p>"
			}
		},
		methods: {
			async getDetail(options) {
				let _this = this
				let params = {}
				_this.titleArr.includes(options.title)? params.type = options.noticeType : params.page = _this.page
				const res = await this.$myRequest({
					url: _this.url,
					method: "POST",
					data: params
				})
				if(res.code == 1){
					if(_this.titleArr.includes(options.title)){
						_this.aboutUs = res.data
					}else{
						_this.list = res.data.data
					}
					console.log('_this.aboutUs',_this.aboutUs)
					// _this.list = res.data.data
				}else{
					uni.showToast({
						title: res.msg
					})
				}
				/* 
				 "data": {
				     "message": {
				         "id": 92,
				         "title": "后台核验审核"
				     },
				     "check": {
				         "submit": [],
				         "check": [],
				         "base": []
				     }
				 }
				 */
				
				
			}
		},
		props: {
			noticeType: {
				type: String,
				default: '0'
			}
		}
	}
</script>

<style>
	
</style>