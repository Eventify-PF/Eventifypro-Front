"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketList from "./TicketList";
import { getOrdersByUser } from "@/redux/action/userAction";

const MyTicketsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.searchUser);
  const orders = useSelector((state) => state.userReducer.orders);

  useEffect(() => {
    if (user) {
      dispatch(getOrdersByUser());
    }
  }, [dispatch, user]);

  const ordersUser = orders.filter((order) => order.UserId === user.id);

  return (
    <div>
      <TicketList orders={ordersUser} />
    </div>
  );
};

export default MyTicketsPage;
