"use client";
import Link from "next/link";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

const Event = ({ event }) => {
  const [statusEvent, setStatusEvent] = useState(event.status);

  const handleChange = async (id) => {
    const aux = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    // await fetch(`http://localhost:3001/events/${id}`, aux);
    await fetch(`https://server-eventifypro.onrender.com/events/${id}`, aux);
    setStatusEvent(statusEvent === "active" ? "inactive" : "active");
  };

  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="bg-white p-2 m-2 rounded shadow-md w-1/2">
          <h2 className="text-xl uppercase">EVENT</h2>
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-40 object-cover"
          />
          <h2 className="text-lg font-bold mt-2">{event.title}</h2>
          <div className="mt-2">
            <div className="flex justify-center gap-2">
              <Link href={`/admin/modify-event/${event.id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded block ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </Link>

              <button
                onClick={() => handleChange(event.id)}
                className="bg-gray-600 py-2 px-3 rounded block  text-white"
              >
                {statusEvent === "active" ? "Active" : "Inactive"}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 m-2 rounded shadow-md w-3/4 overflow-x-auto">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-xl uppercase">Ticket</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {event.Tickets.length !== 0 &&
                  event.Tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ticket.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ticket.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ticket.stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ticket.description}
                        </div>
                      </td>
                      <td className="flex justify-center py-2">
                        <Link
                          href={`/admin/modify-ticket/${ticket.id}`}
                          className="rounded-md border p-2 hover:bg-gray-100"
                        >
                          <PencilIcon className="w-5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                {event.Tickets.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 whitespace-nowrap text-center"
                    >
                      <Link href={`/admin/create-ticket`}>
                        <button className="bg-black text-white py-2 px-3 rounded">
                          This event has no tickets, click here to add some!
                        </button>
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Event;
