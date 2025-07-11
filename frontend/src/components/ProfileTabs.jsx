import React, { useState } from 'react';
import { MessageSquareText, FileText } from 'lucide-react'; // lucide icons
import ThreadCard from '../components/ThreadCard';

const ProfileTabs = ({ threads, replies ,reposts }) => {
  const [activeTab, setActiveTab] = useState('threads');

  return (
<div className="w-full">
  {/* Centered, separated tabs */}
  <div className="flex justify-center gap-4 mb-6">
    <button
      onClick={() => setActiveTab('threads')}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition duration-200 border ${
        activeTab === 'threads'
          ? 'text-blue-500 border-blue-500 bg-blue-500/10'
          : 'text-gray-400 border-gray-600 hover:text-white hover:border-white'
      }`}
    >
      <FileText size={18} />
      Threads
    </button>

    <button
      onClick={() => setActiveTab('replies')}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition duration-200 border ${
        activeTab === 'replies'
          ? 'text-blue-500 border-blue-500 bg-blue-500/10'
          : 'text-gray-400 border-gray-600 hover:text-white hover:border-white'
      }`}
    >
      <MessageSquareText size={18} />
      Replies
    </button>
    <button
      onClick={() => setActiveTab('reposts')}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition duration-200 border ${
        activeTab === 'reposts'
          ? 'text-blue-500 border-blue-500 bg-blue-500/10'
          : 'text-gray-400 border-gray-600 hover:text-white hover:border-white'
      }`}
    >
      <MessageSquareText size={18} />
      Reposts
    </button>
    
  </div>

  {/* Content */}
  <div className="space-y-4">
    {activeTab === 'threads' && (
      <>
        {threads.length > 0 ? (
          threads.map((thread) => (
            <ThreadCard key={thread._id} thread={thread} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No threads yet.</p>
        )}
      </>
    )}

    {activeTab === 'replies' && (
      <>
        {replies.length > 0 ? (
          replies.map((reply) => (
            <div key={reply._id} className="space-y-1">
              <p className="text-sm text-gray-400">
                Replying to: <span className="text-blue-500">{reply.user.name}</span>
              </p>
              <ThreadCard thread={reply} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No replies yet.</p>
        )}
      </>
    )}

    {activeTab === 'reposts' && (
      <>
        {reposts.length > 0 ? (
          reposts.map((repost) => (
            <div key={repost._id} className="space-y-1">
              <p className="text-sm text-gray-400">
                Reposted from: <span className="text-blue-500">{repost.user.name}</span>
              </p>
              <ThreadCard thread={repost} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No reposts yet.</p>
        )}
      </>
    )}
  </div>
</div>

  );
};

export default ProfileTabs;
