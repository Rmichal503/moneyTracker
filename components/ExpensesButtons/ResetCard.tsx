import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@tremor/react'
import { RefreshCcw } from 'lucide-react'
import React from 'react'

const supabase = createClientComponentClient<Database>()

const resetList = async (id: number) => {
    const { error } = await supabase.rpc('reset_expenses',{p_id:id})
    if (error) {
        console.error(error)
        return
    }
    setTimeout(() => {
        location.reload()
    }, 400)
}

export default function ResetCard({ id}: { id: number}) {
    return (
        <div className='flex pt-2 justify-end'>
            <Button className='rounded-md' icon={RefreshCcw} variant='secondary' color='rose' onClick={(e) => {
                e.preventDefault()
                resetList(id)
            }} >Reset List</Button>
        </div>
    )
}
