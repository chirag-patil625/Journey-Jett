import React from 'react'
import footer from "../assets/gooter.svg"

const Footer = () => {
  const kausanFontStyle = {
    fontFamily: 'Kausan Script, cursive',
    color: 'white', // Add other styles here as needed
    fontSize: '50px',
  };
  return (
    <div className=' border-t-2 mt-20 border-white h-auto '>
      <div className=' grid-flow-col-3 flex md:flex-row flex-col lg:mx-36 mx-20 my-24 xl:gap-96 lg:gap-60 md:gap-32'>
        <h1 className='text-white mx-1 text-3xl sm:text-5xl flex text-center md:justify-start mb-10 md:mb-0' style={kausanFontStyle}>journey jett</h1>
        <div className='flex flex-row gap-5 sm:gap-72 md:gap-32' >
        <div className='flex flex-col text-white text-center '>
            <h1 className=' text-base  sm:text-2xl font-bold my-2'>Resource</h1>
            <h1 className='text-sm'>About Us</h1>
            <h1 className='text-sm'>Article</h1>
        </div>
        <div className='flex flex-col  text-white text-center'>
            <h1 className=' text-base  sm:text-2xl font-bold my-2'>Follow Us</h1>
            <h1 className='text-sm'>Instagram</h1>
            <h1 className='text-sm'>Twitter</h1>
        </div>
        </div>
      </div>
      <div>
        <img src={footer} alt="" className='w-full' />
      </div>
    </div>
  )
}

export default Footer
