import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {
  PageConteiner,
  Logo,
  Tittle,
  InputContainer,
  Button
} from "./styles";
import LogoImage from "./logo.svg";


const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4B"

function SignUpPage() {
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); //como faço pra garantir que só haja um usuário com o cpf e email?
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState(""); //Posso usar algum dos nossos hooks?

  const handleSignUp = async (event) => {
    event.preventDefault();

//como faço pra confirmar a senha, para preencher os dois campos de senha?
    const body = {
      name: name,
      email: email,
      cpf: cpf,
      password: password, 
    };

    try {
      const response = await axios.post(`${baseUrl}/signup`, body);
      localStorage.setItem("token", response.data.token);
      history.push("/profile"); //isso já dará certo? Vai pra página de endereço?
    } catch (e) {
      alert("Falha no cadastro");
    }
  };

  return (
    <PageConteiner>
      <Logo src={LogoImage} />
      <Tittle>Cadastrar</Tittle>

      <InputContainer>
        <TextField
          label="Nome"
          style={{ margin: 8 }}
          placeholder="Nome e sobrenome"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="name"
          required
          fullWidth
        />
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
          label="CPF"
          style={{ margin: 8 }}
          placeholder="000.000.000-00"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          id="cpf"
          type="cpf"
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
        <TextField
          label="Senha"
          style={{ margin: 8 }}
          placeholder="Confirme a senha anterior"
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
        <Button onClick={handleSignUp}><b>Criar</b></Button>
      </InputContainer>
    </PageConteiner>
  );
}

export default SignUpPage;

