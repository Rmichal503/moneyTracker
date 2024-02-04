import { Button } from '@tremor/react'
import { Trash } from 'lucide-react'
import React from 'react'


export default function MockupDeleteCard() {
    return (
        <div className='flex pt-2 justify-end'>
            <Button className='rounded-md' icon={Trash} variant='secondary' color='red' >Delete List</Button>
        </div>
    )
}
