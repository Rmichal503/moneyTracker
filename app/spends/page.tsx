'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { Database, Spend } from '../../types/supabase'
import Navbar from '@/components/Navbar';
import { Loader, PenTool } from 'lucide-react';
import DynamicGrid from '@/components/DynamicGrid';
import { Button, Card, Text, TextInput } from '@tremor/react';
import { useUserState } from '@/store/user';

const supabase = createClientComponentClient<Database>()
const fetchData = async () => {
    const { data, error } = await supabase.rpc('get_cards').order('created_at', { ascending: true })
    if (error) {
        console.error(error)
        return
    }
    return data
}
const fetchProfile = async ()=>{
    const {data} = await supabase.rpc('get_user_info')
    return data
}

const newUserName =async (user_name:string|undefined, setUserName:(user_name:string)=>void) => {
    if(user_name === undefined){
        return alert('Type your user name')
    }
    const {error} = await supabase.rpc('update_user_name',{p_user_name:user_name})
    if (error) {
        console.error(error)
        return
    }
    setUserName(user_name)
}

export default function page() {
    const [spends, setSpends] = useState<Spend[]>()
    const [loading, setLoading] = useState(true)
    const [updateUserName, setUpdateUserName] = useState<string>()
    const {user_name,setUserName,setUserEmail} = useUserState()
    useEffect(() => {
        const fetchSpends = async () => {
            const spends = await fetchData()
            const user = await fetchProfile()
            console.log(user);
            setUserName(user![0].db_user_name)
            setUserEmail(user![0].db_user_email)
            setSpends(spends)
        }
        fetchSpends()
        return setLoading(false)
    }, [])
    return (
        <>
            {user_name === null ? <Card className='m-auto w-full md:w-2/3 lg:w-1/2 xl:w-1/3 lg:text-xl xl:text-2xl'>
                <Text>Set your user name</Text>
                <div className='flex space-x-2'>
                    <TextInput className='rounded-md' placeholder='User name' onChange={(e) => {
                        e.preventDefault()
                        setUpdateUserName(e.target.value)
                    }} />
                    <Button className='rounded-md' icon={PenTool} variant='secondary' onClick={(e) => {
                        e.preventDefault()
                        newUserName(updateUserName,setUserName)
                    }}></Button>
                </div>
            </Card> :
                <>
                    <Navbar />
                    {((spends === undefined) && (loading)) ? <Loader className='animate-spin my-auto' size={200} /> : (
                        <div className='w-full h-fit flex md:space-y-0'>
                            {spends !== undefined ? (
                                <DynamicGrid spends={spends} />
                            ) : null}
                        </div>
                    )}
                </>
            }
        </>
    )
}
