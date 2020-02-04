
// The exported function takes the express app from the "server.js" file
module.exports = app => {
	
	const customer = require("../controllers/customer.controller.js");

	// Create a new Customer
	app.post("/customers", customer.create);

	// Retrieve all Customers
	app.get("/customers", customer.findAll);

	// Retrieve a single Customer with customerId
	app.get("/customers/:customerId", customer.findOne);

	// Update a Customer with customerId
	app.put("/customers/:customerId", customer.update);

	// Delete a Customer with customerId
	app.delete("/customers/:customerId", customer.delete);

	// Create a new Customer
	app.delete("/customers", customer.deleteAll);

};