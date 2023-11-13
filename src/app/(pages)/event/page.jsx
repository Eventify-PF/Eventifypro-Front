'use client';

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Container from "@/components/Container";
import { setCurrentPage } from "@/redux/action/eventActions";
import EventCards from "@/components/EventCards/EventCards";
import SearchBar from "@/components/SearchBar/SearchBar";
import { fetchEvents, searchEvent, filterEventsByType, filterEventsByDate, filterEventsByTypeAndDate } from "@/redux/action/eventActions";
import { getAllEventTypes } from "@/redux/action/eventTypeActions";
import Pagination from "@mui/material/Pagination";
import Carrusel from "@/components/Carrusel/Carrusel";
import {GiTicket} from 'react-icons/gi';
import {IoMdMusicalNote} from 'react-icons/io';
import {FaGuitar, FaTheaterMasks} from 'react-icons/fa';
import {GiSaxophone, GiGrandPiano} from 'react-icons/gi';
import {BiSolidCameraMovie} from 'react-icons/bi'; 

const Events = () => {
  const dispatch  = useDispatch();
  const eventState = useSelector((state) => state.eventReducer);
  const { events } = eventState;
  const currentPage = useSelector((state) => state.eventReducer.pagination.currentPage);
  const eventsPerPage = 6;

  const eventTypesState = useSelector((state) => state.eventTypeReducer);
  const { eventTypes } = eventTypesState;

  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value)); 
  };

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(getAllEventTypes());
  }, [dispatch]);

  const onSearch = (name) => {
    dispatch(searchEvent(name));
    dispatch(setCurrentPage(1));
  };

  const handleFilterByEventType = (event) => {
    const eventType = event.target.value;
    const selectedDate = eventTypesState.selectedDate;
    if (eventType === "all") {
      if (selectedDate) {
        dispatch(filterEventsByDate(selectedDate));
      } else {
        dispatch(fetchEvents());
      }
    } else {
      if (selectedDate) {
        dispatch(filterEventsByTypeAndDate(eventType, selectedDate));
      } else {
        dispatch(filterEventsByType(eventType));
      }
    }
    dispatch(setCurrentPage(1));
  };

  const handleFilterEventDate = (event) => {
    const selectedDate = event.target.value + "T00:00:00.000Z";
    console.log(selectedDate)
      dispatch(filterEventsByDate(selectedDate));
    dispatch(setCurrentPage(1));
  }; 

  const totalEvents = events.length;
  const totalPages = Math.ceil(totalEvents / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const displayedEvents = events.slice(startIndex, endIndex);
  const eventTypesOptions = eventTypes.map((eventType) => (
    <option key={eventType.id} value={eventType.id}>{eventType.name}</option>
  ));

  return (
    <Container>
      <div className="bg-gray-800 w-full shadow-xl rounded-lg bg-opacity-70">
      <Carrusel/>
    </div>
      <div className="py-8">
      <div className="flex mb-11 opacity-20">
          <GiTicket className="w-32 h-32 justify-center"/><IoMdMusicalNote className="w-32 h-32 justify-center"/><GiTicket className="w-32 h-32 justify-center"/>
          <FaGuitar className="w-32 h-32 justify-center"/><GiTicket className="w-32 h-32 justify-center"/><GiSaxophone className="w-32 h-32 justify-center"/>
          <GiTicket className="w-32 h-32 justify-center"/><BiSolidCameraMovie className="w-32 h-32 justify-center"/><GiTicket className="w-32 h-32 justify-center"/>
          <GiGrandPiano className="w-32 h-32 justify-center"/><GiTicket className="w-32 h-32 justify-center"/><FaTheaterMasks className="w-32 h-32 justify-center"/>
        </div>
        <div className="my-2 flex sm:flex-row flex-col justify-center">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative max-w-sm mt-2 sm:mt-0 sm:ml-2">
              <select
                onChange={handleFilterByEventType}
                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                <option value="all">Choose EventTypes</option>
                {eventTypesOptions}
              </select>
            </div>
            <div className="relative max-w-sm mt-2 sm:mt-0 sm:ml-2">
              <input
                type="date"
                onChange={handleFilterEventDate}
                className="border p-2.5 w-full block pl-10 py-3 dark:border-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                placeholder="Select date"
              />
            </div>
          </div>
          <div className="relative max-w-sm mt-2 sm:mt-0 sm:ml-2">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full rounded-lg overflow-hidden">
            <EventCards events={displayedEvents} />
          </div>
        </div>
      </div>
      <div style={{ marginLeft: '700px' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          size="large"
        />
      </div>
    </Container>
  );
};

export default Events;

