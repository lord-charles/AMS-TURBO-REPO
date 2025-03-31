import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/lib/theme/theme-provider"
import ThemeDataProvider from "@/lib/theme/themeContext"
import NextTopLoader from 'nextjs-toploader';


export const metadata: Metadata = {
  title: "Strathmore University Student Portal",
  description: "A modern, all-in-one student portal designed for universities in Kenya. Access course registrations, academic records, exam schedules, financial statements, e-learning materials, student support services, and campus resources in one seamless platform. Stay connected with real-time announcements, career opportunities, and faculty communications.",
  generator: "Strathmore University Student Portal System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <NextTopLoader
          color="#0f5bb7"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeDataProvider>
            {children}
          </ThemeDataProvider>
        </ThemeProvider>
        <NextTopLoader />
      </body>
    </html>
  )
}
