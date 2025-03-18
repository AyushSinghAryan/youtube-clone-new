import React, { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import YouTubeLoader from '../component/YouTubeLoader';
const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");
    const [uploadedBannerUrl, setUploadedBannerUrl] = useState("");
    const [progressBar, setProgressBar] = useState(false);
    const navigate = useNavigate();

    const [signUpField, setSignUpField] = useState({
        channelName: "",
        userName: "",
        email: "",           // <-- New email field
        password: "",
        about: "",
        profilePic: uploadedImageUrl,
        channelBanner: uploadedBannerUrl
    });

    const handleInputField = (event, name) => {
        setSignUpField({
            ...signUpField,
            [name]: event.target.value
        });
    };

    console.log(signUpField);

    const uploadImage = async (e, type) => {
        console.log("Uploading", type);
        const files = e.target.files;
        if (!files.length) return;

        const data = new FormData();
        data.append('file', files[0]);
        data.append("upload_preset", "youtube-clone");

        try {
            setProgressBar(true);
            const response = await axios.post("https://api.cloudinary.com/v1_1/dgocdqfbe/image/upload", data);
            setProgressBar(false);
            const imageUrl = response.data.url;

            if (type === "profile") {
                setUploadedImageUrl(imageUrl);
                setSignUpField(prev => ({ ...prev, profilePic: imageUrl }));
            } else if (type === "banner") {
                setUploadedBannerUrl(imageUrl);
                setSignUpField(prev => ({ ...prev, channelBanner: imageUrl }));
            }

        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    console.log(uploadedBannerUrl);

    const handleSignUp = async () => {
        setProgressBar(true);

        // we pass signUpField as a body
        axios.post("http://localhost:3000/auth/signUp", signUpField).then((res) => {
            console.log(res)
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            setProgressBar(false);
            navigate("/");

        }).catch(err => {
            console.log(err);
            setProgressBar(false);
            toast.error(err, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })


        })
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center p-4'>
            <div className='w-full max-w-lg bg-transparent backdrop-blur-lg p-8 rounded-lg shadow-2xl flex flex-col items-center'>
                <div className='flex items-center gap-3 text-gray-800 text-2xl font-semibold'>
                    <FaYoutube className='text-red-500 text-4xl' />
                    Sign Up
                </div>
                <div className='w-full flex flex-col items-center gap-4 mt-6'>
                    <input
                        type='text'
                        placeholder='Channel Name'
                        value={signUpField.channelName}
                        onChange={(e) => handleInputField(e, "channelName")}
                        className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500'
                    />
                    <input
                        type='text'
                        placeholder='User Name'
                        value={signUpField.userName}
                        onChange={(e) => handleInputField(e, "userName")}
                        className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500'
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        value={signUpField.email}
                        onChange={(e) => handleInputField(e, "email")}
                        className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={signUpField.password}
                        onChange={(e) => handleInputField(e, "password")}
                        className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500'
                    />
                    <input
                        type='text'
                        placeholder='About Your Channel'
                        value={signUpField.about}
                        onChange={(e) => handleInputField(e, "about")}
                        className='w-3/4 p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 outline-none focus:ring-2 focus:ring-red-500'
                    />

                    {/* Profile Picture Upload */}
                    <div className='w-3/4 flex flex-col items-center gap-2'>
                        <input
                            type='file'
                            onChange={(e) => uploadImage(e, "profile")}
                            className='w-full p-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md'
                        />
                        <div className='w-24 h-24 rounded-full overflow-hidden border border-gray-300'>
                            <img src={uploadedImageUrl} alt='User profile' className='w-full h-full object-cover' />
                        </div>
                    </div>

                    {/* Channel Banner Upload (No Preview) */}
                    <div className='w-3/4 flex flex-col items-center gap-2'>
                        <input
                            type='file'
                            onChange={(e) => uploadImage(e, "banner")}
                            className='w-full p-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md'
                        />
                        {uploadedBannerUrl && <p className="text-xs text-gray-500">Banner uploaded successfully!</p>}
                    </div>
                    {progressBar && <YouTubeLoader />}
                </div>
                <div className='w-3/4 flex justify-between mt-6'>
                    <button onClick={handleSignUp} className='w-1/3 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold transition'>
                        Sign Up
                    </button>
                    <button className='w-1/3 px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-md text-black font-semibold transition'>
                        <Link to={"/"}>Home Page</Link>
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
