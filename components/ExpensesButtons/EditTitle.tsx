import { ProgressBarColor } from '@/types/components'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button, TextInput } from '@tremor/react'
import { PenTool } from 'lucide-react'
import React, { useState } from 'react'

interface EditTitleProps{
    color: string,
    id: number,
}

const supabase = createClientComponentClient<Database>()

const editTitle = async (id:number,newTitle:string|undefined)=>{
    if(newTitle === undefined){
        alert('Enter a new title for the card')
        return
    }
    const {error} = await supabase.from('card').update({title:newTitle}).eq('id',id)
    // const {error} = await supabase.from('spends').update({title:newTitle}).eq('id',id)
    if(error){
        console.error(error)
        return
    }
    // const {error:expenseError} = await supabase.from('expenses').update({title:newTitle}).eq('title',title)
    // if(expenseError){
    //     console.error(expenseError)
    //     return
    // }
    setTimeout(() => {
        location.reload()
    }, 400)
}

export default function EditTitle({color,id}:EditTitleProps) {
    const [newTitle, setNewTitle] = useState<string>()
  return (
    <div className='flex space-x-2'>
            <TextInput className='rounded-md' placeholder='New title' onChange={(e)=>{
                e.preventDefault()
                setNewTitle(e.target.value)
            }}/>
            <Button color={color as ProgressBarColor} className='rounded-md' icon={PenTool} variant='secondary' onClick={(e) => {
                e.preventDefault()
                editTitle(id, newTitle)
            }}></Button>
        </div>
  )
}
