const express = require('express')
const app = express()

const bodyparser = require( 'body-parser' )

app.set( 'views', __dirname + '/views' )
app.set( 'view engine', 'pug' )

app.use( express.static( __dirname + '/static' ) )
app.use( bodyparser.urlencoded( { extended: true } ) )

//Render the index page
app.get( '/', ( req, res ) => {

	// Display the index page
	res.render( 'index', {
		//user: 'Kostas',
		//today: 'Monday',
	} )
} )


app.post( '/api', ( req, res ) => {
	console.log( req.body )
	res.send( 'Very well done ' + req.body.name )
} )

app.get( '/api', ( req, res ) => {
	console.log( req.query )
	res.send( 'This was a get request ' + (req.query.name ? req.query.name : ', but it was empty..') + '. Thank you. Come again.' )
} )

app.listen( 2810, f => {
	console.log( 'App running on port 2810' )
} )