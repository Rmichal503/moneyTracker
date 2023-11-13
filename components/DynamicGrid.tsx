import { Spend } from '@/types/supabase'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import SpendCard from './SpendCard'

export default function DynamicGrid({ spends }: { spends: Spend[] }) {
    const [rwd, setRwd] = useState<number>()
    const [effect, setEffect] = useState(false)
    useEffect(() => {
        // console.log(window.innerWidth);
        switch (true) {
            case (window.innerWidth >= 1280):
                console.log(3);
                setRwd(3)
                break;
            case (window.innerWidth >= 768):
                console.log(2);
                setRwd(2)
                break;
            case (window.innerWidth < 768):
                console.log(1);
                setRwd(1)
                break;
            default:
                break;
        }
        return setEffect(true)
    }, [])
    const columnClass = clsx({
        'w-full h-full flex flex-col space-y-2 md:space-y-4 xl:space-y-8 p-1 md:p-2 xl:p-4':rwd===1,
        'w-1/2 h-full flex flex-col space-y-2 md:space-y-4 xl:space-y-8 p-1 md:p-2 xl:p-4':rwd===2,
        'w-1/3 h-full flex flex-col space-y-2 md:space-y-4 xl:space-y-8 p-1 md:p-2 xl:p-4':rwd===3,
    })
    const mapItems = (items:Spend[],rwd:number) => {
        const oneColumnItems = items.filter((item, index) => index % rwd === 0);
        const twoColumnItems = items.filter((item, index) => index % rwd === 1);
        const threeColumnItems = items.filter((item, index) => index % rwd === 2);
        
        return (
          <>
            {oneColumnItems.length > 0?(<div key={'columnOne'} className={columnClass}>
                {oneColumnItems.map(el=>{
                    return <SpendCard key={el.id} spend={el} />
                })}
            </div>):null}
            {twoColumnItems.length > 0?(<div key={'columnTwo'} className={columnClass}>
                {twoColumnItems.map(el=>{
                    return <SpendCard key={el.id} spend={el} />
                })}
            </div>):null}
            {threeColumnItems.length > 0?(<div key={'columnThree'} className={columnClass}>
                {threeColumnItems.map(el=>{
                    return <SpendCard key={el.id} spend={el} />
                })}
            </div>):null}
          </>
        );
      };
    return (
        <>
        {rwd !== undefined?mapItems(spends,rwd):null}
        </>
    )
}
