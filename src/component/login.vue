<template>
	<div class="alert-matte" @click="hideDialog" v-if="store.isShowLogin"></div>
	<div class="login-dialog alert" v-if="store.isShowLogin" @touchmove.stop>
		<input type="text" placeholder="AccessToken"
			v-model="accessToken"
			@keyup.enter="login"
			@focus="loginStatus = ''">
		<button class="lbtn" @click="login">登 录</button>
		<div v-if="loginStatus" v-text="loginStatus"></div>
	</div>

</template>

<script>
	import path from 'path';
	import store from 'store';
	export default {
		data () {
			return {
				store: store,
				accessToken: '',
				loginStatus: '',
				loading: false
			}
		},
		//任何地方都可能会激活登录框, 但只有menu中才能退出登录, 所以退出登录提示框指令不需要放在store中
		// props: ['logoutStatus'],
		methods: {
			hideDialog () {
				this.store.isShowLogin = false;
				this.accessToken = this.loginStatus = '';
			},
			login () {
				if(this.loading) return;
				this.loading = true;
				if(/^[a-z0-9\-]{36}$/g.test(this.accessToken)) {
					$.ajax({
						url: AT,
						data: {accesstoken: this.accessToken},
						type: 'POST',
						success: (res) => {
							if(res.success) {
								this.store.at = this.accessToken;
								this.store.uid = res.id;
								this.store.uname = res.loginname;
								this.store.avatarUrl = res.avatar_url;

								this.loginStatus = '登录成功!';
								this.accessToken = '';
								setTimeout(() => {
									this.loading = false;
									this.store.isShowLogin = false;
									this.loginStatus = '';

									if(this.store.redirect) {
										this.$route.router.go({path: this.store.redirect});
									}
								}, 1000);
							}
						},
						error: () => {
							this.loginStatus = 'AccessToken 错误!';
							this.loading = false;
						}
					});
				} else {
					this.loginStatus = 'AccessToken 格式不对!';
					this.loading = false;
				}
			}
		},
		components: {
			cnAlert: require('./alert.vue')
		}
	}
</script>

<style lang="sass" scoped>
	@import '../asset/scss/var.mod.scss';
	.login-dialog{		
		input{
			$h: 40px;
			$pad: 5px;
			margin-bottom: 10px;
			width: 100%;
			line-height: $h - $pad*2;
			padding: $pad;
			display: block;
		}
		input[type="text"]{
			border: 2px solid $stdColor;
			border-radius: 5px;
			color: $stdColor;
			transition: all .2s ease;
			&:focus{
				box-shadow: 0 0 6px $stdColor;
			}
		}

		div{
			line-height: 2;
			text-align: center;
			color: #f70;
		}
	}
</style>