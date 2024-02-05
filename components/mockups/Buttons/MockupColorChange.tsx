// "slate","gray","zinc","neutral","stone","red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"

import { useMockupCardState } from '@/store/user'
import { ProgressBarColor } from '@/types/components';
import { Card, Metric, Text } from '@tremor/react'
import React from 'react'

const colors:string[] = ["slate","gray","zinc","neutral","stone","red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"]

export default function MockupColorChange() {
    const setColor = useMockupCardState((state)=>state.setColor);
  return (
    <div className='py-4'>
    <Metric className='py-2'>Select card color</Metric>
    <div className='grid grid-cols-4 gap-1 md:gap-2'>
        {colors.map((el,index)=>{
            return(<Card key={index} decoration="top" decorationColor={el} className='px-0.5 py-2 md:px-3 md:py-4 text-center hover:drop-shadow-md dark:hover:drop-shadow-darkSelectColor hover:cursor-pointer transition-shadow' onClick={(e)=>{
                e.preventDefault()
                setColor(el)
            }}>
                <Text color={el as ProgressBarColor} className='text-xs font-extralight md:text-sm'>{el}</Text>
            </Card>)
        })}
    </div>
    </div>
  )
}
