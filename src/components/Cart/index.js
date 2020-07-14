import React, { useState } from "react";
import styled from "styled-components";

const Estilo01 = styled.div`
  display: flex;
`;

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      nome: "Camiseta Nasa",
      valor: 149.9,
      foto: "https://picsum.photos/260/200?a=1",
    },
    {
      id: 2,
      nome: "Relógio de pulso Nasa",
      valor: 297.5,
      foto: "https://picsum.photos/260/200?a=2",
    },
    {
      id: 3,
      nome: "Caneca Nasa",
      valor: 110.9,
      foto: "https://picsum.photos/260/200?a=3",
    },
    {
      id: 4,
      nome: "Camiseta SpaceX",
      valor: 119.5,
      foto: "https://picsum.photos/260/200?a=4",
    },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((produto) => produto.id !== id);
    setCart(newCart);
  };

  console.log(cart);

  const listProducts = products.map((product) => {
    return (
      <div>
        <h4>{product.nome} - </h4>
        <p>{product.valor}</p>
        <button onClick={() => addToCart(product)}>COMPRAR</button>
      </div>
    );
  });

  const novoCarrinho = [];
  let total = 0;
  cart.forEach((produto) => {
    total += produto.valor;
    const verificaProduto = novoCarrinho.findIndex(
      (prod) => prod.id === produto.id
    );
    if (verificaProduto === -1) {
      const novoProduto = {
        id: produto.id,
        nome: produto.nome,
        quantidade: 1,
      };
      novoCarrinho.push(novoProduto);
    } else {
      novoCarrinho[verificaProduto].quantidade++;
    }
  });
  const carrinhoRenderizado = novoCarrinho.map((produto) => (
    <Estilo01>
      {produto.nome}&nbsp;
      {produto.quantidade}x<br></br>
      <button onClick={() => removeFromCart(produto.id)}>Remover</button>
    </Estilo01>
  ));

  return (
    <div>
      <h1>Produtos</h1>
      <div>{listProducts}</div>
      <hr></hr>
      <h3>Cart</h3>
      <Estilo01>{carrinhoRenderizado}</Estilo01>
      <div>TOTAL: R${total.toFixed(2)}</div>
    </div>
  );
};

export default Cart;
