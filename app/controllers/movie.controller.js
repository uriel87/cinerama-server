
// var movie = require('node-movie'),
var movieTrailer = require('movie-trailer'),
	MovieSchema = require('mongoose').model('Movie'),
	userSchema = require('mongoose').model('User'),
	ReviewSchema = require('mongoose').model('review'),
	_ = require('underscore'),
	dateFormat = require('dateformat'),
	formatDate = require('format-date'),
	// merge = require('merge'),
	imdb = require('imdb-api'),
	movies = require('../../config/movie.config');







/* ----------------------------------------------------
 * get all movies function
 * @param req
 * @param res
-------------------------------------------------------*/


exports.getAllMovies = function (req,res) {
	console.log('in controller getAllMovies');

	var aggregate = MovieSchema.aggregate();

	var movieDetails = {
		_id: {
			id: '$id',
			name: '$name',
			cinema: '$cinema',
			branch: '$branch',
			time: '$time',
			auditorium: '$auditorium',
			seatsLeft: '$seatsLeft',
		}
	}

	var sortMovie = {
		time: -1,
		name: -1,
		seatsLeft: 1
	}

	aggregate.sort(sortMovie).group(movieDetails);

	aggregate.exec(function (err, movieDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getAllMovies, movie.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getAllMovies: " + movieDoc);
			res.status(200).json(movieDoc);
		}
	});
};






/* ----------------------------------------------------
 * get one movie details function
 * @param req
 * @param res
-------------------------------------------------------*/


exports.getMovieDetails = function(req,res) {
	console.log('In controller getMovieDetails');

	var aggregate = MovieSchema.aggregate();

	aggregate.match( {name: req.body.name} );

	var movieDetails = {
		_id: {
			id: '$id',
			name: '$name',
			cinema: '$cinema',
			branch: '$branch',
			time: '$time',
			auditorium: '$auditorium',
			seatsLeft: '$seatsLeft',
			seats: '$seats'
		}
	}

	aggregate.group(movieDetails);

	aggregate.exec(function (err, doc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getMovieDetails, movieOrder.controller.js",
				err: err
			});
		}
		else {		
			console.log(doc);
			res.status(200).json(doc);
		}
	})

};











/* ----------------------------------------------------
 * set seat in audituriom function
 * @param req
 * @param res
-------------------------------------------------------*/


exports.setOrderMovie = function(req,res) {
	console.log('in controller setOrderMovie');

	var query = {
		id: req.body.id,
		name: req.body.name,
		//date: Date.parse(req.body.date),
		cinema: req.body.cinema,
		branch: req.body.branch,
		auditorium: parseInt(req.body.auditorium),

		seats: {
			$elemMatch: {
				row: parseInt(req.body.row),
				number: parseInt(req.body.number),
				occupied: false
			}
		}
	};

	var setSeat = {
		$inc: { seatsLeft: -1 },
		$set:{
	        'seats.$.occupied': true
	    }
	}

	MovieSchema.findOneAndUpdate(query,setSeat, {new: true}, function(err, movieDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function setOrderMovie, movie.controller.js",
				err: err
			});
		}
		else {
			// movieId = parseInt(movieDoc['id']);

			movieId = parseInt(movieDoc.id);
			var query = {
				email: req.body.email
			}

			var addCommentUser = {
				$push: {
		        	orders: {
		        		movieId: movieId
		        	}
				}
			}

			userSchema.findOneAndUpdate(query, addCommentUser, {new: true}, function (err, userDoc) {
				if(err) {
					console.log(err);
					res.status(200).json({
						status: "404",
						msg: " Database error in function setOrderMovie, movie.controller.js",
						err: err
					});
				}
				else {
					console.log("controller getUser: " + userDoc);
					res.status(200).json(userDoc);
				}
			})
		}

	});

};







/* ----------------------------------------------------
 * get more movie with some category
 * @param req
 * @param res
-------------------------------------------------------*/


exports.getMovieCategory = function(req,res) {
	console.log('In controller getMovieCategory');
	var movieName = req.body.name;
	imdb.get(movieName, {apiKey: movies.movie.apikey},function (err, movieDoc) {
		//movieCat = movieDoc.Genre;
		var movieCat = movieDoc.genres.split(",");
		console.log("movieCat: " + movieCat);
		someCategoryArr = findSomeCategory(movieCat);

		var query = {
			category: someCategoryArr[1]
		}

		MovieSchema.find(query,function (err, docSomeCategory) {
			if(err) {
				console.log(err);
				res.status(200).json({
					status: "404",
					msg: " Database error in function getMovieCategory, movieOrder.controller.js",
					err: err
				});
			}
			else {
				console.log("controller getMovieCategory: " + docSomeCategory);
				res.status(200).json(docSomeCategory);
			}
		})

	});

};





/* ----------------------------------------------------
 * get Movie details
 * @param req
 * @param res
-------------------------------------------------------*/


exports.getMovie = function (req,res) {
	console.log('in controller getMovie');
	var movieName = req.body.name;
	// http://www.omdbapi.com/?apikey=[yourkey]&
	// 	omdb.get({ title: 'Saw', year: 2004 }, true, 		movie(movieName,function (err, movieDoc) {
	imdb.get(movieName, {apiKey: movies.movie.apikey}, function (err, movieDoc) {
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






/* ----------------------------------------------------
 * get Movie trailer url
 * @param req
 * @param res
-------------------------------------------------------*/


exports.getMovieTrailer = function (req,res) {
	console.log('in controller getMovieTrailer');
	var movieName = req.body.name;
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
			// movieTrailerDoc.indexOf("v=");
			var finalPathTrailer = "https://www.youtube.com/embed/" + movieTrailerDoc.substr(movieTrailerDoc.indexOf("v=") + 2) ;

			//res.status(200).json(movieTrailerDoc);

			// res.status(200).json(finalPathTrailer);
			res.status(200).json(finalPathTrailer + "?rel=0&showinfo=0");

		}
	});
};














/* ----------------------------------------------------
 * get user comment for specific movie function
 * @param req
 * @param res
-------------------------------------------------------*/


exports.getUserComment = function(req,res) {
	console.log('in controller getUserComment');

	var movieName = req.body.name;

	var query = {

		orders: {
			$elemMatch: {
				movieName: movieName
			}
		}
	}

	userSchema.findOne(function(err, reviewDoc){
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getUserComment, movie.controller.js",
				err: err
			});
		}
		else
			console.log("controller getUserComment: " + reviewDoc);
			res.status(200).json(reviewDoc);
	});

};







function findSomeCategory(categoryForResult) {

	var categoty = [
		"Action", "Adventure", "Animation", "Biography",
		"Comedy","Crime", "Documentary", "Drama",
		"Family", "Fantasy", "History", "Horror",

		"Music", "Mystery", "Romance", "Sci-Fi", "Sport",
		"Thriller", "War"
	]

	return _.intersection(categoty, categoryForResult);
}



// /* ----------------------------------------------------
//  * get movies for index page function
//  * @param req
//  * @param res
// -------------------------------------------------------*/


// exports.getMoviesIndex = function(req,res) {
// 	console.log('in controller getUserComment');

// 	ReviewSchema.distinct("name",{},function (err, moviesDoc) {
// 		if(err) {
// 			console.log(err);
// 			res.status(200).json({
// 				status: "404",
// 				msg: "Database error in function getMovieUser, user.controller.js",
// 				err: err
// 			});
// 		}
// 		else {

// 			console.log("controller getMovieUser: " + moviesDoc);
// 			//res.status(200).json(moviesDoc);

// 			var aggregate = MovieSchema.aggregate();

// 			aggregate.match( {name: { $in: moviesDoc }} );

// 			var sumReview = {
// 				_id: {
// 					name: '$name',
// 					cinema: '$cinema',
// 					branch: '$branch',
// 					time: '$time',
// 					auditorium: '$auditorium',
// 					seatsLeft: '$seatsLeft'
// 				} 
// 			}

// 			aggregate.group(sumReview);

// 			aggregate.exec(function (err, moviesUserDoc) {
// 				if(err) {
// 					console.log(err);
// 					res.status(200).json({
// 						status: "404",
// 						msg: "Database error in function getMovieUser, user.controller.js",
// 						err: err
// 					});
// 				}
// 				else {
// 					console.log("controller getMovieUser: " + moviesUserDoc);
// 					res.status(200).json(moviesUserDoc);
// 				}
// 			});
// 		}
// 	});
// };





// exports.getMovieDetails = function(req,res) {


// 	var aggregate = ReviewSchema.aggregate();

// 	//aggregate.match( {id: { $in: userDoc }} );

// 	var sumReview = {
// 		_id: {
// 			name: '$name',
// 		}
// 	}

// 	aggregate.group(sumReview);

// 	aggregate.exec(function (err, moviesUserDoc) {
// 		if(err) {
// 			console.log(err);
// 			res.status(200).json({
// 				status: "404",
// 				msg: "Database error in function getMovieUser, user.controller.js",
// 				err: err
// 			});
// 		}
// 		else {
// 			console.log("controller getMovieUser: " + moviesUserDoc);
// 			//res.status(200).json(moviesUserDoc);
// 	// 	}
// 	// });

// 			console.log('In controller getMovieDetails');

// 			var aggregate = MovieSchema.aggregate();

// 			aggregate.match( {id: { $in: userDoc }} );

// 			//aggregate.match( {name: req.body.name} );

// 			var movieDetails = {
// 				_id: {
// 					name: '$name',
// 					cinema: '$cinema',
// 					branch: '$branch',
// 					time: '$time',
// 					auditorium: '$auditorium',
// 					seatsLeft: '$seatsLeft'
// 				}
// 			}

// 			aggregate.group(movieDetails);

// 			aggregate.exec(function (err, doc) {
// 				if(err) {
// 					console.log(err);
// 					res.status(200).json({
// 						status: "404",
// 						msg: " Database error in function getMovieDetails, movieOrder.controller.js",
// 						err: err
// 					});
// 				}
// 				else {
// 					movie(req.body.name,function (err, movieDoc) {
// 					if(err) {
// 						console.log(err);
// 						res.status(200).json({
// 							status: "404",
// 							msg: " Database error in function getMovie, movie.controller.js",
// 							err: err
// 						});
// 					}
// 					else {
// 						//doc.push(movieDoc);
// 						console.log(doc);
// 						res.status(200).json(doc);
// 					}
// 				});
// 				}
// 			})
// 		}
// 	});

// };



// exports.setOrderMovie = function(req,res) {
// 	console.log('in controller setOrderMovie');

// 	var query = {
// 		name: req.body.name,
// 		//date: Date.parse(req.body.date),
// 		cinema: req.body.cinema,
// 		branch: req.body.branch,
// 		auditorium: parseInt(req.body.auditorium),


// 		$in: {
// 			req.body.orderSeats
// 			seats: {
// 				$elemMatch: {
// 					row: parseInt(req.body.row),
// 					number: parseInt(req.body.number),
// 					occupied: false
// 				}
// 			}
// 		}
// 	};

// 	var setSeat = {
// 		$inc: { seatsLeft: -1 },
// 		$set:{
// 	        'seats.$.occupied': true
// 	    }
// 	}

// 	var myCursor = db.users.find( { type: 2 } );

// while (myCursor.hasNext()) {
//    print(tojson(myCursor.next()));
// }

// 	MovieSchema.findOneAndUpdate(query,setSeat, {new: true}, function(err, movieDoc) {
// 		if(err) {
// 			console.log(err);
// 			res.status(200).json({
// 				status: "404",
// 				msg: " Database error in function setOrderMovie, movie.controller.js",
// 				err: err
// 			});
// 		}
// 		else {
// 			movieId = parseInt(movieDoc['id']);
// 			var query = {
// 				email: req.body.email
// 			}

// 			var addCommentUser = {
// 				$push: {
// 		        	orders: {
// 		        		movieId: movieId
// 		        	}
// 				}
// 			}

// 			userSchema.findOneAndUpdate(query, addCommentUser, {new: true}, function (err, userDoc) {
// 				if(err) {
// 					console.log(err);
// 					res.status(200).json({
// 						status: "404",
// 						msg: " Database error in function setOrderMovie, movie.controller.js",
// 						err: err
// 					});
// 				}
// 				else {
// 					console.log("controller getUser: " + userDoc);
// 					res.status(200).json(userDoc);
// 				}
// 			})
// 		}

// 	});

// };