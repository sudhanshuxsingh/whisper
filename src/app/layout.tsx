import { ClerkProvider} from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <h1 className='h-10 bg-red-800'>Page Header</h1> */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}