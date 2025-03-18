import React, { useState, useEffect } from "react";
import SideNavbar from "../component/SideNavbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const Profile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    // null because we need to pass object
    const [user, setUser] = useState(null);

    const fetchProfileData = async () => {
        axios.get(`http://localhost:3000/api/${id}/channel`).then((response) => {
            console.log(response);
            setData(response.data.video);
            setUser(response.data.video[0]?.user);
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        fetchProfileData()
    }, [])


    return (
        <div className="flex w-full pt-[60px] bg-white text-black">
            {/* Side Navbar */}
            <SideNavbar
                sideNavbar={sideNavbar}
                className="flex w-full pt-[60px] box-border"
            />

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
                    {/* Profile Picture */}
                    <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
                        <img
                            src={user?.profilePic}
                            alt="Profile"
                            className="w-full h-full rounded-full"
                        />
                    </div>

                    {/* Channel Info */}
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="text-xl md:text-3xl font-semibold">
                            {user?.channelName}
                        </h2>
                        <p className="text-sm md:text-base text-gray-600">
                            @{user?.userName} • {data?.length} videos
                        </p>
                        <p className="text-sm md:text-base text-gray-600">
                            {user?.about}
                        </p>
                        <div>
                            <button className="ml-4 bg-black text-white px-4 py-2 rounded-3xl hover:bg-gray-800">Subscribe</button>

                        </div>

                    </div>
                </div>

                {/* Video Section */}
                <div className="w-full mt-6 px-2">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
                        Videos
                    </h2>
                    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                        {data.map((video) => (
                            <Link to={`/watch/${video._id}`} key={video._id}>
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
