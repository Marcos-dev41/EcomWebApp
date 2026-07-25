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
        
    api.post("/auth/account", { "email": email })
        .then((response) => {
            console.log(response.data);
            if(response.data == true){
                setStatus("Sending Email ...")
                setTimeout(() => {
    setStatus("Check your Email!");
}, 30000); 
            }else{
                setStatus("Account does not exist")
            }

        })
        .catch((error) => {
            console.error(error);
        });
});
    
    

  return (
    <>
    <GlobalNav/>
    <div className='flex  flex-col items-center p-2 m-2'>
        <div className='bg-orange-400 w-60 text-center p-2 rounded-2xl'>
            <h2 className='font-bold'>Password Reset</h2>
        </div>
    
    <form className='flex flex-col mt-3 w-fit'>
        <input type="email" name="email"  value={email}
  onChange={(e) => setEmail(e.target.value)} className='border-2 w-60 p-2 rounded-2xl font-semibold' placeholder='Enter your email'/>
        <br />
        <button className='border-2 p-2 rounded-2xl w-full bg-orange-400 text-white font-semibold' onClick={handleSubmit}>Submit</button>
    </form>
    <p className='text-red-400'>{status}</p>
    </div>
    </>
    
  )
}
