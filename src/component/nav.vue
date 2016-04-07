<template>
	<div class="nav">
		<span :class="{active: store.tab === 'all'}"
				v-link="{path: '/list/all'}">全部</span>
		<span :class="{active: store.tab === 'good'}"
				v-link="{path: '/list/good'}">精华</span>
		<span :class="{active: store.tab === 'share'}"
				v-link="{path: '/list/share'}">分享</span>
		<span :class="{active: store.tab === 'ask'}"
				v-link="{path: '/list/ask'}">问答</span>
		<span :class="{active: store.tab === 'job'}"
				v-link="{path: '/list/job'}">招聘</span>
	</div>
</template>

<script>
	import store from 'store'
	export default {
		data () {
			return {
				store: store
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import '../asset/scss/var.mod.scss';
	.nav{
		height: $headerHeight;
		overflow: hidden;

		&>span{
			$border: 3px;
			padding: 0 12px;
			height: $headerHeight;
			line-height: $headerHeight;
			font-size: 14px;
			z-index: 0;
			float: left;

			font-weight: 600;
			&.active {
				color: $stdColor;
				border-bottom: $border solid $stdColor;
			}
		}
	}
</style>