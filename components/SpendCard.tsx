import { ProgressBarColor } from '@/types/components'
import { Database, Expenses, Spend } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, Text, Metric, ProgressBar, NumberInput, Button, Flex, TextInput, Badge } from '@tremor/react'
import dayjs from 'dayjs'
import { ChevronDown, Coins, Loader, Settings, Trash, Users } from 'lucide-react'
import React, { useState } from 'react'
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import DeleteCard from './ExpensesButtons/DeleteCard'
import MaxLimit from './ExpensesButtons/MaxLimit'
import EditTitle from './ExpensesButtons/EditTitle'
import ResetCard from './ExpensesButtons/ResetCard'

const supabase = createClientComponentClient<Database>()


const percentageOfLeftMoney = (maxValue: number, minValue: number) => {
    if (maxValue === 0) return 0
    return Math.round((100 * (minValue)) / maxValue)
}


const addCurrentValue = async (id: number, value: number, expenseLabel: string) => {
    if (Math.sign(value) === -1) return alert('The expense must be entered as a positive number')
    const { error } = await supabase.rpc('updatecurrentvalue',{p_id:id,p_label:expenseLabel,p_value:value})
    if (error) {
        console.error(error)
        return
    }
    setTimeout(() => {
        location.reload()
    }, 400)
}

const deleteExpense = async (id: number, title:string) => {
    const { error } = await supabase.rpc('deleteexpenses',{p_id:id,p_title:title})
    if (error) {
        console.log(error);
        return
    }
    setTimeout(() => {
        location.reload()
    }, 400)
}




export default function SpendCard({ spend }: { spend: Spend }) {
    const [editCurrentValue, setEditCurrentValue] = useState(0)
    const [expenseLabel, setExpenseLabel] = useState<string>()
    const [toogle, setToogle] = useState(false)
    const [expenses, setExpenses] = useState<Expenses[]>()
    const [toogleExpenses, setToogleExpenses] = useState(false)

    const { id, max_value, current_value, title, color, shared, share_edit, owner} = spend
    const fetchExpenses = async (id:number) => {
        const { error, data } = await supabase.from('card_current_expenses').select('id,created_at,value,label,user_name').eq('card_id', id)
        if (data !== null) {
            return setExpenses(data)
        }
        console.error(error)
    }

    return (
        <Card decoration='top' decorationColor={color as ProgressBarColor} className='rounded-md drop-shadow-md space-y-2 p-4 h-fit w-full'>
            <Flex className='w-full space-x-2'>
                <Metric color={color as ProgressBarColor}>{title}</Metric>
                    <Flex className='self-start w-fit space-x-1'>
                        {shared?<div className='flex space-x-1'><Badge icon={Users} color={color as ProgressBarColor}>Shared</Badge></div>:null}
                        {owner?<Button variant='light' color={color as ProgressBarColor} icon={Settings} onClick={(e) => {
                            e.preventDefault()
                            setToogle(prev => { return !prev })
                        }}></Button>:null}
                    </Flex>
            </Flex>
            <div>
                <Flex>
                    <span className='flex space-x-1'>
                        <Text color={color as ProgressBarColor}>{current_value}</Text> <Text> &bull; {percentageOfLeftMoney(max_value, current_value)}%</Text>
                    </span>
                    <span className='flex space-x-1'>
                        <Text>{Math.round(((max_value - current_value) + Number.EPSILON) * 100) / 100} &bull; </Text> <Text color={color as ProgressBarColor}> {max_value}</Text>
                    </span>
                </Flex>
                <ProgressBar className='rounded' color={color as ProgressBarColor} showAnimation={true} value={percentageOfLeftMoney(max_value, current_value)} />
            </div>
            {(share_edit || owner) ? (<div className='flex space-x-2 items-center'>
                <div className="flex flex-col space-y-1 w-full">
                    <TextInput required className='rounded-md' placeholder='Expense label' onChange={(e) => {
                        e.preventDefault()
                        setExpenseLabel(e.target.value)
                    }} />
                    <NumberInput className='rounded-md' placeholder='Add expense' enableStepper={false} onValueChange={(value) => { setEditCurrentValue((Math.round(value * 100) / 100)) }} />
                </div>
                <Button color={color as ProgressBarColor} className='rounded-md aspect-square' icon={Coins} variant='secondary' onClick={(e) => {
                    e.preventDefault()
                    if ((current_value + editCurrentValue) > max_value) { return alert('Over budget!') }
                    addCurrentValue(id, editCurrentValue, expenseLabel!)
                }} ></Button>
            </div>) : null}
            {toogle ? <div className='flex flex-col space-y-1'>
                <MaxLimit color={color} placeholderText={'Set new monthly spending limits'} id={id} />
                <EditTitle color={color} id={id} />
                <div className="flex space-x-1 items-center justify-end">
                    <ResetCard id={id}/>
                    <DeleteCard id={id} />
                </div>
            </div> : null}
            <div className='flex justify-center' onClick={() => {
                if (expenses === undefined) {
                    fetchExpenses(id)
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
                                <TableHeaderCell className='text-center'>Date</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Label</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Value</TableHeaderCell>
                                <TableHeaderCell className='text-center'>User</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='text-xs md:text-sm xl:text-base'>
                            {expenses?.map((el) => {
                                const user = (el.user_name !== null?el.user_name:'User')
                                return (<TableRow key={el.created_at}>
                                    <TableCell className='text-center p-1 md:p-2'>{dayjs(el.created_at).format('DD/MM HH:mm')}</TableCell>
                                    <TableCell className='text-center p-1 md:p-2'>
                                        <Text>{el.label}</Text>
                                    </TableCell>
                                    <TableCell className='text-center p-1 md:p-2'>
                                        <Text color={color as ProgressBarColor}>{el.value}</Text>
                                    </TableCell>
                                    <TableCell className='text-center p-1 md:p-2'>
                                        <Text className='flex items-center justify-center space-x-1'><p>{user}</p> 
                                        {/* {(email === el.creator) ?
                                            <Trash size={14} className='stroke-rose-500 hover:stroke-rose-700 hover:cursor-pointer transition-colors duration-300' onClick={() => {
                                                deleteExpense(el.id,title!)
                                            }} />
                                            : null} */}
                                            </Text>
                                    </TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>) : <Text color={color as ProgressBarColor} className="flex justify-center">
                        <Loader className='animate-spin' size={32} />
                    </Text> : null
            }
        </Card>
    )
}
