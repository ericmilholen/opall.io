/**
 * %%%%%%%%%%%%%%%%%%%%%% *
 * %%% TASKS SERVICES %%% *
 * %%%%%%%%%%%%%%%%%%%%%% *
*/
/*** [IMPORT] ***/
import axios from 'axios'


/*** [C] Task Services ***/
class TaskService {
	// [READ] Get tasks //
	static getTasks(email) {
		// Get the tasks from the server //
		let result = new Promise ((resolve, reject) => {
			axios
				.get(`/api/tasks/${email}`)
				.then((res) => {
					const data = res.data
					resolve(
						data.map(task => (
							{
								...task,
								createdAt: new Date(task.createdAt)
							}
						))
					)
				})
				.catch((err)=> { reject(err) })
		})

		// [RETURN] Result of Promise //
		return result
	}


	// [CREATE] Create Task //
	static insertTask(email, title, type, timeDue, dateDue, description) {
		return axios.post('/api/tasks/',
			{
				email,
				title,
				type,
				timeDue,
				dateDue,
				description,
			}
		)
	}


	// [DELETE] Delete Tasks //
	static deleteTask(id) {
		return axios.delete(`/api/tasks/${id}`)
	}
}



/*** [EXPORT] ***/
export default TaskService