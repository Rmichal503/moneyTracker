import { ProgressBarColor } from '@/types/components'
import { Database, Expenses, Spend } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, Text, Metric, ProgressBar, NumberInput, Button, Flex, TextInput } from '@tremor/react'
import dayjs from 'dayjs'
import { ChevronDown, Coins, Loader, Settings, Users } from 'lucide-react'
import React, { useState } from 'react'
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import DeleteCard from './ExpensesButtons/DeleteCard'
import MaxLimit from './ExpensesButtons/MaxLimit'
import EditTitle from './ExpensesButtons/EditTitle'

const supabase = createClientComponentClient<Database>()


const percentageOfLeftMoney = (maxValue: number, minValue: number) => {
    if (maxValue === 0) return 0
    return Math.round((100 * (minValue)) / maxValue)
}


const addCurrentValue = async (id: string, currentValue: number, value: number, title: string | null, expenseLabel: string | null) => {
    if (Math.sign(value) === -1) return alert('The expense must be entered as a positive number')
    const { error } = await supabase.from('spends').update({ currentValue: (currentValue + value) }).eq('id', id)
    const { error: expensesError } = await supabase.from('expenses').insert({ value: value, title: title, label: expenseLabel })
    if (error) console.error(error)
    if (expensesError) console.error(expensesError)
    setTimeout(() => {
        location.reload()
    }, 600)
}




export default function SpendCard({ spend, ownerId }: { spend: Spend, ownerId: string | undefined }) {
    const [editCurrentValue, setEditCurrentValue] = useState(0)
    const [expenseLabel, setExpenseLabel] = useState<string>()
    const [toogle, setToogle] = useState(false)
    const [expenses, setExpenses] = useState<Expenses[]>()
    const [toogleExpenses, setToogleExpenses] = useState(false)

    const { id, maxValue, currentValue, title, color, shared_with, share_edit, user_id } = spend

    const fetchExpenses = async (title: string) => {
        const { error, data } = await supabase.from('expenses').select('created_at,value,label').eq('title', title)
        if (data !== null) {
            setExpenses(data)
            console.log(data);
        }
    }
    return (
        <Card decoration='top' decorationColor={color as ProgressBarColor} className='rounded-md drop-shadow-md space-y-2 p-4 h-fit'>
            <Flex>
                <Metric color={color as ProgressBarColor}>{title}</Metric>
                {(ownerId === user_id) ? (<Button variant='light' color={color as ProgressBarColor} icon={Settings} onClick={(e) => {
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
            {(ownerId === user_id) ? (<div className='flex space-x-2 items-center'>
                <div className="flex flex-col space-y-1 w-full">
                    <TextInput className='rounded-md' placeholder='Expense label' onChange={(e) => {
                        e.preventDefault()
                        setExpenseLabel(e.target.value)
                    }} />
                    <NumberInput className='rounded-md' placeholder='Add expense' enableStepper={false} onValueChange={(value) => { setEditCurrentValue((Math.round(value * 100) / 100)) }} />
                </div>
                <Button color={color as ProgressBarColor} className='rounded-md aspect-square' icon={Coins} variant='secondary' onClick={(e) => {
                    e.preventDefault()
                    if ((currentValue + editCurrentValue) > maxValue) { return alert('Over budget!') }
                    addCurrentValue(id, currentValue, editCurrentValue, title, (expenseLabel === undefined ? null : expenseLabel))
                }} ></Button>
            </div>) : ((share_edit && (shared_with !== null || shared_with !== '')) ? (<div className='flex space-x-2 items-center'>
                <div className="flex flex-col space-y-1 w-full">
                    <TextInput className='rounded-md' placeholder='Expense label' onChange={(e) => {
                        e.preventDefault()
                        setExpenseLabel(e.target.value)
                    }} />
                    <NumberInput className='rounded-md' placeholder='Add expense' enableStepper={false} onValueChange={(value) => { setEditCurrentValue((Math.round(value * 100) / 100)) }} />
                </div>
                <Button color={color as ProgressBarColor} className='rounded-md aspect-square' icon={Coins} variant='secondary' onClick={(e) => {
                    e.preventDefault()
                    if ((currentValue + editCurrentValue) > maxValue) { return alert('Over budget!') }
                    addCurrentValue(id, currentValue, editCurrentValue, title, (expenseLabel === undefined ? null : expenseLabel))
                }} ></Button>
            </div>) : null)}
            {toogle ? <div className='flex flex-col space-y-1'>
                <MaxLimit color={color} placeholderText={'Set new monthly spending limits'} id={id} />
                <EditTitle color={color} id={id} title={title!}/>
                <DeleteCard id={id} title={title!} />
            </div> : null}
            <div className='flex justify-center' onClick={() => {
                if (expenses === undefined) {
                    fetchExpenses(title!)
                }
                setToogleExpenses(prev => { return !prev })
            }}>
                <Text color={color as ProgressBarColor} className='flex hover:text-tremor-content-emphasis hover:cursor-pointer transition-colors duration-200'>Expenses over time <ChevronDown /></Text>
            </div>
            {(toogleExpenses) ?
                (expenses !== undefined) ?
                    (<Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Date</TableHeaderCell>
                                <TableHeaderCell>Label</TableHeaderCell>
                                <TableHeaderCell>Value</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses?.map((el) => (
                                <TableRow key={el.created_at}>
                                    <TableCell>{dayjs(el.created_at).format('DD/MM HH:mm:ss')}</TableCell>
                                    <TableCell>
                                        <Text>{el.label}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text color={color as ProgressBarColor}>{el.value}</Text>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>) : <Text color={color as ProgressBarColor} className="flex justify-center">
                        <Loader className='animate-spin' size={32} />
                    </Text> : null
            }
        </Card>
    )
}
