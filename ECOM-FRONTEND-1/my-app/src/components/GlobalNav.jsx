import React from 'react'
import user from '../../src/assets/account.png'
import cart from '../../src/assets/add-cart.png'
import bell from '../../src/assets/notification.png'
import store from '../../src/assets/store.png'
import { Link } from 'react-router-dom'

export default function 
() {
    

  return (
    <div className='w-full flex flex-row justify-around bg-orange-400 h-13 items-center font-semibold'>
        <h1 className='text-2xl'>MoniMart</h1>
        
        <div className='flex flex-row justify-between pl-5 pr-5 gap-4'>
            <Link to={"/products"}><img src={store} alt="" width=" 33px" height="30px" className='opacity-85' /></Link>
            <Link to={"/notifications"} ><img src={bell} alt="" width=" 33px" height="30px" className='opacity-85' /></Link>
            <Link to={"/cart"}><img src={cart} alt="" width=" 35px" height="30px" className='opacity-85'/></Link>
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
