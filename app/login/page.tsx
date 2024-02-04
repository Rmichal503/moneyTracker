import { Card, TextInput } from '@tremor/react'
import { Suspense } from 'react'
import Messages from './messages'

export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card decoration='left'>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-6 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <div className='flex flex-col space-y-2'>
            <label className="text-md text-tremor-brand dark:text-dark-tremor-brand" htmlFor="email">
              Email
            </label>
            <TextInput
              className="rounded-md"
              name="email"
              placeholder="you@example.com"
              required
            />
            <label className="text-md text-tremor-brand dark:text-dark-tremor-brand" htmlFor="password">
              Password
            </label>
            <TextInput
              className="rounded-md"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <button className="tremor-Button-root flex-shrink-0 inline-flex justify-center items-center group font-medium outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input border px-4 py-2 text-sm bg-tremor-brand dark:bg-dark-tremor-brand border-tremor-brand dark:border-dark-tremor-brand text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted hover:bg-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-emphasis hover:border-tremor-brand-emphasis dark:hover:border-dark-tremor-brand-emphasis">
              Sign In
            </button>
            <button className='className="tremor-Button-root flex-shrink-0 inline-flex justify-center items-center group font-medium outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input border px-2.5 py-1.5 text-sm text-tremor-brand dark:text-dark-tremor-brand bg-transparent border-tremor-brand dark:border-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis hover:bg-tremor-brand-faint dark:hover:bg-dark-tremor-brand-faint space-x-1"'
              formAction="/auth/sign-up"
            >
              Sign Up
            </button>
          </div>
        </form>
        <Suspense>
          <Messages />
        </Suspense>
      </Card>
    </div>
  )
}
