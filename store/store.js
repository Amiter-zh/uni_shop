import Vue from 'vue'
import Vuex from 'vuex'
import muduleCart from './cart.js'
import muduleUser from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		m_cart: muduleCart,
		m_user: muduleUser,
	},
})

export default store
