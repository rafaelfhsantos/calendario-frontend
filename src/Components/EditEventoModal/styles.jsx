import styled from "styled-components";

export const Input = styled.input`
  
  padding: 10px;
  margin: 10px ;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const DescriptionInput = styled.input`
  width: 160px;
  padding: 10px;
  margin: 10px ;
  border-radius: 5px;
  border: 1px solid #ccc;
  @media (min-width: 768px) {
    width: 400px;
  }
`;

export const DivTime = styled.div`
  display: flex;    
    justify-content: center; 
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;  
    
    p{
        font-weight: bold;
        margin-bottom: 0px;
    }  

    @media (min-width: 768px) {
        flex-direction: row;
        p{        
            margin-bottom: 10px;
        } 
    }
`;

export const ModalContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  button{
  margin: 10px;
  }
`;

export const DivSalvarCancelar = styled.div`
  display: flex;    
    justify-content: center; 
    align-items: center;
    flex-direction: row;
    margin-bottom: 10px;      
   
`;