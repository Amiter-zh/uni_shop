<template>
	<view class="my-settle-container">

		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullCheck">
				<text>全选</text>
			</radio>
		</label>
		
		<view class="account-box">
			合计：<text class="account">${{checkedGoodsAmount}}</text>
		</view>

		<view class="btn-settle">
			<text>结算（{{checkedcount}}）</text>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			}
		},
		computed:{
			...mapGetters('m_cart',['checkedcount','total','checkedGoodsAmount']),
			isFullCheck(){
				return this.total === this.checkedcount
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom:0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;
		
		.radio{
			display: flex;
			align-items: center;
		}
		.account-box{
			color: #c00000;
		}
		.btn-settle{
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
		
	}
</style>
