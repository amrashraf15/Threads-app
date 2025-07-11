import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${user._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between gap-4 rounded-xl bg-dark-3 p-4 hover:bg-dark-4 transition-colors cursor-pointer shadow-md"
    >
      <div className="flex items-center gap-4">
        <img
          src={user.image || "/avatar.png"}
          alt={user.name}
          className="h-12 w-12 rounded-full object-cover border border-gray-600"
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold text-light-1">{user.name}</h4>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent outer div click
          handleClick();
        }}
        className="px-4 py-1 rounded-full text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
      >
        View
      </button>
    </div>
  );
};

export default UserCard;
