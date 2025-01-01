import React from 'react'
import { useAuth } from '../utilities/AuthContext.jsx'
import { Link } from 'react-router-dom'

const Header = () => {
    const {user} = useAuth()
  return (
    <div id="header--wrapper">
        {user ? (
            <>
                <h1 className='text-2xl mt-1'>Welcome {user.name}</h1>
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