export default {
	namespaced: true,

	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	mutations: {
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)

			this.commit("m_cart/saveToStorage")
		},
		updateGoodsState(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)

			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit("m_cart/saveToStorage")
			}
		},
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)

			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit("m_cart/saveToStorage")
			}
		},
		addTocart(state, goods) {
			// console.log(state.cart);
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			// console.log(findResult);
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			// console.log(state.cart);
			this.commit('m_cart/saveToStorage')

		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},

	getters: {
		checkedGoodsAmount(state) {
			// console.log(state);
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item
				.goods_price, 0).toFixed(2)
		},
		checkedcount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		total(state) {
			let c = 0
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		}
	},
}
