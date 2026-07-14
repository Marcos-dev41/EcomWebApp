import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../components/ProductComp';
import NavBar from '../components/NavBar';

export default function ProductList() {
    const [message, setMessage] = useState('');
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        axios.get('http://localhost:8081/api/products')
          .then(response => {
            setMessage(response.data); 
            setLoading(false);
          })
          .catch(error => {
            console.error("fetch error", error);
            setLoading(false);
          });
      }, []);
    
     
      if (loading) return <p className='text-green'>loading ...</p>;
  return (
    <>
    <NavBar/>
    <div className='flex flex-wrap justify-around gap-15'>
        {message.map((item)=>(
          <Product key={item.prodId} product={item}/>
        ))
        }
    </div>
    </>
   
  )
}
