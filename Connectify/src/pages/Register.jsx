import { useState } from "react"
import React from 'react'
import { useAuth } from "../utilities/AuthContext"
import { Link } from "react-router-dom"

const Register = () => {

    const {handleRegister} = useAuth()

const [credentials, setCredentials] = useState({
        name:'',
        email:'',
        password1:'',
        password2:''
    })

    const handleInputChange = (e) =>{
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]:value})
        console.log(credentials)
    } 

  return (
    <div className='container h-screen w-full flex justify-center items-center'>
      <div className='h-5/6 w-5/6 md:h-2/3 xl:h-full xl:w-1/2 bg-[#121212] flex flex-col justify-start'>
      <h1 className='text-2xl mt-5 md:text-4xl md:mt-10 xl:text-4xl xl:mt-10 text-center'>Register</h1>
        <form onSubmit={(e)=>{handleRegister(e,credentials)}}>
            <div className='flex flex-col gap-5 mt-10 w-5/6 md:gap-10 md:mt-20 md:w-2/3 xl:gap-10 xl:mt-20 xl:w-2/3 mx-auto'>
            <div className='flex flex-col gap-3'>
                <label className='text-md md:text-2xl xl:text-2xl'>Name:</label>
                <input
                className='h-8 md:h-12 xl:h-12 bg-transparent' 
                type="name"
                required
                name='name'
                placeholder='Enter your name'
                value={credentials.name}
                onChange={handleInputChange}
                autoComplete="off"
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label className='text-md md:text-2xl xl:text-2xl'>Email:</label>
                <input
                className='h-8 md:h-12 xl:h-12 bg-transparent' 
                type="email"
                required
                name='email'
                placeholder='Enter your email'
                value={credentials.email}
                onChange={handleInputChange}
                autoComplete="off"
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label className='text-md md:text-2xl xl:text-2xl'>Password:</label>
                <input
                className='h-8 md:h-12 xl:h-12 bg-transparent'
                type="password"
                required
                name='password1'
                placeholder='Enter your password'
                value={credentials.password1}
                onChange={handleInputChange}
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label className='text-md md:text-2xl xl:text-2xl'>Confirm Password:</label>
                <input
                className='h-8 md:h-12 xl:h-12 bg-transparent'
                type="password"
                required
                name='password2'
                placeholder='Enter your password'
                value={credentials.password2}
                onChange={handleInputChange}
                />
            </div>
            <div className='h-fit bg-[rgba(219,26,90,1)]'>
            <button className='text-md h-8 md:text-2xl md:h-20 xl:text-xl w-full xl:h-12' type='submit'>Register</button>
            </div>            
            </div>
        </form>
        <div className='text-center pt-5 flex flex-col text-sm md:flex-row md:gap-2 md:justify-center md:text-xl xl:flex-row xl:gap-2 xl:justify-center xl:text-sm'><span>Don't have an account? </span> <span><Link to='/login' className='underline font-bold'>Login now</Link></span></div>
      </div>
    </div>
  )
}

export default Register
