"use client";

import { createEvent } from "../../../redux/action/eventActions";
import {
  createEventType,
  getAllEventTypes,
} from "@/redux/action/eventTypeActions";
import validateForm from "@/utils/validateForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EventPage = () => {
  const allEventTypes = useSelector(
    (state) => state.eventTypeReducer.eventTypes
  );

  const dispatch = useDispatch();
  const [event, setEvent] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    image: "",
    status: "active",
    eventType: "",
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getAllEventTypes());
  }, []);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
    setErrors(validateForm({ ...event, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(createEvent(event));
      setMessage("You created a new event!");
      setEvent({
        title: "",
        location: "",
        date: "",
        description: "",
        image: "",
        status: "active",
        eventType: "",
      });

      //console.log(event);
    } catch (error) {
      setMessage("There is a problem:", error);
    }
  };

  const handleDisabled = () => {
    for (let error in errors) {
      if (errors[error] !== "") return true;
    }
    return false;
  };

  return (
    <div className="flex justify-center items-center h-screen mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl mb-4">ENTER EVENT DATA</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            placeholder="Enter a title..."
            type="text"
            value={event.title}
            onChange={handleChange}
          />
          <span className="text-red-500 text-xs italic">{errors.title}</span>
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="location"
            value={event.location}
            placeholder="Enter a location..."
            type="text"
            onChange={handleChange}
          />
          <span className="text-red-500 text-xs italic">{errors.location}</span>
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="date"
            type="date"
            value={event.date}
            onChange={handleChange}
          />
          <span className="text-red-500 text-xs italic">{errors.date}</span>
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            placeholder="Enter a brief description..."
            type="text"
            value={event.description}
            onChange={handleChange}
          />
          <span className="text-red-500 text-xs italic">
            {errors.description}
          </span>
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="image"
            placeholder="Enter a URL..."
            type="url"
            value={event.image}
            onChange={handleChange}
          />
          <span className="text-red-500 text-xs italic">{errors.image}</span>
          <br />
          <label>New Event Type:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter a new event type"
            name="eventType"
            onChange={handleChange}
            value={event.eventType}
          />
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event Type:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="eventType"
            onChange={handleChange}
            value={event.eventType}
          >
            <option value="">Select Event Type</option>
            {allEventTypes?.map((elem) => (
              <option key={elem.id}>{elem.name}</option>
            ))}
          </select>

          <span className="text-red-500 text-xs italic">
            {errors.eventType}
          </span>
          <br />
          {message && (
            <span className="text-red-500 text-xs italic">{message}</span>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={handleDisabled()}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventPage;
