import React from 'react'
import { sidebarLinks } from '../constants/index.js';
import { useLocation, Link } from 'react-router-dom';

const Bottombar = () => {
  const location = useLocation();
  return (
    <section className='fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 bg-white dark:bg-[#1a1a1a] text-black dark:text-white md:hidden'>
      <div className='flex items-center justify-between gap-3 xs:gap-5'>
        {sidebarLinks.map((item) => {
          const isActive = location.pathname === item.route;
          const Icon = item.icon;
          return (
            <Link 
              to={item.route}
              key={item.label}
              className={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5   hover:bg-gray-700 dark:hover:bg-dark-3 ${
                isActive ? 'dark:bg-gray-700 text-white dark:text-white' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              <p className="hidden md:inline">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  )
}

export default Bottombar