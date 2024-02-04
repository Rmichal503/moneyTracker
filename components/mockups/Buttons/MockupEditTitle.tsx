import { useMockupCardState } from '@/store/user'
import { ProgressBarColor } from '@/types/components'
import { Button, TextInput } from '@tremor/react'
import { PenTool } from 'lucide-react'
import React, { useState } from 'react'

interface EditTitleProps {
    color: string,
}

export default function MockupEditTitle({color}: EditTitleProps) {
    const [newTitle,setNewTitle] = useState('')
    const setTitle = useMockupCardState((state)=>state.setTitle);
    return (
        <div className='flex space-x-2'>
            <TextInput className='rounded-md' placeholder='New title' onChange={(e)=>{
                e.preventDefault()
                setNewTitle(e.target.value)}}/>
            <Button color={color as ProgressBarColor} className='rounded-md' icon={PenTool} variant='secondary' onClick={()=>{
                setTitle(newTitle);
            }}></Button>
        </div>
    )
}
