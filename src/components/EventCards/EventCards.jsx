'use client';
import EventCard from "../EventCard/EventCard";
const EventCards = ({events}) => {
	return (
		<div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 my-10">
			{events.map((event)=> <EventCard key={event.id} event={event} />)}
		</div>
	);
};

export default EventCards;