import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

function HomePage({ sideNavbar }) {
    //here showing list of categories 
    const categories = [
        "All",
        "Music",
        "Gaming",
        "News",
        "Movies",
        "Live",
        "Cartoon",
        "Podcasts",
        "Education",
        "Tech",
    ];
    // storing the video data from the api
    const [data, setData] = useState([]);
    // by default all category is selected
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Get the search query from the URL
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    // getting all video and display on the screen 
    useEffect(() => {
        axios.get('https://youtube-clone-new-bl7z.onrender.com/api/allVideo/')
            .then(res => {
                setData(res.data.videos);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    // use to calculate for how many days ago user has uploaded the video , using createdAt
    const getRelativeTime = (dateString) => {
        const createdDate = new Date(dateString);
        const currentDate = new Date();
        const diffTime = currentDate - createdDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? "Today" : `${diffDays} days ago`;
    };

    // Filter videos based on category and search query.
    const filteredVideos = data.filter(video => {
        const matchesCategory =
            selectedCategory === "All" || video.videoType === selectedCategory;
        const matchesSearch = video.title.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <div>
                <div className="max-w-[100vw] overflow-x-auto scrollbar-hide">
                    <div className="flex space-x-4 px-4 py-2 whitespace-nowrap min-w-max">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(category)}
                                className={
                                    selectedCategory === category
                                        ? "px-4 py-1.5 bg-black text-white rounded-md"
                                        : "px-4 py-1.5 bg-gray-100 text-black rounded-md"
                                }
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Conditionally render the video grid or a no-results message */}
                {filteredVideos.length === 0 && selectedCategory !== "All" ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-lg text-gray-600">Sorry, no video found</p>
                    </div>
                ) : (
                    <div className={`p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${sideNavbar ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4`}>
                        {filteredVideos.map(item => (
                            <div key={item._id} className="w-full max-w-md rounded-lg overflow-hidden bg-white cursor-pointer">
                                <Link to={`/watch/${item._id}`}>
                                    <div className="relative">
                                        <img
                                            className="w-full h-56 object-cover rounded-lg"
                                            src={item.thumbnail}
                                            alt="Video thumbnail"
                                        />
                                        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
                                            {"12:34"}
                                        </span>
                                    </div>
                                </Link>
                                <div className="flex p-4">
                                    <Link to={`/user/${item?.user?._id}`} onClick={(e) => e.stopPropagation()}>
                                        <img
                                            className="w-10 h-10 rounded-full mr-3"
                                            src={item?.user?.profilePic}
                                            alt="User profile"
                                        />
                                    </Link>
                                    <div className="flex flex-col flex-1">
                                        <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                                        <p className="text-xs text-gray-500">
                                            {`${item?.user?.channelName} • 99k • ${getRelativeTime(item?.createdAt)}`}
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <button
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="4"
                                                    d="M12 6v.01M12 12v.01M12 18v.01"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default HomePage;
