/**
 * %%%%%%%%%%%%%%%%%%%%% *
 * %%% POST SERVICES %%% *
 * %%%%%%%%%%%%%%%%%%%%% *
*/
/*** [IMPORT] ***/
import axios from 'axios'


/*** [C] Post Services ***/
class PostService {
	// [READ] Get Posts //
	static getPosts(email) {
		// Get the Posts from the server //
		let result = new Promise ((resolve, reject) => {
			axios
				.get(`/api/posts/${email}`)
				.then((res) => {
					const data = res.data
					resolve(
						data.map(post => (
							{
								...post,
								createdAt: new Date(post.createdAt)
							}
						))
					)
				})
				.catch((err)=> { reject(err) })
		})

		// [RETURN] Result of Promise //
		return result
	}


	// [CREATE] Create Posts //
	static insertPost(text, email) {
		return axios.post('/api/posts/',
			{
				text,
				email
			}
		)
	}


	// [DELETE] Delete Posts //
	static deletePost(id) {
		return axios.delete(`/api/posts/${id}`)
	}
}



/*** [EXPORT] ***/
export default PostService