import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';

const Place_card = (props) => {
  const [icon, setIcon] = useState('')
  const [loc, setLoc] = useState('')
  useEffect(() => {
    async function getdata() {
      try {
        const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=bc0f0dcb734749ecaa1145032242303&q=${props.coordinates}&aqi=no`)
        setLoc(res.data.current.condition.text)
        setIcon(res.data.current.condition.icon)
        // console.log(res.data)
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getdata()
  }, [])

  function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  return (
    <div>
      <Link to={`/places/${props.place}`}>
        <div className="w-100 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img className={`rounded-t-lg ${props.height} w-full `} src={`http://127.0.0.1:8000${props.img}`} alt="hii" />
          <div className="p-3">
            <h5 className="mb-2 sm:text-2xl text-base font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
            <p className="mb-1 font-normal text-sm sm:text-base text-gray-700 dark:text-gray-400">{truncateString(props.desc, 60)}</p>
          </div>
          <div className='m-4 flex flex-col md:flex-row align-middle items-center '>
            <FaLocationDot color='white' />
            <h1 className='text-white mx-3'>{props.city}, {props.state}</h1>
            <div className='flex flex-row items-center'>
              <img className='size-14' src={icon} alt="hii" />
              <h1 className='text-white'>{loc}</h1>
            </div>
          </div>
        </div>
      </Link>
    </div>

  )
}

export default Place_card
