import React from 'react'
import { Link } from 'react-router-dom'

const Filter = (props) => {
  return (
    <Link to="/">
    <div className='rounded-full border-2 w-auto lg:p-2 md:p-2 flex justify-center items-center border-black'>
      <h1 className='md:text-xs'>{props.value}</h1>
    </div>
    </Link>
  )
}

export default Filter
