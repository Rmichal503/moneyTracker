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
        <main className="min-h-screen md:h-screen flex flex-col items-center px-3 pb-3 md:px-6 md:pb-6">
          {children}
        </main>
      </body>
    </html>
  )
}
