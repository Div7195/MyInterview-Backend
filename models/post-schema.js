import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    companyName:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    
    eligibility:{
        type:String,
        required: true
    },
    format:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    
    username:{
        type: String,
        required: false
    },
    suggestions:{
        type:String,
        required:false
    },
    createdDate:{
        type: Date,
    }

});

const post=mongoose.model('post' , postSchema)
export default post;