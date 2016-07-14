

var movieController = require('../controllers/movie.controller');


// products routes
module.exports = function(app) {

	app.post('/getMovie/', movieController.getMovie)	// get movie details page

	app.post('/getMovieTrailer/', movieController.getMovieTrailer)	// get movie trailer page

};


