'useClient'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button, Card, NumberInput, TextInput } from '@tremor/react'
import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import SelectColorInput from './SelectColorInput'

const supabase = createClientComponentClient<Database>()

const addNewList = async (title: string | undefined, color: string, maxValue: number, emailToShareWith: string | null, shareEdit: boolean) => {
    if (title === undefined) return
    if (emailToShareWith) {
        try {
            await supabase.rpc('add_share_card', { p_email: emailToShareWith, p_color: color, p_maxvalue: maxValue, p_title: title, p_share_edit: shareEdit })
            setTimeout(() => {
                location.reload()
            }, 400)
        } catch (error) {
            alert(`${error}`)
        }
        return
    }
    try {
        await supabase.from('card').insert({
            title: title,
            color: color,
            max_value: maxValue,
        })
        // await supabase.from('spends').insert({
        //     title: title,
        //     color: color,
        //     maxValue: maxValue,
        //     shared_with: emailToShareWith,
        //     share_edit: shareEdit
        // })
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
    const [toogleAdd, setToogleAdd] = useState(false)
    const [listName, setListName] = useState<string>()
    const [selectedColor, setSelectedColor] = useState<ColorSelect>()
    const [editMaxValue, setEditMaxValue] = useState(0)
    const [emailToShareWith, setEmailToShareWith] = useState<string | null>(null)
    const [toogleShareEmailInput, setToogleShareEmailInput] = useState(false)
    const [shareEdit, setShareEdit] = useState(false)
    return (
        <div className='h-fit space-y-1'>
            <Button size='xs' className='rounded-md xs:px-2.5 xs:py-1.5 px-1.5 py-1' variant='primary' onClick={() => {
                setToogleAdd(prev => { return !prev })
            }}>
                New list
            </Button>
            {toogleAdd ? <Card className='absolute z-10 flex flex-col right-2 space-y-2 w-3/4 md:md:w-1/3 rounded-md drop-shadow-md p-3'>
                <TextInput placeholder='New list name' className='rounded-md' onChange={(e) => {
                    e.preventDefault()
                    setListName(e.target.value)
                }} />
                <NumberInput className='rounded-md' placeholder='Set a spending limit' enableStepper={false} onValueChange={(value) => {
                    setEditMaxValue(value)
                }} />
                <div className='flex justify-between md:justify-end px-3 py-2 items-center border-tremor-border dark:border-dark-tremor-border border rounded-md space-x-1'>
                    <label className='text-tremor-content text-tremor-default' htmlFor="inputColor">Choose card color</label>
                    <input className='w-8 h-8 p-0 border rounded-md inputColor' type='color' disabled value={selectedColor?.value} defaultValue='#3b82f6' name='inputColor' />
                    <SelectColorInput setSelectedColor={setSelectedColor} />
                </div>
                <div className="flex justify-end px-3 py-2 items-center rounded-md space-x-1">
                    <input type='checkbox' name='share' onChange={() => {
                        setToogleShareEmailInput(prev => { return !prev })
                    }} />
                    <label className='text-tremor-content text-tremor-default' htmlFor="share">Shared card?</label>
                </div>
                {toogleShareEmailInput ? (
                    <>
                        <TextInput placeholder='Email of user you want to share' className='rounded-md' onChange={(e) => {
                            e.preventDefault()
                            setEmailToShareWith(e.target.value.trim().toLowerCase())
                        }} />
                        <div className="flex justify-end px-3 py-2 items-center rounded-md space-x-1">
                            <label className='text-tremor-content text-tremor-default' htmlFor="shareEdit">Allow user to edit this card?</label>
                            <input type='checkbox' name='shareEdit' onChange={() => {
                                setShareEdit(prev => { return !prev })
                            }} />
                        </div>
                    </>
                ) : null}
                <Button icon={PlusCircle} className='rounded-lg p-2' onClick={() => {
                    if (selectedColor === undefined) return alert('Choose color')
                    setToogleAdd(prev => { return !prev })
                    addNewList(listName, selectedColor.title, editMaxValue, emailToShareWith, shareEdit)
                }}>Add list</Button>
            </Card> : null}
        </div>
    )
}
