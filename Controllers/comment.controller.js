import commentModel from "../Models/comment.model.js";

export const addComment = async (req, res) => {
    try {
        let { video, message } = req.body;
        const comment = await commentModel({ user: req.user._id, video, message });
        await comment.save();
        res.status(201).json({
            message: "Success",
            comment
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });

    }
}

export const getCommentByVideoId = async (req, res) => {
    try {
        let { videoId } = req.params;
        const comments = await commentModel.find({ video: videoId }).populate('user', 'channelName profilePic userName channelBanner email createdAt about').sort({ createdAt: -1 });;

        res.status(201).json({
            message: "Success",
            comments
        })
    } catch (error) {
        res.status(500).json({ error: 'Server error' });

    }
}

// Update (edit) a comment
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;

        // Find the comment by ID
        const comment = await commentModel.findById(id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Check if the logged-in user is the owner of the comment
        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized: You can only edit your own comment" });
        }

        // Update the message field (you can extend this to update other fields if needed)
        comment.message = message || comment.message;
        await comment.save();

        res.status(200).json({
            message: "Comment updated successfully",
            comment
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the comment by ID
        const comment = await commentModel.findById(id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Check if the logged-in user is the owner of the comment
        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized: You can only delete your own comment" });
        }

        await comment.deleteOne();

        res.status(200).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
