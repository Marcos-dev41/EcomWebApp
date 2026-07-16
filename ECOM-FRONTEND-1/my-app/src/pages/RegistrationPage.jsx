import React from 'react'
import NavBar from '../components/NavBar'
import logo from '../../src/assets/m2.png'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../axioxInstance'



export default function RegistrationPage() {
    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[userPassword,setUserPassword] = useState("");
    const[confirmPass,setConfirmPass] = useState("");
    const[error,setError] = useState("");

    

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (userPassword !== confirmPass) {
        setError("Password mismatch");
        return;
    }

    try {
        const response = await api.post('/auth/register', {
            email: email,
            userPassword: userPassword
        });
        console.log("Registered:", response.data);
        navigate('/login')
    } catch (error) {
        console.error("Error sending data:", error);
        setError("Registration failed");
    }
};

  return (
    <>
    <div className='flex flex-col  items-center p-5'>
    <div className='flex flex-col justify-around items-center w-full 2xl:max-w-[600px] m-5 bg-gray-200 rounded-2xl p-5 h-full'>
        <img src={logo} alt="logo"  width={200} />
        <h3 className='font-semibold m-3 text-'>
            Welcome to Moni sales
        </h3>
        <p className='m-2'>
            Create a new account
        </p>

        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
            <label htmlFor="email" className='text-orange-600 font-bold'>Email</label>
            <input type="Email" name='email'value={email} id="email" placeholder='Johndoe@gmail.com' required  className='p-2 pl-4 pr-4 rounded-2xl border-2 m-2' onChange={(e)=>setEmail(e.target.value)}/>

            <label htmlFor="pass" className='text-orange-600 font-bold'>Password</label>
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
