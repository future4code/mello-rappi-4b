import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GoBackIcon from "../../images/back.svg";
import {
  Header,
  UserInfoContainer,
  UserInfoCard,
  GoBackIconContainer,
  InputLabel,
  UserInput,
  SubmitButton,
} from "./styles";

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
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [cpf, setCpf] = useState();
  const history = useHistory();

  useEffect(() => {
    getProfile();

    if (currentInfo !== undefined && firstAttempt === false) {
      setFirstAttempt(true);
      setName(currentInfo.name);
      setEmail(currentInfo.email);
      setCpf(currentInfo.cpf);
    }
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

  const handleUpdateName = (event) => {
    setName(event.target.value);
  };

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdateCpf = (event) => {
    setCpf(event.target.value);

    if (event.target.value.length > 3 && event.target.value.length <= 4) {
      setCpf(cpf + ".");
    }
    if (event.target.value.length > 7 && event.target.value.length <= 8) {
      setCpf(cpf + ".");
    }
    if (event.target.value.length > 11 && event.target.value.length <= 12) {
      setCpf(cpf + "-");
    }
  };

  return (
    <>
      <Header>
        <GoBackIconContainer src={GoBackIcon} onClick={goToProfilePage} />
        Meu perfil
      </Header>

      <UserInfoContainer>
        <UserInfoCard>
          <InputLabel>Nome* </InputLabel>
          <UserInput
            placeholder="Joana"
            value={name}
            onChange={handleUpdateName}
          ></UserInput>
          <InputLabel>E-mail* </InputLabel>
          <UserInput
            placeholder="joana@outlook.com"
            value={email}
            onChange={handleUpdateEmail}
          ></UserInput>
          <InputLabel>CPF</InputLabel>
          <UserInput
            placeholder="000.000.000-00"
            pattern="/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/"
            value={cpf}
            onChange={handleUpdateCpf}
          ></UserInput>
          <SubmitButton onClick={editUserInfo}>Salvar</SubmitButton>
        </UserInfoCard>
      </UserInfoContainer>
    </>
  );
};

export default ProfileInfoEdition;
