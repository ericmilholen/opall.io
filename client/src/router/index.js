/*** [IMPORT] ***/
import Vue from 'vue'
import Router from 'vue-router'

/*** [IMPORT] Personal ***/
import AddTask from '../pages/AddTask'
import Dashboard from '../pages/Dashboard'
import EditTask from '../pages/EditTask'
import Login from '../pages/Login'
import NotFound from '../pages/404'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Tasks from '../pages/Tasks'

/*** [USE] ***/
Vue.use(Router)



/*** [EXPORT] ***/
export default new Router({
	routes: [
		{
			path: '/',
			name: 'Dashboard',
			component: Dashboard,
			meta: {
				auth: true,
				title: 'Dashboard'
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				auth: true,
				title: 'Login'
			}
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {
				auth: true,
				title: 'Register'
			}
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile,
			meta: {
				auth: true,
				title: 'Your Profile'
			}
		},
		{
			path: '/tasks',
			name: 'Tasks',
			component: Tasks,
			meta: {
				auth: true,
				title: 'Your Tasks'
			}
		},
		{
			path: '/tasks/add-task',
			name: 'AddTask',
			component: AddTask,
			meta: {
				auth: true,
				title: 'Add a Task'
			}
		},
		{
			path: '/tasks/edit-task/:id',
			name: 'EditTask',
			component: EditTask,
			meta: {
				auth: true,
				title: 'Edit this Task'
			},
		},
		{
			path: '/**',
			name: '404',
			component: NotFound,
			meta: {
				auth: true,
				title: '404 Not Found..'
			},
		}
	]
})
