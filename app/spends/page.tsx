'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { Database, Spend } from '../../types/supabase'
import SpendCard from '@/components/SpendCard';
import Navbar from '@/components/Navbar';
import { Loader } from 'lucide-react';

const supabase = createClientComponentClient<Database>()
const fetchData = async () => {
    const { data, error } = await supabase.from('spends').select('id,title,maxValue,currentValue,color,shared_with,share_edit,user_id').order('created_at', { ascending: true })
    if (error) {
        console.error(error)
        return
    }
    return data
}

export interface Owner {
    email: string | undefined
    id: string | undefined
}

export default function page() {
    const [spends, setSpends] = useState<Spend[]>()
    const [owner, setOwner] = useState<Owner>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchSpends = async () => {
            const spends = await fetchData()
            const {data} = await supabase.auth.getSession()
            setOwner({
                email:data.session?.user.email,
                id:data.session?.user.id
            })
            setSpends(spends)
        }
        fetchSpends()
        return setLoading(false)
    }, [])
    return (
        <>
            <Navbar />
            {((spends === undefined) && (loading)) ? <Loader className='animate-spin my-auto' size={200} /> : (
                    <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-content-center md:place-content-evenly gap-1 md:gap-4 md:space-y-0'>
                        {spends !== undefined ? (<>
                            {spends.map((el) => {
                                return (<SpendCard owner={owner!} spend={el} key={el.id} />)
                            })}
                        </>
                        ) : null}
                    </div>
            )}
        </>
    )
}
