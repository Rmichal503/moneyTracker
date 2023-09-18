import { ProgressBarColor } from '@/types/components'
import { Database, Spend } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, Text, Metric, ProgressBar, Accordion, AccordionHeader, AccordionBody, NumberInput, Button, Flex } from '@tremor/react'
import { Coins, PiggyBank, Settings, Trash } from 'lucide-react'
import React, { useState } from 'react'
import DeleteCard from './ExpensesButtons/DeleteCard'
import MaxLimit from './ExpensesButtons/MaxLimit'

const supabase = createClientComponentClient<Database>()

// foriner table with expenses

const percentageOfLeftMoney = (maxValue: number, minValue: number) => {
    if(maxValue === 0) return 0
    return Math.round((100 * (minValue)) / maxValue)
}


const addCurrentValue = async (id: string, currentValue: number, value: number, title: string | null) => {
    const { error } = await supabase.from('spends').update({ currentValue: (currentValue + value) }).eq('id', id)
    const { error: expensesError } = await supabase.from('expenses').insert({ value: value, title: title })
    if (error) console.error(error)
    setTimeout(() => {
        location.reload()
    }, 400)
}


export default function SpendCard({ spend }: { spend: Spend }) {
    const [editCurrentValue, setEditCurrentValue] = useState(0)
    const [toogle,setToogle] = useState(false)
    const { id, maxValue, currentValue, title, color } = spend
    return (
        <Card decoration='top' decorationColor={color as ProgressBarColor} className='rounded-md drop-shadow-md space-y-2 p-4'>
            <Flex>
                <Metric>{title}</Metric>
                <Button variant='light' icon={Settings} onClick={(e)=>{
                    e.preventDefault()
                    setToogle(prev=>{return !prev})
                }}></Button>
            </Flex>
            <div>
                <Flex>
                    <span className='flex space-x-1'>
                        <Text color={color as ProgressBarColor}>{currentValue}</Text> <Text> &bull; {percentageOfLeftMoney(maxValue, currentValue)}%</Text>
                    </span>
                    <span className='flex space-x-1'>
                        <Text>{maxValue-currentValue} &bull; </Text> <Text color={color as ProgressBarColor}> {maxValue}</Text>
                    </span>
                </Flex>
                <ProgressBar color={color as ProgressBarColor} showAnimation={true} value={percentageOfLeftMoney(maxValue, currentValue)} />
            </div>
            <div className='flex space-x-1'>
                <NumberInput className='rounded-md' placeholder='Add expense' enableStepper={false} onValueChange={(value) => { setEditCurrentValue(value) }} />
                <Button color={color as ProgressBarColor} className='rounded-md' icon={Coins} variant='secondary' onClick={(e) => {
                    e.preventDefault()
                    if ((currentValue + editCurrentValue) > maxValue) { return alert('Over budget!') }
                    addCurrentValue(id, currentValue, editCurrentValue, title)
                }} ></Button>
            </div>
            {/* <Accordion className='border-none w-full'>
                <AccordionHeader className='text-left p-1'>Edit</AccordionHeader>
                <AccordionBody className='space-y-1 p-0'>
                    <MaxLimit color={color} placeholderText={'Set monthly spending limits'} id={id}/>
                    <DeleteCard id={id}/>
                </AccordionBody>
            </Accordion> */}
            {toogle?<div className='flex flex-col space-y-1'>
                <MaxLimit color={color} placeholderText={'Set monthly spending limits'} id={id}/>
                <DeleteCard id={id}/>
            </div>:null}
        </Card>
    )
}
