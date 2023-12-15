<template>
	<view style="height:100%;display: flex;flex-direction: column;">
		<!-- 暂无数据 -->
		<view v-if="isEmpty" class="center">
			<image :src="'/static/ic_testlist_empty.png'" style="width: 400rpx;height: 300rpx;" />
			<text style="font-size: 32rpx;color: #7C8493;margin-top: 15rpx;font-weight: 500;">暂无数据</text>
		</view>
		<!-- 列表数据 -->
		<noticeListView :list="list" />
		<view class="diXian" v-if="isOver">--------没有更多了--------</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				count: 10,
				list: [{
					id: "1",
					title: "这是标题",
					content: "这是内容这是内容",
					isRead: 1
				}, {
					id: "1",
					title: "这是标题",
					content: "这是内容这是内容",
					isRead: 2
				}, {
					id: "1",
					title: "这是标题",
					content: "这是内容这是内容",
					isRead: 1
				}],
				isOver: false,
				isEmpty: false,
			}
		},
		onShow() {
			// this.getList()
		},
		onPullDownRefresh() {
			console.log("onPullDownRefresh，下拉刷新")
			this.isOver = false
			this.page = 1
			this.list = []
			this.getList(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() { //加载更多，可设置触底距离 pages.json ->
			if (this.isOver == false) {
				console.log("页面触底了，加载更多");
				this.page++
				this.getList(() => {
					/* if (this.list.list.length <= this.list.page * this.list.count) {
						this.list.isOver = true
					} */
				})
			}

		},
		methods: {
			//获取列表
			async getList(callBack) {
				const res = await this.$myRequest({
					url: 'api/message/index',
					method: "POST",
					data: {
						page: this.page,
						limit: this.count
					}
				})
				/* 
				 "data": {
				     "total": 91,
				     "rows": [
				         {
				             "id": 92,
				             "type": "1",
				             "title": "后台核验审核",
				             "content": "后台核验审核\"2\"",
				             "is_read": "1",
				             "createtime": 1683941471,
				             "extra": "27",
				             "type_text": "Type 1",
				             "is_read_text": "Is_read 1"
				         }
				     ]
				 }
				 */
				if (this.page == 1) {
					uni.stopPullDownRefresh()
					//刷新
					this.list = res.data.rows
				} else {
					this.list = [...this.list, ...res.data.rows]
				}
				// console.log(this.list.list[0].s_name)
				this.total = res.data.total

				callBack && callBack()

				if (this.list.length == 0) {
					this.isEmpty = true
				} else this.isEmpty = false

				if (this.total == this.list.length) {
					this.isOver = true
				} else this.isOver = false
				/* if (page > 1 && res.data.list.length == 0) {
					this.isOver = true
				} else this.isOver = false */

			},
		}
	}
</script>

<style>
	.center {
		flex: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.diXian {
		background-color: #F2F4F6;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
	}
</style>