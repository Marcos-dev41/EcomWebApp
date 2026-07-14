import React from 'react'
import user from '../../src/assets/user.png'
import cart from '../../src/assets/shopping-cart.png'
import bell from '../../src/assets/bell.png'

export default function 
() {
  return (
    <div className='w-full flex flex-row justify-around bg-orange-400 h-13 items-center font-semibold'>
        <h1 className='text-2xl'>MoniMart</h1>
        <input className='bg-orange-100 rounded-2xl w-80 p-2' type="search" placeholder='search...'/>
        <div className='flex flex-row justify-between pl-5 pr-5 gap-4'>
            <a href="#"><img src={bell} alt="" width=" 35px" height="35px" /></a>
            <a href="#"><img src={cart} alt="" width=" 35px" height="35px"/></a>
        </div>
        <div className='flex flex-row justify-between w-32 items-center'>
            <a href="#"><img src={user} alt="" width=" 35px" height="35px" /></a>
            <div>
                <h3>Mark</h3>
                <h4>logged In</h4>
            </div>
        </div>


        
    </div>
  )
}
