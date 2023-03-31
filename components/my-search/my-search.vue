<template>
	<view class="m-searchc" :style="{'background-color':bgcolor}" @click="serchBox"> 
		<view class="m-searchb" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			};
		},
		props:{
			bgcolor:{
				type: String,
				default:'#c00000'
			},
			radius:{
				type:Number,
				default:15
			}
		},
		methods:{
			serchBox(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.m-searchc {
		// background-color: #c00000;
		height: 50px;
		padding: 0 5px;
		display: flex;
		align-items: center;


		.m-searchb {
			height: 36px;
			background-color: #ffffff;
			// border-radius: 15px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.placeholder {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>
