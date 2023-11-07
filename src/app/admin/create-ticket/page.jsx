"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getEvents } from "../../../redux/action/eventActions";
import validateTicket from "../../../utils/validateTicket";
import { createTicket } from "../../../redux/action/ticketActions";

const TicketPage = () => {
  const allEvents = useSelector((state) => state.eventReducer.allEvents);
  const dispatch = useDispatch();

  const [ticket, setTicket] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    state: "active",
    event: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    state: "",
    event: "",
  });

  const handleChange = (event) => {
    setTicket({
      ...ticket,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateTicket({
        ...ticket,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleDisabled = () => {
    for (let error in errors) {
      if (errors[error] !== "") return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    console.log(event + "Error");
    event.preventDefault();
    try {
      dispatch(createTicket(ticket));
      setTicket({
        name: "",
        price: "",
        stock: "",
        description: "",
        image: "",
        state: "active",
        event: "",
      });
    } catch (error) {
      alert("There is a problem:", error);
    }
  };

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <div className="flex justify-center items-center h-screen mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl mb-4">Add Tickets to your Event!</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={ticket.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="price"
            value={ticket.price}
            onChange={handleChange}
          />
          {errors.price && (
            <p className="text-red-500 text-xs italic">{errors.price}</p>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stock
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="stock"
            value={ticket.stock}
            onChange={handleChange}
          />
          {errors.stock && (
            <p className="text-red-500 text-xs italic">{errors.stock}</p>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="description"
            value={ticket.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="image"
            value={ticket.image}
            onChange={handleChange}
          />
          {errors.image && (
            <p className="text-red-500 text-xs italic">{errors.image}</p>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Event
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="event"
            value={ticket.event}
            onChange={handleChange}
          >
            <option value="">Select an Event</option>
            {allEvents?.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
          {errors.event && (
            <p className="text-red-500 text-xs italic">{errors.event}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={handleDisabled()}
          >
            Add Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketPage;
