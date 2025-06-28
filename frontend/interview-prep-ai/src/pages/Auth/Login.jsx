import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
  



    if(!validateEmail(email)){
      setError("please enter a valid email")
      return;
    }



    if(!password){
      setError("please enter a password")
      return;
    }


    setError("")

    try{
      const response =await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const {token}=response.data;

      if (token){
        localStorage.setItem("token", token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate("/dashboard");  
      }



    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
    }
    else{
      setError("An error occurred. Please try again later.")
      }
    }

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
