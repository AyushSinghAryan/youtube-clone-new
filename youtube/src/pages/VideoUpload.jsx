import React, { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import YouTubeLoader from '../component/YouTubeLoader';
const VideoUpload = () => {
    const [inputField, setInputField] = useState({ "title": "", "description": "", "videoLink": "", "thumbnail": "", "videoType": "" })
    const [loader, setLoader] = useState(false);
    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField, [name]: event.target.value
        })
    }

    const uploadImage = async (e, type) => {
        setLoader(true);
        console.log("Uploading")

        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // youtube-clone
        data.append("upload_preset", "youtube-clone");
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dgocdqfbe/${type}/upload`, data);
            const url = response.data.url;
            let val = type == "image" ? "thumbnail" : "videoLink";
            setLoader(false);

            setInputField({
                ...inputField, [val]: url
            })
            // here [val] is key so if key image

        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }

    console.log(inputField);

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 text-black p-4'>
            <div className='bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md'>
                <div className='flex flex-col items-center text-center'>
                    <FaYoutube className='text-red-500 text-6xl mb-2' />
                    <h2 className='text-xl font-semibold mb-4'>Upload Video</h2>
                </div>
                <div className='space-y-4'>
                    <input type='text' value={inputField.title} onChange={(e) => { handleOnChangeInput(e, "title") }} placeholder='Title of Video' className='w-full p-2 rounded-lg bg-gray-200 text-black outline-none focus:ring-2 focus:ring-red-500' />
                    <input type='text' value={inputField.description} onChange={(e) => { handleOnChangeInput(e, "description") }} placeholder='Description' className='w-full p-2 rounded-lg bg-gray-200 text-black outline-none focus:ring-2 focus:ring-red-500' />
                    <input type='text' value={inputField.videoType} onChange={(e) => { handleOnChangeInput(e, "videoType") }} placeholder='Category' className='w-full p-2 rounded-lg bg-gray-200 text-black outline-none focus:ring-2 focus:ring-red-500' />
                    <div className='flex flex-col space-y-2'>
                        <label className='text-gray-600'>Thumbnail</label>
                        <input type='file' accept='image/*' onChange={(e) => uploadImage(e, "image")} className='w-full p-2 rounded-lg bg-gray-200 text-black' />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label className='text-gray-600'>Video</label>
                        <input type='file' accept='video/mp4, video/webm, video/*' onChange={(e) => uploadImage(e, "video")} className='w-full p-2 rounded-lg bg-gray-200 text-black' />
                    </div>
                </div>
                {
                    loader && <div className='pt-4'><YouTubeLoader /></div>

                }

                <div className='flex justify-between mt-6'>
                    <button className='px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition'>Upload</button>
                    <Link to={"/"}>  <button className='px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-lg text-black font-semibold transition'>Home</button></Link>
                </div>
            </div>
        </div>
    );
};

export default VideoUpload;