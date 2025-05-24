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
    // Default user picture from local assets
    const [userPic, setUserPic] = useState(profile);
    // Toggle state for displaying the dropdown menu (user options)
    const [navbarModel, setNavbarModel] = useState(false);
    // Toggle state to show the Login component modal
    const [login, setLogin] = useState(false);
    // Track if a user is logged in by checking local storage
    const [isLogedIn, setIsLogedIn] = useState(false);
    // Holds the current value of the search input field for filtering videos
    const [searchQuery, setSearchQuery] = useState("");
    // Controls the display of the mobile search overlay
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const navigate = useNavigate();

    // Toggle the dropdown menu visibility for user options
    const handleClickModel = () => {
        setNavbarModel((prev) => !prev);
    };

    // Toggle the side navigation bar's visibility
    const sideNavBarFun = () => {
        setSideNavBarFun(!sideNavbar);
    };

    // Navigate to the user profile page and close the dropdown menu
    const handleProfile = () => {
        let id = localStorage.getItem("userId");
        navigate(`/user/${id}`);
        setNavbarModel(false);
    };

    // Closes the login modal
    const setLoginModel = () => {
        setLogin(false);
    };


    // Handle the click action from popup options.If "login" is clicked, shows the login modal.Otherwise, clears user data and logs out.
    function onClickOfPopUpOption(button) {
        setNavbarModel(false);

        if (button === "login") {
            setLogin(true);
        } else {
            // For logout, clear local storage and call logout API
            localStorage.clear();
            getLogoutFun();
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 2000);
        }
    }


    // Calls the logout API endpoint to log the user out.

    const getLogoutFun = async () => {
        axios
            .post("https://youtube-clone-new-bl7z.onrender.com/auth/logout", {}, { withCredentials: true })
            .then(() => {
                console.log("Logout successful");
            })
            .catch((error) => {
                console.log("Error during logout:", error);
            });
    };

    // On component mount, set the logged-in state and update the user profile picture from local storage (if exists)
    useEffect(() => {
        let userProfilePic = localStorage.getItem("userProfilePic");
        setIsLogedIn(localStorage.getItem("userId") !== null);
        if (userProfilePic !== null) {
            setUserPic(userProfilePic);
        }
    }, []);



    // Handles search functionality. Navigates to the homepage with the search query as a URL parameter.
    const handleSearch = () => {
        navigate(`/?q=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
    };

    return (
        <>
            {/* Fixed Navbar at the top */}
            <nav className="fixed top-0 w-full bg-white px-6 py-2 z-50 h-[60px]">
                <div className="flex justify-between items-center h-full">
                    {/* Left Section: Menu icon and Logo */}
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

                    {/* Mobile: Search Icon (visible only on small screens) */}
                    <div className="block sm:hidden">
                        <CiSearch
                            size="24px"
                            className="cursor-pointer"
                            onClick={() => setShowMobileSearch(true)}
                        />
                    </div>

                    {/* Right Section: User actions (logged in vs logged out) */}
                    {isLogedIn ? (
                        // When the user is logged in
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
                        // When the user is logged out
                        <div className="flex items-center space-x-2">
                            {/* Three-dot menu icon for additional options */}
                            <PiDotsThreeVertical className="text-gray-600 text-xl cursor-pointer" />
                            {/* Sign in button to open login modal */}
                            <button
                                className="flex items-center space-x-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition"
                                onClick={() => onClickOfPopUpOption("login")}
                            >
                                <PiUserCircle className="text-blue-500 text-xl" />
                                <span className="text-blue-600 font-medium">Sign in</span>
                            </button>
                        </div>
                    )}
                    {/* Conditionally render Login modal */}
                    {login && <Login setLoginModel={setLoginModel} />}
                </div>
            </nav>

            {/* Dropdown Modal Positioned below the navbar for user options */}
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

            {/* Mobile Search Overlay */}
            {showMobileSearch && (
                <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col">
                    {/* Top Bar with back arrow and search input */}
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
                        <button
                            className="px-4 py-2 border border-gray-400 bg-gray-100 rounded-r-full"
                            onClick={() => { handleSearch(); setShowMobileSearch(false); }}
                        >
                            <CiSearch size="24px" />
                        </button>
                        <IoMdMic
                            size="42px"
                            className="ml-3 bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
                        />
                    </div>
                    {/* Additional elements for mobile view can be added here if needed */}
                </div>
            )}
        </>
    );
}

export default Navbar;
