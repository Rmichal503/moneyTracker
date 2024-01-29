'use server'
import { ProgressBarColor } from '@/types/components'
import { Database, Expenses, Spend } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, Text, Metric, ProgressBar, NumberInput, Button, Flex, TextInput, Badge } from '@tremor/react'
import dayjs from 'dayjs'
import { ChevronDown, Coins, Loader, Settings, Trash, Users } from 'lucide-react'
import React from 'react'
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";

// const addCurrentValue = async (id: number, value: number, expenseLabel: string) => {
//     if (Math.sign(value) === -1) return alert('The expense must be entered as a positive number')
//     const { error } = await supabase.rpc('update_current_value', { p_id: id, p_label: expenseLabel, p_value: value })
//     if (error) {
//         console.error(error)
//         return
//     }
//     setTimeout(() => {
//         location.reload()
//     }, 400)
// }



export default async function MockupSpendCard() {
    const mockData:Spend ={
        color: "red",
        created_at: String(Date.now()),
        current_value: 99,
        id: 321,
        max_value: 400,
        shared: false,
        title: "Grocieries",
        share_edit: null,
        owner: true
      }
    const {max_value, current_value, title, color, shared, share_edit, owner } = mockData
    const leftMoney = () => {
        const leftMoney = (Math.round(((max_value - current_value) + Number.EPSILON) * 100) / 100)
        return leftMoney
    }
    const percentageOfLeftMoney = () => {
        if (max_value === 0) return 0
        return Math.round((100 * (current_value)) / max_value)
    }
    const mockupExpenses = [
        {
            user_name: 'Bonzo',
            created_at: Date.now(),
            label: 'carrots',
            value: 32,
            id: 21
        }, {
            user_name: 'Bonzo',
            created_at: Date.now(),
            label: 'carrots',
            value: 32,
            id: 22
        }, {
            user_name: 'Bonzo',
            created_at: Date.now(),
            label: 'carrots',
            value: 32,
            id: 23
        }
    ]
        async function inputColor(){
            'use server'
            if(leftMoney() <0){
                return 'red'
            }
            return undefined
        }
    return (
        <Card decoration='top' decorationColor={color as ProgressBarColor} className='rounded-md drop-shadow-md space-y-2 p-4 h-fit w-full'>
            <Flex className='w-full space-x-2'>
                <Metric color={color as ProgressBarColor}>{title}</Metric>
                <Flex className='self-start w-fit space-x-1'>
                    {shared ? <div className='flex space-x-1'><Badge icon={Users} color={color as ProgressBarColor}>Shared</Badge></div> : null}
                    {owner ? <Button variant='light' color={color as ProgressBarColor} icon={Settings} ></Button> : null}
                    <input type='checkbox'></input>
                </Flex>
            </Flex>
            <div>
                <Flex>
                    <span className='flex space-x-1'>
                        <Text color={color as ProgressBarColor}>{current_value}</Text> <Text> &bull; {percentageOfLeftMoney()}%</Text>
                    </span>
                    <span className='flex space-x-1'>
                        <Text>{leftMoney()}</Text><Text>&bull;</Text> <Text color={color as ProgressBarColor}> {max_value}</Text>
                    </span>
                </Flex>
                <ProgressBar className='rounded' color={color as ProgressBarColor} showAnimation={true} value={percentageOfLeftMoney()} />
            </div>
            {(share_edit || owner) ? (<div className='flex space-x-2 items-center'>
                <div className="flex flex-col space-y-1 w-full">
                    <TextInput required className='rounded-md' placeholder='Expense label' />
                    <NumberInput className='rounded-md' placeholder='Add expense' enableStepper={false}/>
                </div>
                <Button color={color as ProgressBarColor} className='rounded-md aspect-square' icon={Coins} variant='secondary'></Button>
            </div>) : null}
            {/* {toogle ? <div className='flex flex-col space-y-1'>
                <MaxLimit color={color} placeholderText={'Set new monthly spending limits'} id={id} />
                <EditTitle color={color} id={id} />
                <div className="flex space-x-1 items-center justify-end">
                    <ResetCard id={id} />
                    <DeleteCard id={id} />
                </div>
            </div> : null} */}
            <div className='flex justify-center'>
                <Text color={color as ProgressBarColor} className='flex hover:text-tremor-content-emphasis hover:cursor-pointer transition-colors duration-200'>Expenses over time <ChevronDown /></Text>
            </div>
            {/* {(toogleExpenses) ?
                (mockupExpenses !== undefined) ?
                    (<Table className='max-w-full'>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell className='text-center'>Date</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Label</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Value</TableHeaderCell>
                                <TableHeaderCell className='text-center'>User</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='text-xs md:text-sm xl:text-base'>
                            {mockupExpenses?.map((el) => {
                                const user = (el.user_name !== null ? el.user_name : 'User')
                                return (<TableRow className='max-w-full' key={el.created_at}>
                                    <TableCell className='text-center p-1 md:p-2'>{dayjs(el.created_at).format('DD/MM HH:mm')}</TableCell>
                                    <TableCell className='text-center p-1 md:p-2'>
                                        {el.label}
                                    </TableCell>
                                    <TableCell className='text-center p-1 md:p-2'>
                                        <Text color={color as ProgressBarColor}>{el.value}</Text>
                                    </TableCell>
                                    <TableCell className='text-center p-1 md:p-2 flex items-center justify-center space-x-1'>
                                        <span>{user}</span>
                                        {(user_name === el.user_name) ?
                                            <Trash size={14} className='stroke-rose-500 hover:stroke-rose-700 hover:cursor-pointer transition-colors duration-300' onClick={() => {
                                                deleteExpense(el.id)
                                            }} />
                                            : null}
                                    </TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>) : <Text color={color as ProgressBarColor} className="flex justify-center">
                        <Loader className='animate-spin' size={32} />
                    </Text> : null
            } */}
        </Card>
    )
}