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

console.log(item)

  return (
    <div className='flex flex-row p-4 rounded-xl justify-between w-fit mt-4 items-center h-30 border-2 border-gray-300 hover:scale-102'>
        <img src={cartimg} alt="" width={70} />
        <div className='flex flex-row justify-around w-90'>
        <div className='p-1  flex flex-col w-50 items-center'>
            <h2 className=' font-bold text-sm text-center'>{item.prodName}</h2>
        </div>

        <div className="flex  flex-col flex-start font-bold text-sm text-gray-900 gap-2">
            <h4>{formatKSh.format(item.quantity * item.price)}</h4>
            <p>Qty: {item.quantity}</p>
            {item.available ? <h4 className='text-sm text-green-500'>In Stock</h4> : <h4 className='text-sm text-red-500'>Out of stock</h4>}
        </div>
        </div>
        <button className=" mt-2 p-2 pl-5 pr-5 rounded-5xl text-blue-900 font-semibold text-base hover:text-red-500 "onClick={() => removeFromCart(item.prodId)}>
           Remove
        </button>
    </div>
  )
}