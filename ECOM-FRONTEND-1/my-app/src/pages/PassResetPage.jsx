import React, { useState } from 'react'
import GlobalNav from '../components/GlobalNav'
import api from '../axioxInstance';
import { useNavigate } from 'react-router-dom';

export default function PassResetPage() {
    const [email,setEmail] = useState("");
    const [status,setStatus] =useState("")
    const navigate = useNavigate();

    const handleSubmit = ((e) => {
        e.preventDefault();
        
    api.post("/auth/forgot-password", { "email": email })
        .then((response) => {
            console.log(response.data);
            if(response.data == true){
                setStatus("Sending Email ...")
                setTimeout(() => {
    setStatus("Check your Email!")
    setEmail("");
}, 30000); 
            }else{
                setStatus("Account does not exist")
                setEmail("")
            }

        })
        .catch((error) => {
            console.error(error);
        });
});
    
    

  return (
    <>
    <GlobalNav/>
    <div className='flex flex-col p-5 items-center'>
    <div className='flex flex-col justify-around w-full 2xl:max-w-[600px] items-center m-5 bg-gray-100 rounded-2xl p-5 h-fit'>
        <div className='bg-orange-500 w-65 text-center p-2 rounded-2xl'>
            <h2 className='font-semibold'>Password Reset</h2>
        </div>
    
    <form className='flex flex-col mt-3 w-fit text-center'>
        <p className='text-gray-400 mt-2'>Enter your Email below</p>
        <input type="email" name="email"  value={email}
  onChange={(e) => setEmail(e.target.value)} className='border-1 hover:outline-orange-500 w-65 p-2  mt-2 rounded-2xl font-semibold text-center' placeholder='johndoe@gmail.com'/>
        <br />
        <button className='border-2 p-2 rounded-2xl w-full bg-orange-500 text-white font-semibold hover:scale-102' onClick={handleSubmit}>Submit</button>
    </form>
    <p className='text-red-500'>{status}</p>
    </div>
    </div>
    </>
    
  )
}
