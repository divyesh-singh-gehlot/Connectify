import React from 'react'
import { useAuth } from '../utilities/AuthContext.jsx'
import { Link } from 'react-router-dom'

const Header = () => {
    const {user} = useAuth()
  return (
    <div id="header--wrapper">
        {user ? (
            <>
                <h1 className='text-sm mr-18 ml-1 mt-10 md:text-3xl md:mt-0 xl:mt-0 xl:text-2xl md:mr-24'>Welcome {user.name}</h1>
            </>
        ): (
            <>
                <Link to="/">
                    <LogIn className="header--link"/>
                </Link>
            </>
        )}
    </div>
  )
}

export default Header