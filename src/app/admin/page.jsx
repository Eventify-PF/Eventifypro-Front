"use client";
import EventList from "@/components/Dashboard/EventList";
import { getAllEvents } from "@/redux/action/eventActions";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EventPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventReducer.allEvents);
  const user = useSelector((state) => state.userReducer.searchUser);

  useEffect(() => {
    if (user) {
      dispatch(getAllEvents(user.id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <EventList events={events} />
    </div>
  );
};

export default EventPage;
