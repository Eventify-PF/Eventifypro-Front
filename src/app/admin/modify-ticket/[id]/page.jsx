import EditTicketForm from "./updateTicket";
const loadTicket = async (id) => {
  const res = await fetch(
    `https://server-eventifypro.onrender.com/events/${id}`
  );
  const data = await res.json();
  return data.tickets[0];
};

export default async function EventPage({ params }) {
  const detailTicket = await loadTicket(params.id);

  return <EditTicketForm detailTicket={detailTicket} />;
}
