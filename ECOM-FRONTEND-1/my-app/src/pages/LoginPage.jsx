import React from 'react'
import logo from '../../src/assets/m2.png'
import{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../axioxInstance';
import { Link } from 'react-router-dom';
 
export default function LoginPage() {
    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[userPassword,setUserPassword] = useState("");
    const[error,setError] = useState("");

    

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post('/auth/login', {
            email: email,
            userPassword: userPassword
        });
        console.log("Registered:", response.data)
        localStorage.setItem("token",response.data.token);
        navigate('/products');

    } catch (error) {
        console.error("Error sending data:", error);
        setError("Registration failed");
    }
    setUserPassword("");
    setEmail("");

    }

  return (

    <>
    <div className='flex flex-col items-center p-5'>
        <div className='flex flex-col justify-around w-full 2xl:max-w-[600px] items-center m-5 bg-gray-100 rounded-2xl p-5 h-fit '>
            <img src={logo} alt="logo"  width={200} />
            <h3 className='font-semibold text-lg mt-3 text-orange-500'>
                Welcome to back MoniMart
            </h3>
            <p className='text-gray-400 mt-3'>
                Login to your account
            </p>
    
            <form  onSubmit={handleSubmit} className='flex flex-col mt-3 justify-center items-center' >
                <label htmlFor="email"  className='text-orange-600 font-bold'>Email</label>
                <input type="Email" value = {email} name='email' id="email" placeholder='Johndoe@gmail.com' required  className='p-2 pl-4 pr-4 rounded-2xl border-2 m-2' onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
    
                <label htmlFor="pass" className='text-orange-600 font-bold'>Password</label>
                <input type="password" value={userPassword} name='pass' id="pass" placeholder='*******' required  className='p-2  pl-4 pr-4 rounded-2xl border-2 m-2' onChange={(e)=>{setUserPassword(e.target.value)}}/>
    
                <button type='submit' className='p-2 m-2 pl-4 pr-4 bg-orange-500 rounded-2xl  text-white font-semibold hover:scale-102'>submit</button>
            </form>
             
             <Link to={"/PassResetPage"}>
             <p className='text-red-500 hover:text-red-800'>
                Reset password
            </p>
             </Link>
             <br />
             <Link to={"/register"}>
             <p className='text-blue-800 hover:scale-x-102'>
                Register Account here
            </p>
             </Link>
    
        </div>
        </div>
        </>
  )
}

