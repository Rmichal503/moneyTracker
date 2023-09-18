'useClient'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button, Card, NumberInput, TextInput } from '@tremor/react'
import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'

const supabase = createClientComponentClient<Database>()

const addNewList = async (title: string | undefined, color: string, maxValue:number) => {
    if (title === undefined) return
    try {
        await supabase.from('spends').insert({
            title: title,
            color: color,
            maxValue: maxValue,
            currentValue: maxValue
        })
    } catch (error) {

    }
}

const colorSelect = [
    {
        value: '#3b82f6',
        title: 'blue'
    },
    {
        value: '#64748b',
        title: 'slate'
    },
    {
        value: '#6b7280',
        title: 'gray'
    },
    {
        value: '#71717a',
        title: 'zinc'
    },
    {
        value: '#737373',
        title: 'neutral'
    },
    {
        value: '#78716c',
        title: 'stone'
    },
    {
        value: '#ef4444',
        title: 'red'
    },
    {
        value: '#f97316',
        title: 'orange'
    },
    {
        value: '#f59e0b',
        title: 'amber'
    },
    {
        value: '#eab308',
        title: 'yellow'
    },
    {
        value: '#84cc16',
        title: 'lime'
    },
    {
        value: '#22c55e',
        title: 'green'
    },
    {
        value: '#10b981',
        title: 'emerald'
    },
    {
        value: '#14b8a6',
        title: 'teal'
    },
    {
        value: '#06b6d4',
        title: 'cyan'
    },
    {
        value: '#0ea5e9',
        title: 'sky'
    },
    {
        value: '#6366f1',
        title: 'indigo'
    },
    {
        value: '#8b5cf6',
        title: 'violet'
    },
    {
        value: '#a855f7',
        title: 'purple'
    },
    {
        value: '#d946ef',
        title: 'fuchsia'
    },
    {
        value: '#ec4899',
        title: 'pink'
    },
    {
        value: '#f43f5e',
        title: 'rose'
    },
]

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
                <div className='flex justify-end'>
                    <input className='w-8 h-8 p-0 border rounded-md inputColor' type='color' disabled value={selectedColor?.value} defaultValue='#3b82f6' />
                    <select defaultValue='blue' className='outline-tremor-ring text-center' onChange={(e) => {
                        const colorValues = e.target.value.split(',')
                        setSelectedColor({
                            value: colorValues[0],
                            title: colorValues[1]
                        })
                    }}>
                        {colorSelect.map(({ value, title }) => {
                            const upperCaseTitle = title.charAt(0).toUpperCase() + title.slice(1)
                            return (
                                <option key={value} value={[value, title]}>
                                    {upperCaseTitle}
                                </option>
                            )
                        })}
                    </select>
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
