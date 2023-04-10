<template>

	<view class="good_item">
		<!-- left img -->
		<view class="good_left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
			<image :src="goods.goods_big_logo || goods.goods_small_logo || defaultsPic" class="goods_pic"></image>
		</view>

		<!-- right -->
		<view class="good_right">
			<view class="good_name">{{goods.goods_name}}</view>
			<view class="good_info_box">
				<view class="good_price">{{goods.goods_price | tofixed}}$</view>
				<uni-number-box background="#d8d9da" :min="1" :value="goods.goods_count" v-if="showNum" @change="numberChangeHandler"></uni-number-box>
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
		methods: {
			radioClickHandler() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numberChangeHandler(val){
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
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
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss">
	.good_item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		width: 750rpx;
		box-sizing: border-box;

		.good_left {
			margin: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

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

			.good_info_box {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>
