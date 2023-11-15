'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from './Container';
import Tickets from './Tickets/Tickets';
import { formatDateToLocal } from '@/helpers';
import { AddCart, removeFromCart } from '@/redux/action/cartAction';
import { toast } from "react-hot-toast";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const EventDetail = ({detailEvent}) => {
  const router = useRouter()
  const pathname = usePathname()
  const { tickets } = detailEvent;
  const ticketsState = useSelector((state) => state.cartReducer);
  const activeUser = useSelector((state) => state.userReducer.searchUser);
  const activeUserId = activeUser.id;
  
  const {cartItems, itemsPrice, loading} = ticketsState
  const dispatch = useDispatch();
  if (tickets.length === 0) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
        THERE ARE NO TICKETS AVAILABLE FOR THIS EVENT
      </div>
    );
  }

  const addTicket = (ticket) => {
    if(ticket.quantity > 0){
      const eventTikect = {
        id: ticket.id,
        title: detailEvent.title,
        name: ticket.name,
        image: detailEvent.image,
        price: ticket.price,
        stock: ticket.stock,
        quantity: ticket.quantity,
        userId: activeUserId,
      };

      dispatch(AddCart(eventTikect));
      toast.success("Ticket added to the cart", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    }else{
      dispatch(removeFromCart(ticket.id))
    }

  };

  return (
    <Container>
      <div className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={detailEvent.image}
              alt={detailEvent.title}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-600 tracking-widest">
                EVENT NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {detailEvent.title}
              </h1>
              <div className="flex mt-6 pb-5 border-b-2 border-gray-200 mb-5 flex-col">
                <h2 className="text-xl title-font font-bold text-gray-900 tracking-widest">
                  Location
                </h2>
                <p className="mr-3 leading-relaxed mb-4 text-lg">
                  {detailEvent.location}

                  </p>
                <h2 className="text-lg title-font font-bold text-gray-950 tracking-widest">
                  Date
                </h2>
                <span className=" text-gray-900 h-10 rounded px-1 py-1 text-lg  cursor-pointer">
                  {formatDateToLocal(detailEvent.date)}
                </span>
              </div>
              <p className="leading-relaxed">{detailEvent.description}</p>
            </div>
          </div>
        </div>

        
        <div className='flex justify-center mt-10'>
            <div className=' px-5 md:w-1/2 w-full'>
                <h2 className='text-center mb-10 text-4xl font-bold'>Tickets</h2>
                <div className='flex justify-center items-center'>
                 {!loading && (
                   <button
                    type="button"
                    onClick={() => router.push('/cart')}
                    className='default-button'

                    >View Cart: $ {itemsPrice}</button>
                 )}
                </div>
            </div>
        </div>
        <div className=" flex items-center justify-between ">
          <div className="container mx-auto px-3  sm:px-3 p-6">
            <div className=" w-full shadow rounded-lg overflow-x-auto  bg-white">
            <Tickets tickets={tickets} addTicket={addTicket}/>
            </div>
          </div>
        </div>
      </div>
      <div className='new-carcater'>
        <div className="flex items-center justify-between">
            <div className="text-gray-600 focus:outline-none mx-7 py-4 px-1 sm:mx-0">
              <div className='flex flex-row gap-2'>
                <Image
                  onClick={() => router.push('/cart')}
                  src="/images/cart.png" 
                  height='30' 
                  width="30" 
                  alt="Logo" 
                />
                <span className='font-bold text-red-500 inline-block'>
                  {loading ? '' : cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>

                  {!loading && cartItems.length > 0 && pathname !== '/cart' && (
                    <div className="caret"></div>
                  )}
              </div>
            </div>
        </div>
      </div>
    </Container>
  );
};

export default EventDetail;
