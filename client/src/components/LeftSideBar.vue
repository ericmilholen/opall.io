<template>
	<nav class="col-md-2 d-none d-md-block bg-dark sidebar left-navbar">
		<div class="sidebar-sticky">
			<!-- Spacer Div -->
			<div class="spacer"></div>

			<!-- Buttons -->
			<ul class="nav flex-column">
				<li class="nav-item">
					<router-link to="/tasks" class="nav-link active">
						<button class="btn btn-outline-secondary w-100">Your Tasks</button>
					</router-link>
				</li>
				
				<li class="nav-item">
					<router-link to="/" class="nav-link active">
						<button class="btn btn-outline-secondary w-100">Settings</button>
					</router-link>
				</li>
			</ul>

			<friends-list />
		</div>
	</nav>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import FriendsList from './FriendsList'

	/*** [EXPORT] ***/
	export default {
		components: {
			FriendsList,
		},
	}
</script>

<style scope>
	.left-navbar { left: 0; }

	.sidebar {
		z-index: 100;
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		width: 18%;
		max-width: 260px;
		padding: 0;
		box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
	}

	.spacer {
		display: inline-block;
		height: 53px;
	}

	.inbox_chat {
		bottom: 2vh;
		position: absolute;
		overflow-y: scroll;
		height: 50vh;
		margin: 0 4px;
		padding: 0 4px;
		background-color: #6c757d;
		border-radius: 5px;
	}

	.chat_list {
		border-bottom: 1px solid #c4c4c4;
		margin: 0;
		padding: 18px 16px 10px;
	}


	.chat_people {
		overflow: hidden;
		clear: both;
	}

	.chat_img {
		float: left;
		width: 11%;
	}

	.chat_img img {
		max-width: 100%;
	}

	.chat_ib {
		float: left;
		padding: 0 0 0 15px;
		width: 88%;
	}

	.chat_ib h5 {
		font-size: 14px;
		color: #464646;
		margin: 0 0 8px 0;
	}

	.chat_ib h5 span {
    font-size: 13px;
    float: right;
}
</style>