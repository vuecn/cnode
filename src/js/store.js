export default {
	tab: '',
	isShowMenu: false,
	isShowLogin: false,
	at: '',
	uid: '',
	uname: '',
	redirect: '',
	avatarUrl: '',

	alertMsg: '',


	alertTime: 2000,


	errorImg: ERRORIMG,
	scrollOff() {
		$('body').bind('touchmove', e => e.preventDefault() );
	},
	scrollOn() {
		$('body').unbind('touchmove');
	}
}