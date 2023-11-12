'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { Database, Spend } from '../../types/supabase'
import Navbar from '@/components/Navbar';
import { Loader } from 'lucide-react';
import DynamicGrid from '@/components/DynamicGrid';

const supabase = createClientComponentClient<Database>()
const fetchData = async () => {
    // const { data, error } = await supabase.from('spends').select('id,title,maxValue,currentValue,color,shared_with,share_edit,user_id').order('created_at', { ascending: true })
    // const { data, error } = await supabase.from('card').select('id,created_at,current_value,max_value,title,color,shared').order('created_at', { ascending: true })
    const {data,error} = await supabase.rpc('get_cards').order('created_at', {ascending:true})
    // const { data:dataShare, error:errorShare } = await supabase.from('profiles').select('*,card ( * )')
    if (error) {
        console.error(error)
        return
    }
    console.log(data);
    // console.log(dataShare);
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
                        {/* grid grid-cols-1 grid-rows-1 md:grid-cols-2 xl:grid-cols-3 place-content-center md:place-content-evenly */}
                        {spends !== undefined ? (
                        // <>
                        //     {spends.map((el,i) => {
                        //         console.log(i);
                        //         return (<SpendCard owner={owner!} spend={el} key={el.id} />)
                        //     })}
                        // </>
                        <DynamicGrid spends={spends}/>
                        ) : null}
                    </div>
            )}
        </>
    )
}
