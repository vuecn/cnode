<template>
	<cn-header></cn-header>
	<div id="about-page">
		<base target="_blank">
		<div class="logo"></div>
		<h3>关于CNode社区</h3>
		<hr>
		<p>
			CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。
		</p>
		<p>
			CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。
		</p>
	</div>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				store: store
			}
		},
		components: {
			cnHeader: require('../component/header.vue')
		}
	}
</script>

<style lang="sass" scoped>

@import '../asset/scss/var.mod.scss';
$pad: 10px;
#about-page{
	padding: $headerHeight + 10 $pad $pad $pad;
	background: #fff;
    
	.logo{
		$edge: 100px;
		width: $edge;
		height: $edge;
		background: url(../asset/img/logo.png) no-repeat;
		background-size: $edge $edge;
		margin: 10px auto;
		transition: all 0.7s ease;
		&:hover{
			transform: rotate(360deg);
		}
	}
	hr{
		margin: 10px 0;
		border-bottom-color: #ddd;
	}

	h3:not(:first-child){
		margin-top: 20px;
	}
	h3, p{
		line-height: 1.8;
		a{
			color: #06a;
			text-decoration: underline;
		}
		strong{
			color: $stdColor;
		}
	}
}
</style>