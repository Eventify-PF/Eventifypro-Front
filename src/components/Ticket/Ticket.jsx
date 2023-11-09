import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useEffect } from 'react';

const Ticket = ({ticket, addTicket}) => {
  const cookieName = `selectedQuantity_${ticket.id}`;
  const storedQuantity = Cookies.get(cookieName) || '0';
  const [selectedQuantity, setSelectedQuantity] = useState(storedQuantity);
  
  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    setSelectedQuantity(quantity);
    addTicket({ ...ticket, quantity});
  };

  

  useEffect(() => {
    Cookies.set(cookieName, selectedQuantity, { expires: 7 });
  }, [selectedQuantity, cookieName]);
    
  return (
    <div className="py-4 border-b border-gray-200 flex items-center justify-between p-6">
      <div className="flex items-center">
        <div className="mr-4">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mt-2 mb-2">{ticket.name}</h3>
            <p className="mt-5 font-black text-xl text-gray-700">${ticket.price}</p>
            <p className="text-gray-700">{ticket.description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-2">
        <select
          value={selectedQuantity}
          onChange={handleQuantityChange}
          className="rounded border p-2 px-12 py-2  outline-none ring-indigo-300  focus:ring
          dark:text-white dark:bg-gray-800"
        >
          <option value="0">
            Select Ticket
          </option>
          {[...Array(ticket.stock).keys()].map((x) => (
            <option key={x + 1} value={x.toString()}>
              {x}
            </option>
          ))}
        </select>
       
      </div>
    </div>
  );
};

export default Ticket;