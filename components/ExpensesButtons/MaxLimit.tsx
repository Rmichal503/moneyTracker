import { ProgressBarColor } from '@/types/components'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button, Divider, NumberInput } from '@tremor/react'
import { PiggyBank } from 'lucide-react'
import React, { useState } from 'react'

const supabase = createClientComponentClient<Database>()


const addMaxValue = async (id: number, value: number) => {
    const { error } = await supabase.from('card').update({ max_value: value, current_value:value }).eq('id', id)
    if (error) console.error(error)
    setTimeout(() => {
        location.reload()
    }, 400)
}

interface MaxLimitButtonProps{
    color: string,
    id: number,
    placeholderText: string
}

export default function MaxLimit({color,id,placeholderText}:MaxLimitButtonProps) {
    const [editMaxValue, setEditMaxValue] = useState(0)
    return (
        <>
        <Divider className='my-1'/>
        <div className='flex space-x-2'>
            <NumberInput className='rounded-md' placeholder={placeholderText} enableStepper={false} onValueChange={(value) => {
                setEditMaxValue(value)
            }} />
            <Button color={color as ProgressBarColor} className='rounded-md' icon={PiggyBank} variant='secondary' onClick={(e) => {
                e.preventDefault()
                addMaxValue(id, editMaxValue)
            }}></Button>
        </div>
        </>
    )
}
