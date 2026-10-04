import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";

import Login from "./components/Login";

import "./App.css";

function App() {

    const [customers, setCustomers] = useState([]);
    const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem("crmUser");

    return savedUser
        ? JSON.parse(savedUser)
        : null;

});
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState("dashboard");

    const [editingCustomer, setEditingCustomer] =
        useState(null);


    // Get customers from Node.js
useEffect(() => {

    fetch("http://localhost:5000/api/customers")

        .then(response => response.json())

        .then(data => {

            setCustomers(data);

            setLoading(false);

        })

        .catch(error => {

            console.error(
                "Error fetching customers:",
                error
            );

            setLoading(false);

        });

}, []);


    // Start editing
    const startEditing = (customer) => {

        setEditingCustomer(customer);

        setPage("edit");

    };


    // Go to Add Customer
    const startAdding = () => {

        setEditingCustomer(null);

        setPage("add");

    };


    // Go back to Customers
    const goToCustomers = () => {

        setEditingCustomer(null);

        setPage("customers");

    };

if (!user) {

    return (
        <Login
    onLogin={(loggedInUser) => {

        localStorage.setItem(
            "crmUser",
            JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);

    }}
/>
    );

}
    return (
      
         
        <div className="app">


            {/* HEADER */}

            <header className="header">

                <h1>Simple CRM</h1>

                <p>
                    Customer Relationship Management System
                </p>

            </header>


            <div className="layout">


                {/* SIDEBAR */}

                <aside className="sidebar">

                    <h2>CRM</h2>


                    <button
                        onClick={() =>
                            setPage("dashboard")
                        }
                    >
                        Dashboard
                    </button>


                    <button
                        onClick={() =>
                            setPage("customers")
                        }
                    >
                        Customers
                    </button>


                    <button
                        onClick={startAdding}
                    >
                        Add Customer
                    </button>


                    <button
                        onClick={() =>
                            setPage("satisfaction")
                        }
                    >
                        Satisfaction
                    </button>


                    <button
    onClick={() => {

        localStorage.removeItem("crmUser");

        setUser(null);

        setPage("dashboard");

    }}
>
    Logout
</button>

                </aside>


                {/* MAIN */}

                <main className="main">
                  {loading ? (

    <div className="loading">
        Loading CRM data...
    </div>

) : (

    <>
        {page === "dashboard" && (
            <Dashboard
                customers={customers}
            />
        )}

        {page === "customers" && (
            <CustomerList
                customers={customers}
                setCustomers={setCustomers}
                editCustomer={startEditing}
            />
        )}

        {page === "add" && (
            <AddCustomer
                customers={customers}
                setCustomers={setCustomers}
                goToCustomers={goToCustomers}
                editingCustomer={null}
            />
        )}

        {page === "edit" && (
            <AddCustomer
                customers={customers}
                setCustomers={setCustomers}
                goToCustomers={goToCustomers}
                editingCustomer={editingCustomer}
            />
        )}

        {page === "satisfaction" && (
            <Satisfaction
                customers={customers}
            />
        )}
    </>

)}


                    {/* DASHBOARD */}

                    {page === "dashboard" && (

                        <Dashboard
                            customers={customers}
                        />

                    )}


                    {/* CUSTOMERS */}

                    {page === "customers" && (

                        <CustomerList
                            customers={customers}
                            setCustomers={setCustomers}
                            editCustomer={startEditing}
                        />

                    )}


                    {/* ADD */}

                    {page === "add" && (

                        <AddCustomer
                            customers={customers}
                            setCustomers={setCustomers}
                            goToCustomers={goToCustomers}
                            editingCustomer={null}
                        />

                    )}


                    {/* EDIT */}

                    {page === "edit" && (

                        <AddCustomer
                            customers={customers}
                            setCustomers={setCustomers}
                            goToCustomers={goToCustomers}
                            editingCustomer={editingCustomer}
                        />

                    )}


                    {/* SATISFACTION */}

                    {page === "satisfaction" && (

                        <div>

                            <h2>
                                Customer Satisfaction
                            </h2>

                            <p>
                                Satisfaction feature coming next.
                            </p>

                        </div>

                    )}

                </main>

            </div>

        </div>

    );

}

export default App;