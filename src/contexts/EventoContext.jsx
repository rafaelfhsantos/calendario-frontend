import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";

export const EventoContext = createContext();

export function EventoProvider({ children }) {
    const [eventos, setEventos] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchEventos();
        }
    }, [user]);

    const fetchEventos = async () => {
        try {
            const response = await axios.get("http://localhost:5000/eventos/meus");
            const responseInvited = await axios.get("http://localhost:5000/eventos/convites")
                        
            const responseInvitedFlagged = responseInvited.data.map(e =>{
                return { ...e, isInvited: true };
            });             
                      
            setEventos(response.data.concat(responseInvitedFlagged).sort((a, b) => new Date(a.startTime) - new Date(b.startTime)));
        } catch (error) {
            if(user){
                console.error("Erro ao buscar eventos", error);
            }            
        }
    };

    const createEvento  = async (eventoData) => {
        try {
            const response = await axios.post("http://localhost:5000/evento", eventoData);
            setEventos([...eventos, response.data]);
            Swal.fire("Evento criado com sucesso!", "", "success");    
            fetchEventos();       
        } catch (error) {
            console.error("Erro ao criar evento", error);
            if(error.response.data.message == 'Event already exists for this date and time'){                
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Já existe um evento marcado para esse dia e horário!',
                  })
            }
        }
    };

    const updateEvento = async (id, updatedEvento) => {
        try {            
            const response = await axios.put(`http://localhost:5000/evento/${id}`, updatedEvento);            
            
            await fetchEventos();
        } catch (error) {
            console.error("Erro ao atualizar evento", error);
            if(error.response.data.message == 'Event already exists for this date and time'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Já existe um evento marcado para esse dia e horário!',
                  })
            }
            
        }
    };

    const deleteEvento = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/evento/${id}`);
            setEventos(eventos.filter(evento => evento.id !== id));
        } catch (error) {
            console.error("Erro ao excluir evento", error);
        }
    };

    const denyInvite = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/invitedeny/${id}`);
            setEventos(eventos.filter(evento => evento.id !== id));
        } catch (error) {
            console.error("Erro ao recusar o convite", error);
        }
    };

    const cancelInvite = async (evento_id,guest_id) =>{
        try {
            await axios.patch(`http://localhost:5000/cancelinvite/${evento_id}/${guest_id}`);
            await fetchEventos();
        } catch (error) {
            console.error("Erro ao cancelar o convite", error);
        }
        
    }

    const inviteUser = async (user_email,evento_id) => {
        try {
            await axios.patch(`http://localhost:5000/invite/${user_email}/${evento_id}`);

            await fetchEventos();

        } catch (error) {
            console.error("Erro ao convidar usuário", error);
            if(error.response.data.message == 'User not found'){                
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuário não encontrado!',
                  })
            }

            if(error.response.data.message == 'Guest already has events in this date'){                
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'O convidado já possui eventos marcados para essa data!',
                  })
            }
        }
    }

    return (
        <EventoContext.Provider value={{ eventos, createEvento, updateEvento, deleteEvento, inviteUser, fetchEventos, denyInvite, cancelInvite }}>
            {children}
        </EventoContext.Provider>
    );
}
