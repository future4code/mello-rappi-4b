import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import {
  PageConteiner,
  Logo,
  Tittle,
  InputContainer,
  Input,
  Button
} from './styles'


import LogoImage from './logo.svg';



const BaseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4B/login"


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
      history.push("/");
    } catch (e) {
      alert("Falha no login");
    }
  };

  const goToSignUpPage = () => {
    history.push("/signup");
  };



  return (
    <PageConteiner>
      <Logo src={LogoImage} />
      <Tittle>Entrar</Tittle>
      <InputContainer>
        <TextField
          label="E-mail"
          style={{ margin: 8 }}
          placeholder="email@email.com"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          required
          fullWidth
        />
        <TextField
          label="Senha"
          style={{ margin: 8 }}
          placeholder="Minimo 6 caracteres"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          required
          fullWidth
        />

        <Button onClick={handleLogin}><b>Entrar</b></Button>
      </InputContainer>
      <p onClick={goToSignUpPage}>Não tem cadastro? Clique aqui</p>
    </PageConteiner>
  )

};

export default LoginPage;

