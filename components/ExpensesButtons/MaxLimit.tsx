import { ProgressBarColor } from '@/types/components'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button, NumberInput } from '@tremor/react'
import { PiggyBank } from 'lucide-react'
import React, { useState } from 'react'

const supabase = createClientComponentClient<Database>()


const addMaxValue = async (id: string, value: number) => {
    const { error } = await supabase.from('spends').update({ maxValue: value, currentValue:value }).eq('id', id)
    if (error) console.error(error)
    setTimeout(() => {
        location.reload()
    }, 400)
}

interface MaxLimitButtonProps{
    color: string,
    id: string,
    placeholderText: string
}

export default function MaxLimit({color,id,placeholderText}:MaxLimitButtonProps) {
    const [editMaxValue, setEditMaxValue] = useState(0)
    return (
        <div className='flex space-x-1'>
            <NumberInput className='rounded-md' placeholder={placeholderText} enableStepper={false} onValueChange={(value) => {
                setEditMaxValue(value)
            }} />
            <Button color={color as ProgressBarColor} className='rounded-md' icon={PiggyBank} variant='secondary' onClick={(e) => {
                e.preventDefault()
                addMaxValue(id, editMaxValue)
            }}></Button>
        </div>
    )
}
