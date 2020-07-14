import React, { useState, useEffect } from "react";
import axios from 'axios';

import {
  Feed,
  Header,
  Tittle,
  InputContainer,
  Input,
  FilterContainer,
  FilterKey,
  RestaurantContainer,
  Footer
} from './styles'

import HomePageIcon from './images/homepage.svg'
import CartIcon from './images/shopping-cart.svg'
import AvatarIcon from './images/avatar.svg'

import CardRestaurant from './CardRestaurant'
import Filter from './Filter'

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4B/restaurants"


const HomePage = () => {


  return (
    <div>
      <div>Home Page</div>
     
    </div>
  )
   
     
   
};

export default HomePage;
