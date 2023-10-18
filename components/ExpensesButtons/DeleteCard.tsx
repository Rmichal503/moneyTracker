import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@tremor/react'
import { Trash } from 'lucide-react'
import React from 'react'

const supabase = createClientComponentClient<Database>()

const deleteList = async (id: string, title: string) => {
    const { error } = await supabase.rpc('deletecard', { p_id: id, p_title: title })
    if (error) {
        console.error(error)
        return
    }
    setTimeout(() => {
        location.reload()
    }, 400)
}

export default function DeleteCard({ id, title }: { id: string, title: string }) {
    return (
        <div className='flex pt-2 justify-end'>
            <Button className='rounded-md' icon={Trash} variant='secondary' color='red' onClick={(e) => {
                e.preventDefault()
                deleteList(id, title)
            }} >Delete List</Button>
        </div>
    )
}
