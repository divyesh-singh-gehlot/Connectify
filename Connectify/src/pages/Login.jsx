import React, { useEffect, useState } from 'react'
import { useAuth } from '../utilities/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import '../index.css'

const Login = () => {

    const {user, handleUserLogin} = useAuth()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    })

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [])
    
    const handleInputChange = (e) =>{
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]:value})
        console.log(credentials)
    }       

  return (
    <div className='container h-screen w-full flex justify-center items-center'>
      <div className='h-4/6 w-full md:h-2/3 md:w-full md:mx-auto lg:w-5/6 xl:h-5/6 xl:w-1/2 bg-[#121212] flex flex-col justify-evenly'>
      <h1 className='text-3xl mt-5 md:text-5xl md:mt-10 lg:text-5xl lg:mt-5 text-center'>Login</h1>
        <form onSubmit={(e)=>{handleUserLogin(e,credentials)}}>
            <div className='flex flex-col gap-8 mt-14 md:gap-16 md:mt-14 w-2/3 mx-auto'>
            <div className='flex flex-col gap-3'>
                <label className='text-xl md:text-3xl'>Email:</label>
                <input
                className='h-8 md:h-12 bg-transparent' 
                type="email"
                required
                name='email'
                placeholder='Enter your email'
                value={credentials.email}
                onChange={handleInputChange}
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label className='text-xl md:text-3xl '>Password:</label>
                <input
                className='h-8 md:h-12 bg-transparent'
                type="password"
                required
                name='password'
                placeholder='Enter your password'
                value={credentials.password}
                onChange={handleInputChange}
                />
            </div>
            <div className='h-fit bg-[rgba(219,26,90,1)]'>
            <button className='text-xl w-full h-8 md:h-20 md:text-2xl xl:h-12' type='submit'>Login</button>
            </div>            
            </div>
        </form>
        <div className='text-center pt-5 flex flex-col text-sm md:text-xl md:gap-2 md:justify-center xl:flex-row xl:gap-2 xl:justify-center xl:text-sm'><span>Don't have an account? </span> <span><Link to='/register' className='underline font-bold'>Register now</Link></span></div>
      </div>
    </div>
  )
}

export default Login
