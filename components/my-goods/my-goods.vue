<template>

	<view class="good_item">
		<!-- left img -->
		<view class="good_left">
			<image :src="goods.goods_big_logo || defaultsPic" class="goods_pic"></image>
		</view>

		<!-- right -->
		<view class="good_right">
			<view class="good_name">{{goods.goods_name}}</view>
			<view class="good_info_box">
				<view class="good_price">{{goods.goods_price | tofixed}}$</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "my-goods",
		data() {
			return {
				defaultsPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		props: {
			goods: {
				type: Object,
				defaul: {}
			}
		}
	}
</script>

<style lang="scss">
	.good_item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.good_left {
			margin: 5px;

			.goods_pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.good_right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.good_name {
				font-size: 13px;
			}

			.good_price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>
