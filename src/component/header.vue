<template>
	<header>
		<div class="head">
			<cn-menu v-if="1"></cn-menu>
			<cn-nav v-if="!isShowTitle()"></cn-nav>
			<cn-title v-if="isShowTitle()" :title="title"></cn-title>
		</div>
	</header>
	<cn-login></cn-login>
	<cn-alert></cn-alert>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				store: store,
			}
		},
		props: ['title'],
		components: {
			cnNav: require('./nav.vue'),
			cnTitle: require('./title.vue'),
			cnMenu: require('./menu.vue'),
			cnLogin: require('./login.vue'),
			cnAlert: require('./alert.vue')
		},
		methods: {
			backHome () {
				this.$route.go({name: 'home'})
			},
			isShowTitle () {
				return ['user', 'msg', 'new'].indexOf(this.store.route.name) > -1; 
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../asset/scss/var.mod.scss';

	header{
		width: 100%;
		background-color: rgba(255,255,255, 0.9);
		position: fixed;
        bottom:0;		
		z-index: 10000;		
		.head{
			margin: 0 auto;			
		}
	}



</style>