import { useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../services/eventService";
import EventForm from "../components/EventForm";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import AuthContext from "../context/AuthContext";
import { LogOut } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "../config";

const Dashboard = () => {
  const auth = useContext(AuthContext);

   
  const [socket, setSocket] = useState<Socket | null>(null);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const { data: events, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  
  useEffect(() => {
    const newSocket = io(API_BASE_URL,{
      transports: ["websocket", "polling"],
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("attendeeCount", (count) => {
      console.log("📡 Updated Attendee Count:", count);
      setAttendeeCount(count);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleJoinEvent = () => {
    if (socket) socket.emit("joinEvent");
  };

  const handleLeaveEvent = () => {
    if (socket) socket.emit("leaveEvent");
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching events</p>;

  const now = new Date();
  const filteredEvents = events?.filter((event: any) => {
    const eventDate = new Date(event.date);
    if (filter === "upcoming") return eventDate >= now;
    if (filter === "past") return eventDate < now;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-200 p-6 relative">
     
      <Button
        onClick={auth?.logout}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-md"
      >
        <LogOut size={20} />
      </Button>

      <h2 className="text-3xl font-bold text-center mb-6">🎉 Event Dashboard</h2>

      <p className="text-xl text-gray-700">Attendees: {attendeeCount}</p>

      <div className="mt-4 flex justify-center gap-4">
        <Button onClick={handleJoinEvent} className="bg-green-500 text-white px-6 py-3 rounded-md mb-4">
          Join Event
        </Button>
        <Button onClick={handleLeaveEvent} className="bg-red-500 text-white px-6 py-3 rounded-md mb-4">
          Leave Event
        </Button>
      </div>

     
      <div className="flex justify-center gap-4 mb-6">
        <Button onClick={() => setFilter("all")} className={filter === "all" ? "bg-blue-600" : ""}>
          All Events
        </Button>
        <Button onClick={() => setFilter("upcoming")} className={filter === "upcoming" ? "bg-green-600" : ""}>
          Upcoming Events
        </Button>
        <Button onClick={() => setFilter("past")} className={filter === "past" ? "bg-gray-600" : ""}>
          Past Events
        </Button>
      </div>

     
      <EventForm />

      
      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-600">No events found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event: any) => (
            <Card key={event._id} className="p-4 mt-6">
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-sm mt-2">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-sm">📍 {event.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
