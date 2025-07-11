import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, UserPlus } from 'lucide-react';
import { useTheme } from '../store/useTheme.js';
import { Sun, Moon } from "lucide-react";

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <nav className='fixed top-0 z-30 px-4 md:px-8 lg:px-12 flex w-full items-center justify-between py-3 md:py-6 bg-white dark:bg-[#1a1a1a] text-black dark:text-white'>
        <Link to="/" className='flex items-center gap-4'>
          <img src="/logo.svg" alt="logo" />
          <p className='text-xl font-medium '>Threads</p>
        </Link>
        <div className='flex items-center gap-2 px-4'>
            <button onClick={toggleTheme} className="p-2 rounded ">
              {theme === "dark" ? <Sun className="text-white" /> : <Moon className='text-black'/>}
            </button>
        </div>
    </nav>  
  )
}

export default Topbar