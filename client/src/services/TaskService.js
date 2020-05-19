/**
 * %%%%%%%%%%%%%%%%%%%%%% *
 * %%% TASKS SERVICES %%% *
 * %%%%%%%%%%%%%%%%%%%%%% *
 * Class Attributes are orded 
 * by "CRRUD" then alphabetical
 * for other functions that is 
 * not part of "CRRUD"
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
		// Get the tasks from the server
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

		// [RETURN] Result of Promise //
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

		// [RETURN] Result of Promise //
		return result
	}



	// [UPDATE] Single Task //
	static updateTask(taskId, title, type, timeDue, dateDue, description) {
		return axios.post(`/api/tasks/task/update/${taskId}`, {
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
}



/*** [EXPORT] ***/
export default TaskService