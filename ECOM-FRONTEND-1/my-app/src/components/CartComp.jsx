import React from 'react'
import cartimg from '../../src/assets/m2.png'
import { useCart } from '../pages/CartContext';

export default function 
({item}) {

const {removeFromCart} = useCart()

  const formatKSh = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
});

  return (
    <div className='flex flex-row p-5 rounded-xl justify-between w-full 2xl:max-w-[550px] h-30 border-2 m-5'>
        <img src={cartimg} alt=""/>
        <div className='flex flex-row justify-around w-90'>
        <div className='p-1 flex-wrap w-50 items-center'>
            <h2 className=' font-semibold text-xl text-center'>{item.prodName}</h2>
        </div>

        <div className="flex  flex-col flex-start font-semibold justify-around">
            <h4>{formatKSh.format(item.quantity * item.price)}</h4>
            <p>Qty: {item.quantity}</p>
            <h4 className = "text-green-500 ">InStock</h4>
        </div>
        </div>
        <button className=" mt-2 p-2 pl-5 pr-5 rounded-5xl "onClick={() => removeFromCart(item.prodId)}>
           ❌
        </button>
    </div>
  )
}
