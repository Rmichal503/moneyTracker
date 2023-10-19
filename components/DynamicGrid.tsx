import { Owner } from '@/app/spends/page'
import { Spend } from '@/types/supabase'
import React, { useEffect, useState } from 'react'
import SpendCard from './SpendCard'

export default function DynamicGrid({ spends, owner }: { spends: Spend[], owner: Owner }) {
    const [rwd, setRwd] = useState<number>()
    // const [oneDiv, setOneDiv] = useState<Array<React.Component>|null>(null);
    // const [twoDiv, setTwoDiv] = useState<Array<React.Component>|null>(null);
    // const [threeDiv, setThreeDiv] = useState<Array<React.Component>|null>(null);
    const [effect, setEffect] = useState(false)
    useEffect(() => {
        console.log(window.innerWidth);
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
    const mapItems = (items:Spend[],rwd:number) => {
        const oneColumnItems = items.filter((item, index) => index % rwd === 0);
        const twoColumnItems = items.filter((item, index) => index % rwd === 1);
        const threeColumnItems = items.filter((item, index) => index % rwd === 2);
      
        return (
          <>
            {oneColumnItems.length > 0?(<div key={'columnOne'} className='w-full h-full flex flex-col space-y-4 md:space-y-8 xl:space-y-12'>
                {oneColumnItems.map(el=>{
                    return <SpendCard key={el.id} spend={el} owner={owner}/>
                })}
            </div>):null}
            {twoColumnItems.length > 0?(<div key={'columnTwo'} className='w-full h-full flex flex-col space-y-1 md:space-y-4 xl:space-y-8'>
                {twoColumnItems.map(el=>{
                    return <SpendCard key={el.id} spend={el} owner={owner}/>
                })}
            </div>):null}
            {threeColumnItems.length > 0?(<div key={'columnThree'} className='w-full h-full flex flex-col space-y-1 md:space-y-4 xl:space-y-8'>
                {threeColumnItems.map(el=>{
                    return <SpendCard key={el.id} spend={el} owner={owner}/>
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
