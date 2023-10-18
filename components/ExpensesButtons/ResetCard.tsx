import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@tremor/react'
import { RefreshCcw } from 'lucide-react'
import React from 'react'

const supabase = createClientComponentClient<Database>()

const resetList = async (id: string, title: string) => {
    const { error } = await supabase.rpc('resetecard', { p_id: id, p_title: title })
    if (error) {
        console.error(error)
        return
    }
    setTimeout(() => {
        location.reload()
    }, 400)
}

export default function ResetCard({ id, title }: { id: string, title: string }) {
    return (
        <div className='flex pt-2 justify-end'>
            <Button className='rounded-md' icon={RefreshCcw} variant='secondary' color='rose' onClick={(e) => {
                e.preventDefault()
                resetList(id, title)
            }} >Reset List</Button>
        </div>
    )
}
