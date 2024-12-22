"use client"
import React from 'react'

function page({params}:any) {
  return (
    <div>
      <h1>Progle Page </h1>
      <h2 className='p-3 bg-green-500 text-black rounded-sm'>{params.id}</h2>
    </div>
  )
}

export default page
