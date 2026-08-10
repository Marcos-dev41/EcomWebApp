import React, { useContext } from 'react'
import user from '../../src/assets/account.png'
import addedtocart from '../../src/assets/grocery-store.png'
import cartimg from '../../src/assets/sell.png'
import bell from '../../src/assets/notification.png'
import store from '../../src/assets/store.png'
import { Link } from 'react-router-dom'
import { useCart } from '../pages/CartContext'


export default function 
() {
   const {cart} = useCart();
    const jwtToken = localStorage.getItem("token")
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
    })

    

  const currentTime = new Date().toLocaleString();


  // function to handle user logging out

    function logout(){
        localStorage.removeItem("token");
    }

   


  return (
    <div className='w-full flex flex-row justify-around bg-orange-500 h-13 items-center font-semibold'>
        <h1 className='text-2xl'>MoniMart</h1>
        
        <div className='flex flex-row justify-between pl-5 pr-5 gap-4'>
            <Link to={"/products"}><img src={store} alt="" width=" 33px" height="30px" className='opacity-85 hover:scale-102' /></Link>
            <Link to={"/notifications"} ><img src={bell} alt="" width=" 33px" height="30px" className='opacity-85 hover:scale-102' /></Link>
            <Link to={"/cart"}>
                {cart.length > 0 ?
                <div className='flex'>
                  <img src={addedtocart} alt="" width=" 30px" height="30px" className='opacity-85 hover:scale-102'/> 
                  <div className=' m-0 rounded-full text-sm bg-blue-400 h-5 w-5 p-0.5 text-center'>{cart.length}</div>
                </div>:
                <img src={cartimg} alt="" width=" 35px" height="35px" className='opacity-85 hover:scale-102'/>}
            </Link>        </div>
        <div className='flex flex-row justify-between w-32 items-center'>
            <a href="#"><img src={user} alt="" width=" 35px" height="35px" className='opacity-90 hover:scale-102' /></a>
             <div className='flex flex-col items-center text-start h-12'>
                {jwtToken && expiryDate() >= currentTime ? <Link to={"/login"}> <button className='text-base m-1 hover:scale-102 bg-red-600 p-2 font-semibold rounded' onClick={logout}>logout</button> </Link>: <Link to={"/login"}><h3 className='font-semibold hover:scale-102 rounded bg-blue-600 p-2 text-gray-200 pl-3 pr-3 text-sm m-1 '>Log in</h3></Link>}             </div>
        </div>
        
    </div>
  )
}
