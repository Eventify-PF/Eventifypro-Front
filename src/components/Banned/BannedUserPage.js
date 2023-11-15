"use client";
import React from 'react';
import Logout from '@/app/api/auth/logoutButton';

const BannedUserPage = () => (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-800 flex items-center justify-center text-white">
    <div className="text-center">
      <p className="text-4xl font-bold">¡Has sido prohibido!</p>
      <p>No puedes acceder a esta página.</p>
      <Logout /> {/* Botón de logout */}
    </div>
  </div>
);

export default BannedUserPage;