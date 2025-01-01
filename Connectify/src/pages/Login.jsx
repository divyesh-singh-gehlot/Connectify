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
      <div className='h-5/6 w-1/2 bg-[#121212] flex flex-col justify-start'>
      <h1 className='text-5xl mt-10 text-center'>Login</h1>
        <form onSubmit={(e)=>{handleUserLogin(e,credentials)}}>
            <div className='flex flex-col gap-16 mt-28 w-2/3 mx-auto'>
            <div className='flex flex-col gap-3'>
                <label className='text-3xl '>Email:</label>
                <input
                className='h-12 bg-transparent' 
                type="email"
                required
                name='email'
                placeholder='Enter your email'
                value={credentials.email}
                onChange={handleInputChange}
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label className='text-3xl '>Password:</label>
                <input
                className='h-12 bg-transparent'
                type="password"
                required
                name='password'
                placeholder='Enter your password'
                value={credentials.password}
                onChange={handleInputChange}
                />
            </div>
            <div className='h-fit bg-[rgba(219,26,90,1)]'>
            <button className='text-xl w-full h-12' type='submit'>Login</button>
            </div>            
            </div>
        </form>
        <p className='text-center pt-5'>Don't have an account? <Link to='/register' className='underline font-bold'>Register now</Link></p>
      </div>
    </div>
  )
}

export default Login
