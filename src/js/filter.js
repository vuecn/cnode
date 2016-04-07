

export default {
	getTabClass (tab, good, top) {
		if(top) return 'top';
		if(good) return 'good';
		return tab || 'all';
	},
	getTabName (tab, good, top) {
		if(top) return '置顶';
		if(good) return '精华';
		if(tab === 'share') return '分享';
		if(tab === 'ask') return '问答';
		if(tab === 'job') return '招聘';
		return '';
	},
	toNow (t) {
		t = (Date.now() - new Date(t))/1000;
		if(t < 0) return '???';

		let year = 3600*24*360,
			month = 3600*24*30,
			day = 3600*24,
			hour = 3600,
			minute = 60

		if(t > year) {
			return ~~(t/year) + '年前';
		} else if(t > month) {
			return ~~(t/month) + '个月前';
		} else if(t > day) {
			return ~~(t/day) + '天前';
		} else if(t > hour) {
			return ~~(t/hour) + '小时前';
		} else if(t > minute) {
			return ~~(t/minute) + '分钟前';
		} else {
			return ~~t + '秒前';
		}
	},

	formatNum (n) {
		n = ~~n;
		let m = 1000000,
			w = 10000,
			k = 1000

		if(n > m) return (n/m).toFixed(1) + 'M';
		else if(n > w) return (n/w).toFixed(1) + 'W';
		else if(n > k) return (n/k).toFixed(1) + 'K';
		else
			return n;
	},

	replaceLink(s, target='_self') {
		//将后台返回的a标签中的 /user/:loginname 替换为 /#!/user/:loginname
		return s.replace(/<a.+?>[^@]*(@)([\w\-]+?)\s*<\/a>/gi, `<a href="#!/user/$2" target="${target}">$1$2</a>`)
	},

	stripAtLink(s) {
		return s.replace(/<a.+?>[^@]*(@)([\w\-]+?)\s*<\/a>/gi, '$1$2')
	}


}








