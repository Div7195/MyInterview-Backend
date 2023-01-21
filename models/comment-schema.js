import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    postId:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdDate:{
        type: Date,
    }
});

const comment=mongoose.model('comment' , commentSchema)
export default comment;