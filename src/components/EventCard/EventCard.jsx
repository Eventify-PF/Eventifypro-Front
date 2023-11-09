import Link from 'next/link';
import React from 'react';
import { useRouter } from "next/navigation";
import { formatearFecha } from "@/helpers";
const EventCard = ({event}) => {
	const router = useRouter();
	return (
		<div className="relative hover:shadow-xl transform transition duration-500 flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
			
			
			<Link href={`/event/${event.id}`}>
				<img className="h-56 lg:h-60 w-full object-cover" src={event.image} alt={event.title}/>
			</Link>
			<div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-bordershadow-lg shadow-blue-gray-500/40">
				<div className="px-3 py-4 text-center">
					<h2 className="text-gray-950 font-bold text-xl mb-3 hover:text-gray-900 hover:cursor-pointer">{event.title}</h2>
				</div>
				<div className="text-center mb-5">
					<span className="badge  text-black h-10 rounded px-1 py-1 text-center  font-bold cursor-pointer">{formatearFecha(event.date)}</span>
				</div>

				<div className="p-6 pt-3">
					<button onClick={() => router.push(`/event/${event.id}`)} 
						className=" w-full select-none rounded-lg bg-gray-700 py-2.5 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-50/70 transition-all hover:shadow-lg hover:shadow-pink-200/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
						>
						See Event
					</button>
				</div>
			</div>
		</div>
	);
};

export default EventCard;

