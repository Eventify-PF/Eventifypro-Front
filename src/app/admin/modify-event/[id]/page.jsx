import EditEventForm from "@/components/updateEvent";

const loadEvent = async (id) => {
  try {
    // const response = await fetch(`http://localhost:3001/events/${id}`);
    const response = await fetch(
      `https://server-eventifypro.onrender.com/events/${id}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error al cargar el evento:", error);
    return null; // Trata el error adecuadamente según tus necesidades
  }
};

export default async function EventPage({ params }) {
  const detailEvent = await loadEvent(params.id);

  if (!detailEvent) {
    // Trata el caso en el que no se pueda cargar el evento
    return <div>No se pudo cargar el evento.</div>;
  }

  return <EditEventForm detailEvent={detailEvent} />;
}
