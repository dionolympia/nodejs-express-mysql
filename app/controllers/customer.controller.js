const Customer = require("../models/customer.model.js");

// Controller for Customer functions: 
// create, findAll, findOne, update, delete, deleteAll

// Create new customer and add to customers table
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

// Get all the customers
exports.findAll = (req,res) => {
    Customer.getAll((err, data)=> {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting all customers."
            });
        }
        else res.send(data);
    });
};

// Get customer with specific id
exports.findOne = (req,res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting the Customer."
            });
        }
        else res.send(data);
    });
};

// Update customer with specific id
exports.update = (req,res) => {
    
    // Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Request body cannot be empty"
		});
	}
    
    Customer.updateById(req.params.customerId, new Customer(req.body), (err, data) =>{
        if(err){
            if(err.kind = "not_found"){
                res.status(404).send({
                    message:`Did not find Customer with id ${req.params.customerId}.`
                });
            }
            else{
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while updating the Customer."
                });
            }
        }
        else res.send(data);
    });
};

// Delete customer with specific id
exports.delete = (req,res) => {
    Customer.remove(req.params.customerId, (err, data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing the Customer with id " + req.params.customerId
            });
        }
        else res.send({ 
            message: "Customer with id " 
                      + req.params.customerId + 
                     " was successfully deleted!"
        }); 
    });
};

// Delete all customers
exports.deleteAll = (req,res) => {
	
	Customer.removeAll((err, data) => {
		if(err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all customers/"
			});
		else res.send({ message: "All customers were deleted successfully!" });
	});
};


