import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const EventForm = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    category: "Workshop",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newEvent: any) => {
      return await axios.post("http://127.0.0.1:5000/api/events", newEvent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
 // Refresh event list
      setEvent({ name: "", description: "", date: "", location: "", category: "Workshop" });
      alert("Event Created Successfully!");
    },
    onError: (error) => {
      console.error("Error adding event:", error);
      alert("Failed to create event");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(event);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input className="w-full p-2 border mb-2" type="text" placeholder="Event Name" value={event.name}
          onChange={(e) => setEvent({ ...event, name: e.target.value })} />
        <input className="w-full p-2 border mb-2" type="text" placeholder="Description" value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })} />
        <input className="w-full p-2 border mb-2" type="date" value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })} />
        <input className="w-full p-2 border mb-2" type="text" placeholder="Location" value={event.location}
          onChange={(e) => setEvent({ ...event, location: e.target.value })} />
        <select className="w-full p-2 border mb-4" value={event.category}
          onChange={(e) => setEvent({ ...event, category: e.target.value })}>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Conference">Conference</option>
          <option value="Meetup">Meetup</option>
        </select>
        <button className="w-full bg-blue-500 text-white p-2 rounded-md" type="submit">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
