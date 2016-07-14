

var movieController = require('../controllers/movie.controller');


// products routes
module.exports = function(app) {

	app.post('/getAllMovies', movieController.getAllMovies)	// all movies page

	app.post('/getMovieDetails/', movieController.getMovieDetails)	// one movie to show before order page

	app.post('/setOrderMovie/', movieController.setOrderMovie)	// save seats in the auditorium

	app.post('/getMovie/', movieController.getMovie)	// get movie details page

	app.post('/getMovieTrailer/', movieController.getMovieTrailer)	// get movie trailer page

	app.post('/getMovieCategory/', movieController.getMovieCategory)	// get movie category page

	app.post('/getUserComment/', movieController.getUserComment)	// get user comment trailer page

};