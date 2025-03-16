import React from "react";
import SideNavbar from "../component/SideNavbar";
import { Link } from "react-router-dom";

const Profile = ({ sideNavbar }) => {
    const videos = [
        {
            id: 1,
            title: "Top 5 Government Internships 2025",
            thumbnail: "https://via.placeholder.com/300x200",
            views: "14K",
            uploadedTime: "2 days",
            duration: "6:15",
        },
        {
            id: 2,
            title: "NVIDIA Free Swags For Students & Developers",
            thumbnail: "https://via.placeholder.com/300x200",
            views: "8K",
            uploadedTime: "3 days",
            duration: "9:02",
        },
        {
            id: 3,
            title: "Google Cloud Facilitator Program 2025 | Free Swags",
            thumbnail: "https://via.placeholder.com/300x200",
            views: "10K",
            uploadedTime: "2 days",
            duration: "6:12",
        },
        {
            id: 4,
            title: "IBM Online Internships March 2025 | Summer Internship",
            thumbnail: "https://via.placeholder.com/300x200",
            views: "11K",
            uploadedTime: "4 days",
            duration: "5:41",
        },
        {
            id: 5,
            title: "Free TCS Internships for Arts, Commerce & Science Students",
            thumbnail: "https://via.placeholder.com/300x200",
            views: "7K",
            uploadedTime: "1 day",
            duration: "4:22",
        },
    ]
    return (
        <div className="flex w-full pt-[60px] bg-white text-black">
            {/* Side Navbar */}
            <SideNavbar sideNavbar={sideNavbar} className="flex w-full pt-[60px] box-border" />

            {/* Main Content */}
            <div className="flex flex-col flex-1 ml-[50px] mt-14 items-center overflow-x-hidden">
                {/* Profile Top Section */}
                <div className="w-full flex pb-5 border-b border-gray-300">
                    <div className="w-36 h-36">
                        <img
                            src="https://yt3.googleusercontent.com/a_1U9tYmozHPhZhsLiqqQ_XcYbhlmG_X1fsTdBWAHBjLmRN0haiv1xa_owiit7p8xyKDlMF1LXw=s900-c-k-c0x00ffffff-no-rj"
                            alt="Profile"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2 pl-4 w-4/5">
                        <h2 className="text-3xl font-semibold">Mr whoes the boss</h2>
                        <p className="text-gray-600">@user • 5 videos</p>
                        <p className="text-gray-600">About Section of channel</p>
                    </div>
                </div>

                {/* Video Section */}
                <div className="w-full mt-6">
                    <h2 className="text-2xl font-bold mb-4">Videos</h2>
                    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                        {videos.map((video) => (
                            <Link to={"/watch/23"}>
                                <div
                                    key={video.id}
                                    className="w-64 flex-shrink-0 bg-gray-100 rounded-lg shadow p-2"
                                >
                                    <div className="relative">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-auto rounded-md"
                                        />
                                        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
                                            {video.duration}
                                        </span>
                                    </div>
                                    <div className="mt-2 px-1">
                                        <h3 className="text-sm font-semibold line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {video.views} views • {video.uploadedTime} ago
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
