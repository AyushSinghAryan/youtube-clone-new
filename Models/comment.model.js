import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        // ref is useful for populate 
        //  Yeh ref: 'user' Mongoose ko batata hai ki user field mein jo ObjectId hai, woh user collection ka hai.
        ref: 'user',
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const commentModel = mongoose.model('comment', commentSchema);

export default commentModel;

// why to use ref -> https://chatgpt.com/share/682449b4-905c-800c-89b6-7b8a390a1442
