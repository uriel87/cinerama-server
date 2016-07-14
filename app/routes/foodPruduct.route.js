

var foodPruductController = require('../controllers/foodPruduct.controller');


// products routes
module.exports = function(app) {

	app.post('/product/', foodPruductController.getProduct);	// product by name page

	app.post('/getAllProduct', foodPruductController.getAllProduct);	// all products page

};