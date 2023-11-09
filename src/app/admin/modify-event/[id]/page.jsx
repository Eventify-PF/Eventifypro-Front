import EditEventForm from "./updateEvent";
const loadEvent = async (id) => {
  const res = await fetch(
    `https://server-eventifypro.onrender.com/events/${id}`
  );
  const data = await res.json();
  return data;
};
export default async function EventPage({ params }) {
  const detailEvent = await loadEvent(params.id);

  return <EditEventForm detailEvent={detailEvent} />;
}
