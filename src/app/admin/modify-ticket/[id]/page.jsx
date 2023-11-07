import EditTicketForm from "./updateTicket";
const loadTicket = async (id) => {
  const res = await fetch(`http://localhost:3001/events/${id}`);
  const data = await res.json();
  return data.tickets[0];
};

export default async function EventPage({ params }) {
  const detailTicket = await loadTicket(params.id);

  return <EditTicketForm detailTicket={detailTicket} />;
}
