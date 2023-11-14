import { Button, Card } from '@tremor/react'
import { User } from 'lucide-react'
import React, { useState } from 'react'
import AddNewList from './AddNewList'
import LogoutButton from './LogoutButton'
import { useSearchParams } from 'next/navigation'


export default function Profile() {
    const searchParams = useSearchParams()
    const user_name = searchParams.get('user_name')
    const email = searchParams.get('email')
    const [toogle, setToogle] = useState(false)
    return (
        <div className='h-fit space-y-1'>
            <Button size='xs' icon={User} className='rounded-md' variant='secondary' onClick={() => {
                setToogle(prev => { return !prev })
            }}></Button>
            {toogle ? <Card className='absolute z-10 flex flex-col right-2 space-y-2 w-1/2 md:md:w-1/3 rounded-md drop-shadow-md p-3 items-end'>
                <p className='text-slate-50'>User: {user_name}</p>
                <p className='text-slate-50'>Email: {email}</p>
                <LogoutButton />
            </Card> : null}
        </div>
    )
}
