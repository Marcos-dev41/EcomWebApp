import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import GlobalNav from '../components/GlobalNav'

import api from '../axioxInstance';

export default function NewPasswordPage() {
    const navigate = useNavigate();
    const[userPassword,setUserPassword] = useState("");
    const[confirmPass,setConfirmPass] = useState("");
    const[error,setError] = useState("");

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (userPassword !== confirmPass) {
        setError("Password mismatch");
        return;
    }

    try {
        const response = await api.post('/auth/reset-password', {
            token: token,
            userPassword: userPassword
        });
        console.log("changed password:", response.data);
        navigate('/login')
    } catch (error) {
        console.error("Error sending data:", error);
        setError("Try again");
    }
};

  return (
     <>
     <GlobalNav/>
        <div className='flex flex-col  items-center p-5'>
        <div className='flex flex-col justify-around items-center w-full 2xl:max-w-[600px] m-5 bg-gray-200 rounded-2xl p-5 h-full'>
            <p className='m-2'>
                Create a new password
            </p>
    
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>

                <label htmlFor="pass" className='text-orange-600 font-bold'>New Password</label>
                <input type="password" value = {userPassword} name='pass' id="pass" placeholder='*******' required  className='p-2  pl-4 pr-4 rounded-2xl border-2 m-2' onChange={(e)=>setUserPassword(e.target.value)}/>
    
                <label htmlFor="pass" className='text-orange-600 font-bold'>Confirm Password</label>
                <input type="password" value={confirmPass} name='pass' id="confirmpass" placeholder='*******' required  className='p-2  pl-4 pr-4 rounded-2xl border-2 m-2' onChange={(e)=> setConfirmPass(e.target.value)}/>
    
                <button type='submit' className='border-0 p-2 m-2 pl-4 pr-4 bg-orange-500 rounded-2xl  text-white font-semibold'>submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
    
        </div>
        </div>
        </>
  )
}
