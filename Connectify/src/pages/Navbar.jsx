import React from 'react'
import '../index.css'
import Header from '../Components/Header'
import { useAuth } from '../utilities/AuthContext'
import { IoIosLogOut } from "react-icons/io";

const navbar = () => {
  const {user, handleUserLogout} = useAuth()
  return (
    <div className='flex justify-between mx-2 md:mx-5 md:mt-5 xl:mx-5 mt-2'>
      <div>
        <h1 className='text-sm md:text-3xl xl:text-2xl font-mono'>CONNECTIFY</h1>
      </div>
      <div>
        <Header />
      </div>
      <div>
        <IoIosLogOut onClick={handleUserLogout} className='cursor-pointer md:size-10 xl:size-8'/>
      </div>
    </div>
  )
}

export default navbar
