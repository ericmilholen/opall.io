<template>
	<div class="container">
		<br>
		
		<h1 class="text-center text-white">Your Profile</h1>
		<hr>

		<table class="table table-borderless rounded table-dark w-100">
			<tr>
				<td>First Name</td>
				<td>{{first_name}}</td>
			</tr>
			<tr>
				<td>Last Name</td>
				<td>{{last_name}}</td>
			</tr>
			<tr>
				<td>Email</td>
				<td>{{email}}</td>
			</tr>
		</table>

		<button class="mt-3 btn btn-secondary">Edit Your Profile</button>
	</div>
</template>

<script>
	/*** [IMPORT] ***/
	import jwtDecode from 'jwt-decode'

	/*** [EXPORT] ***/
	export default {
		/*** [DATA] ***/
		data: function() {
			// [INIT]
			const token = localStorage.usertoken
			const decoded = jwtDecode(token)

			// [RETURN]
			return {
				first_name: decoded.first_name,
				last_name: decoded.last_name,
				email: decoded.email
			}
		}
	}
</script>

<style>
	td {
		color: white;
	}
</style>