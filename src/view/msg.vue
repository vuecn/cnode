<template>
	<cn-header title="消息"></cn-header>
	<div id="msg-page">
		<section class="pannel">
			<h3>新消息</h3>
			<hr>
			<ul v-if="notRead.length">
				<li v-for="item in notRead">
					<div class="reply-content">
						<a class="loginname" :href="'/#!/user/' + item.author.loginname">{{item.author.loginname}}</a> 在 <i class="reply-time">{{item.reply.create_at | toNow}}</i> 回复你: <br>
						{{{item.reply.content | replaceLink}}}
					</div>
					<div class="topic-title">{{item.topic.title}}</div>
				</li>
			</ul>
			<div class="no-msg" v-else>无</div>
		</section>
		<section class="pannel">
			<h3>过往消息</h3>
			<hr>
			<ul v-if="hasRead.length">
				<li v-for="item in hasRead">
					<div class="reply-content">
						<a class="loginname" :href="'/#!/user/' + item.author.loginname">{{item.author.loginname}}</a> 在 <i class="reply-time">{{item.reply.create_at | toNow}}</i> 回复你: <br>
						{{{item.reply.content | stripAtLink}}}
					</div>
					<div class="topic-title" v-link="{path: '/topic/' + item.topic.id}">{{item.topic.title}}</div>
				</li>
			</ul>
			<div class="no-msg" v-else>无</div>
		</section>
	</div>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				store: store,
				hasRead: [],
				notRead: []
			}
		},
		route: {
			data () {
				let self = this;
				$.ajax({
					url: MSG,
					type: 'GET',
					data: {
						accesstoken: store.at
					},
					success ({data}) {
						if(data){
							if(data.has_read_messages) 
								self.hasRead = data.has_read_messages;
							if(data.hasnot_read_messages)
								self.notRead = data.hasnot_read_messages;
						}
					},
					error () {

					}
				})
			}
		},
		components: {
			cnHeader: require('../component/header.vue'),
			cnTitle: require('../component/title.vue')
		}
	}
</script>

<style lang="sass" scoped>
	@import '../asset/scss/var.mod.scss';
	$pad: 10px;
	#msg-page{
		padding:  $pad $pad $headerHeight + $pad $pad;
		background: #f0f0f0;

		&>.pannel>ul>li{
			padding: 5px 0;
			// border-radius: 5px;
			// background-color: #eee;
			margin: 10px auto;
			// border-bottom: 1px solid #aaa;
		}

		.loginname{
			color: $stdColor2;
		}
		.reply-time{
			color: $stdColor;
		}

		.topic-title{
			background: #f0f0f0;
			border-radius: 0 5px 5px 0;
			border-left: 4px solid $stdColor;
			padding: 5px;
			cursor: pointer;
	
			@extend %omit;
		}

		.reply-content{
			// padding: 5px;
			line-height: 1.8;
			// font-size: 12px;
			// color: #333;
		}

		.no-msg{
			color: #999;
			font-size: 12px;
			text-align: center;
		}

	}
</style>