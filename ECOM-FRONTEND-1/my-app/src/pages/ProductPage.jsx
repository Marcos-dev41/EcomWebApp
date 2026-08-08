import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../components/ProductComp';
import NavBar from '../components/NavBar';
import api from '../axioxInstance';



export default function ProductList() {
    const [message, setMessage] = useState('');
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        api.get('/products')
          .then(response => {
            setMessage(response.data); 
            setLoading(false);
          })
          .catch(error => {
            setMessage(null)
            console.error("fetch error", error);
            setLoading(false);
          });
      }, []);
    
     
      if (loading){ return (<> <NavBar/> <div className='flex flex-col items-center h-100 p-3 text-center justify-center'><p className='text-green-300 text-center font-semibold text-sm'> Loading products...</p></div></> )

      }
      if(message==null){ return(<> <NavBar/> <div className='flex flex-col items-center h-100 p-3 text-center justify-center'><p className='text-red-300 text-center  font-semibold text-sm'> <span className='text-red-500'>404 ERROR</span> <br /> Products Not Found!</p>
         <p className='text-gray-400 text-center text-sm'>check your internet and try again</p></div></> )
      };

  return (
    <>
    <NavBar/>
    <div className='flex flex-wrap justify-around m-2 gap-15'>
        {message.map((item)=>(
          <Product key={item.prodId} product={item}/>
        ))
        }
    </div>
    </>
   
  )
}
