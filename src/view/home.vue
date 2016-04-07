<script>
	import '../asset/scss/common.scss';

	export default {
		ready (){
			// console.log(123)
			this.$route.router.go({path: '/list/all'});
		}
	}
</script>