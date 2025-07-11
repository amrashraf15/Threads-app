import React, { useEffect } from 'react';
import { useThreadStore } from '../store/useThreadStore.js';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, UserPlus, Repeat } from 'lucide-react'; // Added Repeat icon

const ActivityPage = () => {
  const { activities, getActivity } = useThreadStore();
  const navigate = useNavigate();

  useEffect(() => {
    getActivity();
  }, [getActivity]);

  return (
    <section className="px-4 md:px-12 py-6 md:py-12">
      <h1 className="text-2xl font-bold mb-6">Activity</h1>

      {activities.length === 0 ? (
        <p className="text-gray-400 text-sm">No activity yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {[...activities].reverse().map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-dark-3 rounded-xl hover:bg-dark-4 transition"
            >
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/users/${activity.user._id}`);
                }}
                src={activity.user.image || "/avatar.png"}
                alt={activity.user.name}
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />

              <div className="flex-1">
                <p className="text-sm text-light-1">
                  <span className="font-semibold text-white">{activity.user.name}</span>{' '}
                  {activity.type === 'follow' && 'followed you'}
                  {activity.type === 'like' && (
                    <>
                      liked your{' '}
                      <Link
                        to={`/threads/${activity.threadId}`}
                        className="text-blue-500 underline"
                      >
                        Thread
                      </Link>
                    </>
                  )}
                  {activity.type === 'repost' && (
                    <>
                      reposted your{' '}
                      <Link
                        to={`/threads/${activity.threadId}`}
                        className="text-green-500 underline"
                      >
                        Thread
                      </Link>
                    </>
                  )}
                </p>
              </div>

              <div>
                {activity.type === 'follow' && <UserPlus size={20} className="text-blue-500" />}
                {activity.type === 'like' && <Heart size={20} className="text-red-500 fill-red-600" />}
                {activity.type === 'repost' && <Repeat size={20} className="text-green-500" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ActivityPage;

