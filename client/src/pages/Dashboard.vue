<template>
	<div>
		<welcome-screen v-if="!loggedIn" />
		<posts v-if="loggedIn"/>
	</div>
</template>

<script>
	/*** [IMPORT] ***/
	import WelcomeScreen from '../components/WelcomeScreen'
	import { EventBus } from '../main'
	import Posts from '../components/Posts'


	/*** [EXPORT] ***/
	export default {
		components: {
			WelcomeScreen,
			Posts
		},
		
		data: function() {
			// [RETURN] //
			return { loggedIn: false }
		},

		created: function() {
			// [CHECK IF LOGGEDIN] //
			if (localStorage.usertoken) { this.loggedIn = true }

			// [EMIT IN] //
			EventBus.$on('logged-in', () => { this.loggedIn = true })
		},

		methods: {
			logout() {
				localStorage.removeItem('usertoken')
			},
			SMBtnClicked() {
				EventBus.$emit('emittedNavBarBtn')
			}
		},
	}
</script>