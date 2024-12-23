"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
const profilePage = () => {
  const Router = useRouter();
  const[data, setData] = useState("Nothing")

  const getUserDeatils = async () => {
    const res =await axios.post("/api/users/me")
    console.log(res.data);
    setData(res.data.data._id);
  }

  const logOut = async () => {
    try{
      await axios.get("/api/users/logout")
      toast.success("logout success")
      Router.push("/login")
    }catch(error:any){
      console.log(error.message);
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Profile</h1>
      <hr />
      <h2> {data == "Nothing" ? "Nothing " :
        <Link href={`/profile/${data}`} >{data}</Link>
        } </h2>
        <hr />

        <button
        className=' bg-blue-500 mt-4 hover:bg-blue-700 font-bold py-2 px-4 rounded-sm text-black'
        onClick={logOut}>
          logout
        </button>

        <button
        className=' bg-green-500 mt-4 hover:bg-green-700 font-bold py-2 px-4 rounded-sm text-black'
        onClick={getUserDeatils}>
          get users details
        </button>
    </div>

  )
}

export default profilePage
