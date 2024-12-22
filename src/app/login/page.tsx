"use client";
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function loginPage() {

  const router = useRouter()
 const[user , setUser] = useState({
  email:"",
  password:"",
  username:""
 })

 const [ buttonDisabled, setButtonDisabled] = useState(true)

 const [loading , setLoading ] = useState(false);
 
 const onLogin = async () => {
      try{
        setLoading(true);
       const response = await axios.post("/api/users/login",user)
       console.log("login  Success",response.data);
       router.push("/profile");
      }catch(error:any){
        console.log("login failed")
        toast.error(error.message)
      }
 }

 useEffect( () => {
  if(user.email.length > 0 && user.password.length > 0){
     setButtonDisabled(false);
  } 
 },[user])
 
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>
        {loading ? "Processing" : "Login"}
      </h1>
 

<label htmlFor='email'>email</label>
      <input
      id='email'
      value={user.email}
      className='p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600 text-black'
      onChange={(e) => setUser({...user, email:e.target.value})}
       type="text" 
       placeholder='email'
       />

<label htmlFor='password'>username</label>
      <input
      id='password'
      value={user.password}
      className='p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600 text-black'
      onChange={(e) => setUser({...user, password:e.target.value})}
       type="password" 
       placeholder='password'
       />

       <button
       onClick={onLogin}
       className='p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600'
       >
        {buttonDisabled ? "No Login" : "Login"}
       </button>

       <Link href={"/signup"}>
       visit signup page
       </Link>
    </div>
  )
}

export default loginPage
