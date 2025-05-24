import React, { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import YouTubeLoader from '../component/YouTubeLoader';

const SignUp = () => {
    // Default profile image if user doesn't upload one
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");
    // State for channel banner URL
    const [uploadedBannerUrl, setUploadedBannerUrl] = useState("");
    // Loader state to indicate ongoing processes
    const [progressBar, setProgressBar] = useState(false);
    const navigate = useNavigate();

    // Initial sign-up form field values
    const [signUpField, setSignUpField] = useState({
        channelName: "",
        userName: "",
        email: "",
        password: "",
        about: "",
        profilePic: uploadedImageUrl,
        channelBanner: uploadedBannerUrl
    });

    // Update input fields dynamically
    const handleInputField = (event, name) => {
        setSignUpField({
            ...signUpField,
            [name]: event.target.value
        });
    };

    // Validate user inputs before sign up
    const validateFields = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!signUpField.channelName.trim()) {
            toast.error("Channel Name is required", { autoClose: 1500, transition: Bounce });
            return false;
        }
        if (!signUpField.userName.trim()) {
            toast.error("User Name is required", { autoClose: 1500, transition: Bounce });
            return false;
        }
        if (!signUpField.email.trim()) {
            toast.error("Email is required", { autoClose: 1500, transition: Bounce });
            return false;
        }
        if (!emailRegex.test(signUpField.email)) {
            toast.error("Please enter a valid email", { autoClose: 1500, transition: Bounce });
            return false;
        }
        if (!signUpField.password) {
            toast.error("Password is required", { autoClose: 1500, transition: Bounce });
            return false;
        }
        if (signUpField.password.length < 6) {
            toast.error("Password must be at least 6 characters long", { autoClose: 1500, transition: Bounce });
            return false;
        }
        if (!signUpField.about.trim()) {
            toast.error("About section is required", { autoClose: 1500, transition: Bounce });
            return false;
        }
        return true;
    };

    // Upload profile or banner image
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
            toast.error("Image upload failed. Please try again.", { autoClose: 1500, transition: Bounce });
            setProgressBar(false);
        }
    };

    // Handle sign up submission after validations
    const handleSignUp = async () => {
        if (!validateFields()) return;

        setProgressBar(true);
        axios.post("https://youtube-clone-new-bl7z.onrender.com/auth/signUp", signUpField)
            .then((res) => {
                console.log(res);
                // Show success message and navigate to login page
                toast.success("Registered successfully! Please login with your credentials.", { autoClose: 1500, transition: Bounce });
                setProgressBar(false);
                setTimeout(() => {
                    navigate("/login");
                }, 1600); // delay in milliseconds
            })
            .catch(err => {
                console.error(err);
                setProgressBar(false);
                toast.error("Sign up failed. Please try again.", { autoClose: 1500, transition: Bounce });
            });
    };



    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50'>
            <div className='w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 bg-white bg-opacity-90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg mt-4'>
                {/* Header */}
                <div className='flex items-center gap-3 text-gray-800 text-2xl font-semibold justify-center'>
                    <FaYoutube className='text-red-500 text-4xl' />
                    Sign Up
                </div>
                <div className='w-full flex flex-col items-center gap-4 mt-6'>
                    {/* Channel Name Input */}
                    <input
                        type='text'
                        placeholder='Channel Name'
                        value={signUpField.channelName}
                        onChange={(e) => handleInputField(e, "channelName")}
                        className='w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-red-500'
                    />
                    {/* User Name Input */}
                    <input
                        type='text'
                        placeholder='User Name'
                        value={signUpField.userName}
                        onChange={(e) => handleInputField(e, "userName")}
                        className='w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-red-500'
                    />
                    {/* Email Input */}
                    <input
                        type='email'
                        placeholder='Email'
                        value={signUpField.email}
                        onChange={(e) => handleInputField(e, "email")}
                        className='w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-red-500'
                    />
                    {/* Password Input */}
                    <input
                        type='password'
                        placeholder='Password'
                        value={signUpField.password}
                        onChange={(e) => handleInputField(e, "password")}
                        className='w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-red-500'
                    />
                    {/* About Channel Input */}
                    <textarea
                        placeholder='About Your Channel'
                        value={signUpField.about}
                        onChange={(e) => handleInputField(e, "about")}
                        className='w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-red-500'
                        rows={3}
                    />

                    {/* Profile Picture Upload */}
                    <div className='w-full flex flex-col items-center gap-2'>
                        <input
                            type='file'
                            onChange={(e) => uploadImage(e, "profile")}
                            className='w-full p-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md'
                        />
                        <div className='w-24 h-24 rounded-full overflow-hidden border border-gray-300'>
                            <img src={uploadedImageUrl} alt='User profile' className='w-full h-full object-cover' />
                        </div>
                    </div>

                    {/* Channel Banner Upload */}
                    <div className='w-full flex flex-col items-center gap-2'>
                        <input
                            type='file'
                            onChange={(e) => uploadImage(e, "banner")}
                            className='w-full p-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md'
                        />
                        {uploadedBannerUrl && <p className="text-xs text-gray-500">Banner uploaded successfully!</p>}
                    </div>
                    {/* Loader during upload or sign up */}
                    {progressBar && <YouTubeLoader />}
                </div>
                {/* Action Buttons */}
                <div className='w-full flex flex-col md:flex-row justify-between mt-6 gap-4'>
                    <button
                        onClick={handleSignUp}
                        className='w-full md:w-1/2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold transition'
                    >
                        Sign Up
                    </button>
                    <button className='w-full md:w-1/2 px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-md text-black font-semibold transition'>
                        <Link to={"/login"}>Login</Link>
                    </button>
                </div>
            </div>
            {/* Toast notifications container */}
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default SignUp;
