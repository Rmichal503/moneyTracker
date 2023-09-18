import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@tremor/react'
import { Trash } from 'lucide-react'
import React from 'react'

const supabase = createClientComponentClient<Database>()

const deleteList = async (id: string) => {
    const { error } = await supabase.from('spends').delete().eq('id', id)
    if (error) console.error(error)
    setTimeout(() => {
        location.reload()
    }, 400)
}

export default function DeleteCard({id}:{id:string}) {
    return (
        <div className='flex pt-2 justify-end'>
            <Button className='rounded-md' icon={Trash} variant='secondary' color='rose' onClick={(e) => {
                e.preventDefault()
                deleteList(id)
            }} >Delete List</Button>
        </div>
    )
}
