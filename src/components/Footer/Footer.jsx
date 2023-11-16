"use client";

import React from "react";

import Link from "next/link";
import { useSelector } from "react-redux";

const Footer = () => {
  const searchUser = useSelector((state) => state.userReducer.searchUser);

  const handleNoUser = () => {
    console.log("NECESITAS ESTAR LOGUEADO");
  };

  if (searchUser) {
    return (
      <div className="flex flex-col md:flex-row w-full bg-gray-800 z-30 shadow-sm justify-between items-center text-center md:text-left py-4">
        <div className="md:ml-8">
          <span className="text-gray-400">Copyright © EventifyPro</span>
        </div>
        <div className="md:flex">
          <div>
            <Link href="/contact">
              <span className="text-gray-400 mr-8 ml-8">Contact with us!</span>
            </Link>
            <Link href="/reviews">
              <span className="text-gray-400 mr-8 ml-8">Review</span>
            </Link>
          </div>
        </div>
      </div>
    );
  } else null;
};

export default Footer;
