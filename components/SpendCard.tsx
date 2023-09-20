import { ProgressBarColor } from '@/types/components'
import { Database, Spend } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, Text, Metric, ProgressBar, NumberInput, Button, Flex } from '@tremor/react'
import { Coins, Settings, Users } from 'lucide-react'
import React, { useState } from 'react'
import DeleteCard from './ExpensesButtons/DeleteCard'
import MaxLimit from './ExpensesButtons/MaxLimit'

const supabase = createClientComponentClient<Database>()


const percentageOfLeftMoney = (maxValue: number, minValue: number) => {
    if (maxValue === 0) return 0
    return Math.round((100 * (minValue)) / maxValue)
}


const addCurrentValue = async (id: string, currentValue: number, value: number, title: string | null) => {
    if (Math.sign(value) === -1) return alert('The expense must be entered as a positive number')
    const { error } = await supabase.from('spends').update({ currentValue: (currentValue + value) }).eq('id', id)
    const { error: expensesError } = await supabase.from('expenses').insert({ value: value, title: title })
    if (error) console.error(error)
    if (expensesError) console.error(expensesError)
    setTimeout(() => {
        location.reload()
    }, 600)
}


export default function SpendCard({ spend,ownerId }: { spend: Spend, ownerId:string | undefined }) {
    const [editCurrentValue, setEditCurrentValue] = useState(0)
    const [toogle, setToogle] = useState(false)
    const { id, maxValue, currentValue, title, color, shared_with, share_edit,user_id } = spend
    return (
        <Card decoration='top' decorationColor={color as ProgressBarColor} className='rounded-md drop-shadow-md space-y-2 p-4 h-fit'>
            <Flex>
                <Metric color={color as ProgressBarColor}>{title}</Metric>
                {(shared_with === null || shared_with === '') ? (<Button variant='light' color={color as ProgressBarColor} icon={Settings} onClick={(e) => {
                    e.preventDefault()
                    setToogle(prev => { return !prev })
                }}></Button>) : (<Text className='flex space-x-1 items-center' color={color as ProgressBarColor}><Users size={16} />Shared</Text>)}
            </Flex>
            <div>
                <Flex>
                    <span className='flex space-x-1'>
                        <Text color={color as ProgressBarColor}>{currentValue}</Text> <Text> &bull; {percentageOfLeftMoney(maxValue, currentValue)}%</Text>
                    </span>
                    <span className='flex space-x-1'>
                        <Text>{maxValue - currentValue} &bull; </Text> <Text color={color as ProgressBarColor}> {maxValue}</Text>
                    </span>
                </Flex>
                <ProgressBar className='rounded' color={color as ProgressBarColor} showAnimation={true} value={percentageOfLeftMoney(maxValue, currentValue)} />
            </div>
            {(ownerId === user_id) ? (<div className='flex space-x-1'>
                <NumberInput className='rounded-md' placeholder='Add expense' enableStepper={false} onValueChange={(value) => { setEditCurrentValue((Math.round(value * 100) / 100)) }} />
                <Button color={color as ProgressBarColor} className='rounded-md' icon={Coins} variant='secondary' onClick={(e) => {
                    e.preventDefault()
                    if ((currentValue + editCurrentValue) > maxValue) { return alert('Over budget!') }
                    addCurrentValue(id, currentValue, editCurrentValue, title)
                }} ></Button>
            </div>) : ((share_edit && (shared_with !== null || shared_with !== '')) ? (<div className='flex space-x-1'>
                <NumberInput className='rounded-md' placeholder='Add expense' enableStepper={false} onValueChange={(value) => { setEditCurrentValue((Math.round(value * 100) / 100)) }} />
                <Button color={color as ProgressBarColor} className='rounded-md' icon={Coins} variant='secondary' onClick={(e) => {
                    e.preventDefault()
                    if ((currentValue + editCurrentValue) > maxValue) { return alert('Over budget!') }
                    addCurrentValue(id, currentValue, editCurrentValue, title)
                }} ></Button>
            </div>) : null)}
            {/* {share_edit ? null ? shared_with === (null || '') :
                (<div className='flex space-x-1'>
                    <NumberInput className='rounded-md' placeholder='Add expense' enableStepper={false} onValueChange={(value) => { setEditCurrentValue((Math.round(value * 100) / 100)) }} />
                    <Button color={color as ProgressBarColor} className='rounded-md' icon={Coins} variant='secondary' onClick={(e) => {
                        e.preventDefault()
                        if ((currentValue + editCurrentValue) > maxValue) { return alert('Over budget!') }
                        addCurrentValue(id, currentValue, editCurrentValue, title)
                    }} ></Button>
                </div>) : null} */}
            {toogle ? <div className='flex flex-col space-y-1'>
                <MaxLimit color={color} placeholderText={'Set new monthly spending limits'} id={id} />
                <DeleteCard id={id} />
            </div> : null}
        </Card>
    )
}
