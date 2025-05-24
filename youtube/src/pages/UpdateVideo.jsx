import React, { useEffect, useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import YouTubeLoader from '../component/YouTubeLoader';
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateVideo = () => {
    const { id } = useParams();
    const [inputField, setInputField] = useState({
        title: "",
        description: "",
        videoLink: "",
        thumbnail: "",
        videoType: ""
    });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await axios.get(`https://youtube-clone-new-bl7z.onrender.com/api/getVideoById/${id}`);
                const video = response.data.video;
                setInputField({
                    title: video.title,
                    description: video.description,
                    videoLink: video.videoLink,
                    thumbnail: video.thumbnail,
                    videoType: video.videoType
                });
            } catch (error) {
                console.error("Error fetching video details", error);
            }
        };
        fetchVideoDetails();
    }, [id]);

    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField,
            [name]: event.target.value
        });
    };

    const handleUpdate = async () => {
        // Validate that all fields are filled before updating
        if (
            !inputField.title.trim() ||
            !inputField.description.trim() ||
            !inputField.videoType.trim() ||
            !inputField.thumbnail.trim() ||
            !inputField.videoLink.trim()
        ) {
            toast.error("Please fill in all fields before updating.", {
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
            await axios.put(`https://youtube-clone-new-bl7z.onrender.com/api/video/${id}`, inputField, { withCredentials: true });
            setLoader(false);
            toast.success("Video updated successfully", {
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
            navigate(`/watch/${id}`);
        } catch (error) {
            setLoader(false);
            toast.error("Video update failed", {
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
                    <h2 className='text-xl font-semibold mb-4'>Update Video</h2>
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
                    {/* You can add file inputs for updating thumbnail or video if required */}
                </div>
                {loader && <div className='pt-4'><YouTubeLoader /></div>}
                <div className='flex justify-between mt-6'>
                    <button
                        className='px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition'
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                    <Link to={`/watch/${id}`}>
                        <button className='px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-lg text-black font-semibold transition'>
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateVideo;
