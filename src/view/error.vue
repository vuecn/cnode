<template>
	<cn-header></cn-header>
	<div id="error-page">
		<p class="status">
			<i class="icon-face-stuck-out-tongue"></i>出错啦!
		</p>
		<p class="redirect">
			<i>{{t}}</i>s 之后跳转首页
		</p>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				t: 5
			}
		},
		route: {
			data () {
				var timer = setInterval(() => {
					this.t--;
					if(this.t < 0) {
						clearInterval(timer);
						this.$route.router.go({name: 'list'})
					}
				}, 1000)
			}
		},
		components: {
			cnHeader: require('../component/header.vue')
		}
	}
</script>

<style lang="sass" scoped>
	@import '../asset/scss/var.mod.scss';
	#error-page{
		width: 100%;
		height: 100%;
		// position: fixed;
		background: #fff;
		text-align: center;
		padding-top: 200px;

			// margin: 100px auto;
		p{
			color: #666;
			line-height: 50px;
			// width: 300px;
			&.status{
				font-size: 18px;
				i{
					font-size: 36px;
				}
			}
			&.redirect{
				i{
					color: $stdColor;
					font-size: 28px;
					font-family: verdana;
				}
			}
		}
	}
</style>