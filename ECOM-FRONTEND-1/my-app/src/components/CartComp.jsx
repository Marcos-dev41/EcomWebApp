import React from 'react'
import cartimg from '../../src/assets/m2.png'

export default function 
() {
  return (
    <div className='flex flex-row p-5 rounded-xl justify-between w-full 2xl:max-w-[500px] h-25 border-2 m-5'>
        <img src={cartimg} alt=""/>
        <div className='flex flex-row justify-around w-90'>
        <div className='p-2'>
            <h2 className='h-10 font-semibold text-xl'>HP monitor</h2>
        </div>

        <div className="flex  flex-col flex-start font-semibold justify-around">
            <h4> Ksh 4,000</h4>
            <h4 className = "text-green-500 ">InStock</h4>
        </div>
        </div>
        <button className=" mt-2 p-2 pl-5 pr-5 rounded-5xl">
           ❌
        </button>
    </div>
  )
}
