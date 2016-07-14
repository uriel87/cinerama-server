

/* ----------------------------------

 * create movie order schema
 
-------------------------------------*/


var mongoose = require("mongoose"),
	schema = mongoose.Schema;




var movieSchema = new schema( {

	id: { type: Number, unique: true },

	name: String,

    category: String,

	cinema: String,

	branch: String,

	time: Date,

	auditorium: Number,

	seatsLeft: Number,

	seats: [{
	    row: { type: Number, unique: true },
		seat: { type: Number, unique: true },
		occupied: Boolean
	}]


}, {collection: 'movieOrder'});


// // Define schema name
mongoose.model('Movie',movieSchema);
