import EditTicketForm from "@/components/updateTicket";
import axios from "axios";

const loadTicket = async (id) => {
  try {
    // const res = await fetch(`http://localhost:3001/events/ticket/${id}`);
    const res = await fetch(
      `https://server-eventifypro.onrender.com/events/ticket/${id}`
    );
    if (!res.ok) {
      throw new Error("No se pudo cargar el ticket.");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error al cargar el ticket:", error);
    return null; // Trata el error adecuadamente según tus necesidades
  }
};

export default async function EventPage({ params }) {
  const detailTicket = await loadTicket(params.id);

  if (!detailTicket) {
    // Trata el caso en el que no se pueda cargar el ticket
    return <div>No se pudo cargar el ticket.</div>;
  }

  return <EditTicketForm detailTicket={detailTicket} />;
}
