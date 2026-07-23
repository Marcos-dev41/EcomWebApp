import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

import React from 'react'

export default function CartProvider
({children}) {
const [ cart,setCart] = useState(()=>{
  const saved  = localStorage.getItem("cart");
 return saved ?JSON.parse(saved): [];
});

useEffect(()=>{
const saved = localStorage.setItem("cart",JSON.stringify(cart))
},[cart])


function addToCart(prodId){
  setCart((prevCart) =>{
    const existingItem = prevCart.find((item)=>item.prodId == prodId);
    

    if(existingItem){
      return prevCart.map((item)=>(item.prodId===prodId) ? {...item,quantity:item.quantity+1}:item);
    }else{
     return [...prevCart, {prodId,quantity:1}];
    }
  })
}

function removeFromCart(prodId){
  setCart((prevCart) => prevCart.filter((item) => item.prodId !== prodId));
}

function clearCart() {
  setCart([]);
}

  return(
    <CartContext.Provider value={{cart, addToCart,clearCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){
  return useContext(CartContext);


}
