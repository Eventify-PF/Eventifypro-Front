"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketList from "./TicketLis";
import { getTickets } from "@/redux/action/ticketActions";

const myTicketsPage = () => {
  // const dispatch = useDispatch();
  // const tickets = useSelector((state) => state.ticketReducer.myTickets);

  // useEffect(() => {
  //   dispatch(getTickets());
  // }, [dispatch]);

  // console.log(tickets);

  return (
    <div>
      <TicketList />
    </div>
  );
};

export default myTicketsPage;
