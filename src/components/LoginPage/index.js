import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import Logo from "../../logo-future-eats@2x.png";

const PageConteiner = styled.div `
display: flex;
justify-content: center;
width: 100vw;
height: 100vh;
background-color: orange;

`

//xport const ImgBox = styled.div`

//align-items: center;
//justify-items: center;
  
//`;



const LoginPage = () => {



  return (
  <PageConteiner>
    <h1>LOGIN PAGE</h1>
    

    <div>Entrar</div>
    <form>
      Formulário
      <input></input>
      <input></input>
    </form>
    <div>Cadastro</div>
  </PageConteiner>
  )

};

export default LoginPage;

//logo-future-eats@2x.png