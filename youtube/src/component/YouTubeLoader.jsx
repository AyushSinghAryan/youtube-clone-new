import { motion } from "framer-motion";

const YouTubeLoader = ({ size = 40, strokeWidth = 4, color = "#f00" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="flex items-center justify-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="">
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * 0.25}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
};

export default YouTubeLoader;
