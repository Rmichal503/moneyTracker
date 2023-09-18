import { Button, Card, TextInput } from '@tremor/react'
import Link from 'next/link'
import Messages from './messages'

export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-tremor-brand dark:text-dark-tremor-brand bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>
      <Card decoration='left' decorationColor='blue'>
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
            <Button variant='primary'>
              Sign In
            </Button>
            <Button
              formAction="/auth/sign-up"
              variant='secondary'
            >
              Sign Up
            </Button>
          </div>
          <Messages />
        </form>
      </Card>
    </div>
  )
}
