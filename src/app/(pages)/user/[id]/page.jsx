"use client";

import { useDispatch, useSelector } from "react-redux";
import UserDetail from "./UserDetail";

export default function userPage({ params }) {
  const userDetail = useSelector((state) => state.userReducer.searchUser);

  return <UserDetail userDetail={userDetail} />;
}
