import videoModel from "../Models/video.model.js";


export const uploadVideo = async (req, res) => {
    try {
        // we get user id throught middleware 
        const { title, description, videoLink, videoType, thumbnail } = req.body;
        // console.log("req user", req.user);

        const videoUpload = new videoModel({
            user: req.user._id,
            title,
            description,
            videoLink,
            videoType,
            thumbnail
        });
        await videoUpload.save();

        res.status(201).json({ sucess: "true", videoUpload });



    } catch (error) {
        res.status(500).json({ error: 'Server error' });

    }
}

export const getAllVideo = async (req, res) => {
    try {
        // in ,model we are using ref for user that why we are able  populate user property 
        const videos = await videoModel.find().populate('user', "channelName userName email profilePic channelBanner about createdAt");
        // in populate first agrument is table/collection name , number of fields want
        res.status(201).json({ sucess: "true", "videos": videos });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });

    }
}

export const getVideoById = async (req, res) => {
    try {
        let { id } = req.params;
        const video = await videoModel.findById(id).populate('user', "channelName userName email profilePic channelBanner about createdAt");
        // const video = await videoModel.find({ user: userId }).populate('user', 'channelName profilePic userName channelBanner createdAt about');
        res.status(201).json({ sucess: "true", "video": video });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });

    }
}

export const getAllVideoByUserID = async (req, res) => {
    try {
        let { userId } = req.params;
        const video = await videoModel.find({ user: userId }).populate('user', 'channelName profilePic userName channelBanner email createdAt about');
        res.status(201).json({ sucess: "true", "video": video });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await videoModel.findById(id);
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }
        // Check if the logged in user is the owner of the video
        if (video.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized access: you can only edit your own video" });
        }
        // Update video details with the request body
        const updatedVideo = await videoModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: "true", video: updatedVideo });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await videoModel.findById(id);
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }
        // Check if the logged in user is the owner of the video
        if (video.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized access: you can only delete your own video" });
        }
        await videoModel.findByIdAndDelete(id);
        res.status(200).json({ success: "true", message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
