import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "../contexts/UserContext";
import Spinner from "../components/Spinner";  // Import a spinner component if available

const Login = () => {
    document.title = "Login - The NeighbourHOOOD Admin Dashboard";
    const { loginAction } = useUser();
    const [message, setMessage] = useState(null)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(credentials);

        try {
            setLoading(true); // Set loading to true before making the API call
            const response = await loginAction(credentials);

            // Check the response for success or failure
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('An error occurred during login.');
            console.error('Login error', error);
        } finally {
            setLoading(false); // Set loading to false in the finally block
        }
    };
    ;

    return (
        <div className="w-full h-screen bg-background-color flex flex-col justify-center items-center absolute inset-0 transform -translate-y-0">
            <form
                onSubmit={handleLogin}
                className="flex text-accent-color font-base flex-col w-full md:w-[50%] items-center justify-center mx-auto bg-primary-color px-6  py-12 gap-12 rounded-3xl"
            >
                <h2 className="text-3xl font-light">Login</h2>
                <input
                    className="p-4 rounded-2xl text-xl "
                    placeholder="email"
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                />
                <input
                    className="p-4 rounded-2xl text-xl capitalize"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                />

                {!loading ? (<button
                    type="submit"
                    className=" text-lg hover:scale-105 transition-all duration-300 bg-accent-color px-4 py-2 rounded-2xl text-background-color hover:font-semibold"
                >
                    Log in
                </button>) : <Spinner />} {/* Show a spinner or loading state */}
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
