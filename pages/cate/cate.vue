<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll">
			<!-- //left -->
			<scroll-view class="lsc" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item ,i) in cateList" :key="i">
					<view :class="['lsc-item',i === active?'active':'']" @click="activeChange(i)">{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			l
			<!-- //righ-->
			<scroll-view class="rsc" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrolltop">
				<view class="catev2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="catev2-item">{{item2.cat_name}}</view>
					<view class="catev3-list">
						<view class="catev3-item" v-for="(item3, i3) in item2.children" :key="i3"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				wh: 0,
				cateList: [],
				active: 0,
				cateLevel2: [],
				scrolltop: 0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateL()
		},
		methods: {
			async getCateL() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				// console.log(res);
				if (res.meta.status !== 200)
					return uni.$showMsg('fail')
				this.cateList = res.message
				console.log(res)
				this.cateLevel2 = this.cateList[0].children
			},
			activeChange(i) {
				this.active = i
				this.cateLevel2 = this.cateList[i].children
				this.scrolltop = this.scrolltop === 0 ? 1 : 0
			},
			gotoGoodsList(i) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + i.cat_id
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll {

		display: flex;

		.lsc {
			width: 120px;

			.lsc-item {
				line-height: 60px;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c01a0e;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.catev2-item {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}
	}

	.catev3-list {
		display: flex;
		flex-wrap: wrap;

		.catev3-item {
			width: 33.33%;
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px
			}
		}
	}
</style>
