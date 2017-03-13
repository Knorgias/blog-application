const express = require('express');
const router = express.Router();
const db = require('../modules/database');


router.post('/delete/:id', (req, res) => {
	console.log(req.params.id + ' this is post id');

	db.Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/profile');
  });
})


router.post('/comment', (req, res) => {

	console.log( ' this is post id')

	var newComment = {
		content: req.body.comment,
		postId: req.body.postId
	}

	db.Comment.create(newComment).then( () => {
		res.redirect('../profile')
	}).catch(err => {
		console.log(err);
	})
})

router.get('/posts', (req, res) => {
	db.Post.findAll( {
		include: [ db.Comment ]
	}).then( post => {
		res.render('posts', {posts: post} )
	})
	
})




module.exports = router;