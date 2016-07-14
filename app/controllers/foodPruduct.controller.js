

var productSchema = require('mongoose').model('Product');


/* ----------------------------------
 * get all products function
 * @param req
 * @param res
-------------------------------------*/


exports.getAllProduct = function (req,res) {
	console.log('in controller getAllProduct');
	productSchema.find({},function (err, productDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getAllProduct, foodPruduct.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getAllProduct: " + productDoc);
			res.status(200).json(productDoc);
		}
	});
};



/* ----------------------------------
 *  get product by id function
 * @param req
 * @param res
-------------------------------------*/


exports.getProduct = function(req, res) {
	console.log('controller DAO getProduct');
	var productName = req.params.productName;

	var query = {
		name: productName
	}

	productSchema.findOne(query,function (err, productDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getProduct, foodPruduct.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getProduct: " + productDoc);
			res.status(200).json(productDoc);
		}
	})

};





