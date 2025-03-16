import React, { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = ({ setLoginModel }) => {

    const [loginField, setLoginField] = useState({
        "userName": "",
        "password": ""
    })
    const handleOnChangeInput = (event, name) => {
        setLoginField({
            ...loginField, [name]: event.target.value
        })
    }
    // console.log(loginField)

    return (
        <div className='fixed inset-0 flex items-center justify-center p-4'>
            <div className='w-full max-w-lg bg-transparent backdrop-blur-lg p-8 rounded-lg shadow-2xl flex flex-col items-center'>
                <div className='flex items-center gap-3 text-gray-800 text-2xl font-semibold'>
                    <FaYoutube className='text-red-500 text-4xl' />
                    Login
                </div>
                <div className='w-full flex flex-col items-center gap-6 mt-6'>
                    <input type='text' value={loginField.userName} placeholder='User Name' onChange={(e) => handleOnChangeInput(e, "userName")} className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500' />
                    <input type='password' value={loginField.password} placeholder='Password' onChange={(e) => handleOnChangeInput(e, "password")} className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500' />
                </div>
                <div className='w-3/4 flex justify-between mt-6'>
                    <button className='w-1/4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold transition'>Login</button>
                    <button to={"/signup"} className='w-1/4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition' onClick={() => setLoginModel()} ><Link to={"/signup"}>Signup</Link></button>
                    <button className='w-1/4 px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-md text-black font-semibold transition' onClick={() => setLoginModel()}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
