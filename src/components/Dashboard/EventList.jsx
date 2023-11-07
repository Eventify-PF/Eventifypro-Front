import Event from "./Event";
const EventList = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
