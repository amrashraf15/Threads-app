import ThreadCard from '../components/ThreadCard.jsx';
import { useParams } from 'react-router-dom';
import { useThreadStore } from '../store/useThreadStore.js';
import { useEffect } from 'react';
import Comment from '../components/Comment.jsx';

const ThreadPage = () => {
  const { threadId } = useParams();
  const { thread, getThreadById } = useThreadStore();

  useEffect(() => {
    if (threadId) getThreadById(threadId);
  }, [getThreadById, threadId]); 

  if (!thread) return <div className="text-center mt-10 text-gray-600">Loading thread...</div>; 

  return (
    <section className="relative px-4 md:px-8">
      <div>
        <ThreadCard thread={thread} />
      </div>
      {/* New Comment  */}
      <div className="mt-7 mx-4 md:mx-6">
        <Comment threadId={thread._id} />
      </div>
      {/* Replies Section */}
      <div className='mt-10 space-y-4'>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Replies</h2>
          {thread.replies?.length > 0 ? (
            thread.replies.map((reply) => (
              <ThreadCard key={reply._id} thread={reply} />
            ))
          ):(
            <p className="text-gray-500 mt-2">No replies yet. Be the first to comment!</p>
          )}
      </div>
    </section>
  );
};

export default ThreadPage;
