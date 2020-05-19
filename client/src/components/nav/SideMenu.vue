<template>
	<div
		class="bg-secondary shadow opacity-90 nav-drawer-menu"
		style="z-index: 1040;"
		v-bind:class="{ isOpen: sideMenuStatus }"
	>
		<button
			class="w-100 m-0 p-5 btn btn-dark bg-dark text-center text-secondary"
			@click="closeMenu"
		>
			<span aria-hidden="true">&times;</span>
		</button>

		<button
			class="w-100 btn btn-secondary"
			v-on:click="homeBtn();"
		>Home</button>
		<button
			class="w-100 btn btn-secondary"
			v-on:click="yourTaskBtn();">
		Your Tasks</button>
		<button
			class="w-100 btn btn-secondary"
			v-on:click="yourProfileBtn();"
		>Your Profile</button>
	</div>
</template>
<script>
	/*** [IMPORT] ***/
	import { EventBus } from '../../main'
	import router from '../../router'

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

			homeBtn() {
				this.sideMenuStatus = !this.sideMenuStatus
				router.push({ path: '/' })
			},

			yourTaskBtn() {
				this.sideMenuStatus = !this.sideMenuStatus
				router.push({ path: '/tasks' })
			},

			yourProfileBtn() {
				this.sideMenuStatus = !this.sideMenuStatus
				router.push({ path: '/profile' })
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

	.nav-drawer-menu button {
		transition: 0.3s;
		font-size: 2em;
	}
	.nav-drawer-menu button:hover { background: #212529; }
	
	.isOpen { width: 75%; }
</style>