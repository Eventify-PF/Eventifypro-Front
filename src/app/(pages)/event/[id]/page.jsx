import EventDetailClient from "./EventDetailClient";
import axios from "axios";

const loadEvent = async (id) => {
  try {
    const res = await axios.get(`https://server-eventifypro.onrender.com/events/${id}`);
    const data = res.data; // Utiliza res.data en lugar de await res.json() para axios
    return data;
  } catch (error) {
    console.error("Error al cargar el evento:", error);
    throw error; // Lanza el error para que se propague
  }
};

export default async function EventPage({ params }) {
  try {
    const detailEvent = await loadEvent(params.id);

    return <EventDetailClient detailEvent={detailEvent} />;
  } catch (error) {
    // Puedes manejar el error aquí, redirigir o mostrar un mensaje de error en caso de que falle la carga.
    console.error("Error en la página de eventos:", error);
    return <div>Error al cargar el evento. Por favor, inténtalo de nuevo más tarde.</div>;
  }
}

