import { useEffect, useState } from "react";

function AddCustomer({
    customers,
    setCustomers,
    goToCustomers,
    editingCustomer
}) {

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
    rating: 5,
    review: ""
});

    const [message, setMessage] = useState("");


    // Load customer data when editing
useEffect(() => {

    if (editingCustomer) {

        setFormData({
            name: editingCustomer.name,
            email: editingCustomer.email,
            phone: editingCustomer.phone,
            address: editingCustomer.address,
            status: editingCustomer.status,
            rating: editingCustomer.rating || 5,
            review: editingCustomer.review || ""
        });

    } else {

        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            status: "Active",
            rating: 5,
            review: ""
        });

    }

}, [editingCustomer]);


    const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]:
            name === "rating"
                ? Number(value)
                : value
    });

};


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");


        try {

            let response;


            // EDIT CUSTOMER
            if (editingCustomer) {

                response = await fetch(
                    `https://simple-crm-backend-b6j2.onrender.com/api/customers/${editingCustomer.id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(formData)
                    }
                );

            }


            // ADD CUSTOMER
            else {

                response = await fetch(
                    "https://simple-crm-backend-b6j2.onrender.com/api/customers",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(formData)
                    }
                );

            }


            const data = await response.json();


            if (!response.ok) {

                setMessage(data.message);

                return;

            }


            // Update React state
            if (editingCustomer) {

                setCustomers(
                    customers.map(customer =>
                        customer.id === editingCustomer.id
                            ? data
                            : customer
                    )
                );

            } else {

                setCustomers([
                    ...customers,
                    data
                ]);

            }


            setMessage(
                editingCustomer
                    ? "Customer updated successfully!"
                    : "Customer added successfully!"
            );


            setTimeout(() => {

                goToCustomers();

            }, 500);


        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to connect to server"
            );

        }

    };


    return (

        <div>

            <h2>
                {editingCustomer
                    ? "Edit Customer"
                    : "Add Customer"}
            </h2>


            <div className="form-container">

                <form onSubmit={handleSubmit}>

                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Phone
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength="10"
                        required
                    />


                    <label>
                        Address
                    </label>

                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="Active">
                            Active
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                    </select>

                    <label>
    Rating
</label>

<select
    name="rating"
    value={formData.rating}
    onChange={handleChange}
>
    <option value="1">1 - Very Poor</option>
    <option value="2">2 - Poor</option>
    <option value="3">3 - Average</option>
    <option value="4">4 - Good</option>
    <option value="5">5 - Excellent</option>
</select>


<label>
    Review
</label>

<textarea
    name="review"
    value={formData.review}
    onChange={handleChange}
    placeholder="Enter customer review"
    rows="4"
/>


                    <button
                        type="submit"
                        className="add-button"
                    >
                        {editingCustomer
                            ? "Update Customer"
                            : "Add Customer"}
                    </button>


                    {message && (
                        <p className="message">
                            {message}
                        </p>
                    )}

                </form>

            </div>

        </div>

    );
}

export default AddCustomer;