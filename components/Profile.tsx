import { useUserState } from '@/store/user'
import { Button, Card, Text } from '@tremor/react'
import { Rat, User } from 'lucide-react'
import React, { useState } from 'react'
import LogoutButton from './LogoutButton'


export default function Profile() {

    const [toogle, setToogle] = useState(false)
    const { user_name } = useUserState()
    return (
        <div className='h-fit space-y-1'>
            <Button size='xs' icon={User} className='rounded-md' variant='secondary' onClick={() => {
                setToogle(prev => { return !prev })
            }}></Button>
            {toogle ? <Card className='absolute z-10 flex flex-col right-2 space-y-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-md drop-shadow-md p-3 items-end'>
                <Card className='flex space-x-1 py-2 px-4 items-center justify-between '>
                    <Rat className='stroke-[#3b82f6]' size={30} />
                    <Text className='font-bold md:text-lg xl:text-2xl' color='blue'>{user_name}</Text>
                </Card>
                <LogoutButton />
            </Card> : null}
        </div>
    )
}
