import Link from 'next/link'
import React from 'react'

export default function LinkButton({text,href}:{text:string,href:string}) {
  return (
    <Link href={href} className="ml-auto tremor-Button-root flex-shrink-0 inline-flex justify-center items-center group font-medium outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input border xs:px-2.5 xs:py-1.5 px-1.5 py-1 text-sm bg-tremor-brand dark:bg-dark-tremor-brand border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted hover:bg-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis">{text}</Link>
  )
}
