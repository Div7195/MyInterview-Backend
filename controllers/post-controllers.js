import Post from "../models/post-schema.js";
import Company from "../models/company-schema.js";
import Comment from "../models/comment-schema.js";
export const createPostController=async(request , response)=>{
    try {
        const newPost =  new Post(request.body);
        await newPost.save();
        return response.status(200).json("Post saved successfully")
    } 
        catch (error) {
            return response.status(500).json(error)
        }
    
}
export const getSinglePostController = async (request, response) => {
    try {
        
        const singlePost = await Post.findById(request.params.id);
        return response.status(200).json(singlePost);
        
    } catch (error) {
        return response.status(500).json({msg:request.params.id})
    }
}
export const getMyPostsController = async (request, response) => {
    let username = request.query.username;
        let posts;
        try {
            posts = await Post.find({username : username})
             //the find function takes an argument, it takes an object that represents the condition to find the particular data from the database that matches the arguments
            return response.status(200).json(posts);
        } catch (error) {
            return response.status(500).json({msg:error.message})
        }
}



export const createCompanyController=async(request , response)=>{
    try {
        const newCompany =  new Company(request.body);
        await newCompany.save();
        return response.status(200).json("company saved successfully")
    } 
        catch (error) {
            return response.status(500).json(error)
        }
    
}

export const findCompanyController = async(request, response)=>{
        let companyName = request.query.companyName;
        let company;
        try {
            if(companyName){
                company = await Company.find({companyName : companyName})
            }
            else{
                company = await Company.find({});
            }
             //the find function takes an argument, it takes an object that represents the condition to find the particular data from the database that matches the arguments
            return response.status(200).json(company[0].companyLogo);
        } catch (error) {
            return response.status(500).json({msg:error.message})
        }
}
    

export const getAllPostsController = async (request , response) => {
        let companyName = request.query.companyName;
        let posts;
        try {
            if(companyName){
                posts = await Post.find({companyName : companyName})
            }
            else{
                posts = await Post.find({});
            }
             //the find function takes an argument, it takes an object that represents the condition to find the particular data from the database that matches the arguments
            return response.status(200).json(posts);
        } catch (error) {
            return response.status(500).json({msg:error.message})
        }
}

export const updatePostController = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if(!post){
            return response.status(404).json({msg:'Post not found'});
        }
        await Post.findByIdAndUpdate(request.params.id, {$set : request.body}) //$set and $addToSet, by passing argument $set ,it find and replace,  and by $addToSet, it appends, we specified request.body as updated data will be in body
        return response.status(200).json({msg:"Post updated successfully"});
        
    } catch (error) {
        return response.status(500).json({error : error.message})
    }
}
export const deletePostController =async(request, response)=>{
    try {
        const post = await Post.findById(request.params.id);
        if(!post){
            return response.status(404).json({msg:'Post not found'});
        }
        await post.delete();
        response.status(200).json({msg:'Post deleted successfully'});
    } catch (error) {
        return response.status(500).json({msg: error.message})
    }
}
export const getCommentsController = async(request , response)=>{
    let postId = request.params.id;
    let comments;
try {
    
    comments = await Comment.find({postId : postId})
    return response.status(200).json(comments);


} catch (error) {
    return response.status(500).json({msg: error.message})
}
}

export const postCommentController = async(request , response)=>{
    try {
        const newComment =  new Comment(request.body);
        await newComment.save();
        return response.status(200).json("Comment saved successfully")
    } 
        catch (error) {
            return response.status(500).json(error)
        }
}

 

