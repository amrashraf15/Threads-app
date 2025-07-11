import React from 'react';

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      <input
        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition duration-200"
        {...props}
      />
    </div>
  );
};

export default Input;
