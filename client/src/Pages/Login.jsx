import React, { useState } from 'react'
import assets from '../assets/assets'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {

  const [currState, setCurrState] = useState("Sign up")

  const [fullName, setFullName] = useState("")
  const [email, SetEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const {login} = useContext(AuthContext)

  // form submition handle
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }
    login(currState === "Sign up" ? 'signup' : 'login', {fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
     
      {/* left */}
      <img src={assets.logo_big} className='w-[min(30vw, 250px)]' alt="" />

      {/* right */}
      <form onSubmit={(e) => onSubmitHandler(e)} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
       
        <h2 className='flex justify-between items-center font-medium text-2xl'>
          {currState}
          {
          isDataSubmitted && <img src={assets.arrow_icon} onClick={() => setIsDataSubmitted(false)} alt="" className='w-5 cursor-pointer' />
          }
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input type="text" onChange={(e)=> setFullName(e.target.value)} value={fullName} className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />
        )}

        {!isDataSubmitted && (
          <>
           <input type="email" onChange={(e)=> SetEmail(e.target.value)} value={email} placeholder='Email Adderss' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
           <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} placeholder='Password' required  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
          </>
        )}

        {
          currState && isDataSubmitted && (
            <textarea rows={4} onChange={(e) => setBio(e.target.value)} value={bio} placeholder='provide a short bio...' 
             className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'required>
            </textarea>
          )
        }

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === 'Sign up' ? 'Create Account' : 'Login Now'}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox"  />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {
          currState === "Sign up" 
          ? (<p className='text-sm text-gray-600'>Already have an account? <span onClick={() => {setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>) 
          : (<p className='text-sm text-gray-600'>Create an account <span onClick={() => setCurrState("Sign up")}  className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>)
          }
        </div>
        
      </form>
    </div>
  )
}

export default Login
