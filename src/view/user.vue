<template>
	<cn-header title="用户主页"></cn-header>

	<div id="user-page">
		<section class="pannel">
			<h3>用户状态</h3>
			<hr>
			<div class="status">
				<img :src="avatarUrl" class="avatar">
				<div class="detail">
					<div>
						<span>积分: {{score}}</span>
						<span>{{loginname}}</span>
					</div>
					<div>
						<span>{{createAt | toNow}}注册</span>
						<span><a class="icon-github" target="_blank" href="https://github.com/{{ghname}}"> {{ghname}}</a></span>
					</div>
				</div>
			</div>
		</section>

		<section class="pannel">
			<h3>最近动态</h3>
			<hr>
			<div class="recent-tab fit">
				<div :class="{active: tab === 'reply'}" @click="tab='reply'">最近回复</div>
				<div :class="{active: tab === 'topic'}" @click="tab='topic'">最近发布</div>
			</div>
			<ul v-show="tab === 'reply'">
				<li class="status" v-for="(i,e) in reply" v-link="{path: '/topic/' + e.id}">
					<img :src="e.author.avatar_url" class="avatar">
					<div class="detail">
						<div v-text="e.title"></div>
						<div>
							<span>{{e.last_reply_at | toNow}}</span>
							<span>{{e.author.loginname}}</span>
						</div>
					</div>
				</li>
			</ul>
			<ul v-show="tab === 'topic'">
				<li class="status" v-for="(i,e) in topic" v-link="{path: '/topic/' + e.id}">
					<img :src="e.author.avatar_url" class="avatar">
					<div class="detail">
						<div v-text="e.title"></div>
						<div>
							<span>{{e.last_reply_at | toNow}}</span>
							<span>{{e.author.loginname}}</span>
						</div>
					</div>
				</li>
			</ul>
		</section>

	</div>
</template>

<script>
	import path from 'path';
	import store from 'store';
	export default {
		data () {
			return {
				store: store,
				loginname: '',
				ghname: '',
				createAt: '',
				score: '',
				tab: 'reply',

				avatarUrl: '',
				reply: [],
				topic: []
			}
		},
		route: {
			data ({to}) {
				$.get(path.join(USER, to.params.uname), ({data}) => {
					if(data) {
						this.loginname = data.loginname;
						this.ghname = data.githubUsername;
						this.createAt = data.create_at;
						this.score = data.score;

						this.avatarUrl = data.avatar_url;
						this.reply = data.recent_replies.sort((a, b) => {
							return +new Date(a.last_reply_at) > +new Date(b.last_reply_at) ? -1 : 1;
						});
						this.topic = data.recent_topics;
					} else {
						this.$route.router.go({path: '/*'});
					}
				})
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
	#user-page{
		padding: $headerHeight + $pad $pad $pad $pad;
		background: #f0f0f0;
		
		.recent-tab, .msg-tab{
			cursor: default;

			&>div{
				$h: 40px;
				width: 50%;
				height: $h;
				line-height: $h;
				float: left;
				text-align: center;
				// font-size: 12px;
				&.active{
					color: $stdColor;
					// font-weight: bold;
				}
			}
		}
		ul{
			li{
				margin: 10px auto;
				&:not(:last-child){
					border-bottom: 1px solid #eee;
				}
			}
		}

	}

</style>