export default async function fetchTypeEvents() {
    try {
        const res = await fetch('http://localhost:3001/eventTypes');
        const data = await res.json();
        return data
    } catch (error) {
        console.log("Error", error);
    }
}