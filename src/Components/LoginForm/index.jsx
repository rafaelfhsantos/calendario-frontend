import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Input, Button, ErrorMessage } from "./styles";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useContext(AuthContext)

  // <AuthContext.Provider value={{ user, login, logout, loading }}>

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetar erro antes de tentar novamente

    setError(login(email, password));   
    
  };

  return (
    <Container>
      <h2>Login</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
