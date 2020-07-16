import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Estilo01 = styled.div`
  display: flex;
`;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState("");
  const [restaurantDetail, setRestaurantDetail] = useState("");
  const [restaurantProducts, setRestaurantProducts] = useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const novoCarrinho = [];
  const [newCart, setNewCart] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    getProfile();
  }, []);

  const getProfile = () => {
    const headers = {
      headers: {
        auth: token,
      },
    };
    axios
      .get(
        "https://us-central1-missao-newton.cloudfunctions.net/rappi4B/profile",
        headers
      )
      .then((response) => {
        setProfile(response.data.user);
        getRestaurantDetail();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRestaurantDetail = () => {
    const headers = {
      headers: {
        auth: token,
      },
    };
    axios
      .get(
        "https://us-central1-missao-newton.cloudfunctions.net/rappi4B/restaurants/1",
        headers
      )
      .then((response) => {
        setRestaurantDetail(response.data.restaurant);
        setRestaurantProducts(response.data.restaurant.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const placeOrder = () => {
    setNewCart(novoCarrinho);
    console.log("newCart", newCart);
    const headers = {
      headers: {
        auth: token,
      },
    };

    const products = newCart.map((product) => {
      return { id: product.id, quantity: product.quantidade };
    });

    // const products = {
    //   id: newCart.id,
    //   quantity: newCart.quantidade,
    // };

    const body = {
      products,
      paymentMethod: "creditcard",
    };
    axios
      .post(
        "https://us-central1-missao-newton.cloudfunctions.net/rappi4B/restaurants/1/order",
        body,
        headers
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log(body);
      });
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((produto) => produto.id !== id);
    setCart(newCart);
  };

  //console.log(cart);
  //console.log(profile);
  //console.log(restaurantDetail);

  const listProducts = restaurantProducts.map((product) => {
    return (
      <div>
        <h4>{product.name} - </h4>
        <p>{product.price.toFixed(2)}</p>
        <button onClick={() => addToCart(product)}>COMPRAR</button>
      </div>
    );
  });

  let total = 0;
  cart.forEach((produto) => {
    const verificaProduto = novoCarrinho.findIndex(
      (prod) => prod.id === produto.id
    );
    if (verificaProduto === -1) {
      const novoProduto = {
        id: produto.id,
        nome: produto.name,
        quantidade: quantidade,
        preco: produto.price,
        descricao: produto.description,
      };
      novoCarrinho.push(novoProduto);
    } else {
      novoCarrinho[verificaProduto].quantidade++;
    }
    total = produto.price * quantidade + total;
  });

  // novoCarrinho.forEach((produto)=>{
  //   const cartOrder = {
  //     id: produto.id,
  //     quantidade:quantidade
  //   }

  // })

  //console.log(novoCarrinho);

  const carrinhoRenderizado = novoCarrinho.map((produto) => (
    <Estilo01>
      {produto.nome}&nbsp;
      {produto.quantidade}x<br></br>
      R${produto.preco.toFixed(2)}, {produto.descricao}
      <button onClick={() => removeFromCart(produto.id)}>Remover</button>
    </Estilo01>
  ));

  const totalFrete = total + restaurantDetail.shipping;

  return (
    <div>
      <h1>Produtos</h1>
      <div>{listProducts}</div>
      <hr></hr>
      <div>
        <div>Endereço de entrega: {profile.address}</div>
        <div>
          <p>Restaurante: {restaurantDetail.name}</p>
          <p>Endereço: {restaurantDetail.address}</p>
          <p>Tempo de Entrega: {restaurantDetail.deliveryTime} min</p>
        </div>
        <h3>Cart</h3>
        <Estilo01>{carrinhoRenderizado}</Estilo01>
        <div>Frete: {restaurantDetail.shipping}</div>
        <div>SUBTOTAL: R${total.toFixed(2)}</div>
        <div>TOTAL: R${totalFrete.toFixed(2)}</div>
        <button onClick={getRestaurantDetail}>TESTE</button>
        <button onClick={placeOrder}>CONFIRMAR</button>
      </div>
    </div>
  );
};

export default Cart;
