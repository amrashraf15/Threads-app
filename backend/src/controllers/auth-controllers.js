import User from "../models/user.js";
import Thread from "../models/thread.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req,res) => {
    const { name,email,password } = req.body
    try {
        if( !email || !name || !password ){
            throw new Error("All fields Are required");
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false,message:"User already exist"})
        }
        if(password.length<6){
            throw new Error("Password must be at least 6 characters");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            email,
            password:hashedPassword,
            name,
        })
        if(user){
            generateTokenAndSetCookie(res,user._id);
            await user.save();
            return res.status(201).json({success:true,message:"User created Successfully",user:{...user._doc,password:undefined}});
        } else {
        return  res.status(400).json({success:false,message:"Invalid User data"});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}
export const login = async (req,res) => {
    const { email,password } = req.body
    try {
        if( !email || !password ){
            res.status(400).json({success:false,message:"All fields Are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"Invalid Credentials"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message:"Password is incorrect "});
        }
        generateTokenAndSetCookie(res,user._id);
        await user.save();
        return res.status(200).json({success:true,message:"Login Successful",user:{...user._doc,password:undefined}});
    } catch (error) {
        console.log("Error in login Controller ; ",error)
        return res.status(500).json({success:false,message:"Internal Serve Error!"})
    }
}

export const logout = async (req,res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({success:true,message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({success:false,message: "Internal Server Error" });
    }
}
export const checkAuth = async (req,res) => {
    try {
        const user =req.user;
        if(!user){
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({success:true,user:{...user._doc,password:undefined}})
    } catch (error) {
        console.error("Error in checkAuth:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
export const updateProfile = async (req,res) => {
    const userId = req.user._id;
    let {name,email,password,image,bio,gender,dob} = req.body
    try {
        if (image && image.startsWith("data:image")) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            image = uploadResponse.secure_url;
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{name,email,password,image,bio,gender,dob},{new:true});
        res.status(200).json({
            success: true,
            message: "User Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error in updateProfile : ", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProfile = async (req,res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({success:true,message:"Fetched My Profile Data Successfully",user});
    } catch (error) {
        console.error("Error in getProfile : ", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getTargetUser = async (req,res) => {
    const { id } = req.params
    try {
        const targetUser = await User.findById(id).select("-password");
        if(! targetUser){
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({success:true,message:"Fetched User Profile Data Successfully",user:targetUser});
    } catch (error) {
        console.error("Error in getTargetUser : ", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const toggleFollowUser = async (req,res) => {
    const currentUserId = req.user._id;
    const targetUserId = req.params.id;
    if (currentUserId.toString() === targetUserId) {
            return res.status(400).json({ success: false, message: "You cannot follow yourself." });
        }
    try {
        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);
            if( !targetUser || !currentUser){
                return res.status(404).json({ success: false, message: "User not found." });
            }
            const isFollowing = targetUser.followers.includes(currentUserId);
            if(isFollowing){
                //unfollow
                targetUser.followers = targetUser.followers.filter( (id) => id.toString() !== currentUserId.toString());
                currentUser.following = currentUser.following.filter( (id) => id.toString() !== targetUserId.toString());
                await targetUser.save();
                await currentUser.save();
                return res.status(200).json({ success: true, following: false, message: "User unfollowed successfully." });
            } else {
                //follow
                targetUser.followers.push(currentUserId);
                currentUser.following.push(targetUserId);
                await targetUser.save();
                await currentUser.save();
                return res.status(200).json({ success: true, following: true, message: "User followed successfully."});
            }
    } catch (error) {
        console.error("Error in toggleFollowUser:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const searchUsers = async (req,res) => {
    const {query} = req.query;
    if (!query) return res.status(400).json({ message: "No search query provided." });
    try {
        const users = await User.find({
        name: { $regex: query, $options: 'i' }
        }).select('name image');

        const threads= await Thread.find({
        content: { $regex: query, $options: 'i' }
        }).populate('user', 'name image');
        res.status(200).json({ success: true, users, threads });
    } catch (error) {
        console.error("Error in searchUsers:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const suggestedUsers = async (req,res) => {
    const currentUserId = req.user._id;
    try {
        const currentUser = await User.findById(currentUserId).select("following");
        const suggestedUsers = await User.find({_id:{$nin: [...currentUser.following,currentUserId]}}).select("name image").limit(5);
        res.status(200).json({ success: true, users: suggestedUsers });
    } catch (error) {
        console.error("Error in getSuggestedUsers:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}