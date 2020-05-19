<template>
		<div class="login-terminal">
			<h3 class="mb-3 text-center">Welcome Back</h3>
			<div class="p-4 card bg-dark border-secondary">
				<!-- lOG IN FORM -->
				<ValidationObserver v-slot="{ handleSubmit }">
					<form @submit.prevent="handleSubmit(login)">
						<!-- Email -->
						<ValidationProvider
							tag="div"
							class="form-group"
							rules="required|email"
							v-slot="{ errors }"
						>
							<label for="email">Email</label>
							<input
								v-model="email"
								name="email"
								type="email"
								class="form-control bg-dark text-white border-secondary"
								:class="{ 'is-invalid': errors!='' }"
								placeholder="Example@example.com"
							>
							<span class="text-danger">{{ errors[0] }}</span>
						</ValidationProvider>

						<!-- Password -->
						<ValidationProvider
							tag="div"
							class="form-group"
							rules="required"
							v-slot="{ errors }"
						>
							<label for="password">Password</label>
							<input
								v-model="password"
								name="password"
								type="password"
								class="form-control bg-dark text-white border-secondary"
								:class="{ 'is-invalid': errors!='' }"
								placeholder="******"
							>
							<span class="text-danger">{{ errors[0] }}</span>
						</ValidationProvider>
						<br>

						<!-- FORM SUBMIT -->
						<button class="btn btn-lg btn-outline-success btn-block" type="submit">Login</button>
					</form>
				</ValidationObserver>
			</div>
			<br>

			<!-- Errors -->
			<div
				v-if="
					status === 'incorrect_email' ||
					status === 'incorrect_password'
				"
				class="alert alert-danger" role="alert"
			>
				Incorrect password or email.
			</div>
		</div>
</template>

<script>
	/*** [IMPORT] ***/
	import axios from 'axios'


	/*** [IMPORT] Personal ***/
	import router from '../router'
	import { EventBus } from '../main'


	/*** [EXPORT] ***/
	export default {

		/*** [DATA] ***/
		data: function() {
			return {
				email: '',
				password: '',
				status
			}
		},

		created: function() {
			// [REDIRECT] //
			if (localStorage.usertoken) {
				router.push({ name: 'Profile' })
			}
		},

		methods: {
			login() {
				/*** [POST] ***/
				axios.post('/api/users/login', {
					email: this.email,
					password: this.password
				})
				.then(res => {
					// [LOG]
					console.log('Res Recieved:', res)

					// Check if Success or failure
					if (res.data.status != 'incorrect_email') {
						
						if (res.data.status != 'incorrect_password') {
							// [SET TOKEN]
							localStorage.setItem('usertoken', res.data.token)
							this.email = ''
							this.password = ''
							router.push({ name: 'Dashboard' })

							/*** [CALL] Emit ***/
							this.emitMethod()
						}
						// [INCORRECT PASSWORD]
						else {
							this.status = res.data.status
							console.log('status:', this.status)
						}
					}
					// [INCORRECT EMAIL]
					else {
						this.status = res.data.status
						console.log('status:', this.status)
					}
				})
				.catch(err => {
					console.log(err)
				})
			},

			/*** [FUNCTION] Emit ***/
			emitMethod () {
				// [EMIT OUT] //
				EventBus.$emit('logged-in')
			}
		}
	}
</script>

<style scoped>
	.login-terminal {
		max-width: 350px;
		margin: 50px auto;
	}

	.login-terminal label,
	.login-terminal h3 {
		color: white;
	}
</style>
