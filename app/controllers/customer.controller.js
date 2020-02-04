const Customer = require("../models/customer.model.js");

// Controller for Customer functions: 
// create, findAll, findOne, update, delete, deleteAll

exports.create = (req,res) => {
	
	// Validate request'
	if (!req.body) {
		res.status(400).send({
			message: "Request body cannot be empty"
		});
	}
	
	// Create the new Customer
	const customer = new Customer({
		email: req.body.email,
		name: req.body.name,
		active: req.body.active
	});
	
	Customer.create(customer, (err, data) => {
		if (err)
			res.status(500).send({
				message:
				err.message || "Some error occurred while creating the Customer."
			});
		else res.send(data);
	});
	
};

exports.findAll = (req,res) => {
    Customer.getAll((err, data)=> {
        if(err){
            res.status(500).ssend({
                message:
                    err.message || "Some error occurred while getting all customers."
            });
        }
        else res.send(data);
    });
};
exports.findOne = (req,res) => {
};
exports.update = (req,res) => {
};
exports.delete = (req,res) => {
};
exports.deleteAll = (req,res) => {
	
	Customer.removeAll((err, data) => {
		if(err)
			res.status(500).send({
				message:
					err.message|| "Some error occurred while removing all customers/"
			});
		else res.send({ message: "All customers were deleted successfully!" });
	});
};


