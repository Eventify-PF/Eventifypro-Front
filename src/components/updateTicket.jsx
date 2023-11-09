"use client";

const { updateTicket } = require("@/redux/action/ticketActions");

import { useState } from "react";
import { useDispatch } from "react-redux";

const EditTicketForm = ({ detailTicket }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  console.log(detailTicket);
  const [ticket, setTicket] = useState({
    id: detailTicket.id,
    name: detailTicket.name,
    price: detailTicket.price,
    stock: detailTicket.stock,
    description: detailTicket.description,
  });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateTicket(ticket));
      setMessage("You updated the Ticket!");
      setTicket({
        name: "",
        price: "",
        stock: "",
        description: "",
      });
    } catch (error) {
      setMessage("There is a problem:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl mb-4">ENTER NEW TICKET DATA</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            placeholder={detailTicket.name}
            type="text"
            value={ticket.name}
            onChange={handleChange}
          />
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="price"
            value={ticket.price}
            placeholder={detailTicket.price}
            type="text"
            onChange={handleChange}
          />
          <br />

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stock:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="stock"
            value={ticket.stock}
            placeholder={detailTicket.stock}
            type="text"
            onChange={handleChange}
          />

          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            placeholder={detailTicket.description}
            type="text"
            value={ticket.description}
            onChange={handleChange}
          />
          <br />

          <span className="text-red-500 text-xs italic">
            {errors.eventType}
          </span>
          <br />
          {message && (
            <span className="text-red-500 text-xs italic">{message}</span>
          )}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTicketForm;
