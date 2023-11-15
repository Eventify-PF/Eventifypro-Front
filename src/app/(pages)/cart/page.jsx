"use client"
import { useEffect } from "react";

import { AddCart, hideLoading, removeFromCart } from "@/redux/action/cartAction";
import { useSelector, useDispatch } from 'react-redux';
import Link from "next/link";
import axios from "axios";

const CartPage = () => {
  const dispatch = useDispatch();
  const ticketsState = useSelector((state) => state.cartReducer);
  const {cartItems, itemsPrice, loading} = ticketsState;
console.log(cartItems)
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const addToCartHandler = async (ticket, quantity) => {
    dispatch(AddCart({ ...ticket, quantity }))
  }

  const handleFinish = async () => {
    console.log(cartItems)
  let listCart = cartItems.map((item) => {
    return {
      id:item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      eventTitle: item.title,
      userId: item.userId,
    }
  });

    try {
    const response  = await axios.post('http://localhost:3001/mercadoPago',listCart);
    const data = response.data;
    window.location.href = data;
  } catch (error) {
    return error;
  }
 }

 useEffect(() => {
  dispatch(hideLoading());
}, []);

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}, [cartItems]);

  return (
    <div className="max-w-[2520px] mx-autoxl:px-20 md:px-10 sm:px-2 px-4">
      <h1 className="mb-10 text-center text-4xl font-bold my-10">Tickets</h1>
      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="text-center font-bold">
          No Tickets in the Cart. <Link href="/event">Go shopping</Link>
        </div>
      ) :(
        <div className="grid md:grid-cols-4 md:gap-5  bg-white ">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2 text-left">Ticket</th>
                  <th className="border border-slate-300 p-2 text-start">Event</th>
                  <th className="border border-slate-300 p-2 text-left">Quantity</th>
                  <th className="border border-slate-300 p-2">Price</th>
                  <th className="border border-slate-300 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="p-2 text-left">{item.name}</td>
                    <td className="p-5 text-start">{item.title}</td>
                    <td className="p-5 text-left">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                        className="h-full rounded-l border block  w-full bg-white border-gray-400 text-gray-700 py-1 px-3  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-center">${item.price}</td>
                    <td className="p-5 text-center">
                      <button
                        className="default-button"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-lg">
                    Total({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                    {itemsPrice}
                  </div>
                </li>
                <li>
                  <button
                    onClick={handleFinish}
                    className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm w-full"
                  >
                    Proceed to checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        
      )}
    </div>

  );
}
export default CartPage;