<template>
	<div class="icon-home" @click="back"></div>
	<h2>{{title}}</h2>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				store: store
			}
		},
		props: ['title'],
		methods: {
			back () {
				this.$route.router.go({name: 'home'});
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../asset/scss/var.mod.scss';
	$h: $headerHeight;
	.icon-home{
		width: $h;
		height: $h;
		color: #333;
		line-height: $h;
		text-align: center;
		font-size: 24px;

	}

	h2{
		$w: 100px;
		width: $w;
		height: $h;
		line-height: $h;
		text-align: center;
		position: absolute;
		left: 50%;
		top: 0;
		margin-left: -$w/2;
	}
</style>