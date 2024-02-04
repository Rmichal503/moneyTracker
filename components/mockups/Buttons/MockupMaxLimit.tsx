import { useMockupCardState } from '@/store/user'
import { ProgressBarColor } from '@/types/components'
import { Button, Divider, NumberInput } from '@tremor/react'
import { PiggyBank } from 'lucide-react'
import React, { useState } from 'react'


interface MaxLimitButtonProps {
    color: string,
    placeholderText: string
}

export default function MockupMaxLimit({ color, placeholderText }: MaxLimitButtonProps) {
    const [editMaxValue,setEditMaxValue] = useState<number>(0)
    const setMaxValue = useMockupCardState((state)=>state.setMaxValue)
    return (
        <>
            <Divider className='my-1' />
            <div className='flex space-x-2'>
                <NumberInput className='rounded-md' placeholder={placeholderText} enableStepper={false} onValueChange={(value) => {
                setEditMaxValue(value)
            }} />
                <Button color={color as ProgressBarColor} className='rounded-md' icon={PiggyBank} variant='secondary' onClick={(e)=>{
                    e.preventDefault()
                    setMaxValue(editMaxValue);
                }}></Button>
            </div>
        </>
    )
}
