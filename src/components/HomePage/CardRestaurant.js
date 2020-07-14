
import React from 'react';
import { useHistory } from 'react-router-dom';

import {
    RestCard,
    RestLogo,
    CardFooter,
    CardName,
    CardInfo
} from './styles'


import { RestCard, RestLogo, CardFooter, CardName, CardInfo } from "./styles";

const CardRestaurant = (props) => {
  const history = useHistory();
  const goToRestaurantPage = (id) => {
    history.push(`/restaurants/${id}`);
  };


    return (
        <div>
            {props.restaurants.map(restaurant => {
                return (<RestCard onClick={() => goToRestaurantPage(restaurant.id)} key={restaurant.id} >
                    <RestLogo src={restaurant.logoUrl} />
                    <CardName>{restaurant.name}</CardName>
                    <CardFooter>
                        <CardInfo>{restaurant.deliveryTime} min</CardInfo>
                        <CardInfo>Frete: R$ {restaurant.shipping},00</CardInfo>
                    </CardFooter>
                </RestCard>)}) 
            }
        </div>
    )
}
export default CardRestaurant;