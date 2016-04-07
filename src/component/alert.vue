<template>
	<div class="alert-matte" @click="hideAlert" v-if="store.alertMsg"></div>
	<div class="alert"
		v-if="store.alertMsg">
		<p>{{store.alertMsg}}</p>
		<button class="btn" @click="hideAlert">确定</button>
	</div>
</template>

<script>
	import store from 'store';
	export default {
		data () {
			return {
				store: store
			}
		},
		methods: {
			hideAlert () {
				this.store.alertMsg = '';
			}
		}
	}
</script>