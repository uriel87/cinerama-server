

/* ----------------------------------

 * create review order schema
 
-------------------------------------*/


var mongoose = require("mongoose"),
	schema = mongoose.Schema;




var reviewSchema = new schema( {

	name: String,
    lame: { type: Number, default: 0 },
    wtf: { type: Number, default: 0 },
    wow: { type: Number, default: 0 },
    nice: { type: Number, default: 0 },

    reviews: [{
    	name: String,
    	review: {type: String, enum: ['lame', 'wtf', 'wow', 'nice']},
    	comment: String
    }]

}, {collection: 'reviewMovies'});


// // Define schema name
mongoose.model('review',reviewSchema);
