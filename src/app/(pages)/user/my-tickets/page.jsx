"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketList from "./TicketList";
import { getOrdersByUser } from "@/redux/action/userAction";
import { getAllEvents, getEvents } from "@/redux/action/eventActions";

const MyTicketsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.searchUser);
  const orders = useSelector((state) => state.userReducer.orders);
  const events = useSelector((state) => state.eventReducer.events);

  useEffect(() => {
    if (user) {
      dispatch(getOrdersByUser());
      dispatch(getEvents());
    }
  }, [dispatch, user]);

  console.log("USER ID:", user.id);
  console.log("ORDER PRE FILTER:", orders);

  const ordersUser = orders.filter((order) => {
    return order.UserId === user.id;
  });

  console.log("ORDER POST FILTER: ", ordersUser);
  console.log("LOS EVENTOS PAPA: ", events);

  return (
    <div>
      <TicketList orders={ordersUser} events={events} />
    </div>
  );
};

export default MyTicketsPage;
