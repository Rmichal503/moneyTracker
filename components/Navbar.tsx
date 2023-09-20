'use client'
import { Divider, Metric } from '@tremor/react'
import { getURL } from 'next/dist/shared/lib/utils'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import AddNewList from './AddNewList'
import LinkButton from './LinkButton'
import LogoutButton from './LogoutButton'

export default function Navbar() {
  const [url, setUrl] = useState<string>()
  useEffect(()=>{
    setUrl(getURL())
  },[])
  console.log(url);
  return (
    <div className='flex flex-col px-3 py-2 md:p-6 relative w-screen'>
      <div className='flex justify-end space-x-1 items-center'>
        <div className='mr-auto'>
          <Link href='/' className='flex items-center space-x-2'>
            <svg width="40px" height="40px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M246.253 280.552l71.99 97.834-166.207 48.293zm.274-37.243L138.877 97.006 21 279.83l107.65 146.3 114.21-177.108zm162.63 9.728l34.46-53.457-38.665 11.226v33.426zm-115.097-2.12l-10.515-4.89-18.56 5.388-7.17 11.126 77.33 105.143 31.99-49.628-20.28-42.88zm45.55-88.33h65.405v27.44l44.9-13.06L342.254 30.566 154.83 85.02l107.712 146.39 77.055-22.45v-46.373zm45.45 86.06v-66.105h-25.507v49.49l-13.533-5.1-34.012 10.277 49.89 22.937 104.62 221.287 24.482-7.11z" /></svg>
            <Metric color='blue' className='titleText text-xl hidden md:block'>Money Trapper</Metric>
          </Link>
        </div>
        {url === '/spends'?<AddNewList />:null}
        {/* {url === '/analysis'?<LinkButton text='Check yours expenses' href='/spends'/>:<LinkButton text='Expenses analysis' href='/analysis'/>} */}
        <LogoutButton />
      </div>
      <Divider className='mt-2 mb-0 md:mt-4' />
    </div>
  )
}
