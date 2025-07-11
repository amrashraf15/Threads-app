import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api/auth" : "/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set,get) => ({
    authUser:null,
    setAuthUser: (user) => set({ authUser: user }),
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth:false,
    isUpdatingProfile:false,
    isGettingProfile:false,
    targetUser:null,
    suggestedUsers:[],
    checkAuth: async () => {
        set({isCheckingAuth:true});
        try {
            const res = await axios.get(`${API_URL}/check`);
            set({authUser:res.data.user})
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        }finally{
            set({isCheckingAuth:false});
        }
    },
    signup: async (data) => {
        set({isSigningUp:true});
        try {
            const res = await axios.post(`${API_URL}/signup`,data);
            set({authUser:res.data.user});
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isSigningUp:false})
        }
    },
    login: async (email,password) => {
        set({isLoggingIn:true});
        try {
            const res = await axios.post(`${API_URL}/login`,{email,password});
            set({authUser:res.data.user});
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isLoggingIn:false});
        }
    },
    logout: async () => {
        try {
            await axios.post(`${API_URL}/logout`);
            set({authUser:null})
            toast.success("Logged out successfully"); 
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    getProfile: async () => {
        set({isGettingProfile:true})
        try {
            const res = await axios.get(`${API_URL}/get-profile`);
            set({authUser:res.data.user})
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isGettingProfile:false})
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile:true})
        try {
            const res = await axios.put(`${API_URL}/update-profile`,data)
            set({authUser:res.data.user});
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isUpdatingProfile:false})
        }
    },
    toggleFollowUser:async (targetUserId) => {
        const { authUser } = get();
        try {
            const res = await axios.put(`${API_URL}/toggle-follow/${targetUserId}`);
            const { following } =res.data.following;
            let updatedFollowing;
            if(following){
                updatedFollowing= [...authUser.following,targetUserId]
            }else {
                updatedFollowing = authUser.following.filter(
                    (id) => id !== targetUserId
                    );
            }
            set({
                authUser:{
                    ...authUser,
                    following:updatedFollowing  
                }
            })
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to toggle follow");
        }
    },
    getTargetUser : async (id) => {
        set({isGettingProfile:true})
        try {
            const res = await axios.get(`${API_URL}/${id}`);
            set({targetUser:res.data.user})
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isGettingProfile:false})
        }
    },
    getSuggestedUsers: async () => {
        try {
            const res = await axios.get(`${API_URL}/suggestedUsers`);
            set({suggestedUsers:res.data.users})
        } catch (error) {
            console.log("error in getSuggestedUsers in useAuthStore :",error);
        }
    }
}))