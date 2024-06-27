// src/UserDashboard.js
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const UserDashboard = () => {
  const { user, logout } = useAuth0();

  const handleUpdateName = () => {
    alert("Change Name functionality is not implemented yet.");
   
  };

  const handleUpdateEmail = () => {
    alert("Change Email functionality is not implemented yet.");
    
  };

  const handleChangePassword = () => {
    alert("Change Password functionality is not implemented yet.");
  };

  const handleChangePhoto = () => {
    alert("Change Photo functionality is not implemented yet.");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <img
            className="h-24 w-24 rounded-full object-cover"
            src={user.picture || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">User Details</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="text-gray-700">{user.name}</span>
              <button
                onClick={handleUpdateName}
                className="ml-4 bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                Update
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-700">{user.email}</span>
              <button
                onClick={handleUpdateEmail}
                className="ml-4 bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                Update
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Password:</span>
              <span className="text-gray-700">••••••••</span>
              <button
                onClick={handleChangePassword}
                className="ml-4 bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                Change
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Photo:</span>
              <button
                onClick={handleChangePhoto}
                className="ml-4 bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                Change
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
