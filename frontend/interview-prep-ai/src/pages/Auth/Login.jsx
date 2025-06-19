import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    // handle login logic here
  }

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back man</h3>
      <p className="text-[14px] text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>
      <form onSubmit={handleLogin}>
        <Input
          type="text"
          value={email}
          label="Email Address"
          placeholder="bibek@gmail.com"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          value={password}
          label="Password"
          placeholder="********"
          onChange={(event) => setPassword(event.target.value)}
        />




        {error && 
        <p className="text-red-500 text-xs pb-3">{error}</p>
        }


        <button className="btn-primary" type='submit'>
          LOGIN
        </button>
         <p className="text-[16px] text-slate-800 mt-3">
        Don't have a account?{" "}

        <button className="font-bold text-amber-600  underline cursor-pointer" onClick={()=>{
          setCurrentPage('signup')
        }} >

          SignUp
          
        </button>
       </p>
      </form>
    </div>
  )
}

export default Login
