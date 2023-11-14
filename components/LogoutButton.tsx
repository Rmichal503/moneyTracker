import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button type="submit" className="tremor-Button-root flex-shrink-0 inline-flex justify-center items-center group font-medium outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input border px-2.5 py-1.5 text-sm text-tremor-brand dark:text-dark-tremor-brand bg-transparent border-tremor-brand dark:border-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis hover:bg-tremor-brand-faint dark:hover:bg-dark-tremor-brand-faint space-x-1"><LogOut className="w-4 h-4 xs:w-5 xs:h-5"/><span className="tremor-Button-text text-sm whitespace-nowrap">Logout</span></button>
    </form>
  )
}
