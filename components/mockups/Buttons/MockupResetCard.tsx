import { useMockupCardState } from '@/store/user'
import { Button } from '@tremor/react'
import { RefreshCcw } from 'lucide-react'
import React from 'react'


export default function MockupResetCard() {
    const reset = useMockupCardState((state)=>state.reset)
    return (
        <div className='flex pt-2 justify-end'>
            <Button className='rounded-md' icon={RefreshCcw} variant='secondary' color='rose' onClick={(e)=>{
                e.preventDefault()
                reset();
            }}>Reset List</Button>
        </div>
    )
}
