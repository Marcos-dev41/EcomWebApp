import React from 'react'
import CartComp from '../components/CartComp'
import GlobalNav from '../components/GlobalNav'

export default function CartPage() {
  return (
    <>
    <GlobalNav/>
     <div className=' w-fit p-5 m-2 h-100 rounded-2xl'>
        <div className='w-full border-2 rounded-2xl flex flex-row items-center bg-orange-400 p-2 text-white text-2xl font-bold'>
            <h2 className='text-center text-2xl font-bold'>Cart</h2>
        </div>
        <CartComp/>
        <div className='flex flex-row justify-around p-2 m-5 w-full text-center items-center border-2 rounded-2xl 2xl:max-w-[500px]'>
           <h4 className='font-semibold'>Totals : ksh 4000</h4> 
           <button className='bg-orange-400 text-white font-semibold rounded-2xl p-2'>Confirm and checkout</button> 
        </div>
     </div>
    </>
  )
}
