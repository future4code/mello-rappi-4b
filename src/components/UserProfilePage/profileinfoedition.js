import React, { useState, useEffect } from "react";
import useInputValue from "../../hooks/useInputValue";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GoBackIcon from "../../images/back.svg";
import styled from "styled-components";
import {
  Header,
  MainContainer,
  UserInfoContainer,
  GoBackIconContainer,
  InputLabel,
  UserInput,
  SubmitButton,
} from "./styles";

const UserInfoCard = styled.section`
  width: 328px;
  margin: 10px auto 0 auto;
  letter-spacing: -0.39px;
  line-height: 25px;
  margin-bottom: 10px;
`;

const axiosConfig = {
  headers: {
    auth:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InBjNXFTdlpoM0U1cFFRSE1qcVVEIiwibmFtZSI6IkZhYnLDrWNpbyBSb2RyaWd1ZXMiLCJlbWFpbCI6ImVhcnRoYm9ybnNoZXBhcmRAbGFiZW51LmNvbSIsImNwZiI6IjQ0NC4xMTEuMTExLTExIiwiaGFzQWRkcmVzcyI6dHJ1ZSwiYWRkcmVzcyI6IkF2IDkgZGUgSnVsaG8sIDI4OCwgNzEgLSBKYXJkaW0gQ29uY2Vpw6fDo28iLCJpYXQiOjE1OTQ2NjgyOTJ9.KktOLR9lOwxi_VA-w2TwEwuXpKccg1dkV100ozdfpZw",
  },
};

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4B";

const ProfileInfoEdition = () => {
  const [currentInfo, setCurrentInfo] = useState(undefined);
  const [firstAttempt, setFirstAttempt] = useState(false);
  const [name, handleChangeName] = useInputValue("");
  const [email, handleChangeEmail] = useInputValue("");
  const [cpf, setCpf] = useState("");
  const history = useHistory();

  useEffect(() => {
    getProfile();

    // if (currentInfo !== undefined && firstAttempt === false) {
    //   setFirstAttempt(true);
    //   setName(currentInfo.name);
    //   setEmail(currentInfo.email);
    //   setCpf(currentInfo.cpf);
    // }
  }, [currentInfo, firstAttempt]);

  const getProfile = () => {
    axios
      .get(`${baseUrl}/profile`, axiosConfig)
      .then((response) => {
        setCurrentInfo(response.data.user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const goToProfilePage = () => {
    history.push("/profile");
  };

  const editUserInfo = () => {
    const body = {
      name: name,
      email: email,
      cpf: cpf,
    };

    axios
      .put(`${baseUrl}/profile`, body, axiosConfig)
      .then(() => {
        alert("Perfil atualizado com sucesso!");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handleUpdateCpf = (event) => {
    setCpf(event.target.value);
  };

  return (
    <MainContainer>
      <Header>
        <GoBackIconContainer src={GoBackIcon} onClick={goToProfilePage} />
        Meu perfil
      </Header>

      <UserInfoContainer>
        <UserInfoCard>
          <form>
            <InputLabel>Nome* </InputLabel>
            <UserInput
              value={name}
              type="text"
              onChange={handleChangeName}
              required
            ></UserInput>
            <InputLabel>E-mail* </InputLabel>
            <UserInput
              value={email}
              type="email"
              onChange={handleChangeEmail}
              required
            ></UserInput>
            <InputLabel>CPF</InputLabel>
            <UserInput
              pattern="/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/"
              value={cpf}
              onChange={handleUpdateCpf}
              required
            ></UserInput>
            <SubmitButton onClick={editUserInfo}>Salvar</SubmitButton>
          </form>
        </UserInfoCard>
      </UserInfoContainer>
    </MainContainer>
  );
};

export default ProfileInfoEdition;
