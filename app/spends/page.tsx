'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { Database, Spend } from '../../types/supabase'
import Navbar from '@/components/Navbar';
import { Loader } from 'lucide-react';
import DynamicGrid from '@/components/DynamicGrid';

const supabase = createClientComponentClient<Database>()
const fetchData = async () => {
    const {data,error} = await supabase.rpc('get_cards').order('created_at', {ascending:true})
    if (error) {
        console.error(error)
        return
    }
    console.log(data);
    return data
}

export default function page() {
    const [spends, setSpends] = useState<Spend[]>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchSpends = async () => {
            const spends = await fetchData()
            setSpends(spends)
        }
        fetchSpends()
        return setLoading(false)
    }, [])
    return (
        <>
            <Navbar />
            {((spends === undefined) && (loading)) ? <Loader className='animate-spin my-auto' size={200} /> : (
                    <div className='w-full h-fit flex md:space-y-0'>
                        {spends !== undefined ? (
                        <DynamicGrid spends={spends}/>
                        ) : null}
                    </div>
            )}
        </>
    )
}
