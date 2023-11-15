
import EventDetail from "@/components/EventDetail";
const loadEvent = async(id) =>{
   const res = await fetch(`https://server-eventifypro.onrender.com/events/${id}`);
 
 //const res = await fetch(`http://localhost:3001/events/${id}`);
 
 
  const data = await res.json();
  return data
}
export default async function EventPage ({params}){
  const detailEvent = await loadEvent(params.id);

  return (
    <EventDetail detailEvent={detailEvent}/>
  );
}

