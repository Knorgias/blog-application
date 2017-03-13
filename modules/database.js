const sequelize = require( 'sequelize' )

let db = {}

db.conn = new sequelize( 'blog_application', 'knorgias', 'knorgias', {
  host: 'localhost',
  dialect: 'postgres'
} )

db.User = db.conn.define('user', {
	name: sequelize.STRING,
	email: sequelize.STRING,
	password: sequelize.STRING
})

db.Post = db.conn.define('post', {
	title: sequelize.STRING,
	content: sequelize.STRING,
	
})

db.Comment = db.conn.define('comment', {
	content: sequelize.STRING,
})

db.Comment.belongsTo( db.User, db.Post)
db.Post.hasMany( db.Comment)
db.Post.belongsTo( db.User )
db.User.hasMany( db.Post )

db.conn.sync({force: true}).then(f => { console.log( 'db synced' ) })

module.exports = db;