import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

export const DashboardContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  
`;

export const DashboardH1 = styled.h1`
  font-size: 3rem;
  text-align: center;
  word-wrap: break-word;

  @media (max-width: 600px) { 
    font-size: 2rem; /* Tamanho menor em telas pequenas */
    text-align: left; /* Alinhar à esquerda para responsividade */
  }
`;

export const GuestsContainer = styled.div`
    border-bottom: 1px solid #ccc;    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const DivEventos = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    `;

export const DivTime = styled.div`
  display: flex;    
    justify-content: space-between; 
    align-items: center;
    margin-bottom: 10px;  
    p{
    font-weight: bold;
  }  
`;

export const Time = styled.time`
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
  text-align: center;

  
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #333;
  }

  button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.3s ease;


    &:hover {
      background-color: #cc0000;
    }
  }
`;

export const DivEvento = styled.div`
  background: #f9f9f9;  
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

    
   `; 

   export const DivEditarExcluir= styled.div`
    width: 100%;
    background: #f9f9f9;  
     padding: 12px;
     margin: 10px;
     border-radius: 8px;
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-around;    
    
    button {
      background-color:rgb(82, 80, 80);
      color: white;
      border: none;
      padding: 8px 16px;
      margin: 10px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.3s ease;
      
      &:hover {
        background-color: #cc0000;
      }
    }    
    
     `; 

     export const DivNovoBuscarSair= styled.div`
    width: 100%;
    background: #f9f9f9;  
     padding: 12px;
     margin: 10px;
     border-radius: 8px;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: space-around;    
    
    button {
      background-color:rgb(82, 80, 80);
      color: white;
      border: none;
      padding: 8px 16px;
      margin: 10px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.3s ease;
      
      &:hover {
        background-color: #cc0000;
      }
    }    

    @media (min-width: 550px){
      flex-direction: row;
    }
    
     `; 

export const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;

  li {
    background: #f9f9f9;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

    strong {
      font-size: 16px;
      color: #333;
    }

    span {
      font-size: 14px;
      color: #666;
    }
  }
`;



export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 280px;
  padding: 5px;
  @media (min-width:480px){
  width: 320px;
  }
`;

export const SearchIcon = styled(FaSearch)`
  color: #888;
  margin-right: 10px;
`;

export const SearchInput = styled.input`
  border: none;
  padding: 8px;
  font-size: 16px;
  outline: none;
  flex: 1;
  
  &::placeholder {
    color: #888;
  }
`;