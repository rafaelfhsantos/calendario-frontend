import React from "react";
import LoginForm from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";
import { ContainerSignupButton } from "./styles";


const Login = ({ onLogin }) => {
const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo!</h1>
      <LoginForm onLogin={onLogin} />
      <ContainerSignupButton>
        <p>Não possui cadastro?</p>
        <button onClick={() => navigate("/signup")}>Nova conta</button>
      </ContainerSignupButton>
    </div>
  );
};

export default Login;
