function Dashboard({ customers }) {

    const totalCustomers = customers.length;


    const activeCustomers = customers.filter(
        customer => customer.status === "Active"
    ).length;


    const pendingCustomers = customers.filter(
        customer => customer.status === "Pending"
    ).length;


    const ratedCustomers = customers.filter(
        customer =>
            typeof customer.rating === "number"
    );


    const averageRating =
        ratedCustomers.length > 0
            ? ratedCustomers.reduce(
                (total, customer) =>
                    total + customer.rating,
                0
            ) / ratedCustomers.length
            : 0;


    return (

        <div>

            <h2>
                Dashboard
            </h2>


            {/* STATISTICS */}

            <div className="cards">


                <div className="card">

                    <h3>
                        Total Customers
                    </h3>

                    <p>
                        {totalCustomers}
                    </p>

                </div>


                <div className="card">

                    <h3>
                        Active Customers
                    </h3>

                    <p>
                        {activeCustomers}
                    </p>

                </div>


                <div className="card">

                    <h3>
                        Pending
                    </h3>

                    <p>
                        {pendingCustomers}
                    </p>

                </div>


                <div className="card">

                    <h3>
                        Rating
                    </h3>

                    <p>
                        {averageRating.toFixed(1)}
                    </p>

                </div>

            </div>


            {/* CUSTOMER STATUS */}

            <div className="dashboard-section">

                <h3>
                    Customer Status
                </h3>


                <div className="status-row">

                    <span>
                        Active Customers
                    </span>

                    <strong>
                        {activeCustomers}
                    </strong>

                </div>


                <div className="status-row">

                    <span>
                        Pending Customers
                    </span>

                    <strong>
                        {pendingCustomers}
                    </strong>

                </div>

            </div>


            {/* RECENT CUSTOMERS */}

            <div className="dashboard-section">

                <h3>
                    Customers
                </h3>


                <table>

                    <thead>

                        <tr>

                            <th>
                                Name
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Rating
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {customers.slice(0, 5).map(
                            customer => (

                                <tr
                                    key={customer.id}
                                >

                                    <td>
                                        {customer.name}
                                    </td>

                                    <td>
                                        {customer.status}
                                    </td>

                                    <td>
                                        {customer.rating
                                            ? `${customer.rating}/5`
                                            : "N/A"}
                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Dashboard;