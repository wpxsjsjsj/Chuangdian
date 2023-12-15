<template>
	<view>
		<nyn-city-list :hot="false" @bindCity="bindCity"></nyn-city-list>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			//点击城市时触发,event = {id,name,spell}
			bindCity(event) {
				console.log('选择城市啦',event)
				uni.$emit('address', event)
				uni.setStorageSync('addressDefault', event)
				uni.navigateBack()
				/* uni.navigateBack({
					delta: 1
				}) */

			}
		}
	}
</script>

<style>

</style>