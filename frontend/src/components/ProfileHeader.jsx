
import React from 'react'
import FollowButton from './FollowButton';

const ProfileHeader = ({targetUser}) => {
    if (!targetUser) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-500 dark:text-gray-400">
        Loading profile...
      </div>
    );
  }
  return (
    <div className='flex w-full flex-col justify-start'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
            <div className="relative w-32 h-32">
                <img
                    src={targetUser.image || "/avatar.png"}
                    alt="User"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-300 dark:border-gray-700"
                />
                {targetUser.isVerified && (
                <span className="absolute bottom-0 right-0 p-1 ">
                    <img
                    src="/verf (1).png"
                    alt="Verified"
                    className="w-6 h-6"
                    />
                </span>
                    )}
                </div>
                <div className='flex-1'>
                        <h2 className='text-left text-3xl font-bold '>{targetUser.name}</h2>
                        <p className='text-base-medium'>{targetUser.email}</p> 
                </div>
            </div>
            <div className='flex flex-col gap-6'>
              <FollowButton userId={targetUser._id}/>
              <div className='flex gap-4'>
                    <p className='flex gap-1 text-blue-500'>Followers<span>{targetUser.followers.length}</span></p>
                    <p className='flex gap-1 text-blue-500'>Followings<span>{targetUser.following.length}</span></p>
              </div>
            </div>
        </div>
        <p className='mt-6 max-w-lg text-base-regular text-light-2'>{targetUser.bio}</p>  
    </div>
  )
}

export default ProfileHeader