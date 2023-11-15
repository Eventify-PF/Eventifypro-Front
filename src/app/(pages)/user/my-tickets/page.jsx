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
      dispatch(getOrdersByUser(user.id));
    }
  }, [dispatch, user]);
  // console.log("usuarioData:", user.id);
  //console.log("los orders:", orders);
  return (
    <div>
      <TicketList orders={orders} />
    </div>
  );
};

export default MyTicketsPage;
