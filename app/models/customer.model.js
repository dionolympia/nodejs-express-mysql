// Exported MySQL connection
const sql = require("./db.js");

// constructor for Customer object
const Customer = function(customer){
		this.email = customer.email;
		this.name = customer.name;
		this.active = customer.active;
};

// Create operation
Customer.create = (newCustomer, result) => {
	sql.query("INSERT INTO customers SET ?", newCustomer, (err,res)=> {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		
		console.log("created customer: ", { id: res.insertId, ...newCustomer});
		result(null, { id: res.insertId, ...newCustomer });
	});
};

// Read operation (1 customer by ID)
Customer.findById = (customerId, result) => {
	sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err,res)=> {
		if(err){
			console.log("error: ", err);
			result(err, null);
			return;
		}
		
		// If results are not empty, show customer found
		if(res.length){
			console.log("Found customer: ", res[0]);
			result(null, res[0]);
			return;
		}
		
		// If results ARE empty, then return not found
		result({ kind:"not_found" }, null);
	});
};

// Read operation (all customers)
Customer.getAll = result => {
	sql.query("SELECT * FROM customers", (err,res)=> {
		if(err){
			console.log("error: " err);
			result(err, null)
            return;
        }
        
        console.log("All customers: ", res);
        result(null, res);
    });
};
			

// Delete operation (all customers)
Customer.removeAll = result => {
	sql.query("DELETE FROM customers", (err, res) => {
		
		// If query fails, return the error
		if(err){
			console.log("error: ", err);
			result(err, null);
			return;
		}
		
		console.log(`Deleted ${res.affectedRows} customers`);
		result(null, res);
		
		
	});
		
		
		
};
	
module.exports = Customer;

