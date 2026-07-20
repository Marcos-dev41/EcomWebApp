import React from 'react'

import pic from '../../src/assets/m1.png'

export default function ProductComp({product}) {
    
  const handeClick = (()=>{
  
    const cartItem = localStorage.setItem(`${product.prodId}`,`${product.prodName}`);
  })
  return (
    <div className="bg-white rounded-2xl p-2 flex flex-col justify-center border-2-gray w-50 text-center">
        <img src={pic} alt="monitor pic" />

        <div className='p-2'>
            <h2 className='h-10 font-medium'>{product.prodName}</h2>
        </div>

        <div className="flex  flex-col flex-start font-semibold justify-around">
            <h4> Ksh {product.price}</h4>
            <h4 className = "text-green-500 "> {product.available ? "In stock" : "Out of stock"}</h4>
        </div>

        <button className="bg-orange-200 mt-2 p-2 pl-5 pr-5 rounded-2xl " onClick={handeClick}>
           {product.available ? "Add to cart" : "Out of stock"}
        </button>
        
    </div>
  )}
