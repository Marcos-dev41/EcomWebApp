import React, { useState } from 'react'
import GlobalNav from '../components/GlobalNav'
import api from '../axioxInstance';
import { useNavigate } from 'react-router-dom';

export default function PassResetPage() {
    const [email,setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = ((e)=>{
        const response = api.post("/auth/account",{email: email});
        if (response.data == true){
            Navigate("/newpassword");
        }
    })
    
    

  return (
    <>
    <GlobalNav/>
    <div className='flex  flex-col items-center p-2 m-2'>
        <div className='bg-orange-400 w-60 text-center p-2 rounded-2xl'>
            <h2 className='font-bold'>Password Reset</h2>
        </div>
    
    <form className='flex flex-col mt-3 w-fit'>
        <input type="email" name="email" className='border-2 w-60 p-2 rounded-2xl font-semibold' placeholder='Enter your email' />
        <br />
        <button className='border-2 p-2 rounded-2xl w-full bg-orange-400 text-white font-semibold'>Submit</button>
    </form>
    </div>
    </>
    
  )
}
