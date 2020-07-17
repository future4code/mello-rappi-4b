import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavBar from "./navbar.js";

const Estilo01 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Estilo02 = styled.div`
  margin-bottom: 70px;
`;

const ImgProduct = styled.img`
  width: 97px;
  height: 112.6px;
`;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState("");
  const [restaurantDetail, setRestaurantDetail] = useState("");
  const [restaurantProducts, setRestaurantProducts] = useState([]);
  const [quantidade, setQuantidade] = useState(2);
  const novoCarrinho = [];
  const [newCart, setNewCart] = useState([]);
  const [token, setToken] = useState();
  const [OptionPayment, setOptionPayment] = useState("unselected");

  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    getProfile();
  }, [token]);

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
      paymentMethod: OptionPayment,
    };
    axios
      .post(
        "https://us-central1-missao-newton.cloudfunctions.net/rappi4B/restaurants/1/order",
        body,
        headers
      )
      .then((response) => {
        console.log(response);
        history.push("/");
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

  const handleRadio = (event) => {
    setOptionPayment(event.target.value);
  };

  console.log(cart);
  console.log(profile);
  console.log(restaurantDetail);
  console.log(OptionPayment);

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
        foto: produto.photoUrl,
      };
      novoCarrinho.push(novoProduto);
    } else {
      novoCarrinho[verificaProduto].quantidade += quantidade;
    }
    total = produto.price * quantidade + total;
  });

  console.log(novoCarrinho);
  console.log(novoCarrinho.length);

  const carrinhoRenderizado = novoCarrinho.map((produto) => (
    <Estilo01>
      <ImgProduct src={produto.foto} />
      {produto.nome}&nbsp;
      {produto.quantidade}x<br></br>
      R${produto.preco.toFixed(2)}, {produto.descricao}
      <button onClick={() => removeFromCart(produto.id)}>Remover</button>
    </Estilo01>
  ));

  const totalFrete = total + restaurantDetail.shipping;

  const funcaoBotao = () => {
    if (novoCarrinho.length !== 0 && OptionPayment !== "unselected") {
      placeOrder();
    } else {
      alert("Seleciona Opção");
    }
  };

  return (
    <Estilo02>
      <h1>Produtos</h1>
      <div>{listProducts}</div>
      <hr></hr>
      <div>
        <div>Endereço de entrega: {profile.address}</div>

        <h3>Cart</h3>
        {novoCarrinho.length === 0 ? (
          <div>Carrinho Vazio</div>
        ) : (
          <div>
            <div>
              <p>{restaurantDetail.name}</p>
              <p> {restaurantDetail.address}</p>
              <p> {restaurantDetail.deliveryTime} min</p>
            </div>
            <Estilo01>{carrinhoRenderizado}</Estilo01>
          </div>
        )}
        <div>
          <div>Frete: R${restaurantDetail.shipping}</div>
          <div>SUBTOTAL: R${total.toFixed(2)}</div>
          <div>TOTAL: R${totalFrete.toFixed(2)}</div>
          <div></div>
          <div>
            <div>Forma de pagamento</div>
            <hr></hr>
            <input
              type="radio"
              name="opcao"
              value="money"
              onChange={handleRadio}
            ></input>
            <span>Dinheiro</span>
            <input
              type="radio"
              name="opcao"
              value="creditcard"
              onChange={handleRadio}
            ></input>
            <span>Cartão de Crédito</span>
          </div>
        </div>
        <button onClick={getRestaurantDetail}>TESTE</button>
        <button onClick={funcaoBotao}>CONFIRMAR</button>
      </div>
      <NavBar />
    </Estilo02>
  );
};

export default Cart;
