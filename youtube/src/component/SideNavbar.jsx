import React from "react";
import { MdHome } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdHistory } from "react-icons/md";
import { PiUserSquareThin } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubestudio } from "react-icons/si";
import { SiYoutubekids } from "react-icons/si";
import { MdOutlineWatchLater } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { SiTrendmicro } from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiFilmSlateLight } from "react-icons/pi";
import { CgMediaLive } from "react-icons/cg";
import { FaRegNewspaper } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { PiLightbulbLight } from "react-icons/pi";
import { SiStylelint } from "react-icons/si";
import { MdPodcasts } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { GiLinkedRings } from "react-icons/gi";
import { CgPlayList } from "react-icons/cg";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { PiGraduationCap } from "react-icons/pi";
import { SiYoutubegaming } from "react-icons/si";
import profile from "../../src/assets/userProfile.jpg";

import { FaFire } from "react-icons/fa6";

function SideNavbar({ sideNavbar }) {
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
            icon: <GoVideo />,
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
            <div className={sideNavbar ? "px-6 w-[17%] h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden" : "hidden"}>
                <div className=" space-y-3 items-center">
                    {sidebarItems.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
                            >
                                <div className="text-xl cursor-pointer">{item.icon}</div>
                                <span className="cursor-pointer">{item.name}</span>
                            </div>
                        );
                    })}
                </div>
                <br />
                <hr className="border-gray-300" />
                {/* You */}
                <div className="mt-4 space-y-3 items-center">
                    <div className="flex items-center space-x-2">
                        <h1>You</h1>
                        <FaChevronRight />
                    </div>
                    {sidebarItems2.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
                            >
                                <div className="text-xl cursor-pointer">{item.icon}</div>
                                <span className="cursor-pointer">{item.name}</span>
                            </div>
                        );
                    })}
                </div>
                <br />
                <hr className="border-gray-300" />
                <div className="mt-4 space-y-3 items-center">
                    <div className="items-center space-x-2">
                        <h1 className=" font-semibold">Subscriptions</h1>
                    </div>
                    <div
                        className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
                    >
                        <div className="w-8 h-8 rounded-full cursor-pointer overflow-hidden">
                            <img src={profile} alt="" className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="cursor-pointer">TechMan</span>
                    </div>
                </div>
                <br />
                <hr className="border-gray-300" />
                {/* Explore */}
                <div className="mt-4 space-y-3 items-center">
                    <div className="items-center space-x-2">
                        <h1 className=" font-semibold">Explore</h1>
                    </div>
                    {sidebarItems3.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
                            >
                                <div className="text-xl cursor-pointer text-black">{item.icon}</div>
                                <span className="cursor-pointer">{item.name}</span>
                            </div>
                        );
                    })}
                </div>
                <br />
                <hr className="border-gray-300" />
                <div className="mt-4 space-y-3 items-center">
                    <div className="items-center space-x-2">
                        <h1 className=" font-semibold">More From Youtube</h1>
                    </div>
                    {sidebarItems4.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
                            >
                                <div className="text-xl cursor-pointer text-red-500">
                                    {item.icon}
                                </div>
                                <span className="cursor-pointer">{item.name}</span>
                            </div>
                        );
                    })}
                    <hr className="border-gray-300" />
                </div>
                <br />
                <span className="text-xs text-gray-600 font-semibold">
                    About Press Copyright <br /> Contact us Creators <br /> Advertise
                    Developers <br />
                    <p className="mt-3">Terms Privacy Policy & Safety</p> How YouTube works{" "}
                    <br /> Test new features
                </span>
                <br />
                <p className="text-xs text-gray-500 mt-3">© 2025 Google LLC</p>

            </div>
        </>
    )
}
export default SideNavbar;