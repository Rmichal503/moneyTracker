'use client'

import { useSearchParams } from 'next/navigation'

export default function Messages() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  return (
    <>
      {error && (
        <p className="mt-4 p-4 bg-tremor-background dark:bg-dark-tremor-background border border-tremor-border dark:border-dark-tremor-border rounded-lg text-tremor-content dark:text-dark-tremor-content text-center flex-shrink-0">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 p-4 bg-tremor-background dark:bg-dark-tremor-background border border-tremor-border dark:border-dark-tremor-border rounded-lg text-tremor-content dark:text-dark-tremor-content text-center flex-shrink-0">
          {message}
        </p>
      )}
    </>
  )
}
