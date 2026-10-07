import { useState } from "react";

function Login({ onLogin }) {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");


        try {

            const response = await fetch(
                "https://simple-crm-backend-b6j2.onrender.com/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setMessage(data.message);

                return;

            }


            // Login successful

            onLogin(data.user);


        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to connect to server"
            );

        }

    };


    return (

        <div className="login-page">

            <div className="login-box">

                <h1>
                    Simple CRM
                </h1>

                <p>
                    Login to your account
                </p>


                <form onSubmit={handleSubmit}>

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter email"
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter password"
                        required
                    />


                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>


                    {message && (

                        <p className="login-error">
                            {message}
                        </p>

                    )}

                </form>

            </div>

        </div>

    );

}

export default Login;