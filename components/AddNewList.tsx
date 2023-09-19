'useClient'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button, Card, NumberInput, TextInput } from '@tremor/react'
import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import SelectColorInput from './SelectColorInput'

const supabase = createClientComponentClient<Database>()

const addNewList = async (title: string | undefined, color: string, maxValue:number) => {
    if (title === undefined) return
    try {
        await supabase.from('spends').insert({
            title: title,
            color: color,
            maxValue: maxValue,
        })
        setTimeout(() => {
            location.reload()
        }, 400)
    } catch (error) {
        alert(`${error}`)
    }
}

interface ColorSelect {
    value: string,
    title: string
}

export default function () {
    const [toogle, setToogle] = useState(false)
    const [listName, setListName] = useState<string>()
    const [selectedColor, setSelectedColor] = useState<ColorSelect>()
    const [editMaxValue, setEditMaxValue] = useState(0)
    return (
        <div className='h-fit space-y-1'>
            <Button size='xs' className='rounded-md' variant='primary' onClick={() => {
                setToogle(prev => { return !prev })
            }}>
                Add new list
            </Button>
            {toogle ? <Card className='absolute z-10 flex flex-col right-2 space-y-2 w-3/4 rounded-md drop-shadow-md p-3'>
                    <TextInput placeholder='New list name' className='rounded-md' onChange={(e) => {
                        e.preventDefault()
                        setListName(e.target.value)
                    }} />
                    <NumberInput className='rounded-md' placeholder='Set a spending limit' enableStepper={false} onValueChange={(value) => {
                        setEditMaxValue(value)
                    }} />
                <div className='flex justify-between pl-3 py-2 items-center border-tremor-border dark:border-dark-tremor-border border rounded-md space-x-1'>
                    <label className='text-tremor-content text-tremor-default' htmlFor="inputColor">Choose card color</label>
                    <input className='w-8 h-8 p-0 border rounded-md inputColor' type='color' disabled value={selectedColor?.value} defaultValue='#3b82f6' name='inputColor'/>
                    <SelectColorInput setSelectedColor={setSelectedColor}/>
                </div>
                <Button icon={PlusCircle} className='rounded-lg p-2' onClick={() => {
                        setToogle(prev => { return !prev })
                        if (selectedColor === undefined) return alert('Choose color')
                        addNewList(listName, selectedColor.title,editMaxValue)
                    }}>Add list</Button>
            </Card> : null}
        </div>
    )
}
