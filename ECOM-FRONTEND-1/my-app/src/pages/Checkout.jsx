import React, { useState } from 'react'
import GlobalNav from '../components/GlobalNav'
import { useParams } from 'react-router-dom'
import api from "../axioxInstance";

export default function 
() {

    const {orderId} = useParams();
    const[phoneNumber, setPhoneNumber] = useState("");
    const[status,setStatus] = useState("");

    async function handlePayment(e) {
        e.preventDefault();
        setStatus("Sending payment request...");

        try{
            await api.post(`/payments/stkpush/${orderId}?phoneNumber=${phoneNumber}`);
            setStatus("check your phone to complete payment");

        }catch(error){
            console.error("STK push failed",error);
            setStatus("something went wrong");
        }
    }



  return (
    <div>
        <GlobalNav/>
        <div className='flex flex-col m-5 p-2 w-80'>
            <div className='rounded bg-orange-400 text-center text-xl p-2 font-semibold'>
                <h1>Checkout page</h1>
            </div>
            <br />
            <form className='flex flex-col'>
                <h2 className='font-semibold'>Payment Option</h2>
                <h3>Mpesa</h3>
        
                <input type="tel" placeholder='254*******' value={phoneNumber} 
                    onChange={(e)=>{setPhoneNumber(e.target.value)}}
                    className='border-2 p-2 rounded' required maxLength={12}
                    />
                <br />
                <button className='bg-orange-400 rounded p-2 font-bold text-white' type='submit ' onClick={handlePayment}>Place Order</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    </div>
  )
}
