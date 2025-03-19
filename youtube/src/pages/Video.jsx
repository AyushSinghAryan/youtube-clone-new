import React, { useEffect, useState, useRef } from 'react';
import { BiLike, BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsThreeDotsVertical } from "react-icons/bs";

function Video({ sideNavbar }) {
    const [comment, setComment] = useState("");
    const [showButtons, setShowButtons] = useState(false);
    const [videoUrl, setVideoURL] = useState("");
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [userPic, setUserPic] = useState(
        "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid"
    );
    const [openCommentMenuId, setOpenCommentMenuId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentMessage, setEditingCommentMessage] = useState("");
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const { id } = useParams();

    // Fetch the current video data
    const fetchVideoById = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/getVideoById/${id}`);
            setData(response.data.video);
            setVideoURL(response.data.video.videoLink);
        } catch (err) {
            console.log(err);
        }
    };

    // Fetch comments
    const getCommentByVideoId = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/commentApi/comment/${id}`);
            const sortedComments = response.data.comments.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setComments(sortedComments);
        } catch (err) {
            console.log(err);
        }
    };

    // Fetch all videos for suggestions and filter out the current video
    const fetchSuggestions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/allVideo/');
            // Exclude the current video from suggestions
            const availableVideos = response.data.videos.filter(video => video._id !== id);
            setSuggestions(availableVideos);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
        fetchSuggestions();
    }, [id]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCancel = () => {
        setComment("");
        setShowButtons(false);
    };

    const handleComment = async () => {
        const body = {
            video: id,
            message: comment,
        };
        try {
            const response = await axios.post(
                "http://localhost:3000/commentApi/comment/",
                body,
                { withCredentials: true }
            );
            const newComment = response.data.comment;
            setComments([newComment, ...comments]);
            setComment("");
        } catch (err) {
            console.log(err);
            toast.error("Please Sign In first to comment ", {
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

    useEffect(() => {
        const userProfilePic = localStorage.getItem("userProfilePic");
        if (userProfilePic !== null) {
            setUserPic(userProfilePic);
        }
        const userId = localStorage.getItem("userId");
        if (userId) {
            setLoggedInUserId(userId);
        }
    }, []);

    const toggleMenu = (commentId) => {
        if (openCommentMenuId === commentId) {
            setOpenCommentMenuId(null);
        } else {
            setOpenCommentMenuId(commentId);
        }
    };

    const handleEditComment = (commentItem) => {
        setEditingCommentId(commentItem._id);
        setEditingCommentMessage(commentItem.message);
        setOpenCommentMenuId(null);
    };

    const handleSaveComment = async (commentId) => {
        try {
            await axios.put(
                `http://localhost:3000/commentApi/comment/${commentId}`,
                { message: editingCommentMessage },
                { withCredentials: true }
            );
            setComments((prevComments) =>
                prevComments.map((c) =>
                    c._id === commentId ? { ...c, message: editingCommentMessage } : c
                )
            );
            setEditingCommentId(null);
            setEditingCommentMessage("");
            toast.success("Comment updated successfully", {
                position: "top-right",
                autoClose: 1000,
                transition: Bounce,
            });
        } catch (err) {
            console.log(err);
            toast.error("Error updating comment", {
                position: "top-right",
                autoClose: 1000,
                transition: Bounce,
            });
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(
                `http://localhost:3000/commentApi/comment/${commentId}`,
                { withCredentials: true }
            );
            setComments((prevComments) => prevComments.filter((c) => c._id !== commentId));
            toast.success("Comment deleted successfully", {
                position: "top-right",
                autoClose: 1000,
                transition: Bounce,
            });
        } catch (err) {
            console.log(err);
            toast.error("Error deleting comment", {
                position: "top-right",
                autoClose: 1000,
                transition: Bounce,
            });
        }
    };

    const getRelativeTime = (dateString) => {
        const createdDate = new Date(dateString);
        const currentDate = new Date();
        const diffTime = currentDate - createdDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? "Today" : `${diffDays} days ago`;
    };

    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load(); // This reloads the video when videoUrl changes.
        }
    }, [videoUrl]);

    return (
        <div className="pt-[60px] box-border p-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3">
                    <div className="w-full">
                        {data && (
                            <video ref={videoRef} className="w-full h-auto rounded-lg shadow" controls autoPlay>
                                <source src={videoUrl} type="video/mp4" />
                                <source src={videoUrl} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>

                    <div className="mt-4">
                        <h1 className="text-xl font-semibold mb-2">{data?.title}</h1>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <Link to={`/user/${data?.user?._id}`}>
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        src={data?.user?.profilePic}
                                        alt="Channel"
                                    />
                                </Link>
                                <div className="ml-4">
                                    <p className="font-semibold text-lg">{data?.user?.channelName}</p>
                                    <p className="text-sm text-gray-600">1.5M subscribers</p>
                                </div>
                                <button className="ml-4 bg-black text-white px-4 py-2 rounded-3xl hover:bg-gray-800">
                                    Subscribe
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="inline-flex items-center rounded-full bg-gray-200 text-gray-600 px-4 py-2">
                                    <button className="flex items-center space-x-1 hover:text-gray-800 focus:outline-none">
                                        <BiLike className="w-5 h-5" />
                                        <span className="text-sm font-medium">{data?.like}</span>
                                    </button>
                                    <div className="mx-2 h-5 w-px bg-gray-300" />
                                    <button className="flex items-center hover:text-gray-800 focus:outline-none">
                                        <BiDislike className="w-5 h-5" />
                                    </button>
                                </div>
                                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 bg-gray-200 px-3 py-2 rounded-3xl">
                                    <RiShareForwardLine className="w-6 h-6" />
                                    <span>Share</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 bg-gray-200 px-3 py-2 rounded-3xl">
                                    <LiaDownloadSolid className="w-6 h-6" />
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        {getRelativeTime(data?.createdAt)}
                        <p className="text-sm text-gray-700">
                            {data?.description}
                            <span className='font-bold hover:cursor-pointer'>...more</span>
                        </p>
                    </div>

                    {/* COMMENTS SECTION */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">
                            {comments?.length} Comments
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <img className="w-10 h-10 rounded-full" src={userPic} alt="User" />
                                <div className="w-full">
                                    <input
                                        type="text"
                                        className="w-full p-2 border-b-1 border-gray-300  focus:outline-none focus:border-b-2 focus:border-black"
                                        placeholder="Add a comment..."
                                        value={comment}
                                        onChange={handleCommentChange}
                                        onFocus={() => setShowButtons(true)}
                                    />
                                    {showButtons && (
                                        <div className="flex justify-end mt-2 space-x-2">
                                            <button
                                                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-2xl"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleComment}
                                                className="px-4 py-2 text-sm font-semibold rounded-2xl text-white bg-blue-500 hover:bg-blue-600"
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {comments.map((item) => (
                                <div className="flex items-start space-x-3" key={item._id}>
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={item?.user?.profilePic}
                                        alt="User"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-sm">
                                                {item?.user?.channelName} <span className='font-light text-xs'>{getRelativeTime(item?.createdAt)}</span>
                                            </p>
                                            {loggedInUserId === item?.user?._id && (
                                                <div className="relative inline-block text-left">
                                                    <button
                                                        onClick={() => toggleMenu(item._id)}
                                                        className="p-1 text-gray-500 hover:text-gray-700"
                                                    >
                                                        <BsThreeDotsVertical size={20} />
                                                    </button>
                                                    {openCommentMenuId === item._id && (
                                                        <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded shadow-lg">
                                                            <button
                                                                onClick={() => handleEditComment(item)}
                                                                className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteComment(item._id)}
                                                                className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {editingCommentId === item._id ? (
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    className="border p-1 w-full rounded"
                                                    value={editingCommentMessage}
                                                    onChange={(e) => setEditingCommentMessage(e.target.value)}
                                                />
                                                <div className="mt-1 space-x-2">
                                                    <button
                                                        onClick={() => handleSaveComment(item._id)}
                                                        className="px-3 py-1 bg-blue-500 text-white rounded"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditingCommentId(null);
                                                            setEditingCommentMessage("");
                                                        }}
                                                        className="px-3 py-1 bg-gray-300 text-black rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-600 mt-1">{item?.message}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Suggestions Sidebar */}
                <div className="md:w-1/3 md:ml-4 mt-6 md:mt-0">
                    <h2 className="text-lg font-semibold mb-4">Up Next</h2>
                    <div className="space-y-4">
                        {suggestions.map(video => (
                            <div key={video._id} className="flex">
                                <Link to={`/watch/${video._id}`}>
                                    <img
                                        className="w-48 h-28 object-cover rounded"
                                        src={video.thumbnail}
                                        alt="Video suggestion"
                                    />
                                </Link>
                                <div className="ml-3">
                                    <p className="text-sm font-semibold">{video.title}</p>
                                    <p className="text-xs text-gray-500">{video?.user?.channelName}</p>
                                    <p className="text-xs text-gray-500">
                                        {video.views} views • {getRelativeTime(video.createdAt)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Video;
