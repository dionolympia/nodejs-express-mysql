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
		
        // Successful creation
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
		
		// If not empty, Successful search
		if(res.length){
			console.log("Found customer: ", res[0]);
			result(null, res[0]);
			return;
		}
		
		// If results ARE empty, then return not found
		result({ kind:"not_found" }, null);
	});
};

Customer.updateById = (id, customer, result) => {
    sql.query("UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
             [customer.email, customer.name, customer.active, id],
             (err, res) => {
                if(err){
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
        
                // If the query does nothing, return "not found"
                if(res.affectedRows == 0){
                    result({kind: "not_found"}, null);
                    return;
                }
        
                console.log("updated customer: ", {id: id, ...customer });
                result(null, {id: id, ...customer});
            }
    );
};

// Read operation (all customers)
Customer.getAll = result => {
	sql.query("SELECT * FROM customers", (err,res)=> {
		if(err){
			console.log("error: ", err);
			result(err, null)
            return;
        }
        
        // Successful read
        console.log("All customers: ", res);
        result(null, res);
    });
};

// Delete operation (1 customer by ID)
Customer.remove = (id, result) => {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err,res) => {
        if(err){
           console.log("error: ", err);
           result(err, null);
           return;
        }
        
        // Return "not found" if no customer has that ID
        if(res.affectedRows == 0){
            result({ kind: "not_found"}, null);
            return;
        }
        
        // Successful delete
        console.log("Deleted customer with id: ", id);
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
		
        // Successful delete
		console.log(`Deleted ${res.affectedRows} customers`);
		result(null, res);	
	});
};
	
module.exports = Customer;

