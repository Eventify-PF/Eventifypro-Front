"use client";
import Link from "next/link";
import { useState } from "react";

const Event = ({ event }) => {
  const [statusEvent, setStatusEvent] = useState(event.status);

  const handleChange = async (id) => {
    const aux = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(`http://localhost:3001/events/${id}`, aux);
    setStatusEvent(statusEvent === "active" ? "inactive" : "active");
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-2 m-2 rounded shadow-md w-96 w-1/2">
        <h2 className="text-lg font-bold mb-2">EVENT</h2>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-40 object-cover"
        />
        <h2 className="text-lg font-bold mt-2">{event.title}</h2>
        <div className="mt-2">
          <Link href={`/admin/modify-event/${event.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded block w-full">
              Update Data
            </button>
          </Link>
          <button
            onClick={() => handleChange(event.id)}
            className="bg-gray-600 py-2 px-3 rounded block w-full text-white"
          >
            {statusEvent === "active" ? "Active" : "Inactive"}
          </button>
        </div>
      </div>

      <div className="bg-white p-2 m-2 rounded shadow-md w-3/4 overflow-x-auto">
        <h2 className="text-lg font-bold mb-2">TICKETS</h2>
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
                      <div className="text-sm text-gray-900">{ticket.name}</div>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/admin/modify-ticket/${event.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded">
                          MODIFICAR
                        </button>
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
  );
};

export default Event;
