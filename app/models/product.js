

/* ----------------------------------

 * create food product schema
 
-------------------------------------*/


var mongoose = require("mongoose"),
	schema = mongoose.Schema;


var foodProductSchema = new schema( {

	name: { type:String,  unique:true},

	size: String,
	
	price: Number,

	image: { type:String,  unique:true}

}, {collection: 'foodProducts'});


// Define schema name
mongoose.model('Product',foodProductSchema);

