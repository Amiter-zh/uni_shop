import {mapGetters} from 'vuex'

export default{
	computed:{
		...mapGetters('m_cart', ['total'])
	},
	watch:{
		total(){
			this.setInfo()
		}
	},
	onShow() {
		this.setInfo()
	},
	methods:{
		setInfo(){
			uni.setTabBarBadge({
				index:2,
				text:this.total+''
			})
		}
	}
}