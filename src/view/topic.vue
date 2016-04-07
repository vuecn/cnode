<template>
	<cn-header></cn-header>
	<base target="_blank">
	<div id="topic-page" v-if="topic.title">
		<h2 class="topic-title" v-text="topic.title"></h2>

		<div class="section">
			<div class="status">
				<img class="avatar"
					:src="topic.author.avatar_url"  
					v-link="{path: '/user/' + topic.author.loginname}">
				<div class="detail">
					<div>
						<span class="tag" :class="topic.tab">
							{{topic.tab | getTabName topic.good topic.top}}
						</span>
						<span>
							{{topic.author.loginname}}
						</span>
					</div>
					<div>
						<span>
							{{topic.visit_count}}次浏览
						</span>
						<span>
							发布于: {{topic.create_at | toNow}}
						</span>
					</div>
				</div>
			</div>
		</div>

		<section class='markdown-body topic-content' v-html="topic.content">

		</section>

		<h3 class="subtitle">
			<strong>{{topic.reply_count}}</strong> 个回复
		</h3>

		<section class="reply-list">
			<div v-for="(i,item) in topic.replies" class="reply-box">
				<div class="status">
					<img class="avatar" :src="item.author.avatar_url" v-link="{path: '/user/' + item.author.loginname}"/>
					<i class="icon-repost"
						v-if="item.author.loginname !== store.uname"
						:class="{active: isShowReply[i]}"
						@click="atHim(item, i)"></i>
					<i class="icon-like"
						v-if="item.author.loginname !== store.uname"
						:class="{active: item.ups.indexOf(store.uid) > -1}"
						@click="vote(item)">{{item.ups.length | formatNum}}</i>
					<div class="detail">
						<div v-text="item.author.loginname"></div>
						<div v-text="item.create_at | toNow"></div>
					</div>
				</div>
				<hr>
				<div v-html="item.content | replaceLink"></div>
				<section class="reply" 
					v-if="store.at && isShowReply[i]">
					<textarea rows="6" placeholder="支持Markdown语法"
						v-model="replyContent"></textarea>
					<button class="btn" @click="doReply" debounce="3000">确定回复</button>
				</section>
			</div>
		</section>
		
		<section class="reply" v-if="!isShowReplyTopic">
			<button class="btn" @click="addReply">回复此贴</button>
		</section>
		<section class="reply" placeholder="支持Markdown语法"
			v-if="store.at && isShowReplyTopic">
			<textarea rows="6" v-model="replyContent"></textarea>
			<button class="btn" @click="doReply" debounce="3000">确定回复</button>
		</section>

	</div>

	<cn-top></cn-top>
</template>

<script>
	import path from 'path';
	import store from 'store';
	import hl from '../js/highlight';
	import '../asset/scss/highlight.scss';
	export default {
		data () {
			return {
				store: store,
				errorImg: ERRORIMG,

				topic: {},
				isShowReply: [],
				isShowReplyTopic: false,
				replyId: '',
				replyContent: ''
			}
		},
		route: {
			data ({to}) {
				$.get(path.join(TOPIC, to.params.id), ({data}) => {
					if(data) {
						this.topic = data;
						this.topic.tab = data.good ? 'good' : data.tab;

						for(let i of this.isShowReply.keys()) {
							this.$set(`isShowReply[${i}]`, false);
						}

						// 高亮代码
						setTimeout(()=>{
							$('pre code').each((i, e) => {
								e.innerHTML = e.innerHTML.replace(/\t/g, '  ');
								hl.highlightBlock(e)
							})
						}, 0)
					}
				})
			}
		},
		ready () {
			this.$on('logout', () => {
				this.isShowReplyTopic = false;
				for(let i of this.isShowReply.keys()) {
					this.$set(`isShowReply[${i}]`, false);
				}
				return true;
			})

			// setTimeout(() => {
			// 	let $img = $('.markdown-body img');
			// 	for(let e of $img) {
			// 		console.log(e)
			// 		// console.log($img[i])
			// 	}
			// 	// console.log($('.markdown-body img').length)
				
			// }, 500)

			// for(let i of $('img')) {
			// 	console.log($('img')[i].offsetWidth)
			// }
			// $('img').on('load', function() {
			// });
		},
		methods: {
			doReply () {
				console.log(this.replyId + ' ' + this.replyContent)
			},
			vote (item) {
				if(!store.at) {
					store.isShowLogin = true;
					return;
				}

				// if(item.author.loginname == store.uname) {
				// 	store.alertMsg = '不能给自己点赞!';
				// }
				$.post(`https:\/\/cnodejs.org/api/v1/reply/${item.id}/ups`, {accesstoken: store.at}, (res) => {
					if(res.success) {
						if(res.action === 'up') {
							item.ups.push(store.uid);
						} else if(res.action === 'down') {
							item.ups.pop();
						}
					}
				});
			},
			atHim (item, i) {
				if(!store.at) {
					store.isShowLogin = true;
					return;
				}
				if(this.isShowReply[i]){
					this.$set(`isShowReply[${i}]`, false);
				} else {
					for(let i of this.isShowReply.keys()) {
						this.$set(`isShowReply[${i}]`, false);
					}
					this.$set(`isShowReply[${i}]`, true);
					this.isShowReplyTopic = false;

					let atName = `@${item.author.loginname}`;
					this.replyId = item.id;
					this.replyContent = '';
				}
				
			},
			addReply () {
				if(store.at){
					for(let i of this.isShowReply.keys()) {
						this.$set(`isShowReply[${i}]`, false);
					}
					this.isShowReplyTopic = true;
				} else {
					store.isShowLogin = true;
				}
			}
		},
		components: {
			cnHeader: require('../component/header.vue'),
			cnTop: require('../component/back-top.vue')
		}
	}
</script>


<style lang="sass" scoped>

@import '../asset/scss/var.mod.scss';

$pad: 10px;
#topic-page{
	padding: 0 $pad 60px $pad;
	transition: all .3s ease;
	background-color: #fff;

	&>*{
		margin: 10px auto;
	}

	h2.topic-title{
		font-size: 16px;
		line-height: 1.7;
		color: #333;
	}

	.section{
		background-color: #f0f0f0;
	}
}
.section{
	margin-left: #{-$pad} !important;
	margin-right: #{-$pad} !important;
	padding: $pad !important;
}

.tag {
	$font-tag: 12px;
	$h: 24px;
	$br: 5px;
	width: 40px !important;
	height: $h !important;
	line-height: $h !important;
	font-size: $font-tag;
	font-weight: 400;
	color: #fff !important;
	border-radius: 0 $br $br 0;
	text-align: center !important;
	position: relative;
	overflow: visible !important;
	&:after {
		$r: 6px;
		width: $r;
		height: $r;
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		margin: -$r/2;
		background-color: #fff;
		border-radius: $r/2;
	}
	&:before {
		width: 0;
		height: 0;
		content: '';
		position: absolute;
		left: -$h/2;
		top: 0;
		border-right: $h/2 solid transparent;
		border-top: $h/2 solid transparent;
		border-bottom: $h/2 solid transparent;
	}

	&.top{
		background: $topColor;
		&:before{
			border-right-color: $topColor;
		}
	}
	&.good{
		background: $goodColor;
		&:before{
			border-right-color: $goodColor;
		}
	}
	&.ask{
		background: $askColor;
		&:before{
			border-right-color: $askColor;
		}
	}
	&.job{
		background: $jobColor;
		&:before{
			border-right-color: $jobColor;
		}
	}
	&.share{
		background: $shareColor;
		&:before{
			border-right-color: $shareColor;
		}
	}

}


.reply-list {
	width: 100%;
	// margin-top: $gap*3;
	&>.reply-box {
		// width: 100%;
		list-style: none;
		// border: 1px solid #ccc;
		background: #f5f5f5;

		margin: 10px auto;
		padding: 10px;

		// &:last-child {
		// 	border-bottom: none;
		// }

		[class^="icon-"]{
			$w: 60px;
			$h: 60px;
			width: $w;
			height: $h;
			line-height: $h;
			float: right;
			text-align: center;
			font-size: 22px;

			&.icon-like{
				font-size: 16px;
			}

			&.active{
				color: $stdColor;
			}
		}
		.icon {
			font-size: 26px;
		}
	}
}


.reply{
	margin: 20px auto !important;
	textarea{
		width: 100%;
		padding: 10px;
		display: block;

		border-radius: 15px;
		border: 1px solid #ddd;
		font-size: 12px;
		margin: 10px 0;
		transition: all .2s ease;

		&:focus{
			border-color: $stdColor;
			box-shadow: 0 0 6px $stdColor;
		}
	}
}

</style>





