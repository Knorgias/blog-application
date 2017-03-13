const express = require('express')
const app = express()
const session = require('express-session')

//My Session
app.use( session({
	secret: 'choco cookie',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false,
	maxAge: 1000 * 60 * 30 }
}))

//My custom routes
const users = require( __dirname + '/routes/users')
const posts = require(__dirname + '/routes/posts')

//Using bodyparser for req,res easy access
const bodyparser = require( 'body-parser' )

//My custom modules inclusions
const db = require( __dirname + '/modules/database' )
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'))

app.use('/', users);
app.use('/posts', posts)

app.listen(8000, f => {
	console.log('Server running on port 8000')
})