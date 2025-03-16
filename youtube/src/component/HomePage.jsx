import VideoCard from "./VideoCard";
import { Link } from "react-router-dom"
function HomePage({ sideNavbar }) {
    const categories = [
        "All",
        "Music",
        "Gaming",
        "News",
        "Movies",
        "Live",
        "Trending",
        "Podcasts",
        "Education",
        "Tech",
    ];
    return (
        <>
            <div>
                <div>
                    <div className="w-full overflow-x-auto scrollbar-hide">
                        <div className="flex space-x-4 px-4 py-2 whitespace-nowrap">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    className="px-4 py-2 bg-gray-100  rounded-md text-sm font-medium hover:bg-black-300 hover:text-white dark:hover:bg-gray-600 transition"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* video section */}
                    <div
                        className={`p-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${sideNavbar ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
                            } gap-4`}
                    >
                        <Link to={"/watch/99"}> <VideoCard /></Link>
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                    </div>
                </div>


            </div>
        </>
    )
}
export default HomePage;