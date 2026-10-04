import { useState } from "react";

function CustomerList({
    customers,
    setCustomers,
    editCustomer
}) {

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");


    // Filter customers
    const filteredCustomers = customers.filter((customer) => {

        const searchText = search.toLowerCase();

        const matchesSearch =
            customer.name.toLowerCase().includes(searchText) ||
            customer.email.toLowerCase().includes(searchText) ||
            customer.phone.includes(searchText);


        const matchesStatus =
            statusFilter === "All" ||
            customer.status === statusFilter;


        return matchesSearch && matchesStatus;

    });


    // Delete customer
    const deleteCustomer = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            const response = await fetch(
                `http://localhost:5000/api/customers/${id}`,
                {
                    method: "DELETE"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to delete customer"
                );

            }


            setCustomers(
                customers.filter(
                    customer => customer.id !== id
                )
            );


        } catch (error) {

            console.error(error);

            alert("Could not delete customer");

        }

    };


    return (

        <div>

            {/* PAGE HEADER */}

            <div className="page-header">

                <h2>
                    Customers
                </h2>

            </div>


            {/* SEARCH AND FILTER */}

            <div className="customer-controls">

                <input
                    type="text"
                    placeholder="Search by name, email or phone..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                >

                    <option value="All">
                        All Customers
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                </select>

            </div>


            {/* CUSTOMER TABLE */}

            <div className="customer-section">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Address</th>

                            <th>Status</th>

                            <th>Rating</th>

                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredCustomers.length === 0 ? (

                            <tr>

                                <td colSpan="8">

                                    No customers found

                                </td>

                            </tr>

                        ) : (

                            filteredCustomers.map(
                                (customer) => (

                                    <tr
                                        key={customer.id}
                                    >

                                        <td>
                                            {customer.id}
                                        </td>

                                        <td>
                                            {customer.name}
                                        </td>

                                        <td>
                                            {customer.email}
                                        </td>

                                        <td>
                                            {customer.phone}
                                        </td>

                                        <td>
                                            {customer.address}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    customer.status === "Active"
                                                        ? "status-active"
                                                        : "status-pending"
                                                }
                                            >
                                                {customer.status}
                                            </span>

                                        </td>

                                        <td>
                                            {customer.rating
                                                ? `${customer.rating}/5`
                                                : "N/A"}
                                        </td>

                                        <td>

                                            <button
                                                className="edit-button"
                                                onClick={() =>
                                                    editCustomer(
                                                        customer
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    deleteCustomer(
                                                        customer.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>


            {/* RESULT COUNT */}

            <p className="result-count">

                Showing {filteredCustomers.length} of{" "}
                {customers.length} customers

            </p>

        </div>

    );

}

export default CustomerList;