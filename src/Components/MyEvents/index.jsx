import { useState, useEffect } from "react";
import axios from "axios";
import EditEventModal from "../EditEventModal";
import DeleteEventModal from "../DeleteEventModal";


const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/eventos/meus", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  return (
    <div>
      <h2>Meus Eventos</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.description} - {new Date(event.startTime).toLocaleString()}
            <button onClick={() => handleEditClick(event)}>Editar</button>
            <button onClick={() => handleDeleteClick(event)}>Excluir</button>
          </li>
        ))}
      </ul>

      {isEditModalOpen && (
        <EditEventModal
          evento={selectedEvent}
          onClose={() => setIsEditModalOpen(false)}
          onEventUpdated={fetchEvents}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteEventModal
          evento={selectedEvent}
          onClose={() => setIsDeleteModalOpen(false)}
          onEventDeleted={fetchEvents}
        />
      )}
    </div>
  );
};

export default MyEvents;
