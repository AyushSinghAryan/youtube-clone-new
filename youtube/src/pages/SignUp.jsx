import React, { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from "axios";
const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");

    const [singUpFiled, setSignUpField] = useState({
        "channelName": "",
        "userName": "",
        "password": "",
        "about": "",
        "profilePic": uploadedImageUrl
    });


    const handleInputFiled = (event, name) => {
        setSignUpField({
            ...singUpFiled, [name]: event.target.value
        })
    }
    console.log(singUpFiled);


    const uploadImage = async (e) => {
        console.log("Uploading")

        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // youtube-clone
        data.append("upload_preset", "youtube-clone");
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dgocdqfbe/image/upload", data);
            console.log(response);
            const imageUrl = response.data.url;
            setUploadedImageUrl(imageUrl);
            setSignUpField({
                ...singUpFiled, "profilePic": imageUrl
            })


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center p-4'>
            <div className='w-full max-w-lg bg-transparent backdrop-blur-lg p-8 rounded-lg shadow-2xl flex flex-col items-center'>
                <div className='flex items-center gap-3 text-gray-800 text-2xl font-semibold'>
                    <FaYoutube className='text-red-500 text-4xl' />
                    Sign Up
                </div>
                <div className='w-full flex flex-col items-center gap-4 mt-6'>
                    <input type='text' placeholder='Channel Name' value={singUpFiled.channelName} onChange={(e) => { handleInputFiled(e, "channelName") }} className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500' />
                    <input type='text' placeholder='User Name' value={singUpFiled.userName} onChange={(e) => { handleInputFiled(e, "userName") }} className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500' />
                    <input type='password' placeholder='Password' value={singUpFiled.password} onChange={(e) => { handleInputFiled(e, "password") }} className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500' />
                    <input type='text' placeholder='About Your Channel' value={singUpFiled.about} onChange={(e) => { handleInputFiled(e, "about") }} className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500' />

                    <div className='w-3/4 flex flex-col items-center gap-2'>
                        <input type='file' onChange={(e) => uploadImage(e)} className='w-full p-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md' />
                        <div className='w-24 h-24 rounded-full overflow-hidden border border-gray-300'>
                            <img src={uploadedImageUrl} alt='User profile' className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
                <div className='w-3/4 flex justify-between mt-6'>
                    <button className='w-1/3 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold transition'>Sign Up</button>
                    <button className='w-1/3 px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-md text-black font-semibold transition'><Link to={"/"}>Home Page</Link></button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;