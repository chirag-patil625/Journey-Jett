import React from 'react'
import { Link } from 'react-router-dom'
import img from "../assets/Rectangle 121.png"

const Hellocard = () => {
    return (
        
        <Link to="#" >
            <div className="bg-white border border-gray-200 rounded-2xl w-full " style={{boxShadow:' 5px 10px 15px gray'}}>
                <img className="rounded-t-lg w-full" src={img} alt="" />
                <div className="xl:px-5 xl:py-3 md:px-3 md:py-2 rounded-2xl p-3" style={{backgroundColor:'#f7f8f2'}}>
                    <p className='text-black text-sm'>30-02-2000</p>
                    <h5 className="mb-2 pt-3 xl:text-2xl md:text-lg font-bold text-sm sm:text-base text-gray-900 ">Mastering the Art of Solo Hiking: Tips for a Safe and Empowering Journey</h5>
                    <p className="mb-3 font-normal text-gray-700 text-xs sm:text-base">Embark on a transformative solo hiking experience with expert advice.....</p>
                    <div className=" rounded-full inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black hover:text-white outline hover:outline-black bg-transparent hover:bg-black ">
                        Read Article
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default Hellocard
