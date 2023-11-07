const Filters = ({
  eventTypes,
  handleFilterByEventType,
  handleFilterEventDate,
}) => {
  const eventTypesOptions = eventTypes.map((eventType) => (
    <option key={eventType.id} value={eventType.id}>
      {eventType.name}
    </option>
  ));
  return (
    <div className="bg-gray-50 p-4">
      <p className="text-lg font-semibold mb-2">Filters</p>
      <div className="mb-4">
        <label className="block mb-1">Event Types:</label>
        <select
          onChange={handleFilterByEventType}
          className="border p-2 w-full"
        >
          <option value="all">Choose Categories</option>
          {eventTypesOptions}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Date:</label>
        <input
          type="date"
          className="border p-2 w-full"
          onChange={handleFilterEventDate}
        />
      </div>
    </div>
  );
};

export default Filters;
