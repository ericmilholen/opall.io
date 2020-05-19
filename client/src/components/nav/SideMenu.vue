<template>
	<div
		class="bg-secondary shadow opacity-90 nav-drawer-menu"
		style="z-index: 1040;"
		v-bind:class="{ isOpen: sideMenuStatus }"
	>
		<a
			@click="closeMenu"
			class="w-100 m-0 p-5 text-center bg-dark text-secondary"
		>
			<span aria-hidden="true">&times;</span>
		</a>

		<a href="/">Home</a>
		<a href="/tasks">View Tasks</a>
		<a href="/your-account">Your Account</a>
		<a href="/your-profile">Your Profile</a>
		<a href="/logout.php" id="bottom-btn">Log Out</a>
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
			}
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