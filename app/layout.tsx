import './globals.css'

export const metadata = {
  title: 'Money Trapper',
  description: 'An application that will allow you to track your expenses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-tremor-background dark:bg-dark-tremor-background absolute inset-0'>
        <main className="flex flex-col items-center px-2 pb-3 md:px-4 md:pb-6">
          {children}
        </main>
      </body>
    </html>
  )
}
