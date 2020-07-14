import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
//import Logo from "../../logo-future-eats@2x.png";

const PageConteiner = styled.div `
display: flex;
flex-direction: column;
align-items: center;
`

//xport const ImgBox = styled.div`
//align-items: center;
//justify-items: center;
//`;


const BaseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4b/login"


const LoginPage = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${BaseUrl}`, body);
      localStorage.setItem("token", response.data.token);
      history.push("/restaurants/:id");
    } catch (e) {
      alert("Falha no login");
    }
  };

  const goToSignUpPage = () => {
    history.push("/signup");
  };


  return (
  <PageConteiner>
    <h1>LOGIN PAGE</h1>
    <div>Entrar</div>
    <form>
      <label htmlFor="email">E-mail</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="email"
        required
      />
      <label htmlFor="password">Senha</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        type="password"
        required
     />
      <button onClick={handleLogin}>Entrar</button>
    </form>
    <button onClick={goToSignUpPage}>Cadastre-se!</button>
  </PageConteiner>
  )

};

export default LoginPage;

