import { AddCart } from '@/redux/action/cartAction';
import React, { useState } from 'react';

const Ticket = ({ticket, addTicket}) => {
    const [selectedQuantity, setSelectedQuantity] = useState(0);

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value, 10));
  };

  const handleAddToCart = () => {
    
    if (selectedQuantity > 0) {
      addTicket({ ...ticket, quantity: selectedQuantity });
      setSelectedQuantity(0);
    }
  };
    
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

      <div className="flex items-center">
        <div className="flex items-center mt-2">
          <input
            type="number"
            min="0"
            value={selectedQuantity}
            onChange={handleQuantityChange}
            className="w-16 border p-2 mr-2"
          />
          <button
            onClick={handleAddToCart}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;