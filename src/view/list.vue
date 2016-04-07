<template>
	<cn-header></cn-header>
	<section id="list-page" class="fit">
		<ul>
			<li v-for="(i, e) in list" v-link="{path: '/topic/' + e.id}">
				
				<div class="status">
					<img :src="e.author.avatar_url" class="avatar">
					<div class="detail">
						<div>
							<span>
                                {{e.tab | getTabClass e.good e.top}}
								{{e.reply_count}} /{{e.visit_count}}
							</span>
							<span>
								{{e.author.loginname}}
							</span>
						</div>
						<div>
							<span>{{e.create_at | toNow}}</span>
							<span>{{e.last_reply_at | toNow}}更新</span>
						</div>
					</div>
				</div>
                <h3 v-text="e.title"></h3>
			</li>
		</ul>
	</section>

	<cn-top></cn-top>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				// 这里如果直接require会得到未响应的store
				store: store,
				list: [],
				queryData: {
					page: 0,
					limit: 20,
					tab: '',
					mdrender: true
				},
				loading: false
			}
		},
		route: {
			// canReuse () {
			// 	//只要注册此方法, 不明确返回true, 都认为组件不可重用.
			// },
			data ({to}) {
				let $doc = $(document),
					$win = $(window)

				this.getList();
				$win.on('scroll', () => {
					if( $doc.height() - $win.scrollTop() - $win.height() < 200 ){
						this.getList();
					}	
				})
			},
			deactivate () {
				this.store.tab = '';
				$(window).off('scroll');
			}
		},
		methods: {
			getList () {
				if(this.loading) return;
				this.loading = true;
				if(this.queryData.tab === this.store.tab) {
					this.queryData.page ++;
				} else {
					this.queryData.page = 1;
					this.queryData.tab = this.store.tab;
					this.list.length = 0;
					$(window).scrollTop(0)
				}

				$.get(LIST, $.param(this.queryData), ({data}) => {
					this.loading = false;
					if(data && data.length) {
						data.forEach(v => {
							if( !isExist(v, this.list) ) this.list.push(v)
						});
					}
				});

				function isExist(e, arr) {
					for(var i=0, m=arr.length; i<m; i++)
						if(e.id === arr[i].id) return true;
				}
			},
		},
		components: {
			cnHeader: require('../component/header.vue'),
			cnTop: require('../component/back-top.vue')
		}
	}
</script>

<style lang="sass" scoped>
	@import "../asset/scss/var.mod.scss";

	#list-page{
		padding-bottom: $headerHeight;
		background-color: $bgcolor;
        		
		ul{
			padding: 0.1px 5px; 

			li{
				background-color: #fff;
				padding: 5px 10px;
				margin: 10px auto;
				&:after{
					content: '.';
					clear: both;
					display: block;
					height: 0;
					visibility: hidden;
				}

				h3{
					$h: 25px;
					
					line-height: $h;
					font-size: 14px;
					font-weight: 600;
					color: #333;
                                        
					$tagFontSize: 12px;					
					@at-root %tag{
						color: #fff;
						padding: 3px 5px;
						margin-right: 5px;
						border-radius: 10px;
						font-weight: normal;
						font-size: $tagFontSize;
					}

					
				}

				
			}
		}

	}
</style>