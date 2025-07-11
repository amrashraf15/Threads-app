import React, { useState } from 'react';
import { useSearchStore } from '../store/useSearchStore.js';
import UserCard from '../components/UserCard.jsx';
import ThreadCard from '../components/ThreadCard.jsx';

const SearchPage = () => {
  const { query, setQuery, search, users, threads, loading } = useSearchStore();
  const [activeTab, setActiveTab] = useState('users'); 

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') search();
  };

  return (
    <section className="px-4 md:px-8 py-6">
      <h1 className="font-bold text-3xl md:text-4xl mb-6 text-light-1">Search</h1>

      {/* Search Input */}
      <div className="flex gap-4 items-center mb-6">
        <input
          className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Search users or posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={search}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Search
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('threads')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === 'threads'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          Threads
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-sm text-gray-400">Searching...</p>
      )}

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'users' && (
          <>
            {users.length > 0 ? (
              <div className="flex flex-col gap-4">
                {users.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No users found.</p>
            )}
          </>
        )}

        {activeTab === 'threads' && (
          <>
            {threads.length > 0 ? (
              <div className="flex flex-col gap-6">
                {threads.map((thread) => (
                  <ThreadCard key={thread._id} thread={thread} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No threads found.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;

