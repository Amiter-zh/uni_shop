<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<my-address></my-address>

		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart_t_text">购物车</text>
		</view>

		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
					<my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true"
						@num-change="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>

			</block>
		</uni-swipe-action>

	<my-settle></my-settle>

	</view>
	
	<view class="empty-cart" v-else>
		<image src="../../static/cart_empty@2x.png" class="eimg"></image>
		<text class="etet">空空如也</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options:[{
					text: '删除',
					style:{
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
			swipeActionClickHandler(goods){
				console.log(goods);
				this.removeGoodsById(goods.goods_id)
			},
			radioChangeHandler(e) {
				this.updateGoodsState(e)
				// console.log(e);
			},
			numberChangeHandler(e) {
				// console.log(e);
				this.updateGoodsCount(e)
			}
		}
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border: 1px solid #efefef;

		.cart_t_text {
			margin-left: 10px;
			justify-content: center;
		}
	}
	.cart-container{
		padding-bottom: 50px;
	}
	.empty-cart{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		justify-content: center;
		
		.eimg{
			width: 120px;
			height: 120px;
		}
		.etet{
			font-size: 12px;
			color: gray;
			margin-top: 15px;
			
		}
	}
</style>
