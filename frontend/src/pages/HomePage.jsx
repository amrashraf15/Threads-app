import React, { useEffect } from 'react'
import { useThreadStore } from '../store/useThreadStore.js'
import ThreadCard from '../components/ThreadCard.jsx'

const HomePage = () => {
  const { isGettingThreads,threads,getAllThreads } = useThreadStore()
  useEffect(() =>{
    getAllThreads();
  },[getAllThreads])
  if (isGettingThreads) {
        return (
        <div className="flex items-center justify-center h-screen">
            <span className="loading loading-spinner text-primary"></span>
        </div>
        );
    }
  return (
    <>
      <h1 className='text-left px-4 md:px-8 py-4 md:py-8 font-semibold text-xl md:text-2xl lg:text-3xl'>Home</h1>
      <section className='mt-9 flex flex-col gap-10'>
        {threads.length === 0 ?(
          <p className='text-center !text-base-regular text-light-3'>No Threads found</p>
        ):(
          <>
            {threads.map((thread) => (
              <ThreadCard key={thread._id} thread={thread} />
            ))}
          </>
        )}
      </section>
    </>
  )
}

export default HomePage