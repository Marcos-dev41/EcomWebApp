import React, { useContext, useState } from 'react'

import pic from '../../src/assets/m1.png'
import { useCart } from '../pages/CartContext'

export default function ProductComp({product}) {
    const {addToCart} = useCart()
    const [showAlert,setShowAlert]  = useState(false)
    const [add,setAdded]  = useState("Add to Cart")

    function handleAddtoCart(){
      if(product.available){
        setAdded("Added!")
        setTimeout(()=>setAdded(add),300)
        addToCart(product.prodId)
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1500);}
    }
  
  return (
    <div className="bg-white rounded-2xl p-3 overflow-hidden relative flex flex-col  justify-center border-2-gray w-60 shadow-sm-gray text-center hover:scale-102">
       <div className='hover:scale-103'>
            <img src={pic} alt="monitor pic" width={200} />
       </div>
       

        <div className='p-2'>
            <h2 className='h-10 font-medium'>{product.prodName}</h2>
        </div>

        <div className="flex  flex-col flex-start font-semibold justify-around">
            <h4> Ksh {product.price}</h4>
            {product.available ? <h4 className='text-sm text-green-500'>In Stock</h4> : <h4 className='text-sm text-red-500'>Out of stock</h4>}
        </div>

        <button className="bg-orange-200 hover:bg-orange-500 mt-2 p-2 pl-5 pr-5 rounded-2xl " onClick={handleAddtoCart}>
           {product.available ? <p>{add}</p> : "Not Available"}
        </button>
        {showAlert && (
        <div className="absolute top-0 left-0 bg-green-500 text-white text-sm px-2 py-1 rounded-2xl">
          Added to cart!
        </div>
      )}
        
    </div>
  )}
