/*** [REQUIRE] ***/
const bcrypt = require("bcryptjs")
const cors = require("cors")
const express = require("express")
const jwt = require("jsonwebtoken")
const mongodb = require('mongodb')

/*** [REQUIRE] Personal ***/
require('dotenv').config()



/*** [USE] ***/
const users = express.Router().use(cors())



/*** [INIT] ***/
const secretKey = process.env.SECRET_KEY || 'secret'



/*** [POST] Register ***/
users.post("/register", async (req, res) => {
	// [INIT] // Get DB Collection // Get Todays Date // Store "Req" Data //
	const users = await loadUsersCollection()
	const today = new Date()
	const userData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		created: today
	}

	try {
		// [READ] Retrieve From Collection //
		const registerResult = await users.findOne({ email: req.body.email })

		// Check if Email is taken //
		if (!registerResult) {
			// Hash Data //
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				userData.password = hash
				
				try {
					// [INSERT] User //
					users.insertOne(userData)

					// Set JSON // [RES SEND] //
					res.json({ registration_status: 'success' })
						.send()
				}
				catch(err) {
					// [RES SEND] //
					res.send('error:', err)
				}
			})
		}
		else {
			// Set Status in res // [SEND RESPONSE] //
			res.json({ registration_status: 'email_taken' })
				.send()
		}
	}
	catch(err) {
		res.send('error: ' + err)
		console.log(err)
	}
})



/*** [POST] Login ***/
users.post('/login', async (req, res) => {
	// [INIT] // Get DB Collection //
	const users = await loadUsersCollection()

	try {
		// [CHECK FOR EMAIL] // [IF EXISTANT] //
		const loginResult = await users.findOne({ email: req.body.email })
		
		if (loginResult) {
			// [VALIDATE PASSWORD] //
			if (bcrypt.compareSync(req.body.password, loginResult.password)) {
				// Set Payload Data to Be Sent Back //
				const payload = {
					_id: loginResult._id,
					first_name: loginResult.first_name,
					last_name: loginResult.last_name,
					email: loginResult.email
				}

				// Set Token //
				let token = jwt.sign(payload, secretKey, { expiresIn: 1440 })

				// [SEND] The login details //
				res.json({ status: 'success', token: token })
				.send()
			}
			// [INCORRECT PASSWORD] //
			else {
				res.json({ status: 'incorrect_password' })
				.send() }
		}
		// [INCORRECT EMAIL] //
		else {
			res.json({ status: 'incorrect_email' })
			.send
		}
	}
	catch (err) {
		res.send('error: ' + err)
	}
})



// [F] User Collection in Database //
async function loadUsersCollection() {
	// [INIT] //
	const uri = process.env.MONGO_URI
	const db_name = process.env.DB || 'db_name'
	const c_name = 'users'
	
	const client = await mongodb.MongoClient.connect(
		uri,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
		
	)

	// [RETURN] //
	return client.db(db_name).collection(c_name)
}



/*** [EXPORT] ***/
module.exports = users