
var userController = require('../controllers/user.controller');


// products routes
module.exports = function(app) {

	app.post('/getUser/', userController.getUser);	// get one user

	app.post('/getAllUsers', userController.getAllUsers);	// get all users

	app.post('/getMovieUser', userController.getMovieUser);	// get the movies of the user

	app.post('/pushReview', userController.pushReview);	// pushe new review

};