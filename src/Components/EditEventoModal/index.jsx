// EditEventModal.jsx
import React, { useState, useEffect, useContext } from "react";
import { EventoContext } from "../../contexts/EventoContext";
import { DescriptionInput, DivSalvarCancelar, DivTime, Input, ModalContent } from "./styles";
import Modal from "react-modal";


const EditEventoModal = ({ evento, onClose, isUpdateProp }) => {
  const { updateEvento } = useContext(EventoContext);
  const {createEvento} = useContext(EventoContext);
  const [isUpdate, setIsUpdate] = useState(isUpdateProp);
  const [description, setDescription] = useState(evento ? evento.description : "");
  const [startTime, setStartTime] = useState(evento ? evento.startTime ? evento.startTime.slice(0, 16) : "" : "");
  const [endTime, setEndTime] = useState(evento ? evento.endTime ? evento.endTime.slice(0, 16) : "" : "");


  const handleSave = () => {    
    if (!isUpdateProp) {
      createEvento({ description, startTime, endTime });
      onClose();
      return;
    }
    const updatedEvento = { ...evento, description, startTime, endTime };       
    updateEvento(evento.id,updatedEvento); // Atualiza o evento no contexto
    onClose();
  };

  return (    
    <Modal isOpen={true} onRequestClose={onClose}>    

    <ModalContent>
      {isUpdate ? 
      <h3>Editar Evento: {evento.description}</h3> : <h3>Novo Evento </h3>}
     
      <DescriptionInput
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição do evento"
      />
      <DivTime>
        <p>Início:</p>
        <Input
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Data de início"
          type="datetime-local"
        />
      </DivTime>

      <DivTime>
        <p>Fim:</p>
        <Input
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="Data de Fim"
          type="datetime-local"
        /> 
      </DivTime>
           

      <DivSalvarCancelar>
        <button onClick={handleSave}>{isUpdate ? "Salvar" : "Criar"} </button>
        <button onClick={onClose}>Cancelar</button>
      </DivSalvarCancelar>

      </ModalContent>
    {/* </div> */}
    </Modal>
  );
};

export default EditEventoModal;
