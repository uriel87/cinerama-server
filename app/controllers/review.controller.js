
var MovieSchema = require('mongoose').model('Movie'),
	ReviewSchema = require('mongoose').model('review'),
	userSchema = require('mongoose').model('User');







/* ----------------------------------------------------
 * get all movies review function
 * @param req
 * @param res
-------------------------------------------------------*/


exports.getAllReviews = function (req,res) {
	console.log('in controller getAllMovies');

	ReviewSchema.find({},function (err, reviewDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getAllReviews, review.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getAllMovies: " + reviewDoc);
			res.status(200).json(reviewDoc);
		}
	});
};






/* ----------------------------------------------------
 * get one movie review function
 * @param req
 * @param res
-------------------------------------------------------*/


exports.getMovieReview = function(req,res) {
	console.log('In controller getMovieDetails');

	var query = {
		name : req.body.name
	}

	ReviewSchema.find(query, function (err, reviewDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getMovieReview, review.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getAllMovies: " + reviewDoc);
			res.status(200).json(reviewDoc);
				
		}
	})

};

