import React from 'react'
import '../index.css'

const navbar = () => {
  return (
    <div className='flex justify-between mx-5 mt-2'>
      <div>
        <h1 className='text-2xl font-sour'>Div ChatRoom</h1>
      </div>
      <div>
        <h1 className='text-xl'>Sign Out</h1>
      </div>
    </div>
  )
}

export default navbar
