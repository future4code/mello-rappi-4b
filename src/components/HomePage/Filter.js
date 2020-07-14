import React, { useState } from 'react';
import {
    InputContainer, 
    Input,
    RestCard,
    RestLogo,
    CardFooter,
    CardName,
    CardInfo
} from './styles'



const Filter = (props) => {
    
    const [name, setName] = useState("")

    const handleInputChange = (event) => {
        setName(event.target.value)
    }

    const orderedList = props.restaurants.filter(restaurant => {
        const newName = restaurant.name.toLowerCase();
        return newName.indexOf(name.toLowerCase()) > -1
    })

    
    return (
        <div>
            <InputContainer>
                <Input placeholder="Restaurantes" onChange={handleInputChange} />
            </InputContainer>
            {name === "" ? (<p>Digite algo no campo de pesquisa</p>) : 
            (orderedList.length !== 0 ? (
            orderedList.map(restaurant => {
                return (
                    <RestCard>
                        <RestLogo src={restaurant.logoUrl} />
                        <CardName>{restaurant.name}</CardName>
                        <CardFooter>
                            <CardInfo>{restaurant.deliveryTime} min</CardInfo>
                            <CardInfo>Frete: R$ {restaurant.shipping},00</CardInfo>
                        </CardFooter>
                    </RestCard>
                )
            })) : (<p>Nenhuma correspondencia :( </p>)
            )}
        </div>
    )
}
export default Filter;