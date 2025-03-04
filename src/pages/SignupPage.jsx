import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Container, ContainerSignupPage,Form, Input, ErrorP, Button } from "./styles";
import { AuthContext } from "../contexts/AuthContext";

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),  
  password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteresres").required("A senha é obrigatória"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref("password"), null], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
});

const Signup = ({ onSignup }) => {
  // const navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [password, setPassword] = useState("");
 
  const {signup} = useContext(AuthContext)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {    
    signup(data.name, data.email, data.password);
  };


  return (    
      <ContainerSignupPage>      
        <h2>Cadastro</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>  
            <Input placeholder="Nome" {...register("name")} />
            <ErrorP>{errors.name?.message}</ErrorP>  
            
            <Input placeholder="Email" type="email" {...register("email")} />
            <ErrorP>{errors.email?.message}</ErrorP>

            <Input placeholder="Senha" type="password" {...register("password")} />
            <ErrorP>{errors.password?.message}</ErrorP>

            <Input placeholder="Confirme a senha" type="password" {...register("passwordConfirm")} />
            <ErrorP>{errors.passwordConfirm?.message}</ErrorP>
            
          <button type="submit">Cadastrar</button>
        </Form>          
      </ContainerSignupPage>   
  );
};

export default Signup;
