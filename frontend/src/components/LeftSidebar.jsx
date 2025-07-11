import React from 'react';
import { sidebarLinks } from '../constants/index.js';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { LogIn, LogOut, UserPlus } from 'lucide-react';

const LeftSidebar = () => {
  const { authUser, logout } = useAuthStore();
  const location = useLocation();

  return (
    <section className="hidden sticky left-0 top-0 z-20 md:flex h-screen w-fit flex-col justify-between border-r border-r-dark-4 bg-white dark:bg-[#1a1a1a] text-black dark:text-white pb-5 pt-28">
      {/* Top: Navigation Links */}
      <div className="flex flex-1 flex-col w-full gap-2 px-3 md:px-6">
        {sidebarLinks.map((item) => {
          const isActive = location.pathname === item.route;
          const Icon = item.icon;

          return (
            <Link 
              to={item.route}
              key={item.label}
              className={`flex items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-gray-700 dark:hover:bg-dark-3 ${
                isActive ? 'bg-gray-700 dark:bg-gray-700 text-white dark:text-white' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              <p className="hidden md:inline">{item.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="px-3 md:px-6 mt-6">
        {authUser ? (
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-3 w-full text-left rounded-lg hover:bg-gray-700 dark:hover:bg-red-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <p className="hidden md:inline">Logout</p>
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-dark-3 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <p className="hidden md:inline">Login</p>
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-dark-3 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              <p className="hidden md:inline">Signup</p>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeftSidebar;
