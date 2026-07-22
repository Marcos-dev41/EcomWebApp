import React from 'react'
import GlobalNav from '../components/GlobalNav'

export default function 
() {
  return (
    <div>
        <GlobalNav/>
        <div className='flex flex-col m-5 p-2 w-80'>
            <div className='rounded bg-orange-400 text-center text-xl p-2 font-semibold'>
                <h1>Checkout page</h1>
            </div>
            <br />
            <div className='flex flex-col'>
                <h2 className='font-semibold'>Payment Option</h2>
                <h3>Mpesa</h3>
        
                <input type="text" placeholder='254*********' className='border-2 p-2 rounded'/>
                <br />
                <button className='bg-orange-400 rounded p-2 font-bold text-white'>Place Order</button>
            </div>

        </div>
    </div>
  )
}
