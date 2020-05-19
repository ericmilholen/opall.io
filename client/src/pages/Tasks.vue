<template>
	<article class="row">
		<section class="col-sm-12 my-4">
			<h2 class="d-inline-block text-white">Your Tasks</h2>
			<router-link to="/tasks/add-task" class="w-100">
				<button
					class="btn btn-outline-success float-right"
				>
					Create Task
				</button>
			</router-link>
		</section>

		<transition-group name="fade" tag="div" class="flex-container">
			<div
				class="card mb-3 bg-dark flex-card"
				v-for="(task, index) in tasks"
				v-bind:items="task"
				v-bind:index="index"
				v-bind:key="task._id"
			>
				<div
					class="card-body"
					v-on:click.self="
						taskDetailsToggle();
						loadTaskDetails(task);
					"
				>
					<!-- Date Due & Time -->
					<p
						class="card-text text-secondary"
						v-on:click.self="
							taskDetailsToggle();
							loadTaskDetails(task);
						"
					>
						{{ task.dateDue }} @ {{ task.timeDue }}
					</p>

					<!-- Type & Title -->
					<h6
						class="card-title text-secondary"
						v-on:click.self="
							taskDetailsToggle();
							loadTaskDetails(task);
						"
					>
						{{ task.type }}
					</h6>
					<h5
						class="text-white"
						v-on:click.self="
							taskDetailsToggle();
							loadTaskDetails(task);
						"
					>
						{{ task.title }}
					</h5>
				</div>
			</div>
		</transition-group>

		<!-- Pop Up Task Details -->
		<TaskDetails
			v-if="taskDetailedClicked"
			:task="task"
			:deleteSubmitted="deleteSubmitted"
			@deleteTask="deleteTask"
			@closeClicked="taskDetailsToggle"
		/>
	</article>
</template>

<script>
	/*** [IMPORT] Personal ***/
	import TaskDetails from '../components/TaskDetails'
	import TaskService from '../services/TaskService'
	import UserService from '../services/UserService'

	/*** [EXPORT] ***/
	export default {
		components: {
			TaskDetails,
		},

		data: function() {
			// Get Email //
			let email = UserService.getEmail()

			// [RETURN] //
			return {
				email: email,
				tasks: [],
				task: [],
				error: '',
				taskDetailedClicked: false,
				deleteSubmitted: false,
			}
		},

		created: async function() {
			try {
				// Call Function in Post Service Script //
				this.tasks = await TaskService.getTasks(this.email)
			}
			catch(err) { this.error = err.message }
		},

		methods: {
			taskDetailsToggle() {
				this.taskDetailedClicked = !this.taskDetailedClicked	
			},

			loadTaskDetails(task) {
				this.task = task
			},

			async deleteTask(id) {
				this.taskDetailedClicked = !this.taskDetailedClicked

				await TaskService.deleteTask(id)
				this.tasks = await TaskService.getTasks(this.email)

				// When Details is closed then enable delete button again
				if (this.taskDetailedClicked == false) {
					this.deleteSubmitted = false
				}
			}
		}
	}
</script>

<style scoped>
	.flex-container {
		display: flex;
		flex-wrap: wrap;
	}

	.flex-card {
		width: 250px;
		margin: 10px;
	}
	
</style>