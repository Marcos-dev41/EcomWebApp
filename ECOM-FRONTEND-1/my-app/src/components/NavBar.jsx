import React from 'react'
import user from '../../src/assets/account.png'
import addedcart from '../../src/assets/add-cart.png'
import cartimg from '../../src/assets/sell.png'
import bell from '../../src/assets/notification.png'
import { Link } from 'react-router-dom'
import { useCart } from '../pages/CartContext'

export default function 
() {
    const {cart} = useCart();

    
    // checking if user is logged in and updating status
    // check if a jwt token exists in local storage
   const jwtToken = localStorage.getItem("token")
    const status = jwtToken ? "User is logged in" : "No token found";
    console.log(status)
        // if it doesnot exitst show button to log in
        // if it exists check if sessio is expired if yes they have to login again
        // if not show user logged in
    
     

  return (
    <div className=' flex flex-row justify-around w-full bg-orange-500 h-fit p-1 items-center font-semibold shadow-md'>
        <h1 className='text-2xl'>MoniMart</h1>
        <input className='bg-orange-100 rounded-2xl w-80 p-2 pl-5' type="search" placeholder='search...'/>
        <div className='flex flex-row justify-between pl-5 pr-5 gap-4'>
            <Link to={"/notifications"} ><img src={bell} alt="" width=" 35px" height="30px" className='opacity-85' /></Link>
            <Link to={"/cart"}>
                {cart.length > 0 ? <img src={addedcart} alt="" width=" 35px" height="35px" className='opacity-85'/>:<img src={cartimg} alt="" width=" 35px" height="35px" className='opacity-85'/>}
            </Link>
        </div>
        <div className='flex flex-row justify-between w-fit items-center'>
            <img src={user} alt="" width=" 35px" height="35px" className='opacity-90' />
            <div className='flex flex-col items-center text-start h-12'>
                
                { jwtToken ? <h3 className='text-sm text-green-700 m-3 font-semibold'>logged in</h3> : <Link to={"/login"}><h3 className='font-semibold  text-sm m-3'>Log in</h3></Link>}
                
            </div>
        </div>
        
    </div>
  )
}
