<template>
	<view class="bg">
		<!-- 列表 -->
		<view style="overflow: auto; background: #FFFFFF;">
			<questionListView :list="list" />
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			console.log('常见问题')
			this.getQuestion()
		},
		data() {
			return {
				list: [],
				page: 1
			}
		},
		methods: {
			// 获取常见问题
			async getQuestion(){
				let _this = this
				const res = await this.$myRequest({
					url: 'api/Help/getConcernList',
					method: "POST",
					data: {
						page: _this.page
					}
				})
				if(res.code == 1){
					_this.list = res.data.data
				}
			},
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
</style>