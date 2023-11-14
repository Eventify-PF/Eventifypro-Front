"use client";

import { useSelector } from "react-redux";
import UserDetail from "./UserDetail";

export default function UserPage({ params }) {
  const userDetail = useSelector((state) => state.userReducer.searchUser);

  return <UserDetail userDetail={userDetail} />;
}
