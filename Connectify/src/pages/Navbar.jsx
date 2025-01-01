import React from 'react'
import '../index.css'
import Header from '../Components/HEader'
import { useAuth } from '../utilities/AuthContext'
import { IoIosLogOut } from "react-icons/io";

const navbar = () => {
  const {user, handleUserLogout} = useAuth()
  return (
    <div className='flex justify-between mx-5 mt-2'>
      <div>
        <h1 className='text-2xl font-mono'>CONNECTIFY</h1>
      </div>
      <div>
        <Header />
      </div>
      <div>
        <IoIosLogOut onClick={handleUserLogout} size={36} className='cursor-pointer'/>
      </div>
    </div>
  )
}

export default navbar
