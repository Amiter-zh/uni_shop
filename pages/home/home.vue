<template>
	<view>
		<view class="searchbox">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- 循环渲染轮播图的 item 项 -->
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<!-- 动态绑定图片的 src 属性 -->
					<image :src="item.image_src"></image>

				</navigator>
			</swiper-item>
		</swiper>

		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navC(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>

		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="f-box">
					<navigator class="lbox" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="rbox">
						<navigator class="rbitem" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 != 0"
							:url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: [],
			};
		},
		onLoad() {
			this.getSwiperList(),
				this.getnavList(),
				this.getfloorList()
		},
		methods: {
			// 3. 获取轮播图数据的方法
			async getSwiperList() {
				// 3.1 发起请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// 3.2 请求失败
				if (res.meta.status !== 200) {
					return uni.$showMsg('fail')
				}
				// 3.3 请求成功，为 data 中的数据赋值
				this.swiperList = res.message
				uni.$showMsg('数据请求成功')
			},

			async getnavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			async getfloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200)
					return uni.$showMsg('fail')
				// console.log(res);
				res.message.forEach(floor => {
						floor.product_list.forEach(prod => {
							prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
						})
					}

				)
				this.floorList = res.message
				uni.$showMsg('数据请求成功')
				// if (res.meta.status !== 200) return uni.$showMsg()
				// this.navList = res.message
			},
			navC(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				} else {

				}
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
	}
</script>

<style lang="scss">
	swiper {
		height: 300rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.rbox {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.f-box {
		display: flex;
		padding-left: 10rpx;
	}
	.searchbox{
		position: sticky;
		top: 0px;
		z-index: 999;
	}
</style>
