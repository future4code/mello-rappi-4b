import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    RestCard,
    RestLogo,
    CardFooter,
    CardName,
    CardInfo
} from './styles'


const CardRestaurant = (props) => {
    

    return (
        <div>
            {props.restaurants.map(restaurant => {
                return (<RestCard>
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