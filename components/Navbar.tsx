import { Divider } from '@tremor/react'
import React from 'react'
import AddNewList from './AddNewList'
import LogoutButton from './LogoutButton'

export default function Navbar() {
  return (
    <div className='flex flex-col px-3 py-2 md:p-6 relative w-screen'>
    <div className='flex justify-end space-x-1'>
        <AddNewList/>
        <LogoutButton/>
    </div>
        <Divider className='mt-3 mb-0 md:mt-6'/>
    </div>
  )
}
