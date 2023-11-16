import axios from "axios";
import { useEffect, useState } from "react";
import { formatDateToLocal } from "@/helpers";

const loadEvent = async (name) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/events?name=${name}`
    );
    //const response = await axios.get(`https://server-eventifypro.onrender.com/events/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error al cargar el evento:", error);
    return null; // Trata el error adecuadamente según tus necesidades
  }
};

const TicketList = ({ orders, events }) => {
  console.log("los eventos locales:", events);
  console.log("quiero ver los orders dentro: ", orders);

  return (
    <div className="flex justify-center">
      <div className="bg-white p-2 m-2 rounded shadow-md w-3/4 overflow-x-auto">
        <h2 className="text-lg font-bold mb-2">My tickets!</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location and Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  eTicket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
              </tr>
            </thead>
            {orders &&
              orders.map((order) => {
                const eventNow = events.filter((event) => {
                  return event.title === order.event;
                });
                if (eventNow && eventNow.length > 0) {
                  console.log("eventNow: ", eventNow);

                  return (
                    <tbody
                      className="bg-white divide-y divide-gray-200"
                      key={order.id}
                    >
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <img
                              src={eventNow[0].image}
                              alt={order.event}
                              height="100"
                              width="100"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div>{order.event}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div>{order.ticketTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center flex-col">
                            <div>{eventNow[0].location}</div>
                            <div>{formatDateToLocal(eventNow[0].date)}</div>
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div>{eventNow[0].date}</div>
                      </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div>${order.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div>{order.ticketId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div>{order.id}</div>
                        </td>
                      </tr>
                    </tbody>
                  );
                }

                return null; // O maneja el caso en el que no hay coincidencias
              })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
