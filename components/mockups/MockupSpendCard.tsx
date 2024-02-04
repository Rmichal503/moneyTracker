'use client'
import { ProgressBarColor } from '@/types/components'
import { Spend } from '@/types/supabase'
import { Card, Text, Metric, ProgressBar, NumberInput, Button, Flex, TextInput, Badge, Switch } from '@tremor/react'
import dayjs from 'dayjs'
import { ChevronDown, Coins, Loader, Settings, Trash, Users } from 'lucide-react'
import React, { useState } from 'react'
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import MockupMaxLimit from './Buttons/MockupMaxLimit'
import MockupEditTitle from './Buttons/MockupEditTitle'
import MockupResetCard from './Buttons/MockupResetCard'
import MockupDeleteCard from './Buttons/MockupDeleteCard'
import { useMockupCardState } from '@/store/user'

interface ToogleOptionsProps {
    toogle: boolean;
    owner: boolean;
    color: string;
}

interface ToogleExpensesProps {
    toogle: boolean;
    expenses: {
        user_name: string;
        created_at: number;
        label: string;
        value: number;
        id: number;
    }[];
    color: string
}

interface AddExpenseProps {
    owner: boolean
    shareEdit: boolean
    color: string
}

const ToogleSpendCardOption = ({ toogle, owner, color }: ToogleOptionsProps) => {
    if (owner) {
        if (toogle) {
            return (
                <div className='flex flex-col space-y-1'>
                    <MockupMaxLimit color={color} placeholderText={'Set new monthly spending limits'} />
                    <MockupEditTitle color={color} />
                    <div className="flex space-x-1 items-center justify-end">
                        <MockupResetCard />
                        <MockupDeleteCard />
                    </div>
                </div>
            )
        }
    }
    return null
}
const ToogleSpendCardExpenses = ({ toogle, expenses, color }: ToogleExpensesProps) => {
    if (toogle) {
        if (expenses !== undefined) {
            if (expenses.length !== 0) {
                return (
                    <Table className='max-w-full'>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell className='text-center'>Date</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Label</TableHeaderCell>
                                <TableHeaderCell className='text-center'>Value</TableHeaderCell>
                                <TableHeaderCell className='text-center'>User</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='text-xs md:text-sm xl:text-base'>
                            {expenses?.map((el, index) => {
                                const user = (el.user_name !== null ? el.user_name : 'User')
                                return (<TableRow className='max-w-full' key={index}>
                                    <TableCell className='text-center p-1 md:p-2'>{dayjs(el.created_at).format('DD/MM HH:mm')}</TableCell>
                                    <TableCell className='text-center p-1 md:p-2'>
                                        {el.label}
                                    </TableCell>
                                    <TableCell className='text-center p-1 md:p-2'>
                                        <Text color={color as ProgressBarColor}>{el.value}</Text>
                                    </TableCell>
                                    <TableCell className='text-center p-1 md:p-2 flex items-center justify-center space-x-1'>
                                        <span>{user}</span>
                                        {(user === el.user_name) ?
                                            <Trash size={14} className='stroke-rose-500 hover:stroke-rose-700 hover:cursor-pointer transition-colors duration-300' />
                                            : null}
                                    </TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )
            }
            return <Text className='text-center'>You have no expenses at this point</Text>
        }
        return (
            <Text color={color as ProgressBarColor} className="flex justify-center">
                <Loader className='animate-spin' size={32} />
            </Text>
        )
    }
    return null
}

const AddExpense = ({ owner, shareEdit, color }: AddExpenseProps) => {
    const [expense, setExpense] = useState<number>(0)
    const [label, setLabel] = useState<string>('label')
    const setExpenses = useMockupCardState((state) => state.setExpenses)
    const expensesId = useMockupCardState((state) => state.expensesId)
    const setExpensesId = useMockupCardState((state) => state.setExpensesId)
    const setCurrentValue = useMockupCardState((state) => state.setCurrentValue)
    if (owner || shareEdit) {
        return (
            <div className='flex space-x-2 items-center'>
                <div className="flex flex-col space-y-1 w-full">
                    <TextInput required className='rounded-md' placeholder='Expense label' onChange={(e) => {
                        e.preventDefault()
                        setLabel(e.target.value)
                    }} />
                    <NumberInput className='rounded-md' placeholder='Add expense' enableStepper={false} onValueChange={(value) => {
                        setExpense(value)
                    }} />
                </div>
                <Button color={color as ProgressBarColor} className='rounded-md aspect-square' icon={Coins} variant='secondary' onClick={(e) => {
                    e.preventDefault()
                    setExpenses({
                        user_name: 'user',
                        label: label,
                        value: expense,
                        created_at: Date.now(),
                        id: expensesId
                    })
                    setCurrentValue(expense)
                    setExpensesId()
                }}></Button>
            </div>
        )
    }
    return null
}

export default function MockupSpendCard() {
    const [toogle, setToogle] = useState(false)
    const [toogleExpenses, setToogleExpenses] = useState(false)
    const [share, setShare] = useState(false)
    const [shareEdit, setShareEdit] = useState(false)
    const [owner, setOwner] = useState(false)
    const max_value = useMockupCardState((state) => state.max_value);
    const current_value = useMockupCardState((state) => state.current_value);
    const title = useMockupCardState((state) => state.title);
    const color = useMockupCardState((state) => state.color);
    const expenses = useMockupCardState((state) => state.expenses)
    const handleSwitchShare = (value: boolean) => {
        setShare(value);
    };
    const handleSwitchOwner = (value: boolean) => {
        setOwner(value);
        if (value === false) {
            setToogle(false)
        }
    };
    const handleSwitchShareEdit = (value: boolean) => {
        setShareEdit(value);
    };
    const leftMoney = () => {
        const leftMoney = (Math.round(((max_value - current_value) + Number.EPSILON) * 100) / 100)
        return leftMoney
    }
    const percentageOfLeftMoney = () => {
        if (max_value === 0) return 0
        return Math.round((100 * (current_value)) / max_value)
    }
    async function inputColor() {
        if (leftMoney() < 0) {
            return 'red'
        }
        return undefined
    }
    const cardClass = `rounded-md drop-shadow-md space-y-2 p-4 h-fit w-full border-${color}-300 ring-${color}-300`
    return (
        <div className='sm:max-w-md w-full px-2'>
            <div className='flex flex-col gap-5 py-5 px-2'>
                <div className='flex gap-2'>
                    <Switch id='Owner' name='Owner' checked={owner} onChange={handleSwitchOwner} />
                    <Text color={owner ? color as ProgressBarColor : undefined}>You Own this Spend Card?</Text>
                </div>
                <div className='flex gap-2'>
                    <Switch id='Share' name='Share' checked={share} onChange={handleSwitchShare} />
                    <Text color={share ? color as ProgressBarColor : undefined}>You share with someone?</Text>
                </div>
                <div className='flex gap-2'>
                    <Switch id='ShareEdit' name='ShareEdit' checked={shareEdit} onChange={handleSwitchShareEdit} />
                    <Text color={shareEdit ? color as ProgressBarColor : undefined}>Someone can also edit this Card?</Text>
                </div>
            </div>
            <Card decoration='top' decorationColor={color as ProgressBarColor} className='rounded-md drop-shadow-md space-y-2 p-4 h-fit w-full'>
                <Flex className='w-full space-x-2'>
                    <Metric color={color as ProgressBarColor}>{title}</Metric>
                    <Flex className='self-start w-fit space-x-1'>
                        {share ? <div className='flex space-x-1'><Badge icon={Users} color={color as ProgressBarColor}>Shared</Badge></div> : null}
                        {owner ? <Button variant='light' color={color as ProgressBarColor} icon={Settings} onClick={(e) => {
                            e.preventDefault()
                            setToogle(prev => { return !prev })
                        }}></Button> : null}
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
                <AddExpense shareEdit={shareEdit} owner={owner} color={color} />
                <ToogleSpendCardOption toogle={toogle} owner={owner} color={color} />
                <div className='flex justify-center' onClick={() => {
                    setToogleExpenses(prev => !prev)
                    console.log(toogleExpenses);
                }}>
                    <Text color={color as ProgressBarColor} className='flex hover:text-tremor-content-emphasis hover:cursor-pointer transition-colors duration-200'  >Expenses over time <ChevronDown /></Text>
                </div>
                <ToogleSpendCardExpenses toogle={toogleExpenses} expenses={expenses} color={color} />
            </Card>
        </div>
    )
}