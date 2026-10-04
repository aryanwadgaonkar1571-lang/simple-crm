const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

const PORT = 5000;
const DATA_FILE = "./server/customers.json";
const USERS_FILE = "./server/users.json";

// Middleware
app.use(cors());
app.use(express.json());


// ===============================
// FUNCTIONS
// ===============================

// Read customers from JSON file
function getCustomers() {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
}

function getUsers() {

    const data = fs.readFileSync(
        USERS_FILE,
        "utf8"
    );

    return JSON.parse(data);

}


// Save customers to JSON file
function saveCustomers(customers) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(customers, null, 4)
    );
}
function validateCustomer(data) {

    const {
        name,
        email,
        phone,
        address,
        status,
        rating
    } = data;


    if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !status
    ) {

        return "All fields are required";

    }


    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        return "Enter a valid email address";

    }


    // Phone validation
    if (!/^\d{10}$/.test(phone)) {

        return "Phone number must contain exactly 10 digits";

    }


    // Status validation
    if (
        status !== "Active" &&
        status !== "Pending"
    ) {

        return "Status must be Active or Pending";

    }


    // Rating validation
    if (
        rating !== undefined &&
        (Number(rating) < 1 ||
         Number(rating) > 5)
    ) {

        return "Rating must be between 1 and 5";

    }


    return null;

}

// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
    res.send("CRM Server is running!");
});


// ===============================
// GET ALL CUSTOMERS
// ===============================

app.get("/api/customers", (req, res) => {

    const customers = getCustomers();

    res.json(customers);
});


// ===============================
// ADD CUSTOMER
// ===============================

app.post("/api/customers", (req, res) => {

    const {
    name,
    email,
    phone,
    address,
    status,
    rating,
    review
} = req.body;
const validationError =
    validateCustomer(req.body);


if (validationError) {

    return res.status(400).json({
        message: validationError
    });

}



    // Validate empty fields
    if (!name || !email || !phone || !address || !status) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }


    // Validate phone
    if (!/^\d{10}$/.test(phone)) {

        return res.status(400).json({
            message: "Phone number must contain exactly 10 digits"
        });

    }


    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        return res.status(400).json({
            message: "Enter a valid email address"
        });

    }


    const customers = getCustomers();


    // Generate ID
    const newId =
        customers.length > 0
            ? Math.max(...customers.map(c => c.id)) + 1
            : 1;


    const newCustomer = {

    id: newId,

    name: name,

    email: email,

    phone: phone,

    address: address,

    status: status,

    rating: Number(rating),

    review: review || ""

};


    customers.push(newCustomer);

    saveCustomers(customers);


    res.status(201).json(newCustomer);

});


// ===============================
// UPDATE CUSTOMER
// ===============================

app.put("/api/customers/:id", (req, res) => {
    const validationError =
    validateCustomer(req.body);


if (validationError) {

    return res.status(400).json({
        message: validationError
    });

}

    const id = parseInt(req.params.id);

    const customers = getCustomers();


    const customer = customers.find(
        customer => customer.id === id
    );


    if (!customer) {

        return res.status(404).json({
            message: "Customer not found"
        });

    }


    const {
    name,
    email,
    phone,
    address,
    status,
    rating,
    review
} = req.body;   

    // Validate fields
    if (!name || !email || !phone || !address || !status) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }


    // Update
    customer.name = name;

customer.email = email;

customer.phone = phone;

customer.address = address;

customer.status = status;

customer.rating = Number(rating);

customer.review = review || "";


    saveCustomers(customers);


    res.json(customer);

});


// ===============================
// DELETE CUSTOMER
// ===============================

app.delete("/api/customers/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const customers = getCustomers();


    const customerIndex = customers.findIndex(
        customer => customer.id === id
    );


    if (customerIndex === -1) {

        return res.status(404).json({
            message: "Customer not found"
        });

    }


    const deletedCustomer =
        customers.splice(customerIndex, 1);


    saveCustomers(customers);


    res.json({

        message: "Customer deleted successfully",

        customer: deletedCustomer[0]

    });

});


// ===============================
// START SERVER
// ===============================
// ===============================
// LOGIN
// ===============================

app.post("/api/login", (req, res) => {

    const {
        email,
        password
    } = req.body;


    if (!email || !password) {

        return res.status(400).json({
            message: "Email and password are required"
        });

    }


    const users = getUsers();


    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );


    if (!user) {

        return res.status(401).json({
            message: "Invalid email or password"
        });

    }


    res.json({

        message: "Login successful",

        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }

    });

});



app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});