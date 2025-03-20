import React from "react";
import { Link } from "react-router-dom";
// Importing various icons from react-icons library
import { MdHome } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdHistory, MdOutlineWatchLater, MdPodcasts } from "react-icons/md";
import { PiUserSquareThin, PiFilmSlateLight, PiGraduationCap, PiLightbulbLight } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { FaChevronRight, FaYoutube, FaRegNewspaper, FaFire } from "react-icons/fa";
import { SiYoutubestudio, SiYoutubekids, SiYoutubemusic, SiYoutubegaming } from "react-icons/si";
import { CgMediaLive, CgPlayList } from "react-icons/cg";
import { HiOutlineShoppingBag, HiOutlineMusicalNote } from "react-icons/hi2";
import { TfiCup } from "react-icons/tfi";
import { SiTrendmicro, SiStylelint } from "react-icons/si";
import { GiLinkedRings } from "react-icons/gi";
import profile from "../../src/assets/userProfile.jpg";

function SideNavbar({ sideNavbar }) {
    // Define the first section of sidebar items (primary navigation)
    const sidebarItems = [
        {
            id: 1,
            name: "Home",
            icon: <MdHome />,
        },
        {
            id: 2,
            name: "Shorts",
            icon: <SiYoutubeshorts />,
        },
        {
            id: 3,
            name: "Subscriptions",
            icon: <MdOutlineSubscriptions />,
        },
    ];

    // Define the second section of sidebar items (user-related options)
    const sidebarItems2 = [
        {
            id: 1,
            name: "Your Channel",
            icon: <PiUserSquareThin />,
        },
        {
            id: 2,
            name: "History",
            icon: <MdHistory />,
        },
        {
            id: 3,
            name: "Playlists",
            icon: <CgPlayList />,
        },
        {
            id: 4,
            name: "Your Videos",
            icon: <FaYoutube />,
        },
        {
            id: 5,
            name: "Watch later",
            icon: <MdOutlineWatchLater />,
        },
        {
            id: 6,
            name: "Liked videos",
            icon: <AiOutlineLike />,
        },
    ];

    // Define the third section of sidebar items (explore section)
    const sidebarItems3 = [
        {
            id: 1,
            name: "Trending",
            icon: <FaFire />,
        },
        {
            id: 2,
            name: "Shopping",
            icon: <HiOutlineShoppingBag />,
        },
        {
            id: 3,
            name: "Music",
            icon: <HiOutlineMusicalNote />,
        },
        {
            id: 4,
            name: "Films",
            icon: <PiFilmSlateLight />,
        },
        {
            id: 5,
            name: "Live",
            icon: <CgMediaLive />,
        },
        {
            id: 6,
            name: "Gaming",
            icon: <SiYoutubegaming />,
        },
        {
            id: 7,
            name: "News",
            icon: <FaRegNewspaper />,
        },
        {
            id: 8,
            name: "Sport",
            icon: <TfiCup />,
        },
        {
            id: 9,
            name: "Courses",
            icon: <PiGraduationCap />,
        },
        {
            id: 10,
            name: "Fashion & beauty",
            icon: <PiLightbulbLight />,
        },
        {
            id: 11,
            name: "Padcasts",
            icon: <MdPodcasts />,
        },
    ];

    // Define the fourth section of sidebar items (additional YouTube services)
    const sidebarItems4 = [
        {
            id: 1,
            name: "Youtube Premium",
            icon: <FaYoutube />,
        },
        {
            id: 2,
            name: "Youtube Studio",
            icon: <SiYoutubestudio />,
        },
        {
            id: 3,
            name: "Youtube Music",
            icon: <SiYoutubemusic />,
        },
        {
            id: 4,
            name: "Youtube Kids",
            icon: <SiYoutubekids />,
        },
    ];

    return (
        <>
            {/* Conditionally render the side navbar based on the sideNavbar prop */}
            <div className={sideNavbar ? "px-6 w-[17%] h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden" : "hidden"}>
                {/* Primary Navigation Section */}
                <div className="space-y-3 items-center">
                    {sidebarItems.map((item) => {
                        // Wrap the Home item with Link to navigate to "/"
                        if (item.name === "Home") {
                            return (
                                <Link to="/" key={item.id}>
                                    <div className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1">
                                        <div className="text-xl cursor-pointer">{item.icon}</div>
                                        <span className="cursor-pointer">{item.name}</span>
                                    </div>
                                </Link>
                            );
                        }
                        // Render other items normally or add Link if needed in the future
                        return (
                            <div key={item.id} className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1">
                                <div className="text-xl cursor-pointer">{item.icon}</div>
                                <span className="cursor-pointer">{item.name}</span>
                            </div>
                        );
                    })}
                </div>
                <br />
                <hr className="border-gray-300" />

                {/* User Section */}
                <div className="mt-4 space-y-3 items-center">
                    <div className="flex items-center space-x-2">
                        <h1>You</h1>
                        <FaChevronRight />
                    </div>
                    {sidebarItems2.map((item) => {
                        return (
                            <div key={item.id} className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1">
                                <div className="text-xl cursor-pointer">{item.icon}</div>
                                <span className="cursor-pointer">{item.name}</span>
                            </div>
                        );
                    })}
                </div>
                <br />
                <hr className="border-gray-300" />

                {/* Subscriptions Section */}
                <div className="mt-4 space-y-3 items-center">
                    <div className="items-center space-x-2">
                        <h1 className="font-semibold">Subscriptions</h1>
                    </div>
                    <div className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1">
                        <div className="w-8 h-8 rounded-full cursor-pointer overflow-hidden">
                            <img src={profile} alt="User Profile" className="w-full h-full object-cover" />
                        </div>
                        <span className="cursor-pointer">TechMan</span>
                    </div>
                </div>
                <br />
                <hr className="border-gray-300" />

                {/* Explore Section */}
                <div className="mt-4 space-y-3 items-center">
                    <div className="items-center space-x-2">
                        <h1 className="font-semibold">Explore</h1>
                    </div>
                    {sidebarItems3.map((item) => {
                        return (
                            <div key={item.id} className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1">
                                <div className="text-xl cursor-pointer text-black">{item.icon}</div>
                                <span className="cursor-pointer">{item.name}</span>
                            </div>
                        );
                    })}
                </div>
                <br />
                <hr className="border-gray-300" />

                {/* More From Youtube Section */}
                <div className="mt-4 space-y-3 items-center">
                    <div className="items-center space-x-2">
                        <h1 className="font-semibold">More From Youtube</h1>
                    </div>
                    {sidebarItems4.map((item) => {
                        return (
                            <div key={item.id} className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1">
                                <div className="text-xl cursor-pointer text-red-500">{item.icon}</div>
                                <span className="cursor-pointer">{item.name}</span>
                            </div>
                        );
                    })}
                    <hr className="border-gray-300" />
                </div>
                <br />

                {/* Footer Section with links and copyright */}
                <span className="text-xs text-gray-600 font-semibold">
                    About Press Copyright <br /> Contact us Creators <br /> Advertise
                    Developers <br />
                    <p className="mt-3">
                        Terms Privacy Policy & Safety
                        <br /> How YouTube works <br /> Test new features
                    </p>
                </span>
                <br />
                <p className="text-xs text-gray-500 mt-3">© 2025 Google LLC</p>
            </div>
        </>
    );
}

export default SideNavbar;
