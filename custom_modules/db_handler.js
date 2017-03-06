function db_handler() {

const sequelize = require( 'sequelize' )
const db = new sequelize( 'blog_application', 'knorgias', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
} )

//The model of my users table
const User = db.define( 'user', {
	username: sequelize.STRING,
	password: sequelize.STRING,
	email: sequelize.STRING
} )

//The model of my posts table
const Post = db.define( 'post', {
	id: sequelize.INTEGER,
	user_email: sequelize.STRING,
	content: sequelize.STRING
} )

////The model of my comments table
const Comment = db.define( 'comment', {
	id: sequelize.INTEGER,
	post_id: sequelize.STRING,
	user_email: sequelize.STRING,
	content: sequelize.STRING
} )

//User-Post relations
User.hasMany( Post )
Post.belongsTo( User )

//Comment-Post relations
Comment.belongsTo( Post )
Post.hasMany( Comment )

//User-Comment relations
User.hasMany( Comment )
Comment.belongsTo( User )

//Sync with our database while overwritting previous content (force: true)
db.sync( { force: true } )

}

module.exports = db_handler;

// db.sync( { force: true } ).then( f => {
// 	// Make a Promise all array that starts making bottles at the same time ( so not in order )
// 	return Promise.all( [
// 		Bottle.create( {
// 			size: 4,
// 			color: 'green',
// 			weight: 42
// 		} ),
// 		Bottle.create( {
// 			size: 14,
// 			color: 'blue',
// 			weight: 412
// 		} ),
// 		Bottle.create( {
// 			size: 8,
// 			color: 'purple',
// 			weight: 42
// 		} ),
// 		Bottle.create( {
// 			size: 4,
// 			color: 'magenta',
// 			weight: 452
// 		} ),
// 		Bottle.create( {
// 			size: 40,
// 			color: 'yellow',
// 			weight: 492
// 		} )
// 	] )
// } ).then( bottles => {
// 	// bottles contains an array of the results of the above Promise.all
// 	console.log( bottles )
// 	// This user promise is returned to the next .then
// 	return User.create( {
// 		name: "Mentor",
// 		email: "mentor@palokaj.co"
// 	} )
// } ).then( user => {
// 	// We here use the resulting user to create a bottle on their behalf
// 	return user.createBottle( {
// 		size: 42,
// 		color: 'obsidian',
// 		weight: 9999
// 	} )
// } ).then( bottle => {
// 	// Find one user besed on a 'where' parameter
// 	return User.findOne( {
// 		where: {
// 			email: "mentor@palokaj.co"
// 		},
// 		// We here ask pg to include the Bottle model ( variable, not the db model ) that belong to this user
// 		include: [ Bottle ]
// 	} )
// } ).then( founduser => {
// 	console.log( founduser.get( {plain: true} ) )
// } ).catch( console.log.bind( console ) )