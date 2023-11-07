"use client";
import Container from "@/components/Container";
import { formatearFecha } from "@/helpers";
import Tickets from "@/components/Tickets/Tickets";
import { useDispatch } from "react-redux";
import { AddCart } from "@/redux/action/cartAction";

const EventDetailClient = ({ detailEvent }) => {
  const { tickets } = detailEvent;
  const dispatch = useDispatch();
  if (tickets.length === 0) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
        THERE ARE NO TICKETS AVAILABLE FOR THIS EVENT
      </div>
    );
  }
  const addTicket = (ticket) => {
    const eventTikect = {
      id: ticket.id,
      title: detailEvent.title,
      name: ticket.name,
      image: detailEvent.image,
      price: ticket.price,
      quantity: ticket.quantity,
    };
    dispatch(AddCart(eventTikect));
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
                  {formatearFecha(detailEvent.date)}
                </span>
              </div>
              <p className="leading-relaxed">{detailEvent.description}</p>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-between ">
          <div className="container mx-auto px-3  sm:px-3 p-6">
            <div className=" w-full shadow rounded-lg overflow-x-auto  bg-white">
              <Tickets tickets={tickets} addTicket={addTicket} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EventDetailClient;
