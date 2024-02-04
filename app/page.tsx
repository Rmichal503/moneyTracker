
import LinkButton from '@/components/LinkButton'
import MockupSpendCard from '@/components/mockups/MockupSpendCard'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Metric, Text } from '@tremor/react'
import { cookies } from 'next/headers'
import LogoutButton from '../components/LogoutButton'
import Login from './login/page'

export const dynamic = 'force-dynamic'
const userName = (user:string|undefined) =>{
  if(user === undefined){
    return 'New User'
  }
  return user.split('@')[0]
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
          <nav className="w-full flex justify-center items-center gap-2 border-b border-b-tremor-border dark:border-b-dark-tremor-border px-1 py-2 md:px-6 md:py-4 text-sm">
          <span className="text-tremor-content dark:text-dark-tremor-content md:text-base lg:text-lg">Hey, {userName(user.email)}!</span>
                <LinkButton href='/spends' text='Spends' />
                <LogoutButton />
          </nav>
        </>
        <div className='flex-1 flex flex-col items-center justify-center border-none py-8'>
          <svg className='w-[150px] h-[150px] md:w-[250px] md:h-[250px] md:mx-16' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path className='fill-tremor-content dark:fill-dark-tremor-content' d="M246.253 280.552l71.99 97.834-166.207 48.293zm.274-37.243L138.877 97.006 21 279.83l107.65 146.3 114.21-177.108zm162.63 9.728l34.46-53.457-38.665 11.226v33.426zm-115.097-2.12l-10.515-4.89-18.56 5.388-7.17 11.126 77.33 105.143 31.99-49.628-20.28-42.88zm45.55-88.33h65.405v27.44l44.9-13.06L342.254 30.566 154.83 85.02l107.712 146.39 77.055-22.45v-46.373zm45.45 86.06v-66.105h-25.507v49.49l-13.533-5.1-34.012 10.277 49.89 22.937 104.62 221.287 24.482-7.11z" /></svg>
          <Metric className='titleText text-[#edbc78] dark:text-[#875612] text-4xl md:text-6xl md:pb-1'>Money Trapper</Metric>
          <Text className='titleText text-xs md:text-sm'>a site where you can track all your expenses</Text>
        </div>
        <MockupSpendCard />
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col md:justify-center md:space-x-8 items-center m-auto">
      <div className='flex flex-col items-center justify-center border-none py-8'>
        <svg className='w-[150px] h-[150px] md:w-[250px] md:h-[250px] md:mx-16' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path className='fill-tremor-content dark:fill-dark-tremor-content' d="M246.253 280.552l71.99 97.834-166.207 48.293zm.274-37.243L138.877 97.006 21 279.83l107.65 146.3 114.21-177.108zm162.63 9.728l34.46-53.457-38.665 11.226v33.426zm-115.097-2.12l-10.515-4.89-18.56 5.388-7.17 11.126 77.33 105.143 31.99-49.628-20.28-42.88zm45.55-88.33h65.405v27.44l44.9-13.06L342.254 30.566 154.83 85.02l107.712 146.39 77.055-22.45v-46.373zm45.45 86.06v-66.105h-25.507v49.49l-13.533-5.1-34.012 10.277 49.89 22.937 104.62 221.287 24.482-7.11z" /></svg>
        <Metric color='blue' className='titleText text-[#edbc78] dark:text-[#875612] text-4xl md:text-6xl md:pb-1'>Money Trapper</Metric>
        <Text className='titleText text-xs md:text-sm'>a site where you can track all your expenses</Text>
      </div>
      <Login />

      <MockupSpendCard />

    </div>
  )
}
