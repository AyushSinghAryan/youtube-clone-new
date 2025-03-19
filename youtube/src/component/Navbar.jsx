import { AiOutlineMenu, AiOutlineArrowLeft } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { PiSignOut, PiDotsThreeVertical, PiUserCircle } from "react-icons/pi";
import logo from "../../src/assets/youtubeLogo.png";
import profile from "../assets/userProfile.jpg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

function Navbar({ setSideNavBarFun, sideNavbar }) {
    const [userPic, setUserPic] = useState(profile);
    const [navbarModel, setNavbarModel] = useState(false);
    const [login, setLogin] = useState(false);
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");


    // NEW STATE for controlling mobile search overlay
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const navigate = useNavigate();

    const handleClickModel = () => {
        setNavbarModel((prev) => !prev);
    };

    const sideNavBarFun = () => {
        setSideNavBarFun(!sideNavbar);
    };

    const handleProfile = () => {
        let id = localStorage.getItem("userId");
        navigate(`/user/${id}`);
        setNavbarModel(false);
    };

    const setLoginModel = () => {
        setLogin(false);
    };

    function onClickOfPopUpOption(button) {
        setNavbarModel(false);

        if (button === "login") {
            setLogin(true);
        } else {
            localStorage.clear();
            getLogoutFun();
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 2000);
        }
    }

    const getLogoutFun = async () => {
        // POST to logout endpoint
        axios
            .post("http://localhost:3000/auth/logout", {}, { withCredentials: true })
            .then(() => {
                console.log("Logout");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        let userProfilePic = localStorage.getItem("userProfilePic");
        setIsLogedIn(localStorage.getItem("userId") !== null);
        if (userProfilePic !== null) {
            setUserPic(userProfilePic);
        }
    }, []);

    const handleSearch = () => {
        // Navigate to HomePage and include the search query as a URL parameter
        navigate(`/?q=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
    };
    return (
        <>
            {/* Fixed Navbar */}
            <nav className="fixed top-0 w-full bg-white px-6 py-2 z-50 h-[60px]">
                <div className="flex justify-between items-center h-full">
                    {/* Left Section: Menu & Logo */}
                    <div className="flex items-center space-x-4">
                        <AiOutlineMenu className="text-xl cursor-pointer" onClick={sideNavBarFun} />
                        <Link to={"/"}>
                            <img src={logo} alt="YouTube Logo" className="w-28 cursor-pointer" />
                        </Link>
                    </div>

                    {/* Center: Search Bar (hidden on small screens) */}
                    <div className="hidden sm:flex w-1/3 items-center">
                        <div className="flex-grow px-4 py-2 border border-gray-400 rounded-l-full">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                                className="w-full outline-none"
                            />
                        </div>
                        <button className="px-4 py-2 border border-gray-400 bg-gray-100 rounded-r-full" onClick={handleSearch}>
                            <CiSearch size="24px" />
                        </button>
                        <IoMdMic
                            size="42px"
                            className="ml-3 bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
                        />
                    </div>

                    {/* Small Screen: Search Icon (shown only on mobile) */}
                    <div className="block sm:hidden">
                        <CiSearch
                            size="24px"
                            className="cursor-pointer"
                            onClick={() => setShowMobileSearch(true)}
                        />
                    </div>

                    {/* Right Section: Conditionally Rendered */}
                    {isLogedIn ? (
                        // When user is logged in
                        <div className="flex items-center space-x-5">
                            <Link to={"/4545/upload"}>
                                <button
                                    type="button"
                                    className="inline-flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none transition-colors"
                                >
                                    <BiPlus className="w-5 h-5" />
                                    <span className="text-sm font-medium">Create</span>
                                </button>
                            </Link>
                            <AiOutlineBell className="text-2xl cursor-pointer" />
                            <div
                                className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                                onClick={handleClickModel}
                            >
                                <img
                                    src={userPic}
                                    alt="User Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ) : (
                        // When user is logged out
                        <div className="flex items-center space-x-2">
                            {/* Three-dot menu */}
                            <PiDotsThreeVertical className="text-gray-600 text-xl cursor-pointer" />

                            {/* Sign in button */}
                            <button
                                className="flex items-center space-x-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition"
                                onClick={() => onClickOfPopUpOption("login")}
                            >
                                <PiUserCircle className="text-blue-500 text-xl" />
                                <span className="text-blue-600 font-medium">Sign in</span>
                            </button>
                        </div>
                    )}
                    {login && <Login setLoginModel={setLoginModel} />}
                </div>
            </nav>

            {/* Dropdown Modal Positioned below the navbar */}
            {navbarModel && (
                <div className="fixed top-[60px] right-6 w-48 bg-white text-black shadow-lg rounded z-40">
                    {isLogedIn && (
                        <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleProfile}
                        >
                            Profile
                        </div>
                    )}
                    {isLogedIn && (
                        <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => onClickOfPopUpOption("logout")}
                        >
                            Sign out
                        </div>
                    )}
                    {!isLogedIn && (
                        <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => onClickOfPopUpOption("login")}
                        >
                            Login
                        </div>
                    )}
                </div>
            )}

            {/* MOBILE SEARCH OVERLAY */}
            {showMobileSearch && (
                <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col">
                    {/* Top Bar with back arrow and the search input */}
                    <div className="flex items-center px-2 py-2 border-b border-gray-300">
                        <AiOutlineArrowLeft
                            size="24px"
                            className="mr-2 cursor-pointer"
                            onClick={() => setShowMobileSearch(false)}
                        />
                        <div className="flex-grow px-2 py-2 border border-gray-400 rounded-l-full">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                        setShowMobileSearch(false);
                                    }
                                }}
                                className="w-full outline-none"
                            />

                        </div>
                        <button className="px-4 py-2 border border-gray-400 bg-gray-100 rounded-r-full" onClick={() => { handleSearch(); setShowMobileSearch(false); }}
                        >
                            <CiSearch size="24px" />
                        </button>
                        <IoMdMic
                            size="42px"
                            className="ml-3 bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
                        />
                    </div>
                    {/* If you need the rest of the screen blank, keep it empty or add other elements below */}
                </div>
            )}
        </>
    );
}

export default Navbar;
