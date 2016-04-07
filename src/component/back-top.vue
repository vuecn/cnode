<template>
	<div class="icon-backtop" v-show="!store.isShowMenu && show" @click="goTop"></div>
</template>
<script>
	export default {
		data () {
			return  {
				show: false,
				store: require('store')
			}
		},
		ready () {
			let $window = $(window);
			$window.on('scroll', () => {
				this.show = $window.scrollTop() > 100;
			})
		},
		methods: {
			goTop () {
				$(window).scrollTop(0);
				this.show = false;
			}
		}

	}
</script>
<style lang="sass" scoped>
	@import '../asset/scss/var.mod.scss';
	.icon-backtop {
		position: fixed;
		right: 10px;
		bottom: 60px;
		font-size: 50px;
		z-index: 9999;
		color: $stdColor;
	}
</style>