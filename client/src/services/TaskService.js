/**
 * %%%%%%%%%%%%%%%%%%%%%% *
 * %%% TASKS SERVICES %%% *
 * %%%%%%%%%%%%%%%%%%%%%% *
 * Ordered by "CRRUD" first then 
 * alphabeticaly for everything 
 * else 
*/
/*** [IMPORT] ***/
import axios from 'axios'

/*** [CLASS] Task Services ***/
class TaskService {
	// [CREATE] Task //
	static insertTask(email, title, type, timeDue, dateDue, description) {
		return axios.post('/api/tasks/', {
			email,
			title,
			type,
			timeDue,
			dateDue,
			description,
		})
	}

	// [READ ALL] Tasks //
	static getTasks(email) {
		// Request Task Data from Server //
		let result = new Promise ((resolve, reject) => {
			axios.get(`/api/tasks/${email}`)
				.then((res) => {
					const data = res.data
					resolve(
						data.map(task => ({
							...task,
							createdAt: new Date(task.createdAt)
						}))
					)
				})
				.catch((err)=> { reject(err) })
		})

		// [RETURN] //
		return result
	}

	// [READ] Single Task //
	static getSingleTaskData(id) {
		// Get specific task Data
		let result = new Promise ((resolve, reject) => {
			axios
				.get(`/api/tasks/task/${id}`)
				.then((res) => {
					const data = res.data
					resolve(
						data.map(task => ({
							...task,
							createdAt: new Date(task.createdAt)
						}))
					)
				})
				.catch((err)=> { reject(err) })
		})

		// [RETURN] //
		return result
	}

	// [UPDATE] Single Task //
	static updateTask(id, title, type, timeDue, dateDue, description) {
		return axios.post(`/api/tasks/task/update/${id}`, {
			title,
			type,
			timeDue,
			dateDue,
			description,
		})
	}

	// [DELETE] Tasks //
	static deleteTask(id) {
		return axios.delete(`/api/tasks/${id}`)
	}
	////////////////////////// CRRUD DONE ///////////////////////////

	// [T/F] Does User Own Task //
	static taskOwnershipValidation(id, email) {
		let result = new Promise ((resolve, reject) => {
			axios.get(`/api/tasks/task/ownership-validation/${id}`, {
				params: {
					email: email
				}
			})
				.then((res) => { resolve(res) })
				.catch((err) => { reject(err) })
		})

		return result
   }
}

/*** [EXPORT] ***/
export default TaskService