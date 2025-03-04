// Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventoContext } from "../contexts/EventoContext";
import EditEventoModal from "../Components/EditEventoModal";
import { DashboardContainer, DivEditarExcluir, DivEvento, DivEventos, DivTime, Time, GuestsContainer, SearchWrapper, SearchIcon, SearchInput, DivNovoBuscarSair, DashboardH1 } from "./DashboardPage.styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "./styles";

const Dashboard = () => {
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const { eventos, fetchEventos, deleteEvento, inviteUser, denyInvite, cancelInvite} = useContext(EventoContext);
  const navigate = useNavigate();
  const {logout, user} = useContext(AuthContext)
  const MySwal = withReactContent(Swal)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {          
      fetchEventos();         
  },[user]);
  
  const filteredEventos = eventos.filter(evento =>
    evento.description.toLowerCase().includes(searchTerm.toLowerCase())
  );


  //React Modal
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  const openEditModal = (evento) => {   
    setSelectedEvento(evento);
    setEditModal(true);
  }; 

  function closeModal() {
    setIsOpen(false);
    setEditModal(false);
    setCreateModal(false);
    setSelectedEvento(null);
  }

  //fim react-modal

  function confirmDelete(evento) {
    Swal.fire({
      title: "Cancelar "+evento.description+"?",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then((result) => {     
      if (result.isConfirmed) {
        deleteEvento(evento.id);
        Swal.fire("O evento "+evento.description+" foi excluído!", "", "success"); 
      } 
    });
  }

  function denyInvitation(evento) {
    Swal.fire({
      title: "Recusar o convite para: "+evento.description+"?",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then((result) => {
      if (result.isConfirmed) {
        denyInvite(evento.id);
        Swal.fire("Você recusou o convite para "+evento.description, "", "success");
      } 
    });
  }


  function cancelInvitation(evento,convidado) {
    Swal.fire({
      title: "Cacelar o convite para: "+convidado.name+"?",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then((result) => {
      if (result.isConfirmed) {        
        cancelInvite(evento.id,convidado.id);
        Swal.fire("Você cancelou o convite para "+convidado.name, "", "success");
      } 
    });
  }

  

  const inviteUserHandle = (evento) => {
    Swal.fire({
      title: "Email do convidado",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Convidar",
      showLoaderOnConfirm: true,
      preConfirm: async (user_email) => {
        try {
          inviteUser(user_email,evento.id);
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Convite enviado!"
        });
      }
    });
  }


  const formatDateTime = (isoString) => {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    }).format(new Date(isoString));
  };


  function handleSair() { 
    logout();
    navigate("/login")    
  }
  

  function showGuests (evento){
    MySwal.fire({
      title: 'Convidados para '+evento.description,
      showCloseButton: true,
      html: <>
      {
        evento.users.map((u) => (
          <GuestsContainer key={u.id}>
            <p >{u.name}</p>
            {!evento.isInvited ?
            <button onClick={()=> cancelInvitation(evento,u)}><FaTrash size={20}/></button> : ''}
          </GuestsContainer>
        ))
      }
    </>           
    })
  }


  return (
    <DashboardContainer>
      <DashboardH1>Meus Eventos</DashboardH1>
      <DivNovoBuscarSair>
        <button onClick={() => setCreateModal(true)}>Novo Evento</button>
        <SearchWrapper>
          <SearchIcon size={20} />
          <SearchInput
            type="text"
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>        
        <button onClick={() => handleSair()}>Sair</button>
      </DivNovoBuscarSair>
      <DivEventos>
        {filteredEventos.map((evento) => (
          <DivEvento key={evento.id}>
            <p>{evento.description}</p>            
            <DivTime>
            <p>Início:</p>
              <Time dateTime={evento.startTime}>             
                {formatDateTime(evento.startTime)}
              </Time>
            </DivTime>
            <DivTime>
              <p>Fim:</p>
              <Time dateTime={evento.endTime}>              
                {formatDateTime(evento.endTime)}
              </Time>  
            </DivTime> 
            <DivEditarExcluir>
              {!evento.isInvited ?
                <>
                <button onClick={() => openEditModal(evento)}><FaEdit size={20}/></button>
                <button onClick={() => inviteUserHandle(evento)}><MdPersonAddAlt1 size={20}/></button>
                <button onClick={()=> confirmDelete(evento)}><FaTrash size={20}/></button>
                </>
                :
                <>
                <p>Convidado</p>  
                <button onClick={()=> denyInvitation(evento)}><FaTrash size={20}/></button> 
                </>            
              }               
            </DivEditarExcluir>
            {evento.users && evento.users.length > 0 ? (
              <Button onClick={() => showGuests(evento)}>Lista de convidados</Button>
              ) : null}             
          </DivEvento>
        ))}
      </DivEventos>     

      {editModal && selectedEvento && (
        <EditEventoModal evento={selectedEvento} onClose={closeModal} isUpdateProp={true}/>
      )}

      {createModal && (
        <EditEventoModal evento={selectedEvento} onClose={closeModal} isUpdateProp={false}/>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
