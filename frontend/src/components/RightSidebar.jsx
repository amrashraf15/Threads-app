import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';

const RightSidebar = () => {
  const { suggestedUsers, getSuggestedUsers } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getSuggestedUsers();
  }, [getSuggestedUsers]);

  return (
    <section className='sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-white dark:bg-[#1a1a1a] text-black dark:text-white px-10 pb-6 pt-28 max-xl:hidden'>
      <div className='flex flex-1 flex-col justify-start gap-4'>
        <h3 className='text-lg font-semibold mb-2'>Suggested Users</h3>

        {suggestedUsers?.length > 0 ? (
          suggestedUsers.map(user => (
            <div onClick={()=>navigate(`/users/${user._id}`)} key={user._id} className='flex items-center gap-2'>
              <img
                src={user.image || '/avatar.png'}
                alt={user.name}
                className='w-10 h-10 rounded-full object-cover'
              />
              <span className='font-medium'>{user.name}</span>
            </div>
          ))
        ) : (
          <p className='text-gray-400 text-sm'>No suggestions yet.</p>
        )}
      </div>
    </section>
  );
};

export default RightSidebar;
