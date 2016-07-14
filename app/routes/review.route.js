

var reviewController = require('../controllers/review.controller');


// products routes
module.exports = function(app) {

	app.post('/getAllReviews/', reviewController.getAllReviews)	// get movie reviews

	app.post('/getMovieReview/', reviewController.getMovieReview)	// get one movie review

};



