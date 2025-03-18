import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdHome, MdOutlineSubscriptions, MdHistory, MdOutlineWatchLater, MdPodcasts } from "react-icons/md";
import { SiYoutubeshorts, SiYoutubestudio, SiYoutubekids, SiYoutubemusic, SiYoutubegaming } from "react-icons/si";
import { PiUserSquareThin, PiFilmSlateLight, PiGraduationCap, PiLightbulbLight } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { FaChevronRight, FaYoutube, FaFire, FaRegNewspaper } from "react-icons/fa";
import { HiOutlineShoppingBag, HiOutlineMusicalNote } from "react-icons/hi2";
import { CgMediaLive, CgPlayList } from "react-icons/cg";
import { TfiCup } from "react-icons/tfi";
import { GoVideo } from "react-icons/go";
import { Link } from "react-router-dom";
import logo from "../../public/youtubeLogo.png"; // Your YouTube logo
import profile from "../../public/userProfile.jpg";

function ModalSidebar({ sideNavbar, setSideNavbar }) {
    const closeModal = () => setSideNavbar(false);

    // Example data arrays
    const sidebarItems = [
        { id: 1, name: "Home", icon: <MdHome /> },
        { id: 2, name: "Shorts", icon: <SiYoutubeshorts /> },
        { id: 3, name: "Subscriptions", icon: <MdOutlineSubscriptions /> },
    ];

    const sidebarItems2 = [
        { id: 1, name: "Your Channel", icon: <PiUserSquareThin /> },
        { id: 2, name: "History", icon: <MdHistory /> },
        { id: 3, name: "Playlists", icon: <CgPlayList /> },
        { id: 4, name: "Your Videos", icon: <GoVideo /> },
        { id: 5, name: "Watch later", icon: <MdOutlineWatchLater /> },
        { id: 6, name: "Liked videos", icon: <AiOutlineLike /> },
    ];

    const sidebarItems3 = [
        { id: 1, name: "Trending", icon: <FaFire /> },
        { id: 2, name: "Shopping", icon: <HiOutlineShoppingBag /> },
        { id: 3, name: "Music", icon: <HiOutlineMusicalNote /> },
        { id: 4, name: "Films", icon: <PiFilmSlateLight /> },
        { id: 5, name: "Live", icon: <CgMediaLive /> },
        { id: 6, name: "Gaming", icon: <SiYoutubegaming /> },
        { id: 7, name: "News", icon: <FaRegNewspaper /> },
        { id: 8, name: "Sport", icon: <TfiCup /> },
        { id: 9, name: "Courses", icon: <PiGraduationCap /> },
        { id: 10, name: "Fashion & beauty", icon: <PiLightbulbLight /> },
        { id: 11, name: "Podcasts", icon: <MdPodcasts /> },
    ];

    const sidebarItems4 = [
        { id: 1, name: "Youtube Premium", icon: <FaYoutube /> },
        { id: 2, name: "Youtube Studio", icon: <SiYoutubestudio /> },
        { id: 3, name: "Youtube Music", icon: <SiYoutubemusic /> },
        { id: 4, name: "Youtube Kids", icon: <SiYoutubekids /> },
    ];

    return (
        // Only show the modal sidebar on smaller screens, hidden on large+ (lg) screens
        <div className="lg:hidden">
            {sideNavbar && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>

                    {/* Sidebar container */}
                    <div className="relative w-72 bg-white h-full overflow-y-auto">
                        {/* Top bar inside the sidebar */}
                        <div className="flex items-center space-x-3 px-4 py-3 ">
                            <AiOutlineMenu className="text-xl cursor-pointer" onClick={closeModal} />

                            <div className="flex items-center space-x-1">
                                <Link to={"/"}>  <img src={logo} alt="YouTube Logo" className="w-28 cursor-pointer" /></Link>

                            </div>
                        </div>

                        {/* Scrollable sidebar content */}
                        <div className="p-4">
                            {/* Section 1 */}
                            <div className="space-y-3">
                                {sidebarItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
                                    >
                                        <div className="text-xl">{item.icon}</div>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>

                            <br />
                            <hr className="border-gray-300" />

                            {/* You */}
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center space-x-2">
                                    <h1>You</h1>
                                    <FaChevronRight />
                                </div>
                                {sidebarItems2.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
                                    >
                                        <div className="text-xl">{item.icon}</div>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>

                            <br />
                            <hr className="border-gray-300" />

                            {/* Subscriptions */}
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center space-x-2">
                                    <h1 className="font-semibold">Subscriptions</h1>
                                </div>
                                <div className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1">
                                    <div className="w-8 h-8 rounded-full overflow-hidden">
                                        <img src={profile} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <span>TechMan</span>
                                </div>
                            </div>

                            <br />
                            <hr className="border-gray-300" />

                            {/* Explore */}
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center space-x-2">
                                    <h1 className="font-semibold">Explore</h1>
                                </div>
                                {sidebarItems3.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
                                    >
                                        <div className="text-xl">{item.icon}</div>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>

                            <br />
                            <hr className="border-gray-300" />

                            {/* More From YouTube */}
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center space-x-2">
                                    <h1 className="font-semibold">More From YouTube</h1>
                                </div>
                                {sidebarItems4.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
                                    >
                                        <div className="text-xl text-red-500">{item.icon}</div>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                                <hr className="border-gray-300" />
                            </div>

                            <br />
                            <span className="text-xs text-gray-600 font-semibold">
                                About Press Copyright <br />
                                Contact us Creators <br />
                                Advertise Developers <br />
                                <p className="mt-3">Terms Privacy Policy &amp; Safety</p>
                                How YouTube works <br /> Test new features
                            </span>
                            <br />
                            <p className="text-xs text-gray-500 mt-3">© 2025 Google LLC</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalSidebar;
