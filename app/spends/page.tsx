'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { Database, Spend } from '../../types/supabase'
import { Card, Metric, Text, ProgressBar, Button, Accordion, AccordionBody, AccordionHeader, NumberInput } from "@tremor/react";
import AddNewList from '@/components/AddNewList';
import SpendCard from '@/components/SpendCard';
import Navbar from '@/components/Navbar';

const supabase = createClientComponentClient<Database>()
const fetchData = async () => {
    const { data, error } = await supabase.from('spends').select('id,title,maxValue,currentValue,color')
    if (error) {
        console.error(error)
        return
    }
    return data
}


export default function page() {
    const [spends, setSpends] = useState<Spend[]>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchSpends = async () => {
            const spends = await fetchData()
            console.log(spends);
            setSpends(spends)
        }
        fetchSpends()
        return setLoading(false)
    }, [])
    return (
        <>
            {((spends === undefined) && (loading)) ? <p className='text-slate-50'>Loading</p> : (
                <div className='flex flex-col w-full h-full items-center'>
                    <Navbar />
                    <div className='w-full md:w-1/2 flex flex-col space-y-4 md:space-y-8'>
                        {spends !== undefined ? (<>
                            {spends.map((el) => {
                                return (<SpendCard spend={el} key={el.id} />)
                            })}
                        </>
                        ) : null}
                    </div>
                </div>
            )}
        </>
    )
}
