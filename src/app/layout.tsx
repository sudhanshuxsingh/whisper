import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import Header from '@/components/ui/header'

export const metadata={
  title:'Welcome to whishper'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Header/>
              {children}
            </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  )
}