

/* ----------------------------------

 * create user schema
 
-------------------------------------*/


var mongoose = require("mongoose"),
	schema = mongoose.Schema;


var userSchema = new schema( {

	name: String,

	email: { type:String,  unique:true},
	
	picture: String,

	birthday: String,

	orders: [{
	    movieId: {type: Number, unique: true }//,
		// review: {type: String, enum: ['lame', 'wtf', 'wow', 'nice'], default: ""},
		// comment: {type: String, default: ""},
		// commitPush: {type: Boolean, default: false},
	}]

}, {collection: 'users'});

// Define schema name
mongoose.model('User',userSchema);


