import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast"

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api/threads" : "/api/threads";
axios.defaults.withCredentials = true;

export const useThreadStore = create((set) => ({
        isCreatingThread:false,
        isGettingThreads:false,
        isGettingReplies:false,
        threads:[],
        replies:[],
        activities:[],
        newThread:null,
        thread:null,

    createThread:async (image,content) => {
        set({isCreatingThread:true})
        try {
        const res = await axios.post(`${API_URL}/create`,{image,content});
        set({newThread:res.data.thread});
        toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isCreatingThread:false})
        }
    },
    getAllThreads:async () => {
        set({isGettingThreads:true})
        try {
            const res = await axios.get(`${API_URL}/get-allthreads`);
            set({threads:res.data.threads})
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isGettingThreads:false})
        }
    },
    getThreadById:async (id) => {
        try {
            const res = await axios.get(`${API_URL}/${id}`);
            set({thread:res.data.thread})
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    },
    getUserThreads:async (id) => {
        set({isGettingThreads:true})
        try {
            const res = await axios.get(`${API_URL}/user-threads/${id}`);
            set({threads:res.data.threads})
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isGettingThreads:false})
        }
    },
    getUserReplies:async (id) => {
        set({isGettingReplies:true})
        try {
            const res = await axios.get(`${API_URL}/user-replies/${id}`);
            set({replies:res.data.replies})
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isGettingReplies:false})
        }
    },
    getUserReposts:async (id) => {
        set({isGettingReplies:true})
        try {
            const res = await axios.get(`${API_URL}/user-reposts/${id}`);
            set({reposts:res.data.reposts});
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({isGettingReplies:false})
        }
    },

    toggleLikeThread: async (threadId) => {
        const { threads } = useThreadStore.getState();
        try {
            const res = await axios.post(`${API_URL}/${threadId}/toggle-like`);
            const { liked, likesCount, userId } = res.data;
            const updatedThreads = threads.map((thread) => {
        if (thread._id === threadId) {
            const updatedLikes = liked
            ? [...thread.likes, userId]
            : thread.likes.filter((id) => id.toString() !== userId.toString());
        return {
            ...thread,
            likes: updatedLikes,
            likesCount,
        };
        }
        return thread;
    });
    set({ threads: updatedThreads });
    toast.success(res.data.message);
    return { liked, likesCount };
    } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    }
},
toggleRepostThread:async (threadId) => {
    const { threads } = useThreadStore.getState();
    try {
        const res = await axios.post(`${API_URL}/${threadId}/toggle-repost`);
        const { reposted, repostsCount, userId } = res.data;
        const updatedThreads =threads.map((thread)=>{
            if(thread._id === threadId){
                    const updatedReposts = reposted
                    ? [...thread.reposts,userId]
                    : thread.reposts.filter((id) => id.toString() !== userId.toString())
                    return{
                        ...thread,
                        reposts:updatedReposts,
                        repostsCount,
                    };
            }
            return thread
        });
        set({ threads: updatedThreads });
        toast.success(res.data.message);
        return { reposted, repostsCount };
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
    }
},
replyToThread:async (threadId, content, image) => {
    const { threads } = useThreadStore.getState();
    try {
        const res = await axios.post(`${API_URL}/${threadId}/reply`, { content, image });
        const { reply } = res.data;

    const updatedThreads = threads.map(thread => {
    if (thread._id === threadId) {
        return {
        ...thread,
        replies: [...thread.replies, reply], 
        };
    } 
    return thread;
    });
    set({ threads: updatedThreads });
    toast.success(res.data.message);
    return reply;
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to post reply");
    }
},
getActivity: async () => {
    try {
        const res = await axios.get(`${API_URL}/Activity`);
        set({activities:res.data.activities})
    } catch (error) {
        console.log(error);
    }
}
}))