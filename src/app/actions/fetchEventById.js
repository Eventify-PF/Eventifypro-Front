export async function fetchEventById(id) {
    const response = await fetch(`http://localhost:3001/events/${id}`);
    const data = await response.json();
    return data
}