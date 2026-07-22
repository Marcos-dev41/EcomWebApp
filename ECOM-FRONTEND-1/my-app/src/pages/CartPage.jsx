import React, { createContext, useEffect, useState } from 'react'
import CartComp from '../components/CartComp'
import GlobalNav from '../components/GlobalNav'
import { useCart } from './CartContext'
import api from '../axioxInstance';
import { useNavigate } from 'react-router-dom';


// const cartCreateContext = createContext();
export default function CartPage() {
const {cart} = useCart();
const [products,setProducts] = useState([]);
const [loading,setLoading] = useState(true);

const navigate = useNavigate();

const formatKSh = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
});

console.log(formatKSh.format(2500)); 

// api.post("/payment/request/checkout"){

// }


useEffect(()=>
  {
   api.get("/products")
    .then((reponse)=>{
      setProducts(reponse.data);
      setLoading(false); 
    })
    .catch((error)=>{

      console.error("Fetch error",error);
      setLoading(false);
    })
  },
[])
if(loading)return <p>ladt....</p>

const cartWithDetails = cart.map((item)=>{
  const productInfo = products.find((p)=> p.prodId === item.prodId)
   return {...item, ...productInfo};
})

const total = cartWithDetails.reduce((accumulator, item) => {
  return accumulator + (item.price * item.quantity);
}, 0);

  return (
    <>

    <GlobalNav/>
     <div className=' w-fit p-5 m-5 mt-2 h-100 rounded-2xl'>
        <div className='w-full  rounded-2xl flex flex-row text-center bg-orange-400 p-2 text-white text-2xl font-bold'>
            <h2>Cart</h2>
        </div>
        {cartWithDetails.map((item)=>{
          return(
       <CartComp key={item.prodId} item={item} />
          ) })}

         <div className='flex flex-row justify-around p-2 m-5 w-full text-center h-fit items-center border-2 rounded-2xl 2xl:max-w-[550px]'>
           <h4 className='font-bold'>{formatKSh.format(total)}</h4> 
           <button className='bg-orange-400 text-white font-semibold rounded-2xl p-2 ' onClick={(e)=>{
            navigate("/checkout")
           }}>Confirm and checkout</button> 
        </div>
        
     </div>
    </>
  )
}
