import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import EditIcon from "../../images/edit.svg";
import NavBar from "./navbar.js";

import {
  Header,
  UserInfoContainer,
  UserInfoWrapper,
  UserInfoCard,
  EditIconContainer,
  HighlightedText,
  UserHistoryContainer,
  NoOrdersMessage,
  PreviousOrdersContainer,
  PreviousOrdersCard,
  OrderNameText,
  OrderDateText,
  OrderTotalText,
} from "./styles";

const axiosConfig = {
  headers: {
    auth:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InBjNXFTdlpoM0U1cFFRSE1qcVVEIiwibmFtZSI6IkZhYnLDrWNpbyBSb2RyaWd1ZXMiLCJlbWFpbCI6ImVhcnRoYm9ybnNoZXBhcmRAbGFiZW51LmNvbSIsImNwZiI6IjQ0NC4xMTEuMTExLTExIiwiaGFzQWRkcmVzcyI6dHJ1ZSwiYWRkcmVzcyI6IkF2IDkgZGUgSnVsaG8sIDI4OCwgNzEgLSBKYXJkaW0gQ29uY2Vpw6fDo28iLCJpYXQiOjE1OTQ2NjgyOTJ9.KktOLR9lOwxi_VA-w2TwEwuXpKccg1dkV100ozdfpZw",
  },
};

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4B";

const UserProfilePage = () => {
  const [user, setUser] = useState();

  const history = useHistory();

  const [previousOrders, setPreviousOrders] = useState([
    {
      name: "Bullguer Vila Madalena",
      date: "23 Outubro 2019",
      total: 67.0,
    },
    {
      name: "Vinil Burguer Butantã",
      date: "30 Setembro 2019",
      total: 89.0,
    },
    {
      name: "Bullguer Vila Madalena",
      date: "10 Setembro 2019",
      total: 77.5,
    },
    {
      name: "Papa Pizza",
      date: "6 Setembro 2019",
      total: 29.9,
    },
  ]);

  useEffect(() => {
    getProfile();
    getHistory();
  }, [user]);

  const getProfile = () => {
    axios
      .get(`${baseUrl}/profile`, axiosConfig)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getHistory = () => {
    axios
      .get(`${baseUrl}/orders/history`, axiosConfig)
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const goToEditProfilePage = () => {
    history.push("/profile/edit");
  };

  const goToEditAddressPage = () => {
    history.push("/profile/edit-address");
  };

  const userInfoMap = () => {
    return (
      <UserInfoContainer>
        <UserInfoWrapper>
          <UserInfoCard>
            <EditIconContainer src={EditIcon} onClick={goToEditProfilePage} />
            <HighlightedText>{user.name}</HighlightedText>
            <div>{user.email}</div>
            <div>{user.cpf}</div>
          </UserInfoCard>
        </UserInfoWrapper>
        <UserInfoWrapper>
          <UserInfoCard>
            <EditIconContainer src={EditIcon} onClick={goToEditAddressPage} />
            <HighlightedText>Endereço cadastrado:</HighlightedText>
            <div>{user.address}</div>
          </UserInfoCard>
        </UserInfoWrapper>
      </UserInfoContainer>
    );
  };

  return (
    <>
      <Header>Meu perfil</Header>
      {user === undefined ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
          }}
        >
          <CircularProgress style={{ color: "#e86e5a" }} />
        </div>
      ) : (
        <>
          {userInfoMap()}

          <NavBar />
          <UserHistoryContainer>
            <h4>Histórico de pedidos:</h4>
          </UserHistoryContainer>
          {previousOrders.length === 0 && (
            <NoOrdersMessage>Você não realizou nenhum pedido</NoOrdersMessage>
          )}
          {previousOrders.map((order) => {
            return (
              <PreviousOrdersContainer>
                <PreviousOrdersCard>
                  <OrderNameText>{order.name}</OrderNameText>
                  <OrderDateText>{order.date}</OrderDateText>
                  <OrderTotalText>
                    SUBTOTAL: R${order.total.toFixed(2)}
                  </OrderTotalText>
                </PreviousOrdersCard>
              </PreviousOrdersContainer>
            );
          })}
          <div style={{ marginTop: 100 }}></div>
        </>
      )}
    </>
  );
};

export default UserProfilePage;
