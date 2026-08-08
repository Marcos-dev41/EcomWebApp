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
    const jwtToken = localStorage.getItem("token")

// fixed login state issue 
    const expiryDate = (() => {
  if (!jwtToken) return null;

  try {
   
    let payloadBase64 = jwtToken.split('.')[1];
    if (!payloadBase64) return null;

    const payload = JSON.parse(atob(payloadBase64));

    return payload.exp ? new Date(payload.exp * 1000).toLocaleString() : null;
  } catch (error) {
    console.error("Invalid JWT token:", error);
    return null;
  }
    })()

    

  const currentTime = new Date().toLocaleString();
  if(expiryDate >= currentTime){
    localStorage.removeItem("token")
  }


// function to handle user logging out

    function logout(){
        localStorage.removeItem("token");
    }

  return (
    <div className=' flex flex-row justify-around w-full bg-orange-500 h-fit p-1 items-center font-semibold shadow-md'>
        <h1 className='text-2xl'>MoniMart</h1>
        <input className='bg-orange-100 rounded-2xl w-80 p-2 pl-5' type="search" placeholder='search...'/>
        <div className='flex flex-row justify-between pl-5 pr-5 gap-4'>
            <Link to={"/notifications"} ><img src={bell} alt="" width=" 35px" height="30px" className='opacity-85 hover:scale-102' /></Link>
            <Link to={"/cart"}>
                {cart.length > 0 ? <img src={addedcart} alt="" width=" 35px" height="35px" className='opacity-85 '/>:<img src={cartimg} alt="" width=" 35px" height="35px" className='opacity-85 hover:scale-102'/>}
            </Link>
        </div>
        <div className='flex flex-row justify-between w-fit items-center'>
            <img src={user} alt="" width=" 35px" height="35px" className='opacity-90 hover:scale-102 mr-1' />
            <div className='flex flex-col items-center text-start h-12'>
                
                {jwtToken && expiryDate >= currentTime ? <Link to={"/login"}> <button className='text-base m-1 hover:scale-102 bg-red-600 p-2 font-semibold rounded' onClick={logout}>logout</button> </Link>: <Link to={"/login"}><h3 className='font-semibold hover:scale-102 rounded bg-blue-600 p-2 text-gray-200 pl-3 pr-3 text-sm m-1 '>Log in</h3></Link>}
                
            </div>
        </div>
        
    </div>
  )
}
