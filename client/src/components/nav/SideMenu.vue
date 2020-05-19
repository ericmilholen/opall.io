<template>
	<div
		class="bg-secondary shadow opacity-90 nav-drawer-menu"
		style="z-index: 1040;"
		v-bind:class="{ isOpen: sideMenuStatus }"
	>
		<a
			class="w-100 m-0 p-5 text-center bg-dark text-secondary"
			@click="closeMenu"
		>
			<span aria-hidden="true">&times;</span>
		</a>

		<router-link to="/">Home</router-link>
		<router-link to="/">View Tasks</router-link>
		<router-link to="/profile">Your Profile</router-link>
		<a href="/" v-on:click="logout">Log Out</a>
	</div>
</template>
<script>
	/*** [IMPORT] ***/
	import { EventBus } from '../../main'

	/*** [EXPORT] ***/
	export default {
		data: function() {
			return {
				sideMenuStatus: false
			}
		},

		created: function() {
			EventBus.$on('emittedNavBarBtn', () => {
				this.sideMenuStatus = !this.sideMenuStatus
			})
		},

		methods: {
			closeMenu() {
				this.sideMenuStatus = !this.sideMenuStatus
			},
			logout() {
				localStorage.removeItem('usertoken')
			},
		}
	}
</script>

<style scoped>
	.nav-drawer-menu {
		position: fixed;
		top: 0;
		right: 0;

		height: 100%;
		width: 0;

		overflow-x: hidden;
		transition: 0.5s;
	}

	.nav-drawer-menu a {
		display: block;
		padding: 15px;

		color: white;
		transition: 0.3s;
		font-size: 2em;

		text-align: center;
		text-decoration: none;
	}
	.nav-drawer-menu a:hover { background: #212529; }
	.isOpen {
		width: 75%;
	}
</style>