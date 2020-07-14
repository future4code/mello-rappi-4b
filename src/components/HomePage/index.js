import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Feed,
  Header,
  Tittle,
  InputContainer,
  FilterContainer,
  FilterKey,
  RestaurantContainer,

  Footer,
} from "./styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import HomePageIcon from "./images/homepage.svg";
import CartIcon from "./images/shopping-cart.svg";
import AvatarIcon from "./images/avatar.svg";
import CardRestaurant from "./CardRestaurant";
import Filter from "./Filter";
const baseUrl =
  "https://us-central1-missao-newton.cloudfunctions.net/rappi4B/restaurants";
const HomePage = () => {
  const [filter, setFilter] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [category, setCategory] = useState("");
  const setFilterTrue = () => {
    setFilter(true);
  };
  const getRestaurants = () => {
    const axiosConfig = {
      headers: {
        auth:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNxMDRDU0hJcllKTU80ZVZ4YVppIiwibmFtZSI6IkxhaXMiLCJlbWFpbCI6ImxhaXNAbGFpcy5jb20iLCJjcGYiOiIxMTEuMTExLjExMS0xMiIsImhhc0FkZHJlc3MiOnRydWUsImFkZHJlc3MiOiJSLiBkb3MgQm9ib3MsIDE0MCwgMjAgLSBWaWxhIE4uIENvbmNlacOnw6NvIiwiaWF0IjoxNTk0NjU3NzA4fQ.WH4ETj3o-DhWhZidHQD5piHbq-BpqHrPEWCLgMhwUoU",
      },
    };
    axios.get(baseUrl, axiosConfig).then((response) => {
      setRestaurants(response.data.restaurants);
    });
  };
  useEffect(() => {
    getRestaurants();
  });
  const setFilterFalse = () => {
    setFilter(false);
  };
  const changeCategory = (newCategory) => {
    if (newCategory !== category) {
      setCategory(newCategory);
    } else {
      setCategory("");
    }
  };
  let filteredList = restaurants;
  if (category !== "") {
    filteredList = filteredList.filter((restaurant) => {
      return restaurant.category === category;
    });

  }
  return (
    <Feed>
      <Header>
        <Tittle>Rappi4</Tittle>
      </Header>

      {filter === false ? (
        <div>
          <InputContainer>
            <TextField
              onClick={setFilterTrue}
              variant="outlined"
              placeholder="Restaurantes"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </InputContainer>
          <FilterContainer>
            {restaurants
              .filter(
                (restaurant, index, array) =>
                  array.findIndex(
                    (item) => item.category === restaurant.category
                  ) === index
              )
              .map((restaurant) => (
                <FilterKey
                  value={restaurant.category}
                  key={restaurant.id}
                  onClick={() => changeCategory(restaurant.category)}
                >
                  {restaurant.category}
                </FilterKey>
              ))}
          </FilterContainer>
          <RestaurantContainer>
            <CardRestaurant restaurants={filteredList} />
          </RestaurantContainer>
        </div>
      ) : (
        <RestaurantContainer>
          <Filter restaurants={restaurants} />
        </RestaurantContainer>
      )}
    <Footer>
        <img src={HomePageIcon} onClick={setFilterFalse}></img>
        <img src={CartIcon}></img>
        <img src={AvatarIcon}></img>
      </Footer>
    </Feed>
  );
  )
};
export default HomePage;


