<template>
	<view class="bg">
		<view style="overflow: auto;">
			<couponListView :type="type"  />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: ''
			}
		},
		onLoad(options) {
			console.log(options)
			if(options.type){
				this.type = options.type
			}
		},
		methods: {

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