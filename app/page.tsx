
import LinkButton from '@/components/LinkButton'
import MockupSpendCard from '@/components/mockups/MockupSpendCard'
import { Spend } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Metric, Text } from '@tremor/react'
import { cookies } from 'next/headers'
import LogoutButton from '../components/LogoutButton'
import Login from './login/page'

export const dynamic = 'force-dynamic'

const mockData: Spend = {
  color: "lime",
  created_at: String(Date.now()),
  current_value: 103,
  id: 311,
  max_value: 200,
  shared: true,
  title: "Cat",
  share_edit: true,
  owner: false
}


export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (user) {
    return (
      <div className="w-full flex flex-col md:justify-center md:space-x-8 items-center m-auto">
        <>
          <nav className="absolute w-full flex justify-center border-b border-b-tremor-background-subtle dark:border-b-dark-tremor-background-subtle top-0">
            <div className="w-full flex justify-between items-center px-3 py-2 md:px-6 md:py-4 text-sm">
              <div className="flex items-center w-full justify-end space-x-1 md:space-x-3">
                <span className="text-tremor-content dark:text-dark-tremor-content">Hey, {user.email}!</span>
                <LinkButton href='/spends' text='Spends' />
                <LogoutButton />
              </div>
            </div>
          </nav>
        </>
        <div className='flex flex-col items-center justify-center border-none py-8'>
          <svg className='w-[150px] h-[150px] md:w-[250px] md:h-[250px] md:mx-16' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path className='fill-black dark:fill-slate-50' d="M246.253 280.552l71.99 97.834-166.207 48.293zm.274-37.243L138.877 97.006 21 279.83l107.65 146.3 114.21-177.108zm162.63 9.728l34.46-53.457-38.665 11.226v33.426zm-115.097-2.12l-10.515-4.89-18.56 5.388-7.17 11.126 77.33 105.143 31.99-49.628-20.28-42.88zm45.55-88.33h65.405v27.44l44.9-13.06L342.254 30.566 154.83 85.02l107.712 146.39 77.055-22.45v-46.373zm45.45 86.06v-66.105h-25.507v49.49l-13.533-5.1-34.012 10.277 49.89 22.937 104.62 221.287 24.482-7.11z" /></svg>
          <Metric color='blue' className='titleText text-4xl md:text-6xl md:pb-1'>Money Trapper</Metric>
          <Text className='titleText text-xs md:text-sm'>a site where you can track all your expenses</Text>
        </div>
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col md:justify-center md:space-x-8 items-center m-auto">
      <div className='flex flex-col items-center justify-center border-none py-8'>
        <svg className='w-[150px] h-[150px] md:w-[250px] md:h-[250px] md:mx-16' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path className='fill-black dark:fill-slate-50' d="M246.253 280.552l71.99 97.834-166.207 48.293zm.274-37.243L138.877 97.006 21 279.83l107.65 146.3 114.21-177.108zm162.63 9.728l34.46-53.457-38.665 11.226v33.426zm-115.097-2.12l-10.515-4.89-18.56 5.388-7.17 11.126 77.33 105.143 31.99-49.628-20.28-42.88zm45.55-88.33h65.405v27.44l44.9-13.06L342.254 30.566 154.83 85.02l107.712 146.39 77.055-22.45v-46.373zm45.45 86.06v-66.105h-25.507v49.49l-13.533-5.1-34.012 10.277 49.89 22.937 104.62 221.287 24.482-7.11z" /></svg>
        <Metric color='blue' className='titleText text-4xl md:text-6xl md:pb-1'>Money Trapper</Metric>
        <Text className='titleText text-xs md:text-sm'>a site where you can track all your expenses</Text>
      </div>
      <Login />
      <div className='w-1/2 p-16 flex flex-col gap-10'>
        <MockupSpendCard mockData={mockData} />
      </div>
    </div>
  )
}
