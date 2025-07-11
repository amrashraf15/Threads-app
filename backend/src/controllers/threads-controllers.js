import mongoose from 'mongoose';
import Thread from "../models/thread.js";
import User from "../models/user.js";
import cloudinary from '../lib/cloudinary.js';



export const createThread = async (req,res) => {
    const { image,content } = req.body
    const userId = req.user._id;
    try {
        if (!content) {
            return res.status(400).json({ message: 'Content is required' })
        }
        let imageUrl = "";
        if (image && image.startsWith("data:image")) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newThread = await Thread.create({
            user:userId,
            image:imageUrl,
            content
        })
        await newThread.save();
        const populatedThread = await newThread.populate('user', 'name image');
        res.status(201).json({success:true,message:"Thread Created Successfully",thread:populatedThread})
    } catch (error) {
        console.log("error in  createThread controller : ",error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
};

export const getAllThreads = async (req,res) => {
    try {
        const threads = await Thread.find({parentThread:null}).sort({createdAt: -1}).populate('user');
        res.status(200).json({success:true,message:"Threads Fetched Successfully",threads});
    } catch (error) {
        console.log("error in  getAllThreads controller : ",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const getThreadById = async (req,res) => {
    const { id } = req.params; 
    try {
        const thread = await Thread.findById(id).populate('user', 'name image').populate({
            path: 'replies',
            options: { sort: {createdAt:-1}},
            populate: {path:'user',select: 'name image'}});
        if (!thread) {
            return res.status(404).json({ success:false,message: 'Thread not found' })
        }
        res.status(200).json({success:true,message:"Thread Fetched Successfully",thread});
    } catch (error) {
        console.log("error in getThreadById controller : ",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const getUserThreads = async (req,res) => {
    const { id } = req.params
    try {
        const threads = await Thread.find({user:id,parentThread:null}).sort({createdAt: -1}).populate('user','name image');
        res.status(200).json({success:true,message:"User Threads Fetched Successfully",threads});
    } catch (error) {
        console.log(" getUserThreads : ",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}
export const getUserReplies = async (req,res) => {
    const { id } = req.params
    try {
        const replies = await Thread.find({user:id,parentThread: { $ne: null }}).sort({createdAt: -1}).populate('user','name image');
        res.status(200).json({success:true,message:"User Replies Fetched Successfully",replies});
    } catch (error) {
        console.log(" getUserReplies : ",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}
export const getUserReposts = async (req,res) => {
    const { id } = req.params
    try {
        const reposts = await Thread.find({ reposts: id }).sort({ createdAt: -1 }).populate('user', 'name image');
        res.status(200).json({success:true,message:"User Reposts Fetched Successfully",reposts});
    } catch (error) {
        console.log(" getUserReposts : ",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};

export const toggleLikeThread = async (req,res) => {
    const userId = req.user._id;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid thread ID' })
    }
    try {
        const thread = await Thread.findById(id);
        if (!thread) {
        return res.status(404).json({ success: false, message: 'Thread not found' })
        }
        const alreadyLiked = thread.likes.includes(userId);
        if (alreadyLiked) {
            //unlike
            thread.likes = thread.likes.filter(id => id.toString() !== userId.toString())
            await thread.save();
            return res.status(200).json({success:true,message:"Thread unliked successfully",liked:false,likesCount:thread.likes.length,userId:userId.toString() });
        } else {
            //like
            thread.likes.push(userId);
            await thread.save();
            return res.status(200).json({success:true,message:"Thread liked successfully",liked:true,likesCount:thread.likes.length,userId:userId.toString()});
        }
    } catch (error) {
        console.log(" Error in toggleLikeThread Controller : ",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};


export const toggleRepostThread = async (req,res) => {
    const userId = req.user._id;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid thread ID' })
    }
    try {
        const thread = await Thread.findById(id);
        if (!thread) {
        return res.status(404).json({ success: false, message: 'Thread not found' })
        }
        const alreadyReposted = thread.reposts.includes(userId);
        if(alreadyReposted){
            //unrepost
            thread.reposts = thread.reposts.filter(id => id.toString() !== userId.toString());
            await thread.save();
            return res.status(200).json({success:true,message:"Thread Unreposted successfully",reposted:false,repostsCount:thread.reposts.length,userId:userId.toString()});
        }else{
            //repost
            thread.reposts.push(userId);
            await thread.save();
            return res.status(200).json({success:true,message:"Thread Reposted successfully",reposted:true,repostsCount:thread.reposts.length,userId:userId.toString()});
        }
    } catch (error) {
        console.log(" Error in toggleRepostThread Controller : ",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};

export const replyToThread = async (req,res) => {
    const userId = req.user._id;
    const { id: threadId } = req.params; 
    const { content, image } = req.body;
    if (!mongoose.Types.ObjectId.isValid(threadId)) {
        return res.status(400).json({ success: false, message: "Invalid thread ID" });
    }

    if (!content) {
        return res.status(400).json({ success: false, message: "Reply content is required" });
    }
    try {
        let imageUrl = "";
        if (image && image.startsWith("data:image")) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const parentThread = await Thread.findById(threadId);
        if (!parentThread) {
            return res.status(404).json({ success: false, message: "Parent thread not found" });
        }
        const reply = await Thread.create({
            user:userId,
            image:imageUrl,
            content,
            parentThread: threadId,
        });
        parentThread.replies.push(reply._id);
        await parentThread.save();
        const populatedReply = await reply.populate("user", "name image");
        res.status(201).json({
        success: true,
        message: "Reply posted successfully",
        reply: populatedReply,
    });
    } catch (error) {   
        console.error("Error in replyToThread controller:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteThread = async (req,res) => {
    const userId = req.user._id;
    const { id: threadId } = req.params; 
    try {
        const thread = await Thread.findById(threadId);
        if (!thread) {
            return res.status(404).json({ success: false, message: "Thread not found" });
        }
        if (thread.user.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this thread" });
        }
        await Thread.findByIdAndDelete(threadId);
        await Thread.deleteMany({ _id: { $in: thread.replies } });
        res.status(200).json({success: true,message: "Thread deleted successfully"});
    } catch (error) {
        console.error("Error in deleteThread controller:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateThread = async (req,res) => {
    const userId = req.user._id;
    const { id: threadId } = req.params; 
    const { content,image } = req.body;
    try {
        const thread = await Thread.findById(threadId);

    if (!thread) {
        return res.status(404).json({ success: false, message: "Thread not found" });
    }

    if (thread.user.toString() !== userId.toString()) {
        return res.status(403).json({ success: false, message: "Not authorized to update this thread" });
    }
    if (content !== undefined) thread.content = content;
    if (image !== undefined) thread.image = image;

        await thread.save();

    const updatedThread = await thread.populate("user", "name image");
    res.status(200).json({
        success: true,
        message: "Thread updated successfully",
        thread: updatedThread
    });
    } catch (error) {
        console.error("Error in updateThread controller:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getActivity = async (req, res) => {
    const userId = req.user._id;

    try {
    const activities = [];

    
    const followers = await User.find({ following: userId }).select("name image");
    followers.forEach((follower) => {
    activities.push({
        type: "follow",
        user: follower,
        createdAt: new Date(), 
        });
    });

    
    const likedThreads = await Thread.find({ user: userId })
    .populate("likes", "name image")
    .select("likes");

    likedThreads.forEach((thread) => {
    thread.likes.forEach((liker) => {
        activities.push({
            type: "like",
            user: liker,
            threadId: thread._id,
            createdAt: new Date(), 
        });
    });
    });

    
    const repostedThreads = await Thread.find({ user: userId })
    .populate("reposts", "name image")
    .select("reposts");

    repostedThreads.forEach((thread) => {
    thread.reposts.forEach((reposter) => {
        activities.push({
            type: "repost",
            user: reposter,
            threadId: thread._id,
          createdAt: new Date(), // simulate recent repost
        });
    });
    });

    // 4. Sort all activities DESC by createdAt
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ success: true, activities });

  } catch (error) {
    console.error("Error in getActivity controller:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

