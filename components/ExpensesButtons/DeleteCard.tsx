import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@tremor/react'
import { Trash } from 'lucide-react'
import React from 'react'

const supabase = createClientComponentClient<Database>()

const deleteList = async (id: number) => {
    const { error } = await supabase.from('card').delete().eq('id', id)
    if (error) {
        console.error(error)
        return
    }
    setTimeout(() => {
        location.reload()
    }, 400)
}

export default function DeleteCard({ id }: { id: number }) {
    return (
        <div className='flex pt-2 justify-end'>
            <Button className='rounded-md' icon={Trash} variant='secondary' color='red' onClick={(e) => {
                e.preventDefault()
                deleteList(id)
            }} >Delete List</Button>
        </div>
    )
}
