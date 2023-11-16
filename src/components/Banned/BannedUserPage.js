"use client";
import React from 'react';
import Logout from '@/app/api/auth/logoutButton';

const BannedUserPage = () => (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-800 flex items-center justify-center text-white">
    <div className="text-center">
      <p className="text-4xl font-bold">You ve been banned!</p>
      <p>You cannot access this page.</p>
      <Logout /> 
    </div>
  </div>
);

export default BannedUserPage;