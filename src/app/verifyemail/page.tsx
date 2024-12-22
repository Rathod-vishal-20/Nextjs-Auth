"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
const VerifyEmailPage = () => {
  const[token , setToken] = useState("")
  const[verify, setVerify] = useState(false)
  const[error, setError] = useState(false);

  const verifyEmail = async () => {
    try{
      const response = await axios.post("/api/users/verifyemail",{token})
      setVerify(true)
    }catch(error:any){
      setError(true);
      console.log(error.response.data)
    }
  }

  useEffect( () =>{
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || " ")
  },)

  useEffect( () => {
    setError(false)
    if(token.length > 0){
      verifyEmail()
    }
  },[token])



  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-screen'>
    <h1 className='text-4xl ' >Verify Email</h1>
    <h2 className='p-2text-xl bg-orange-500 text-black'>
      {token ? `${token}` : "no token"}
       </h2>

       {verify && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>

        </div>
       )}

       {
        error && (
          <div>
            <h2>Error</h2>
          </div>
        )
       }
      </div>
    </div>
  )
}

export default VerifyEmailPage
