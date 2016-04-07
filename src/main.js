
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import FastClick from 'fastclick';

import filter from './js/filter';
import store from 'store';


Vue.use(VueResource).use(VueRouter);

Object.keys(filter).forEach(k => Vue.filter(k, filter[k]));


new VueRouter({
	// saveScrollPosition: false
})
.map({
	'/': {
		name: 'home',
		component: require('./view/home.vue')
	},
	'/list/:tab': {
		name: 'list',
		component: require('./view/list.vue')
	},
	'/topic/:id': {
		name: 'topic',
		component: require('./view/topic.vue')
	},
	'/about': {
		name: 'about',
		component: require('./view/about.vue'),
		// auth: true
	},
	'/user/:uname': {
		name: 'user',
		component: require('./view/user.vue'),
		// auth: true
	},
	'/msg/:uname': {
		name: 'msg',
		component: require('./view/msg.vue'),
		auth: true
	},
	'/new': {
		name: 'new',
		component: require('./view/new.vue'),
		auth: true
	},
	'*': {
		name: 'error',
		component: require('./view/error.vue')
	},

})
.beforeEach(transition => {
	FastClick.attach(document.body);

	$(document).on('click', () => {
		store.isShowMenu = false;
		
	}).on('touchmove', () => {
		store.isShowMenu = false;
		store.isShowLogin = false;
	});

	if(transition.to.auth) {
		if(store.at) {
			transition.next();
		} else {
			store.isShowLogin = true;
			store.redirect = transition.to.path;
			transition.abort();
		}
	} else {
		transition.next();
	}
	
})
.afterEach(({to}) => {
	if(to.name === 'list') {
		if(TAB.indexOf(to.params.tab) >= 0) {
			store.tab = to.params.tab;
		} else {
			to.router.go({path: '/list/all'});
		}
	} else {
		store.tab = '';
	}
	store.isShowMenu = false;
	store.route = to;
})

//将空组件挂到#app, 然后会根据router跳转一次, 挂一个非空组件会跳转多次
//这个空组件是整个app的root组件
.start(Vue.extend({
	data () {
		return {
			store: store
		}
	},
	ready () {
		this.$watch('store.at', (newVal, oldVal) => {
			if(newVal) {
				this.$broadcast('login');
			} else if(newVal === '') {
				this.$broadcast('logout');
			}
		})
	}
}), '#app');


