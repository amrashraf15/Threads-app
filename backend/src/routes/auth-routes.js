import express from "express";
import { protectRoute } from "../middleware/auth-middleware.js";
import { checkAuth, getProfile, getTargetUser, login, logout, searchUsers, signup, suggestedUsers, toggleFollowUser, updateProfile } from "../controllers/auth-controllers.js";


const router = express.Router();


router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/update-profile",protectRoute,updateProfile);
router.get("/check", protectRoute, checkAuth);
router.get("/get-profile", protectRoute, getProfile);
router.get("/search", protectRoute, searchUsers);
router.get("/suggestedUsers", protectRoute, suggestedUsers);
router.get("/:id", protectRoute, getTargetUser) 
router.put("/toggle-follow/:id", protectRoute, toggleFollowUser);



export default router;  