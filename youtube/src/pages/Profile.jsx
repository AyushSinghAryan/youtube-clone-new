import React, { useState, useEffect } from "react";
import SideNavbar from "../component/SideNavbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalSidebar from "../component/ModalSideNavbar";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const Profile = ({ sideNavbar, setSideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();
    // Assume that your authenticated user's ID is stored in localStorage
    const loggedUserId = localStorage.getItem("userId");

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/${id}/channel`);
            setData(response.data.video);
            setUser(response.data.video[0]?.user);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    // Navigate to update page
    const handleEdit = (videoId) => {
        navigate(`/${videoId}/update`);
    };

    // Delete video and update UI
    const handleDelete = async (videoId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this video?");
        if (!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:3000/api/video/${videoId}`, { withCredentials: true });
            // Remove the deleted video from state
            setData(prevData => prevData.filter(video => video._id !== videoId));
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    return (
        <div className="flex w-full pt-[60px] bg-white text-black">
            {/* Side Navbar */}
            <SideNavbar sideNavbar={sideNavbar} className="flex w-full pt-[60px] box-border" />
            <ModalSidebar sideNavbar={sideNavbar} setSideNavbar={setSideNavbar} />

            {/* Main Content */}
            <div className="flex flex-col flex-1 ml-[50px] items-center overflow-x-hidden">
                {/* Banner Section */}
                <div className="relative w-full h-[100px] sm:h-[140px] md:h-[180px] lg:h-[200px] xl:h-[240px] overflow-hidden pr-2">
                    <img
                        src={user?.channelBanner}
                        alt="YouTube Banner"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                {/* Profile Top Section */}
                <div className="w-full flex items-center pb-5 border-b border-gray-300 mt-4 px-2 space-x-4">
                    <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
                        <img src={user?.profilePic} alt="Profile" className="w-full h-full rounded-full" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="text-xl md:text-3xl font-semibold">{user?.channelName}</h2>
                        <p className="text-sm md:text-base text-gray-600">
                            @{user?.userName} • {data?.length} videos
                        </p>
                        <p className="text-sm md:text-base text-gray-600">{user?.about}</p>
                        <div>
                            <button className="ml-4 bg-black text-white px-4 py-2 rounded-3xl hover:bg-gray-800">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Video Section */}
                <div className="w-full mt-6 px-2">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Videos</h2>
                    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                        {data.map((video) => (
                            <div key={video._id} className="relative group">
                                <Link to={`/watch/${video._id}`}>
                                    <div className="w-48 sm:w-56 md:w-64 flex-shrink-0 bg-gray-100 rounded-lg shadow p-2">
                                        <div className="relative">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-auto rounded-md"
                                            />
                                            <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
                                                {"6:15"}
                                            </span>
                                        </div>
                                        <div className="mt-2 px-1">
                                            <h3 className="text-xs sm:text-sm md:text-base font-semibold line-clamp-2">
                                                {video.title}
                                            </h3>
                                            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1">
                                                {"10k"} views • {video.createdAt.slice(0, 10)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                {/* Show dropdown only if the logged in user is the owner */}
                                {video.user._id === loggedUserId && (
                                    <div className="absolute top-2 right-2">
                                        <PiDotsThreeOutlineVerticalFill
                                            className="cursor-pointer"
                                            onClick={() =>
                                                setActiveDropdown(activeDropdown === video._id ? null : video._id)
                                            }
                                        />
                                        {activeDropdown === video._id && (
                                            <div className="absolute right-0 mt-2 w-28 bg-white shadow-md rounded-md border border-gray-200 z-10">
                                                <button
                                                    onClick={() => handleEdit(video._id)}
                                                    className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(video._id)}
                                                    className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
