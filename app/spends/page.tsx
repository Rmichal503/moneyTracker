'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { Database, Spend } from '../../types/supabase'
import SpendCard from '@/components/SpendCard';
import Navbar from '@/components/Navbar';

const supabase = createClientComponentClient<Database>()
const fetchData = async () => {
    const { data, error } = await supabase.from('spends').select('id,title,maxValue,currentValue,color,shared_with').order('created_at',{ascending:true})
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
                    <div className='w-full h-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 space-y-4 md:gap-4 md:space-y-0'>
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
