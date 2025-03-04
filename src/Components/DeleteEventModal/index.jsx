import axios from "axios";

const DeleteEventModal = ({ evento, onClose, onEventDeleted }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/evento/${evento.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onEventDeleted();
      onClose();
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    }
  };

  return (
    <div className="modal">
      <h3>Tem certeza que deseja excluir este evento?</h3>
      <p>{evento.description}</p>
      <button onClick={handleDelete}>Sim, excluir</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default DeleteEventModal;
