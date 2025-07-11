import React from 'react';
import { useAuthStore } from '../store/useAuthStore.js';

const FollowButton = ({ userId }) => {
  const { authUser, toggleFollowUser } = useAuthStore();
  const isFollowing = authUser?.following.includes(userId);

  const handleToggle = async () => {
    const updated = await toggleFollowUser(userId);
    console.log('Now following?', updated);
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 rounded-full text-white font-semibold transition-colors duration-300 ${
        isFollowing
          ? 'bg-blue-500 hover:bg-blue-600'
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
