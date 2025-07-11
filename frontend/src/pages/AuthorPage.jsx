import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import ProfileHeader from '../components/ProfileHeader.jsx';
import ProfileTabs from '../components/ProfileTabs.jsx';
import { useThreadStore } from '../store/useThreadStore.js';

const AuthorPage = () => {
  const { id } = useParams();
  const { targetUser,getTargetUser,isGettingProfile } =useAuthStore();
  const {  getUserThreads,threads,replies,getUserReplies,reposts,getUserReposts } = useThreadStore();
    useEffect(() => {
      if (id) getTargetUser(id);
    }, [getTargetUser, id]); 

    useEffect(() => {
      getUserThreads(id);
      getUserReplies(id);
      getUserReposts(id);
    },[getUserThreads,getUserReplies,getUserReposts,id])

      if (!targetUser) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        User not found.
      </div>
    );
  }
    if (isGettingProfile) {
    return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
  
}
  return (
    <div  className='px-4 md:px-8 py-6'>
      <ProfileHeader targetUser={targetUser}/>
      <ProfileTabs threads={threads} replies={replies} reposts={reposts}/>
    </div>
  )
}

export default AuthorPage