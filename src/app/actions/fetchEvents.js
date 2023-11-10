
export default async function fetchEvents() {
    try {
        const response = await fetch('http://localhost:3001/events');
        return await response.json();
    } catch (error) {
        throw error;
    }
}