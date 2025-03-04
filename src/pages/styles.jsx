import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerSignupButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ContainerSignupPage= styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2{
  text-align: center;
  }

  @media (min-width: 600px){
      width: 500px;
  }
`;

export const ErrorP = styled.p`
    color: #D00;
    margin-top: 2px;
    text-align: center;
`;

export const Form = styled.form`   
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px ;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;

  @media (min-width: 600px){
      width: 400px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;
