import React, { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import YouTubeLoader from './YouTubeLoader';

const Login = ({ setLoginModel }) => {
    // here use identifier because user can login eiher using email or password  
    const [loginField, setLoginField] = useState({
        identifier: "",
        password: ""
    });

    const [loader, setLoader] = useState(false);

    const handleOnChangeInput = (event, name) => {
        setLoginField({
            ...loginField, [name]: event.target.value
        });
    };

    const navigate = useNavigate();
    // in handlelogin we will save the token , userid , and profile pic 
    const handleLogin = async () => {
        setLoader(true);

        axios.post("http://localhost:3000/auth/login", loginField, { withCredentials: true }).then((res) => {
            setLoader(false)
            // storing token into local storage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("userProfilePic", res.data.user.profilePic);
            navigate("/");
            window.location.reload();

        }).catch((err) => {
            console.log(err);
            setLoader(false);

            toast.error(`Invalid Credentials`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        })
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center p-4'>
            <div className='w-full max-w-lg bg-transparent backdrop-blur-lg p-8 rounded-lg shadow-2xl flex flex-col items-center'>
                <div className='flex items-center gap-3 text-gray-800 text-2xl font-semibold'>
                    <FaYoutube className='text-red-500 text-4xl' />
                    Sign in
                </div>
                <div className='w-full flex flex-col items-center gap-6 mt-6'>
                    <input
                        type='text'
                        value={loginField.identifier}
                        placeholder='Username or Email'
                        onChange={(e) => handleOnChangeInput(e, "identifier")}
                        className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500'
                    />
                    <input
                        type='password'
                        value={loginField.password}
                        placeholder='Password'
                        onChange={(e) => handleOnChangeInput(e, "password")}
                        className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500'
                    />
                </div>
                {loader && <div className='mt-4'><YouTubeLoader /></div>}

                <div className='w-full flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-6'>
                    <button
                        className='w-full sm:w-1/4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold transition text-center'
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>
                    <Link
                        to="/signup"
                        className="w-full sm:w-1/4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition text-center block"
                        onClick={() => setLoginModel()}
                    >
                        Signup
                    </Link>

                    <button
                        className='w-full sm:w-1/4 px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-md text-black font-semibold transition text-center'
                        onClick={() => setLoginModel()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
