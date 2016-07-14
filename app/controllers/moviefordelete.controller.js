

var movie = require('node-movie'),
	movieTrailer = require('movie-trailer');




/* ----------------------------------
 * get Movie details
 * @param req
 * @param res
-------------------------------------*/


exports.getMovie = function (req,res) {
	console.log('in controller getMovie');
	var movieName = req.body.moviename;
	movie(movieName,function (err, movieDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getMovie, movie.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getMovie: " + movieDoc);
			res.status(200).json(movieDoc);
		}
	});
};






/* ----------------------------------
 * get Movie trailer url
 * @param req
 * @param res
-------------------------------------*/


exports.getMovieTrailer = function (req,res) {
	console.log('in controller getMovieTrailer');
	var movieName = req.body.moviename;
	movieTrailer(movieName,function (err, movieTrailerDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getMovie, movie.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getMovie: " + movieTrailerDoc);
			res.status(200).json(movieTrailerDoc);
		}
	});
};
