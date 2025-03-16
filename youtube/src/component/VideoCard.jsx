import React from 'react';
import { Link } from 'react-router-dom';
const VideoCard = ({
    thumbnail = "https://www.tubefilter.com/wp-content/uploads/2022/07/mr-whose-the-boss-mrbeast-1280x720.jpg",
    duration = "12:34",
    profilePic = "https://yt3.googleusercontent.com/a_1U9tYmozHPhZhsLiqqQ_XcYbhlmG_X1fsTdBWAHBjLmRN0haiv1xa_owiit7p8xyKDlMF1LXw=s900-c-k-c0x00ffffff-no-rj",
    title = "Video Title",
    channel = "Channel Name",
    views = "1M views",
    timestamp = "3 days ago"
}) => {
    return (
        <div className="w-full max-w-md rounded-lg overflow-hidden  bg-white">
            {/* Video thumbnail with duration overlay */}
            <div className="relative">
                <img
                    className="w-full h-56 object-cover rounded-lg"
                    src={thumbnail}
                    alt="Video thumbnail"
                />
                <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
                    {duration}
                </span>
            </div>
            {/* Video details */}
            <div className="flex p-4">
                <Link to={"/user/2323"}> <img
                    className="w-10 h-10 rounded-full mr-3"
                    src={profilePic}
                    alt="User profile"
                /></Link>
                <div className="flex flex-col flex-1">
                    <h3 className="text-sm font-semibold mb-1">{title}</h3>
                    <p className="text-xs text-gray-500">
                        {channel} • {views} • {timestamp}
                    </p>
                </div>
                {/* Three dot menu icon */}
                <div className="flex items-start">
                    <button className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 6v.01M12 12v.01M12 18v.01" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
