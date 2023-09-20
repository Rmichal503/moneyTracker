"use client"
import AnalisysChart from '@/components/AnalisysChart'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col w-full h-full items-center'>
      <Navbar/>
      <AnalisysChart/>
    </div>
  )
}
