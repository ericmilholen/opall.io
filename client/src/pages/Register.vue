<template>
	<div class="register-terminal">
		<!-- Title -->
		<h3 class="mb-3 text-center">Join Something Awesome!</h3>
		<div class="p-4 card bg-dark border-secondary">

			<!-- FORM + VEE-VALIDATE -->
			<ValidationObserver v-slot="{ handleSubmit }">
				<form @submit.prevent="handleSubmit(register)">
					<!-- First Name -->
					<ValidationProvider
						tag="div"
						class="form-group"
						rules="required"
						v-slot="{ errors }"
					>
						<label for="first_name">First Name</label>
						<input
							v-model="first_name"
							name="first_name"
							type="text"
							class="form-control bg-dark text-white border-secondary"
							placeholder="John"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>

					<!-- Last Name -->
					<ValidationProvider
						tag="div"
						class="form-group"
						rules="required"
						v-slot="{ errors }"
					>
						<label for="last_name">Last Name</label>
						<input
							v-model="last_name"
							name="last_name"
							type="text"
							class="form-control bg-dark text-white border-secondary"
							placeholder="Doe"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>

					<!-- Email -->
					<ValidationProvider
						tag="div"
						class="form-group"
						rules="required|email"
						v-slot="{ errors }"
					>
						<label for="email">Email Address</label>
						<input
							name="email"
							type="email"
							class="form-control bg-dark text-white border-secondary"
							placeholder="Example@example.com"
							v-model="email"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>

					<!-- Password -->
					<ValidationProvider
						tag="div"
						class="form-group"
						rules="required|password:6,23|confirmed:@confirmation"
						v-slot="{ errors }"
					>
						<label for="password">Password</label>
						<input
							v-model="password"
							name="password"
							type="password"
							class="form-control bg-dark text-white border-secondary"
							placeholder="******"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>

					<!-- Confirmed Password -->
					<ValidationProvider
						tag="div"
						class="form-group" 
						name="confirmation"
						rules="required"
						v-slot="{ errors }"
					>
						<label for="confirm">Confirm Password</label>
						<input
							v-model="confirm"
							name="confirm"
							type="password"
							class="form-control bg-dark text-white border-secondary"
							placeholder="******"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>
					<br>

					<!-- Submit -->
					<button
						type="submit"
						class="btn btn-lg btn-outline-success btn-block"
					>Register</button>
				</form>
			</ValidationObserver>
		</div>
		<br>

		<!-- Errors -->
		<div
			v-if="status === 'email_taken'"
			class="alert alert-danger" role="alert"
		>
			Email is taken. Try Another email.
		</div>
	</div>
</template>

<script>
	/*** [IMPORT] ***/
	import axios from 'axios'

	/*** [IMPORT] Personal ***/
	import router from '../router'



	/*** [EXPORT] ***/
	export default {
		data: function() {
			return {
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				status: ''
			}
		},

		created: function() {
			// [REDIRECT] //
			if (localStorage.usertoken) {
				router.push({ name: 'Profile' })
			}
		},

		methods: {
			register() {
				/*** [POST] ***/
				axios.post('/api/users/register', {
					first_name: this.first_name,
					last_name: this.last_name,
					email: this.email,
					password: this.password
				})
				.then(res => {
					// Get Status // [LOG] //
					this.status = res.data.registration_status
					console.log('status:', this.status)
					
					// Check Status //
					if (this.status == 'success') {
						// [LOG] // Change Page //
						console.log('Account Created')
						router.push({ name: 'Login' })
					}
					return res
				})
				.catch(err => {
					console.log('Axios Error:', err)
				})
			}
		}
	}
</script>

<style scoped>
	.register-terminal {
		max-width: 350px;
		margin: 50px auto;
	}

	.register-terminal label,
	.register-terminal h3 {
		color: white;
	}
</style>