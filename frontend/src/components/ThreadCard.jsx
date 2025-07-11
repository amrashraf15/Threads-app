import { MessageCircle, Heart, Repeat2 } from "lucide-react";
import { useThreadStore } from "../store/useThreadStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from 'react-router-dom';

const ThreadCard = ({ thread }) => {
  const { toggleLikeThread,toggleRepostThread } = useThreadStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  if (!thread || !thread.user || !authUser) return null;
  
  const isLiked = thread.likes?.includes(authUser._id);
  const isReposted = thread.reposts?.includes(authUser._id);
  const handleLike = async (e) => {
    e.stopPropagation();
    await toggleLikeThread(thread._id);
  };

  const handleRepost = async (e) => {
    e.stopPropagation();
    await toggleRepostThread(thread._id);
  };

  

  return (
    <div onClick={()=>navigate(`/threads/${thread._id}`)}  className="bg-white dark:bg-gray-900 rounded-xl shadow-md m-4 md:m-8 p-4 mb-4 border border-gray-200 dark:border-gray-700">
      {/* User Info */}
      <div onClick={(e) => {
        e.stopPropagation(); 
        navigate(`/users/${thread.user._id}`);
        }} 
        className="flex items-center gap-3 mb-2">
        <img
          src={thread.user?.image || "/avatar.png"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">{thread.user?.name}</h3>
          <p className="text-sm text-gray-500">{thread.createdAt?.slice(0, 10)}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-base text-gray-800 dark:text-gray-200 mb-3">{thread.content}</p>

      {/* Image */}
      {thread.image && (
        <img
          src={thread.image}
          alt="Thread visual"
          className="w-full h-auto object-cover rounded-lg mt-2"
        />
      )}

      {/* Actions */}
      <div className="flex gap-6 mt-4 text-gray-600 dark:text-gray-400 text-sm">
        <button className="flex items-center gap-1" onClick={() => navigate(`/threads/${thread._id}`)}>
          <MessageCircle className="w-4 h-4 " />
          {thread.replies?.length || 0}
        </button>
        <button className="flex items-center gap-1" onClick={(e) => handleLike(e)}>
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isLiked ? "text-red-500 fill-red-500" : ""
            }`}
          />
          {thread.likes?.length || 0}
        </button>
        <button className="flex items-center gap-1" onClick={(e) => handleRepost(e)}>
          <Repeat2 className={`w-4 h-4 ${isReposted ? "text-green-500 fill-green-500" : ""}`} />
          {thread.reposts?.length || 0}
        </button>
      </div>
    </div>
  );
};

export default ThreadCard;
