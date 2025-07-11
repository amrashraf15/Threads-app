import express from "express";
import { createThread, deleteThread, getActivity, getAllThreads, getThreadById, getUserReplies, getUserReposts, getUserThreads,replyToThread,toggleLikeThread,  toggleRepostThread,  updateThread } from "../controllers/threads-controllers.js";
import { protectRoute } from "../middleware/auth-middleware.js";


const router = express.Router();



router.get("/get-allthreads", getAllThreads);
router.get("/user-threads", protectRoute, getUserThreads); 
router.get("/user-threads/:id", protectRoute, getUserThreads); 
router.get("/user-replies/:id", protectRoute, getUserReplies); 
router.get("/user-reposts/:id", protectRoute, getUserReposts); 
router.get("/Activity", protectRoute, getActivity); 

router.get("/:id", getThreadById);
router.post("/create", protectRoute, createThread);
router.post("/:id/toggle-like", protectRoute, toggleLikeThread);
router.post("/:id/toggle-repost", protectRoute, toggleRepostThread);
router.post("/:id/reply", protectRoute, replyToThread);
router.delete("/:id", protectRoute, deleteThread);
router.put("/:id", protectRoute, updateThread);


export default router;