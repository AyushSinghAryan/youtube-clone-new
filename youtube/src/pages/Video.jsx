import React, { useEffect, useState } from 'react';
import { BiLike, BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Video({ sideNavbar }) {
    const [comment, setComment] = useState("");
    // commet are message
    const [showButtons, setShowButtons] = useState(false);
    // http://localhost:3000/api/getVideoById/
    // intially video is object not array so we can get video
    const [videoUrl, setVideoURL] = useState("");
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [userPic, setUserPic] = useState("https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid");


    const { id } = useParams();

    const fetchVideoById = async () => {
        await axios.get(`http://localhost:3000/api/getVideoById/${id}`).then(
            (response) => {
                setData(response.data.video);
                setVideoURL(response?.data?.video.videoLink)
            }
        ).catch(err => {
            console.log(err);


        })
    }

    const getCommentByVideoId = async () => {
        await axios.get(`http://localhost:3000/commentApi/comment/${id}`).then(
            (response) => {
                setComments(response.data.comments)
            }
        ).catch(err => {
            console.log(err);


        })
    }


    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [])
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCancel = () => {
        setComment("");
        setShowButtons(false);
    };

    const handleComment = async () => {
        const body = {
            "video": id,
            "message": comment

        }
        await axios.post("http://localhost:3000/commentApi/comment/", body, { withCredentials: true }).then((response) => {
            console.log(response)
            const newComment = response.data.comment;
            setComments([newComment, ...comments]);
            setComment("");
        }).catch(err => {
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
            })
        })
    }
    useEffect(() => {
        let userProfilePic = localStorage.getItem("userProfilePic");
        if (userProfilePic !== null) {
            setUserPic(userProfilePic);
        }
    }, []);
    return (
        <div className="pt-[60px] box-border p-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3">
                    <div className="w-full">
                        {data &&
                            <video className="w-full h-auto rounded-lg shadow" controls autoPlay>
                                <source src={videoUrl} type="video/mp4" />
                                <source src={videoUrl} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                        }
                    </div>

                    <div className="mt-4">
                        <h1 className="text-xl font-semibold mb-2">{data?.title}</h1>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Link to={`/user/${data?.user?._id}`}>      <img className="w-12 h-12 rounded-full" src={data?.user?.profilePic} alt="Channel" /></Link>
                                <div className="ml-4">
                                    <p className="font-semibold text-lg">{data?.user?.channelName}</p>
                                    <p className="text-sm text-gray-600">1.5M subscribers</p>
                                </div>
                                <button className="ml-4 bg-black text-white px-4 py-2 rounded-3xl hover:bg-gray-800">Subscribe</button>
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
                        {data?.createdAt.slice(0, 10)}

                        <p className="text-sm text-gray-700">
                            {data?.description}
                        </p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2"> {comments?.length} Comments</h2>
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
                                            <button onClick={handleComment}
                                                className="px-4 py-2 text-sm font-semibold rounded-2xl text-white bg-blue-500  hover:bg-blue-600"
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>




                            {
                                comments.map((item, index) => {
                                    return (
                                        <div className="flex">
                                            <img className="w-10 h-10 rounded-full" src={item?.user?.profilePic} alt="User" />
                                            <div className="ml-3">
                                                <p className="font-semibold text-sm">{item?.user?.channelName}</p>
                                                <p className="text-sm text-gray-600">{item?.message}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>


                    </div>
                </div>
                {/* Suggestions Sidebar */}
                <div className="md:w-1/3 md:ml-4 mt-6 md:mt-0">
                    <h2 className="text-lg font-semibold mb-4">Up Next</h2>
                    <div className="space-y-4">
                        {/* Suggestion Card 1 */}
                        <div className="flex">
                            <img
                                className="w-48 h-28 object-cover rounded"
                                src="https://www.tubefilter.com/wp-content/uploads/2022/07/mr-whose-the-boss-mrbeast-1280x720.jpg"
                                alt="Video suggestion"
                            />
                            <div className="ml-3">
                                <p className="text-sm font-semibold">Suggested Video Title</p>
                                <p className="text-xs text-gray-500">Channel Name</p>
                                <p className="text-xs text-gray-500">500K views • 1 week ago</p>
                            </div>
                        </div>
                        {/* Suggestion Card 2 */}
                        <div className="flex">
                            <img
                                className="w-48 h-28 object-cover rounded"
                                src="https://via.placeholder.com/320x180"
                                alt="Video suggestion"
                            />
                            <div className="ml-3">
                                <p className="text-sm font-semibold">Another Video Title</p>
                                <p className="text-xs text-gray-500">Channel Name</p>
                                <p className="text-xs text-gray-500">300K views • 2 weeks ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Video;
