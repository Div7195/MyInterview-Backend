import User from '../models/user-schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from '../models/token-schema.js'
dotenv.config();

export const signupUserController=async(request,response)=>{
    try {
        const hashedPassoword=await bcrypt.hash(request.body.password,10);
        const user={name:request.body.name , username:request.body.username , password:hashedPassoword}
        const newUser=new User(user);
        await newUser.save();
        return response.status(200).json({msg:'Signup Successfull'})
    } catch (error) {
         return response.status(500).json({msg:'Error while Signup user'})
    }
}

export const loginUserController=async(request,response)=>{
    let user=await User.findOne({username:request.body.username});//using find one here because we already specified username as unique in our schema
    if(!user){
       return response.status(400).json({msg:'Username does not match'})
    }
    try {
        let match=await bcrypt.compare(request.body.password,user.password);
        if(match){

            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY, {expiresIn:'30m'})
            const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY)
            //now once access token expires ,then to stay login,we will have to generate another access token, for that we will need refresh token, so we need to store our refresh token for each user in the database that logs in
            const newToken = new Token({token: refreshToken});
            await newToken.save();


            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username})
            //here we access name of loggin user by user.name, cuz the 'user' is the object that we found from our database,see User.findOne function
        }
        else{
            return response.status(400).json({msg:'Password does not match'})
        }
    } catch (error) {
        return response.status(500).json({msg: 'Error while login user'})   
    }
}

