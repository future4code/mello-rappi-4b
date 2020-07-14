import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import GoBackIcon from "../../images/back.svg";
import {
  Header,
  UserInfoContainer,
  GoBackIconContainer,
  SubmitButton,
  UserInput,
  InputLabel,
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

const UserProfilePage = () => {
  const history = useHistory();
  const [currentInfo, setCurrentInfo] = useState(undefined);
  const [firstAttempt, setFirstAttempt] = useState(false);
  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [neighbourhood, setNeighbourhood] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [complement, setComplement] = useState();

  useEffect(() => {
    getFullAdress();

    if (currentInfo !== undefined && firstAttempt === false) {
      setFirstAttempt(true);
      setStreet(currentInfo.street);
      setNumber(currentInfo.number);
      setNeighbourhood(currentInfo.neighbourhood);
      setCity(currentInfo.city);
      setState(currentInfo.state);
      setComplement(currentInfo.complement);
    }
  }, [currentInfo, firstAttempt]);

  const getFullAdress = () => {
    axios.get(`${baseUrl}/profile/address`, axiosConfig).then((response) => {
      setCurrentInfo(response.data.address);
    });
  };

  const goToProfilePage = () => {
    history.push("/profile");
  };

  const editAddress = () => {
    const body = {
      street: street,
      number: number,
      complement: complement,
      neighbourhood: neighbourhood,
      city: city,
      state: state,
    };

    axios
      .put(`${baseUrl}/address`, body, axiosConfig)
      .then(() => {
        alert("Endereço atualizado/cadastrado com sucesso!");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handleUpdateStreet = (event) => {
    setStreet(event.target.value);
  };

  const handleUpdateNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleUpdateComplement = (event) => {
    setComplement(event.target.value);
  };

  const handleUpdateNeighbourhood = (event) => {
    setNeighbourhood(event.target.value);
  };

  const handleUpdateCity = (event) => {
    setCity(event.target.value);
  };

  const handleUpdateState = (event) => {
    setState(event.target.value);
  };

  return (
    <>
      <Header>
        <GoBackIconContainer src={GoBackIcon} onClick={goToProfilePage} />
        Endereço
      </Header>

      <UserInfoContainer>
        <UserInfoCard>
          <form>
            <InputLabel>Logradouro* </InputLabel>
            <UserInput
              placeholder="Av. Nove de Julho"
              value={street}
              onChange={handleUpdateStreet}
              required
            ></UserInput>
            <InputLabel>Número* </InputLabel>
            <UserInput
              placeholder="415"
              value={number}
              onChange={handleUpdateNumber}
              required
            ></UserInput>
            <InputLabel>Complemento</InputLabel>
            <UserInput
              placeholder="Apto./Bloco"
              value={complement}
              onChange={handleUpdateComplement}
            ></UserInput>
            <InputLabel>Bairro* </InputLabel>
            <UserInput
              placeholder="Jardim das Palmeiras"
              value={neighbourhood}
              onChange={handleUpdateNeighbourhood}
              required
            ></UserInput>
            <InputLabel>Cidade* </InputLabel>
            <UserInput
              placeholder="São Paulo"
              value={city}
              onChange={handleUpdateCity}
              required
            ></UserInput>
            <InputLabel>Estado* </InputLabel>
            <UserInput
              placeholder="SP"
              value={state}
              onChange={handleUpdateState}
              required
            ></UserInput>
            <SubmitButton onClick={editAddress}>Salvar</SubmitButton>
          </form>
        </UserInfoCard>
      </UserInfoContainer>
    </>
  );
};

export default UserProfilePage;
