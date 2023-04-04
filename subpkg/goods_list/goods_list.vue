<template>
	<view>

		<view class="good_list">
			<view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isloading: false
			};
		},
		onLoad(options) {
			// console.log(options);
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// console.log(this.queryObj);
			this.getgoodsL()
		},
		methods: {
			async getgoodsL(cb) {
				this.isloading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isloading = false
				
				cb && cb()
				if (res.meta.status !== 200) return uni.$showMSg()
				// this.goodsList = res.message.goods
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				// console.log(res);
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		onReachBottom() {
			if(this.queryObj.pagenum * this.queryObj.total >= this.total) return uni.$showMSg('加载完毕')
			if(this.isloading) return
			this.queryObj.pagenum += 1
			this.getgoodsL()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			// 发送请求
			this.getgoodsL(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
