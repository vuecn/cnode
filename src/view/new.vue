<template>
	<cn-header title="新建话题"></cn-header>

	<div id="new-page">
		<section class="pannel">
			<div class="type-box">
				<span>选择板块:</span>
				<select class="type" v-model="type">
					<option value="">请选择</option>
					<option value="share">分享</option>
					<option value="ask">问答</option>
					<option value="job">招聘</option>
				</select>
				
			</div>
			<input type="text" class="title" placeholder="标题字数 10字以上" v-model="title">
			<textarea class="content" rows="20" placeholder="请尽量使用Markdown语法" v-model="content"></textarea>
            <button class="submit" @click="submit">发 布</button>
		</section>
	</div>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				store: store,
				type: '',
				title: '',
				content: ''
			}
		},
		methods: {
			submit () {
				if(!this.type) this.store.alertMsg = '请选择板块!'
				else if(!this.title) this.store.alertMsg = '请输入标题!'
				else if(this.title && this.title.length < 10) this.store.alertMsg = '标题内容不足10个字!';
				else if(!this.content) this.store.alertMsg = '请输入正文内容!'
				else {
					this.doSubmit();
				}
			},
			doSubmit () {
				$.ajax({
					url: '',
					data: {
						accesstoken: this.store.at,
						title: this.title,
						tab: this.type,
						content: this.content
					},
					success: ({success, tid}) => {
						if(success) {
							this.store.alertMsg = '话题发表成功!';
						} else {
							this.store.alertMsg = '话题发表失败!';
						}
					},
					error: () => {
						this.store.alertMsg = '出错了!';
					}
				})
			}
		},
		components: {
			cnHeader: require('../component/header.vue'),
		}
	}
</script>

<style lang="sass" scoped>
	@import '../asset/scss/var.mod.scss';

	$pad: 10px;
	#new-page{
		padding: $headerHeight + $pad $pad $pad $pad;
		background: #f0f0f0;

		$h: 30px;

		.pannel{
			margin: 0;
			@extend %fit;
			&>*{
				margin-bottom: 10px;
				&:last-child{
					margin-bottom: 0;
				}
			}
			
		}

		.title{
			width: 100%;
			border: 1px solid #ccc;
			
			line-height: 18px;
			padding: ($h - 18)/2;

			@extend %focus;
		}
		.content{
			width: 100%;
			line-height: 18px;
			border: 1px solid #ccc;
			
			padding: 5px;

			@extend %focus;
		}

		.type-box{
			height: $h;
			line-height: $h;

			span{
				font-size: 12px;
				margin-right: 10px;
			}

			select{
				// width: 80px;
				height: $h - 5;
				padding: 0 10px;
				// border: 1px solid #666;
			}
			
		}
        .submit{
				float: right;
				width: 60px;
				line-height: $h;
				padding: 0 10px;
				border: none;
				border-radius: 5px;
				background: $stdColor;
				color: #fff;

			}
	

	}
</style>