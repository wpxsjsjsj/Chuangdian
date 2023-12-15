<template>
	<view class="bg">
		<view style="overflow: auto;">
			<orderListView :list="list" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						title: "学校医院感应自动皂液器壁挂皂液 盒厕所卫生间消毒皂液机洗手液瓶",
						num: "4186283772",
						money: "100"
					},
					{
						title: "学校医院感应自动皂液器壁挂皂液 盒厕所卫生间消毒皂液机洗手液瓶",
						num: "4186283772",
						money: "500"
					},
					{
						title: "学校医院感应自动皂液器壁挂皂液 盒厕所卫生间消毒皂液机洗手液瓶",
						num: "4186283772",
						money: "50"
					},
					{
						title: "学校医院感应自动皂液器壁挂皂液 盒厕所卫生间消毒皂液机洗手液瓶",
						num: "4186283772",
						money: "1000"
					},
					{
						title: "学校医院感应自动皂液器壁挂皂液 盒厕所卫生间消毒皂液机洗手液瓶",
						num: "4186283772",
						money: "90"
					},
					{
						title: "学校医院感应自动皂液器壁挂皂液 盒厕所卫生间消毒皂液机洗手液瓶",
						num: "4186283772",
						money: "99"
					},
					{
						title: "学校医院感应自动皂液器壁挂皂液 盒厕所卫生间消毒皂液机洗手液瓶",
						num: "4186283772",
						money: "999"
					},
					{
						title: "学校医院感应自动皂液器壁挂皂液 盒厕所卫生间消毒皂液机洗手液瓶",
						num: "4186283772",
						money: "28"
					}
				]
			}
		},
		onLoad() {
			this.getOrderList()
		},
		methods: {
			// 获取订单列表
			async getOrderList(){
				const res = await this.$myRequest({
					url: 'api/Order/OrderList',
					method: "POST"
				})
				if(res.code == 1){
					this.list = res.data
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'error'
					})
				}
				console.log('订单列表', res)
				// this.detail = res.data
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
</style>