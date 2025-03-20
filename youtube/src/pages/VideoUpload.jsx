import React, { useEffect, useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import YouTubeLoader from '../component/YouTubeLoader';
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoUpload = () => {
    // these are videoUpload input fields initally empty we take as an object
    const [inputField, setInputField] = useState({
        title: "",
        description: "",
        videoLink: "",
        thumbnail: "",
        videoType: ""
    });

    const [loader, setLoader] = useState(false);
    // useNavigate use for routing 
    const navigate = useNavigate();
    // handleOnChangeInput takes event and name , name like input field
    const handleOnChangeInput = (event, name) => {
        // here we setting the value inside the input field
        setInputField({
            ...inputField,
            [name]: event.target.value
        });
    };
    // uploadImage use for image , video upload on the cloudinary 
    const uploadImage = async (e, type) => {
        setLoader(true);
        console.log("Uploading");

        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // youtube-clone
        data.append("upload_preset", "youtube-clone");
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dgocdqfbe/${type}/upload`, data);
            const url = response.data.url;
            let val = type === "image" ? "thumbnail" : "videoLink";
            setLoader(false);
            setInputField({
                ...inputField,
                [val]: url
            });
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };
    // useEffect for getting user id from local storage if user id null navigate user to homepage 
    useEffect(() => {
        let isLogin = localStorage.getItem("userId");
        if (isLogin === null) {
            navigate("/");
        }
    }, [navigate]);
    // use for form validations
    const handleSubmitFunction = async () => {
        // Validate that all fields are filled before uploading
        if (
            !inputField.title.trim() ||
            !inputField.description.trim() ||
            !inputField.videoType.trim() ||
            !inputField.thumbnail.trim() ||
            !inputField.videoLink.trim()
        ) {
            toast.error("Please fill in all fields before uploading.", {
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
            return;
        }
        setLoader(true);
        try {
            await axios.post("http://localhost:3000/api/video", inputField, { withCredentials: true });
            setLoader(false);
            toast.success("Video uploaded successfully", {
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
            navigate("/");
        } catch (error) {
            setLoader(false);
            toast.error("Video upload failed", {
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
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 text-black p-4'>
            <div className='bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md'>
                <div className='flex flex-col items-center text-center'>
                    <FaYoutube className='text-red-500 text-6xl mb-2' />
                    <h2 className='text-xl font-semibold mb-4'>Upload Video</h2>
                </div>
                <div className='space-y-4'>
                    <input
                        type='text'
                        value={inputField.title}
                        onChange={(e) => handleOnChangeInput(e, "title")}
                        placeholder='Title of Video'
                        className='w-full p-2 rounded-lg bg-gray-200 text-black outline-none focus:ring-2 focus:ring-red-500'
                    />
                    <input
                        type='text'
                        value={inputField.description}
                        onChange={(e) => handleOnChangeInput(e, "description")}
                        placeholder='Description'
                        className='w-full p-2 rounded-lg bg-gray-200 text-black outline-none focus:ring-2 focus:ring-red-500'
                    />
                    <input
                        type='text'
                        value={inputField.videoType}
                        onChange={(e) => handleOnChangeInput(e, "videoType")}
                        placeholder='Category'
                        className='w-full p-2 rounded-lg bg-gray-200 text-black outline-none focus:ring-2 focus:ring-red-500'
                    />
                    <div className='flex flex-col space-y-2'>
                        <label className='text-gray-600'>Thumbnail</label>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={(e) => uploadImage(e, "image")}
                            className='w-full p-2 rounded-lg bg-gray-200 text-black'
                        />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label className='text-gray-600'>Video</label>
                        <input
                            type='file'
                            accept='video/mp4, video/webm, video/*'
                            onChange={(e) => uploadImage(e, "video")}
                            className='w-full p-2 rounded-lg bg-gray-200 text-black'
                        />
                    </div>
                </div>
                {loader && <div className='pt-4'><YouTubeLoader /></div>}
                <div className='flex justify-between mt-6'>
                    <button
                        className='px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition'
                        onClick={handleSubmitFunction}
                    >
                        Upload
                    </button>
                    <Link to={"/"}>
                        <button className='px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-lg text-black font-semibold transition'>
                            Home
                        </button>
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default VideoUpload;
