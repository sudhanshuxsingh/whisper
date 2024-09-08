import { ClerkProvider, GoogleOneTap} from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'

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
            <GoogleOneTap />
            <h2>Header</h2>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}