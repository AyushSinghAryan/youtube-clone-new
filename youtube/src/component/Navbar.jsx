import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import logo from "../../public/youtubeLogo.png";
import profile from "../../public/userProfile.jpg";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

function Navbar({ setSideNavBarFun, sideNavbar }) {
    const [userPic] = useState(profile);
    const [navbarModel, setNavbarModel] = useState(false);
    const [login, setLogin] = useState(false);

    const navigate = useNavigate();

    const handleClickModel = () => {
        setNavbarModel((prev) => !prev);
    };

    const sideNavBarFun = () => {
        setSideNavBarFun(!sideNavbar);
    }
    const handleProfile = () => {
        navigate("/user/56565");
        setNavbarModel(false)
    }
    const setLoginModel = () => {
        setLogin(false);
    }

    function onClickOfPopUpOption(button) {
        setNavbarModel(false)

        if (button == "login") {
            setLogin(true);
        } else {

        }
    }

    return (
        <>
            {/* Fixed Navbar with a set height */}
            <nav className="fixed top-0 w-full bg-white px-6 py-2 z-50 h-[60px]">
                <div className="flex justify-between items-center h-full">
                    {/* Left Section: Menu & Logo */}
                    <div className="flex items-center space-x-4">
                        <AiOutlineMenu className="text-xl cursor-pointer" onClick={sideNavBarFun} />
                        <Link to={"/"}> <img src={logo} alt="YouTube Logo" className="w-28 cursor-pointer" /></Link>
                    </div>
                    {/* Center: Search Bar (hidden on small screens) */}
                    <div className="hidden sm:flex w-1/3 items-center ">
                        <div className="flex-grow px-4 py-2 border border-gray-400 rounded-l-full">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full outline-none"
                            />
                        </div>
                        <button className="px-4 py-2 border border-gray-400 bg-gray-100 rounded-r-full">
                            <CiSearch size="24px" />
                        </button>
                        <IoMdMic
                            size="42px"
                            className="ml-3 bg-gray-100  rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
                        />
                    </div>
                    {/* Right Section: Icons & Profile */}
                    <div className="flex items-center space-x-5">
                        <Link to={"/4545/upload"}>  <button
                            type="button"
                            className="inline-flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none transition-colors"
                        >
                            <BiPlus className="w-5 h-5" />
                            <span className="text-sm font-medium">Create</span>
                        </button></Link>
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
                    {
                        login && <Login setLoginModel={setLoginModel} />
                    }
                </div>

            </nav>

            {/* Dropdown Modal Positioned below the navbar */}
            {navbarModel && (
                <div className="fixed top-[60px] right-6 w-48 bg-white text-black shadow-lg rounded z-40">
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleProfile}>Profile</div>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onClickOfPopUpOption("logout")}>Logout</div>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onClickOfPopUpOption("login")}>Login</div>
                </div>
            )}
        </>
    );
}

export default Navbar;
