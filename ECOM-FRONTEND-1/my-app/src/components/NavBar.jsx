import React from 'react'
import user from '../../src/assets/account.png'
import cart from '../../src/assets/grocery-store.png'
import bell from '../../src/assets/bell.png'

export default function 
() {
  return (
    <div className='w-full flex flex-row justify-around bg-orange-400 h-13 items-center font-semibold'>
        <h1 className='text-2xl'>MoniMart</h1>
        <input className='bg-orange-100 rounded-2xl w-80 p-2 pl-5' type="search" placeholder='search...'/>
        <div className='flex flex-row justify-between pl-5 pr-5 gap-4'>
            <a href="#"><img src={bell} alt="" width=" 35px" height="30px" className='opacity-90' /></a>
            <a href="#"><img src={cart} alt="" width=" 35px" height="30px" className='opacity-90'/></a>
        </div>
        <div className='flex flex-row justify-between w-32 items-center'>
            <a href="#"><img src={user} alt="" width=" 35px" height="35px" className='opacity-90' /></a>
            <div className='flex flex-col items center text-start h-12'>
                <h3 className='font-semibold m-0'>Mark</h3>
                <p className='font-normal m-0'>logged In</p>
            </div>
        </div>
        
    </div>
  )
}
